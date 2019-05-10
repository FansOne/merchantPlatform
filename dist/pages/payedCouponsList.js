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

var payedCouponsList = function (_wepy$page) {
    _inherits(payedCouponsList, _wepy$page);

    function payedCouponsList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, payedCouponsList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = payedCouponsList.__proto__ || Object.getPrototypeOf(payedCouponsList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
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

    _createClass(payedCouponsList, [{
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

    return payedCouponsList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(payedCouponsList , 'pages/payedCouponsList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWVkQ291cG9uc0xpc3QuanMiXSwibmFtZXMiOlsicGF5ZWRDb3Vwb25zTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3Vwb25JdGVtIiwiZGF0YSIsIk1hc2tIZWlnaHQiLCJ1c2VyQ291cG9uIiwiTWFzayIsInNoYXJlQnRuIiwiaW5kZXgiLCJpbnB1dFZhbHVlIiwibm9kYXRhIiwidG9rZW4iLCJzaG9wSWQiLCJtb25leSIsImlzX2xpbWl0ZSIsImdvdENvdXBvbnNBbHJlYWR5IiwiY291cG9uVGFicyIsImNvdXBvblRhYiIsImluZHVzdHJ5SWQiLCJtZXRob2RzIiwiYmFja0ZpcnN0Iiwid3giLCJzd2l0Y2hUYWIiLCJ1cmwiLCJib3R0b21TaG93IiwidXNlcklucHV0TnVtIiwiZSIsImRldGFpbCIsInZhbHVlIiwic2hhcmVCZWZvcmUiLCJOdW1iZXIiLCJudW1iZXIiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJjaGFuZ2VDb3Vwb25UYWIiLCJnZXRWb3VjaGVyTGlzdCIsImNvbXB1dGVkIiwiZXZlbnRzIiwidXNlclNlbGVjdCIsImlkeCIsIndlcHkiLCJyZXF1ZXN0IiwiYXBpIiwiYXBpTWFsbCIsImlkIiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsIiRhcHBseSIsInN0YXR1cyIsIm1lc3NhZ2UiLCJtZXJjaGFudF9pZCIsImluZHVzdHJ5X2lkIiwiZm9yRWFjaCIsIml0ZW0iLCJwZXJjZW50IiwicmVjZWl2ZSIsImxhdmUiLCJ0b0ZpeGVkIiwiY2hlY2tlZCIsInB1c2giLCJpc3JldiIsInNldFRpbWVvdXQiLCJiZWdpbl90aW1lIiwiZW5kX3RpbWUiLCJ1dGlsIiwidGltZXN0YW1wVG9UaW1lIiwiaXRlbTEiLCJsZW5ndGgiLCJvcHRpb25zIiwicmVtb3ZlU3RvcmFnZSIsImtleSIsImdldFN0b3JhZ2VTeW5jIiwiYWNjZXNzX3Rva2VuIiwiZ2V0Q291cG9uc0NhdGVzIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJ3aW5kb3dIZWlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxnQjs7Ozs7Ozs7Ozs7Ozs7OE1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHlCQUF3QixZQUEzQyxFQUFkLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DLHdCQUFXQTtBQURMLFMsUUFHVkMsSSxHQUFPO0FBQ0hDLHdCQUFXLEVBRFI7QUFFSEMsd0JBQVcsRUFGUjtBQUdIQyxrQkFBSyxJQUhGO0FBSUhDLHNCQUFTLEVBSk47QUFLSEMsbUJBQU0sRUFMSDtBQU1IQyx3QkFBVyxFQU5SO0FBT0hDLG9CQUFPLElBUEo7QUFRSEMsbUJBQU0sRUFSSDtBQVNIQyxvQkFBTyxFQVRKO0FBVUhDLG1CQUFNLEVBVkg7QUFXSEMsdUJBQVUsS0FYUDtBQVlIQywrQkFBa0IsRUFaZjtBQWFIQyx3QkFBVyxFQWJSO0FBY0hDLHVCQUFVLENBZFA7QUFlSEMsd0JBQVc7QUFmUixTLFFBaUJQQyxPLEdBQVU7QUFDTjtBQUNBQyxxQkFGTSx1QkFFSztBQUNQQyxtQkFBR0MsU0FBSCxDQUFhO0FBQ1RDLHlCQUFLO0FBREksaUJBQWI7QUFHSCxhQU5LO0FBT05DLHNCQVBNLHdCQU9NO0FBQ1IscUJBQUtsQixJQUFMLEdBQVksQ0FBQyxLQUFLQSxJQUFsQjtBQUNILGFBVEs7QUFVTm1CLHdCQVZNLHdCQVVPQyxDQVZQLEVBVVM7QUFDWCxxQkFBS2pCLFVBQUwsR0FBa0JpQixFQUFFQyxNQUFGLENBQVNDLEtBQTNCO0FBQ0gsYUFaSztBQWFOQyx1QkFiTSx5QkFhTztBQUNULG9CQUFHQyxPQUFPLEtBQUtyQixVQUFaLEtBQTJCcUIsT0FBTyxLQUFLckIsVUFBWixLQUEyQnFCLE9BQU8sS0FBS3pCLFVBQUwsQ0FBZ0IsS0FBS0csS0FBckIsRUFBNEJ1QixNQUFuQyxDQUF6RCxFQUFvRztBQUNoRyx5QkFBS3hCLFFBQUwsR0FBZ0IsT0FBaEI7QUFDQSx5QkFBS0UsVUFBTCxHQUFrQixFQUFsQjtBQUNILGlCQUhELE1BR0s7QUFDRCx5QkFBS0YsUUFBTCxHQUFnQixFQUFoQjtBQUNBLHlCQUFLRSxVQUFMLEdBQWtCLEVBQWxCO0FBQ0FZLHVCQUFHVyxTQUFILENBQWE7QUFDVEMsK0JBQU8sV0FERTtBQUVUQyw4QkFBTSxNQUZHO0FBR1RDLGtDQUFVLElBSEQ7QUFJVEMsOEJBQU07QUFKRyxxQkFBYjtBQU1IO0FBQ0osYUEzQks7O0FBNEJOO0FBQ0FDLDJCQTdCTSwyQkE2QlU3QixLQTdCVixFQTZCZ0JVLFVBN0JoQixFQTZCMkI7QUFDN0IscUJBQUtELFNBQUwsR0FBaUJULEtBQWpCO0FBQ0EscUJBQUtVLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EscUJBQUtvQixjQUFMLENBQW9CcEIsVUFBcEI7QUFDSDtBQWpDSyxTLFFBbUNWcUIsUSxHQUFXLEUsUUFFWEMsTSxHQUFTO0FBQ1BDLHNCQURPLHNCQUNJZixDQURKLEVBQ01nQixHQUROLEVBQ1U7QUFBQTs7QUFDZkMsK0JBQUtDLE9BQUwsQ0FBYTtBQUNYckIseUJBQUtzQixjQUFJQyxPQUFKLEdBQWMsbUJBQWQsR0FBb0NwQixFQUFFcUIsRUFEaEM7QUFFWEMsNEJBQVEsS0FGRztBQUdYQyw0QkFBTztBQUNMLGtDQUFTLGdDQURKO0FBRUwseUNBQWdCLFlBQVksS0FBS3RDO0FBRjVCO0FBSEksaUJBQWIsRUFPR3VDLElBUEgsQ0FPUSxVQUFDQyxHQUFELEVBQU87QUFDWDtBQUNBLDJCQUFLckMsU0FBTCxHQUFpQixJQUFqQjtBQUNBLDJCQUFLc0MsTUFBTDtBQUNBLHdCQUFHRCxJQUFJaEQsSUFBSixDQUFTa0QsTUFBVCxJQUFtQixLQUF0QixFQUE0QjtBQUNwQmhDLDJCQUFHVyxTQUFILENBQWE7QUFDVEMsbUNBQU9rQixJQUFJaEQsSUFBSixDQUFTbUQsT0FEUDtBQUVUcEIsa0NBQU07QUFGRyx5QkFBYjtBQUlQLHFCQUxELE1BS0s7QUFDRFMsdUNBQUtDLE9BQUwsQ0FBYTtBQUNUckIsaUNBQUtzQixjQUFJQyxPQUFKLEdBQVksYUFEUjtBQUVURSxvQ0FBUSxLQUZDO0FBR1RDLG9DQUFPO0FBQ0gsMENBQVMsZ0NBRE47QUFFSCxpREFBZ0IsWUFBWSxPQUFLdEM7QUFGOUIsNkJBSEU7QUFPVFIsa0NBQUs7QUFDRG9ELDZDQUFZLE9BQUszQyxNQURoQjtBQUVENEMsNkNBQVksT0FBS3RDO0FBRmhCO0FBUEkseUJBQWIsRUFXR2dDLElBWEgsQ0FXUSxVQUFDQyxHQUFELEVBQU87QUFDWDtBQUNBLG1DQUFLOUMsVUFBTCxDQUFnQm9ELE9BQWhCLENBQXdCLFVBQUNDLElBQUQsRUFBTWxELEtBQU4sRUFBYztBQUNsQ2tELHFDQUFLQyxPQUFMLEdBQWUsQ0FBQzdCLE9BQU80QixLQUFLRSxPQUFaLEtBQXNCOUIsT0FBTzRCLEtBQUtHLElBQVosSUFBb0IvQixPQUFPNEIsS0FBS0UsT0FBWixDQUExQyxJQUFnRSxHQUFqRSxFQUFzRUUsT0FBdEUsQ0FBOEUsQ0FBOUUsQ0FBZjtBQUNBLG9DQUFHcEMsRUFBRXFCLEVBQUYsSUFBUVcsS0FBS1gsRUFBaEIsRUFBbUI7QUFDZlcseUNBQUtLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsMkNBQUtoRCxpQkFBTCxDQUF1QmlELElBQXZCLENBQTRCdEMsRUFBRXFCLEVBQTlCO0FBQ0g7QUFFSiw2QkFQRDtBQVFILHlCQXJCRDtBQXNCQSwrQkFBSzFDLFVBQUwsQ0FBZ0JxQyxHQUFoQixFQUFxQnVCLEtBQXJCLEdBQTZCLENBQTdCO0FBQ0FDLG1DQUFXLFlBQU07QUFDYixtQ0FBS3BELFNBQUwsR0FBaUIsS0FBakI7QUFDQSxtQ0FBS3NDLE1BQUw7QUFDSCx5QkFIRCxFQUdHLElBSEg7QUFJQSwrQkFBS0EsTUFBTDtBQUNBL0IsMkJBQUdXLFNBQUgsQ0FBYTtBQUNUQyxtQ0FBTyxNQURFO0FBRVRDLGtDQUFNO0FBRkcseUJBQWI7QUFJSDtBQUNKLGlCQWxERDtBQW1ERDtBQXJETSxTOzs7Ozs7QUF1RFQ7dUNBQ2VoQixVLEVBQVc7QUFBQTs7QUFDdEJ5QiwyQkFBS0MsT0FBTCxDQUFhO0FBQ1RyQixxQkFBS3NCLGNBQUlDLE9BQUosR0FBWSxhQURSO0FBRVRFLHdCQUFRLEtBRkM7QUFHVEMsd0JBQU87QUFDSCw4QkFBUyxnQ0FETjtBQUVILHFDQUFnQixZQUFZLEtBQUt0QztBQUY5QixpQkFIRTtBQU9UUixzQkFBSztBQUNEb0QsaUNBQVksS0FBSzNDLE1BRGhCO0FBRUQ7QUFDQTRDLGlDQUFZdEM7QUFIWDtBQVBJLGFBQWIsRUFZR2dDLElBWkgsQ0FZUSxVQUFDQyxHQUFELEVBQU87QUFDWDtBQUNBQSxvQkFBSWhELElBQUosQ0FBU21ELE9BQVQsQ0FBaUJHLE9BQWpCLENBQXlCLFVBQUNDLElBQUQsRUFBTWxELEtBQU4sRUFBYztBQUNuQ2tELHlCQUFLQyxPQUFMLEdBQWUsQ0FBQzdCLE9BQU80QixLQUFLRSxPQUFaLEtBQXNCOUIsT0FBTzRCLEtBQUtHLElBQVosSUFBb0IvQixPQUFPNEIsS0FBS0UsT0FBWixDQUExQyxJQUFnRSxHQUFqRSxFQUFzRUUsT0FBdEUsQ0FBOEUsQ0FBOUUsQ0FBZjtBQUNBLHdCQUFHSixLQUFLUyxVQUFMLElBQW1CLENBQW5CLElBQXdCVCxLQUFLVSxRQUFMLElBQWUsQ0FBMUMsRUFBNEM7QUFDeEMsK0JBQU8sS0FBUDtBQUNILHFCQUZELE1BRUs7QUFDRFYsNkJBQUtTLFVBQUwsR0FBa0JFLGVBQUtDLGVBQUwsQ0FBcUJaLEtBQUtTLFVBQTFCLENBQWxCO0FBQ0FULDZCQUFLVSxRQUFMLEdBQWdCQyxlQUFLQyxlQUFMLENBQXFCWixLQUFLVSxRQUExQixDQUFoQjtBQUNIO0FBQ0osaUJBUkQ7QUFTQSx1QkFBSy9ELFVBQUwsR0FBa0I4QyxJQUFJaEQsSUFBSixDQUFTbUQsT0FBM0I7QUFDQSx1QkFBS2pELFVBQUwsQ0FBZ0JvRCxPQUFoQixDQUF3QixVQUFDQyxJQUFELEVBQU1sRCxLQUFOLEVBQWM7QUFDbEMsMkJBQUtPLGlCQUFMLENBQXVCMEMsT0FBdkIsQ0FBK0IsVUFBQ2MsS0FBRCxFQUFPL0QsS0FBUCxFQUFlO0FBQzFDLDRCQUFHa0QsS0FBS1gsRUFBTCxJQUFXd0IsS0FBZCxFQUFvQjtBQUNoQmIsaUNBQUtLLE9BQUwsR0FBZSxJQUFmO0FBQ0g7QUFDSixxQkFKRDtBQUtILGlCQU5EO0FBT0EsdUJBQUtYLE1BQUw7QUFDSCxhQWhDRDtBQWlDSDtBQUNEOzs7OzBDQUNpQjtBQUFBOztBQUNiVCwyQkFBS0MsT0FBTCxDQUFhO0FBQ1RyQixxQkFBS3NCLGNBQUlDLE9BQUosR0FBWSxjQURSO0FBRVRFLHdCQUFRLEtBRkM7QUFHVEMsd0JBQU87QUFDSCw4QkFBUztBQUROO0FBSEUsYUFBYixFQU1HQyxJQU5ILENBTVEsVUFBQ0MsR0FBRCxFQUFPO0FBQ1gsdUJBQUtuQyxVQUFMLEdBQWtCbUMsSUFBSWhELElBQUosQ0FBU21ELE9BQTNCO0FBQ0Esb0JBQUcsT0FBS3RDLFVBQUwsQ0FBZ0J3RCxNQUFuQixFQUEwQjtBQUN0QiwyQkFBS2xDLGNBQUwsQ0FBb0IsT0FBS3RCLFVBQUwsQ0FBZ0IsQ0FBaEIsRUFBbUIrQixFQUF2QztBQUNIO0FBQ0QsdUJBQUtLLE1BQUw7QUFDVCxhQVpLO0FBYUg7OzsrQkFDTXFCLE8sRUFBUztBQUFBOztBQUNacEQsZUFBR3FELGFBQUgsQ0FBaUIsRUFBQ0MsS0FBSyxlQUFOLEVBQWpCO0FBQ0EsaUJBQUsvRCxNQUFMLEdBQWM2RCxRQUFRN0QsTUFBdEI7QUFDQSxpQkFBS0MsS0FBTCxHQUFhNEQsUUFBUTVELEtBQXJCO0FBQ0E7QUFDQSxnQkFBSUYsUUFBUVUsR0FBR3VELGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWjtBQUNBLGlCQUFLakUsS0FBTCxHQUFhQSxNQUFNa0UsWUFBbkI7QUFDQSxpQkFBS0MsZUFBTDtBQUNBLGlCQUFLMUIsTUFBTDtBQUNBL0IsZUFBRzBELGFBQUgsQ0FBaUI7QUFDYkMseUJBQVMsaUJBQUM3QixHQUFELEVBQVE7QUFDYiwyQkFBSy9DLFVBQUwsR0FBa0IrQyxJQUFJOEIsWUFBdEI7QUFDQSwyQkFBSzdCLE1BQUw7QUFDSDtBQUpZLGFBQWpCO0FBTUg7Ozs7RUExTHlDVCxlQUFLdUMsSTs7a0JBQTlCdkYsZ0IiLCJmaWxlIjoicGF5ZWRDb3Vwb25zTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbHMvdXRpbCdcbmltcG9ydCBjb3Vwb25JdGVtICBmcm9tICcuLi9jb21wb25lbnRzL3BheWVkQ291cG9uSXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBheWVkQ291cG9uc0xpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUr+S7mOaIkOWKnycsXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiY291cG9uSXRlbVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c3luY1RpdGxlLnN5bmNcIjpcInVzZXJDb3Vwb25cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICBjb3Vwb25JdGVtOmNvdXBvbkl0ZW1cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIE1hc2tIZWlnaHQ6JycsXG4gICAgICAgIHVzZXJDb3Vwb246W10sXG4gICAgICAgIE1hc2s6dHJ1ZSxcbiAgICAgICAgc2hhcmVCdG46JycsXG4gICAgICAgIGluZGV4OicnLFxuICAgICAgICBpbnB1dFZhbHVlOicnLFxuICAgICAgICBub2RhdGE6dHJ1ZSxcbiAgICAgICAgdG9rZW46JycsXG4gICAgICAgIHNob3BJZDonJyxcbiAgICAgICAgbW9uZXk6JycsXG4gICAgICAgIGlzX2xpbWl0ZTpmYWxzZSxcbiAgICAgICAgZ290Q291cG9uc0FscmVhZHk6W10sXG4gICAgICAgIGNvdXBvblRhYnM6JycsXG4gICAgICAgIGNvdXBvblRhYjowLFxuICAgICAgICBpbmR1c3RyeUlkOicnLFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy/lm57liLDkupHkuIrpppbpobVcbiAgICAgICAgYmFja0ZpcnN0KCl7XG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tU2hvdygpe1xuICAgICAgICAgICAgdGhpcy5NYXNrID0gIXRoaXMuTWFzaztcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcklucHV0TnVtKGUpe1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNoYXJlQmVmb3JlKCl7XG4gICAgICAgICAgICBpZihOdW1iZXIodGhpcy5pbnB1dFZhbHVlKSAmJiBOdW1iZXIodGhpcy5pbnB1dFZhbHVlKSA8PSBOdW1iZXIodGhpcy51c2VyQ291cG9uW3RoaXMuaW5kZXhdLm51bWJlcikpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVCdG4gPSAnc2hhcmUnXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJydcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVCdG4gPSAnJ1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcnXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7fmraPnoa7ovpPlhaXliIbkuqvmrKHmlbAnLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8g5YiH5o2idGFiXG4gICAgICAgIGNoYW5nZUNvdXBvblRhYihpbmRleCxpbmR1c3RyeUlkKXtcbiAgICAgICAgICAgIHRoaXMuY291cG9uVGFiID0gaW5kZXg7XG4gICAgICAgICAgICB0aGlzLmluZHVzdHJ5SWQgPSBpbmR1c3RyeUlkO1xuICAgICAgICAgICAgdGhpcy5nZXRWb3VjaGVyTGlzdChpbmR1c3RyeUlkKVxuICAgICAgICB9XG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG4gICAgZXZlbnRzID0ge1xuICAgICAgdXNlclNlbGVjdChlLGlkeCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCArICdhcGkvdXNlcl9jb3Vwb25zLycgKyBlLmlkLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAvL+WNoeWIuOacqumihuWPluaIkOWKn++8jOmZkOWItueUqOaIt+eCueWHu1xuICAgICAgICAgICAgdGhpcy5pc19saW1pdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgaWYocmVzLmRhdGEuc3RhdHVzICE9ICcyMDAnKXtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9jb3Vwb25zJyxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLnNob3BJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZHVzdHJ5X2lkOnRoaXMuaW5kdXN0cnlJZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAvL+iuoeeul+W3sue7j+mihuWPlueahOeZvuWIhuavlFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJDb3Vwb24uZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGVyY2VudCA9IChOdW1iZXIoaXRlbS5yZWNlaXZlKS8oTnVtYmVyKGl0ZW0ubGF2ZSkgKyBOdW1iZXIoaXRlbS5yZWNlaXZlKSkqMTAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZS5pZCA9PSBpdGVtLmlkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ290Q291cG9uc0FscmVhZHkucHVzaChlLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ291cG9uW2lkeF0uaXNyZXYgPSAxXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfbGltaXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfpooblj5bmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgLy/ojrflj5bljaHliLjliJfooahcbiAgICBnZXRWb3VjaGVyTGlzdChpbmR1c3RyeUlkKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9jb3Vwb25zJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgbWVyY2hhbnRfaWQ6dGhpcy5zaG9wSWQsXG4gICAgICAgICAgICAgICAgLy8gbWVyY2hhbnRfaWQ6MzEwLFxuICAgICAgICAgICAgICAgIGluZHVzdHJ5X2lkOmluZHVzdHJ5SWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgLy/orqHnrpflt7Lnu4/pooblj5bnmoTnmb7liIbmr5RcbiAgICAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICBpdGVtLnBlcmNlbnQgPSAoTnVtYmVyKGl0ZW0ucmVjZWl2ZSkvKE51bWJlcihpdGVtLmxhdmUpICsgTnVtYmVyKGl0ZW0ucmVjZWl2ZSkpKjEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBpZihpdGVtLmJlZ2luX3RpbWUgPT0gMCB8fCBpdGVtLmVuZF90aW1lPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJlZ2luX3RpbWUgPSB1dGlsLnRpbWVzdGFtcFRvVGltZShpdGVtLmJlZ2luX3RpbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZF90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5lbmRfdGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbiA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnVzZXJDb3Vwb24uZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmdvdENvdXBvbnNBbHJlYWR5LmZvckVhY2goKGl0ZW0xLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihpdGVtLmlkID09IGl0ZW0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8v6I635Y+W5Y2h5Yi455qE5YiG57G7XG4gICAgZ2V0Q291cG9uc0NhdGVzKCl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvZ2V0X2NhdGUnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy5jb3Vwb25UYWJzID0gcmVzLmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIGlmKHRoaXMuY291cG9uVGFicy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Vm91Y2hlckxpc3QodGhpcy5jb3Vwb25UYWJzWzBdLmlkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuXHRcdH0pO1xuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICB3eC5yZW1vdmVTdG9yYWdlKHtrZXk6ICdzZWxlY3RTb25DYXJkJ30pO1xuICAgICAgICB0aGlzLnNob3BJZCA9IG9wdGlvbnMuc2hvcElkO1xuICAgICAgICB0aGlzLm1vbmV5ID0gb3B0aW9ucy5tb25leTtcbiAgICAgICAgLy/ojrflj5Z0b2tlblxuICAgICAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy5nZXRDb3Vwb25zQ2F0ZXMoKVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuTWFza0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH07XG59XG4iXX0=