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

var collegeIndexGoods = function (_wepy$component) {
    _inherits(collegeIndexGoods, _wepy$component);

    function collegeIndexGoods() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, collegeIndexGoods);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = collegeIndexGoods.__proto__ || Object.getPrototypeOf(collegeIndexGoods)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {}, _this.methods = {
            goBack: function goBack() {
                return;
                wx.navigateTo({
                    url: '../details?id=' + this.syncTitle.id
                });
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(collegeIndexGoods, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return collegeIndexGoods;
}(_wepy2.default.component);

exports.default = collegeIndexGoods;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlZ2VJbmRleEdvb2RzLmpzIl0sIm5hbWVzIjpbImNvbGxlZ2VJbmRleEdvb2RzIiwiY29tcG9uZW50cyIsImRhdGEiLCJtZXRob2RzIiwiZ29CYWNrIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwic3luY1RpdGxlIiwiaWQiLCJldmVudHMiLCJwcm9wcyIsInR5cGUiLCJPYmplY3QiLCJkZWZhdWx0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsaUI7Ozs7Ozs7Ozs7Ozs7O2dOQUNqQkMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPLEUsUUFDUEMsTyxHQUFVO0FBQ05DLGtCQURNLG9CQUNFO0FBQ0o7QUFDQUMsbUJBQUdDLFVBQUgsQ0FBYztBQUNWQyx5QkFBSyxtQkFBaUIsS0FBS0MsU0FBTCxDQUFlQztBQUQzQixpQkFBZDtBQUdIO0FBTkssUyxRQVNWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkgsdUJBQVc7QUFDUEksc0JBQUtDLE1BREU7QUFFUEMseUJBQVM7QUFGRjtBQURQLFM7Ozs7O2lDQU1BLENBQ1A7Ozs7RUFyQjBDQyxlQUFLQyxTOztrQkFBL0JoQixpQiIsImZpbGUiOiJjb2xsZWdlSW5kZXhHb29kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjb2xsZWdlSW5kZXhHb29kcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZ29CYWNrKCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcuLi9kZXRhaWxzP2lkPScrdGhpcy5zeW5jVGl0bGUuaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6T2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdDogJ251bGwnXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgIH1cbn1cbiJdfQ==