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

var Orderdone = function (_wepy$page) {
  _inherits(Orderdone, _wepy$page);

  function Orderdone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Orderdone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Orderdone.__proto__ || Object.getPrototypeOf(Orderdone)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单完成',
      navigationBarBackgroundColor: '#ffd265'
    }, _this.data = {
      token: '',
      isvoice: 0, //是否支持开发票
      billing: true,
      deliverData: null,
      payPeopleMsg: null,
      tips: '无', //备注
      payWay: '微信支付', //支付方式
      serial: '', //订单编号
      dateline: '', //下单时间
      promotion: null,
      userInfo: null,
      sums: 0, //总份数
      number: 0, //用餐人数
      orderResult: null,
      disMoney: 0, //优惠的钱
      invoice: null,
      orderId: 0,
      total: 0,
      is_invoice: ''
    }, _this.methods = {
      // 跳转评价
      toCommemt: function toCommemt(e) {
        wx.navigateTo({
          url: './comment?orderId=' + e.currentTarget.dataset.id
        });
      },

      //再来一单
      moreOrder: function moreOrder() {
        wx.navigateBack({
          delta: 1
        });
      },

      // 发票开关
      switch1Change: function switch1Change(e) {
        this.billing = !this.billing;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Orderdone, [{
    key: 'getOrderDoneData',

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
                  // const data = res.data.data;
                  // if(res.data.code == 0){
                  _this2.invoice = res.data.message; //发票信息
                  _this2.is_invoice = res.data.message.is_invoice;
                  // this.sums = data.sums;        //总份数
                  //   this.number = data.number;    //用餐人数
                  //   this.orderResult = data.orderResult,
                  //   this.total = util.keepTwoDecimalFull(data.orderResult.total/100);
                  _this2.payPeopleMsg = res.data.message.takeaways;
                  _this2.payPeopleMsg.forEach(function (item, index) {
                    _this2.sums = Number(_this2.sums) + Number(item.nums);
                  });
                  //   this.serial = data.serial;
                  //   this.dateline = data.dateline;
                  //   this.promotion = data.promotion;
                  _this2.$apply();
                  // }
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrderDoneData() {
        return _ref2.apply(this, arguments);
      }

      return getOrderDoneData;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.$apply();
      //获取商户是否支持开发票
      // this.isvoice = wepy.$instance.globalData.isvoice;
      var that = this;
      //获取个人信息
      wx.getStorage({
        key: 'userInfo',
        success: function success(res) {
          that.userInfo = res.data;
          that.$apply();
        }
      });
      this.disMoney = _wepy2.default.$instance.globalData.disMoney;
      this.orderId = _wepy2.default.$instance.globalData.orderId;
      this.deliverData = _wepy2.default.$instance.globalData.deliverData;
      this.tips = wx.getStorageSync("tips");
      this.tips = _util2.default.sliceStr(this.tips) ? _util2.default.sliceStr(this.tips) : '';
      this.getOrderDoneData();
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }]);

  return Orderdone;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Orderdone , 'pages/f/page/d/orderDone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRG9uZS5qcyJdLCJuYW1lcyI6WyJPcmRlcmRvbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImRhdGEiLCJ0b2tlbiIsImlzdm9pY2UiLCJiaWxsaW5nIiwiZGVsaXZlckRhdGEiLCJwYXlQZW9wbGVNc2ciLCJ0aXBzIiwicGF5V2F5Iiwic2VyaWFsIiwiZGF0ZWxpbmUiLCJwcm9tb3Rpb24iLCJ1c2VySW5mbyIsInN1bXMiLCJudW1iZXIiLCJvcmRlclJlc3VsdCIsImRpc01vbmV5IiwiaW52b2ljZSIsIm9yZGVySWQiLCJ0b3RhbCIsImlzX2ludm9pY2UiLCJtZXRob2RzIiwidG9Db21tZW10IiwiZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaWQiLCJtb3JlT3JkZXIiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInN3aXRjaDFDaGFuZ2UiLCJhcGkiLCJhcGlNYWxsIiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwibWVzc2FnZSIsInRha2Vhd2F5cyIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJOdW1iZXIiLCJudW1zIiwiJGFwcGx5IiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJ0aGF0IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidXRpbCIsInNsaWNlU3RyIiwiZ2V0T3JkZXJEb25lRGF0YSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QjtB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bUIrQixlQUFLb0IsU0FBTCxDQUFlQyxVQUFmLENBQTBCcEQsV0FBN0M7QUFDQSxXQUFLRSxJQUFMLEdBQVlpQixHQUFHMEIsY0FBSCxDQUFrQixNQUFsQixDQUFaO0FBQ0EsV0FBSzNDLElBQUwsR0FBWW1ELGVBQUtDLFFBQUwsQ0FBYyxLQUFLcEQsSUFBbkIsSUFBMkJtRCxlQUFLQyxRQUFMLENBQWMsS0FBS3BELElBQW5CLENBQTNCLEdBQXNELEVBQWxFO0FBQ0EsV0FBS3FELGdCQUFMO0FBQ0FwQyxTQUFHcUMsU0FBSCxDQUFhO0FBQ1hDLGVBQU0sS0FESztBQUVYQyxjQUFLLFNBRk07QUFHWEMsa0JBQVM7QUFIRSxPQUFiO0FBS0Q7Ozs2QkFDTyxDQUFFOzs7O0VBdEcyQjVCLGVBQUs2QixJOztrQkFBdkJwRSxTIiwiZmlsZSI6Im9yZGVyRG9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9hcGknXG4gIGltcG9ydCB1dGlsIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3V0aWwnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyZG9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleWujOaIkCcsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI2NScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjonJyxcbiAgICAgIGlzdm9pY2U6MCwgIC8v5piv5ZCm5pSv5oyB5byA5Y+R56WoXG4gICAgICBiaWxsaW5nOnRydWUsXG4gICAgICBkZWxpdmVyRGF0YTpudWxsLFxuICAgICAgcGF5UGVvcGxlTXNnOm51bGwsXG4gICAgICB0aXBzOifml6AnLCAgICAgICAgLy/lpIfms6hcbiAgICAgIHBheVdheTon5b6u5L+h5pSv5LuYJywgICAgICAgLy/mlK/ku5jmlrnlvI9cbiAgICAgIHNlcmlhbDonJywgICAgICAgLy/orqLljZXnvJblj7dcbiAgICAgIGRhdGVsaW5lOicnLCAgICAgLy/kuIvljZXml7bpl7RcbiAgICAgIHByb21vdGlvbjpudWxsLFxuICAgICAgdXNlckluZm86bnVsbCxcbiAgICAgIHN1bXM6MCwgICAgIC8v5oC75Lu95pWwXG4gICAgICBudW1iZXI6MCwgICAvL+eUqOmkkOS6uuaVsFxuICAgICAgb3JkZXJSZXN1bHQ6bnVsbCxcbiAgICAgIGRpc01vbmV5OjAsICAgIC8v5LyY5oOg55qE6ZKxXG4gICAgICBpbnZvaWNlOm51bGwsXG4gICAgICBvcmRlcklkOjAsXG4gICAgICB0b3RhbDowLFxuICAgICAgaXNfaW52b2ljZTonJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8g6Lez6L2s6K+E5Lu3XG4gICAgICB0b0NvbW1lbXQoZSl7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDonLi9jb21tZW50P29yZGVySWQ9JyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy/lho3mnaXkuIDljZVcbiAgICAgIG1vcmVPcmRlcigpe1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g5Y+R56Wo5byA5YWzXG4gICAgICBzd2l0Y2gxQ2hhbmdlKGUpe1xuICAgICAgICB0aGlzLmJpbGxpbmcgPSAhdGhpcy5iaWxsaW5nO1xuICAgICAgfSxcbiAgICB9XG4gICAgLy8g6K+35rGC6K6i5Y2V5a6M5oiQ5pWw5o2uXG4gICAgYXN5bmMgZ2V0T3JkZXJEb25lRGF0YSgpe1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL2VhdF9vcmRlcl9kZXRhaWxzLycgKyB0aGlzLm9yZGVySWRcbiAgICAgIGF3YWl0IHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgfSxcbiAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgIC8vIGNvbnN0IGRhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAvLyBpZihyZXMuZGF0YS5jb2RlID09IDApe1xuICAgICAgICB0aGlzLmludm9pY2UgPSByZXMuZGF0YS5tZXNzYWdlOyAgIC8v5Y+R56Wo5L+h5oGvXG4gICAgICAgIHRoaXMuaXNfaW52b2ljZSA9IHJlcy5kYXRhLm1lc3NhZ2UuaXNfaW52b2ljZTtcbiAgICAgICAgLy8gdGhpcy5zdW1zID0gZGF0YS5zdW1zOyAgICAgICAgLy/mgLvku73mlbBcbiAgICAgICAgLy8gICB0aGlzLm51bWJlciA9IGRhdGEubnVtYmVyOyAgICAvL+eUqOmkkOS6uuaVsFxuICAgICAgICAvLyAgIHRoaXMub3JkZXJSZXN1bHQgPSBkYXRhLm9yZGVyUmVzdWx0LFxuICAgICAgICAvLyAgIHRoaXMudG90YWwgPSB1dGlsLmtlZXBUd29EZWNpbWFsRnVsbChkYXRhLm9yZGVyUmVzdWx0LnRvdGFsLzEwMCk7XG4gICAgICAgIHRoaXMucGF5UGVvcGxlTXNnID0gcmVzLmRhdGEubWVzc2FnZS50YWtlYXdheXM7XG4gICAgICAgIHRoaXMucGF5UGVvcGxlTXNnLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgdGhpcy5zdW1zID0gTnVtYmVyKHRoaXMuc3VtcykgKyBOdW1iZXIoaXRlbS5udW1zKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gICB0aGlzLnNlcmlhbCA9IGRhdGEuc2VyaWFsO1xuICAgICAgICAvLyAgIHRoaXMuZGF0ZWxpbmUgPSBkYXRhLmRhdGVsaW5lO1xuICAgICAgICAvLyAgIHRoaXMucHJvbW90aW9uID0gZGF0YS5wcm9tb3Rpb247XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIC8vIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIC8v6I635Y+W5ZWG5oi35piv5ZCm5pSv5oyB5byA5Y+R56WoXG4gICAgICAvLyB0aGlzLmlzdm9pY2UgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLmlzdm9pY2U7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAvL+iOt+WPluS4quS6uuS/oeaBr1xuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ3VzZXJJbmZvJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgdGhhdC51c2VySW5mbyA9IHJlcy5kYXRhO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc01vbmV5ID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5kaXNNb25leTtcbiAgICAgIHRoaXMub3JkZXJJZCA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEub3JkZXJJZDtcbiAgICAgIHRoaXMuZGVsaXZlckRhdGEgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLmRlbGl2ZXJEYXRhO1xuICAgICAgdGhpcy50aXBzID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0aXBzXCIpO1xuICAgICAgdGhpcy50aXBzID0gdXRpbC5zbGljZVN0cih0aGlzLnRpcHMpID8gdXRpbC5zbGljZVN0cih0aGlzLnRpcHMpIDogJyc7XG4gICAgICB0aGlzLmdldE9yZGVyRG9uZURhdGEoKTtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOifliqDovb3kuK0nLFxuICAgICAgICBpY29uOidsb2FkaW5nJyxcbiAgICAgICAgZHVyYXRpb246MTAwMFxuICAgICAgfSlcbiAgICB9XG4gICAgb25TaG93KCl7fVxuICB9XG4iXX0=