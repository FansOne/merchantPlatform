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

var CollegeIndexItem = function (_wepy$component) {
    _inherits(CollegeIndexItem, _wepy$component);

    function CollegeIndexItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CollegeIndexItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollegeIndexItem.__proto__ || Object.getPrototypeOf(CollegeIndexItem)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            syncTitle: {
                type: Array,
                default: 'null'
            }
        }, _this.data = {}, _this.methods = {
            click: function click(e) {
                wx.navigateTo({
                    url: './datails?id=' + e.currentTarget.dataset.idx
                });
            },
            nullTab: function nullTab() {}
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CollegeIndexItem, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return CollegeIndexItem;
}(_wepy2.default.component);

exports.default = CollegeIndexItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlZ2VJbmRleEl0ZW0uanMiXSwibmFtZXMiOlsiQ29sbGVnZUluZGV4SXRlbSIsInByb3BzIiwic3luY1RpdGxlIiwidHlwZSIsIkFycmF5IiwiZGVmYXVsdCIsImRhdGEiLCJtZXRob2RzIiwiY2xpY2siLCJlIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZHgiLCJudWxsVGFiIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7OzhNQUNqQkMsSyxHQUFRO0FBQ0pDLHVCQUFXO0FBQ1BDLHNCQUFNQyxLQURDO0FBRVBDLHlCQUFTO0FBRkY7QUFEUCxTLFFBTVJDLEksR0FBTyxFLFFBQ1BDLE8sR0FBVTtBQUNOQyxpQkFETSxpQkFDQUMsQ0FEQSxFQUNFO0FBQ0xDLG1CQUFHQyxVQUFILENBQWM7QUFDVkMseUJBQUssa0JBQWdCSCxFQUFFSSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkM7QUFEbkMsaUJBQWQ7QUFHRixhQUxLO0FBTU5DLG1CQU5NLHFCQU1HLENBQUU7QUFOTCxTOzs7OztpQ0FRRCxDQUNSOzs7O0VBakJ5Q0MsZUFBS0MsUzs7a0JBQTlCbEIsZ0IiLCJmaWxlIjoiY29sbGVnZUluZGV4SXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWdlSW5kZXhJdGVtIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgZGVmYXVsdDogJ251bGwnXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBkYXRhID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgY2xpY2soZSl7XG4gICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgdXJsOiAnLi9kYXRhaWxzP2lkPScrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR4XG4gICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBudWxsVGFiKCl7fVxuICAgIH07XG4gICAgb25Mb2FkICgpe1xuICAgIH1cbn1cbiJdfQ==