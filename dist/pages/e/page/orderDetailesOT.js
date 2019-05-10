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

var orderDetailesOT = function (_wepy$page) {
    _inherits(orderDetailesOT, _wepy$page);

    function orderDetailesOT() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, orderDetailesOT);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = orderDetailesOT.__proto__ || Object.getPrototypeOf(orderDetailesOT)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '订单详情'
        }, _this.components = {}, _this.data = {
            allData: null,
            goodsTotal: ''
        }, _this.methods = {
            goShop: function goShop(shop_type, m_id) {
                if (shop_type == 1 || shop_type == 2) {
                    //电商、门店流程
                    wx.navigateTo({
                        url: './index/index?id=' + m_id + '&shopType=' + shop_type
                    });
                } else if (shop_type == 3 || shop_type == 4) {
                    //外卖、超市
                    wx.navigateTo({
                        url: '../../f/page/index/index?id=' + m_id + '&shopType=' + shop_type
                    });
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(orderDetailesOT, [{
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
                console.log(res.data.data);
                var goodsTotal = 0;
                res.data.data.product.forEach(function (element) {
                    goodsTotal += element.total;
                });
                _this2.allData = res.data.data;
                _this2.goodsTotal = goodsTotal;
                _this2.$apply();
            });
        }
    }]);

    return orderDetailesOT;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(orderDetailesOT , 'pages/e/page/orderDetailesOT'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlsZXNPVC5qcyJdLCJuYW1lcyI6WyJvcmRlckRldGFpbGVzT1QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJhbGxEYXRhIiwiZ29vZHNUb3RhbCIsIm1ldGhvZHMiLCJnb1Nob3AiLCJzaG9wX3R5cGUiLCJtX2lkIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZXZlbnRzIiwib3B0aW9ucyIsIm9yZGVyRGF0YSIsIm9yZGVyTnVtYmVyIiwicmVxdWVzdFVybCIsIm9yZGVyRGV0YWlscyIsIm91dFRyYWNlTm8iLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsInByb2R1Y3QiLCJmb3JFYWNoIiwiZWxlbWVudCIsInRvdGFsIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsZTs7Ozs7Ozs7Ozs7Ozs7NE1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLHFCQUFRLElBREw7QUFFSEMsd0JBQVc7QUFGUixTLFFBSVBDLE8sR0FBVTtBQUNOQyxrQkFETSxrQkFDQ0MsU0FERCxFQUNXQyxJQURYLEVBQ2dCO0FBQ2xCLG9CQUFHRCxhQUFhLENBQWIsSUFBa0JBLGFBQWEsQ0FBbEMsRUFBb0M7QUFDaEM7QUFDQUUsdUJBQUdDLFVBQUgsQ0FBYztBQUNWQyw2QkFBSSxzQkFBc0JILElBQXRCLEdBQTZCLFlBQTdCLEdBQTRDRDtBQUR0QyxxQkFBZDtBQUdILGlCQUxELE1BS00sSUFBR0EsYUFBYSxDQUFiLElBQWtCQSxhQUFhLENBQWxDLEVBQW9DO0FBQ3RDO0FBQ0FFLHVCQUFHQyxVQUFILENBQWM7QUFDVkMsNkJBQUksaUNBQWlDSCxJQUFqQyxHQUF3QyxZQUF4QyxHQUF1REQ7QUFEakQscUJBQWQ7QUFHSDtBQUNKO0FBYkssUyxRQWdCVkssTSxHQUFTLEU7Ozs7OytCQUNGQyxPLEVBQVM7QUFDWjtBQUNBLGlCQUFLQyxTQUFMLENBQWVELFFBQVFFLFdBQXZCO0FBQ0g7Ozs7QUFDRDtrQ0FDVUEsVyxFQUFZO0FBQUE7O0FBQ2xCLGdCQUFJSixNQUFNSyxxQkFBV0MsWUFBckI7QUFDQSxnQkFBSWYsT0FBTztBQUNQZ0IsNEJBQWFIO0FBRE4sYUFBWDtBQUdBLDBDQUFZSixHQUFaLEVBQWdCLE1BQWhCLEVBQXVCVCxJQUF2QixFQUE2QmlCLElBQTdCLENBQWtDLGVBQUs7QUFDbkNDLHdCQUFRQyxHQUFSLENBQVlDLElBQUlwQixJQUFKLENBQVNBLElBQXJCO0FBQ0Esb0JBQUlFLGFBQWEsQ0FBakI7QUFDQWtCLG9CQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWNxQixPQUFkLENBQXNCQyxPQUF0QixDQUE4QixtQkFBVztBQUNyQ3BCLGtDQUFjcUIsUUFBUUMsS0FBdEI7QUFDSCxpQkFGRDtBQUdBLHVCQUFLdkIsT0FBTCxHQUFlbUIsSUFBSXBCLElBQUosQ0FBU0EsSUFBeEI7QUFDQSx1QkFBS0UsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSx1QkFBS3VCLE1BQUw7QUFDSCxhQVREO0FBVUg7Ozs7RUEvQ3dDQyxlQUFLQyxJOztrQkFBN0IvQixlIiwiZmlsZSI6Im9yZGVyRGV0YWlsZXNPVC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi8uLi9hcGkvcmVxdWVzdFVybCc7XG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgb3JkZXJEZXRhaWxlc09UIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgYWxsRGF0YTpudWxsLFxuICAgICAgICBnb29kc1RvdGFsOicnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBnb1Nob3Aoc2hvcF90eXBlLG1faWQpe1xuICAgICAgICAgICAgaWYoc2hvcF90eXBlID09IDEgfHwgc2hvcF90eXBlID09IDIpe1xuICAgICAgICAgICAgICAgIC8v55S15ZWG44CB6Zeo5bqX5rWB56iLXG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDonLi9pbmRleC9pbmRleD9pZD0nICsgbV9pZCArICcmc2hvcFR5cGU9JyArIHNob3BfdHlwZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZSBpZihzaG9wX3R5cGUgPT0gMyB8fCBzaG9wX3R5cGUgPT0gNCl7XG4gICAgICAgICAgICAgICAgLy/lpJbljZbjgIHotoXluIJcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOicuLi8uLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIG1faWQgKyAnJnNob3BUeXBlPScgKyBzaG9wX3R5cGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIC8vIOiOt+WPluiuouWNleivpuaDheaVsOaNrlxuICAgICAgICB0aGlzLm9yZGVyRGF0YShvcHRpb25zLm9yZGVyTnVtYmVyKVxuICAgIH07XG4gICAgLy8g6I635Y+W6K6i5Y2V6K+m5oOF5pWw5o2uXG4gICAgb3JkZXJEYXRhKG9yZGVyTnVtYmVyKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwub3JkZXJEZXRhaWxzO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIG91dFRyYWNlTm8gOiBvcmRlck51bWJlclxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpXG4gICAgICAgICAgICBsZXQgZ29vZHNUb3RhbCA9IDA7XG4gICAgICAgICAgICByZXMuZGF0YS5kYXRhLnByb2R1Y3QuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBnb29kc1RvdGFsICs9IGVsZW1lbnQudG90YWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hbGxEYXRhID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgdGhpcy5nb29kc1RvdGFsID0gZ29vZHNUb3RhbFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==