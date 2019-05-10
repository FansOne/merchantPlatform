'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cardRecharge = function (_wepy$page) {
    _inherits(cardRecharge, _wepy$page);

    function cardRecharge() {
        var _ref, _this$data;

        var _temp, _this, _ret;

        _classCallCheck(this, cardRecharge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = cardRecharge.__proto__ || Object.getPrototypeOf(cardRecharge)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会员卡充值',
            navigationBarBackgroundColor: '#ffd270'
        }, _this.components = {}, _this.data = (_this$data = {
            token: null,
            msgList: [],
            amount: '',
            inputValue: '',
            openid: '',
            jssdk: ''
        }, _defineProperty(_this$data, 'amount', 0), _defineProperty(_this$data, 'shopId', ''), _defineProperty(_this$data, 'options', null), _defineProperty(_this$data, 'amountMoney', 0), _this$data), _this.methods = {
            payMent: function payMent() {
                this.orderComfirm();
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(cardRecharge, [{
        key: '_have2Digit',
        value: function _have2Digit(str) {
            var sum = 0;
            for (var i = 0; i < str.length; i++) {
                if (str[i] === '.') {
                    sum += 1;
                }
            }
            return sum > 1;
        }
    }, {
        key: '_haveDigit',
        value: function _haveDigit(str) {
            var index = str.indexOf('.');
            if (index === -1) {
                return false;
            } else {
                return true;
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            console.log(options);
            this.options = options;
            //获取商户id
            this.shopId = JSON.parse(options.shopId);
            //获取token
            this.token = wx.getStorageSync('access_token');
            this.userMoney();
            this.getCardLists();
        }
    }, {
        key: 'getCardLists',

        // 会员卡充值优惠列表
        value: function getCardLists() {
            var _this2 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/charge_members/' + this.shopId,
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json'
                }
            }).then(function (res) {
                console.log(res.data.message);
                _this2.msgList = res.data.message;
                _this2.$apply();
            });
        }
        // 获取用户会员卡余额

    }, {
        key: 'userMoney',
        value: function userMoney() {
            var _this3 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/user_card/' + this.shopId,
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Authorization': 'Bearer ' + this.token.access_token
                }
            }).then(function (res) {
                console.log(res);
                res.data.message.money = Number(res.data.message.money / 100).toFixed(2);
                _this3.amount = Number(res.data.message.money); //会员卡余额
                _this3.$apply();
            });
        }
        // 订单提交

    }, {
        key: 'orderComfirm',
        value: function orderComfirm() {
            var _this4 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/flexible_membership_card_recharge',
                method: 'POST',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Authorization': 'Bearer ' + this.token.access_token
                },
                data: {
                    money: this.options.money,
                    merchant_id: this.shopId
                }
            }).then(function (res) {
                _this4.wxPay(res.data.message);
            });
        }
        //发起微信支付

    }, {
        key: 'wxPay',
        value: function wxPay(orderId) {
            var _this5 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/recharge_records/' + orderId,
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Authorization': 'Bearer ' + this.token.access_token
                }
            }).then(function (res) {
                _this5.jssdk = res.data.message;
                _this5.$apply();
                //发起微信支付
                wx.requestPayment({
                    'appId': _this5.jssdk.appId,
                    'timeStamp': _this5.jssdk.timeStamp,
                    'nonceStr': _this5.jssdk.nonceStr,
                    'package': _this5.jssdk.package,
                    'signType': _this5.jssdk.signType,
                    'paySign': _this5.jssdk.paySign,
                    success: function success(res) {
                        wx.showToast({
                            title: '充值成功',
                            icon: 'success',
                            success: function success(res) {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                        // this.userMoney()
                    }
                });
            });
        }
    }]);

    return cardRecharge;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(cardRecharge , 'packageMembershipCard/membershipCard/payMentCardRecharge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheU1lbnRDYXJkUmVjaGFyZ2UuanMiXSwibmFtZXMiOlsiY2FyZFJlY2hhcmdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJjb21wb25lbnRzIiwiZGF0YSIsInRva2VuIiwibXNnTGlzdCIsImFtb3VudCIsImlucHV0VmFsdWUiLCJvcGVuaWQiLCJqc3NkayIsIm1ldGhvZHMiLCJwYXlNZW50Iiwib3JkZXJDb21maXJtIiwiZXZlbnRzIiwic3RyIiwic3VtIiwiaSIsImxlbmd0aCIsImluZGV4IiwiaW5kZXhPZiIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwic2hvcElkIiwiSlNPTiIsInBhcnNlIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInVzZXJNb25leSIsImdldENhcmRMaXN0cyIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiYXBpIiwiYXBpTWFsbCIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJyZXMiLCJtZXNzYWdlIiwiJGFwcGx5IiwiYWNjZXNzX3Rva2VuIiwibW9uZXkiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwibWVyY2hhbnRfaWQiLCJ3eFBheSIsIm9yZGVySWQiLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic3VjY2VzcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixPQURuQjtBQUVMQywwQ0FBOEI7QUFGekIsUyxRQUlUQyxVLEdBQWEsRSxRQUViQyxJO0FBQ0lDLG1CQUFNLEk7QUFDTkMscUJBQVEsRTtBQUNSQyxvQkFBTyxF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WSIsImZpbGUiOiJwYXlNZW50Q2FyZFJlY2hhcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2FyZFJlY2hhcmdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZjljaHlhYXlgLwnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI3MCcsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICB0b2tlbjpudWxsLFxuICAgICAgICBtc2dMaXN0OltdLFxuICAgICAgICBhbW91bnQ6JycsXG4gICAgICAgIGlucHV0VmFsdWU6JycsXG4gICAgICAgIG9wZW5pZDonJyxcbiAgICAgICAganNzZGs6JycsXG4gICAgICAgIGFtb3VudDowLCAgICAgICAgLy/kvJrlkZjljaHkvZnpop1cbiAgICAgICAgc2hvcElkOicnLFxuICAgICAgICBvcHRpb25zOm51bGwsXG4gICAgICAgIGFtb3VudE1vbmV5OjBcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHBheU1lbnQoKXtcbiAgICAgICAgICAgIHRoaXMub3JkZXJDb21maXJtKClcbiAgICAgICAgfVxuICAgIH07XG4gICAgX2hhdmUyRGlnaXQgKHN0cikge1xuICAgICAgICBsZXQgc3VtID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdHJbaV0gPT09ICcuJykge1xuICAgICAgICAgICAgICAgIHN1bSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSA+IDFcbiAgICB9XG4gICAgX2hhdmVEaWdpdCAoc3RyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHN0ci5pbmRleE9mKCcuJylcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIC8v6I635Y+W5ZWG5oi3aWRcbiAgICAgICAgdGhpcy5zaG9wSWQgPSBKU09OLnBhcnNlKG9wdGlvbnMuc2hvcElkKVxuICAgICAgICAvL+iOt+WPlnRva2VuXG4gICAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygnYWNjZXNzX3Rva2VuJyk7XG4gICAgICAgIHRoaXMudXNlck1vbmV5KClcbiAgICAgICAgdGhpcy5nZXRDYXJkTGlzdHMoKVxuICAgIH07XG4gICAgLy8g5Lya5ZGY5Y2h5YWF5YC85LyY5oOg5YiX6KGoXG4gICAgZ2V0Q2FyZExpc3RzKCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvY2hhcmdlX21lbWJlcnMvJyArIHRoaXMuc2hvcElkLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEubWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMubXNnTGlzdCA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyDojrflj5bnlKjmiLfkvJrlkZjljaHkvZnpop1cbiAgICB1c2VyTW9uZXkoKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS91c2VyX2NhcmQvJyArIHRoaXMuc2hvcElkLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UubW9uZXkgPSBOdW1iZXIocmVzLmRhdGEubWVzc2FnZS5tb25leS8xMDApLnRvRml4ZWQoMilcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gTnVtYmVyKHJlcy5kYXRhLm1lc3NhZ2UubW9uZXkpOyAgIC8v5Lya5ZGY5Y2h5L2Z6aKdXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyDorqLljZXmj5DkuqRcbiAgICBvcmRlckNvbWZpcm0oKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9mbGV4aWJsZV9tZW1iZXJzaGlwX2NhcmRfcmVjaGFyZ2UnLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtb25leTogdGhpcy5vcHRpb25zLm1vbmV5LFxuICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuc2hvcElkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMud3hQYXkocmVzLmRhdGEubWVzc2FnZSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8v5Y+R6LW35b6u5L+h5pSv5LuYXG4gICAgd3hQYXkob3JkZXJJZCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvcmVjaGFyZ2VfcmVjb3Jkcy8nICsgb3JkZXJJZCxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy5qc3NkayA9IHJlcy5kYXRhLm1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIC8v5Y+R6LW35b6u5L+h5pSv5LuYXG4gICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ2FwcElkJzp0aGlzLmpzc2RrLmFwcElkLFxuICAgICAgICAgICAgICAgICd0aW1lU3RhbXAnOiB0aGlzLmpzc2RrLnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOnRoaXMuanNzZGsubm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgJ3BhY2thZ2UnOiB0aGlzLmpzc2RrLnBhY2thZ2UsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogdGhpcy5qc3Nkay5zaWduVHlwZSxcbiAgICAgICAgICAgICAgICAncGF5U2lnbic6IHRoaXMuanNzZGsucGF5U2lnbixcbiAgICAgICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WFheWAvOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVzZXJNb25leSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==