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

var _couponItem = require('./../../../../components/couponItem.js');

var _couponItem2 = _interopRequireDefault(_couponItem);

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
      navigationBarTitleText: '支付成功',
      navigationBarBackgroundColor: '#ffd265'
    }, _this.data = {
      payment: 0,
      userInfo: {},
      readPrompt: '安全提醒：我们不会以系统维护，订单异常等理由，要求您进行任何方式的退款操作，或以各种理由索取您的隐私信息（如个人信息,会员账号信息,银行卡账户,密码以及手机验证码等）。',
      token: '',
      shopId: '',
      userCoupon: [],
      is_limite: false,
      couponTabs: '',
      couponTab: 0,
      scrollHeight: 0,
      industryId: '',
      gotCouponsAlready: []
    }, _this.components = {
      couponItem: _couponItem2.default
    }, _this.methods = {
      //查看订单
      seeOrder: function seeOrder() {
        if (_wepy2.default.$instance.globalData.localSpecialty == 1) {
          _wepy2.default.$instance.globalData.mineOrderStatus = 2;
        } else {
          _wepy2.default.$instance.globalData.mineOrderStatus = 1;
        }
        wx.reLaunch({
          url: '../../../order'
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
        this.getVoucherList(industryId);
      }
    }, _this.events = {
      userSelect: function userSelect(e, idx) {
        var _this2 = this;

        _wepy2.default.request({
          url: _api2.default.apiMall + 'api/user_coupons/' + e.id,
          method: 'GET',
          header: {
            'Accept': 'application/vnd.lingmo.v1+json',
            'Authorization': 'Bearer ' + this.token
          }
        }).then(function (res) {
          //卡券未领取成功，限制用户点击
          _this2.is_limite = true;
          _this2.$apply();
          if (res.data.status != '200') {
            wx.showToast({
              title: res.data.message,
              icon: 'success'
            });
          } else {
            _wepy2.default.request({
              url: _api2.default.apiMall + 'api/coupons',
              method: 'GET',
              header: {
                'Accept': 'application/vnd.lingmo.v1+json',
                'Authorization': 'Bearer ' + _this2.token
              },
              data: {
                merchant_id: _this2.shopId,
                // merchant_id:310,
                industry_id: _this2.industryId
              }
            }).then(function (res) {
              //计算已经领取的百分比
              _this2.userCoupon.forEach(function (item, index) {
                item.percent = (Number(item.receive) / (Number(item.lave) + Number(item.receive)) * 100).toFixed(2);
                if (e.id == item.id) {
                  item.checked = true;
                  _this2.gotCouponsAlready.push(e.id);
                }
              });
              console.log(_this2.gotCouponsAlready);
            });
            _this2.userCoupon[idx].isrev = 1;
            setTimeout(function () {
              _this2.is_limite = false;
              _this2.$apply();
            }, 1500);
            wx.showToast({
              title: '领取成功',
              icon: 'success'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(New, [{
    key: 'getVoucherList',

    //支付成功获取卡券列表
    value: function getVoucherList(industryId) {
      var _this3 = this;

      _wepy2.default.request({
        url: _api2.default.apiMall + 'api/coupons',
        method: 'GET',
        header: {
          'Accept': 'application/vnd.lingmo.v1+json',
          'Authorization': 'Bearer ' + this.token
        },
        data: {
          merchant_id: this.shopId,
          // merchant_id:310,
          industry_id: industryId
        }
      }).then(function (res) {
        res.data.message.forEach(function (item, index) {
          item.percent = (Number(item.receive) / (Number(item.lave) + Number(item.receive)) * 100).toFixed(2);
          if (item.begin_time == 0 || item.end_time == 0) {
            return false;
          } else {
            item.begin_time = _util2.default.timestampToTime(item.begin_time);
            item.end_time = _util2.default.timestampToTime(item.end_time);
          }
        });
        //计算已经领取的百分比
        // this.userCoupon.forEach((item,index)=>{
        //   item.percent = Math.ceil(Number(item.receive)/(Number(item.lave) + Number(item.receive)));
        // })
        _this3.userCoupon = res.data.message;
        _this3.userCoupon.forEach(function (item, index) {
          _this3.gotCouponsAlready.forEach(function (item1, index) {
            if (item.id == item1) {
              item.checked = true;
            }
          });
        });
        // console.log(this.userCoupon)
        _this3.$apply();
      });
    }
    //领取卡券刷新页面

    //获取卡券的分类

  }, {
    key: 'getCouponsCates',
    value: function getCouponsCates() {
      var _this4 = this;

      _wepy2.default.request({
        url: _api2.default.apiMall + 'api/get_cate',
        method: 'GET',
        header: {
          'Accept': 'application/vnd.lingmo.v1+json'
        }
      }).then(function (res) {
        _this4.couponTabs = res.data.message;
        if (_this4.couponTabs.length) {
          _this4.getVoucherList(_this4.couponTabs[0].id);
        }
        _this4.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      var _this5 = this;

      this.shopId = _wepy2.default.$instance.globalData.shopId;
      //获取滚动区域的高度
      var query = wx.createSelectorQuery();
      query.select('#top').boundingClientRect(function (res) {
        _this5.scrollHeight = Number(res.height) * 2;
        _this5.$apply();
      }).exec();
      //获取token
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.getCouponsCates();
      var that = this;
      wx.getStorage({
        key: 'totalPrice',
        success: function success(res) {
          that.payment = res.data;
          that.$apply();
        }
      });
      wx.getStorage({
        key: 'address',
        success: function success(res) {
          that.userInfo = res.data;
          that.$apply();
        }
      });
      if (this.shopId) {}
      // this.getVoucherList()

      // wx.getStorage({
      //   key: 'shopId',
      //   success: function(res) {
      //       that.shopId = res.data;
      //       if(that.shopId){
      //         that.getVoucherList()
      //       }
      //       that.$apply()
      //   } 
      // })
      this.$apply();
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      //页面关闭
      this.gotCouponsAlready.length = 0;
    }
  }]);

  return New;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/d/paymentSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheW1lbnRTdWNjZXNzLmpzIl0sIm5hbWVzIjpbIk5ldyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInBheW1lbnQiLCJ1c2VySW5mbyIsInJlYWRQcm9tcHQiLCJ0b2tlbiIsInNob3BJZCIsInVzZXJDb3Vwb24iLCJpc19saW1pdGUiLCJjb3Vwb25UYWJzIiwiY291cG9uVGFiIiwic2Nyb2xsSGVpZ2h0IiwiaW5kdXN0cnlJZCIsImdvdENvdXBvbnNBbHJlYWR5IiwiY29tcG9uZW50cyIsImNvdXBvbkl0ZW0iLCJtZXRob2RzIiwic2VlT3JkZXIiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsImxvY2FsU3BlY2lhbHR5IiwibWluZU9yZGVyU3RhdHVzIiwid3giLCJyZUxhdW5jaCIsInVybCIsImdvSW5kZXgiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNoYW5nZUNvdXBvblRhYiIsImluZGV4IiwiZ2V0Vm91Y2hlckxpc3QiLCJldmVudHMiLCJ1c2VyU2VsZWN0IiwiZSIsImlkeCIsInJlcXVlc3QiLCJhcGkiLCJhcGlNYWxsIiwiaWQiLCJtZXRob2QiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwiJGFwcGx5Iiwic3RhdHVzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtZXNzYWdlIiwiaWNvbiIsIm1lcmNoYW50X2lkIiwiaW5kdXN0cnlfaWQiLCJmb3JFYWNoIiwiaXRlbSIsInBlcmNlbnQiLCJOdW1iZXIiLCJyZWNlaXZlIiwibGF2ZSIsInRvRml4ZWQiLCJjaGVja2VkIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJpc3JldiIsInNldFRpbWVvdXQiLCJiZWdpbl90aW1lIiwiZW5kX3RpbWUiLCJ1dGlsIiwidGltZXN0YW1wVG9UaW1lIiwiaXRlbTEiLCJsZW5ndGgiLCJxdWVyeSIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJoZWlnaHQiLCJleGVjIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJnZXRDb3Vwb25zQ2F0ZXMiLCJ0aGF0IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCO0FBRnZCLEssUUFJVkMsSSxHQUFPO0FBQ05DLGVBQVMsQ0FESDtBQUVKQyxnQkFBUyxFQUZMO0FBR0pDLGtCQUFXLHNGQUhQO0FBSUxDLGFBQU0sRUFKRDtBQUtKQyxjQUFPLEVBTEg7QUFNSkMsa0JBQVcsRUFOUDtBQU9KQyxpQkFBVSxLQVBOO0FBUUpDLGtCQUFXLEVBUlA7QUFTSkMsaUJBQVUsQ0FUTjtBQVVKQyxvQkFBYSxDQVZUO0FBV0pDLGtCQUFXLEVBWFA7QUFZSkMseUJBQWtCO0FBWmQsSyxRQWNOQyxVLEdBQWE7QUFDWEMsa0JBQVdBO0FBREEsSyxRQUdiQyxPLEdBQVU7QUFDUjtBQUNBQyxjQUZRLHNCQUVFO0FBQ1IsWUFBR0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxjQUExQixJQUE0QyxDQUEvQyxFQUFpRDtBQUMvQ0gseUJBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkUsZUFBMUIsR0FBNEMsQ0FBNUM7QUFDRCxTQUZELE1BRUs7QUFDSEoseUJBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkUsZUFBMUIsR0FBNEMsQ0FBNUM7QUFDRDtBQUNEQyxXQUFHQyxRQUFILENBQVk7QUFDVkMsZUFBSztBQURLLFNBQVo7QUFHRCxPQVhPOztBQVlSO0FBQ0FDLGFBYlEscUJBYUM7QUFDUEgsV0FBR0ksWUFBSCxDQUFnQjtBQUNkQyxpQkFBTztBQURPLFNBQWhCO0FBR0QsT0FqQk87O0FBa0JSO0FBQ0FDLHFCQW5CUSwyQkFtQlFD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QUFkO0FBT0EsVUFBRyxLQUFLdEMsTUFBUixFQUFlLENBRWQ7QUFEQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILFdBQUtzQyxNQUFMO0FBQ0U7Ozs2QkFDTztBQUNOO0FBQ0EsV0FBSy9CLGlCQUFMLENBQXVCeUQsTUFBdkIsR0FBZ0MsQ0FBaEM7QUFDRDs7OztFQTdNOEJwRCxlQUFLa0UsSTs7a0JBQWpCdkYsRyIsImZpbGUiOiJwYXltZW50U3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9hcGknXG4gIGltcG9ydCB1dGlsIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3V0aWwnXG4gIGltcG9ydCBjb3Vwb25JdGVtICBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvdXBvbkl0ZW0nO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlK/ku5jmiJDlip8nLFxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmQyNjUnXG4gICAgfVxuICBcdGRhdGEgPSB7XG4gIFx0XHRwYXltZW50OiAwLFxuICAgICAgdXNlckluZm86e30sXG4gICAgICByZWFkUHJvbXB0Oiflronlhajmj5DphpLvvJrmiJHku6zkuI3kvJrku6Xns7vnu5/nu7TmiqTvvIzorqLljZXlvILluLjnrYnnkIbnlLHvvIzopoHmsYLmgqjov5vooYzku7vkvZXmlrnlvI/nmoTpgIDmrL7mk43kvZzvvIzmiJbku6XlkITnp43nkIbnlLHntKLlj5bmgqjnmoTpmpDnp4Hkv6Hmga/vvIjlpoLkuKrkurrkv6Hmga8s5Lya5ZGY6LSm5Y+35L+h5oGvLOmTtuihjOWNoei0puaItyzlr4bnoIHku6Xlj4rmiYvmnLrpqozor4HnoIHnrYnvvInjgIInLFxuICBcdCAgdG9rZW46JycsXG4gICAgICBzaG9wSWQ6JycsXG4gICAgICB1c2VyQ291cG9uOltdLFxuICAgICAgaXNfbGltaXRlOmZhbHNlLFxuICAgICAgY291cG9uVGFiczonJyxcbiAgICAgIGNvdXBvblRhYjowLFxuICAgICAgc2Nyb2xsSGVpZ2h0OjAsXG4gICAgICBpbmR1c3RyeUlkOicnLFxuICAgICAgZ290Q291cG9uc0FscmVhZHk6W11cbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvdXBvbkl0ZW06Y291cG9uSXRlbVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy/mn6XnnIvorqLljZVcbiAgICAgIHNlZU9yZGVyKCl7XG4gICAgICAgIGlmKHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubG9jYWxTcGVjaWFsdHkgPT0gMSl7XG4gICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5taW5lT3JkZXJTdGF0dXMgPSAyXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubWluZU9yZGVyU3RhdHVzID0gMVxuICAgICAgICB9XG4gICAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgICB1cmw6ICcuLi8uLi8uLi9vcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDnu6fnu63otK3nialcbiAgICAgIGdvSW5kZXgoKXtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMlxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIC8vIOWIh+aNonRhYlxuICAgICAgY2hhbmdlQ291cG9uVGFiKGluZGV4LGluZHVzdHJ5SWQpe1xuICAgICAgICB0aGlzLmNvdXBvblRhYiA9IGluZGV4O1xuICAgICAgICB0aGlzLmluZHVzdHJ5SWQgPSBpbmR1c3RyeUlkO1xuICAgICAgICB0aGlzLmdldFZvdWNoZXJMaXN0KGluZHVzdHJ5SWQpXG4gICAgICB9XG4gICAgfVxuICAgIGV2ZW50cyA9IHtcbiAgICAgIHVzZXJTZWxlY3QoZSxpZHgpe1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwgKyAnYXBpL3VzZXJfY291cG9ucy8nICsgZS5pZCxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgLy/ljaHliLjmnKrpooblj5bmiJDlip/vvIzpmZDliLbnlKjmiLfngrnlh7tcbiAgICAgICAgICAgIHRoaXMuaXNfbGltaXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLnN0YXR1cyAhPSAnMjAwJyl7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsKydhcGkvY291cG9ucycsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLnNob3BJZCxcbiAgICAgICAgICAgICAgICAgIC8vIG1lcmNoYW50X2lkOjMxMCxcbiAgICAgICAgICAgICAgICAgIGluZHVzdHJ5X2lkOnRoaXMuaW5kdXN0cnlJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgIC8v6K6h566X5bey57uP6aKG5Y+W55qE55m+5YiG5q+UXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ291cG9uLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICBpdGVtLnBlcmNlbnQgPSAoTnVtYmVyKGl0ZW0ucmVjZWl2ZSkvKE51bWJlcihpdGVtLmxhdmUpICsgTnVtYmVyKGl0ZW0ucmVjZWl2ZSkpKjEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgIGlmKGUuaWQgPT0gaXRlbS5pZCl7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ290Q291cG9uc0FscmVhZHkucHVzaChlLmlkKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nb3RDb3Vwb25zQWxyZWFkeSlcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbltpZHhdLmlzcmV2ID0gMTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc19saW1pdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfpooblj5bmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvL+aUr+S7mOaIkOWKn+iOt+WPluWNoeWIuOWIl+ihqFxuXHRcdGdldFZvdWNoZXJMaXN0KGluZHVzdHJ5SWQpe1xuXHRcdFx0d2VweS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiBhcGkuYXBpTWFsbCsnYXBpL2NvdXBvbnMnLFxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHRcdCdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6e1xuXHRcdFx0XHRcdG1lcmNoYW50X2lkOnRoaXMuc2hvcElkLFxuICAgICAgICAgIC8vIG1lcmNoYW50X2lkOjMxMCxcbiAgICAgICAgICBpbmR1c3RyeV9pZDppbmR1c3RyeUlkXG5cdFx0XHRcdH1cblx0XHRcdH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgcmVzLmRhdGEubWVzc2FnZS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgIGl0ZW0ucGVyY2VudCA9IChOdW1iZXIoaXRlbS5yZWNlaXZlKS8oTnVtYmVyKGl0ZW0ubGF2ZSkgKyBOdW1iZXIoaXRlbS5yZWNlaXZlKSkqMTAwKS50b0ZpeGVkKDIpO1xuICAgICAgICAgIGlmKGl0ZW0uYmVnaW5fdGltZSA9PSAwfHxpdGVtLmVuZF90aW1lID09IDApe1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGl0ZW0uYmVnaW5fdGltZSA9IHV0aWwudGltZXN0YW1wVG9UaW1lKGl0ZW0uYmVnaW5fdGltZSk7XG4gICAgICAgICAgICAgIGl0ZW0uZW5kX3RpbWUgPSB1dGlsLnRpbWVzdGFtcFRvVGltZShpdGVtLmVuZF90aW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8v6K6h566X5bey57uP6aKG5Y+W55qE55m+5YiG5q+UXG4gICAgICAgIC8vIHRoaXMudXNlckNvdXBvbi5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAvLyAgIGl0ZW0ucGVyY2VudCA9IE1hdGguY2VpbChOdW1iZXIoaXRlbS5yZWNlaXZlKS8oTnVtYmVyKGl0ZW0ubGF2ZSkgKyBOdW1iZXIoaXRlbS5yZWNlaXZlKSkpO1xuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLnVzZXJDb3Vwb24gPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgICAgICB0aGlzLnVzZXJDb3Vwb24uZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICB0aGlzLmdvdENvdXBvbnNBbHJlYWR5LmZvckVhY2goKGl0ZW0xLGluZGV4KT0+e1xuICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSBpdGVtMSl7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy51c2VyQ291cG9uKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG5cdFx0XHR9KTtcbiAgICB9XG4gICAgLy/pooblj5bljaHliLjliLfmlrDpobXpnaJcbiAgICBcbiAgICAvL+iOt+WPluWNoeWIuOeahOWIhuexu1xuICAgIGdldENvdXBvbnNDYXRlcygpe1xuICAgICAgd2VweS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiBhcGkuYXBpTWFsbCsnYXBpL2dldF9jYXRlJyxcblx0XHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdFx0aGVhZGVyOntcblx0XHRcdFx0XHQnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJ1xuICAgICAgICB9XG5cdFx0XHR9KS50aGVuKChyZXMpPT57XG4gICAgICAgIHRoaXMuY291cG9uVGFicyA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgIGlmKHRoaXMuY291cG9uVGFicy5sZW5ndGgpe1xuICAgICAgICAgIHRoaXMuZ2V0Vm91Y2hlckxpc3QodGhpcy5jb3Vwb25UYWJzWzBdLmlkKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcblx0XHRcdH0pO1xuICAgIH1cbiAgICBvbkxvYWQoKXtcbiAgICAgIHRoaXMuc2hvcElkID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zaG9wSWQ7XG4gICAgICAvL+iOt+WPlua7muWKqOWMuuWfn+eahOmrmOW6plxuICAgICAgdmFyIHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpO1xuICAgICAgcXVlcnkuc2VsZWN0KCcjdG9wJykuYm91bmRpbmdDbGllbnRSZWN0KHJlcz0+e1xuICAgICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IE51bWJlcihyZXMuaGVpZ2h0KSAqIDI7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9KS5leGVjKClcbiAgICAgIC8v6I635Y+WdG9rZW5cblx0XHRcdGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgIHRoaXMuZ2V0Q291cG9uc0NhdGVzKClcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6ICd0b3RhbFByaWNlJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB0aGF0LnBheW1lbnQgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgfSBcbiAgICAgIH0pXG4gICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5OiAnYWRkcmVzcycsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgdGhhdC51c2VySW5mbyA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICB9IFxuICAgICAgfSlcbiAgICAgIGlmKHRoaXMuc2hvcElkKXtcbiAgICAgICAgLy8gdGhpcy5nZXRWb3VjaGVyTGlzdCgpXG4gICAgICB9XG4gICAgICAvLyB3eC5nZXRTdG9yYWdlKHtcbiAgICAgIC8vICAga2V5OiAnc2hvcElkJyxcbiAgICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAvLyAgICAgICB0aGF0LnNob3BJZCA9IHJlcy5kYXRhO1xuICAgICAgLy8gICAgICAgaWYodGhhdC5zaG9wSWQpe1xuICAgICAgLy8gICAgICAgICB0aGF0LmdldFZvdWNoZXJMaXN0KClcbiAgICAgIC8vICAgICAgIH1cbiAgICAgIC8vICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgIC8vICAgfSBcbiAgICAgIC8vIH0pXG5cdFx0XHR0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBvbkhpZGUoKXtcbiAgICAgIC8v6aG16Z2i5YWz6ZetXG4gICAgICB0aGlzLmdvdENvdXBvbnNBbHJlYWR5Lmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG4iXX0=