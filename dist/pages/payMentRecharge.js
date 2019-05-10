'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var payMentRecharge = function (_wepy$page) {
    _inherits(payMentRecharge, _wepy$page);

    function payMentRecharge() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, payMentRecharge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = payMentRecharge.__proto__ || Object.getPrototypeOf(payMentRecharge)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            // navigationBarTitleText: '',
        }, _this.components = {}, _this.data = {
            inputValue: null,
            getRechargeRule: {},
            activeRulesItem: [{ id: 0, active: true }, { id: 1, active: false }, { id: 2, active: false }],
            surplusMoney: 0,
            ruleId: 1,
            memberMess: null,
            memberPayMode: '',
            m_id: ''
        }, _this.methods = {
            // 用户选择规则
            selectRules: function selectRules(e) {
                var _this2 = this;

                var id = e.currentTarget.dataset.id;
                var money = e.currentTarget.dataset.money;
                this.ruleId = Number(e.currentTarget.dataset.id) + 1;
                this.activeRulesItem.forEach(function (element) {
                    if (id == element.id) {
                        element.active = true;
                        _this2.surplusMoney = (money - _this2.inputValue).toFixed(2);
                    } else {
                        element.active = false;
                    }
                });
            },

            // 折扣买单/原价买单
            payment: function payment(payMode) {
                var _this3 = this;

                var data = {
                    p_id: _wepy2.default.$instance.globalData.p_id, //平台ID
                    m_id: this.m_id, //商户ID
                    m_TranType: "0", //交易类型0-买单
                    Bury_Type: payMode, //买单类型：0-原价买单 1-办理会员卡充值并支付 2-会员卡支付
                    Bury_Money: this.inputValue, //消费金额
                    elasticMoney: this.getRechargeRule['elasticBigDec' + this.ruleId], //充值金额
                    givenMoney: this.getRechargeRule['givenMoenyBigDec' + this.ruleId], //赠送金额
                    token: wx.getStorageSync('token')
                };
                if (payMode == 2) {
                    wx.showModal({
                        title: '余额支付',
                        content: '\u8D26\u6237\u4F59\u989D' + this.memberMess.MemInfo.balance + '\u5143\uFF0C\u652F\u4ED8\u6D88\u8D39\u989D' + this.inputValue + '\u5143',
                        confirmText: '支付',
                        confirmColor: '#3CC51F',
                        success: function success(res) {
                            if (res.confirm) {
                                wx.showLoading({ title: '发起支付中...' });
                                (0, _requestData.requestData)(_requestUrl2.default.payMent, 'POST', data).then(function (res) {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: '支付成功',
                                        icon: 'success',
                                        duration: 1500,
                                        success: function success() {
                                            setTimeout(function () {
                                                wx.navigateTo({
                                                    url: './payMentSuccess?money=' + _this3.inputValue + '&m_id=' + _this3.m_id
                                                });
                                            }, 1500);
                                        }
                                    });
                                });
                            }
                        }
                    });
                } else {
                    wx.showLoading({ title: '发起支付中...' });
                    (0, _requestData.requestData)(_requestUrl2.default.payMent, 'POST', data).then(function (res) {
                        wx.hideLoading();
                        var payData = res.data.data[0];
                        _wepy2.default.requestPayment({
                            timeStamp: payData.timeStamp.toString(),
                            nonceStr: payData.nonceStr,
                            package: payData.package,
                            signType: 'MD5',
                            paySign: payData.sign
                        }).then(function (res) {
                            wx.navigateTo({
                                url: './payMentSuccess?money=' + _this3.inputValue + '&m_id=' + _this3.m_id
                            });
                        }).catch(function (res) {
                            wx.showToast({
                                title: '支付失败',
                                icon: 'none',
                                duration: 1500,
                                mask: false
                            });
                        });
                    });
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(payMentRecharge, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this4 = this;

            wx.showLoading({ title: '加载中...' });
            // 买单金额
            this.inputValue = options.inputValue;
            this.m_id = options.m_id;
            //会员卡充值规则Data
            var rule = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: options.m_id,
                TranType: 0,
                Bury_Type: 0, //0-原价买单 1-充值 2-充值并支付
                Bury_Money: options.inputValue
            };
            // 会员Data
            var cardMessage = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: options.m_id,
                type: "0",
                token: wx.getStorageSync('token')
            };
            // 获取充值优惠规则和会员信息
            Promise.all([(0, _requestData.requestData)(_requestUrl2.default.getRechargeRule, 'POST', rule), (0, _requestData.requestData)(_requestUrl2.default.cardMessage, 'POST', cardMessage)]).then(function (res) {
                wx.hideLoading();
                // 获取充值优惠规则
                _this4.surplusMoney = (res[0].data.data[0].elasticBigDec1 + res[0].data.data[0].givenMoenyBigDec1 - options.inputValue).toFixed(2);
                _this4.getRechargeRule = res[0].data.data[0];
                // 会员数据
                _this4.memberMess = res[1].data.data[0];
                // 判断余额买单‘2’还是原价买单‘0’
                _this4.memberPayMode = (res[1].data.data[0].isMem == 0 || res[1].data.data[0].isMem == 2) && Number(res[1].data.data[0].MemInfo.balance) >= Number(_this4.inputValue) ? 2 : 0;
                _this4.$apply();
            });
        }
    }]);

    return payMentRecharge;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(payMentRecharge , 'pages/payMentRecharge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheU1lbnRSZWNoYXJnZS5qcyJdLCJuYW1lcyI6WyJwYXlNZW50UmVjaGFyZ2UiLCJjb25maWciLCJjb21wb25lbnRzIiwiZGF0YSIsImlucHV0VmFsdWUiLCJnZXRSZWNoYXJnZVJ1bGUiLCJhY3RpdmVSdWxlc0l0ZW0iLCJpZCIsImFjdGl2ZSIsInN1cnBsdXNNb25leSIsInJ1bGVJZCIsIm1lbWJlck1lc3MiLCJtZW1iZXJQYXlNb2RlIiwibV9pZCIsIm1ldGhvZHMiLCJzZWxlY3RSdWxlcyIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm1vbmV5IiwiTnVtYmVyIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJ0b0ZpeGVkIiwicGF5bWVudCIsInBheU1vZGUiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJtX1RyYW5UeXBlIiwiQnVyeV9UeXBlIiwiQnVyeV9Nb25leSIsImVsYXN0aWNNb25leSIsImdpdmVuTW9uZXkiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJNZW1JbmZvIiwiYmFsYW5jZSIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJzaG93TG9hZGluZyIsImFwaSIsInBheU1lbnQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVUbyIsInVybCIsInBheURhdGEiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic2lnbiIsImNhdGNoIiwibWFzayIsImV2ZW50cyIsIm9wdGlvbnMiLCJydWxlIiwiVHJhblR5cGUiLCJjYXJkTWVzc2FnZSIsInR5cGUiLCJQcm9taXNlIiwiYWxsIiwiZWxhc3RpY0JpZ0Rl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QixDQUF2QjtBQUNBO0FBQ0EsdUJBQUtRLFVBQUwsR0FBa0JtQyxJQUFJLENBQUosRUFBTzNDLElBQVAsQ0FBWUEsSUFBWixDQUFpQixDQUFqQixDQUFsQjtBQUNBO0FBQ0EsdUJBQUtTLGFBQUwsR0FBc0IsQ0FBQ2tDLElBQUksQ0FBSixFQUFPM0MsSUFBUCxDQUFZQSxJQUFaLENBQWlCLENBQWpCLEVBQW9CNkUsS0FBcEIsSUFBNkIsQ0FBN0IsSUFBa0NsQyxJQUFJLENBQUosRUFBTzNDLElBQVAsQ0FBWUEsSUFBWixDQUFpQixDQUFqQixFQUFvQjZFLEtBQXBCLElBQTZCLENBQWhFLEtBQXNFNUQsT0FBTzBCLElBQUksQ0FBSixFQUFPM0MsSUFBUCxDQUFZQSxJQUFaLENBQWlCLENBQWpCLEVBQW9Cc0MsT0FBcEIsQ0FBNEJDLE9BQW5DLEtBQStDdEIsT0FBTyxPQUFLaEIsVUFBWixDQUF0SCxHQUFnSixDQUFoSixHQUFvSixDQUF6SztBQUNBLHVCQUFLNkUsTUFBTDtBQUNILGFBVkQ7QUFXSDs7OztFQXZJd0N0RCxlQUFLdUQsSTs7a0JBQTdCbEYsZSIsImZpbGUiOiJwYXlNZW50UmVjaGFyZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCc7XG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2FwaS9yZXF1ZXN0RGF0YSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGF5TWVudFJlY2hhcmdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIC8vIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgaW5wdXRWYWx1ZTpudWxsLFxuICAgICAgICBnZXRSZWNoYXJnZVJ1bGU6e30sXG4gICAgICAgIGFjdGl2ZVJ1bGVzSXRlbTpbXG4gICAgICAgICAgICB7IGlkOjAsYWN0aXZlOnRydWUgfSxcbiAgICAgICAgICAgIHsgaWQ6MSxhY3RpdmU6ZmFsc2UgfSxcbiAgICAgICAgICAgIHsgaWQ6MixhY3RpdmU6ZmFsc2UgfVxuICAgICAgICBdLFxuICAgICAgICBzdXJwbHVzTW9uZXk6MCxcbiAgICAgICAgcnVsZUlkOjEsXG4gICAgICAgIG1lbWJlck1lc3M6bnVsbCxcbiAgICAgICAgbWVtYmVyUGF5TW9kZTonJyxcbiAgICAgICAgbV9pZDonJ1xuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy8g55So5oi36YCJ5oup6KeE5YiZXG4gICAgICAgIHNlbGVjdFJ1bGVzKGUpe1xuICAgICAgICAgICAgbGV0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICBsZXQgbW9uZXkgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5tb25leTtcbiAgICAgICAgICAgIHRoaXMucnVsZUlkID0gTnVtYmVyKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkKSArIDE7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVJ1bGVzSXRlbS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoaWQgPT0gZWxlbWVudC5pZCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cnBsdXNNb25leSA9IChtb25leS10aGlzLmlucHV0VmFsdWUpLnRvRml4ZWQoMilcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvLyDmipjmiaPkubDljZUv5Y6f5Lu35Lmw5Y2VXG4gICAgICAgIHBheW1lbnQocGF5TW9kZSl7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsICAvL+W5s+WPsElEXG4gICAgICAgICAgICAgICAgbV9pZDogdGhpcy5tX2lkLCAgLy/llYbmiLdJRFxuICAgICAgICAgICAgICAgIG1fVHJhblR5cGU6IFwiMFwiLCAgICAvL+S6pOaYk+exu+WeizAt5Lmw5Y2VXG4gICAgICAgICAgICAgICAgQnVyeV9UeXBlOiBwYXlNb2RlLCAvL+S5sOWNleexu+Wei++8mjAt5Y6f5Lu35Lmw5Y2VIDEt5Yqe55CG5Lya5ZGY5Y2h5YWF5YC85bm25pSv5LuYIDIt5Lya5ZGY5Y2h5pSv5LuYXG4gICAgICAgICAgICAgICAgQnVyeV9Nb25leTogdGhpcy5pbnB1dFZhbHVlLCAgICAvL+a2iOi0uemHkeminVxuICAgICAgICAgICAgICAgIGVsYXN0aWNNb25leTogdGhpcy5nZXRSZWNoYXJnZVJ1bGVbYGVsYXN0aWNCaWdEZWMke3RoaXMucnVsZUlkfWBdLCAgICAvL+WFheWAvOmHkeminVxuICAgICAgICAgICAgICAgIGdpdmVuTW9uZXk6IHRoaXMuZ2V0UmVjaGFyZ2VSdWxlW2BnaXZlbk1vZW55QmlnRGVjJHt0aGlzLnJ1bGVJZH1gXSwgICAvL+i1oOmAgemHkeminVxuICAgICAgICAgICAgICAgIHRva2VuOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGF5TW9kZSA9PSAyKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S9memineaUr+S7mCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGDotKbmiLfkvZnpop0ke3RoaXMubWVtYmVyTWVzcy5NZW1JbmZvLmJhbGFuY2V95YWD77yM5pSv5LuY5raI6LS56aKdJHt0aGlzLmlucHV0VmFsdWV95YWDYCxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfmlK/ku5gnLFxuICAgICAgICAgICAgICAgICAgICBjb25maXJtQ29sb3I6ICcjM0NDNTFGJyxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5jb25maXJtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflj5HotbfmlK/ku5jkuK0uLi4nfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdERhdGEoYXBpLnBheU1lbnQsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9wYXlNZW50U3VjY2Vzcz9tb25leT0ke3RoaXMuaW5wdXRWYWx1ZX0mbV9pZD0ke3RoaXMubV9pZH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflj5HotbfmlK/ku5jkuK0uLi4nfSk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEoYXBpLnBheU1lbnQsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXlEYXRhID0gcmVzLmRhdGEuZGF0YVswXTtcbiAgICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lU3RhbXA6IHBheURhdGEudGltZVN0YW1wLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBub25jZVN0cjogcGF5RGF0YS5ub25jZVN0cixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhY2thZ2U6IHBheURhdGEucGFja2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25UeXBlOiAnTUQ1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheVNpZ246IHBheURhdGEuc2lnbixcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vcGF5TWVudFN1Y2Nlc3M/bW9uZXk9JHt0aGlzLmlucHV0VmFsdWV9Jm1faWQ9JHt0aGlzLm1faWR9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOWksei0pScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJ30pO1xuICAgICAgICAvLyDkubDljZXph5Hpop1cbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gb3B0aW9ucy5pbnB1dFZhbHVlXG4gICAgICAgIHRoaXMubV9pZCA9IG9wdGlvbnMubV9pZFxuICAgICAgICAvL+S8muWRmOWNoeWFheWAvOinhOWImURhdGFcbiAgICAgICAgbGV0IHJ1bGUgPSB7XG4gICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBtX2lkOiBvcHRpb25zLm1faWQsXG4gICAgICAgICAgICBUcmFuVHlwZSA6IDAsXG4gICAgICAgICAgICBCdXJ5X1R5cGUgOiAwLCAgLy8wLeWOn+S7t+S5sOWNlSAxLeWFheWAvCAyLeWFheWAvOW5tuaUr+S7mFxuICAgICAgICAgICAgQnVyeV9Nb25leSA6IG9wdGlvbnMuaW5wdXRWYWx1ZVxuICAgICAgICB9O1xuICAgICAgICAvLyDkvJrlkZhEYXRhXG4gICAgICAgIGxldCBjYXJkTWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgIG1faWQ6IG9wdGlvbnMubV9pZCxcbiAgICAgICAgICAgIHR5cGU6XCIwXCIsXG4gICAgICAgICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgICAgfTtcbiAgICAgICAgLy8g6I635Y+W5YWF5YC85LyY5oOg6KeE5YiZ5ZKM5Lya5ZGY5L+h5oGvXG4gICAgICAgIFByb21pc2UuYWxsKFtyZXF1ZXN0RGF0YShhcGkuZ2V0UmVjaGFyZ2VSdWxlLCdQT1NUJyxydWxlKSxyZXF1ZXN0RGF0YShhcGkuY2FyZE1lc3NhZ2UsJ1BPU1QnLGNhcmRNZXNzYWdlKV0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgLy8g6I635Y+W5YWF5YC85LyY5oOg6KeE5YiZXG4gICAgICAgICAgICB0aGlzLnN1cnBsdXNNb25leSA9ICgocmVzWzBdLmRhdGEuZGF0YVswXS5lbGFzdGljQmlnRGVjMSArIHJlc1swXS5kYXRhLmRhdGFbMF0uZ2l2ZW5Nb2VueUJpZ0RlYzEpIC0gb3B0aW9ucy5pbnB1dFZhbHVlKS50b0ZpeGVkKDIpXG4gICAgICAgICAgICB0aGlzLmdldFJlY2hhcmdlUnVsZSA9IHJlc1swXS5kYXRhLmRhdGFbMF1cbiAgICAgICAgICAgIC8vIOS8muWRmOaVsOaNrlxuICAgICAgICAgICAgdGhpcy5tZW1iZXJNZXNzID0gcmVzWzFdLmRhdGEuZGF0YVswXVxuICAgICAgICAgICAgLy8g5Yik5pat5L2Z6aKd5Lmw5Y2V4oCYMuKAmei/mOaYr+WOn+S7t+S5sOWNleKAmDDigJlcbiAgICAgICAgICAgIHRoaXMubWVtYmVyUGF5TW9kZSA9ICgocmVzWzFdLmRhdGEuZGF0YVswXS5pc01lbSA9PSAwIHx8IHJlc1sxXS5kYXRhLmRhdGFbMF0uaXNNZW0gPT0gMikgJiYgTnVtYmVyKHJlc1sxXS5kYXRhLmRhdGFbMF0uTWVtSW5mby5iYWxhbmNlKSA+PSBOdW1iZXIodGhpcy5pbnB1dFZhbHVlKSk/IDIgOiAwXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfTtcbn1cbiJdfQ==