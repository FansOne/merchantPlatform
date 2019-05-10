'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./../../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _requestUrl = require('./../../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mymenu = function (_wepy$page) {
  _inherits(Mymenu, _wepy$page);

  function Mymenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mymenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mymenu.__proto__ || Object.getPrototypeOf(Mymenu)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的菜单',
      navigationBarBackgroundColor: '#e5e5e5'
    }, _this.data = {
      token: '',
      isvoice: '',
      openId: '',
      shopId: 0, //用户id
      disMoney: 0, //优惠的钱数
      discountInfo: '优惠券',
      deliverData: null,
      singlePrice: 0,
      tips: '',
      discount: [], //优惠券
      billing: true,
      billShow: 'block',
      billData: null,
      length: 0,
      balance: '',
      discountShowOrFalse: 'display',
      isPromotion: 9, //是否选取优惠券
      promotionMsg: '', //优惠信息
      promotionPrice: '',
      prepay_id: '',
      long: 0,
      extConfig: null,
      afterDis: 0, //优惠之后剩余的钱
      amount: 0,
      selectCoupon: {},
      money: 0,
      userCoupon: [], //优惠券
      m_id: '',
      Bury_Money: '',
      selectPayMent: [true, false],
      Bury_Type: 0, //买单类型
      tableNumber: '',
      takeOutStatus: '',
      address: '',
      totalPack: '',
      distributionMoney: '',
      takeOutM_id: ''
    }, _this.components = {}, _this.methods = {
      // 选择支付方式
      selectPayMent: function selectPayMent(index) {
        if (index == 0) {
          //微信支付
          this.selectPayMent[0] = true;
          this.selectPayMent[1] = false;
          this.Bury_Type = 0;
        } else if (index == 1) {
          //会员卡支付
          this.selectPayMent[0] = false;
          this.selectPayMent[1] = true;
          this.Bury_Type = 2;
        }
      },

      // 发票开关
      switch1Change: function switch1Change(e) {
        this.billing = !this.billing;
      },

      // 调取支付
      payMoney: function payMoney() {
        var _this2 = this;

        wx.getStorage({
          key: 'deliverData',
          success: function success(res) {
            _this2.deliverData = res.data;
            _this2.$apply();
            if (_this2.deliverData) {
              if (_this2.takeOutStatus) {
                if (_this2.address) {
                  _this2.payMoneyFn();
                } else {
                  wx.showToast({ title: '请选择收货地址', icon: 'none' });
                }
              } else {
                _this2.payMoneyFn();
              }
              wx.setStorage({ key: 'deliverData', data: _this2.deliverData });
            } else {
              wx.showToast({
                title: '请重新选择商品',
                image: '../../../../images/warning.png',
                duration: 1000
              });
            }
          }
        });
      },

      //跳转开票页
      billList: function billList() {
        var that = this;
        wx.chooseInvoiceTitle({
          success: function success(res) {
            if (res) {
              that.long = 1;
              that.billData = res;
              that.$apply();
            }
          }
        });
      },

      //会员卡充值
      cardRecharge: function cardRecharge() {
        var item = { m_id: this.shopId };
        wx.navigateTo({
          url: '../../../../packageMembershipCard/membershipCard/cardRecharge?item=' + JSON.stringify(item)
        });
      },

      // 选择地址
      goAddress: function goAddress() {
        var _this3 = this;

        wx.chooseAddress({
          success: function success(res) {
            var address = res;
            var url = _requestUrl2.default.getDistributionMoney;
            _this3.address = res.provinceName + " " + res.cityName + " " + res.countyName + " " + res.detailInfo;
            if (_this3.distributionMoney == '') {
              (0, _requestData.requestData)(url, 'POST', res).then(function (res) {
                _this3.distributionMoney = res.data.data.money;
                _this3.Bury_Money = Number(_this3.Bury_Money) + Number(res.data.data.money);
              });
              _this3.$apply();
            }
            _this3.$apply();
            wx.setStorage({ key: 'address', data: address });
          },
          fail: function fail() {
            wx.openSetting();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mymenu, [{
    key: 'payMoneyFn',

    // 下单
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this4 = this;

        var url, orderGoods, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _requestUrl2.default.downOrder;
                orderGoods = this.deliverData;
                data = {
                  p_id: _wepy2.default.$instance.globalData.p_id,
                  m_id: this.takeOutM_id || this.m_id,
                  m_TranType: this.takeOutStatus ? 3 : 1, //判断交易类型 0 买单 1 自营商品下单 2-代购代销产品 3-外卖产品
                  Bury_Type: this.Bury_Type, //买单类型：0-微信支付 2-会员卡支付 3-微信+会员卡 4-微信+卡券
                  Bury_Money: this.Bury_Money,
                  token: this.token,
                  product: orderGoods.orderGoods,
                  tableNum: this.tableNumber
                };

                if (this.distributionMoney != '') data.totalPack = this.totalPack, data.delivery = this.distributionMoney;
                if (this.takeOutStatus) data.address = wx.getStorageSync('address');
                (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                  if (res.data.data.ret == 'FAILED') {
                    wx.showToast({ title: res.data.data.msg, icon: 'none' });
                  } else if (res.data.data.ret == 'SUCCESS') {
                    if (res.data.data.paytype == 1) {
                      wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 1500,
                        success: function success(res) {
                          setTimeout(function () {
                            wx.redirectTo({
                              url: './paymentSuccess'
                            });
                          }, 1500);
                        }
                      });
                    } else if (res.data.data.paytype == 0) {
                      var jssdk = res.data.data;
                      wx.requestPayment({
                        'appId': jssdk.appId,
                        'timeStamp': jssdk.timeStamp.toString(),
                        'nonceStr': jssdk.nonceStr,
                        'package': jssdk.package,
                        'signType': jssdk.signType,
                        'paySign': jssdk.sign,
                        'success': function success(res) {
                          wx.showToast({
                            title: '支付成功',
                            icon: 'success',
                            duration: 1500,
                            success: function success(res) {
                              setTimeout(function () {
                                wx.redirectTo({
                                  url: './paymentSuccess'
                                });
                              }, 1500);
                            }
                          });
                        },
                        'fail': function fail(res) {
                          _this4.deleteOrder();
                        }
                      });
                    }
                  }
                });

                wx.setStorage({
                  key: 'deliverData',
                  data: ''
                });
                wx.setStorage({
                  key: 'isStorageInfo',
                  data: ''
                });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function payMoneyFn() {
        return _ref2.apply(this, arguments);
      }

      return payMoneyFn;
    }()
    // 获取会员卡余额

  }, {
    key: 'cardMessage',
    value: function cardMessage() {
      var _this5 = this;

      var data = {
        p_id: _wepy2.default.$instance.globalData.p_id,
        m_id: this.shopId,
        type: "0",
        token: _wepy2.default.getStorageSync('token')
      };
      (0, _requestData.requestData)(_requestUrl2.default.cardMessage, 'POST', data).then(function (res) {
        _this5.amount = res.data.data[0].MemInfo.balance;
        _this5.$apply();
      });
    }
    //用户取消支付后跳转订单

  }, {
    key: 'deleteOrder',
    value: function deleteOrder() {
      wx.showToast({
        title: '已取消支付',
        icon: 'none',
        duration: 1000,
        mask: false,
        success: function success() {
          setTimeout(function () {
            wx.switchTab({
              url: '../../../../pages/order'
            });
          }, 1100);
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this6 = this;

      console.log(options);
      if (options.takeOutM_id) this.takeOutM_id = options.takeOutM_id;
      this.totalPack = options.totalPack;
      this.takeOutStatus = _wepy2.default.$instance.globalData.takeOutStatus; //判断是否外卖
      this.m_id = options.m_id;
      this.Bury_Money = options.totalPack ? Number(options.Bury_Money) + Number(options.totalPack) : options.Bury_Money;
      this.token = wx.getStorageSync("token");
      //获取商户是否支持开发票
      this.isvoice = _wepy2.default.$instance.globalData.isvoice;
      this.shopId = _wepy2.default.$instance.globalData.shopId;
      wx.getStorage({
        key: 'deliverData',
        success: function success(res) {
          _this6.deliverData = res.data;
          _this6.$apply();
        }
      });
      wx.getStorage({
        key: 'data',
        success: function success(res) {
          if (res.data.socketTableNum == '无桌号') {
            _this6.tableNumber = '';
            _this6.$apply();
          } else {
            _this6.tableNumber = res.data.socketTableNum;
            _this6.$apply();
          }
        }
      });

      this.length = Object.keys(options).length;
      this.tips = wx.getStorageSync("tips");
      this.tips = _util2.default.sliceStr(this.tips) ? _util2.default.sliceStr(this.tips) : '';
      // this.getMember();
      // this.getCardMoney();
      this.$apply();
      // 获取会员卡余额
      this.cardMessage();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this7 = this;

      // 获取会员卡余额
      this.cardMessage();
      wx.getStorage({
        key: 'deliverData',
        success: function success(res) {
          _this7.deliverData = res.data;
          _this7.$apply();
        }
      });
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      wx.removeStorage({ key: 'selectCoupon' });
    }
    //领取会员卡
    // async getMember(){
    //   const url = api.apiMall + 'api/user_card';
    //   const data = {
    //       merchant_id:this.shopId
    //   }
    //   wepy.request({
    //     url: url,
    //     method: 'POST',
    //     header:{
    //         'Accept':'application/vnd.lingmo.v1+json',
    //         'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
    //         'Authorization':'Bearer ' + this.token
    //     },
    //     data: data,
    //   }).then(res=>{})
    // }

  }]);

  return Mymenu;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Mymenu , 'pages/f/page/d/myMenu'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TWVudS5qcyJdLCJuYW1lcyI6WyJNeW1lbnUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImRhdGEiLCJ0b2tlbiIsImlzdm9pY2UiLCJvcGVuSWQiLCJzaG9wSWQiLCJkaXNNb25leSIsImRpc2NvdW50SW5mbyIsImRlbGl2ZXJEYXRhIiwic2luZ2xlUHJpY2UiLCJ0aXBzIiwiZGlzY291bnQiLCJiaWxsaW5nIiwiYmlsbFNob3ciLCJiaWxsRGF0YSIsImxlbmd0aCIsImJhbGFuY2UiLCJkaXNjb3VudFNob3dPckZhbHNlIiwiaXNQcm9tb3Rpb24iLCJwcm9tb3Rpb25Nc2ciLCJwcm9tb3Rpb25QcmljZSIsInByZXBheV9pZCIsImxvbmciLCJleHRDb25maWciLCJhZnRlckRpcyIsImFtb3VudCIsInNlbGVjdENvdXBvbiIsIm1vbmV5IiwidXNlckNvdXBvbiIsIm1faWQiLCJCdXJ5X01vbmV5Iiwic2VsZWN0UGF5TWVudCIsIkJ1cnlfVHlwZSIsInRhYmxlTnVtYmVyIiwidGFrZU91dFN0YXR1cyIsImFkZHJlc3MiLCJ0b3RhbFBhY2siLCJkaXN0cmlidXRpb25Nb25leSIsInRha2VPdXRNX2lkIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJpbmRleCIsInN3aXRjaDFDaGFuZ2UiLCJlIiwicGF5TW9uZXkiLCJ3eCIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwicGF5TW9uZXlGbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInNldFN0b3JhZ2UiLCJpbWFnZSIsImR1cmF0aW9uIiwiYmlsbExpc3QiLCJ0aGF0IiwiY2hvb3NlSW52b2ljZVRpdGxlIiwiY2FyZFJlY2hhcmdlIiwiaXRlbSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29BZGRyZXNzIiwiY2hvb3NlQWRkcmVzcyIsInJlcXVlc3RVcmwiLCJnZXREaXN0cmlidXRpb25Nb25leSIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwiY291bnR5TmFtZSIsImRldGFpbEluZm8iLCJ0aGVuIiwiTnVtYmVyIiwiZmFpbCIsIm9wZW5TZXR0aW5nIiwiZG93bk9yZGVyIiwib3JkZXJHb29kcyIsInBfaWQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsIm1fVHJhblR5cGUiLCJwcm9kdWN0IiwidGFibGVOdW0iLCJkZWxpdmVyeSIsImdldFN0b3JhZ2VTeW5jIiwicmV0IiwibXNnIiwicGF5dHlwZSIsInNldFRpbWVvdXQiLCJyZWRpcmVjdFRvIiwianNzZGsiLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwidG9TdHJpbmciLCJub25jZVN0ciIsInBhY2thZ2UiLCJzaWduVHlwZSIsInNpZ24iLCJkZWxldGVPcmRlciIsInR5cGUiLCJjYXJkTWVzc2FnZSIsIk1lbUluZm8iLCJtYXNrIiwic3dpdGNoVGFiIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJzb2NrZXRUYWJsZU51bSIsIk9iamVjdCIsImtleXMiLCJ1dGlsIiwic2xpY2VTdHIiLCJyZW1vdmVTdG9yYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QjtBQUZ2QixLLFFBSVRDLEksR0FBTztBQUNMQyxhQUFNLEVBREQ7QUFFTEMsZUFBUSxFQUZIO0FBR0xDLGNBQU8sRUFIRjtBQUlMQyxjQUFPLENBSkYsRUFJTztBQUNaQyxnQkFBUyxDQUxKLEVBS087QUFDWkMsb0JBQWEsS0FOUjtBQU9MQyxtQkFBWSxJQVBQO0FBUUxDLG1CQUFZLENBUlA7QUFTTEMsWUFBSyxFQVRBO0FBVUxDLGdCQUFTLEVBVkosRUFVUztBQUNkQyxlQUFRLElBWEg7QUFZTEMsZ0JB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UUFBTCxDQUFjLEtBQUszRyxJQUFuQixDQUEzQixHQUFzRCxFQUFsRTtBQUNBO0FBQ0E7QUFDQSxXQUFLd0MsTUFBTDtBQUNBO0FBQ0EsV0FBS3dELFdBQUw7QUFDRDs7OzZCQUNPO0FBQUE7O0FBQ047QUFDQSxXQUFLQSxXQUFMO0FBQ0E3RCxTQUFHQyxVQUFILENBQWM7QUFDWkMsYUFBSyxhQURPO0FBRVpDLGlCQUFTLHNCQUFPO0FBQ2QsaUJBQUt4QyxXQUFMLEdBQW1CeUMsSUFBSWhELElBQXZCO0FBQ0EsaUJBQUtpRCxNQUFMO0FBQ0Q7QUFMVyxPQUFkO0FBT0Q7OzsrQkFDUztBQUNSTCxTQUFHeUUsYUFBSCxDQUFpQixFQUFDdkUsS0FBSyxjQUFOLEVBQWpCO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztFQWpUa0NtQyxlQUFLcUMsSTs7a0JBQXBCMUgsTSIsImZpbGUiOiJteU1lbnUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHV0aWwgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvdXRpbCdcblxuICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdFVybCdcbiAgaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdERhdGEnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE15bWVudSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiPnOWNlScsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2U1ZTVlNScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjonJyxcbiAgICAgIGlzdm9pY2U6JycsXG4gICAgICBvcGVuSWQ6JycsXG4gICAgICBzaG9wSWQ6MCwgICAvL+eUqOaIt2lkXG4gICAgICBkaXNNb25leTowLCAvL+S8mOaDoOeahOmSseaVsFxuICAgICAgZGlzY291bnRJbmZvOifkvJjmg6DliLgnLFxuICAgICAgZGVsaXZlckRhdGE6bnVsbCxcbiAgICAgIHNpbmdsZVByaWNlOjAsXG4gICAgICB0aXBzOicnLFxuICAgICAgZGlzY291bnQ6W10sICAvL+S8mOaDoOWIuFxuICAgICAgYmlsbGluZzp0cnVlLFxuICAgICAgYmlsbFNob3c6J2Jsb2NrJyxcbiAgICAgIGJpbGxEYXRhOm51bGwsXG4gICAgICBsZW5ndGg6MCxcbiAgICAgIGJhbGFuY2U6JycsXG4gICAgICBkaXNjb3VudFNob3dPckZhbHNlOidkaXNwbGF5JyxcbiAgICAgIGlzUHJvbW90aW9uOjksICAgICAvL+aYr+WQpumAieWPluS8mOaDoOWIuFxuICAgICAgcHJvbW90aW9uTXNnOicnLCAgICAvL+S8mOaDoOS/oeaBr1xuICAgICAgcHJvbW90aW9uUHJpY2U6JycsXG4gICAgICBwcmVwYXlfaWQ6JycsXG4gICAgICBsb25nOjAsXG4gICAgICBleHRDb25maWc6bnVsbCxcbiAgICAgIGFmdGVyRGlzOjAsICAgIC8v5LyY5oOg5LmL5ZCO5Ymp5L2Z55qE6ZKxXG4gICAgICBhbW91bnQ6MCxcbiAgICAgIHNlbGVjdENvdXBvbjp7fSxcbiAgICAgIG1vbmV5OjAsXG4gICAgICB1c2VyQ291cG9uOltdLCAgICAgLy/kvJjmg6DliLhcbiAgICAgIG1faWQ6JycsXG4gICAgICBCdXJ5X01vbmV5OicnLFxuICAgICAgc2VsZWN0UGF5TWVudDpbdHJ1ZSxmYWxzZV0sXG4gICAgICBCdXJ5X1R5cGU6MCwgLy/kubDljZXnsbvlnotcbiAgICAgIHRhYmxlTnVtYmVyOicnLFxuICAgICAgdGFrZU91dFN0YXR1czonJyxcbiAgICAgIGFkZHJlc3M6JycsXG4gICAgICB0b3RhbFBhY2s6JycsXG4gICAgICBkaXN0cmlidXRpb25Nb25leTonJyxcbiAgICAgIHRha2VPdXRNX2lkOicnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7fVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyDpgInmi6nmlK/ku5jmlrnlvI9cbiAgICAgIHNlbGVjdFBheU1lbnQoaW5kZXgpe1xuICAgICAgICBpZihpbmRleD09MCl7IC8v5b6u5L+h5pSv5LuYXG4gICAgICAgICAgdGhpcy5zZWxlY3RQYXlNZW50WzBdID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc2VsZWN0UGF5TWVudFsxXSA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5CdXJ5X1R5cGUgPSAwXG4gICAgICAgIH1lbHNlIGlmKGluZGV4PT0xKXsgLy/kvJrlkZjljaHmlK/ku5hcbiAgICAgICAgICB0aGlzLnNlbGVjdFBheU1lbnRbMF0gPSBmYWxzZVxuICAgICAgICAgIHRoaXMuc2VsZWN0UGF5TWVudFsxXSA9IHRydWVcbiAgICAgICAgICB0aGlzLkJ1cnlfVHlwZSA9IDJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIOWPkeelqOW8gOWFs1xuICAgICAgc3dpdGNoMUNoYW5nZShlKSB7XG4gICAgICAgIHRoaXMuYmlsbGluZyA9ICF0aGlzLmJpbGxpbmc7XG4gICAgICB9LFxuICAgICAgLy8g6LCD5Y+W5pSv5LuYXG4gICAgICBwYXlNb25leSgpe1xuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICdkZWxpdmVyRGF0YScsXG4gICAgICAgICAgc3VjY2VzczoocmVzPT57XG4gICAgICAgICAgICB0aGlzLmRlbGl2ZXJEYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgaWYodGhpcy5kZWxpdmVyRGF0YSl7XG4gICAgICAgICAgICAgIGlmKHRoaXMudGFrZU91dFN0YXR1cyl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hZGRyZXNzKXtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGF5TW9uZXlGbigpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfor7fpgInmi6nmlLbotKflnLDlnYAnLGljb246ICdub25lJyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMucGF5TW9uZXlGbigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe2tleTonZGVsaXZlckRhdGEnLGRhdGE6dGhpcy5kZWxpdmVyRGF0YX0pXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+mHjeaWsOmAieaLqeWVhuWTgScsXG4gICAgICAgICAgICAgICAgaW1hZ2U6Jy4uLy4uLy4uLy4uL2ltYWdlcy93YXJuaW5nLnBuZycsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvL+i3s+i9rOW8gOelqOmhtVxuICAgICAgYmlsbExpc3QoKXtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB3eC5jaG9vc2VJbnZvaWNlVGl0bGUoe1xuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICBpZihyZXMpe1xuICAgICAgICAgICAgICB0aGF0LmxvbmcgPSAxO1xuICAgICAgICAgICAgICB0aGF0LmJpbGxEYXRhID0gcmVzO1xuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvL+S8muWRmOWNoeWFheWAvFxuXHRcdFx0Y2FyZFJlY2hhcmdlKCl7XG4gICAgICAgIGxldCBpdGVtID0geyBtX2lkOnRoaXMuc2hvcElkIH07XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4uLy4uLy4uLy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9tZW1iZXJzaGlwQ2FyZC9jYXJkUmVjaGFyZ2U/aXRlbT0nICsgSlNPTi5zdHJpbmdpZnkoaXRlbSlcblx0XHRcdFx0fSk7XG4gICAgICB9LFxuICAgICAgLy8g6YCJ5oup5Zyw5Z2AXG4gICAgICBnb0FkZHJlc3MoKXtcblx0XHRcdFx0d3guY2hvb3NlQWRkcmVzcyh7XG4gICAgICAgICAgc3VjY2VzczogKHJlcyk9PiB7XG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IHJlcztcbiAgICAgICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLmdldERpc3RyaWJ1dGlvbk1vbmV5O1xuICAgICAgICAgICAgdGhpcy5hZGRyZXNzID0gcmVzLnByb3ZpbmNlTmFtZStcIiBcIityZXMuY2l0eU5hbWUrXCIgXCIrcmVzLmNvdW50eU5hbWUrXCIgXCIrcmVzLmRldGFpbEluZm9cbiAgICAgICAgICAgIGlmKHRoaXMuZGlzdHJpYnV0aW9uTW9uZXkgPT0gJycpe1xuICAgICAgICAgICAgICByZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLHJlcykudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3RyaWJ1dGlvbk1vbmV5ID0gcmVzLmRhdGEuZGF0YS5tb25leVxuICAgICAgICAgICAgICAgIHRoaXMuQnVyeV9Nb25leSA9IE51bWJlcih0aGlzLkJ1cnlfTW9uZXkpICsgTnVtYmVyKHJlcy5kYXRhLmRhdGEubW9uZXkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2UoeyBrZXk6J2FkZHJlc3MnLGRhdGE6IGFkZHJlc3N9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDooKT0+e1xuICAgICAgICAgICAgd3gub3BlblNldHRpbmcoKVxuICAgICAgICAgIH1cblx0XHRcdFx0fSlcblx0XHRcdH0sXG4gICAgfVxuICAgIC8vIOS4i+WNlVxuICAgIGFzeW5jIHBheU1vbmV5Rm4oKXtcbiAgICAgIGNvbnN0IHVybCA9IHJlcXVlc3RVcmwuZG93bk9yZGVyO1xuICAgICAgbGV0IG9yZGVyR29vZHMgPSB0aGlzLmRlbGl2ZXJEYXRhO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgcF9pZDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgIG1faWQ6dGhpcy50YWtlT3V0TV9pZCB8fCB0aGlzLm1faWQsXG4gICAgICAgIG1fVHJhblR5cGU6IHRoaXMudGFrZU91dFN0YXR1cz8zOjEsICAgICAvL+WIpOaWreS6pOaYk+exu+WeiyAwIOS5sOWNlSAxIOiHquiQpeWVhuWTgeS4i+WNlSAyLeS7o+i0reS7o+mUgOS6p+WTgSAzLeWkluWNluS6p+WTgVxuICAgICAgICBCdXJ5X1R5cGU6IHRoaXMuQnVyeV9UeXBlLCAgICAgICAgICAgICAgLy/kubDljZXnsbvlnovvvJowLeW+ruS/oeaUr+S7mCAyLeS8muWRmOWNoeaUr+S7mCAzLeW+ruS/oSvkvJrlkZjljaEgNC3lvq7kv6Er5Y2h5Yi4XG4gICAgICAgIEJ1cnlfTW9uZXk6dGhpcy5CdXJ5X01vbmV5LFxuICAgICAgICB0b2tlbjp0aGlzLnRva2VuLFxuICAgICAgICBwcm9kdWN0Om9yZGVyR29vZHMub3JkZXJHb29kcyxcbiAgICAgICAgdGFibGVOdW06IHRoaXMudGFibGVOdW1iZXJcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuZGlzdHJpYnV0aW9uTW9uZXkgIT0gJycpIGRhdGEudG90YWxQYWNrID0gdGhpcy50b3RhbFBhY2ssZGF0YS5kZWxpdmVyeSA9IHRoaXMuZGlzdHJpYnV0aW9uTW9uZXlcbiAgICAgIGlmKHRoaXMudGFrZU91dFN0YXR1cylkYXRhLmFkZHJlc3MgPSB3eC5nZXRTdG9yYWdlU3luYygnYWRkcmVzcycpXG4gICAgICByZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgIGlmKHJlcy5kYXRhLmRhdGEucmV0PT0nRkFJTEVEJyl7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogcmVzLmRhdGEuZGF0YS5tc2csaWNvbjogJ25vbmUnfSk7XG4gICAgICAgIH1lbHNlIGlmKHJlcy5kYXRhLmRhdGEucmV0ID09ICdTVUNDRVNTJyl7XG4gICAgICAgICAgaWYocmVzLmRhdGEuZGF0YS5wYXl0eXBlID09IDEpe1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmlK/ku5jmiJDlip8nLFxuICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICBzdWNjZXNzOihyZXM9PntcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOicuL3BheW1lbnRTdWNjZXNzJ1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LDE1MDApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNlIGlmKHJlcy5kYXRhLmRhdGEucGF5dHlwZSA9PSAwKXtcbiAgICAgICAgICAgIGxldCBqc3NkayA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgJ2FwcElkJzpqc3Nkay5hcHBJZCxcbiAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IGpzc2RrLnRpbWVTdGFtcC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAnbm9uY2VTdHInOiBqc3Nkay5ub25jZVN0cixcbiAgICAgICAgICAgICAgJ3BhY2thZ2UnOiBqc3Nkay5wYWNrYWdlLFxuICAgICAgICAgICAgICAnc2lnblR5cGUnOiBqc3Nkay5zaWduVHlwZSxcbiAgICAgICAgICAgICAgJ3BheVNpZ24nOiBqc3Nkay5zaWduLFxuICAgICAgICAgICAgICAnc3VjY2Vzcyc6cmVzPT57XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pSv5LuY5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgc3VjY2VzczoocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDonLi9wYXltZW50U3VjY2VzcydcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LDE1MDApXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICdmYWlsJzpyZXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZU9yZGVyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgXG4gICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnZGVsaXZlckRhdGEnLFxuICAgICAgICBkYXRhOicnXG4gICAgICB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2lzU3RvcmFnZUluZm8nLFxuICAgICAgICBkYXRhOicnXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDojrflj5bkvJrlkZjljaHkvZnpop1cbiAgICBjYXJkTWVzc2FnZSgpe1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgIG1faWQ6IHRoaXMuc2hvcElkLFxuICAgICAgICAgICAgdHlwZTpcIjBcIixcbiAgICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0RGF0YShyZXF1ZXN0VXJsLmNhcmRNZXNzYWdlLCdQT1NUJyxkYXRhKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLmFtb3VudCA9IHJlcy5kYXRhLmRhdGFbMF0uTWVtSW5mby5iYWxhbmNlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v55So5oi35Y+W5raI5pSv5LuY5ZCO6Lez6L2s6K6i5Y2VXG4gICAgZGVsZXRlT3JkZXIoKXtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn5bey5Y+W5raI5pSv5LuYJyxcbiAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgbWFzazogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAgIHVybDogJy4uLy4uLy4uLy4uL3BhZ2VzL29yZGVyJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgMTEwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICBjb25zb2xlLmxvZyhvcHRpb25zKVxuICAgICAgaWYob3B0aW9ucy50YWtlT3V0TV9pZCkgdGhpcy50YWtlT3V0TV9pZCA9IG9wdGlvbnMudGFrZU91dE1faWRcbiAgICAgIHRoaXMudG90YWxQYWNrID0gb3B0aW9ucy50b3RhbFBhY2tcbiAgICAgIHRoaXMudGFrZU91dFN0YXR1cyA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudGFrZU91dFN0YXR1cyAvL+WIpOaWreaYr+WQpuWkluWNllxuICAgICAgdGhpcy5tX2lkID0gb3B0aW9ucy5tX2lkXG4gICAgICB0aGlzLkJ1cnlfTW9uZXkgPSBvcHRpb25zLnRvdGFsUGFjaz8oTnVtYmVyKG9wdGlvbnMuQnVyeV9Nb25leSkgKyBOdW1iZXIob3B0aW9ucy50b3RhbFBhY2spKTpvcHRpb25zLkJ1cnlfTW9uZXlcbiAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpO1xuICAgICAgLy/ojrflj5bllYbmiLfmmK/lkKbmlK/mjIHlvIDlj5HnpahcbiAgICAgIHRoaXMuaXN2b2ljZSA9IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuaXN2b2ljZTtcbiAgICAgIHRoaXMuc2hvcElkID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zaG9wSWQ7XG4gICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnZGVsaXZlckRhdGEnLFxuICAgICAgICBzdWNjZXNzOiByZXM9PntcbiAgICAgICAgICB0aGlzLmRlbGl2ZXJEYXRhID0gcmVzLmRhdGE7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICdkYXRhJyxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBpZihyZXMuZGF0YS5zb2NrZXRUYWJsZU51bSA9PSAn5peg5qGM5Y+3Jyl7XG4gICAgICAgICAgICB0aGlzLnRhYmxlTnVtYmVyID0gJydcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudGFibGVOdW1iZXIgPSByZXMuZGF0YS5zb2NrZXRUYWJsZU51bVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIHRoaXMubGVuZ3RoID0gT2JqZWN0LmtleXMob3B0aW9ucykubGVuZ3RoO1xuICAgICAgdGhpcy50aXBzID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0aXBzXCIpO1xuICAgICAgdGhpcy50aXBzID0gdXRpbC5zbGljZVN0cih0aGlzLnRpcHMpID8gdXRpbC5zbGljZVN0cih0aGlzLnRpcHMpIDogJyc7XG4gICAgICAvLyB0aGlzLmdldE1lbWJlcigpO1xuICAgICAgLy8gdGhpcy5nZXRDYXJkTW9uZXkoKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAvLyDojrflj5bkvJrlkZjljaHkvZnpop1cbiAgICAgIHRoaXMuY2FyZE1lc3NhZ2UoKVxuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIC8vIOiOt+WPluS8muWRmOWNoeS9meminVxuICAgICAgdGhpcy5jYXJkTWVzc2FnZSgpXG4gICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnZGVsaXZlckRhdGEnLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMuZGVsaXZlckRhdGEgPSByZXMuZGF0YTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBvblVubG9hZCgpe1xuICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7a2V5OiAnc2VsZWN0Q291cG9uJ30pO1xuICAgIH1cbiAgICAvL+mihuWPluS8muWRmOWNoVxuICAgIC8vIGFzeW5jIGdldE1lbWJlcigpe1xuICAgIC8vICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3VzZXJfY2FyZCc7XG4gICAgLy8gICBjb25zdCBkYXRhID0ge1xuICAgIC8vICAgICAgIG1lcmNoYW50X2lkOnRoaXMuc2hvcElkXG4gICAgLy8gICB9XG4gICAgLy8gICB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgICB1cmw6IHVybCxcbiAgICAvLyAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgLy8gICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAvLyAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgLy8gICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBkYXRhOiBkYXRhLFxuICAgIC8vICAgfSkudGhlbihyZXM9Pnt9KVxuICAgIC8vIH1cbiAgfVxuIl19