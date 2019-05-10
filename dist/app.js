'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/index', 'pages/order', 'pages/mine', 'pages/deliciousFood', 'pages/collections', 'pages/cateList', 'pages/search', 'pages/memberCardSingleShop', 'pages/selectCoupon', 'pages/payedCouponsList', 'pages/couponsCenter', 'pages/inputValue', 'pages/payMentRecharge', 'pages/payMentSuccess', 'pages/personalAuthentication', 'pages/merchantCA', 'pages/merchatPrecharge', 'pages/integralMall', 'pages/integralExplain', 'pages/merchantCentre'],
      subPackages: [{
        root: "pages/f/",
        pages: ["page/index/index", "page/d/chooseNum", "page/d/d", "page/d/myMenu", "page/d/orderDone", "page/d/paymentSuccess", "page/d/noneTablenumOrderDetail", "page/d/comment", "page/d/selectCoupon"]
      }, {
        root: "pages/e/",
        pages: ["page/index/index", "page/homePage", "page/details", "page/payMentDetails", "page/userComment", "page/shoppingCard", "page/confirmOrder", "page/selectCoupon", "page/waitToPay", "page/confirmOrder_shoppingCar", "page/orderDetailesOT", "page/d/paymentSuccess", "page/orderDetails", "page/logisticsMessage", "page/orderEvaluateDetail", "page/startComment"]
      }, {
        root: 'packageMembershipCard',
        pages: ["membershipCard/memberList", "membershipCard/cardIndex", 'membershipCard/cardRecharge', 'membershipCard/payMentCardRecharge', 'membershipCard/searchMember', 'membershipCard/membershipMessage']
      }],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '天天好店',
        navigationBarTextStyle: 'black'
      },
      permission: {
        "scope.userLocation": {
          "desc": "你的位置信息将用于小程序筛选店铺使用"
        }
      },
      tabBar: {
        selectedColor: "#c55159",
        list: [{
          pagePath: "pages/index",
          text: "首页",
          iconPath: "./images/shouyeHide.png",
          selectedIconPath: "./images/shouyeShow.png"
        }, {
          pagePath: "pages/order",
          text: "订单",
          iconPath: "./images/dingdanHides.png",
          selectedIconPath: "./images/dingdanShows.png"
        }, {
          pagePath: "pages/mine",
          text: "我的",
          iconPath: "./images/wodeHide.png",
          selectedIconPath: "./images/wodeShow.png"
        }]
      },
      networkTimeout: {
        request: 5000,
        downloadFile: 7000
      }
    };
    _this.globalData = {
      userInfo: null
    };

    _this.use('requestfix');
    _this.use('promisify');
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      // wx4eb6236696a61724 印象澄城  wx9d4d36b4ef8d2653 天天好店p_id = 1  wx6231963e0a53c6dd 云上澄城 pid  1
      _wepy2.default.$instance.globalData.p_id = 1;
      var updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {});
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function success(res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
      // 登录换取用户Token
      wx.login({
        success: function success(res) {
          _wepy2.default.request({
            url: _requestUrl2.default.getToken,
            method: 'POST',
            data: {
              p_id: 1,
              m_id: 318,
              CODE: res.code
            }
          }).then(function (res) {
            var token = res.data.data[0].accessToken;
            wx.setStorageSync('token', token);
          }).catch(function (res) {
            wx.showToast({
              title: '请求服务器数据异常',
              icon: 'none',
              duration: 1500
            });
          });
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsInN1YlBhY2thZ2VzIiwicm9vdCIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJwZXJtaXNzaW9uIiwidGFiQmFyIiwic2VsZWN0ZWRDb2xvciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJpY29uUGF0aCIsInNlbGVjdGVkSWNvblBhdGgiLCJuZXR3b3JrVGltZW91dCIsInJlcXVlc3QiLCJkb3dubG9hZEZpbGUiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1c2UiLCJ3ZXB5IiwiJGluc3RhbmNlIiwicF9pZCIsInVwZGF0ZU1hbmFnZXIiLCJ3eCIsImdldFVwZGF0ZU1hbmFnZXIiLCJvbkNoZWNrRm9yVXBkYXRlIiwib25VcGRhdGVSZWFkeSIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiYXBwbHlVcGRhdGUiLCJsb2dpbiIsInVybCIsImFwaSIsImdldFRva2VuIiwibWV0aG9kIiwiZGF0YSIsIm1faWQiLCJDT0RFIiwiY29kZSIsInRoZW4iLCJ0b2tlbiIsImFjY2Vzc1Rva2VuIiwic2V0U3RvcmFnZVN5bmMiLCJjYXRjaCIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBMkdFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUF6R2ZBLE1BeUdlLEdBekdOO0FBQ1BDLGFBQU8sQ0FDTCxhQURLLEVBRUwsYUFGSyxFQUdMLFlBSEssRUFJTCxxQkFKSyxFQUtMLG1CQUxLLEVBTUwsZ0JBTkssRUFPTCxjQVBLLEVBUUwsNEJBUkssRUFTTCxvQkFUSyxFQVVMLHdCQVZLLEVBV0wscUJBWEssRUFZTCxrQkFaSyxFQWFMLHVCQWJLLEVBY0wsc0JBZEssRUFlTCw4QkFmSyxFQWdCTCxrQkFoQkssRUFpQkwsd0JBakJLLEVBa0JMLG9CQWxCSyxFQW1CTCx1QkFuQkssRUFvQkwsc0JBcEJLLENBREE7QUF1QlBDLG1CQUFhLENBQUM7QUFDWkMsY0FBTSxVQURNO0FBRVpGLGVBQU8sQ0FDTCxrQkFESyxFQUVMLGtCQUZLLEVBR0wsVUFISyxFQUlMLGVBSkssRUFLTCxrQkFMSyxFQU1MLHVCQU5LLEVBT0wsZ0NBUEssRUFRTCxnQkFSSyxFQVNMLHFCQVRLO0FBRkssT0FBRCxFQWFYO0FBQ0FFLGNBQU0sVUFETjtBQUVBRixlQUFPLENBQ0wsa0JBREssRUFFTCxlQUZLLEVBR0wsY0FISyxFQUlMLHFCQUpLLEVBS0wsa0JBTEssRUFNTCxtQkFOSyxFQU9MLG1CQVBLLEVBUUwsbUJBUkssRUFTTCxnQkFUSyxFQVVMLCtCQVZLLEVBV0wsc0JBWEssRUFZTCx1QkFaSyxFQWFMLG1CQWJLLEVBY0wsdUJBZEssRUFlTCwwQkFmSyxFQWdCTCxtQkFoQks7QUFGUCxPQWJXLEVBaUNYO0FBQ0FFLGNBQU0sdUJBRE47QUFFQUYsZUFBTyxDQUNMLDJCQURLLEVBRUwsMEJBRkssRUFHTCw2QkFISyxFQUlMLG9DQUpLLEVBS0wsNkJBTEssRUFNTCxrQ0FOSztBQUZQLE9BakNXLENBdkJOO0FBbUVQRyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsTUFIbEI7QUFJTkMsZ0NBQXdCO0FBSmxCLE9BbkVEO0FBeUVQQyxrQkFBWTtBQUNWLDhCQUFzQjtBQUNwQixrQkFBUTtBQURZO0FBRFosT0F6RUw7QUE4RVBDLGNBQVE7QUFDTkMsdUJBQWUsU0FEVDtBQUVOQyxjQUFNLENBQUM7QUFDTEMsb0JBQVUsYUFETDtBQUVMQyxnQkFBTSxJQUZEO0FBR0xDLG9CQUFVLHlCQUhMO0FBSUxDLDRCQUFrQjtBQUpiLFNBQUQsRUFLSjtBQUNBSCxvQkFBVSxhQURWO0FBRUFDLGdCQUFNLElBRk47QUFHQUMsb0JBQVUsMkJBSFY7QUFJQUMsNEJBQWtCO0FBSmxCLFNBTEksRUFVSjtBQUNBSCxvQkFBVSxZQURWO0FBRUFDLGdCQUFNLElBRk47QUFHQUMsb0JBQVUsdUJBSFY7QUFJQUMsNEJBQWtCO0FBSmxCLFNBVkk7QUFGQSxPQTlFRDtBQWlHUEMsc0JBQWdCO0FBQ2RDLGlCQUFTLElBREs7QUFFZEMsc0JBQWM7QUFGQTtBQWpHVCxLQXlHTTtBQUFBLFVBSGZDLFVBR2UsR0FIRjtBQUNYQyxnQkFBVTtBQURDLEtBR0U7O0FBRWIsVUFBS0MsR0FBTCxDQUFTLFlBQVQ7QUFDQSxVQUFLQSxHQUFMLENBQVMsV0FBVDtBQUhhO0FBSWQ7Ozs7K0JBQ1U7QUFDVDtBQUNBQyxxQkFBS0MsU0FBTCxDQUFlSixVQUFmLENBQTBCSyxJQUExQixHQUFpQyxDQUFqQztBQUNBLFVBQU1DLGdCQUFnQkMsR0FBR0MsZ0JBQUgsRUFBdEI7QUFDQUYsb0JBQWNHLGdCQUFkLENBQStCLGVBQUssQ0FBRSxDQUF0QztBQUNBSCxvQkFBY0ksYUFBZCxDQUE0QixZQUFZO0FBQ3RDSCxXQUFHSSxTQUFILENBQWE7QUFDWEMsaUJBQU8sTUFESTtBQUVYQyxtQkFBUyxrQkFGRTtBQUdYQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLGdCQUFJQSxJQUFJQyxPQUFSLEVBQWlCO0FBQ2ZWLDRCQUFjVyxXQUFkO0FBQ0Q7QUFDRjtBQVBVLFNBQWI7QUFTRCxPQVZEO0FBV0E7QUFDQVYsU0FBR1csS0FBSCxDQUFTO0FBQ1BKLGlCQUFTLHNCQUFPO0FBQ2RYLHlCQUFLTCxPQUFMLENBQWE7QUFDWHFCLGlCQUFLQyxxQkFBSUMsUUFERTtBQUVYQyxvQkFBUSxNQUZHO0FBR1hDLGtCQUFNO0FBQ0psQixvQkFBTSxDQURGO0FBRUptQixvQkFBTSxHQUZGO0FBR0pDLG9CQUFNVixJQUFJVztBQUhOO0FBSEssV0FBYixFQVFHQyxJQVJILENBUVEsZUFBSztBQUNYLGdCQUFJQyxRQUFRYixJQUFJUSxJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLEVBQWlCTSxXQUE3QjtBQUNBdEIsZUFBR3VCLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMkJGLEtBQTNCO0FBQ0QsV0FYRCxFQVdHRyxLQVhILENBV1MsZUFBSztBQUNaeEIsZUFBR3lCLFNBQUgsQ0FBYTtBQUNYcEIscUJBQU8sV0FESTtBQUVYcUIsb0JBQU0sTUFGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLRCxXQWpCRDtBQWtCRDtBQXBCTSxPQUFUO0FBc0JEOzs7O0VBdEowQi9CLGVBQUtnQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBhcGkgZnJvbSAnLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICBjb25maWcgPSB7XG4gICAgcGFnZXM6IFtcbiAgICAgICdwYWdlcy9pbmRleCcsXG4gICAgICAncGFnZXMvb3JkZXInLFxuICAgICAgJ3BhZ2VzL21pbmUnLFxuICAgICAgJ3BhZ2VzL2RlbGljaW91c0Zvb2QnLFxuICAgICAgJ3BhZ2VzL2NvbGxlY3Rpb25zJyxcbiAgICAgICdwYWdlcy9jYXRlTGlzdCcsXG4gICAgICAncGFnZXMvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9tZW1iZXJDYXJkU2luZ2xlU2hvcCcsXG4gICAgICAncGFnZXMvc2VsZWN0Q291cG9uJyxcbiAgICAgICdwYWdlcy9wYXllZENvdXBvbnNMaXN0JyxcbiAgICAgICdwYWdlcy9jb3Vwb25zQ2VudGVyJyxcbiAgICAgICdwYWdlcy9pbnB1dFZhbHVlJyxcbiAgICAgICdwYWdlcy9wYXlNZW50UmVjaGFyZ2UnLFxuICAgICAgJ3BhZ2VzL3BheU1lbnRTdWNjZXNzJyxcbiAgICAgICdwYWdlcy9wZXJzb25hbEF1dGhlbnRpY2F0aW9uJyxcbiAgICAgICdwYWdlcy9tZXJjaGFudENBJyxcbiAgICAgICdwYWdlcy9tZXJjaGF0UHJlY2hhcmdlJyxcbiAgICAgICdwYWdlcy9pbnRlZ3JhbE1hbGwnLFxuICAgICAgJ3BhZ2VzL2ludGVncmFsRXhwbGFpbicsXG4gICAgICAncGFnZXMvbWVyY2hhbnRDZW50cmUnXG4gICAgXSxcbiAgICBzdWJQYWNrYWdlczogW3tcbiAgICAgIHJvb3Q6IFwicGFnZXMvZi9cIixcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgIFwicGFnZS9pbmRleC9pbmRleFwiLFxuICAgICAgICBcInBhZ2UvZC9jaG9vc2VOdW1cIixcbiAgICAgICAgXCJwYWdlL2QvZFwiLFxuICAgICAgICBcInBhZ2UvZC9teU1lbnVcIixcbiAgICAgICAgXCJwYWdlL2Qvb3JkZXJEb25lXCIsXG4gICAgICAgIFwicGFnZS9kL3BheW1lbnRTdWNjZXNzXCIsXG4gICAgICAgIFwicGFnZS9kL25vbmVUYWJsZW51bU9yZGVyRGV0YWlsXCIsXG4gICAgICAgIFwicGFnZS9kL2NvbW1lbnRcIixcbiAgICAgICAgXCJwYWdlL2Qvc2VsZWN0Q291cG9uXCIsXG4gICAgICBdLFxuICAgIH0se1xuICAgICAgcm9vdDogXCJwYWdlcy9lL1wiLFxuICAgICAgcGFnZXM6IFtcbiAgICAgICAgXCJwYWdlL2luZGV4L2luZGV4XCIsXG4gICAgICAgIFwicGFnZS9ob21lUGFnZVwiLFxuICAgICAgICBcInBhZ2UvZGV0YWlsc1wiLFxuICAgICAgICBcInBhZ2UvcGF5TWVudERldGFpbHNcIixcbiAgICAgICAgXCJwYWdlL3VzZXJDb21tZW50XCIsXG4gICAgICAgIFwicGFnZS9zaG9wcGluZ0NhcmRcIixcbiAgICAgICAgXCJwYWdlL2NvbmZpcm1PcmRlclwiLFxuICAgICAgICBcInBhZ2Uvc2VsZWN0Q291cG9uXCIsXG4gICAgICAgIFwicGFnZS93YWl0VG9QYXlcIixcbiAgICAgICAgXCJwYWdlL2NvbmZpcm1PcmRlcl9zaG9wcGluZ0NhclwiLFxuICAgICAgICBcInBhZ2Uvb3JkZXJEZXRhaWxlc09UXCIsXG4gICAgICAgIFwicGFnZS9kL3BheW1lbnRTdWNjZXNzXCIsXG4gICAgICAgIFwicGFnZS9vcmRlckRldGFpbHNcIixcbiAgICAgICAgXCJwYWdlL2xvZ2lzdGljc01lc3NhZ2VcIixcbiAgICAgICAgXCJwYWdlL29yZGVyRXZhbHVhdGVEZXRhaWxcIixcbiAgICAgICAgXCJwYWdlL3N0YXJ0Q29tbWVudFwiLFxuICAgICAgXVxuICAgIH0se1xuICAgICAgcm9vdDogJ3BhY2thZ2VNZW1iZXJzaGlwQ2FyZCcsXG4gICAgICBwYWdlczogW1xuICAgICAgICBcIm1lbWJlcnNoaXBDYXJkL21lbWJlckxpc3RcIixcbiAgICAgICAgXCJtZW1iZXJzaGlwQ2FyZC9jYXJkSW5kZXhcIixcbiAgICAgICAgJ21lbWJlcnNoaXBDYXJkL2NhcmRSZWNoYXJnZScsXG4gICAgICAgICdtZW1iZXJzaGlwQ2FyZC9wYXlNZW50Q2FyZFJlY2hhcmdlJyxcbiAgICAgICAgJ21lbWJlcnNoaXBDYXJkL3NlYXJjaE1lbWJlcicsXG4gICAgICAgICdtZW1iZXJzaGlwQ2FyZC9tZW1iZXJzaGlwTWVzc2FnZScsXG4gICAgICBdICAgIFxuICAgIH1dLFxuICAgIHdpbmRvdzoge1xuICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflpKnlpKnlpb3lupcnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJ1xuICAgIH0sXG4gICAgcGVybWlzc2lvbjoge1xuICAgICAgXCJzY29wZS51c2VyTG9jYXRpb25cIjoge1xuICAgICAgICBcImRlc2NcIjogXCLkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/nrZvpgInlupfpk7rkvb/nlKhcIlxuICAgICAgfVxuICAgIH0sXG4gICAgdGFiQmFyOiB7XG4gICAgICBzZWxlY3RlZENvbG9yOiBcIiNjNTUxNTlcIixcbiAgICAgIGxpc3Q6IFt7XG4gICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL2luZGV4XCIsXG4gICAgICAgIHRleHQ6IFwi6aaW6aG1XCIsXG4gICAgICAgIGljb25QYXRoOiBcIi4vaW1hZ2VzL3Nob3V5ZUhpZGUucG5nXCIsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiLi9pbWFnZXMvc2hvdXllU2hvdy5wbmdcIlxuICAgICAgfSx7XG4gICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL29yZGVyXCIsXG4gICAgICAgIHRleHQ6IFwi6K6i5Y2VXCIsXG4gICAgICAgIGljb25QYXRoOiBcIi4vaW1hZ2VzL2RpbmdkYW5IaWRlcy5wbmdcIixcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCIuL2ltYWdlcy9kaW5nZGFuU2hvd3MucG5nXCIgICAgIFxuICAgICAgfSx7XG4gICAgICAgIHBhZ2VQYXRoOiBcInBhZ2VzL21pbmVcIixcbiAgICAgICAgdGV4dDogXCLmiJHnmoRcIixcbiAgICAgICAgaWNvblBhdGg6IFwiLi9pbWFnZXMvd29kZUhpZGUucG5nXCIsXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiLi9pbWFnZXMvd29kZVNob3cucG5nXCJcbiAgICAgIH1dXG4gICAgfSxcbiAgICBuZXR3b3JrVGltZW91dDoge1xuICAgICAgcmVxdWVzdDogNTAwMCxcbiAgICAgIGRvd25sb2FkRmlsZTogNzAwMFxuICAgIH0sXG4gIH1cbiAgZ2xvYmFsRGF0YSA9IHtcbiAgICB1c2VySW5mbzogbnVsbFxuICB9XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIHRoaXMudXNlKCdwcm9taXNpZnknKVxuICB9XG4gIG9uTGF1bmNoKCkge1xuICAgIC8vIHd4NGViNjIzNjY5NmE2MTcyNCDljbDosaHmvoTln44gIHd4OWQ0ZDM2YjRlZjhkMjY1MyDlpKnlpKnlpb3lupdwX2lkID0gMSAgd3g2MjMxOTYzZTBhNTNjNmRkIOS6keS4iua+hOWfjiBwaWQgIDFcbiAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQgPSAxXG4gICAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKTtcbiAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUocmVzPT57fSlcbiAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxuICAgICAgICBjb250ZW50OiAn5paw54mI5pys5bey57uP5YeG5aSH5aW977yM5piv5ZCm6YeN5ZCv5bqU55So77yfJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8g55m75b2V5o2i5Y+W55So5oi3VG9rZW5cbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBpLmdldFRva2VuLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHBfaWQ6IDEsXG4gICAgICAgICAgICBtX2lkOiAzMTgsXG4gICAgICAgICAgICBDT0RFOiByZXMuY29kZVxuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICBsZXQgdG9rZW4gPSByZXMuZGF0YS5kYXRhWzBdLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgfSkuY2F0Y2gocmVzPT57XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35rGC5pyN5Yqh5Zmo5pWw5o2u5byC5bi4JyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=