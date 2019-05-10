'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

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
      navigationBarTitleText: '订单详情'
    }, _this.data = {
      //订单信息
      userAddress: {},
      //订单商品信息
      selectGoods: [],
      //订单编号
      orderId: '',
      //物流当前状态
      trackList: {},
      noTrackStatus: '物流信息尚未更新...',
      //有无物流
      trackStatus: true,
      //无物流显示提醒发货
      collectOrRemind: true,
      //提醒发货禁用
      remind: false,
      //提醒按钮显示
      remindSeller: '提醒发货',
      //商户电话
      merchantTel: '',
      token: ''
    }, _this.components = {}, _this.methods = {
      remind: function remind() {
        var _this2 = this;

        wx.showToast({
          title: '已提醒卖家发货',
          icon: 'success',
          duration: 2000,
          success: function success() {
            _this2.remind = true;
            _this2.remindSeller = '已提醒卖家发货';

            _this2.$apply();
          }
        });
      },
      copyTBL: function copyTBL() {
        var self = this;
        wx.setClipboardData({
          data: self.userAddress.serial,
          success: function success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none',
              image: '../../../images/复制.png',
              duration: 1000
            });
          }
        });
      },
      goLogistics: function goLogistics() {
        wx.navigateTo({
          url: 'logisticsMessage?orderId=' + this.orderId
        });
      },
      confirmCollect: function confirmCollect() {
        var _this3 = this;

        wx.showModal({
          title: '是否确认收货',
          success: function success(res) {
            if (res.confirm) {
              _this3.confirm_Collect();
            } else if (res.cancel) {
              return;
            }
          }
        });
      },
      merchantTel: function merchantTel() {
        wx.makePhoneCall({
          phoneNumber: this.userAddress.merchants_mobile
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(New, [{
    key: 'onLoad',
    value: function onLoad(options) {
      //获取token
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      if (options.orderId && this.token) {
        this.orderId = options.orderId;
        this.$apply();
        this.getOrderShow();
        // this.getLogistics()
      } else {}
      this.$apply();
    }
    //订单详情

  }, {
    key: 'getOrderShow',
    value: function getOrderShow() {
      var that = this;
      var url = _api2.default.apiMall + 'api/shop_order_details/' + that.orderId;
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
        if (res.data.message.logistics) {
          that.trackList = res.data.message.logistics[0];
          that.$apply();
        } else {
          that.trackStatus = false;
          that.collectOrRemind = false;
        }
        that.$apply();
      });
    }
    //确认收货

  }, {
    key: 'confirm_Collect',
    value: function confirm_Collect() {
      var that = this;
      var url = _api2.default.apiMall + 'api/complete_shop_order/' + that.orderId;
      _wepy2.default.request({
        url: url,
        method: 'GET',
        header: {
          'Accept': 'application/vnd.lingmo.v1+json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Authorization': 'Bearer ' + this.token
        }
      }).then(function (res) {
        // wx.redirectTo({
        //   url: 'order'
        // })
      });
    }
  }]);

  return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/orderDetails'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyRGV0YWlscy5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXJBZGRyZXNzIiwic2VsZWN0R29vZHMiLCJvcmRlcklkIiwidHJhY2tMaXN0Iiwibm9UcmFja1N0YXR1cyIsInRyYWNrU3RhdHVzIiwiY29sbGVjdE9yUmVtaW5kIiwicmVtaW5kIiwicmVtaW5kU2VsbGVyIiwibWVyY2hhbnRUZWwiLCJ0b2tlbiIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCIkYXBwbHkiLCJjb3B5VEJMIiwic2VsZiIsInNldENsaXBib2FyZERhdGEiLCJzZXJpYWwiLCJyZXMiLCJpbWFnZSIsImdvTG9naXN0aWNzIiwibmF2aWdhdGVUbyIsInVybCIsImNvbmZpcm1Db2xsZWN0Iiwic2hvd01vZGFsIiwiY29uZmlybSIsImNvbmZpcm1fQ29sbGVjdCIsImNhbmNlbCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIm1lcmNoYW50c19tb2JpbGUiLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJnZXRPcmRlclNob3ciLCJ0aGF0IiwiYXBpIiwiYXBpTWFsbCIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsIm1lc3NhZ2UiLCJnb29kcyIsImxvZ2lzdGljcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ3BCQyxNLEdBQVM7QUFDUkMsOEJBQXdCO0FBRGhCLEssUUFHVEMsSSxHQUFPO0FBQ0o7QUFDQUMsbUJBQVksRUFGUjtBQUdKO0FBQ0FDLG1CQUFZLEVBSlI7QUFLSjtBQUNBQyxlQUFRLEVBTko7QUFPSjtBQUNBQyxpQkFBVSxFQVJOO0FB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aUJxQixJQUFJekIsSUFBSixDQUFTa0QsT0FBVCxDQUFpQkUsU0FBakIsQ0FBMkIsQ0FBM0IsQ0FBakI7QUFDQVYsZUFBS3RCLE1BQUw7QUFDRCxTQUhELE1BR0s7QUFDSHNCLGVBQUtwQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0FvQyxlQUFLbkMsZUFBTCxHQUF1QixLQUF2QjtBQUNEO0FBQ0RtQyxhQUFLdEIsTUFBTDtBQUNELE9BbkJEO0FBb0JEO0FBQ0Q7Ozs7c0NBQ2lCO0FBQ2YsVUFBTXNCLE9BQU8sSUFBYjtBQUNBLFVBQU1iLE1BQU1jLGNBQUlDLE9BQUosR0FBYywwQkFBZCxHQUEyQ0YsS0FBS3ZDLE9BQTVEO0FBQ0EwQyxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hqQixhQUFLQSxHQURNO0FBRVhrQixnQkFBUSxLQUZHO0FBR1hDLGdCQUFPO0FBQ0wsb0JBQVMsZ0NBREo7QUFFViwwQkFBZSxpREFGTDtBQUdWLDJCQUFnQixZQUFZLEtBQUtyQztBQUh2QjtBQUhJLE9BQWIsRUFRR3NDLElBUkgsQ0FRUSxVQUFDeEIsR0FBRCxFQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0QsT0FaRDtBQWFEOzs7O0VBdEk4Qm9CLGVBQUtRLEk7O2tCQUFqQnhELEciLCJmaWxlIjoib3JkZXJEZXRhaWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vYXBpL2FwaSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBcdGNvbmZpZyA9IHtcbiAgXHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICforqLljZXor6bmg4UnLFxuICBcdH1cbiAgXHRkYXRhID0ge1xuICAgICAgLy/orqLljZXkv6Hmga9cbiAgICAgIHVzZXJBZGRyZXNzOnt9LFxuICAgICAgLy/orqLljZXllYblk4Hkv6Hmga9cbiAgICAgIHNlbGVjdEdvb2RzOltdLFxuICAgICAgLy/orqLljZXnvJblj7dcbiAgICAgIG9yZGVySWQ6JycsXG4gICAgICAvL+eJqea1geW9k+WJjeeKtuaAgVxuICAgICAgdHJhY2tMaXN0Ont9LFxuICAgICAgbm9UcmFja1N0YXR1czon54mp5rWB5L+h5oGv5bCa5pyq5pu05pawLi4uJyxcbiAgICAgIC8v5pyJ5peg54mp5rWBXG4gICAgICB0cmFja1N0YXR1czp0cnVlLFxuICAgICAgLy/ml6DnianmtYHmmL7npLrmj5DphpLlj5HotKdcbiAgICAgIGNvbGxlY3RPclJlbWluZDp0cnVlLFxuICAgICAgLy/mj5DphpLlj5HotKfnpoHnlKhcbiAgICAgIHJlbWluZDpmYWxzZSxcbiAgICAgIC8v5o+Q6YaS5oyJ6ZKu5pi+56S6XG4gICAgICByZW1pbmRTZWxsZXI6J+aPkOmGkuWPkei0pycsXG4gICAgICAvL+WVhuaIt+eUteivnVxuICAgICAgbWVyY2hhbnRUZWw6JycsXG4gICAgICB0b2tlbjonJ1xuICBcdH1cbiAgICBjb21wb25lbnRzID0ge31cbiAgICBtZXRob2RzID0ge1xuICAgICAgcmVtaW5kKCl7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICflt7Lmj5DphpLljZblrrblj5HotKcnLFxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMCxcbiAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICB0aGlzLnJlbWluZCA9IHRydWVcbiAgICAgICAgICAgIHRoaXMucmVtaW5kU2VsbGVyID0gJ+W3suaPkOmGkuWNluWutuWPkei0pydcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5VEJMKCl7XG4gICAgICAgIHZhciBzZWxmPXRoaXM7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoeyBcbiAgICAgICAgICBkYXRhOiBzZWxmLnVzZXJBZGRyZXNzLnNlcmlhbCxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5aSN5Yi25oiQ5YqfJyxcbiAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBpbWFnZTogJy4uLy4uLy4uL2ltYWdlcy/lpI3liLYucG5nJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGdvTG9naXN0aWNzKCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJ2xvZ2lzdGljc01lc3NhZ2U/b3JkZXJJZD0nK3RoaXMub3JkZXJJZFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvbmZpcm1Db2xsZWN0KCl7XG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmmK/lkKbnoa7orqTmlLbotKcnLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlybV9Db2xsZWN0KClcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgbWVyY2hhbnRUZWwoKXtcbiAgICAgICAgd3gubWFrZVBob25lQ2FsbCh7XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyOiB0aGlzLnVzZXJBZGRyZXNzLm1lcmNoYW50c19tb2JpbGVcbiAgICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpe1xuICAgICAgLy/ojrflj5Z0b2tlblxuICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgaWYob3B0aW9ucy5vcmRlcklkICYmIHRoaXMudG9rZW4pe1xuICAgICAgICAgIHRoaXMub3JkZXJJZCA9IG9wdGlvbnMub3JkZXJJZFxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB0aGlzLmdldE9yZGVyU2hvdygpXG4gICAgICAgICAgLy8gdGhpcy5nZXRMb2dpc3RpY3MoKVxuICAgICAgfWVsc2V7XG5cbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgLy/orqLljZXor6bmg4VcbiAgICBnZXRPcmRlclNob3coKXtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3Bfb3JkZXJfZGV0YWlscy8nICsgdGhhdC5vcmRlcklkO1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICB9LFxuICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICB0aGF0LnVzZXJBZGRyZXNzID0gcmVzLmRhdGEubWVzc2FnZTtcbiAgICAgICAgdGhhdC5zZWxlY3RHb29kcyA9IHJlcy5kYXRhLm1lc3NhZ2UuZ29vZHM7XG4gICAgICAgIGlmIChyZXMuZGF0YS5tZXNzYWdlLmxvZ2lzdGljcykge1xuICAgICAgICAgIHRoYXQudHJhY2tMaXN0ID0gcmVzLmRhdGEubWVzc2FnZS5sb2dpc3RpY3NbMF1cbiAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoYXQudHJhY2tTdGF0dXMgPSBmYWxzZVxuICAgICAgICAgIHRoYXQuY29sbGVjdE9yUmVtaW5kID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvL+ehruiupOaUtui0p1xuICAgIGNvbmZpcm1fQ29sbGVjdCgpe1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvY29tcGxldGVfc2hvcF9vcmRlci8nICsgdGhhdC5vcmRlcklkO1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyxcblx0XHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0XHR9LFxuICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAvLyB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgLy8gICB1cmw6ICdvcmRlcidcbiAgICAgICAgLy8gfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=