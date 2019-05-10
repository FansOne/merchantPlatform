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

var merchatPrecharge = function (_wepy$page) {
    _inherits(merchatPrecharge, _wepy$page);

    function merchatPrecharge() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, merchatPrecharge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = merchatPrecharge.__proto__ || Object.getPrototypeOf(merchatPrecharge)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '商户预充值'
        }, _this.components = {}, _this.data = {
            allData: {},
            amount: [{
                contant: 100,
                id: 0,
                select: true
            }, {
                contant: 200,
                id: 1
            }, {
                contant: 300,
                id: 2
            }, {
                contant: 400,
                id: 3
            }, {
                contant: 500,
                id: 4
            }, {
                contant: 600,
                id: 5
            }],
            m_id: '',
            priceValue: null
        }, _this.methods = {
            //选择金额
            choosePrice: function choosePrice(item) {
                if (this.priceValue == null) {
                    //清空input
                    this.priceValue = '';
                } else {
                    this.priceValue = null;
                }
                this.amount.forEach(function (element) {
                    if (item.id == element.id) {
                        element.select = true;
                    } else {
                        element.select = false;
                    }
                });
                this.priceValue = item.contant;
            },

            // 输入框聚焦
            bindfocus: function bindfocus() {
                this.amount.forEach(function (element) {
                    element.select = false;
                });
            },

            // 监听输入
            bindinput: function bindinput(e) {
                this.priceValue = e.detail.value;
            },

            // 充值
            payMent: function payMent() {
                var _this2 = this;

                var data = {
                    p_id: _wepy2.default.$instance.globalData.p_id, //平台ID
                    m_id: this.m_id, //商户ID
                    m_TranType: "4", //交易类型0-买单
                    Bury_Type: 0, //买单类型：0-原价买单 1-办理会员卡充值并支付 2-会员卡支付
                    Bury_Money: this.priceValue == null ? 100 : this.priceValue, //消费金额
                    elasticMoney: '', //充值金额
                    givenMoney: "", //赠送金额
                    token: wx.getStorageSync('token')
                };
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
                        // 获取商户预充值信息
                        _this2.merchantInfo();
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
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(merchatPrecharge, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.m_id = options.m_id;
            // 获取商户预充值信息
            this.merchantInfo();
        }
    }, {
        key: 'merchantInfo',

        // 获取商户预充值信息
        value: function merchantInfo() {
            var _this3 = this;

            var url = _requestUrl2.default.merchantPreloadInfo;
            var data = {
                token: wx.getStorageSync('token'),
                p_id: _wepy2.default.$instance.globalData.p_id
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                _this3.allData = res.data.data;
                _this3.$apply();
            });
        }
    }]);

    return merchatPrecharge;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(merchatPrecharge , 'pages/merchatPrecharge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYXRQcmVjaGFyZ2UuanMiXSwibmFtZXMiOlsibWVyY2hhdFByZWNoYXJnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImFsbERhdGEiLCJhbW91bnQiLCJjb250YW50IiwiaWQiLCJzZWxlY3QiLCJtX2lkIiwicHJpY2VWYWx1ZSIsIm1ldGhvZHMiLCJjaG9vc2VQcmljZSIsIml0ZW0iLCJmb3JFYWNoIiwiZWxlbWVudCIsImJpbmRmb2N1cyIsImJpbmRpbnB1dCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInBheU1lbnQiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJtX1RyYW5UeXBlIiwiQnVyeV9UeXBlIiwiQnVyeV9Nb25leSIsImVsYXN0aWNNb25leSIsImdpdmVuTW9uZXkiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93TG9hZGluZyIsInRpdGxlIiwicmVxdWVzdFVybCIsInRoZW4iLCJoaWRlTG9hZGluZyIsInBheURhdGEiLCJyZXMiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsInRvU3RyaW5nIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic2lnbiIsIm1lcmNoYW50SW5mbyIsImNhdGNoIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImV2ZW50cyIsIm9wdGlvbnMiLCJ1cmwiLCJtZXJjaGFudFByZWxvYWRJbmZvIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7Ozs7Ozs7Ozs7OE1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLHFCQUFRLEVBREw7QUFFSEMsb0JBQU8sQ0FDSDtBQUNJQyx5QkFB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QUFJVEMsa0NBQU07QUFKRyx5QkFBYjtBQU1ILHFCQWhCRDtBQWlCSCxpQkFwQkQ7QUFxQkg7QUE3REssUyxRQWdFVkMsTSxHQUFTLEU7Ozs7OytCQUNGQyxPLEVBQVM7QUFDWixpQkFBSy9DLElBQUwsR0FBWStDLFFBQVEvQyxJQUFwQjtBQUNBO0FBQ0EsaUJBQUt3QyxZQUFMO0FBQ0g7Ozs7QUFDRDt1Q0FDYztBQUFBOztBQUNWLGdCQUFJUSxNQUFNckIscUJBQVdzQixtQkFBckI7QUFDQSxnQkFBSXZELE9BQU87QUFDUDRCLHVCQUFRQyxHQUFHQyxjQUFILENBQWtCLE9BQWxCLENBREQ7QUFFUFgsc0JBQU9DLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkg7QUFGMUIsYUFBWDtBQUlBLDBDQUFZbUMsR0FBWixFQUFnQixNQUFoQixFQUF1QnRELElBQXZCLEVBQTZCa0MsSUFBN0IsQ0FBa0MsZUFBSztBQUNuQyx1QkFBS2pDLE9BQUwsR0FBZW9DLElBQUlyQyxJQUFKLENBQVNBLElBQXhCO0FBQ0EsdUJBQUt3RCxNQUFMO0FBQ0gsYUFIRDtBQUlIOzs7O0VBdkh5Q3BDLGVBQUtxQyxJOztrQkFBOUI3RCxnQiIsImZpbGUiOiJtZXJjaGF0UHJlY2hhcmdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uL2FwaS9yZXF1ZXN0VXJsJ1xuaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi9hcGkvcmVxdWVzdERhdGEnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1lcmNoYXRQcmVjaGFyZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuaIt+mihOWFheWAvCcsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBhbGxEYXRhOnt9LFxuICAgICAgICBhbW91bnQ6W1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnRhbnQ6MTAwLFxuICAgICAgICAgICAgICAgIGlkOjAsXG4gICAgICAgICAgICAgICAgc2VsZWN0OnRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29udGFudDoyMDAsXG4gICAgICAgICAgICAgICAgaWQ6MVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb250YW50OjMwMCxcbiAgICAgICAgICAgICAgICBpZDoyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnRhbnQ6NDAwLFxuICAgICAgICAgICAgICAgIGlkOjNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29udGFudDo1MDAsXG4gICAgICAgICAgICAgICAgaWQ6NFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb250YW50OjYwMCxcbiAgICAgICAgICAgICAgICBpZDo1XG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBtX2lkOicnLFxuICAgICAgICBwcmljZVZhbHVlOm51bGwsXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICAvL+mAieaLqemHkeminVxuICAgICAgICBjaG9vc2VQcmljZShpdGVtKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJpY2VWYWx1ZSA9PSBudWxsKXsgLy/muIXnqbppbnB1dFxuICAgICAgICAgICAgICAgIHRoaXMucHJpY2VWYWx1ZSA9ICcnXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlVmFsdWUgPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFtb3VudC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uaWQgPT0gZWxlbWVudC5pZCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2VsZWN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNlbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByaWNlVmFsdWUgPSBpdGVtLmNvbnRhbnRcbiAgICAgICAgfSxcbiAgICAgICAgLy8g6L6T5YWl5qGG6IGa54SmXG4gICAgICAgIGJpbmRmb2N1cygpe1xuICAgICAgICAgICAgdGhpcy5hbW91bnQuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNlbGVjdCA9IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgLy8g55uR5ZCs6L6T5YWlXG4gICAgICAgIGJpbmRpbnB1dChlKXtcbiAgICAgICAgICAgIHRoaXMucHJpY2VWYWx1ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWFheWAvFxuICAgICAgICBwYXlNZW50KCl7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsICAvL+W5s+WPsElEXG4gICAgICAgICAgICAgICAgbV9pZDogdGhpcy5tX2lkLCAgLy/llYbmiLdJRFxuICAgICAgICAgICAgICAgIG1fVHJhblR5cGU6IFwiNFwiLCAgICAvL+S6pOaYk+exu+WeizAt5Lmw5Y2VXG4gICAgICAgICAgICAgICAgQnVyeV9UeXBlOiAwLCAvL+S5sOWNleexu+Wei++8mjAt5Y6f5Lu35Lmw5Y2VIDEt5Yqe55CG5Lya5ZGY5Y2h5YWF5YC85bm25pSv5LuYIDIt5Lya5ZGY5Y2h5pSv5LuYXG4gICAgICAgICAgICAgICAgQnVyeV9Nb25leTogdGhpcy5wcmljZVZhbHVlPT1udWxsPzEwMDp0aGlzLnByaWNlVmFsdWUsICAgIC8v5raI6LS56YeR6aKdXG4gICAgICAgICAgICAgICAgZWxhc3RpY01vbmV5OiAnJywgICAgLy/lhYXlgLzph5Hpop1cbiAgICAgICAgICAgICAgICBnaXZlbk1vbmV5OiBcIlwiLCAgIC8v6LWg6YCB6YeR6aKdXG4gICAgICAgICAgICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICflj5HotbfmlK/ku5jkuK0uLi4nfSk7XG4gICAgICAgICAgICByZXF1ZXN0RGF0YShyZXF1ZXN0VXJsLnBheU1lbnQsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgcGF5RGF0YSA9IHJlcy5kYXRhLmRhdGFbMF07XG4gICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVTdGFtcDogcGF5RGF0YS50aW1lU3RhbXAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgbm9uY2VTdHI6IHBheURhdGEubm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAgIHBhY2thZ2U6IHBheURhdGEucGFja2FnZSxcbiAgICAgICAgICAgICAgICAgICAgc2lnblR5cGU6ICdNRDUnLFxuICAgICAgICAgICAgICAgICAgICBwYXlTaWduOiBwYXlEYXRhLnNpZ24sXG4gICAgICAgICAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgLy8g6I635Y+W5ZWG5oi36aKE5YWF5YC85L+h5oGvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyY2hhbnRJbmZvKClcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1faWQgPSBvcHRpb25zLm1faWRcbiAgICAgICAgLy8g6I635Y+W5ZWG5oi36aKE5YWF5YC85L+h5oGvXG4gICAgICAgIHRoaXMubWVyY2hhbnRJbmZvKClcbiAgICB9O1xuICAgIC8vIOiOt+WPluWVhuaIt+mihOWFheWAvOS/oeaBr1xuICAgIG1lcmNoYW50SW5mbygpe1xuICAgICAgICBsZXQgdXJsID0gcmVxdWVzdFVybC5tZXJjaGFudFByZWxvYWRJbmZvO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHRva2VuIDogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHRoaXMuYWxsRGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICB9XG59XG4iXX0=