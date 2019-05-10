'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _payedCouponItem = require('./../components/payedCouponItem.js');

var _payedCouponItem2 = _interopRequireDefault(_payedCouponItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var couponsCenter = function (_wepy$page) {
    _inherits(couponsCenter, _wepy$page);

    function couponsCenter() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, couponsCenter);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = couponsCenter.__proto__ || Object.getPrototypeOf(couponsCenter)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '支付成功'
        }, _this.$repeat = {}, _this.$props = { "couponItem": { "xmlns:v-bind": "", "v-bind:syncTitle.sync": "userCoupon" } }, _this.$events = {}, _this.components = {
            couponItem: _payedCouponItem2.default
        }, _this.data = {
            MaskHeight: '',
            userCoupon: [],
            Mask: true,
            shareBtn: '',
            index: '',
            inputValue: '',
            nodata: true,
            token: '',
            shopId: '',
            money: '',
            is_limite: false,
            gotCouponsAlready: [],
            couponTabs: '',
            couponTab: 0,
            industryId: ''
        }, _this.methods = {
            //回到云上首页
            backFirst: function backFirst() {
                wx.switchTab({
                    url: './index'
                });
            },
            bottomShow: function bottomShow() {
                this.Mask = !this.Mask;
            },
            userInputNum: function userInputNum(e) {
                this.inputValue = e.detail.value;
            },
            shareBefore: function shareBefore() {
                if (Number(this.inputValue) && Number(this.inputValue) <= Number(this.userCoupon[this.index].number)) {
                    this.shareBtn = 'share';
                    this.inputValue = '';
                } else {
                    this.shareBtn = '';
                    this.inputValue = '';
                    wx.showToast({
                        title: '请正确输入分享次数',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            },

            // 切换tab
            changeCouponTab: function changeCouponTab(index, industryId) {
                this.couponTab = index;
                this.industryId = industryId;
                this.getVoucherList(industryId);
            }
        }, _this.computed = {}, _this.events = {
            userSelect: function userSelect(e, idx) {
                var _this2 = this;

                _wepy2.default.request({
                    url: _api2.default.apiMall + 'api/user_coupons/' + e.id,
                    method: 'GET',
                    header: {
                        'Accept': 'application/vnd.lingmo.v1+json',
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(function (res) {
                    //卡券未领取成功，限制用户点击
                    _this2.is_limite = true;
                    _this2.$apply();
                    if (res.data.status != '200') {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'success'
                        });
                    } else {
                        _wepy2.default.request({
                            url: _api2.default.apiMall + 'api/coupons',
                            method: 'GET',
                            header: {
                                'Accept': 'application/vnd.lingmo.v1+json',
                                'Authorization': 'Bearer ' + _this2.token
                            },
                            data: {
                                merchant_id: _this2.shopId,
                                industry_id: _this2.industryId
                            }
                        }).then(function (res) {
                            //计算已经领取的百分比
                            _this2.userCoupon.forEach(function (item, index) {
                                item.percent = (Number(item.receive) / (Number(item.lave) + Number(item.receive)) * 100).toFixed(2);
                                if (e.id == item.id) {
                                    item.checked = true;
                                    _this2.gotCouponsAlready.push(e.id);
                                }
                            });
                        });
                        _this2.userCoupon[idx].isrev = 1;
                        setTimeout(function () {
                            _this2.is_limite = false;
                            _this2.$apply();
                        }, 1500);
                        _this2.$apply();
                        wx.showToast({
                            title: '领取成功',
                            icon: 'success'
                        });
                    }
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(couponsCenter, [{
        key: 'getVoucherList',

        //获取卡券列表
        value: function getVoucherList(industryId) {
            var _this3 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/coupons',
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Authorization': 'Bearer ' + this.token
                },
                data: {
                    merchant_id: this.shopId,
                    // merchant_id:310,
                    industry_id: industryId
                }
            }).then(function (res) {
                //计算已经领取的百分比
                res.data.message.forEach(function (item, index) {
                    item.percent = (Number(item.receive) / (Number(item.lave) + Number(item.receive)) * 100).toFixed(2);
                    if (item.begin_time == 0 || item.end_time == 0) {
                        return false;
                    } else {
                        item.begin_time = _util2.default.timestampToTime(item.begin_time);
                        item.end_time = _util2.default.timestampToTime(item.end_time);
                    }
                });
                _this3.userCoupon = res.data.message;
                _this3.userCoupon.forEach(function (item, index) {
                    _this3.gotCouponsAlready.forEach(function (item1, index) {
                        if (item.id == item1) {
                            item.checked = true;
                        }
                    });
                });
                _this3.$apply();
            });
        }
        //获取卡券的分类

    }, {
        key: 'getCouponsCates',
        value: function getCouponsCates() {
            var _this4 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/get_cate',
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json'
                }
            }).then(function (res) {
                _this4.couponTabs = res.data.message;
                if (_this4.couponTabs.length) {
                    _this4.getVoucherList(_this4.couponTabs[0].id);
                }
                _this4.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var _this5 = this;

            wx.removeStorage({ key: 'selectSonCard' });
            this.shopId = options.shopId;
            this.money = options.money;
            //获取token
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
            this.getCouponsCates();
            this.$apply();
            wx.getSystemInfo({
                success: function success(res) {
                    _this5.MaskHeight = res.windowHeight;
                    _this5.$apply();
                }
            });
        }
    }]);

    return couponsCenter;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(couponsCenter , 'pages/couponsCenter'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbnNDZW50ZXIuanMiXSwibmFtZXMiOlsiY291cG9uc0NlbnRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25JdGVtIiwiZGF0YSIsIk1hc2tIZWlnaHQiLCJ1c2VyQ291cG9uIiwiTWFzayIsInNoYXJlQnRuIiwiaW5kZXgiLCJpbnB1dFZhbHVlIiwibm9kYXRhIiwidG9rZW4iLCJzaG9wSWQiLCJtb25leSIsImlzX2xpbWl0ZSIsImdvdENvdXBvbnNBbHJlYWR5IiwiY291cG9uVGFicyIsImNvdXBvblRhYiIsImluZHVzdHJ5SWQiLCJtZXRob2RzIiwiYmFja0ZpcnN0Iiwid3giLCJzd2l0Y2hUYWIiLCJ1cmwiLCJib3R0b21TaG93IiwidXNlcklucHV0TnVtIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hhcmVCZWZvcmUiLCJOdW1iZXIiLCJudW1iZXIiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJjaGFuZ2VDb3Vwb25UYWIiLCJnZXRWb3VjaGVyTGlzdCIsImNvbXB1dGVkIiwiZXZlbnRzIiwidXNlclNlbGVjdCIsImlkeCIsIndlcHkiLCJyZXF1ZXN0IiwiYXBpIiwiYXBpTWFsbCIsImlkIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsIiRhcHBseSIsInN0YXR1cyIsIm1lc3NhZ2UiLCJtZXJjaGFudF9pZCIsImluZHVzdHJ5X2lkIiwiZm9yRWFjaCIsIml0ZW0iLCJwZXJjZW50IiwicmVjZWl2ZSIsImxhdmUiLCJ0b0ZpeGVkIiwiY2hlY2tlZCIsInB1c2giLCJpc3JldiIsInNldFRpbWVvdXQiLCJiZWdpbl90aW1lIiwiZW5kX3RpbWUiLCJ1dGlsIiwidGltZXN0YW1wVG9UaW1lIiwiaXRlbTEiLCJsZW5ndGgiLCJvcHRpb25zIiwicmVtb3ZlU3RvcmFnZSIsImtleSIsImdldFN0b3JhZ2VTeW5jIiwiYWNjZXNzX3Rva2VuIiwiZ2V0Q291cG9uc0NhdGVzIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7Ozs7Ozs7Ozs7Ozt3TUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLFlBQTNDLEVBQWQsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsd0JBQVdBO0FBREwsUyxRQUdWQyxJLEdBQU87QUFDSEMsd0JBQVcsRUFEUjtBQUVIQyx3QkFBVyxFQUZSO0FBR0hDLGtCQUFLLElBSEY7QUFJSEMsc0JBQVMsRUFKTjtBQUtIQyxtQkFBTSxFQUxIO0FBTUhDLHdCQUFXLEVBTlI7QUFPSEMsb0JBQU8sSUFQSjtBQVFIQyxtQkFBTSxFQVJIO0FBU0hDLG9CQUFPLEVBVEo7QUFVSEMsbUJBQU0sRUFWSDtBQVdIQyx1QkFBVSxLQVhQO0FBWUhDLCtCQUFrQixFQVpmO0FBYUhDLHdCQUFXLEVBYlI7QUFjSEMsdUJBQVUsQ0FkUDtBQWVIQyx3QkFBVztBQWZSLFMsUUFpQlBDLE8sR0FBVTtBQUNOO0FBQ0FDLHFCQUZNLHVCQUVLO0FBQ1BDLG1CQUFHQyxTQUFILENBQWE7QUFDVEMseUJBQUs7QUFESSxpQkFBYjtBQUdILGFBTks7QUFPTkMsc0JBUE0sd0JBT007QUFDUixxQkFBS2xCLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0gsYUFUSztBQVVObUIsd0JBVk0sd0JBVU9DLENBVlAsRUFVUztBQUNYLHFCQUFLakIsVUFBTCxHQUFrQmlCLEVBQUVDLE1BQUYsQ0FBU0MsS0FBM0I7QUFDSCxhQVpLO0FBYU5DLHVCQWJNLHlCQWFPO0FBQ1Qsb0JBQUdDLE9BQU8sS0FBS3JCLFVBQVosS0FBMkJxQixPQUFPLEtBQUtyQixVQUFaLEtBQTJCcUIsT0FBTyxLQUFLekIsVUFBTCxDQUFnQixLQUFLRyxLQUFyQixFQUE0QnVCLE1BQW5DLENBQXpELEVBQW9HO0FBQ2hHLHlCQUFLeEIsUUFBTCxHQUFnQixPQUFoQjtBQUNBLHlCQUFLRSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0gsaUJBSEQsTUFHSztBQUNELHlCQUFLRixRQUFMLEdBQWdCLEVBQWhCO0FBQ0EseUJBQUtFLFVBQUwsR0FBa0IsRUFBbEI7QUFDQVksdUJBQUdXLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxXQURFO0FBRVRDLDhCQUFNLE1BRkc7QUFHVEMsa0NBQVUsSUFIRDtBQUlUQyw4QkFBTTtBQUpHLHFCQUFiO0FBTUg7QUFDSixhQTNCSzs7QUE0Qk47QUFDQUMsMkJBN0JNLDJCQTZCVTdCLEtBN0JWLEVBNkJnQlUsVUE3QmhCLEVBNkIyQjtBQUM3QixxQkFBS0QsU0FBTCxHQUFpQlQsS0FBakI7QUFDQSxxQkFBS1UsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxxQkFBS29CLGNBQUwsQ0FBb0JwQixVQUFwQjtBQUNIO0FBakNLLFMsUUFtQ1ZxQixRLEdBQVcsRSxRQUVYQyxNLEdBQVM7QUFDUEMsc0JBRE8sc0JBQ0lmLENBREosRUFDTWdCLEdBRE4sRUFDVTtBQUFBOztBQUNmQywrQkFBS0MsT0FBTCxDQUFhO0FBQ1hyQix5QkFBS3NCLGNBQUlDLE9BQUosR0FBYyxtQkFBZCxHQUFvQ3BCLEVBQUVxQixFQURoQztBQUVYQyw0QkFBUSxLQUZHO0FBR1hDLDRCQUFPO0FBQ0wsa0NBQVMsZ0NBREo7QUFFTCx5Q0FBZ0IsWUFBWSxLQUFLdEM7QUFGNUI7QUFISSxpQkFBYixFQU9HdUMsSUFQSCxDQU9RLFVBQUNDLEdBQUQsRUFBTztBQUNYO0FBQ0EsMkJBQUtyQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsMkJBQUtzQyxNQUFMO0FBQ0Esd0JBQUdELElBQUloRCxJQUFKLENBQVNrRCxNQUFULElBQW1CLEtBQXRCLEVBQTRCO0FBQ3BCaEMsMkJBQUdXLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBT2tCLElBQUloRCxJQUFKLENBQVNtRCxPQURQO0FBRVRwQixrQ0FBTTtBQUZHLHlCQUFiO0FBSVAscUJBTEQsTUFLSztBQUNEUyx1Q0FBS0MsT0FBTCxDQUFhO0FBQ1RyQixpQ0FBS3NCLGNBQUlDLE9BQUosR0FBWSxhQURSO0FBRVRFLG9DQUFRLEtBRkM7QUFHVEMsb0NBQU87QUFDSCwwQ0FBUyxnQ0FETjtBQUVILGlEQUFnQixZQUFZLE9BQUt0QztBQUY5Qiw2QkFIRTtBQU9UUixrQ0FBSztBQUNEb0QsNkNBQVksT0FBSzNDLE1BRGhCO0FBRUQ0Qyw2Q0FBWSxPQUFLdEM7QUFGaEI7QUFQSSx5QkFBYixFQVdHZ0MsSUFYSCxDQVdRLFVBQUNDLEdBQUQsRUFBTztBQUNYO0FBQ0EsbUNBQUs5QyxVQUFMLENBQWdCb0QsT0FBaEIsQ0FBd0IsVUFBQ0MsSUFBRCxFQUFNbEQsS0FBTixFQUFjO0FBQ2xDa0QscUNBQUtDLE9BQUwsR0FBZSxDQUFDN0IsT0FBTzRCLEtBQUtFLE9BQVosS0FBc0I5QixPQUFPNEIsS0FBS0csSUFBWixJQUFvQi9CLE9BQU80QixLQUFLRSxPQUFaLENBQTFDLElBQWdFLEdBQWpFLEVBQXNFRSxPQUF0RSxDQUE4RSxDQUE5RSxDQUFmO0FBQ0Esb0NBQUdwQyxFQUFFcUIsRUFBRixJQUFRVyxLQUFLWCxFQUFoQixFQUFtQjtBQUNmVyx5Q0FBS0ssT0FBTCxHQUFlLElBQWY7QUFDQSwyQ0FBS2hELGlCQUFMLENBQXVCaUQsSUFBdkIsQ0FBNEJ0QyxFQUFFcUIsRUFBOUI7QUFDSDtBQUVKLDZCQVBEO0FBUUgseUJBckJEO0FBc0JBLCtCQUFLMUMsVUFBTCxDQUFnQnFDLEdBQWhCLEVBQXFCdUIsS0FBckIsR0FBNkIsQ0FBN0I7QUFDQUMsbUNBQVcsWUFBTTtBQUNiLG1DQUFLcEQsU0FBTCxHQUFpQixLQUFqQjtBQUNBLG1DQUFLc0MsTUFBTDtBQUNILHlCQUhELEVBR0csSUFISDtBQUlBLCtCQUFLQSxNQUFMO0FBQ0EvQiwyQkFBR1csU0FBSCxDQUFhO0FBQ1RDLG1DQUFPLE1BREU7QUFFVEMsa0NBQU07QUFGRyx5QkFBYjtBQUlIO0FBQ0osaUJBbEREO0FBbUREO0FBckRNLFM7Ozs7OztBQXVEVDt1Q0FDZWhCLFUsRUFBVztBQUFBOztBQUN0QnlCLDJCQUFLQyxPQUFMLENBQWE7QUFDVHJCLHFCQUFLc0IsY0FBSUMsT0FBSixHQUFZLGFBRFI7QUFFVEUsd0JBQVEsS0FGQztBQUdUQyx3QkFBTztBQUNILDhCQUFTLGdDQUROO0FBRUgscUNBQWdCLFlBQVksS0FBS3RDO0FBRjlCLGlCQUhFO0FBT1RSLHNCQUFLO0FBQ0RvRCxpQ0FBWSxLQUFLM0MsTUFEaEI7QUFFRDtBQUNBNEMsaUNBQVl0QztBQUhYO0FBUEksYUFBYixFQVlHZ0MsSUFaSCxDQVlRLFVBQUNDLEdBQUQsRUFBTztBQUNYO0FBQ0FBLG9CQUFJaEQsSUFBSixDQUFTbUQsT0FBVCxDQUFpQkcsT0FBakIsQ0FBeUIsVUFBQ0MsSUFBRCxFQUFNbEQsS0FBTixFQUFjO0FBQ25Da0QseUJBQUtDLE9BQUwsR0FBZSxDQUFDN0IsT0FBTzRCLEtBQUtFLE9BQVosS0FBc0I5QixPQUFPNEIsS0FBS0csSUFBWixJQUFvQi9CLE9BQU80QixLQUFLRSxPQUFaLENBQTFDLElBQWdFLEdBQWpFLEVBQXNFRSxPQUF0RSxDQUE4RSxDQUE5RSxDQUFmO0FBQ0Esd0JBQUdKLEtBQUtTLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0JULEtBQUtVLFFBQUwsSUFBZSxDQUExQyxFQUE0QztBQUN4QywrQkFBTyxLQUFQO0FBQ0gscUJBRkQsTUFFSztBQUNEViw2QkFBS1MsVUFBTCxHQUFrQkUsZUFBS0MsZUFBTCxDQUFxQlosS0FBS1MsVUFBMUIsQ0FBbEI7QUFDQVQsNkJBQUtVLFFBQUwsR0FBZ0JDLGVBQUtDLGVBQUwsQ0FBcUJaLEtBQUtVLFFBQTFCLENBQWhCO0FBQ0g7QUFDSixpQkFSRDtBQVNBLHVCQUFLL0QsVUFBTCxHQUFrQjhDLElBQUloRCxJQUFKLENBQVNtRCxPQUEzQjtBQUNBLHVCQUFLakQsVUFBTCxDQUFnQm9ELE9BQWhCLENBQXdCLFVBQUNDLElBQUQsRUFBTWxELEtBQU4sRUFBYztBQUNsQywyQkFBS08saUJBQUwsQ0FBdUIwQyxPQUF2QixDQUErQixVQUFDYyxLQUFELEVBQU8vRCxLQUFQLEVBQWU7QUFDMUMsNEJBQUdrRCxLQUFLWCxFQUFMLElBQVd3QixLQUFkLEVBQW9CO0FBQ2hCYixpQ0FBS0ssT0FBTCxHQUFlLElBQWY7QUFDSDtBQUNKLHFCQUpEO0FBS0gsaUJBTkQ7QUFPQSx1QkFBS1gsTUFBTDtBQUNILGFBaENEO0FBaUNIO0FBQ0Q7Ozs7MENBQ2lCO0FBQUE7O0FBQ2JULDJCQUFLQyxPQUFMLENBQWE7QUFDVHJCLHFCQUFLc0IsY0FBSUMsT0FBSixHQUFZLGNBRFI7QUFFVEUsd0JBQVEsS0FGQztBQUdUQyx3QkFBTztBQUNILDhCQUFTO0FBRE47QUFIRSxhQUFiLEVBTUdDLElBTkgsQ0FNUSxVQUFDQyxHQUFELEVBQU87QUFDWCx1QkFBS25DLFVBQUwsR0FBa0JtQyxJQUFJaEQsSUFBSixDQUFTbUQsT0FBM0I7QUFDQSxvQkFBRyxPQUFLdEMsVUFBTCxDQUFnQndELE1BQW5CLEVBQTBCO0FBQ3RCLDJCQUFLbEMsY0FBTCxDQUFvQixPQUFLdEIsVUFBTCxDQUFnQixDQUFoQixFQUFtQitCLEVBQXZDO0FBQ0g7QUFDRCx1QkFBS0ssTUFBTDtBQUNULGFBWks7QUFhSDs7OytCQUNNcUIsTyxFQUFTO0FBQUE7O0FBQ1pwRCxlQUFHcUQsYUFBSCxDQUFpQixFQUFDQyxLQUFLLGVBQU4sRUFBakI7QUFDQSxpQkFBSy9ELE1BQUwsR0FBYzZELFFBQVE3RCxNQUF0QjtBQUNBLGlCQUFLQyxLQUFMLEdBQWE0RCxRQUFRNUQsS0FBckI7QUFDQTtBQUNBLGdCQUFJRixRQUFRVSxHQUFHdUQsY0FBSCxDQUFrQixjQUFsQixDQUFaO0FBQ0EsaUJBQUtqRSxLQUFMLEdBQWFBLE1BQU1rRSxZQUFuQjtBQUNBLGlCQUFLQyxlQUFMO0FBQ0EsaUJBQUsxQixNQUFMO0FBQ0EvQixlQUFHMEQsYUFBSCxDQUFpQjtBQUNiQyx5QkFBUyxpQkFBQzdCLEdBQUQsRUFBUTtBQUNiLDJCQUFLL0MsVUFBTCxHQUFrQitDLElBQUk4QixZQUF0QjtBQUNBLDJCQUFLN0IsTUFBTDtBQUNIO0FBSlksYUFBakI7QUFNSDs7OztFQTFMc0NULGVBQUt1QyxJOztrQkFBM0J2RixhIiwiZmlsZSI6ImNvdXBvbnNDZW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcbmltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWxzL3V0aWwnXG5pbXBvcnQgY291cG9uSXRlbSAgZnJvbSAnLi4vY29tcG9uZW50cy9wYXllZENvdXBvbkl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjb3Vwb25zQ2VudGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlK/ku5jmiJDlip8nLFxuICAgIH07XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvdXBvbkl0ZW1cIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnN5bmNUaXRsZS5zeW5jXCI6XCJ1c2VyQ291cG9uXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgY291cG9uSXRlbTpjb3Vwb25JdGVtXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgICBNYXNrSGVpZ2h0OicnLFxuICAgICAgICB1c2VyQ291cG9uOltdLFxuICAgICAgICBNYXNrOnRydWUsXG4gICAgICAgIHNoYXJlQnRuOicnLFxuICAgICAgICBpbmRleDonJyxcbiAgICAgICAgaW5wdXRWYWx1ZTonJyxcbiAgICAgICAgbm9kYXRhOnRydWUsXG4gICAgICAgIHRva2VuOicnLFxuICAgICAgICBzaG9wSWQ6JycsXG4gICAgICAgIG1vbmV5OicnLFxuICAgICAgICBpc19saW1pdGU6ZmFsc2UsXG4gICAgICAgIGdvdENvdXBvbnNBbHJlYWR5OltdLFxuICAgICAgICBjb3Vwb25UYWJzOicnLFxuICAgICAgICBjb3Vwb25UYWI6MCxcbiAgICAgICAgaW5kdXN0cnlJZDonJyxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIC8v5Zue5Yiw5LqR5LiK6aaW6aG1XG4gICAgICAgIGJhY2tGaXJzdCgpe1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcuL2luZGV4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbVNob3coKXtcbiAgICAgICAgICAgIHRoaXMuTWFzayA9ICF0aGlzLk1hc2s7XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJJbnB1dE51bShlKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzaGFyZUJlZm9yZSgpe1xuICAgICAgICAgICAgaWYoTnVtYmVyKHRoaXMuaW5wdXRWYWx1ZSkgJiYgTnVtYmVyKHRoaXMuaW5wdXRWYWx1ZSkgPD0gTnVtYmVyKHRoaXMudXNlckNvdXBvblt0aGlzLmluZGV4XS5udW1iZXIpKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlQnRuID0gJ3NoYXJlJ1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcnXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlQnRuID0gJydcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJ1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35q2j56Gu6L6T5YWl5YiG5Lqr5qyh5pWwJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIOWIh+aNonRhYlxuICAgICAgICBjaGFuZ2VDb3Vwb25UYWIoaW5kZXgsaW5kdXN0cnlJZCl7XG4gICAgICAgICAgICB0aGlzLmNvdXBvblRhYiA9IGluZGV4O1xuICAgICAgICAgICAgdGhpcy5pbmR1c3RyeUlkID0gaW5kdXN0cnlJZDtcbiAgICAgICAgICAgIHRoaXMuZ2V0Vm91Y2hlckxpc3QoaW5kdXN0cnlJZClcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgfVxuICAgIGV2ZW50cyA9IHtcbiAgICAgIHVzZXJTZWxlY3QoZSxpZHgpe1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwgKyAnYXBpL3VzZXJfY291cG9ucy8nICsgZS5pZCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgLy/ljaHliLjmnKrpooblj5bmiJDlip/vvIzpmZDliLbnlKjmiLfngrnlh7tcbiAgICAgICAgICAgIHRoaXMuaXNfbGltaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLnN0YXR1cyAhPSAnMjAwJyl7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvY291cG9ucycsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6dGhpcy5zaG9wSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmR1c3RyeV9pZDp0aGlzLmluZHVzdHJ5SWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgLy/orqHnrpflt7Lnu4/pooblj5bnmoTnmb7liIbmr5RcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VyQ291cG9uLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBlcmNlbnQgPSAoTnVtYmVyKGl0ZW0ucmVjZWl2ZSkvKE51bWJlcihpdGVtLmxhdmUpICsgTnVtYmVyKGl0ZW0ucmVjZWl2ZSkpKjEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUuaWQgPT0gaXRlbS5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvdENvdXBvbnNBbHJlYWR5LnB1c2goZS5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbltpZHhdLmlzcmV2ID0gMVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2xpbWl0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6aKG5Y+W5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8v6I635Y+W5Y2h5Yi45YiX6KGoXG4gICAgZ2V0Vm91Y2hlckxpc3QoaW5kdXN0cnlJZCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvY291cG9ucycsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuc2hvcElkLFxuICAgICAgICAgICAgICAgIC8vIG1lcmNoYW50X2lkOjMxMCxcbiAgICAgICAgICAgICAgICBpbmR1c3RyeV9pZDppbmR1c3RyeUlkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIC8v6K6h566X5bey57uP6aKG5Y+W55qE55m+5YiG5q+UXG4gICAgICAgICAgICByZXMuZGF0YS5tZXNzYWdlLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgaXRlbS5wZXJjZW50ID0gKE51bWJlcihpdGVtLnJlY2VpdmUpLyhOdW1iZXIoaXRlbS5sYXZlKSArIE51bWJlcihpdGVtLnJlY2VpdmUpKSoxMDApLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5iZWdpbl90aW1lID09IDAgfHwgaXRlbS5lbmRfdGltZT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5iZWdpbl90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5iZWdpbl90aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmRfdGltZSA9IHV0aWwudGltZXN0YW1wVG9UaW1lKGl0ZW0uZW5kX3RpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnVzZXJDb3Vwb24gPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy51c2VyQ291cG9uLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5nb3RDb3Vwb25zQWxyZWFkeS5mb3JFYWNoKChpdGVtMSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSBpdGVtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL+iOt+WPluWNoeWIuOeahOWIhuexu1xuICAgIGdldENvdXBvbnNDYXRlcygpe1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCsnYXBpL2dldF9jYXRlJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMuY291cG9uVGFicyA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICBpZih0aGlzLmNvdXBvblRhYnMubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFZvdWNoZXJMaXN0KHRoaXMuY291cG9uVGFic1swXS5pZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcblx0XHR9KTtcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7a2V5OiAnc2VsZWN0U29uQ2FyZCd9KTtcbiAgICAgICAgdGhpcy5zaG9wSWQgPSBvcHRpb25zLnNob3BJZDtcbiAgICAgICAgdGhpcy5tb25leSA9IG9wdGlvbnMubW9uZXk7XG4gICAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgIHRoaXMuZ2V0Q291cG9uc0NhdGVzKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLk1hc2tIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9O1xufVxuIl19