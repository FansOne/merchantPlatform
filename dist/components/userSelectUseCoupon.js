'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var userSelectUseCoupon = function (_wepy$component) {
    _inherits(userSelectUseCoupon, _wepy$component);

    function userSelectUseCoupon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, userSelectUseCoupon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = userSelectUseCoupon.__proto__ || Object.getPrototypeOf(userSelectUseCoupon)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
            isGetCoupon: 1,
            goGetWords: "立即领取",
            specialId: 0
        }, _this.methods = {
            setCoupon: function setCoupon(item) {
                var inputValue = 0;
                var clx = Number(wx.getStorageSync('clx'));
                if (item.type == 1) {
                    inputValue = Number(clx - Number(item.amount / 100)).toFixed(2);
                } else if (item.type == 2) {
                    inputValue = Number(clx * (Number(item.amount) / 10)).toFixed(2);
                } else {
                    inputValue = Number(clx - Number(item.amount / 100)).toFixed(2);
                }
                _wepy2.default.$instance.globalData.clxValue = inputValue;
                wx.setStorage({
                    key: 'selectCoupon',
                    data: item,
                    success: function success() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
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
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Array,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(userSelectUseCoupon, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return userSelectUseCoupon;
}(_wepy2.default.component);

exports.default = userSelectUseCoupon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJTZWxlY3RVc2VDb3Vwb24uanMiXSwibmFtZXMiOlsidXNlclNlbGVjdFVzZUNvdXBvbiIsImNvbXBvbmVudHMiLCJkYXRhIiwiaXNHZXRDb3Vwb24iLCJnb0dldFdvcmRzIiwic3BlY2lhbElkIiwibWV0aG9kcyIsInNldENvdXBvbiIsIml0ZW0iLCJpbnB1dFZhbHVlIiwiY2x4IiwiTnVtYmVyIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInR5cGUiLCJhbW91bnQiLCJ0b0ZpeGVkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJjbHhWYWx1ZSIsInNldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJzaG93SW5mbyIsImlkIiwiY29uc29sZSIsImxvZyIsImV2ZW50cyIsInByb3BzIiwic3luY1RpdGxlIiwiQXJyYXkiLCJkZWZhdWx0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxtQjs7Ozs7Ozs7Ozs7Ozs7b05BQ2pCQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDSEMseUJBQVksQ0FEVDtBQUVIQyx3QkFBVyxNQUZSO0FBR0hDLHVCQUFVO0FBSFAsUyxRQUtQQyxPLEdBQVU7QUFDTkMscUJBRE0scUJBQ0lDLElBREosRUFDUztBQUNYLG9CQUFJQyxhQUFhLENBQWpCO0FBQ0Esb0JBQUlDLE1BQU1DLE9BQU9DLEdBQUdDLGNBQUgsQ0FBa0IsS0FBbEIsQ0FBUCxDQUFWO0FBQ0Esb0JBQUdMLEtBQUtNLElBQUwsSUFBYSxDQUFoQixFQUFrQjtBQUNkTCxpQ0FBYUUsT0FBT0QsTUFBSUMsT0FBT0gsS0FBS08sTUFBTCxHQUFZLEdBQW5CLENBQVgsRUFBb0NDLE9BQXBDLENBQTRDLENBQTVDLENBQWI7QUFDSCxpQkFGRCxNQUVNLElBQUdSLEtBQUtNLElBQUwsSUFBYSxDQUFoQixFQUFrQjtBQUNwQkwsaUNBQWFFLE9BQU9ELE9BQUtDLE9BQU9ILEtBQUtPLE1BQVosSUFBb0IsRUFBekIsQ0FBUCxFQUFxQ0MsT0FBckMsQ0FBNkMsQ0FBN0MsQ0FBYjtBQUNILGlCQUZLLE1BRUQ7QUFDRFAsaUNBQWFFLE9BQU9ELE1BQUlDLE9BQU9ILEtBQUtPLE1BQUwsR0FBWSxHQUFuQixDQUFYLEVBQW9DQyxPQUFwQyxDQUE0QyxDQUE1QyxDQUFiO0FBQ0g7QUFDREMsK0JBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsUUFBMUIsR0FBcUNYLFVBQXJDO0FBQ0FHLG1CQUFHUyxVQUFILENBQWM7QUFDVkMseUJBQUssY0FESztBQUVWcEIsMEJBQU1NLElBRkk7QUFHVmUsNkJBQVMsbUJBQUk7QUFDVFgsMkJBQUdZLFlBQUgsQ0FBZ0I7QUFDWkMsbUNBQU87QUFESyx5QkFBaEI7QUFHSDtBQVBTLGlCQUFkO0FBU0gsYUFyQks7O0FBc0JOO0FBQ0FDLG9CQXZCTSxvQkF1QkdDLEVBdkJILEVBdUJNO0FBQ1Isb0JBQUcsS0FBS3RCLFNBQUwsSUFBa0JzQixFQUFyQixFQUF3QjtBQUNwQkMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EseUJBQUt4QixTQUFMLEdBQWlCLENBQWpCO0FBQ0gsaUJBSEQsTUFHSztBQUNEdUIsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EseUJBQUt4QixTQUFMLEdBQWlCc0IsRUFBakI7QUFDSDtBQUNKO0FBL0JLLFMsUUFrQ1ZHLE0sR0FBUyxFLFFBQ1RDLEssR0FBUTtBQUNKQyx1QkFBVztBQUNQbEIsc0JBQU1tQixLQURDO0FBRVBDLHlCQUFTO0FBRkY7QUFEUCxTOzs7OztpQ0FNQSxDQUNQOzs7O0VBbEQ0Q2pCLGVBQUtrQixTOztrQkFBakNuQyxtQiIsImZpbGUiOiJ1c2VyU2VsZWN0VXNlQ291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVzZXJTZWxlY3RVc2VDb3Vwb24gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgaXNHZXRDb3Vwb246MSxcbiAgICAgICAgZ29HZXRXb3JkczpcIueri+WNs+mihuWPllwiLFxuICAgICAgICBzcGVjaWFsSWQ6MCxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIHNldENvdXBvbihpdGVtKXtcbiAgICAgICAgICAgIGxldCBpbnB1dFZhbHVlID0gMDtcbiAgICAgICAgICAgIGxldCBjbHggPSBOdW1iZXIod3guZ2V0U3RvcmFnZVN5bmMoJ2NseCcpKTtcbiAgICAgICAgICAgIGlmKGl0ZW0udHlwZSA9PSAxKXtcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlID0gTnVtYmVyKGNseC1OdW1iZXIoaXRlbS5hbW91bnQvMTAwKSkudG9GaXhlZCgyKVxuICAgICAgICAgICAgfWVsc2UgaWYoaXRlbS50eXBlID09IDIpe1xuICAgICAgICAgICAgICAgIGlucHV0VmFsdWUgPSBOdW1iZXIoY2x4KihOdW1iZXIoaXRlbS5hbW91bnQpLzEwKSkudG9GaXhlZCgyKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IE51bWJlcihjbHgtTnVtYmVyKGl0ZW0uYW1vdW50LzEwMCkpLnRvRml4ZWQoMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuY2x4VmFsdWUgPSBpbnB1dFZhbHVlXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICBrZXk6ICdzZWxlY3RDb3Vwb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGl0ZW0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvL+aYvuekuuWVhuWutuivtOaYjlxuICAgICAgICBzaG93SW5mbyhpZCl7XG4gICAgICAgICAgICBpZih0aGlzLnNwZWNpYWxJZCA9PSBpZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZOS4jeWQjFwiKVxuICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbElkID0gMDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWTkuI3lkIxcIilcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWNpYWxJZCA9IGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBwcm9wcyA9IHtcbiAgICAgICAgc3luY1RpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xuICAgICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKXtcbiAgICB9XG59XG4iXX0=