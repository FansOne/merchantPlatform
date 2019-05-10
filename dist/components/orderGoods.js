'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orderGoods = function (_wepy$component) {
    _inherits(orderGoods, _wepy$component);

    function orderGoods() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, orderGoods);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = orderGoods.__proto__ || Object.getPrototypeOf(orderGoods)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {}, _this.methods = {
            orderDetails: function orderDetails(orderNumber, tradetype) {
                // console.log(orderNumber,tradetype)
                if (tradetype == 1 || tradetype == 2 || tradetype == 3) {
                    // tradetype: 0(到店买单),1(自营商品),2(本地特产),3(外卖订单)
                    wx.navigateTo({
                        url: './e/page/orderDetailesOT?orderNumber=' + orderNumber
                    });
                } else if (tradetype == 0) {
                    wx.navigateTo({
                        url: './e/page/payMentDetails?orderNumber=' + orderNumber
                    });
                }
            }
        }, _this.events = {}, _this.props = {
            orderList: {
                type: Array,
                default: 'null'
            },
            noOrderList: {
                type: Boolean
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return orderGoods;
}(_wepy2.default.component);

exports.default = orderGoods;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyR29vZHMuanMiXSwibmFtZXMiOlsib3JkZXJHb29kcyIsImNvbXBvbmVudHMiLCJkYXRhIiwibWV0aG9kcyIsIm9yZGVyRGV0YWlscyIsIm9yZGVyTnVtYmVyIiwidHJhZGV0eXBlIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZXZlbnRzIiwicHJvcHMiLCJvcmRlckxpc3QiLCJ0eXBlIiwiQXJyYXkiLCJkZWZhdWx0Iiwibm9PcmRlckxpc3QiLCJCb29sZWFuIiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxVLEdBQWEsRSxRQUViQyxJLEdBQU8sRSxRQUNQQyxPLEdBQVU7QUFDTkMsd0JBRE0sd0JBQ09DLFdBRFAsRUFDbUJDLFNBRG5CLEVBQzZCO0FBQy9CO0FBQ0Esb0JBQUdBLGFBQWEsQ0FBYixJQUFrQkEsYUFBYSxDQUEvQixJQUFvQ0EsYUFBYSxDQUFwRCxFQUFzRDtBQUFJO0FBQ3REQyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHVFQUE2Q0o7QUFEbkMscUJBQWQ7QUFHSCxpQkFKRCxNQUlNLElBQUlDLGFBQWEsQ0FBakIsRUFBb0I7QUFDdEJDLHVCQUFHQyxVQUFILENBQWM7QUFDVkMsc0VBQTRDSjtBQURsQyxxQkFBZDtBQUdIO0FBQ0o7QUFaSyxTLFFBZVZLLE0sR0FBUyxFLFFBR1RDLEssR0FBUTtBQUNKQyx1QkFBVztBQUNQQyxzQkFBTUMsS0FEQztBQUVQQyx5QkFBUztBQUZGLGFBRFA7QUFLSkMseUJBQWE7QUFDVEgsc0JBQU1JO0FBREc7QUFMVCxTOzs7O0VBdEI0QkMsZUFBS0MsUzs7a0JBQXhCbkIsVSIsImZpbGUiOiJvcmRlckdvb2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uL2FwaS9yZXF1ZXN0VXJsJ1xuaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi9hcGkvcmVxdWVzdERhdGEnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBvcmRlckdvb2RzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7fTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBvcmRlckRldGFpbHMob3JkZXJOdW1iZXIsdHJhZGV0eXBlKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9yZGVyTnVtYmVyLHRyYWRldHlwZSlcbiAgICAgICAgICAgIGlmKHRyYWRldHlwZSA9PSAxIHx8IHRyYWRldHlwZSA9PSAyIHx8IHRyYWRldHlwZSA9PSAzKXsgICAvLyB0cmFkZXR5cGU6IDAo5Yiw5bqX5Lmw5Y2VKSwxKOiHquiQpeWVhuWTgSksMijmnKzlnLDnibnkuqcpLDMo5aSW5Y2W6K6i5Y2VKVxuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL2UvcGFnZS9vcmRlckRldGFpbGVzT1Q/b3JkZXJOdW1iZXI9JHtvcmRlck51bWJlcn1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZSBpZiggdHJhZGV0eXBlID09IDAgKXtcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9lL3BhZ2UvcGF5TWVudERldGFpbHM/b3JkZXJOdW1iZXI9JHtvcmRlck51bWJlcn1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge1xuICAgICAgICBcbiAgICB9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBvcmRlckxpc3Q6IHtcbiAgICAgICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICAgICAgZGVmYXVsdDogJ251bGwnXG4gICAgICAgIH0sXG4gICAgICAgIG5vT3JkZXJMaXN0OiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuXG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19