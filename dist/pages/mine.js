'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

var _orderGoods = require('./../components/orderGoods.js');

var _orderGoods2 = _interopRequireDefault(_orderGoods);

var _moreFormId = require('./../components/moreFormId.js');

var _moreFormId2 = _interopRequireDefault(_moreFormId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mine = function (_wepy$page) {
    _inherits(Mine, _wepy$page);

    function Mine() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mine);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个人中心',
            backgroundColor: '#ff3e2c'
        }, _this.components = {
            orderGoods: _orderGoods2.default,
            moreFormId: _moreFormId2.default
        }, _this.data = {
            token: '',
            otherModular: [{ icon: 'http://www.qumatou.com.cn/zheng/xcximage/wodehuiyuan.png', title: '我的会员' },
            // { icon:'http://www.qumatou.com.cn/zheng/xcximage/jifenshangcheng.png', title:'积分商城'},
            // { icon:'http://www.qumatou.com.cn/zheng/xcximage/jifenchoujiang.png', title:'积分抽奖'},
            { icon: 'http://www.qumatou.com.cn/zheng/xcximage/wodeshoucang.png', title: '我的收藏' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/jifen.png', title: '我的积分' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/kaquan.png', title: '我的卡券' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/wodexiaodian.png', title: '我的小店' },
            // { icon:'http://www.qumatou.com.cn/zheng/xcximage/daiyanxiaodian.png', title:'我的代言小店'},
            { icon: 'http://www.qumatou.com.cn/zheng/xcximage/gerenrenzheng.png', title: '个人认证' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/shanghurenzheng.png', title: '商户中心' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/lianxikefu.png', title: '联系客服' }]
        }, _this.methods = {
            //会员卡页
            otherModularItem: function otherModularItem(index) {
                if (index == 0) {
                    wx.navigateTo({
                        url: '../packageMembershipCard/membershipCard/memberList'
                    });
                } else if (index == 7) {
                    wx.makePhoneCall({
                        phoneNumber: '68961716'
                    });
                } else if (index == 5) {
                    wx.navigateTo({
                        url: './personalAuthentication'
                    });
                } else if (index == 6) {
                    wx.navigateTo({
                        url: './merchantCentre'
                    });
                    // let url = requestUrl.MerchantAuth;
                    // let data = {
                    //     p_id: wepy.$instance.globalData.p_id,
                    //     role: 0,
                    //     type: 0,
                    //     token: wx.getStorageSync("token")
                    // }
                    // requestData(url,'POST',data).then(res=>{
                    //     if(res.data.data.status != 0 && res.data.data.status != -1){
                    //         wx.navigateTo({
                    //             url: './merchantCA'
                    //         });
                    //     }else if(res.data.data.status == 0){
                    //         let m_id = res.data.data.m_id;
                    //         wx.showModal({
                    //             title:'商户认证',
                    //             content: `您已在${res.data.data.mname}商户认证成功,进入商户预充值`,
                    //             showCancel: false,
                    //             cancelColor: '#000000',
                    //             confirmText: '确定',
                    //             confirmColor: '#3CC51F',
                    //             success: res => {
                    //                 if(res.confirm){
                    //                     wx.navigateTo({
                    //                         url: `./merchatPrecharge?m_id=${m_id}`
                    //                     });
                    //                 }
                    //             }
                    //         });
                    //     }else if(res.data.data.status == -1){
                    //         wx.showToast({
                    //             title: '审核中..',
                    //             icon: 'none',
                    //             duration: 1500,
                    //             mask: false,
                    //         });
                    //     }
                    // })
                } else {
                    wx.showToast({
                        title: '待完善中...',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            },

            // 订单跳转
            relatedOrders: function relatedOrders(index) {
                _wepy2.default.$instance.globalData.mineOrderStatus = index;
                // console.log(index)
                wx.reLaunch({
                    url: './order'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'onLoad',
        value: function onLoad() {
            this.token = wx.getStorageSync("token");
        }
    }, {
        key: 'onShow',
        value: function onShow() {}
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/mine'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pbmUuanMiXSwibmFtZXMiOlsiTWluZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjb21wb25lbnRzIiwib3JkZXJHb29kcyIsIm1vcmVGb3JtSWQiLCJkYXRhIiwidG9rZW4iLCJvdGhlck1vZHVsYXIiLCJpY29uIiwidGl0bGUiLCJtZXRob2RzIiwib3RoZXJNb2R1bGFySXRlbSIsImluZGV4Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwibWFrZVBob25lQ2FsbCIsInBob25lTnVtYmVyIiwic2hvd1RvYXN0IiwiZHVyYXRpb24iLCJtYXNrIiwicmVsYXRlZE9yZGVycyIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwibWluZU9yZGVyU3RhdHVzIiwicmVMYXVuY2giLCJnZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEk7Ozs7Ozs7Ozs7Ozs7O3NMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQyw2QkFBaUI7QUFGWixTLFFBSVRDLFUsR0FBYTtBQUNUQyw0Q0FEUztBQUVUQztBQUZTLFMsUUFJYkMsSSxHQUFPO0FBQ0hDLG1CQUFNLEVBREg7QUFFSEMsMEJBQWEsQ0FDVCxFQUFFQyxNQUFLLDBEQUFQLEVBQW1FQyxPQUFNLE1BQXpFLEVBRFM7QUFFVDtBQUNBO0FBQ0EsY0FBRUQsTUFBSywyREFBUCxFQUFvRUMsT0FBTSxNQUExRSxFQUpTLEVBS1QsRUFBRUQsTUFBSyxvREFBUCxFQUE2REMsT0FBTSxNQUFuRSxFQUxTLEVBTVQsRUFBRUQsTUFBSyxxREFBUCxFQUE4REMsT0FBTSxNQUFwRSxFQU5TLEVBT1QsRUFBRUQsTUFBSywyREFBUCxFQUFvRUMsT0FBTSxNQUExRSxFQVBTO0FBUVQ7QUFDQSxjQUFFRCxNQUFLLDREQUFQLEVBQXFFQyxPQUFNLE1BQTNFLEVBVFMsRUFVVCxFQUFFRCxNQUFLLDhEQUFQLEVBQXVFQyxPQUFNLE1BQTdFLEVBVlMsRUFXVCxFQUFFRCxNQUFLLHlEQUFQLEVBQWtFQyxPQUFNLE1BQXhFLEVBWFM7QUFGVixTLFFBbUJQQyxPLEdBQVU7QUFDTjtBQUNBQyw0QkFGTSw0QkFFV0MsS0FGWCxFQUVpQjtBQUNuQixvQkFBR0EsU0FBUyxDQUFaLEVBQWM7QUFDVkMsdUJBQUdDLFVBQUgsQ0FBYztBQUNWQyw2QkFBSztBQURLLHFCQUFkO0FBR0gsaUJBSkQsTUFJTSxJQUFHSCxTQUFTLENBQVosRUFBYztBQUNoQkMsdUJBQUdHLGFBQUgsQ0FBaUI7QUFDYkMscUNBQVk7QUFEQyxxQkFBakI7QUFHSCxpQkFKSyxNQUlBLElBQUdMLFNBQVMsQ0FBWixFQUFjO0FBQ2hCQyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLDZCQUFLO0FBREsscUJBQWQ7QUFHSCxpQkFKSyxNQUlBLElBQUdILFNBQVMsQ0FBWixFQUFjO0FBQ2hCQyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1ZDO0FBRFUscUJBQWQ7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsaUJBMUNLLE1BMENEO0FBQ0RGLHVCQUFHSyxTQUFILENBQWE7QUFDVFQsK0JBQU8sU0FERTtBQUVURCw4QkFBTSxNQUZHO0FBR1RXLGtDQUFVLElBSEQ7QUFJVEMsOEJBQU07QUFKRyxxQkFBYjtBQU1IO0FBQ0osYUFqRUs7O0FBa0VOO0FBQ0FDLHlCQW5FTSx5QkFtRVFULEtBbkVSLEVBbUVjO0FBQ2hCVSwrQkFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxlQUExQixHQUE0Q2IsS0FBNUM7QUFDQTtBQUNBQyxtQkFBR2EsUUFBSCxDQUFZO0FBQ1JYLHlCQUFLO0FBREcsaUJBQVo7QUFHSDtBQXpFSyxTOzs7OztpQ0FIRjtBQUNKLGlCQUFLVCxLQUFMLEdBQWFPLEdBQUdjLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBYjtBQUNIOzs7aUNBNEVPLENBQUU7Ozs7RUF2R29CTCxlQUFLTSxJOztrQkFBbEI5QixJIiwiZmlsZSI6Im1pbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBpbXBvcnQgd2VweSBmcm9tJ3dlcHknXG4gICAgaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vYXBpL3JlcXVlc3RVcmwnXG4gICAgaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi9hcGkvcmVxdWVzdERhdGEnXG4gICAgaW1wb3J0IG9yZGVyR29vZHMgZnJvbSAnLi4vY29tcG9uZW50cy9vcmRlckdvb2RzJ1xuICAgIGltcG9ydCBtb3JlRm9ybUlkIGZyb20gJy4uL2NvbXBvbmVudHMvbW9yZUZvcm1JZCdcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5lIGV4dGVuZHMgd2VweS5wYWdle1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Liq5Lq65Lit5b+DJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZjNlMmMnXG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50cyA9IHtcbiAgICAgICAgICAgIG9yZGVyR29vZHMsXG4gICAgICAgICAgICBtb3JlRm9ybUlkXG4gICAgICAgIH07XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICB0b2tlbjonJyxcbiAgICAgICAgICAgIG90aGVyTW9kdWxhcjpbXG4gICAgICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3dvZGVodWl5dWFuLnBuZycsIHRpdGxlOifmiJHnmoTkvJrlkZgnfSxcbiAgICAgICAgICAgICAgICAvLyB7IGljb246J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2UvamlmZW5zaGFuZ2NoZW5nLnBuZycsIHRpdGxlOifnp6/liIbllYbln44nfSxcbiAgICAgICAgICAgICAgICAvLyB7IGljb246J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2UvamlmZW5jaG91amlhbmcucG5nJywgdGl0bGU6J+enr+WIhuaKveWllid9LFxuICAgICAgICAgICAgICAgIHsgaWNvbjonaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS93b2Rlc2hvdWNhbmcucG5nJywgdGl0bGU6J+aIkeeahOaUtuiXjyd9LFxuICAgICAgICAgICAgICAgIHsgaWNvbjonaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9qaWZlbi5wbmcnLCB0aXRsZTon5oiR55qE56ev5YiGJ30sXG4gICAgICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL2thcXVhbi5wbmcnLCB0aXRsZTon5oiR55qE5Y2h5Yi4J30sXG4gICAgICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3dvZGV4aWFvZGlhbi5wbmcnLCB0aXRsZTon5oiR55qE5bCP5bqXJ30sXG4gICAgICAgICAgICAgICAgLy8geyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL2RhaXlhbnhpYW9kaWFuLnBuZycsIHRpdGxlOifmiJHnmoTku6PoqIDlsI/lupcnfSxcbiAgICAgICAgICAgICAgICB7IGljb246J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2UvZ2VyZW5yZW56aGVuZy5wbmcnLCB0aXRsZTon5Liq5Lq66K6k6K+BJ30sXG4gICAgICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3NoYW5naHVyZW56aGVuZy5wbmcnLCB0aXRsZTon5ZWG5oi35Lit5b+DJ30sXG4gICAgICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL2xpYW54aWtlZnUucG5nJywgdGl0bGU6J+iBlOezu+WuouacjSd9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgICAgb25Mb2FkKCl7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKTtcbiAgICAgICAgfSBcbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIC8v5Lya5ZGY5Y2h6aG1XG4gICAgICAgICAgICBvdGhlck1vZHVsYXJJdGVtKGluZGV4KXtcbiAgICAgICAgICAgICAgICBpZihpbmRleCA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9wYWNrYWdlTWVtYmVyc2hpcENhcmQvbWVtYmVyc2hpcENhcmQvbWVtYmVyTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gNyl7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXI6JzY4OTYxNzE2J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGluZGV4ID09IDUpe1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vcGVyc29uYWxBdXRoZW50aWNhdGlvbidcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gNil7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9tZXJjaGFudENlbnRyZWBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB1cmwgPSByZXF1ZXN0VXJsLk1lcmNoYW50QXV0aDtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByb2xlOiAwLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdHlwZTogMCxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRva2VuOiB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYocmVzLmRhdGEuZGF0YS5zdGF0dXMgIT0gMCAmJiByZXMuZGF0YS5kYXRhLnN0YXR1cyAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHVybDogJy4vbWVyY2hhbnRDQSdcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1lbHNlIGlmKHJlcy5kYXRhLmRhdGEuc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCBtX2lkID0gcmVzLmRhdGEuZGF0YS5tX2lkO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRpdGxlOifllYbmiLforqTor4EnLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb250ZW50OiBg5oKo5bey5ZyoJHtyZXMuZGF0YS5kYXRhLm1uYW1lfeWVhuaIt+iupOivgeaIkOWKnyzov5vlhaXllYbmiLfpooTlhYXlgLxgLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2FuY2VsQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBjb25maXJtQ29sb3I6ICcjM0NDNTFGJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHJlcy5jb25maXJtKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi9tZXJjaGF0UHJlY2hhcmdlP21faWQ9JHttX2lkfWBcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfWVsc2UgaWYocmVzLmRhdGEuZGF0YS5zdGF0dXMgPT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRpdGxlOiAn5a6h5qC45LitLi4nLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5b6F5a6M5ZaE5LitLi4uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyDorqLljZXot7PovaxcbiAgICAgICAgICAgIHJlbGF0ZWRPcmRlcnMoaW5kZXgpe1xuICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubWluZU9yZGVyU3RhdHVzID0gaW5kZXhcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbmRleClcbiAgICAgICAgICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogJy4vb3JkZXInXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb25TaG93KCl7fVxuICAgIH1cbiJdfQ==