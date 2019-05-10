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

var collegeEnsure = function (_wepy$component) {
    _inherits(collegeEnsure, _wepy$component);

    function collegeEnsure() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, collegeEnsure);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = collegeEnsure.__proto__ || Object.getPrototypeOf(collegeEnsure)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
            // 商户保证
            ensure: ['不好吃瞬间退款', '全球采购', '放心品控']
        }, _this.methods = {}, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(collegeEnsure, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return collegeEnsure;
}(_wepy2.default.component);

exports.default = collegeEnsure;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlZ2VFbnN1cmUuanMiXSwibmFtZXMiOlsiY29sbGVnZUVuc3VyZSIsImNvbXBvbmVudHMiLCJkYXRhIiwiZW5zdXJlIiwibWV0aG9kcyIsImV2ZW50cyIsInByb3BzIiwic3luY1RpdGxlIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxhOzs7Ozs7Ozs7Ozs7Ozt3TUFDakJDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIO0FBQ0FDLG9CQUFPLENBQ0gsU0FERyxFQUVILE1BRkcsRUFHSCxNQUhHO0FBRkosUyxRQVFQQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkMsdUJBQVc7QUFDUEMsc0JBQUtDLE1BREU7QUFFUEMseUJBQVM7QUFGRjtBQURQLFM7Ozs7O2lDQU1BLENBQ1A7Ozs7RUFyQnNDQyxlQUFLQyxTOztrQkFBM0JaLGEiLCJmaWxlIjoiY29sbGVnZUVuc3VyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjb2xsZWdlRW5zdXJlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIC8vIOWVhuaIt+S/neivgVxuICAgICAgICBlbnN1cmU6W1xuICAgICAgICAgICAgJ+S4jeWlveWQg+eerOmXtOmAgOasvicsXG4gICAgICAgICAgICAn5YWo55CD6YeH6LStJyxcbiAgICAgICAgICAgICfmlL7lv4Plk4HmjqcnXG4gICAgICAgIF0sXG4gICAgfTtcbiAgICBtZXRob2RzID0ge307XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBwcm9wcyA9IHtcbiAgICAgICAgc3luY1RpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOk9iamVjdCxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdudWxsJ1xuICAgICAgICB9LFxuICAgIH1cbiAgICBvbkxvYWQoKXtcbiAgICB9XG59XG4iXX0=