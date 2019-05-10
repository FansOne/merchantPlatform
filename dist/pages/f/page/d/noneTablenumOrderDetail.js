'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoneTablenumorderdetail = function (_wepy$page) {
  _inherits(NoneTablenumorderdetail, _wepy$page);

  function NoneTablenumorderdetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, NoneTablenumorderdetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NoneTablenumorderdetail.__proto__ || Object.getPrototypeOf(NoneTablenumorderdetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单详情',
      navigationBarBackgroundColor: '#ffd265'
    }, _this.data = {
      token: '',
      isvoice: 0,
      billing: true,
      deliverData: null,
      payPeopleMsg: null,
      tips: '无', //备注
      payWay: '', //支付方式
      serial: '', //订单编号
      dateline: '', //下单时间
      promotion: null,
      orderId: 0,
      orderResult: null, //用餐人数，桌号等信息
      total: 0,
      userInfo: null,
      sums: 0,
      promotion_price: 0 //优惠信息
    }, _this.components = {
      // order:order
    }, _this.methods = {
      //再来一单
      moreOrder: function moreOrder() {
        wx.redirectTo({
          url: './d'
        });
      },

      // 发票开关
      switch1Change: function switch1Change(e) {
        this.billing = !this.billing;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(NoneTablenumorderdetail, [{
    key: 'getOrderDetail',

    // 请求订单完成数据
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _api2.default.apiMall + 'api/eat_order_details/' + this.orderId;
                _context.next = 3;
                return _wepy2.default.request({
                  url: url,
                  method: 'GET',
                  header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + this.token
                  }
                }).then(function (res) {
                  _this2.orderResult = res.data.message;
                  _this2.isvoice = res.data.message.is_invoice;
                  _this2.payPeopleMsg = res.data.message.takeaways;
                  _this2.payPeopleMsg.forEach(function (item, index) {
                    _this2.sums = Number(_this2.sums) + Number(item.nums);
                  });
                  _this2.$apply();
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrderDetail() {
        return _ref2.apply(this, arguments);
      }

      return getOrderDetail;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.orderId = options.orderId;
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      if (this.token && this.orderId) {
        this.getOrderDetail();
      }
      this.deliverData = _wepy2.default.$instance.globalData.deliverData;
      this.payWay = _wepy2.default.$instance.globalData.payWay;
      this.userInfo = wx.getStorageSync("userInfo");
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return NoneTablenumorderdetail;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(NoneTablenumorderdetail , 'pages/f/page/d/noneTablenumOrderDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vbmVUYWJsZW51bU9yZGVyRGV0YWlsLmpzIl0sIm5hbWVzIjpbIk5vbmVUYWJsZW51bW9yZGVyZGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwidG9rZW4iLCJpc3ZvaWNlIiwiYmlsbGluZyIsImRlbGl2ZXJEYXRhIiwicGF5UGVvcGxlTXNnIiwidGlwcyIsInBheVdheSIsInNlcmlhbCIsImRhdGVsaW5lIiwicHJvbW90aW9uIiwib3JkZXJJZCIsIm9yZGVyUmVzdWx0IiwidG90YWwiLCJ1c2VySW5mbyIsInN1bXMiLCJwcm9tb3Rpb25fcHJpY2UiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsIm1vcmVPcmRlciIsInd4IiwicmVkaXJlY3RUbyIsInVybCIsInN3aXRjaDFDaGFuZ2UiLCJlIiwiYXBpIiwiYXBpTWFsbCIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsIm1lc3NhZ2UiLCJpc19pbnZvaWNlIiwidGFrZWF3YXlzIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsIk51bWJlciIsIm51bXMiLCIkYXBwbHkiLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJnZXRPcmRlckRldGFpbCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSx1Qjs7Ozs7Ozs7Ozs7Ozs7d05BQ25CQyxNLEdBQVM7QUFDTEMsOEJBQXdCLE1BRG5CO0FBRUxDLG9DQUE4QjtBQUZ6QixLLFFBSVRDLEksR0FBTztBQUNMQyxhQUFNLEVBREQ7QUFFTEMsZUFBUSxDQUZIO0FBR0xDLGVBQVEsSUFISDtBQUlMQyxtQkFBWSxJQUpQO0FBS0xDLG9CQUFhLElBTFI7QUFNTEMsWUFBSyxHQU5BLEVBTVU7QUFDZkMsY0FBTyxFQVBGLEVBT1M7QUFDZEMsY0FBTyxFQVJGLEVBUVM7QUFDZEMsZ0JBQVMsRUFUSixFQVNRO0FBQ2JDLGlCQUFVLElBVkw7QUFXTEMsZUFBUSxDQVhIO0FBWUxDLG1CQUFZLElBWlAsRUFZZ0I7QUFDckJDLGFBQU0sQ0FiRDtBQWNMQyxnQkFBUyxJQWRKO0FBZUxDLFlBQUssQ0FmQTtBQWdCTEMsdUJBQWdCLENBaEJYLENBZ0JlO0FBaEJmLEssUUFrQlBDLFUsR0FBYTtBQUNYO0FBRFcsSyxRQUdiQyxPLEdBQVU7QUFDUjtBQUNBQyxlQUZRLHVCQUVHO0FBQ1RDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFJO0FBRFEsU0FBZDtBQUdELE9BTk87O0FBT1I7QUFDQUMsbUJBUlEseUJBUU1DLENBUk4sRUFRUTtBQUNkLGFBQUtyQixPQUFMLEdBQWUsQ0FBQyxLQUFLQSxPQUFyQjtBQUNEO0FBVk8sSzs7Ozs7O0FBWVY7Ozs7Ozs7Ozs7QUFFUW1CLG1CLEdBQU1HLGNBQUlDLE9BQUosR0FBYyx3QkFBZCxHQUF5QyxLQUFLZixPOzt1QkFDcERnQixlQUFLQyxPQUFMLENBQWE7QUFDakJOLHVCQUFLQSxHQURZO0FBRWpCTywwQkFBUSxLQUZTO0FBR2pCQywwQkFBTztBQUNMLDhCQUFTLGdDQURKO0FBRUwsb0NBQWUsaURBRlY7QUFHTCxxQ0FBZ0IsWUFBWSxLQUFLN0I7QUFINUI7QUFIVSxpQkFBYixFQVFIOEIsSUFSRyxDQVFFLGVBQUs7QUFDWCx5QkFBS25CLFdBQUwsR0FBbUJvQixJQUFJaEMsSUFBSixDQUFTaUMsT0FBNUI7QUFDQSx5QkFBSy9CLE9BQUwsR0FBZThCLElBQUloQyxJQUFKLENBQVNpQyxPQUFULENBQWlCQyxVQUFoQztBQUNBLHlCQUFLN0IsWUFBTCxHQUFvQjJCLElBQUloQyxJQUFKLENBQVNpQyxPQUFULENBQWlCRSxTQUFyQztBQUNBLHlCQUFLOUIsWUFBTCxDQUFrQitCLE9BQWxCLENBQTBCLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFjO0FBQ3RDLDJCQUFLdkIsSUFBTCxHQUFZd0IsT0FBTyxPQUFLeEIsSUFBWixJQUFvQndCLE9BQU9GLEtBQUtHLElBQVosQ0FBaEM7QUFDRCxtQkFGRDtBQUdBLHlCQUFLQyxNQUFMO0FBQ0QsaUJBaEJLLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkFrQkRDLE8sRUFBUTtBQUNiLFdBQUsvQixPQUFMLEdBQWUrQixRQUFRL0IsT0FBdkI7QUFDQSxVQUFJVixRQUFRbUIsR0FBR3VCLGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWjtBQUNBLFdBQUsxQyxLQUFMLEdBQWFBLE1BQU0yQyxZQUFuQjtBQUNBLFVBQUcsS0FBSzNDLEtBQUwsSUFBYyxLQUFLVSxPQUF0QixFQUE4QjtBQUM1QixhQUFLa0MsY0FBTDtBQUNEO0FBQ0QsV0FBS3pDLFdBQUwsR0FBbUJ1QixlQUFLbUIsU0FBTCxDQUFlQyxVQUFmLENBQTBCM0MsV0FBN0M7QUFDQSxXQUFLRyxNQUFMLEdBQWNvQixlQUFLbUIsU0FBTCxDQUFlQyxVQUFmLENBQTBCeEMsTUFBeEM7QUFDQSxXQUFLTyxRQUFMLEdBQWdCTSxHQUFHdUIsY0FBSCxDQUFrQixVQUFsQixDQUFoQjtBQUNEOzs7NkJBQ08sQ0FBRTs7OztFQXRFeUNoQixlQUFLcUIsSTs7a0JBQXJDcEQsdUIiLCJmaWxlIjoibm9uZVRhYmxlbnVtT3JkZXJEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvYXBpJ1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy91dGlsJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOb25lVGFibGVudW1vcmRlcmRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K6i5Y2V6K+m5oOFJyxcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmQyNjUnLFxuICAgIH1cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46JycsXG4gICAgICBpc3ZvaWNlOjAsXG4gICAgICBiaWxsaW5nOnRydWUsXG4gICAgICBkZWxpdmVyRGF0YTpudWxsLFxuICAgICAgcGF5UGVvcGxlTXNnOm51bGwsXG4gICAgICB0aXBzOifml6AnLCAgICAgIC8v5aSH5rOoXG4gICAgICBwYXlXYXk6JycsICAgIC8v5pSv5LuY5pa55byPXG4gICAgICBzZXJpYWw6JycsICAgIC8v6K6i5Y2V57yW5Y+3XG4gICAgICBkYXRlbGluZTonJywgLy/kuIvljZXml7bpl7RcbiAgICAgIHByb21vdGlvbjpudWxsLFxuICAgICAgb3JkZXJJZDowLFxuICAgICAgb3JkZXJSZXN1bHQ6bnVsbCwgICAgLy/nlKjppJDkurrmlbDvvIzmoYzlj7fnrYnkv6Hmga9cbiAgICAgIHRvdGFsOjAsXG4gICAgICB1c2VySW5mbzpudWxsLFxuICAgICAgc3VtczowLFxuICAgICAgcHJvbW90aW9uX3ByaWNlOjAgICAvL+S8mOaDoOS/oeaBr1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgLy8gb3JkZXI6b3JkZXJcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8v5YaN5p2l5LiA5Y2VXG4gICAgICBtb3JlT3JkZXIoKXtcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgdXJsOicuL2QnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g5Y+R56Wo5byA5YWzXG4gICAgICBzd2l0Y2gxQ2hhbmdlKGUpe1xuICAgICAgICB0aGlzLmJpbGxpbmcgPSAhdGhpcy5iaWxsaW5nO1xuICAgICAgfSxcbiAgICB9XG4gICAgLy8g6K+35rGC6K6i5Y2V5a6M5oiQ5pWw5o2uXG4gICAgYXN5bmMgZ2V0T3JkZXJEZXRhaWwoKXtcbiAgICAgIGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9lYXRfb3JkZXJfZGV0YWlscy8nICsgdGhpcy5vcmRlcklkXG4gICAgICBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgIH0sXG4gICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICB0aGlzLm9yZGVyUmVzdWx0ID0gcmVzLmRhdGEubWVzc2FnZTsgIFxuICAgICAgICB0aGlzLmlzdm9pY2UgPSByZXMuZGF0YS5tZXNzYWdlLmlzX2ludm9pY2U7XG4gICAgICAgIHRoaXMucGF5UGVvcGxlTXNnID0gcmVzLmRhdGEubWVzc2FnZS50YWtlYXdheXM7XG4gICAgICAgIHRoaXMucGF5UGVvcGxlTXNnLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgdGhpcy5zdW1zID0gTnVtYmVyKHRoaXMuc3VtcykgKyBOdW1iZXIoaXRlbS5udW1zKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKXtcbiAgICAgIHRoaXMub3JkZXJJZCA9IG9wdGlvbnMub3JkZXJJZDtcbiAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgIGlmKHRoaXMudG9rZW4gJiYgdGhpcy5vcmRlcklkKXtcbiAgICAgICAgdGhpcy5nZXRPcmRlckRldGFpbCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWxpdmVyRGF0YSA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuZGVsaXZlckRhdGE7XG4gICAgICB0aGlzLnBheVdheSA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucGF5V2F5O1xuICAgICAgdGhpcy51c2VySW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidXNlckluZm9cIik7XG4gICAgfVxuICAgIG9uU2hvdygpe31cbiAgfVxuIl19