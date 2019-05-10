'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _commentStar = require('./../../../components/commentStar.js');

var _commentStar2 = _interopRequireDefault(_commentStar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var New = function (_wepy$page) {
  _inherits(New, _wepy$page);

  function New() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, New);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = New.__proto__ || Object.getPrototypeOf(New)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单评价'
    }, _this.data = {
      //订单信息
      userAddress: {},
      //订单商品信息
      selectGoods: [],
      orderId: '',
      userId: '',
      score: '',
      token: ''
    }, _this.components = {
      commentStar: _commentStar2.default
    }, _this.methods = {
      remind: function remind(e) {
        var idx = e.currentTarget.dataset.index,
            data = this.selectGoods[idx];
        wx.navigateTo({
          url: 'startComment?id=' + data.id + '&title=' + data.title + '&cover=' + data.cover + '&price=' + data.price + '&nums=' + data.nums + '&orderId=' + this.orderId
        });
      },
      orderGeneralComment: function orderGeneralComment() {
        var _this2 = this;

        var score = _wepy2.default.$instance.globalData.score;
        if (score) {
          this.score = score;
          wx.getStorage({
            key: 'userId',
            success: function success(res) {
              _this2.userId = res.data;
              _this2.$apply();
              _this2.GeneralComment();
            }
          });
        } else {
          wx.showModal({
            title: '评分',
            content: '请先为该订单服务打分',
            duration: 1000,
            showCancel: false
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(New, [{
    key: 'onLoad',
    value: function onLoad(options) {
      //获取token
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.orderId = options.orderId;
      this.$apply();
      this.getOrderShow();
    }
  }, {
    key: 'getOrderShow',

    //订单详情
    value: function getOrderShow() {
      var that = this;
      var url = _api2.default.apiMall + 'api/shop_order_details/' + that.orderId;
      var data = {
        orderId: that.orderId
      };
      _wepy2.default.request({
        url: url,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/vnd.lingmo.v1+json',
          'Authorization': 'Bearer ' + this.token
        }
      }).then(function (res) {
        that.userAddress = res.data.message;
        that.selectGoods = res.data.message.goods;
        that.$apply();
      });
    }
    //订单总评论

  }, {
    key: 'GeneralComment',
    value: function GeneralComment() {
      var that = this;
      var url = _api2.default.apiMall + '/shop/comments';
      var data = {
        orderId: that.orderId,
        userId: that.userId,
        merchantId: _wepy2.default.$instance.globalData.payMessage.merchantId,
        score: that.score
      };
      _wepy2.default.request({
        url: url,
        method: 'POST',
        data: data
      }).then(function (res) {
        wx.showToast({
          title: '感谢您的评价',
          icon: 'none',
          image: '../images/感谢.png',
          duration: 1000,
          success: function success() {
            setTimeout(function () {
              wx.redirectTo({
                url: 'order'
              });
            }, 1000);
          }
        });
      });
    }
  }]);

  return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/orderEvaluateDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRXZhbHVhdGVEZXRhaWwuanMiXSwibmFtZXMiOlsiTmV3IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VyQWRkcmVzcyIsInNlbGVjdEdvb2RzIiwib3JkZXJJZCIsInVzZXJJZCIsInNjb3JlIiwidG9rZW4iLCJjb21wb25lbnRzIiwiY29tbWVudFN0YXIiLCJtZXRob2RzIiwicmVtaW5kIiwiZSIsImlkeCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInRpdGxlIiwiY292ZXIiLCJwcmljZSIsIm51bXMiLCJvcmRlckdlbmVyYWxDb21tZW50Iiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJnZXRTdG9yYWdlIiwia2V5Iiwic3VjY2VzcyIsInJlcyIsIiRhcHBseSIsIkdlbmVyYWxDb21tZW50Iiwic2hvd01vZGFsIiwiY29udGVudCIsImR1cmF0aW9uIiwic2hvd0NhbmNlbCIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsImdldE9yZGVyU2hvdyIsInRoYXQiLCJhcGkiLCJhcGlNYWxsIiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJtZXNzYWdlIiwiZ29vZHMiLCJtZXJjaGFudElkIiwicGF5TWVzc2FnZSIsInNob3dUb2FzdCIsImljb24iLCJpbWFnZSIsInNldFRpbWVvdXQiLCJyZWRpcmVjdFRvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNwQkMsTSxHQUFTO0FBQ1JDLDhCQUF3QjtBQURoQixLLFFBR1RDLEksR0FBTztBQUNOO0FBQ0VDLG1CQUFZLEVBRlI7QUFHSjtBQUNBQyxtQkFBWSxFQUpSO0FBS05DLGVBQVEsRUFMRjtBQU1KQyxjQUFPLEVBTkg7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Z0JBQVEsTUFGRztBQUdYOUMsY0FBTUE7QUFISyxPQUFiLEVBSUdnRCxJQUpILENBSVEsVUFBQ2pCLEdBQUQsRUFBTztBQUNiZixXQUFHcUMsU0FBSCxDQUFhO0FBQ1RqQyxpQkFBTyxRQURFO0FBRVRrQyxnQkFBTSxNQUZHO0FBR1RDLGlCQUFPLGtCQUhFO0FBSVRuQixvQkFBVSxJQUpEO0FBS1ROLG1CQUFRLG1CQUFJO0FBQ1YwQix1QkFBVyxZQUFJO0FBQ2J4QyxpQkFBR3lDLFVBQUgsQ0FBYztBQUNadkMscUJBQUs7QUFETyxlQUFkO0FBR0QsYUFKRCxFQUlFLElBSkY7QUFLRDtBQVhRLFNBQWI7QUFhRCxPQWxCRDtBQW1CRDs7OztFQXpHOEJPLGVBQUtpQyxJOztrQkFBakI3RCxHIiwiZmlsZSI6Im9yZGVyRXZhbHVhdGVEZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi9hcGkvYXBpJ1xuICBpbXBvcnQgY29tbWVudFN0YXIgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tZW50U3RhcidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBcdGNvbmZpZyA9IHtcbiAgXHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor4Tku7cnLFxuICBcdH1cbiAgXHRkYXRhID0ge1xuICBcdFx0Ly/orqLljZXkv6Hmga9cbiAgICAgIHVzZXJBZGRyZXNzOnt9LFxuICAgICAgLy/orqLljZXllYblk4Hkv6Hmga9cbiAgICAgIHNlbGVjdEdvb2RzOltdLFxuICBcdFx0b3JkZXJJZDonJyxcbiAgICAgIHVzZXJJZDonJyxcbiAgICAgIHNjb3JlOicnLFxuICAgICAgdG9rZW46JydcbiAgXHR9XG4gIFx0b25Mb2FkKG9wdGlvbnMpe1xuICAgICAgLy/ojrflj5Z0b2tlblxuICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgdGhpcy5vcmRlcklkID0gb3B0aW9ucy5vcmRlcklkO1xuICBcdFx0dGhpcy4kYXBwbHkoKVxuICBcdFx0dGhpcy5nZXRPcmRlclNob3coKVxuICBcdH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgY29tbWVudFN0YXI6Y29tbWVudFN0YXJcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICBcdHJlbWluZChlKXtcbiAgICBcdFx0bGV0IGlkeCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4LFxuICAgIFx0XHRkYXRhID0gdGhpcy5zZWxlY3RHb29kc1tpZHhdO1xuICAgIFx0XHR3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6J3N0YXJ0Q29tbWVudD9pZD0nK2RhdGEuaWQrJyZ0aXRsZT0nK2RhdGEudGl0bGUrJyZjb3Zlcj0nK2RhdGEuY292ZXIrJyZwcmljZT0nK2RhdGEucHJpY2UrJyZudW1zPScrZGF0YS5udW1zKycmb3JkZXJJZD0nK3RoaXMub3JkZXJJZFxuICAgICAgICB9KVxuICAgIFx0fSxcbiAgICAgIG9yZGVyR2VuZXJhbENvbW1lbnQoKXtcbiAgICAgICAgbGV0IHNjb3JlID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zY29yZTtcbiAgICAgICAgaWYgKHNjb3JlKSB7XG4gICAgICAgICAgdGhpcy5zY29yZSA9IHNjb3JlXG4gICAgICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6J3VzZXJJZCcsXG4gICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgICAgIHRoaXMudXNlcklkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB0aGlzLkdlbmVyYWxDb21tZW50KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgIHRpdGxlOiAn6K+E5YiGJyxcbiAgICAgICAgICBjb250ZW50OiAn6K+35YWI5Li66K+l6K6i5Y2V5pyN5Yqh5omT5YiGJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICBzaG93Q2FuY2VsOmZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8v6K6i5Y2V6K+m5oOFXG4gICAgZ2V0T3JkZXJTaG93KCl7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wX29yZGVyX2RldGFpbHMvJyArIHRoYXQub3JkZXJJZDtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIG9yZGVySWQ6IHRoYXQub3JkZXJJZCxcbiAgICAgIH1cbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIHVybDogdXJsLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgfSxcbiAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgdGhhdC51c2VyQWRkcmVzcyA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgIHRoYXQuc2VsZWN0R29vZHMgPSByZXMuZGF0YS5tZXNzYWdlLmdvb2RzXG4gICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIC8v6K6i5Y2V5oC76K+E6K66XG4gICAgR2VuZXJhbENvbW1lbnQoKXtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnL3Nob3AvY29tbWVudHMnO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgb3JkZXJJZDogdGhhdC5vcmRlcklkLFxuICAgICAgICB1c2VySWQ6dGhhdC51c2VySWQsXG4gICAgICAgIG1lcmNoYW50SWQ6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wYXlNZXNzYWdlLm1lcmNoYW50SWQsXG4gICAgICAgIHNjb3JlOiB0aGF0LnNjb3JlXG4gICAgICB9XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aEn+iwouaCqOeahOivhOS7tycsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlcy/mhJ/osKIucG5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICdvcmRlcidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9LDEwMDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=