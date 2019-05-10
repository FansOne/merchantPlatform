'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var payMentDetails = function (_wepy$page) {
    _inherits(payMentDetails, _wepy$page);

    function payMentDetails() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, payMentDetails);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = payMentDetails.__proto__ || Object.getPrototypeOf(payMentDetails)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单详情'
        }, _this.components = {}, _this.data = {
            allData: null
        }, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(payMentDetails, [{
        key: 'onLoad',
        value: function onLoad(options) {
            // 获取订单详情数据
            this.orderData(options.orderNumber);
        }
    }, {
        key: 'orderData',

        // 获取订单详情数据
        value: function orderData(orderNumber) {
            var _this2 = this;

            var url = _requestUrl2.default.orderDetails;
            var data = {
                outTraceNo: orderNumber
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                _this2.allData = res.data.data;
                _this2.$apply();
            });
        }
    }]);

    return payMentDetails;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(payMentDetails , 'pages/e/page/payMentDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheU1lbnREZXRhaWxzLmpzIl0sIm5hbWVzIjpbInBheU1lbnREZXRhaWxzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwiYWxsRGF0YSIsIm1ldGhvZHMiLCJldmVudHMiLCJvcHRpb25zIiwib3JkZXJEYXRhIiwib3JkZXJOdW1iZXIiLCJ1cmwiLCJyZXF1ZXN0VXJsIiwib3JkZXJEZXRhaWxzIiwib3V0VHJhY2VObyIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OzswTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDSEMscUJBQVE7QUFETCxTLFFBR1BDLE8sR0FBVSxFLFFBRVZDLE0sR0FBUyxFOzs7OzsrQkFDRkMsTyxFQUFTO0FBQ1o7QUFDQSxpQkFBS0MsU0FBTCxDQUFlRCxRQUFRRSxXQUF2QjtBQUNIOzs7O0FBQ0Q7a0NBQ1VBLFcsRUFBWTtBQUFBOztBQUNsQixnQkFBSUMsTUFBTUMscUJBQVdDLFlBQXJCO0FBQ0EsZ0JBQUlULE9BQU87QUFDUFUsNEJBQWFKO0FBRE4sYUFBWDtBQUdBLDBDQUFZQyxHQUFaLEVBQWdCLE1BQWhCLEVBQXVCUCxJQUF2QixFQUE2QlcsSUFBN0IsQ0FBa0MsZUFBSztBQUNuQyx1QkFBS1YsT0FBTCxHQUFlVyxJQUFJWixJQUFKLENBQVNBLElBQXhCO0FBQ0EsdUJBQUthLE1BQUw7QUFDSCxhQUhEO0FBSUg7Ozs7RUExQnVDQyxlQUFLQyxJOztrQkFBNUJuQixjIiwiZmlsZSI6InBheU1lbnREZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0VXJsJztcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vLi4vYXBpL3JlcXVlc3REYXRhJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGF5TWVudERldGFpbHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhScsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBhbGxEYXRhOm51bGxcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7fTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIC8vIOiOt+WPluiuouWNleivpuaDheaVsOaNrlxuICAgICAgICB0aGlzLm9yZGVyRGF0YShvcHRpb25zLm9yZGVyTnVtYmVyKVxuICAgIH07XG4gICAgLy8g6I635Y+W6K6i5Y2V6K+m5oOF5pWw5o2uXG4gICAgb3JkZXJEYXRhKG9yZGVyTnVtYmVyKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwub3JkZXJEZXRhaWxzO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIG91dFRyYWNlTm8gOiBvcmRlck51bWJlclxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHRoaXMuYWxsRGF0YSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICB9XG59XG4iXX0=