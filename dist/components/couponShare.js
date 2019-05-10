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

var couponShare = function (_wepy$component) {
    _inherits(couponShare, _wepy$component);

    function couponShare() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, couponShare);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = couponShare.__proto__ || Object.getPrototypeOf(couponShare)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
            Mask: false,
            infoHeight: "0",
            infoHeightStatus: 0,
            isGetCoupon: 1,
            goGetWords: "立即领取",
            specialId: 0
        }, _this.methods = {
            tapStop: function tapStop(index, couponId) {
                // console.log(index)
                this.$emit('Popup', index, couponId);
            },

            //显示商家说明
            showInfo: function showInfo(id) {
                if (this.specialId == id) {
                    console.log("id不同");
                    this.specialId = 0;
                } else {
                    console.log("id不同");
                    this.specialId = id;
                }
            },

            //去使用
            toUse: function toUse(item) {
                if (item.shop_type == 1 || item.shop_type == 2) {
                    //电商的店铺
                    wx.redirectTo({
                        // url: './e/page/homePage?id=' + item.merchant_id
                        url: './e/page/index/index?id=' + item.merchant_id + '&shopType=' + item.shop_type
                    });
                } else if (item.shop_type == 3 || item.shop_type == 4) {
                    //餐饮的店铺
                    wx.redirectTo({
                        url: './f/page/index/index?id=' + item.merchant_id + '&shopType=' + item.shop_type
                    });
                }
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return couponShare;
}(_wepy2.default.component);

exports.default = couponShare;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvblNoYXJlLmpzIl0sIm5hbWVzIjpbImNvdXBvblNoYXJlIiwiY29tcG9uZW50cyIsImRhdGEiLCJNYXNrIiwiaW5mb0hlaWdodCIsImluZm9IZWlnaHRTdGF0dXMiLCJpc0dldENvdXBvbiIsImdvR2V0V29yZHMiLCJzcGVjaWFsSWQiLCJtZXRob2RzIiwidGFwU3RvcCIsImluZGV4IiwiY291cG9uSWQiLCIkZW1pdCIsInNob3dJbmZvIiwiaWQiLCJjb25zb2xlIiwibG9nIiwidG9Vc2UiLCJpdGVtIiwic2hvcF90eXBlIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwibWVyY2hhbnRfaWQiLCJldmVudHMiLCJwcm9wcyIsInN5bmNUaXRsZSIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLGtCQUFLLEtBREY7QUFFSEMsd0JBQVcsR0FGUjtBQUdIQyw4QkFBaUIsQ0FIZDtBQUlIQyx5QkFBWSxDQUpUO0FBS0hDLHdCQUFXLE1BTFI7QUFNSEMsdUJBQVU7QUFOUCxTLFFBUVBDLE8sR0FBVTtBQUNOQyxtQkFETSxtQkFDRUMsS0FERixFQUNRQyxRQURSLEVBQ2lCO0FBQ25CO0FBQ0EscUJBQUtDLEtBQUwsQ0FBVyxPQUFYLEVBQW9CRixLQUFwQixFQUEwQkMsUUFBMUI7QUFDSCxhQUpLOztBQUtOO0FBQ0FFLG9CQU5NLG9CQU1HQyxFQU5ILEVBTU07QUFDUixvQkFBRyxLQUFLUCxTQUFMLElBQWtCTyxFQUFyQixFQUF3QjtBQUNwQkMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EseUJBQUtULFNBQUwsR0FBaUIsQ0FBakI7QUFDSCxpQkFIRCxNQUdLO0FBQ0RRLDRCQUFRQyxHQUFSLENBQVksTUFBWjtBQUNBLHlCQUFLVCxTQUFMLEdBQWlCTyxFQUFqQjtBQUNIO0FBQ0osYUFkSzs7QUFlTjtBQUNBRyxpQkFoQk0saUJBZ0JBQyxJQWhCQSxFQWdCSztBQUNQLG9CQUFHQSxLQUFLQyxTQUFMLElBQWtCLENBQWxCLElBQXVCRCxLQUFLQyxTQUFMLElBQWtCLENBQTVDLEVBQThDO0FBQzFDO0FBQ0FDLHVCQUFHQyxVQUFILENBQWM7QUFDVjtBQUNBQyw2QkFBSyw2QkFBNkJKLEtBQUtLLFdBQWxDLEdBQWdELFlBQWhELEdBQStETCxLQUFLQztBQUYvRCxxQkFBZDtBQUlILGlCQU5ELE1BTU0sSUFBR0QsS0FBS0MsU0FBTCxJQUFrQixDQUFsQixJQUF1QkQsS0FBS0MsU0FBTCxJQUFrQixDQUE1QyxFQUE4QztBQUNoRDtBQUNBQyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLDZCQUFLLDZCQUE2QkosS0FBS0ssV0FBbEMsR0FBZ0QsWUFBaEQsR0FBK0RMLEtBQUtDO0FBRC9ELHFCQUFkO0FBR0g7QUFDSjtBQTdCSyxTLFFBZ0NWSyxNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkMsdUJBQVc7QUFDUEMsc0JBQU1DLE1BREM7QUFFUEMseUJBQVM7QUFGRjtBQURQLFM7Ozs7RUE1QzZCQyxlQUFLQyxTOztrQkFBekJoQyxXIiwiZmlsZSI6ImNvdXBvblNoYXJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvdXBvblNoYXJlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIE1hc2s6ZmFsc2UsXG4gICAgICAgIGluZm9IZWlnaHQ6XCIwXCIsXG4gICAgICAgIGluZm9IZWlnaHRTdGF0dXM6MCxcbiAgICAgICAgaXNHZXRDb3Vwb246MSxcbiAgICAgICAgZ29HZXRXb3JkczpcIueri+WNs+mihuWPllwiLFxuICAgICAgICBzcGVjaWFsSWQ6MCxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHRhcFN0b3AoaW5kZXgsY291cG9uSWQpe1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaW5kZXgpXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdQb3B1cCcsIGluZGV4LGNvdXBvbklkKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy/mmL7npLrllYblrrbor7TmmI5cbiAgICAgICAgc2hvd0luZm8oaWQpe1xuICAgICAgICAgICAgaWYodGhpcy5zcGVjaWFsSWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWTkuI3lkIxcIilcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxJZCA9IDA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlk5LiN5ZCMXCIpXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVjaWFsSWQgPSBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy/ljrvkvb/nlKhcbiAgICAgICAgdG9Vc2UoaXRlbSl7XG4gICAgICAgICAgICBpZihpdGVtLnNob3BfdHlwZSA9PSAxIHx8IGl0ZW0uc2hvcF90eXBlID09IDIpe1xuICAgICAgICAgICAgICAgIC8v55S15ZWG55qE5bqX6ZO6XG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVybDogJy4vZS9wYWdlL2hvbWVQYWdlP2lkPScgKyBpdGVtLm1lcmNoYW50X2lkXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vZS9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBpdGVtLm1lcmNoYW50X2lkICsgJyZzaG9wVHlwZT0nICsgaXRlbS5zaG9wX3R5cGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGl0ZW0uc2hvcF90eXBlID09IDMgfHwgaXRlbS5zaG9wX3R5cGUgPT0gNCl7XG4gICAgICAgICAgICAgICAgLy/ppJDppa7nmoTlupfpk7pcbiAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGl0ZW0ubWVyY2hhbnRfaWQgKyAnJnNob3BUeXBlPScgKyBpdGVtLnNob3BfdHlwZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xuICAgICAgICB9XG4gICAgfTtcblxufVxuIl19