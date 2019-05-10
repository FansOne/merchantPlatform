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
                            url: '../../../f/page/index/index?id=' + item.merchant_id
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdXBvbkl0ZW0uanMiXSwibmFtZXMiOlsiY291cG9uSXRlbSIsImNvbXBvbmVudHMiLCJkYXRhIiwiaW5mb0hlaWdodCIsImluZm9IZWlnaHRTdGF0dXMiLCJpc0dldENvdXBvbiIsImdvR2V0V29yZHMiLCJzcGVjaWFsSWQiLCJtZXRob2RzIiwicmVjZWl2ZUNvdXBvbiIsImlkIiwiaW5kZXgiLCJzaG93SW5mbyIsImdldENvdXBvbiIsIml0ZW0iLCJjaGVja2VkIiwidW5kZWZpbmVkIiwiJGVtaXQiLCJzaG9wX3R5cGUiLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJtZXJjaGFudF9pZCIsImV2ZW50cyIsInByb3BzIiwic3luY1RpdGxlIiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQyx3QkFBVyxHQURSO0FBRUhDLDhCQUFpQixDQUZkO0FBR0hDLHlCQUFZLENBSFQ7QUFJSEMsd0JBQVcsTUFKUjtBQUtIQyx1QkFBVTtBQUxQLFMsUUFPUEMsTyxHQUFVO0FBQ05DLHlCQURNLHlCQUNRQyxFQURSLEVBQ1dDLEtBRFgsRUFDaUI7QUFDbkI7QUFDSCxhQUhLOztBQUlOO0FBQ0FDLG9CQUxNLG9CQUtHRixFQUxILEVBS007QUFDUixvQkFBRyxLQUFLSCxTQUFMLElBQWtCRyxFQUFyQixFQUF3QjtBQUNwQix5QkFBS0gsU0FBTCxHQUFpQixDQUFqQjtBQUNILGlCQUZELE1BRUs7QUFDRCx5QkFBS0EsU0FBTCxHQUFpQkcsRUFBakI7QUFDSDtBQUNKLGFBWEs7O0FBWU47QUFDQUcscUJBYk0scUJBYUlDLElBYkosRUFhU0gsS0FiVCxFQWFlO0FBQ2pCLG9CQUFHRyxLQUFLQyxPQUFMLElBQWdCQyxTQUFuQixFQUE2QjtBQUN6QjtBQUNBLHlCQUFLQyxLQUFMLENBQVcsWUFBWCxFQUF3QkgsSUFBeEIsRUFBNkJILEtBQTdCO0FBQ0gsaUJBSEQsTUFHSztBQUNEO0FBQ0Esd0JBQUdHLEtBQUtJLFNBQUwsSUFBa0IsQ0FBbEIsSUFBdUJKLEtBQUtJLFNBQUwsSUFBa0IsQ0FBNUMsRUFBOEM7QUFDMUM7QUFDQUMsMkJBQUdDLFVBQUgsQ0FBYztBQUNWQyxpQ0FBSyxpQ0FBaUNQLEtBQUtRO0FBRGpDLHlCQUFkO0FBR0gscUJBTEQsTUFLTSxJQUFHUixLQUFLSSxTQUFMLElBQWtCLENBQWxCLElBQXVCSixLQUFLSSxTQUFMLElBQWtCLENBQTVDLEVBQThDO0FBQ2hEQywyQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLGlDQUFLLG9DQUFvQ1AsS0FBS1E7QUFEcEMseUJBQWQ7QUFJSDtBQUNKO0FBQ0o7QUEvQkssUyxRQWlDVkMsTSxHQUFTLEUsUUFDVEMsSyxHQUFRO0FBQ0pDLHVCQUFXO0FBQ1BDLHNCQUFNQyxLQURDO0FBRVBDLHlCQUFTO0FBRkY7QUFEUCxTOzs7O0VBNUM0QkMsZUFBS0MsUzs7a0JBQXhCOUIsVSIsImZpbGUiOiJjb3Vwb25JdGVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvdXBvbkl0ZW0gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgaW5mb0hlaWdodDpcIjBcIixcbiAgICAgICAgaW5mb0hlaWdodFN0YXR1czowLFxuICAgICAgICBpc0dldENvdXBvbjoxLFxuICAgICAgICBnb0dldFdvcmRzOlwi56uL5Y2z6aKG5Y+WXCIsXG4gICAgICAgIHNwZWNpYWxJZDowLFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgcmVjZWl2ZUNvdXBvbihpZCxpbmRleCl7XG4gICAgICAgICAgICAvLyB0aGlzLiRlbWl0KCd1c2VyU2VsZWN0JyxpZCxpbmRleClcbiAgICAgICAgfSxcbiAgICAgICAgLy/mmL7npLrllYblrrbor7TmmI5cbiAgICAgICAgc2hvd0luZm8oaWQpe1xuICAgICAgICAgICAgaWYodGhpcy5zcGVjaWFsSWQgPT0gaWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbElkID0gMDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbElkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8v6aKG5Y+W5Y2h5Yi4XG4gICAgICAgIGdldENvdXBvbihpdGVtLGluZGV4KXtcbiAgICAgICAgICAgIGlmKGl0ZW0uY2hlY2tlZCA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIC8v56uL5Y2z6aKG5Y+WXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgndXNlclNlbGVjdCcsaXRlbSxpbmRleClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8v5Y675L2/55So77yM6Lez6L2sXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5zaG9wX3R5cGUgPT0gMSB8fCBpdGVtLnNob3BfdHlwZSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgLy/nlLXllYbnmoTlupfpk7pcbiAgICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi8uLi9lL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGl0ZW0ubWVyY2hhbnRfaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaXRlbS5zaG9wX3R5cGUgPT0gMyB8fCBpdGVtLnNob3BfdHlwZSA9PSA0KXtcbiAgICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi8uLi8uLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGl0ZW0ubWVyY2hhbnRfaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBldmVudHMgPSB7fTtcbiAgICBwcm9wcyA9IHtcbiAgICAgICAgc3luY1RpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xuICAgICAgICB9XG4gICAgfVxufVxuIl19