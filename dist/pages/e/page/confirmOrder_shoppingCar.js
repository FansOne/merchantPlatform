'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var New = function (_wepy$page) {
	_inherits(New, _wepy$page);

	function New() {
		var _ref;

		var _temp, _this2, _ret;

		_classCallCheck(this, New);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = New.__proto__ || Object.getPrototypeOf(New)).call.apply(_ref, [this].concat(args))), _this2), _this2.config = {
			navigationBarTitleText: '确认订单'
		}, _this2.data = {
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
			money: 0,
			goodId: [],
			userCoupon: []
		}, _this2.components = {}, _this2.methods = {
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
							url: "confirmOrder_shoppingCar?shopId=" + that.shopId
						});
					}, fail: function fail(res) {
						wx.openSetting({});
					}
				});
			},
			confirmPayment: function confirmPayment() {
				var _this3 = this;

				if (this.orderInfo != null) {
					if (Object.keys(this.orderInfo).length != 0) {
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
									var totalPrice = 0;
									_this3.selectGoods.forEach(function (item, index) {
										totalPrice = Number(totalPrice) + Number(item.price);
									});
									if (Number(totalPrice) >= _this3.sendprice) {
										_this3.shopPay();
									} else {
										wx.showToast({
											title: '未达到起送价格',
											icon: 'none',
											duration: 2000,
											mask: false
										});
									}
								}
							}
						});
					}
				} else {
					wx.getStorage({
						key: 'address',
						success: function success(res) {
							var totalPrice = 0;
							_this3.selectGoods.forEach(function (item, index) {
								totalPrice = Number(totalPrice) + Number(item.price) * item.quantity;
							});
							if (Number(totalPrice) >= _this3.sendprice) {
								_this3.getPaymentData();
								wx.setStorage({
									key: 'cartItems',
									data: _this3.cartItems
								});
							} else {
								wx.showToast({
									title: '未达到起送价格',
									icon: 'none',
									duration: 2000,
									mask: false
								});
							}
						},
						fail: function fail(res) {
							wx.showToast({
								title: '请填写收货地址',
								image: '../../../images/警告.png',
								duration: 2000
							});
						}
					});
				}
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
						url: './selectCoupon?shopId=' + this.shopId + '&normalsend=' + this.normalsend + '&money=' + this.orderPrice
					});
				}
			},

			//会员卡充值
			cardRecharge: function cardRecharge() {
				wx.navigateTo({
					url: '../../../packageMembershipCard/membershipCard/cardRecharge?shopId=' + this.shopId
				});
			}
		}, _temp), _possibleConstructorReturn(_this2, _ret);
	}

	_createClass(New, [{
		key: 'onLoad',
		value: function onLoad(options) {
			var _this4 = this;

			wx.removeStorage({ key: 'selectCoupon' });
			//获取token
			var token = wx.getStorageSync("access_token");
			this.token = token.access_token;
			this.$apply();
			this.shopId = options.shopId;
			this.$apply();
			try {
				this.selectGoods = JSON.parse(options.waitToPay);
				this.$apply();
			} catch (err) {}
			wx.getStorage({
				key: 'normalsend',
				success: function success(res) {
					_this4.normalsend = res.data;
					_this4.$apply();
				}
			});
			wx.getStorage({
				key: 'sendPrice',
				success: function success(res) {
					_this4.sendprice = res.data;
					_this4.$apply();
				}
			});
			//获取shopId
			if (options.shopId) {
				// this.getCardMoney()
				this.getMember();
			}
			//获取屏幕宽高
			var _this = this;
			wx.getSystemInfo({
				success: function success(res) {
					_this.screenHeight = res.windowHeight;
					_this.screenWidth = res.windowWidth;
					_this.$apply();
				}
			});
		}
		//领取会员卡

	}, {
		key: 'getMember',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var url, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								url = _api2.default.apiMall + 'api/user_card';
								data = {
									merchant_id: this.shopId
								};

								_wepy2.default.request({
									url: url,
									method: 'POST',
									header: {
										'Accept': 'application/vnd.lingmo.v1+json',
										'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
										'Authorization': 'Bearer ' + this.token
									},
									data: data
								}).then(function (res) {});

							case 3:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getMember() {
				return _ref2.apply(this, arguments);
			}

			return getMember;
		}()
	}, {
		key: 'onShow',
		value: function onShow() {
			var _this5 = this;

			//获取会员卡金额
			this.getCardMoney();
			var that = this;
			wx.getStorage({
				key: 'address',
				success: function success(res) {
					that.userAddress = res.data;
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'selectBuy',
				success: function success(res) {
					that.selectGoods = res.data;
					that.goodId = _util2.default.getELowPrice(res.data);
					that.userCoupons();
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'totalPrice',
				success: function success(res) {
					that.orderPrice = Number(res.data) + Number(that.normalsend);
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'userCode',
				success: function success(res) {
					that.userCode = res.data;
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'address',
				success: function success(res) {
					that.userAddress = res.data;
					that.$apply();
				},
				fail: function fail() {
					that.haveAddress = false;
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'openid',
				success: function success(res) {
					that.openid = res.data;
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'selectSonCard',
				success: function success(res) {
					that.selectSonCard = res.data;
					that.$apply();
				}
			});
			wx.getStorage({
				key: 'selectCoupon',
				success: function success(res) {
					if (res.data.usetype == 1) {
						//全品券，处理总价
						if (res.data.type == 1) {
							_this5.orderPrice = Number(_this5.orderPrice - Number(res.data.amount / 100)).toFixed(2);
							_this5.$apply();
						} else if (res.data.type == 2) {
							_this5.orderPrice = Number((Number(_this5.orderPrice) - Number(_this5.normalsend)) * (Number(res.data.amount) / 10) + Number(_this5.normalsend)).toFixed(2);
							_this5.$apply();
						} else {
							_this5.orderPrice = Number(_this5.orderPrice - Number(res.data.amount / 100)).toFixed(2);
							_this5.$apply();
						}
					} else if (res.data.usetype == 2) {
						//单品券，处理单品价格
						var price = 0;
						_this5.selectGoods.forEach(function (item, index) {
							if (res.data.goods.indexOf(item.good_id) >= 0) {
								//该商品有单品券，算价格
								if (res.data.type == 1) {
									price = Number(Number(_this5.normalsend) + Number(price) + item.price / 100 * item.quantity - Number(res.data.amount / 100)).toFixed(2);
								} else if (res.data.type == 2) {
									price = Number(Number(_this5.normalsend) + Number(price) + item.price / 100 * item.quantity * (Number(res.data.amount) / 10)).toFixed(2);
									_this5.$apply();
								} else {
									price = Number(Number(_this5.normalsend) + Number(price) + item.price / 100 * item.quantity - Number(res.data.amount / 100)).toFixed(2);
									_this5.$apply();
								}
							} else {
								price = Number(Number(_this5.normalsend) + Number(price) + item.price * item.quantity).toFixed(2);
							}
						});
						_this5.orderPrice = price;
					}
					that.selectCoupon = res.data;
					that.$apply();
				}
			});
		}
		//订单提交

	}, {
		key: 'getPaymentData',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this6 = this;

				var singleGood, objKeys, that, url, data;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								singleGood = [];

								this.selectGoods.forEach(function (item, index) {
									singleGood.push({
										sku_id: item.good_id,
										nums: item.quantity
									});
								});
								objKeys = Object.keys(this.ticketMessage);
								that = this;
								url = _api2.default.apiMall + 'api/shop_order';

								if (objKeys.length) {
									that.isvoice = 2;
									that.$apply();
								} else {
									that.isvoice = 1;
									that.$apply();
								}
								data = {
									goods: JSON.stringify(singleGood),
									mobile: '18091842832',
									truename: that.userAddress.userName,
									province: that.userAddress.provinceName + that.userAddress.cityName + that.userAddress.countyName,
									address: that.userAddress.detailInfo,
									// postcode: that.userAddress.postalCode,
									isvoice: that.isvoice,
									intype: that.isvoice == 1 ? '' : Number(that.ticketMessage.type) + 1,
									invoice_title: that.ticketMessage.title ? that.ticketMessage.title : '',
									invoice_number: that.ticketMessage.taxNumber ? that.ticketMessage.taxNumber : '',
									invoiceaddress: that.ticketMessage.companyAddress ? that.ticketMessage.companyAddress : '',
									invoicetel: that.ticketMessage.telephone ? that.ticketMessage.telephone : '',
									inviocebank: that.ticketMessage.bankName ? that.ticketMessage.bankName : '',
									inviocebanknumber: that.ticketMessage.bankAccount ? that.ticketMessage.bankAccount : '',
									type: 2
								};
								_context2.next = 9;
								return _wepy2.default.request({
									url: url,
									method: 'POST',
									header: {
										'Accept': 'application/vnd.lingmo.v1+json',
										'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
										'Authorization': 'Bearer ' + this.token
									},
									data: data
								}).then(function (res) {
									if (res.data.status == 200) {
										that.orderId = res.data.message;
										wx.setStorage({
											key: 'orderId',
											data: that.orderId
										});
										if (that.orderId.length != 0) {
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
														that.shopPay();
													} else {
														_this6.deleteOrder();
													}
												}
											});
										}
										that.$apply();
									} else if (res.data.status == 422) {
										wx.showToast({
											title: '商品库存不足',
											icon: 'none',
											duration: 1500
										});
									}
								});

							case 9:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getPaymentData() {
				return _ref3.apply(this, arguments);
			}

			return getPaymentData;
		}()
		//发起微信支付

	}, {
		key: 'shopPay',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
				var that, orderId, url, data;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								that = this;
								orderId = that.orderId ? that.orderId : that.orderInfo.id;
								url = _api2.default.apiMall + 'api/shop_order/' + orderId;
								data = {};

								if (Object.keys(this.selectSonCard).length && Object.keys(this.selectCoupon).length) {
									//两个都有
									data = {
										payment_method: this.payType,
										card_uuid: this.selectSonCard.uuid,
										coupon_id: this.selectCoupon.id
									};
								} else if (Object.keys(this.selectCoupon).length) {
									data = {
										payment_method: this.payType,
										coupon_id: this.selectCoupon.id
									};
								} else if (Object.keys(this.selectSonCard).length) {
									//选择了会员卡
									data = {
										payment_method: this.payType,
										card_uuid: this.selectSonCard.uuid
									};
								} else {
									data = {
										payment_method: this.payType
									};
								}
								_context3.next = 7;
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
											url: './d/paymentSuccess'
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
											},
											fail: function fail(res) {
												wx.showToast({
													title: '取消支付',
													icon: 'none',
													duration: 1000,
													mask: false
												});
												// this.deleteOrder();
											}
										});
									}
								});

							case 7:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function shopPay() {
				return _ref4.apply(this, arguments);
			}

			return shopPay;
		}()
		//获取会员卡金额

	}, {
		key: 'getCardMoney',
		value: function getCardMoney() {
			var _this7 = this;

			_wepy2.default.request({
				url: _api2.default.apiMall + 'api/user_card/' + this.shopId,
				method: 'GET',
				header: {
					'Accept': 'application/vnd.lingmo.v1+json',
					'Authorization': 'Bearer ' + this.token
				}
			}).then(function (res) {
				res.data.message.money = Number(res.data.message.money / 100).toFixed(2);
				_this7.amount = res.data.message.money;
				if (Number(_this7.amount) > 0) {
					_this7.payType = 2;
				} else {
					_this7.payType = 1;
				}
				_this7.$apply();
			});
		}
		// 用户代金券

	}, {
		key: 'userCoupons',
		value: function userCoupons(options) {
			var _this8 = this;

			_wepy2.default.request({
				url: _api2.default.apiMall + 'api/myCard',
				method: 'GET',
				data: {
					merchant_id: this.shopId,
					goods: JSON.stringify(this.goodId),
					// money:this.money,
					order_type: 1
				},
				header: {
					'Accept': 'application/vnd.lingmo.v1+json',
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Authorization': 'Bearer ' + this.token
				}
			}).then(function (res) {
				_this8.userCoupon = res.data.message;
				if (!res.data.message.length) {
					_this8.nodata = false;
					_this8.$apply();
				} else {
					_this8.nodata = true;
					_this8.$apply();
				}
				_this8.$apply();
			});
		}
		//用户取消支付后调该删除接口

	}, {
		key: 'deleteOrder',
		value: function deleteOrder() {
			_wepy2.default.request({
				url: _api2.default.apiMall + 'api/shop_order/' + this.orderId,
				method: 'DELETE',
				header: {
					'Accept': 'application/vnd.lingmo.v1+json',
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Authorization': 'Bearer ' + this.token
				}
			}).then(function (res) {});
		}
	}]);

	return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/confirmOrder_shoppingCar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm1PcmRlcl9zaG9wcGluZ0Nhci5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImJhbGxCb3R0b20iLCJiYWxsUmlnaHQiLCJzY3JlZW5IZWlnaHQiLCJzY3JlZW5XaWR0aCIsIm9yZGVyUHJpY2UiLCJzZWxlY3RHb29kcyIsInVzZXJDb2RlIiwidXNlckluZm8iLCJvcmRlclJlc3VsdCIsImpzc2RrIiwidXNlckFkZHJlc3MiLCJjYXJ0SXRlbXMiLCJUaWNrZXRPcGVuaW5nIiwidGlja2V0TWVzc2FnZSIsIm1lcmNoYW50VGVsIiwiaXN2b2ljZSIsInBpYW8iLCJ1c2VyaWQiLCJoYXZlQWRkcmVzcyIsInVzZXJJZCIsIm5vcm1hbHNlbmQiLCJzZW5kcHJpY2UiLCJ0b2tlbiIsIm9yZGVySW5mbyIsImFtb3VudCIsInNob3BJZCIsInBheVR5cGUiLCJzZWxlY3RTb25DYXJkIiwic2VsZWN0Q291cG9uIiwibW9uZXkiLCJnb29kSWQiLCJ1c2VyQ291cG9uIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJiYWxsTW92ZUV2ZW50IiwiZSIsInRvdWNocyIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwieCIsInkiLCIkYXBwbHkiLCJnb0FkZHJlc3MiLCJ0aGF0Iiwid3giLCJjaG9vc2VBZGRyZXNzIiwic3VjY2VzcyIsInJlcyIsInNldFN0b3JhZ2UiLCJrZXkiLCJyZWRpcmVjdFRvIiwidXJsIiwiZmFpbCIsIm9wZW5TZXR0aW5nIiwiY29uZmlybVBheW1lbnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwiY29uZmlybSIsInRvdGFsUHJpY2UiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiTnVtYmVyIiwicHJpY2UiLCJzaG9wUGF5Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImdldFN0b3JhZ2UiLCJxdWFudGl0eSIsImdldFBheW1lbnREYXRhIiwiaW1hZ2UiLCJzd2l0Y2hDaGFuZ2UiLCJkZXRhaWwiLCJ2YWx1ZSIsInNlbGVjdFRpY2tldE9wZW5pbmciLCJjaG9vc2VJbnZvaWNlVGl0bGUiLCJtYWtlUGhvbmVDYWxsIiwicGhvbmVOdW1iZXIiLCJzZWxlY3RQYXlNZW50IiwiaWR4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJpZCIsInJlbW92ZVN0b3JhZ2UiLCJuYXZpZ2F0ZVRvIiwiY2FyZFJlY2hhcmdlIiwib3B0aW9ucyIsImdldFN0b3JhZ2VTeW5jIiwiYWNjZXNzX3Rva2VuIiwiSlNPTiIsInBhcnNlIiwid2FpdFRvUGF5IiwiZXJyIiwiZ2V0TWVtYmVyIiwiX3RoaXMiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0Iiwid2luZG93V2lkdGgiLCJhcGkiLCJhcGlNYWxsIiwibWVyY2hhbnRfaWQiLCJ3ZXB5IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJnZXRDYXJkTW9uZXkiLCJ1dGlsIiwiZ2V0RUxvd1ByaWNlIiwidXNlckNvdXBvbnMiLCJvcGVuaWQiLCJ1c2V0eXBlIiwidHlwZSIsInRvRml4ZWQiLCJnb29kcyIsImluZGV4T2YiLCJnb29kX2lkIiwic2luZ2xlR29vZCIsInB1c2giLCJza3VfaWQiLCJudW1zIiwib2JqS2V5cyIsInN0cmluZ2lmeSIsIm1vYmlsZSIsInRydWVuYW1lIiwidXNlck5hbWUiLCJwcm92aW5jZSIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwiY291bnR5TmFtZSIsImFkZHJlc3MiLCJkZXRhaWxJbmZvIiwiaW50eXBlIiwiaW52b2ljZV90aXRsZSIsImludm9pY2VfbnVtYmVyIiwidGF4TnVtYmVyIiwiaW52b2ljZWFkZHJlc3MiLCJjb21wYW55QWRkcmVzcyIsImludm9pY2V0ZWwiLCJ0ZWxlcGhvbmUiLCJpbnZpb2NlYmFuayIsImJhbmtOYW1lIiwiaW52aW9jZWJhbmtudW1iZXIiLCJiYW5rQWNjb3VudCIsInN0YXR1cyIsIm9yZGVySWQiLCJtZXNzYWdlIiwiZGVsZXRlT3JkZXIiLCJwYXltZW50X21ldGhvZCIsImNhcmRfdXVpZCIsInV1aWQiLCJjb3Vwb25faWQiLCJyZXF1ZXN0UGF5bWVudCIsImFwcElkIiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwib3JkZXJfdHlwZSIsIm5vZGF0YSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2lMQUNwQkMsTSxHQUFTO0FBQ1JDLDJCQUF3QjtBQURoQixHLFNBR1RDLEksR0FBTztBQUNOQyxlQUFZLEdBRE47QUFFTEMsY0FBVyxFQUZOO0FBR0xDLGlCQUFjLENBSFQ7QUFJTEMsZ0JBQWEsQ0FKUjtBQUtOQyxlQUFXLEVBTEw7QUFNTkMsZ0JBQVksRUFOTjtBQU9OQyxhQUFTLEVBUEg7QUFRTkMsYUFBUyxFQVJIO0FBU047QUFDQUMsZ0JBQVksRUFWTjtBQVdOO0FBQ0FDLFVBQU0sRUFaQTtBQWFOO0FBQ0FDLGdCQUFZLEVBZE47QUFlTkMsY0FBVSxFQWZKO0FBZ0JOO0FBQ0FDLGtCQUFjLElBakJSO0FBa0JOQyxrQkFBYyxFQWxCUjtBQW1CTjtBQUNBQyxnQkFBWSxFQXBCTjtBQXFCTjtBQUNBQyxZQUFRLEVBdEJGO0FBdUJOO0FBQ0FDLFNBQUssS0F4QkM7QUF5Qk5DLFdBQU8sRUF6QkQ7QUEwQk47QUFDQUMsZ0JBQVksSUEzQk47QUE0QlJDLFdBQU8sRUE1QkM7QUE2QlJDLGVBQVcsQ0E3Qkg7QUE4QlJDLGNBQVUsQ0E5QkY7QUErQlJDLFVBQU0sRUEvQkU7QUFnQ1JDLGNBQVUsSUFoQ0Y7QUFpQ1JDLFdBQU8sQ0FqQ0M7QUFrQ1JDLFdBQU8sRUFsQ0M7QUFtQ1JDLFlBQVEsR0Fu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cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vYXBpL2FwaSdcbiAgaW1wb3J0IHV0aWwgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXRpbCdcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgXHRjb25maWcgPSB7XG4gIFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJyxcbiAgXHR9XG4gIFx0ZGF0YSA9IHtcbiAgXHRcdGJhbGxCb3R0b206IDEyMCxcblx0ICAgIGJhbGxSaWdodDogMzAsXG5cdCAgICBzY3JlZW5IZWlnaHQ6IDAsXG5cdCAgICBzY3JlZW5XaWR0aDogMCxcbiAgXHRcdG9yZGVyUHJpY2U6JycsXG4gIFx0XHRzZWxlY3RHb29kczpbXSxcbiAgXHRcdHVzZXJDb2RlOicnLFxuICBcdFx0dXNlckluZm86e30sXG4gIFx0XHQvL+iuouWNleS/oeaBr1xuICBcdFx0b3JkZXJSZXN1bHQ6JycsXG4gIFx0XHQvL+W+ruS/oeaUr+S7mOaJgOmcgOWPguaVsFxuICBcdFx0anNzZGs6e30sXG4gIFx0XHQvL+eUqOaIt+WcsOWdgFxuICBcdFx0dXNlckFkZHJlc3M6e30sXG4gIFx0XHRjYXJ0SXRlbXM6W10sXG4gIFx0XHQvL+W8gOelqFxuICBcdFx0VGlja2V0T3BlbmluZzp0cnVlLFxuICBcdFx0dGlja2V0TWVzc2FnZTp7fSxcbiAgXHRcdC8v5ZWG5oi355S16K+dXG4gIFx0XHRtZXJjaGFudFRlbDonJyxcbiAgXHRcdC8v5piv5ZCm5pyJ5Y+R56WoXG4gIFx0XHRpc3ZvaWNlOicnLFxuICBcdFx0Ly/lj5HnpajlsZXnpLpcbiAgXHRcdHBpYW86ZmFsc2UsXG4gIFx0XHR1c2VyaWQ6JycsXG4gIFx0XHQvL+acieaXoOWcsOWdgFxuICBcdFx0aGF2ZUFkZHJlc3M6dHJ1ZSxcblx0XHR1c2VySWQ6JycsXG5cdFx0bm9ybWFsc2VuZDowLFxuXHRcdHNlbmRwcmljZTowLFxuXHRcdHRva2VuOicnLFxuXHRcdG9yZGVySW5mbzpudWxsLFxuXHRcdGFtb3VudDowLFxuXHRcdHNob3BJZDonJyxcblx0XHRwYXlUeXBlOjk5OSxcblx0XHRzZWxlY3RTb25DYXJkOm51bGwsXG5cdFx0c2VsZWN0Q291cG9uOnt9LFxuXHRcdG1vbmV5OjAsXG5cdFx0Z29vZElkOltdLFxuXHRcdHVzZXJDb3Vwb246W11cbiAgXHR9XG4gIFx0b25Mb2FkKG9wdGlvbnMpe1xuXHRcdHd4LnJlbW92ZVN0b3JhZ2Uoe2tleTogJ3NlbGVjdENvdXBvbid9KTtcblx0XHQvL+iOt+WPlnRva2VuXG4gICAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG5cdFx0dGhpcy4kYXBwbHkoKTtcblx0XHR0aGlzLnNob3BJZCA9IG9wdGlvbnMuc2hvcElkO1xuXHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0dHJ5e1xuXHRcdFx0dGhpcy5zZWxlY3RHb29kcyA9IEpTT04ucGFyc2Uob3B0aW9ucy53YWl0VG9QYXkpO1xuXHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHR9Y2F0Y2goZXJyKXt9XG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6ICdub3JtYWxzZW5kJyxcblx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMubm9ybWFsc2VuZCA9IHJlcy5kYXRhO1xuXHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6ICdzZW5kUHJpY2UnLFxuXHRcdFx0c3VjY2VzczogcmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZW5kcHJpY2UgPSByZXMuZGF0YTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8v6I635Y+Wc2hvcElkXG5cdFx0aWYob3B0aW9ucy5zaG9wSWQpe1xuXHRcdFx0Ly8gdGhpcy5nZXRDYXJkTW9uZXkoKVxuXHRcdFx0dGhpcy5nZXRNZW1iZXIoKTtcblx0XHR9XG4gIFx0XHQvL+iOt+WPluWxj+W5leWuvemrmFxuICBcdFx0dmFyIF90aGlzID0gdGhpcztcblx0ICAgIHd4LmdldFN5c3RlbUluZm8oe1xuXHQgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG5cdCAgICAgICAgX3RoaXMuc2NyZWVuSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuXHQgICAgICAgIF90aGlzLnNjcmVlbldpZHRoID0gcmVzLndpbmRvd1dpZHRoXG5cdCAgICAgICAgX3RoaXMuJGFwcGx5KClcblx0ICAgICAgfVxuXHRcdH0pO1xuXHQgIH1cblx0Ly/pooblj5bkvJrlkZjljaFcblx0YXN5bmMgZ2V0TWVtYmVyKCl7XG5cdFx0Y29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3VzZXJfY2FyZCc7XG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdG1lcmNoYW50X2lkOnRoaXMuc2hvcElkXG5cdFx0fVxuXHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0aGVhZGVyOntcblx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG5cdFx0XHRcdCdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHR9KS50aGVuKHJlcz0+e30pXG5cdH1cbiAgICBjb21wb25lbnRzID0ge31cbiAgICBtZXRob2RzID0ge1xuICAgIFx0YmFsbE1vdmVFdmVudChlKXtcbiAgICBcdFx0dmFyIHRvdWNocyA9IGUudG91Y2hlc1swXTtcblx0XHQgICAgdmFyIHBhZ2VYID0gdG91Y2hzLnBhZ2VYO1xuXHRcdCAgICB2YXIgcGFnZVkgPSB0b3VjaHMucGFnZVk7XG5cdFx0ICAgIC8v6Ziy5q2i5Z2Q5qCH6LaK55WMLHZpZXflrr3pq5jnmoTkuIDljYpcblx0XHQgICAgaWYgKHBhZ2VYIDwgMjEpIHJldHVybjtcblx0XHQgICAgaWYgKHBhZ2VYID4gdGhpcy5zY3JlZW5XaWR0aCAtIDIxKSByZXR1cm47XG5cdFx0ICAgIGlmICh0aGlzLnNjcmVlbkhlaWdodCAtIHBhZ2VZIDw9IDIxKSByZXR1cm47XG5cdFx0ICAgIGlmIChwYWdlWSA8PSAyMSkgcmV0dXJuO1xuXHRcdCAgICAvL+eUqHJpZ2h05ZKMYm90dG9tLuaJgOS7pemcgOimgeWwhnBhZ2VYIHBhZ2VZ6L2s5o2iXG5cdFx0ICAgIHZhciB4ID0gdGhpcy5zY3JlZW5XaWR0aCAtIHBhZ2VYIC0gMjE7XG5cdFx0ICAgIHZhciB5ID0gdGhpcy5zY3JlZW5IZWlnaHQgLSBwYWdlWSAtIDIxO1xuXHRcdCAgICB0aGlzLmJhbGxCb3R0b20gPSB5LFxuXHRcdCAgICB0aGlzLmJhbGxSaWdodCA9IHhcblx0XHQgICAgdGhpcy4kYXBwbHkoKVxuICAgIFx0fSxcbiAgICBcdGdvQWRkcmVzcygpe1xuICAgIFx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0ICBcdHd4LmNob29zZUFkZHJlc3Moe1xuXHRcdFx0ICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHQgIFx0dGhhdC51c2VyQWRkcmVzcyA9IHJlcztcblx0XHRcdCAgXHR0aGF0LiRhcHBseSgpXG5cdFx0XHQgICAgd3guc2V0U3RvcmFnZSh7ICAgIFxuXHRcdFx0XHRcdGtleTonYWRkcmVzcycsXG5cdFx0XHRcdFx0ZGF0YTogcmVzXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHd4LnJlZGlyZWN0VG8oe1xuXHRcdFx0XHQgIHVybDpcImNvbmZpcm1PcmRlcl9zaG9wcGluZ0Nhcj9zaG9wSWQ9XCIgKyB0aGF0LnNob3BJZFxuXHRcdFx0XHR9KVxuXHRcdFx0ICB9LGZhaWw6ZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0XHQgIHd4Lm9wZW5TZXR0aW5nKHt9KVxuXHRcdFx0ICB9XG5cdFx0XHR9KVxuICAgIFx0fSxcbiAgICBcdGNvbmZpcm1QYXltZW50KCl7XG5cdFx0XHRpZih0aGlzLm9yZGVySW5mbyAhPSBudWxsKXtcblx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5vcmRlckluZm8pLmxlbmd0aCAhPSAwKXtcblx0XHRcdFx0XHR3eC5zaG93TW9kYWwoe1xuXHRcdFx0XHRcdFx0dGl0bGU6ICfmlK/ku5jmj5DnpLonLFxuXHRcdFx0XHRcdFx0Y29udGVudDogJ+aCqOehruiupOi/m+ihjOaUr+S7mOWQl++8nycsXG5cdFx0XHRcdFx0XHRzaG93Q2FuY2VsOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y2FuY2VsVGV4dDogJ+WPlua2iCcsXG5cdFx0XHRcdFx0XHRjYW5jZWxDb2xvcjogJyMwMDAwMDAnLFxuXHRcdFx0XHRcdFx0Y29uZmlybVRleHQ6ICfnoa7lrponLFxuXHRcdFx0XHRcdFx0Y29uZmlybUNvbG9yOiAnIzNDQzUxRicsXG5cdFx0XHRcdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZihyZXMuY29uZmlybSl7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRvdGFsUHJpY2UgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0R29vZHMuZm9yRWFjaCgoaXRlbSxpbmRleCk9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHRvdGFsUHJpY2UgPSBOdW1iZXIodG90YWxQcmljZSkgKyBOdW1iZXIoaXRlbS5wcmljZSlcblx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdGlmKE51bWJlcih0b3RhbFByaWNlKSA+PSB0aGlzLnNlbmRwcmljZSl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnNob3BQYXkoKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiAn5pyq6L6+5Yiw6LW36YCB5Lu35qC8Jyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMjAwMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0bWFzazogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0XHRcdGtleTogJ2FkZHJlc3MnLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT57XG5cdFx0XHRcdFx0XHRsZXQgdG90YWxQcmljZSA9IDA7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdEdvb2RzLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG5cdFx0XHRcdFx0XHRcdHRvdGFsUHJpY2UgPSBOdW1iZXIodG90YWxQcmljZSkgKyBOdW1iZXIoaXRlbS5wcmljZSkqaXRlbS5xdWFudGl0eVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdGlmKE51bWJlcih0b3RhbFByaWNlKSA+PSB0aGlzLnNlbmRwcmljZSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0UGF5bWVudERhdGEoKVxuXHRcdFx0XHRcdFx0XHR3eC5zZXRTdG9yYWdlKHtcblx0XHRcdFx0XHRcdFx0XHRrZXk6ICdjYXJ0SXRlbXMnLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHRoaXMuY2FydEl0ZW1zXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRcdFx0XHR0aXRsZTogJ+acqui+vuWIsOi1t+mAgeS7t+agvCcsXG5cdFx0XHRcdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAwLFxuXHRcdFx0XHRcdFx0XHRcdG1hc2s6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZhaWw6IChyZXMpPT4ge1xuXHRcdFx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6ICfor7floavlhpnmlLbotKflnLDlnYAnLFxuXHRcdFx0XHRcdFx0XHRpbWFnZTonLi4vLi4vLi4vaW1hZ2VzL+itpuWRii5wbmcnLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMjAwMFxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHRcbiAgICBcdH0sXG4gICAgXHRzd2l0Y2hDaGFuZ2UoZSl7XG4gICAgXHRcdGlmKGUuZGV0YWlsLnZhbHVlKXtcbiAgICBcdFx0XHR0aGlzLlRpY2tldE9wZW5pbmcgPSBmYWxzZVxuICAgIFx0XHRcdHRoaXMuJGFwcGx5KClcbiAgICBcdFx0fWVsc2V7XG4gICAgXHRcdFx0dGhpcy5UaWNrZXRPcGVuaW5nID0gdHJ1ZVxuICAgIFx0XHRcdHRoaXMudGlja2V0TWVzc2FnZSA9e31cbiAgICBcdFx0XHR0aGlzLnBpYW8gPSBmYWxzZVxuICAgIFx0XHRcdHRoaXMuJGFwcGx5KClcbiAgICBcdFx0fVxuICAgIFx0fSxcbiAgICBcdHNlbGVjdFRpY2tldE9wZW5pbmcoKXtcbiAgICBcdFx0bGV0IHRoYXQgPSB0aGlzO1xuICAgIFx0XHR3eC5jaG9vc2VJbnZvaWNlVGl0bGUoe1xuICBcdFx0XHRcdHN1Y2Nlc3MocmVzKSB7XG4gIFx0XHRcdFx0XHR0aGF0LnBpYW8gPSB0cnVlXG4gIFx0XHRcdFx0XHR0aGF0LnRpY2tldE1lc3NhZ2UgPSByZXNcbiAgXHRcdFx0XHRcdHRoYXQuJGFwcGx5KClcbiAgXHRcdFx0XHR9XG5cdFx0XHR9KVxuICAgIFx0fSxcbiAgICBcdG1lcmNoYW50VGVsKCl7XG4gICAgXHRcdGxldCB0aGF0ID0gdGhpcztcbiAgICBcdFx0d3guZ2V0U3RvcmFnZSh7XG4gICAgXHRcdFx0a2V5OidzaG9wVGVsJyxcbiAgICBcdFx0XHRzdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG4gICAgXHRcdFx0XHR0aGF0Lm1lcmNoYW50VGVsID0gcmVzLmRhdGFcbiAgICBcdFx0XHRcdHRoYXQuJGFwcGx5KClcbiAgICBcdFx0XHR9XG4gICAgXHRcdH0pXG4gICAgXHRcdHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgIFx0XHRwaG9uZU51bWJlcjogdGhhdC5tZXJjaGFudFRlbCBcbiAgICAgICAgXHR9KVxuICAgIFx0fSxcblx0XHRzZWxlY3RQYXlNZW50KGUpe1xuXHRcdFx0bGV0IGlkeCA9IE51bWJlcihlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZCk7XG5cdFx0XHRpZighaWR4KXtcblx0XHRcdFx0dGhpcy5zZWxlY3RTb25DYXJkID0ge31cblx0XHRcdFx0d3gucmVtb3ZlU3RvcmFnZSh7a2V5OidzZWxlY3RTb25DYXJkJ30pXG5cdFx0XHR9ZWxzZSBpZihpZHggPT0gMSl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0XHRcdHVybDogJy4uLy4uLy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9tZW1iZXJzaGlwQ2FyZC9zZWxlY3RDYXJkTGlzdHM/c2hvcElkPScgKyB0aGlzLnNob3BJZFxuXHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHtcblx0XHRcdFx0XHR1cmw6ICcuL3NlbGVjdENvdXBvbj9zaG9wSWQ9JyArIHRoaXMuc2hvcElkICsgJyZub3JtYWxzZW5kPScrdGhpcy5ub3JtYWxzZW5kICsgJyZtb25leT0nKyB0aGlzLm9yZGVyUHJpY2Vcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvL+S8muWRmOWNoeWFheWAvFxuXHRcdGNhcmRSZWNoYXJnZSgpe1xuXHRcdFx0d3gubmF2aWdhdGVUbyh7XG5cdFx0XHRcdHVybDogJy4uLy4uLy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9tZW1iZXJzaGlwQ2FyZC9jYXJkUmVjaGFyZ2U/c2hvcElkPScgKyB0aGlzLnNob3BJZFxuXHRcdFx0fSk7XG5cdFx0fVxuICAgIH1cbiAgICBvblNob3coKXtcblx0XHQvL+iOt+WPluS8muWRmOWNoemHkeminVxuXHRcdHRoaXMuZ2V0Q2FyZE1vbmV5KCk7XG4gICAgXHRsZXQgdGhhdCA9IHRoaXM7XG4gICAgXHR3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgXHRrZXk6ICdhZGRyZXNzJyxcbiAgICAgICAgXHRzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIFx0dGhhdC51c2VyQWRkcmVzcyA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgXHR0aGF0LiRhcHBseSgpO1xuICAgICAgICBcdH0gXG4gICAgICAgIH0pXG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0a2V5OiAnc2VsZWN0QnV5Jyxcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0XHR0aGF0LnNlbGVjdEdvb2RzID0gcmVzLmRhdGE7XG5cdFx0XHRcdHRoYXQuZ29vZElkID0gdXRpbC5nZXRFTG93UHJpY2UocmVzLmRhdGEpO1xuXHRcdFx0XHR0aGF0LnVzZXJDb3Vwb25zKClcblx0XHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6J3RvdGFsUHJpY2UnLFxuXHRcdFx0IHN1Y2Nlc3M6IChyZXMpPT4ge1xuXHRcdFx0IFx0dGhhdC5vcmRlclByaWNlID0gTnVtYmVyKHJlcy5kYXRhKSArIE51bWJlcih0aGF0Lm5vcm1hbHNlbmQpXG5cdFx0XHQgXHR0aGF0LiRhcHBseSgpXG5cdFx0XHQgfVxuXHRcdH0pXG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6J3VzZXJDb2RlJyxcblx0XHQgXHRzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcblx0XHRcdCBcdHRoYXQudXNlckNvZGUgPSByZXMuZGF0YVxuXHRcdFx0IFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6J2FkZHJlc3MnLFxuXHRcdCBcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0IFx0dGhhdC51c2VyQWRkcmVzcz0gcmVzLmRhdGFcblx0XHRcdCBcdHRoYXQuJGFwcGx5KClcblx0XHRcdH0sXG5cdFx0XHRmYWlsOmZ1bmN0aW9uKCl7XG5cdFx0XHRcdHRoYXQuaGF2ZUFkZHJlc3MgPSBmYWxzZVxuXHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdGtleTonb3BlbmlkJyxcblx0XHRcdHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0dGhhdC5vcGVuaWQgPSByZXMuZGF0YVxuXHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdGtleTogJ3NlbGVjdFNvbkNhcmQnLFxuXHRcdFx0c3VjY2VzczogcmVzID0+IHtcblx0XHRcdFx0dGhhdC5zZWxlY3RTb25DYXJkID0gcmVzLmRhdGFcblx0XHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0a2V5OiAnc2VsZWN0Q291cG9uJyxcblx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdGlmKHJlcy5kYXRhLnVzZXR5cGUgPT0gMSl7XG5cdFx0XHRcdFx0Ly/lhajlk4HliLjvvIzlpITnkIbmgLvku7dcblx0XHRcdFx0XHRpZihyZXMuZGF0YS50eXBlID09IDEpe1xuXHRcdFx0XHRcdFx0dGhpcy5vcmRlclByaWNlID0gTnVtYmVyKHRoaXMub3JkZXJQcmljZSAtTnVtYmVyKHJlcy5kYXRhLmFtb3VudC8xMDApKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHRcdFx0fWVsc2UgaWYocmVzLmRhdGEudHlwZSA9PSAyKXtcblx0XHRcdFx0XHRcdHRoaXMub3JkZXJQcmljZSA9IE51bWJlcigoTnVtYmVyKHRoaXMub3JkZXJQcmljZSktTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkpKihOdW1iZXIocmVzLmRhdGEuYW1vdW50KS8xMCkrTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkpLnRvRml4ZWQoMilcblx0XHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMub3JkZXJQcmljZSA9IE51bWJlcih0aGlzLm9yZGVyUHJpY2UtTnVtYmVyKHJlcy5kYXRhLmFtb3VudC8xMDApKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZSBpZihyZXMuZGF0YS51c2V0eXBlID09IDIpe1xuXHRcdFx0XHRcdC8v5Y2V5ZOB5Yi477yM5aSE55CG5Y2V5ZOB5Lu35qC8XG5cdFx0XHRcdFx0bGV0IHByaWNlID0gMDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEdvb2RzLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG5cdFx0XHRcdFx0XHRpZihyZXMuZGF0YS5nb29kcy5pbmRleE9mKGl0ZW0uZ29vZF9pZCkgPj0gMCl7XG5cdFx0XHRcdFx0XHRcdC8v6K+l5ZWG5ZOB5pyJ5Y2V5ZOB5Yi477yM566X5Lu35qC8XG5cdFx0XHRcdFx0XHRcdGlmKHJlcy5kYXRhLnR5cGUgPT0gMSl7XG5cdFx0XHRcdFx0XHRcdFx0cHJpY2UgPSBOdW1iZXIoTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkgKyBOdW1iZXIocHJpY2UpICsgKGl0ZW0ucHJpY2UvMTAwKSooaXRlbS5xdWFudGl0eSktTnVtYmVyKHJlcy5kYXRhLmFtb3VudC8xMDApKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0XHRcdH1lbHNlIGlmKHJlcy5kYXRhLnR5cGUgPT0gMil7XG5cdFx0XHRcdFx0XHRcdFx0cHJpY2UgPSBOdW1iZXIoTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkgKyBOdW1iZXIocHJpY2UpICsgKGl0ZW0ucHJpY2UvMTAwKSooaXRlbS5xdWFudGl0eSkqKE51bWJlcihyZXMuZGF0YS5hbW91bnQpLzEwKSkudG9GaXhlZCgyKVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0cHJpY2UgPSBOdW1iZXIoTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkgKyBOdW1iZXIocHJpY2UpICsgKGl0ZW0ucHJpY2UvMTAwKSooaXRlbS5xdWFudGl0eSktTnVtYmVyKHJlcy5kYXRhLmFtb3VudC8xMDApKS50b0ZpeGVkKDIpXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0cHJpY2UgPSBOdW1iZXIoTnVtYmVyKHRoaXMubm9ybWFsc2VuZCkgKyBOdW1iZXIocHJpY2UpICsgKGl0ZW0ucHJpY2UpKihpdGVtLnF1YW50aXR5KSkudG9GaXhlZCgyKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0dGhpcy5vcmRlclByaWNlID0gcHJpY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhhdC5zZWxlY3RDb3Vwb24gPSByZXMuZGF0YTtcblx0XHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdH0pO1xuICAgIH1cbiAgICAvL+iuouWNleaPkOS6pFxuICAgIGFzeW5jIGdldFBheW1lbnREYXRhKCl7XG5cdFx0bGV0IHNpbmdsZUdvb2QgPSBbXTtcblx0XHR0aGlzLnNlbGVjdEdvb2RzLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG5cdFx0XHRzaW5nbGVHb29kLnB1c2goe1xuXHRcdFx0XHRza3VfaWQ6aXRlbS5nb29kX2lkLFxuXHRcdFx0XHRudW1zOml0ZW0ucXVhbnRpdHlcblx0XHRcdH0pXG5cdFx0fSlcblx0XHRjb25zdCBvYmpLZXlzID0gT2JqZWN0LmtleXModGhpcy50aWNrZXRNZXNzYWdlKVxuXHRcdGNvbnN0IHRoYXQgPSB0aGlzO1xuXHRcdGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wX29yZGVyJztcblx0XHRpZiAob2JqS2V5cy5sZW5ndGgpIHtcblx0XHRcdHRoYXQuaXN2b2ljZSA9IDJcblx0XHRcdHRoYXQuJGFwcGx5KClcblxuXHRcdH1lbHNle1xuXHRcdFx0dGhhdC5pc3ZvaWNlID0gMVxuXHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdH1cblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0Z29vZHM6IEpTT04uc3RyaW5naWZ5KHNpbmdsZUdvb2QpLFxuXHRcdFx0bW9iaWxlOiAnMTgwOTE4NDI4MzInLFxuXHRcdFx0dHJ1ZW5hbWU6IHRoYXQudXNlckFkZHJlc3MudXNlck5hbWUsXG5cdFx0XHRwcm92aW5jZTogdGhhdC51c2VyQWRkcmVzcy5wcm92aW5jZU5hbWUrdGhhdC51c2VyQWRkcmVzcy5jaXR5TmFtZSt0aGF0LnVzZXJBZGRyZXNzLmNvdW50eU5hbWUsXG5cdFx0XHRhZGRyZXNzOiB0aGF0LnVzZXJBZGRyZXNzLmRldGFpbEluZm8sXG5cdFx0XHQvLyBwb3N0Y29kZTogdGhhdC51c2VyQWRkcmVzcy5wb3N0YWxDb2RlLFxuXHRcdFx0aXN2b2ljZTogdGhhdC5pc3ZvaWNlLFxuXHRcdFx0aW50eXBlOiB0aGF0Lmlzdm9pY2UgPT0gMSA/ICcnOk51bWJlcih0aGF0LnRpY2tldE1lc3NhZ2UudHlwZSkrMSxcblx0XHRcdGludm9pY2VfdGl0bGU6IHRoYXQudGlja2V0TWVzc2FnZS50aXRsZT90aGF0LnRpY2tldE1lc3NhZ2UudGl0bGU6JycsXG5cdFx0XHRpbnZvaWNlX251bWJlcjogdGhhdC50aWNrZXRNZXNzYWdlLnRheE51bWJlcj90aGF0LnRpY2tldE1lc3NhZ2UudGF4TnVtYmVyOicnLFxuXHRcdFx0aW52b2ljZWFkZHJlc3M6IHRoYXQudGlja2V0TWVzc2FnZS5jb21wYW55QWRkcmVzcz90aGF0LnRpY2tldE1lc3NhZ2UuY29tcGFueUFkZHJlc3M6JycsXG5cdFx0XHRpbnZvaWNldGVsOiB0aGF0LnRpY2tldE1lc3NhZ2UudGVsZXBob25lP3RoYXQudGlja2V0TWVzc2FnZS50ZWxlcGhvbmU6JycsXG5cdFx0XHRpbnZpb2NlYmFuazogdGhhdC50aWNrZXRNZXNzYWdlLmJhbmtOYW1lP3RoYXQudGlja2V0TWVzc2FnZS5iYW5rTmFtZTonJyxcblx0XHRcdGludmlvY2ViYW5rbnVtYmVyOiB0aGF0LnRpY2tldE1lc3NhZ2UuYmFua0FjY291bnQ/dGhhdC50aWNrZXRNZXNzYWdlLmJhbmtBY2NvdW50OicnLFxuXHRcdFx0dHlwZToyXG5cdFx0fVxuXHRcdGF3YWl0IHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0aGVhZGVyOntcblx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgfSxcblx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0fSkudGhlbigocmVzKT0+e1xuXHRcdFx0aWYocmVzLmRhdGEuc3RhdHVzID09IDIwMCl7XG5cdFx0XHRcdHRoYXQub3JkZXJJZCA9IHJlcy5kYXRhLm1lc3NhZ2U7XG5cdFx0XHRcdHd4LnNldFN0b3JhZ2Uoe1xuXHRcdFx0XHRcdGtleTogJ29yZGVySWQnLFxuXHRcdFx0XHRcdGRhdGE6IHRoYXQub3JkZXJJZFxuXHRcdFx0XHR9KVxuXHRcdFx0aWYodGhhdC5vcmRlcklkLmxlbmd0aCAhPSAwKXtcblx0XHRcdFx0d3guc2hvd01vZGFsKHtcblx0XHRcdFx0XHR0aXRsZTogJ+aUr+S7mOaPkOekuicsXG5cdFx0XHRcdFx0Y29udGVudDogJ+aCqOehruiupOi/m+ihjOaUr+S7mOWQl++8nycsXG5cdFx0XHRcdFx0c2hvd0NhbmNlbDogdHJ1ZSxcblx0XHRcdFx0XHRjYW5jZWxUZXh0OiAn5Y+W5raIJyxcblx0XHRcdFx0XHRjYW5jZWxDb2xvcjogJyMwMDAwMDAnLFxuXHRcdFx0XHRcdGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcblx0XHRcdFx0XHRjb25maXJtQ29sb3I6ICcjM0NDNTFGJyxcblx0XHRcdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xuXHRcdFx0XHRcdFx0aWYocmVzLmNvbmZpcm0pe1xuXHRcdFx0XHRcdFx0XHR0aGF0LnNob3BQYXkoKTtcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHR0aGlzLmRlbGV0ZU9yZGVyKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoYXQuJGFwcGx5KClcblx0XHRcdH1lbHNlIGlmKHJlcy5kYXRhLnN0YXR1cyA9PSA0MjIpe1xuXHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdHRpdGxlOifllYblk4HlupPlrZjkuI3otrMnLFxuXHRcdFx0XHRcdGljb246J25vbmUnLFxuXHRcdFx0XHRcdGR1cmF0aW9uOjE1MDBcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KVxuICAgIH1cbiAgICAvL+WPkei1t+W+ruS/oeaUr+S7mFxuICAgIGFzeW5jIHNob3BQYXkoKXtcblx0XHRjb25zdCB0aGF0ID0gdGhpcztcblx0XHRsZXQgb3JkZXJJZCA9IHRoYXQub3JkZXJJZD90aGF0Lm9yZGVySWQ6dGhhdC5vcmRlckluZm8uaWQ7XG5cdFx0Y29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3Bfb3JkZXIvJyArIG9yZGVySWRcblx0XHRsZXQgZGF0YSA9IHt9O1xuXHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0U29uQ2FyZCkubGVuZ3RoICYmIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0Q291cG9uKS5sZW5ndGgpe1xuXHRcdFx0Ly/kuKTkuKrpg73mnIlcblx0XHRcdGRhdGEgPSB7XG5cdFx0XHRcdHBheW1lbnRfbWV0aG9kOnRoaXMucGF5VHlwZSxcblx0XHRcdFx0Y2FyZF91dWlkOnRoaXMuc2VsZWN0U29uQ2FyZC51dWlkLFxuXHRcdFx0XHRjb3Vwb25faWQ6dGhpcy5zZWxlY3RDb3Vwb24uaWRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihPYmplY3Qua2V5cyh0aGlzLnNlbGVjdENvdXBvbikubGVuZ3RoKXtcblx0XHRcdGRhdGEgPSB7XG5cdFx0XHRcdHBheW1lbnRfbWV0aG9kOnRoaXMucGF5VHlwZSxcblx0XHRcdFx0Y291cG9uX2lkOnRoaXMuc2VsZWN0Q291cG9uLmlkXG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoT2JqZWN0LmtleXModGhpcy5zZWxlY3RTb25DYXJkKS5sZW5ndGgpe1xuXHRcdFx0Ly/pgInmi6nkuobkvJrlkZjljaFcblx0XHRcdGRhdGEgPSB7XG5cdFx0XHRcdHBheW1lbnRfbWV0aG9kOnRoaXMucGF5VHlwZSxcblx0XHRcdFx0Y2FyZF91dWlkOnRoaXMuc2VsZWN0U29uQ2FyZC51dWlkXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRwYXltZW50X21ldGhvZDp0aGlzLnBheVR5cGUsXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGF3YWl0IHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHQnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICB9LFxuXHRcdFx0ZGF0YTpkYXRhXG5cdFx0fSkudGhlbigocmVzKT0+e1xuXHRcdFx0aWYocmVzLmRhdGEubWVzc2FnZS5sZW5ndGggPT0gMCl7XG5cdFx0XHRcdC8v5Lya5ZGY5Y2h5pSv5LuYXG5cdFx0XHRcdHd4LnJlZGlyZWN0VG8oe1xuXHRcdFx0XHRcdHVybDogJy4vZC9wYXltZW50U3VjY2Vzcydcblx0XHRcdFx0fSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGF0Lmpzc2RrID0gcmVzLmRhdGEubWVzc2FnZTtcblx0XHRcdFx0dGhhdC4kYXBwbHkoKVxuXHRcdFx0XHQvL+WPkei1t+W+ruS/oeaUr+S7mFxuXHRcdFx0XHR3eC5yZXF1ZXN0UGF5bWVudCh7XG5cdFx0XHRcdFx0J2FwcElkJzp0aGF0Lmpzc2RrLmFwcElkLFxuXHRcdFx0XHRcdCd0aW1lU3RhbXAnOiB0aGF0Lmpzc2RrLnRpbWVTdGFtcCxcblx0XHRcdFx0XHQnbm9uY2VTdHInOnRoYXQuanNzZGsubm9uY2VTdHIsXG5cdFx0XHRcdFx0J3BhY2thZ2UnOiB0aGF0Lmpzc2RrLnBhY2thZ2UsXG5cdFx0XHRcdFx0J3NpZ25UeXBlJzogdGhhdC5qc3Nkay5zaWduVHlwZSxcblx0XHRcdFx0XHQncGF5U2lnbic6IHRoYXQuanNzZGsucGF5U2lnbixcblx0XHRcdFx0XHRzdWNjZXNzOnJlcz0+e1xuXHRcdFx0XHRcdFx0d3gucmVkaXJlY3RUbyh7XG5cdFx0XHRcdFx0XHRcdHVybDogJy4vcGF5bWVudFN1Y2Nlc3MnXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZmFpbDpyZXM9Pntcblx0XHRcdFx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiAn5Y+W5raI5pSv5LuYJyxcblx0XHRcdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMTAwMCxcblx0XHRcdFx0XHRcdFx0bWFzazogZmFsc2UsXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdC8vIHRoaXMuZGVsZXRlT3JkZXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fSlcbiAgICB9XG5cdC8v6I635Y+W5Lya5ZGY5Y2h6YeR6aKdXG5cdGdldENhcmRNb25leSgpe1xuXHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IGFwaS5hcGlNYWxsKydhcGkvdXNlcl9jYXJkLycrIHRoaXMuc2hvcElkLFxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0fVxuXHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHRcdHJlcy5kYXRhLm1lc3NhZ2UubW9uZXkgPSBOdW1iZXIocmVzLmRhdGEubWVzc2FnZS5tb25leS8xMDApLnRvRml4ZWQoMilcblx0XHRcdHRoaXMuYW1vdW50ID0gcmVzLmRhdGEubWVzc2FnZS5tb25leTtcblx0XHRcdGlmKE51bWJlcih0aGlzLmFtb3VudCk+MCl7XG5cdFx0XHRcdHRoaXMucGF5VHlwZSA9IDJcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnBheVR5cGUgPSAxXG5cdFx0XHR9XG5cdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0fSk7XG5cdH1cblx0Ly8g55So5oi35Luj6YeR5Yi4XG5cdHVzZXJDb3Vwb25zKG9wdGlvbnMpe1xuXHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IGFwaS5hcGlNYWxsICsgJ2FwaS9teUNhcmQnLFxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0bWVyY2hhbnRfaWQ6dGhpcy5zaG9wSWQsXG5cdFx0XHRcdGdvb2RzOiBKU09OLnN0cmluZ2lmeSh0aGlzLmdvb2RJZCksXG5cdFx0XHRcdC8vIG1vbmV5OnRoaXMubW9uZXksXG5cdFx0XHRcdG9yZGVyX3R5cGU6MVxuXHRcdFx0fSxcblx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHQnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuXHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0fSxcblx0XHR9KS50aGVuKChyZXMpPT57XG5cdFx0XHR0aGlzLnVzZXJDb3Vwb24gPSByZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0aWYoIXJlcy5kYXRhLm1lc3NhZ2UubGVuZ3RoKXtcblx0XHRcdFx0dGhpcy5ub2RhdGEgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMubm9kYXRhID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0fVxuXHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdH0pOyAgICAgICAgICAgXG5cdH1cblx0Ly/nlKjmiLflj5bmtojmlK/ku5jlkI7osIPor6XliKDpmaTmjqXlj6Ncblx0ZGVsZXRlT3JkZXIoKXtcblx0XHR3ZXB5LnJlcXVlc3Qoe1xuXHRcdFx0dXJsOiBhcGkuYXBpTWFsbCArICdhcGkvc2hvcF9vcmRlci8nICsgdGhpcy5vcmRlcklkLFxuXHRcdFx0bWV0aG9kOiAnREVMRVRFJyxcblx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHQnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuXHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0fSxcblx0XHR9KS50aGVuKHJlcz0+e30pXG5cdH1cbiAgfVxuIl19