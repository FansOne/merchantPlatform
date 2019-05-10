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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
			navigationBarTitleText: '确认订单'
		}, _this.data = {
			ballBottom: 120,
			ballRight: 30,
			screenHeight: 0,
			screenWidth: 0,
			orderPrice: '',
			selectGoods: [],
			userCode: '',
			userInfo: {},
			//订单信息
			orderResult: '',
			//微信支付所需参数
			jssdk: {},
			//用户地址
			userAddress: {},
			cartItems: [],
			//开票
			TicketOpening: true,
			ticketMessage: {},
			//商户电话
			merchantTel: '',
			//是否有发票
			isvoice: '',
			//发票展示
			piao: false,
			userid: '',
			//有无地址
			haveAddress: true,
			userId: '',
			normalsend: 0,
			sendprice: 0,
			token: '',
			orderInfo: null,
			amount: 0,
			shopId: '',
			payType: 999,
			selectSonCard: null,
			selectCoupon: {},
			orderId: 0
		}, _this.components = {}, _this.methods = {
			ballMoveEvent: function ballMoveEvent(e) {
				var touchs = e.touches[0];
				var pageX = touchs.pageX;
				var pageY = touchs.pageY;
				//防止坐标越界,view宽高的一半
				if (pageX < 21) return;
				if (pageX > this.screenWidth - 21) return;
				if (this.screenHeight - pageY <= 21) return;
				if (pageY <= 21) return;
				//用right和bottom.所以需要将pageX pageY转换
				var x = this.screenWidth - pageX - 21;
				var y = this.screenHeight - pageY - 21;
				this.ballBottom = y, this.ballRight = x;
				this.$apply();
			},
			goAddress: function goAddress() {
				var that = this;
				wx.chooseAddress({
					success: function success(res) {
						that.userAddress = res;
						that.$apply();
						wx.setStorage({
							key: 'address',
							data: res
						});
						wx.redirectTo({
							url: 'waitToPay'
						});
					}, fail: function fail(res) {
						wx.openSetting({});
					}
				});
			},
			confirmPayment: function confirmPayment() {
				var _this2 = this;

				wx.showModal({
					title: '支付提示',
					content: '您确认进行支付吗？',
					showCancel: true,
					cancelText: '取消',
					cancelColor: '#000000',
					confirmText: '确定',
					confirmColor: '#3CC51F',
					success: function success(res) {
						if (res.confirm) {
							_this2.shopPay();
						}
					}
				});
			},
			switchChange: function switchChange(e) {
				if (e.detail.value) {
					this.TicketOpening = false;
					this.$apply();
				} else {
					this.TicketOpening = true;
					this.ticketMessage = {};
					this.piao = false;
					this.$apply();
				}
			},
			selectTicketOpening: function selectTicketOpening() {
				var that = this;
				wx.chooseInvoiceTitle({
					success: function success(res) {
						that.piao = true;
						that.ticketMessage = res;
						that.$apply();
					}
				});
			},
			merchantTel: function merchantTel() {
				var that = this;
				wx.getStorage({
					key: 'shopTel',
					success: function success(res) {
						that.merchantTel = res.data;
						that.$apply();
					}
				});
				wx.makePhoneCall({
					phoneNumber: that.merchantTel
				});
			},

			//会员卡充值
			cardRecharge: function cardRecharge() {
				wx.navigateTo({
					url: '../../../packageMembershipCard/membershipCard/cardRecharge?shopId=' + this.shopId
				});
			},
			selectPayMent: function selectPayMent(e) {
				var idx = Number(e.currentTarget.dataset.id);
				if (!idx) {
					this.selectSonCard = {};
					wx.removeStorage({ key: 'selectSonCard' });
				} else if (idx == 1) {
					wx.navigateTo({
						url: '../../../packageMembershipCard/membershipCard/selectCardLists?shopId=' + this.shopId
					});
				} else {
					wx.navigateTo({
						url: '../../selectCoupon?shopId=' + this.shopId + '&normalsend=' + this.normalsend + '&money=' + this.orderPrice
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
			this.$apply();
			try {
				this.shopId = JSON.parse(options.waitToPay).merchant_id;
				this.orderId = JSON.parse(options.waitToPay).id;
			} catch (err) {}
			if (this.shopId) {
				this.getCardMoney();
				this.getOrderDetail();
			}
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			var that = this;
			//选择子卡
			wx.getStorage({
				key: 'selectSonCard',
				success: function success(res) {
					that.selectSonCard = res.data;
					that.$apply();
				}
			});
		}
		//发起微信支付

	}, {
		key: 'shopPay',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var that, url, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								that = this;
								url = _api2.default.apiMall + 'api/shop_order/' + that.orderInfo.id;
								data = {};

								if (Object.keys(this.selectSonCard).length && Object.keys(this.selectCoupon).length) {
									//两个都有
									data = {
										payment_method: this.payType,
										card_uuid: this.selectSonCard.uuid,
										coupon_id: this.orderInfo.coupon_id
									};
								} else if (Object.keys(this.selectCoupon).length) {
									data = {
										payment_method: 2,
										coupon_id: this.orderInfo.coupon_id
									};
								} else if (Object.keys(this.selectSonCard).length) {
									//选择了会员卡
									data = {
										payment_method: 2,
										card_uuid: this.selectSonCard.uuid
									};
								} else {
									data = {
										payment_method: this.payType
									};
								}
								_context.next = 6;
								return _wepy2.default.request({
									url: url,
									method: 'GET',
									header: {
										'Accept': 'application/vnd.lingmo.v1+json',
										'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
										'Authorization': 'Bearer ' + this.token
									},
									data: data
								}).then(function (res) {
									if (res.data.message.length == 0) {
										//会员卡支付
										wx.redirectTo({
											url: './paymentSuccess'
										});
									} else {
										that.jssdk = res.data.message;
										that.$apply();
										//发起微信支付
										wx.requestPayment({
											'appId': that.jssdk.appId,
											'timeStamp': that.jssdk.timeStamp,
											'nonceStr': that.jssdk.nonceStr,
											'package': that.jssdk.package,
											'signType': that.jssdk.signType,
											'paySign': that.jssdk.paySign,
											success: function success(res) {
												wx.redirectTo({
													url: './paymentSuccess'
												});
											}
										});
									}
								});

							case 6:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function shopPay() {
				return _ref2.apply(this, arguments);
			}

			return shopPay;
		}()
		//获取订单详情

	}, {
		key: 'getOrderDetail',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this3 = this;

				var url;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								url = _api2.default.apiMall + 'api/shop_order_details/' + this.orderId;
								_context2.next = 3;
								return _wepy2.default.request({
									url: url,
									method: 'GET',
									header: {
										'Accept': 'application/vnd.lingmo.v1+json',
										'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
										'Authorization': 'Bearer ' + this.token
									}
								}).then(function (res) {
									_this3.orderInfo = res.data.message;
									_this3.selectGoods = res.data.message.goods;
									_this3.$apply();
								});

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getOrderDetail() {
				return _ref3.apply(this, arguments);
			}

			return getOrderDetail;
		}()
		//获取会员卡金额

	}, {
		key: 'getCardMoney',
		value: function getCardMoney() {
			var _this4 = this;

			_wepy2.default.request({
				url: _api2.default.apiMall + 'api/user_card/' + this.shopId,
				method: 'GET',
				header: {
					'Accept': 'application/vnd.lingmo.v1+json',
					'Authorization': 'Bearer ' + this.token
				}
			}).then(function (res) {
				res.data.message.money = Number(res.data.message.money / 100).toFixed(2);
				_this4.amount = res.data.message.money;
				// if(){

				// }
				if (Number(_this4.amount) > 0) {
					_this4.payType = 2;
				} else {
					_this4.payType = 1;
				}
				_this4.$apply();
			});
		}
	}]);

	return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/waitToPay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhaXRUb1BheS5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImJhbGxCb3R0b20iLCJiYWxsUmlnaHQiLCJzY3JlZW5IZWlnaHQiLCJzY3JlZW5XaWR0aCIsIm9yZGVyUHJpY2UiLCJzZWxlY3RHb29kcyIsInVzZXJDb2RlIiwidXNlckluZm8iLCJvcmRlclJlc3VsdCIsImpzc2RrIiwidXNlckFkZHJlc3MiLCJjYXJ0SXRlbXMiLCJUaWNrZXRPcGVuaW5nIiwidGlja2V0TWVzc2FnZSIsIm1lcmNoYW50VGVsIiwiaXN2b2ljZSIsInBpYW8iLCJ1c2VyaWQiLCJoYXZlQWRkcmVzcyIsInVzZXJJZCIsIm5vcm1hbHNlbmQiLCJzZW5kcHJpY2UiLCJ0b2tlbiIsIm9yZGVySW5mbyIsImFtb3VudCIsInNob3BJZCIsInBheVR5cGUiLCJzZWxlY3RTb25DYXJkIiwic2VsZWN0Q291cG9uIiwib3JkZXJJZCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYmFsbE1vdmVFdmVudCIsImUiLCJ0b3VjaHMiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsIngiLCJ5IiwiJGFwcGx5IiwiZ29BZGRyZXNzIiwidGhhdCIsInd4IiwiY2hvb3NlQWRkcmVzcyIsInN1Y2Nlc3MiLCJyZXMiLCJzZXRTdG9yYWdlIiwia2V5IiwicmVkaXJlY3RUbyIsInVybCIsImZhaWwiLCJvcGVuU2V0dGluZyIsImNvbmZpcm1QYXltZW50Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwiY29uZmlybSIsInNob3BQYXkiLCJzd2l0Y2hDaGFuZ2UiLCJkZXRhaWwiLCJ2YWx1ZSIsInNlbGVjdFRpY2tldE9wZW5pbmciLCJjaG9vc2VJbnZvaWNlVGl0bGUiLCJnZXRTdG9yYWdlIiwibWFrZVBob25lQ2FsbCIsInBob25lTnVtYmVyIiwiY2FyZFJlY2hhcmdlIiwibmF2aWdhdGVUbyIsInNlbGVjdFBheU1lbnQiLCJpZHgiLCJOdW1iZXIiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwicmVtb3ZlU3RvcmFnZSIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsIkpTT04iLCJwYXJzZSIsIndhaXRUb1BheSIsIm1lcmNoYW50X2lkIiwiZXJyIiwiZ2V0Q2FyZE1vbmV5IiwiZ2V0T3JkZXJEZXRhaWwiLCJhcGkiLCJhcGlNYWxsIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsInBheW1lbnRfbWV0aG9kIiwiY2FyZF91dWlkIiwidXVpZCIsImNvdXBvbl9pZCIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsIm1lc3NhZ2UiLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwiZ29vZHMiLCJtb25leSIsInRvRml4ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQzs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7OEtBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCO0FBRGhCLEcsUUFHVEMsSSxHQUFPO0FBQ05DLGVBQVksR0FETjtBQUVOQyxjQUFXLEVBRkw7QUFHTkMsaUJBQWMsQ0FIUjtBQUlOQyxnQkFBYSxDQUpQO0FBS05DLGVBQVcsRUFMTDtBQU1OQyxnQkFBWSxFQU5OO0FBT05DLGFBQVMsRUFQSDtBQVFOQyxhQUFTLEVBUkg7QUFTTjtBQUNBQyxnQkFBWSxFQVZOO0FBV047QUFDQUMsVUFBTSxFQVpBO0FBYU47QUFDQUMsZ0JBQVksRUFkTjtBQWVOQyxjQUFVLEVBZko7QUFnQk47QUFDQUMsa0JBQWMsSUFqQlI7QUFrQk5DLGtCQUFjLEVBbEJSO0FBbUJOO0FBQ0FDLGdCQUFZLEVBcEJOO0FB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QUFKLENBQVMwRyxPQUFULENBQWlCUyxLQUFqQixHQUF1QixHQUE5QixFQUFtQ0MsT0FBbkMsQ0FBMkMsQ0FBM0MsQ0FBekI7QUFDQSxXQUFLM0YsTUFBTCxHQUFjc0IsSUFBSS9DLElBQUosQ0FBUzBHLE9BQVQsQ0FBaUJTLEtBQS9CO0FBQ0E7O0FBRUE7QUFDQSxRQUFHdEMsT0FBTyxPQUFLcEQsTUFBWixJQUFvQixDQUF2QixFQUF5QjtBQUN4QixZQUFLRSxPQUFMLEdBQWUsQ0FBZjtBQUNBLEtBRkQsTUFFSztBQUNKLFlBQUtBLE9BQUwsR0FBZSxDQUFmO0FBQ0E7QUFDRCxXQUFLYyxNQUFMO0FBQ0EsSUFuQkQ7QUFvQkE7Ozs7RUF6UitCNEQsZUFBS2dCLEk7O2tCQUFqQnhILEciLCJmaWxlIjoid2FpdFRvUGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cdGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cdGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vYXBpL2FwaSdcblxuXHRleHBvcnQgZGVmYXVsdCBjbGFzcyBOZXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXHRcdGNvbmZpZyA9IHtcblx0XHRcdG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnoa7orqTorqLljZUnLFxuXHRcdH1cblx0XHRkYXRhID0ge1xuXHRcdFx0YmFsbEJvdHRvbTogMTIwLFxuXHRcdFx0YmFsbFJpZ2h0OiAzMCxcblx0XHRcdHNjcmVlbkhlaWdodDogMCxcblx0XHRcdHNjcmVlbldpZHRoOiAwLFxuXHRcdFx0b3JkZXJQcmljZTonJyxcblx0XHRcdHNlbGVjdEdvb2RzOltdLFxuXHRcdFx0dXNlckNvZGU6JycsXG5cdFx0XHR1c2VySW5mbzp7fSxcblx0XHRcdC8v6K6i5Y2V5L+h5oGvXG5cdFx0XHRvcmRlclJlc3VsdDonJyxcblx0XHRcdC8v5b6u5L+h5pSv5LuY5omA6ZyA5Y+C5pWwXG5cdFx0XHRqc3Nkazp7fSxcblx0XHRcdC8v55So5oi35Zyw5Z2AXG5cdFx0XHR1c2VyQWRkcmVzczp7fSxcblx0XHRcdGNhcnRJdGVtczpbXSxcblx0XHRcdC8v5byA56WoXG5cdFx0XHRUaWNrZXRPcGVuaW5nOnRydWUsXG5cdFx0XHR0aWNrZXRNZXNzYWdlOnt9LFxuXHRcdFx0Ly/llYbmiLfnlLXor51cblx0XHRcdG1lcmNoYW50VGVsOicnLFxuXHRcdFx0Ly/mmK/lkKbmnInlj5Hnpahcblx0XHRcdGlzdm9pY2U6JycsXG5cdFx0XHQvL+WPkeelqOWxleekulxuXHRcdFx0cGlhbzpmYWxzZSxcblx0XHRcdHVzZXJpZDonJyxcblx0XHRcdC8v5pyJ5peg5Zyw5Z2AXG5cdFx0XHRoYXZlQWRkcmVzczp0cnVlLFxuXHRcdFx0dXNlcklkOicnLFxuXHRcdFx0bm9ybWFsc2VuZDowLFxuXHRcdFx0c2VuZHByaWNlOjAsXG5cdFx0XHR0b2tlbjonJyxcblx0XHRcdG9yZGVySW5mbzpudWxsLFxuXHRcdFx0YW1vdW50OjAsXG5cdFx0XHRzaG9wSWQ6JycsXG5cdFx0XHRwYXlUeXBlOjk5OSxcblx0XHRcdHNlbGVjdFNvbkNhcmQ6bnVsbCxcblx0XHRcdHNlbGVjdENvdXBvbjp7fSxcblx0XHRcdG9yZGVySWQ6MFxuXHRcdH1cblx0XHRvbkxvYWQob3B0aW9ucyl7XG5cdFx0XHQvL+iOt+WPlnRva2VuXG5cdFx0XHRsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcblx0XHRcdHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG5cdFx0XHR0aGlzLiRhcHBseSgpO1xuXHRcdFx0dHJ5e1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvcElkID0gSlNPTi5wYXJzZShvcHRpb25zLndhaXRUb1BheSkubWVyY2hhbnRfaWQ7XG5cdFx0XHRcdHRoaXMub3JkZXJJZCA9IEpTT04ucGFyc2Uob3B0aW9ucy53YWl0VG9QYXkpLmlkO1xuXHRcdFx0fWNhdGNoKGVycil7fVxuXHRcdFx0aWYodGhpcy5zaG9wSWQpe1xuXHRcdFx0XHR0aGlzLmdldENhcmRNb25leSgpO1xuXHRcdFx0XHR0aGlzLmdldE9yZGVyRGV0YWlsKClcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29tcG9uZW50cyA9IHt9XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdGJhbGxNb3ZlRXZlbnQoZSl7XG5cdFx0XHRcdHZhciB0b3VjaHMgPSBlLnRvdWNoZXNbMF07XG5cdFx0XHRcdHZhciBwYWdlWCA9IHRvdWNocy5wYWdlWDtcblx0XHRcdFx0dmFyIHBhZ2VZID0gdG91Y2hzLnBhZ2VZO1xuXHRcdFx0XHQvL+mYsuatouWdkOagh+i2iueVjCx2aWV35a696auY55qE5LiA5Y2KXG5cdFx0XHRcdGlmIChwYWdlWCA8IDIxKSByZXR1cm47XG5cdFx0XHRcdGlmIChwYWdlWCA+IHRoaXMuc2NyZWVuV2lkdGggLSAyMSkgcmV0dXJuO1xuXHRcdFx0XHRpZiAodGhpcy5zY3JlZW5IZWlnaHQgLSBwYWdlWSA8PSAyMSkgcmV0dXJuO1xuXHRcdFx0XHRpZiAocGFnZVkgPD0gMjEpIHJldHVybjtcblx0XHRcdFx0Ly/nlKhyaWdodOWSjGJvdHRvbS7miYDku6XpnIDopoHlsIZwYWdlWCBwYWdlWei9rOaNolxuXHRcdFx0XHR2YXIgeCA9IHRoaXMuc2NyZWVuV2lkdGggLSBwYWdlWCAtIDIxO1xuXHRcdFx0XHR2YXIgeSA9IHRoaXMuc2NyZWVuSGVpZ2h0IC0gcGFnZVkgLSAyMTtcblx0XHRcdFx0dGhpcy5iYWxsQm90dG9tID0geSxcblx0XHRcdFx0dGhpcy5iYWxsUmlnaHQgPSB4XG5cdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdH0sXG5cdFx0XHRnb0FkZHJlc3MoKXtcblx0XHRcdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdFx0XHR3eC5jaG9vc2VBZGRyZXNzKHtcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0XHRcdHRoYXQudXNlckFkZHJlc3MgPSByZXNcblx0XHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHRcdFx0d3guc2V0U3RvcmFnZSh7XG5cdFx0XHRcdFx0XHRrZXk6J2FkZHJlc3MnLFxuXHRcdFx0XHRcdFx0ZGF0YTogcmVzXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR3eC5yZWRpcmVjdFRvKHtcblx0XHRcdFx0XHQgICAgdXJsOiAnd2FpdFRvUGF5J1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sZmFpbDpmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRcdFx0d3gub3BlblNldHRpbmcoe30pXG5cdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRjb25maXJtUGF5bWVudCgpe1xuXHRcdFx0XHR3eC5zaG93TW9kYWwoe1xuXHRcdFx0XHRcdHRpdGxlOiAn5pSv5LuY5o+Q56S6Jyxcblx0XHRcdFx0XHRjb250ZW50OiAn5oKo56Gu6K6k6L+b6KGM5pSv5LuY5ZCX77yfJyxcblx0XHRcdFx0XHRzaG93Q2FuY2VsOiB0cnVlLFxuXHRcdFx0XHRcdGNhbmNlbFRleHQ6ICflj5bmtognLFxuXHRcdFx0XHRcdGNhbmNlbENvbG9yOiAnIzAwMDAwMCcsXG5cdFx0XHRcdFx0Y29uZmlybVRleHQ6ICfnoa7lrponLFxuXHRcdFx0XHRcdGNvbmZpcm1Db2xvcjogJyMzQ0M1MUYnLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdFx0XHRpZihyZXMuY29uZmlybSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2hvcFBheSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0c3dpdGNoQ2hhbmdlKGUpe1xuXHRcdFx0XHRpZihlLmRldGFpbC52YWx1ZSl7XG5cdFx0XHRcdFx0dGhpcy5UaWNrZXRPcGVuaW5nID0gZmFsc2Vcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMuVGlja2V0T3BlbmluZyA9IHRydWVcblx0XHRcdFx0XHR0aGlzLnRpY2tldE1lc3NhZ2UgPXt9XG5cdFx0XHRcdFx0dGhpcy5waWFvID0gZmFsc2Vcblx0XHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZWxlY3RUaWNrZXRPcGVuaW5nKCl7XG5cdFx0XHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRcdFx0d3guY2hvb3NlSW52b2ljZVRpdGxlKHtcblx0XHRcdFx0XHRzdWNjZXNzKHJlcykge1xuXHRcdFx0XHRcdFx0dGhhdC5waWFvID0gdHJ1ZVxuXHRcdFx0XHRcdFx0dGhhdC50aWNrZXRNZXNzYWdlID0gcmVzXG5cdFx0XHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdG1lcmNoYW50VGVsKCl7XG5cdFx0XHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRcdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRcdFx0a2V5OidzaG9wVGVsJyxcblx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHR0aGF0Lm1lcmNoYW50VGVsID0gcmVzLmRhdGFcblx0XHRcdFx0XHRcdHRoYXQuJGFwcGx5KClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdHd4Lm1ha2VQaG9uZUNhbGwoe1xuXHRcdFx0XHRcdHBob25lTnVtYmVyOiB0aGF0Lm1lcmNoYW50VGVsIFxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdC8v5Lya5ZGY5Y2h5YWF5YC8XG5cdFx0XHRjYXJkUmVjaGFyZ2UoKXtcblx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0dXJsOiAnLi4vLi4vLi4vcGFja2FnZU1lbWJlcnNoaXBDYXJkL21lbWJlcnNoaXBDYXJkL2NhcmRSZWNoYXJnZT9zaG9wSWQ9JyArIHRoaXMuc2hvcElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdHNlbGVjdFBheU1lbnQoZSl7XG5cdFx0XHRcdGxldCBpZHggPSBOdW1iZXIoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQpO1xuXHRcdFx0XHRpZighaWR4KXtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdFNvbkNhcmQgPSB7fVxuXHRcdFx0XHRcdHd4LnJlbW92ZVN0b3JhZ2Uoe2tleTonc2VsZWN0U29uQ2FyZCd9KVxuXHRcdFx0XHR9ZWxzZSBpZihpZHggPT0gMSl7XG5cdFx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0XHR1cmw6ICcuLi8uLi8uLi9wYWNrYWdlTWVtYmVyc2hpcENhcmQvbWVtYmVyc2hpcENhcmQvc2VsZWN0Q2FyZExpc3RzP3Nob3BJZD0nICsgdGhpcy5zaG9wSWRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdFx0XHR1cmw6ICcuLi8uLi9zZWxlY3RDb3Vwb24/c2hvcElkPScgKyB0aGlzLnNob3BJZCArICcmbm9ybWFsc2VuZD0nK3RoaXMubm9ybWFsc2VuZCArICcmbW9uZXk9JysgdGhpcy5vcmRlclByaWNlXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fVxuXHRcdG9uU2hvdygpe1xuXHRcdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdFx0Ly/pgInmi6nlrZDljaFcblx0XHRcdHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0XHRrZXk6ICdzZWxlY3RTb25DYXJkJyxcblx0XHRcdFx0c3VjY2VzczogcmVzID0+IHtcblx0XHRcdFx0XHR0aGF0LnNlbGVjdFNvbkNhcmQgPSByZXMuZGF0YTtcblx0XHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fVxuXHRcdC8v5Y+R6LW35b6u5L+h5pSv5LuYXG5cdFx0YXN5bmMgc2hvcFBheSgpe1xuXHRcdFx0Y29uc3QgdGhhdCA9IHRoaXM7XG5cdFx0XHRjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvc2hvcF9vcmRlci8nICsgdGhhdC5vcmRlckluZm8uaWQ7XG5cdFx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5zZWxlY3RTb25DYXJkKS5sZW5ndGggICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0Q291cG9uKS5sZW5ndGgpe1xuXHRcdFx0XHQvL+S4pOS4qumDveaciVxuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdHBheW1lbnRfbWV0aG9kOnRoaXMucGF5VHlwZSxcblx0XHRcdFx0XHRjYXJkX3V1aWQ6dGhpcy5zZWxlY3RTb25DYXJkLnV1aWQsXG5cdFx0XHRcdFx0Y291cG9uX2lkOnRoaXMub3JkZXJJbmZvLmNvdXBvbl9pZFxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZSBpZihPYmplY3Qua2V5cyh0aGlzLnNlbGVjdENvdXBvbikubGVuZ3RoKXtcblx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHRwYXltZW50X21ldGhvZDoyLFxuXHRcdFx0XHRcdGNvdXBvbl9pZDp0aGlzLm9yZGVySW5mby5jb3Vwb25faWRcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2UgaWYoT2JqZWN0LmtleXModGhpcy5zZWxlY3RTb25DYXJkKS5sZW5ndGgpe1xuXHRcdFx0XHQvL+mAieaLqeS6huS8muWRmOWNoVxuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdHBheW1lbnRfbWV0aG9kOjIsXG5cdFx0XHRcdFx0Y2FyZF91dWlkOnRoaXMuc2VsZWN0U29uQ2FyZC51dWlkXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdHBheW1lbnRfbWV0aG9kOnRoaXMucGF5VHlwZSxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YXdhaXQgd2VweS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyxcblx0XHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOmRhdGFcblx0XHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0aWYocmVzLmRhdGEubWVzc2FnZS5sZW5ndGggPT0gMCl7XG5cdFx0XHRcdFx0Ly/kvJrlkZjljaHmlK/ku5hcblx0XHRcdFx0XHR3eC5yZWRpcmVjdFRvKHtcblx0XHRcdFx0XHRcdHVybDogJy4vcGF5bWVudFN1Y2Nlc3MnXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhhdC5qc3NkayA9IHJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0XHRcdC8v5Y+R6LW35b6u5L+h5pSv5LuYXG5cdFx0XHRcdFx0d3gucmVxdWVzdFBheW1lbnQoe1xuXHRcdFx0XHRcdFx0J2FwcElkJzp0aGF0Lmpzc2RrLmFwcElkLFxuXHRcdFx0XHRcdFx0J3RpbWVTdGFtcCc6IHRoYXQuanNzZGsudGltZVN0YW1wLFxuXHRcdFx0XHRcdFx0J25vbmNlU3RyJzp0aGF0Lmpzc2RrLm5vbmNlU3RyLFxuXHRcdFx0XHRcdFx0J3BhY2thZ2UnOiB0aGF0Lmpzc2RrLnBhY2thZ2UsXG5cdFx0XHRcdFx0XHQnc2lnblR5cGUnOiB0aGF0Lmpzc2RrLnNpZ25UeXBlLFxuXHRcdFx0XHRcdFx0J3BheVNpZ24nOiB0aGF0Lmpzc2RrLnBheVNpZ24sXG5cdFx0XHRcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdFx0XHRcdHd4LnJlZGlyZWN0VG8oe1xuXHRcdFx0XHRcdFx0XHRcdHVybDogJy4vcGF5bWVudFN1Y2Nlc3MnXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHRcblx0XHR9XG5cdFx0Ly/ojrflj5borqLljZXor6bmg4Vcblx0XHRhc3luYyBnZXRPcmRlckRldGFpbCgpe1xuXHRcdFx0Y29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3Bfb3JkZXJfZGV0YWlscy8nICsgdGhpcy5vcmRlcklkO1xuXHRcdFx0YXdhaXQgd2VweS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyxcblx0XHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0XHR9LFxuXHRcdFx0fSkudGhlbihyZXM9Pntcblx0XHRcdFx0dGhpcy5vcmRlckluZm8gPSByZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHR0aGlzLnNlbGVjdEdvb2RzID0gcmVzLmRhdGEubWVzc2FnZS5nb29kcztcblx0XHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdC8v6I635Y+W5Lya5ZGY5Y2h6YeR6aKdXG5cdFx0Z2V0Q2FyZE1vbmV5KCl7XG5cdFx0XHR3ZXB5LnJlcXVlc3Qoe1xuXHRcdFx0XHR1cmw6IGFwaS5hcGlNYWxsKydhcGkvdXNlcl9jYXJkLycrIHRoaXMuc2hvcElkLFxuXHRcdFx0XHRtZXRob2Q6ICdHRVQnLFxuXHRcdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHRcdCdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG5cdFx0XHRcdH1cblx0XHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0cmVzLmRhdGEubWVzc2FnZS5tb25leSA9IE51bWJlcihyZXMuZGF0YS5tZXNzYWdlLm1vbmV5LzEwMCkudG9GaXhlZCgyKVxuXHRcdFx0XHR0aGlzLmFtb3VudCA9IHJlcy5kYXRhLm1lc3NhZ2UubW9uZXk7XG5cdFx0XHRcdC8vIGlmKCl7XG5cblx0XHRcdFx0Ly8gfVxuXHRcdFx0XHRpZihOdW1iZXIodGhpcy5hbW91bnQpPjApe1xuXHRcdFx0XHRcdHRoaXMucGF5VHlwZSA9IDJcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5wYXlUeXBlID0gMVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuIl19