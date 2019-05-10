"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var couponItem = function (_wepy$component) {
    _inherits(couponItem, _wepy$component);

    function couponItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, couponItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = couponItem.__proto__ || Object.getPrototypeOf(couponItem)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
            infoHeight: "0",
            infoHeightStatus: 0,
            isGetCoupon: 1,
            goGetWords: "立即领取",
            specialId: 0
        }, _this.methods = {
            receiveCoupon: function receiveCoupon(id, index) {
                // this.$emit('userSelect',id,index)
            },

            //显示商家说明
            showInfo: function showInfo(id) {
                if (this.specialId == id) {
                    this.specialId = 0;
                } else {
                    this.specialId = id;
                }
            },

            //领取卡券
            getCoupon: function getCoupon(item, index) {
                if (item.checked == undefined) {
                    //立即领取
                    this.$emit('userSelect', item, index);
                } else {
                    //去使用，跳转
                    if (item.shop_type == 1 || item.shop_type == 2) {
                        //电商的店铺
                        wx.redirectTo({
                            url: '../../e/page/index/index?id=' + item.merchant_id
                        });
                    } else if (item.shop_type == 3 || item.shop_type == 4) {
                        wx.redirectTo({
                            url: './f/page/index/index?id=' + item.merchant_id
                        });
                    }
                }
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Array,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return couponItem;
}(_wepy2.default.component);

exports.default = couponItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheWVkQ291cG9uSXRlbS5qcyJdLCJuYW1lcyI6WyJjb3Vwb25JdGVtIiwiY29tcG9uZW50cyIsImRhdGEiLCJpbmZvSGVpZ2h0IiwiaW5mb0hlaWdodFN0YXR1cyIsImlzR2V0Q291cG9uIiwiZ29HZXRXb3JkcyIsInNwZWNpYWxJZCIsIm1ldGhvZHMiLCJyZWNlaXZlQ291cG9uIiwiaWQiLCJpbmRleCIsInNob3dJbmZvIiwiZ2V0Q291cG9uIiwiaXRlbSIsImNoZWNrZWQiLCJ1bmRlZmluZWQiLCIkZW1pdCIsInNob3BfdHlwZSIsInd4IiwicmVkaXJlY3RUbyIsInVybCIsIm1lcmNoYW50X2lkIiwiZXZlbnRzIiwicHJvcHMiLCJzeW5jVGl0bGUiLCJ0eXBlIiwiQXJyYXkiLCJkZWZhdWx0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLHdCQUFXLEdBRFI7QUFFSEMsOEJBQWlCLENBRmQ7QUFHSEMseUJBQVksQ0FIVDtBQUlIQyx3QkFBVyxNQUpSO0FBS0hDLHVCQUFVO0FBTFAsUyxRQU9QQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1FDLEVBRFIsRUFDV0MsS0FEWCxFQUNpQjtBQUNuQjtBQUNILGFBSEs7O0FBSU47QUFDQUMsb0JBTE0sb0JBS0dGLEVBTEgsRUFLTTtBQUNSLG9CQUFHLEtBQUtILFNBQUwsSUFBa0JHLEVBQXJCLEVBQXdCO0FBQ3BCLHlCQUFLSCxTQUFMLEdBQWlCLENBQWpCO0FBQ0gsaUJBRkQsTUFFSztBQUNELHlCQUFLQSxTQUFMLEdBQWlCRyxFQUFqQjtBQUNIO0FBQ0osYUFYSzs7QUFZTjtBQUNBRyxxQkFiTSxxQkFhSUMsSUFiSixFQWFTSCxLQWJULEVBYWU7QUFDakIsb0JBQUdHLEtBQUtDLE9BQUwsSUFBZ0JDLFNBQW5CLEVBQTZCO0FBQ3pCO0FBQ0EseUJBQUtDLEtBQUwsQ0FBVyxZQUFYLEVBQXdCSCxJQUF4QixFQUE2QkgsS0FBN0I7QUFDSCxpQkFIRCxNQUdLO0FBQ0Q7QUFDQSx3QkFBR0csS0FBS0ksU0FBTCxJQUFrQixDQUFsQixJQUF1QkosS0FBS0ksU0FBTCxJQUFrQixDQUE1QyxFQUE4QztBQUMxQztBQUNBQywyQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLGlDQUFLLGlDQUFpQ1AsS0FBS1E7QUFEakMseUJBQWQ7QUFHSCxxQkFMRCxNQUtNLElBQUdSLEtBQUtJLFNBQUwsSUFBa0IsQ0FBbEIsSUFBdUJKLEtBQUtJLFNBQUwsSUFBa0IsQ0FBNUMsRUFBOEM7QUFDaERDLDJCQUFHQyxVQUFILENBQWM7QUFDVkMsaUNBQUssNkJBQTZCUCxLQUFLUTtBQUQ3Qix5QkFBZDtBQUdIO0FBQ0o7QUFDSjtBQTlCSyxTLFFBZ0NWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkMsdUJBQVc7QUFDUEMsc0JBQU1DLEtBREM7QUFFUEMseUJBQVM7QUFGRjtBQURQLFM7Ozs7RUEzQzRCQyxlQUFLQyxTOztrQkFBeEI5QixVIiwiZmlsZSI6InBheWVkQ291cG9uSXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjb3Vwb25JdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIGluZm9IZWlnaHQ6XCIwXCIsXG4gICAgICAgIGluZm9IZWlnaHRTdGF0dXM6MCxcbiAgICAgICAgaXNHZXRDb3Vwb246MSxcbiAgICAgICAgZ29HZXRXb3JkczpcIueri+WNs+mihuWPllwiLFxuICAgICAgICBzcGVjaWFsSWQ6MCxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHJlY2VpdmVDb3Vwb24oaWQsaW5kZXgpe1xuICAgICAgICAgICAgLy8gdGhpcy4kZW1pdCgndXNlclNlbGVjdCcsaWQsaW5kZXgpXG4gICAgICAgIH0sXG4gICAgICAgIC8v5pi+56S65ZWG5a626K+05piOXG4gICAgICAgIHNob3dJbmZvKGlkKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3BlY2lhbElkID09IGlkKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxJZCA9IDA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxJZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvL+mihuWPluWNoeWIuFxuICAgICAgICBnZXRDb3Vwb24oaXRlbSxpbmRleCl7XG4gICAgICAgICAgICBpZihpdGVtLmNoZWNrZWQgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAvL+eri+WNs+mihuWPllxuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3VzZXJTZWxlY3QnLGl0ZW0saW5kZXgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL+WOu+S9v+eUqO+8jOi3s+i9rFxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uc2hvcF90eXBlID09IDEgfHwgaXRlbS5zaG9wX3R5cGUgPT0gMil7XG4gICAgICAgICAgICAgICAgICAgIC8v55S15ZWG55qE5bqX6ZO6XG4gICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vLi4vZS9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBpdGVtLm1lcmNoYW50X2lkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW0uc2hvcF90eXBlID09IDMgfHwgaXRlbS5zaG9wX3R5cGUgPT0gNCl7XG4gICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGl0ZW0ubWVyY2hhbnRfaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7fTtcbiAgICBwcm9wcyA9IHtcbiAgICAgICAgc3luY1RpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xuICAgICAgICB9XG4gICAgfVxufVxuIl19