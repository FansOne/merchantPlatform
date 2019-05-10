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

var allUsers = function (_wepy$component) {
    _inherits(allUsers, _wepy$component);

    function allUsers() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, allUsers);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = allUsers.__proto__ || Object.getPrototypeOf(allUsers)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {}, _this.methods = {}, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(allUsers, [{
        key: 'onLoad',
        value: function onLoad() {
            // this.userMess = this.syncTitle
        }
    }]);

    return allUsers;
}(_wepy2.default.component);

exports.default = allUsers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbFVzZXJzLmpzIl0sIm5hbWVzIjpbImFsbFVzZXJzIiwiY29tcG9uZW50cyIsImRhdGEiLCJtZXRob2RzIiwiZXZlbnRzIiwicHJvcHMiLCJzeW5jVGl0bGUiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPLEUsUUFFUEMsTyxHQUFVLEUsUUFHVkMsTSxHQUFTLEUsUUFDVEMsSyxHQUFRO0FBQ0pDLHVCQUFXO0FBQ1BDLHNCQUFLQyxNQURFO0FBRVBDLHlCQUFTO0FBRkY7QUFEUCxTOzs7OztpQ0FNQTtBQUNKO0FBQ0g7Ozs7RUFqQmlDQyxlQUFLQyxTOztrQkFBdEJYLFEiLCJmaWxlIjoiYWxsVXNlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWxsVXNlcnMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6T2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdDogJ251bGwnXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICAvLyB0aGlzLnVzZXJNZXNzID0gdGhpcy5zeW5jVGl0bGVcbiAgICB9XG59XG4iXX0=