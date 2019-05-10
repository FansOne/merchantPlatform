'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paymentSuccess = function (_wepy$page) {
  _inherits(paymentSuccess, _wepy$page);

  function paymentSuccess() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, paymentSuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = paymentSuccess.__proto__ || Object.getPrototypeOf(paymentSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarBackgroundColor: '#ffd265',
      navigationBarTitleText: "支付成功"
    }, _this.data = {
      payment: 0,
      readPrompt: '安全提醒：我们不会以系统维护，订单异常等理由，要求您进行任何方式的退款操作，或以各种理由索取您的隐私信息（如个人信息,会员账号信息,银行卡账户,密码以及手机验证码等）。',
      shopId: '',
      userCoupon: [],
      is_limite: false,
      couponTabs: '',
      couponTab: 0,
      scrollHeight: 0,
      industryId: '',
      gotCouponsAlready: []
    }, _this.methods = {
      //查看订单
      seeOrder: function seeOrder() {
        // wepy.$instance.globalData.mineOrderStatus
        if (_wepy2.default.$instance.globalData.takeOutStatus) {
          _wepy2.default.$instance.globalData.mineOrderStatus = 3;
        } else {
          _wepy2.default.$instance.globalData.mineOrderStatus = 1;
        }
        wx.reLaunch({
          url: '../../../../pages/order'
        });
      },

      // 继续购物
      goIndex: function goIndex() {
        wx.navigateBack({
          delta: 2
        });
      },

      // 切换tab
      changeCouponTab: function changeCouponTab(index, industryId) {
        this.couponTab = index;
        this.industryId = industryId;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(paymentSuccess, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onHide',
    value: function onHide() {
      //页面关闭
      this.gotCouponsAlready.length = 0;
    }
  }]);

  return paymentSuccess;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(paymentSuccess , 'pages/f/page/d/paymentSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnRTdWNjZXNzLmpzIl0sIm5hbWVzIjpbInBheW1lbnRTdWNjZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwicGF5bWVudCIsInJlYWRQcm9tcHQiLCJzaG9wSWQiLCJ1c2VyQ291cG9uIiwiaXNfbGltaXRlIiwiY291cG9uVGFicyIsImNvdXBvblRhYiIsInNjcm9sbEhlaWdodCIsImluZHVzdHJ5SWQiLCJnb3RDb3Vwb25zQWxyZWFkeSIsIm1ldGhvZHMiLCJzZWVPcmRlciIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidGFrZU91dFN0YXR1cyIsIm1pbmVPcmRlclN0YXR1cyIsInd4IiwicmVMYXVuY2giLCJ1cmwiLCJnb0luZGV4IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjaGFuZ2VDb3Vwb25UYWIiLCJpbmRleCIsImxlbmd0aCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0I7QUFGakIsSyxRQUlWQyxJLEdBQU87QUFDTkMsZUFBUyxDQURIO0FBRUpDLGtCQUFXLHNGQUZQO0FBR0pDLGNBQU8sRUFISDtBQUlKQyxrQkFBVyxFQUpQO0FBS0pDLGlCQUFVLEtBTE47QUFNSkMsa0JBQVcsRUFOUDtBQU9KQyxpQkFBVSxDQVBOO0FBUUpDLG9CQUFhLENBUlQ7QUFTSkMsa0JBQVcsRUFUUDtBQVVKQyx5QkFBa0I7QUFWZCxLLFFBWU5DLE8sR0FBVTtBQUNSO0FBQ0FDLGNBRlEsc0JBRUU7QUFDUjtBQUNBLFlBQUdDLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkMsYUFBN0IsRUFBMkM7QUFDekNILHlCQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJFLGVBQTFCLEdBQTRDLENBQTVDO0FBQ0QsU0FGRCxNQUVLO0FBQ0hKLHlCQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJFLGVBQTFCLEdBQTRDLENBQTVDO0FBQ0Q7QUFDREMsV0FBR0MsUUFBSCxDQUFZO0FBQ1ZDLGVBQUs7QUFESyxTQUFaO0FBR0QsT0FaTzs7QUFhUjtBQUNBQyxhQWRRLHFCQWNDO0FBQ1BILFdBQUdJLFlBQUgsQ0FBZ0I7QUFDZEMsaUJBQU87QUFETyxTQUFoQjtBQUdELE9BbEJPOztBQW1CUjtBQUNBQyxxQkFwQlEsMkJBb0JRQyxLQXBCUixFQW9CY2hCLFVBcEJkLEVBb0J5QjtBQUMvQixhQUFLRixTQUFMLEdBQWlCa0IsS0FBakI7QUFDQSxhQUFLaEIsVUFBTCxHQUFrQkEsVUFBbEI7QUFDRDtBQXZCTyxLOzs7Ozs2QkF5QkYsQ0FBRTs7OzZCQUNGO0FBQ047QUFDQSxXQUFLQyxpQkFBTCxDQUF1QmdCLE1BQXZCLEdBQWdDLENBQWhDO0FBQ0Q7Ozs7RUE5Q3lDYixlQUFLYyxJOztrQkFBNUIvQixjIiwiZmlsZSI6InBheW1lbnRTdWNjZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIHBheW1lbnRTdWNjZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI2NScsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaUr+S7mOaIkOWKn1wiLFxuICAgIH1cbiAgXHRkYXRhID0ge1xuICBcdFx0cGF5bWVudDogMCxcbiAgICAgIHJlYWRQcm9tcHQ6J+WuieWFqOaPkOmGku+8muaIkeS7rOS4jeS8muS7peezu+e7n+e7tOaKpO+8jOiuouWNleW8guW4uOetieeQhueUse+8jOimgeaxguaCqOi/m+ihjOS7u+S9leaWueW8j+eahOmAgOasvuaTjeS9nO+8jOaIluS7peWQhOenjeeQhueUsee0ouWPluaCqOeahOmakOengeS/oeaBr++8iOWmguS4quS6uuS/oeaBryzkvJrlkZjotKblj7fkv6Hmga8s6ZO26KGM5Y2h6LSm5oi3LOWvhueggeS7peWPiuaJi+acuumqjOivgeeggeetie+8ieOAgicsXG4gICAgICBzaG9wSWQ6JycsXG4gICAgICB1c2VyQ291cG9uOltdLFxuICAgICAgaXNfbGltaXRlOmZhbHNlLFxuICAgICAgY291cG9uVGFiczonJyxcbiAgICAgIGNvdXBvblRhYjowLFxuICAgICAgc2Nyb2xsSGVpZ2h0OjAsXG4gICAgICBpbmR1c3RyeUlkOicnLFxuICAgICAgZ290Q291cG9uc0FscmVhZHk6W11cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8v5p+l55yL6K6i5Y2VXG4gICAgICBzZWVPcmRlcigpe1xuICAgICAgICAvLyB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLm1pbmVPcmRlclN0YXR1c1xuICAgICAgICBpZih3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXMpe1xuICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubWluZU9yZGVyU3RhdHVzID0gM1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLm1pbmVPcmRlclN0YXR1cyA9IDFcbiAgICAgICAgfVxuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiAnLi4vLi4vLi4vLi4vcGFnZXMvb3JkZXInXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g57un57ut6LSt54mpXG4gICAgICBnb0luZGV4KCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDliIfmjaJ0YWJcbiAgICAgIGNoYW5nZUNvdXBvblRhYihpbmRleCxpbmR1c3RyeUlkKXtcbiAgICAgICAgdGhpcy5jb3Vwb25UYWIgPSBpbmRleDtcbiAgICAgICAgdGhpcy5pbmR1c3RyeUlkID0gaW5kdXN0cnlJZDtcbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCl7fVxuICAgIG9uSGlkZSgpe1xuICAgICAgLy/pobXpnaLlhbPpl61cbiAgICAgIHRoaXMuZ290Q291cG9uc0FscmVhZHkubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cbiJdfQ==