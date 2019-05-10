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

var _requestUrl = require('./../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../api/requestData.js');

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
			navigationBarTitleText: '确认订单'
		}, _this.data = {
			ballBottom: 120,
			ballRight: 30,
			screenHeight: 0,
			screenWidth: 0,
			orderPrice: '',
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
			//有无地址
			haveAddress: true,
			amount: 0,
			selectSonCard: null,
			selectCoupon: {},
			money: 0,
			goodId: [],
			userCoupon: [],
			shopId: '',
			Bury_Money: 0,
			selectGoods: [],
			Bury_Type: 0, //买单类型
			selectPayMent: [true, false],
			selectAddress: [true, false],
			localSpecialty: '',
			integralGoods: '',
			integralNums: ''
		}, _this.components = {}, _this.methods = {
			// 选择支付方式
			selectPayMent: function selectPayMent(index) {
				if (index == 0) {
					//微信支付
					this.selectPayMent[0] = true;
					this.selectPayMent[1] = false;
					if (this.integralGoods) {
						this.Bury_Type = 7;
					} else {
						this.Bury_Type = 0;
					}
				} else if (index == 1) {
					//会员卡支付
					this.selectPayMent[0] = false;
					this.selectPayMent[1] = true;
					if (this.integralGoods) {
						this.Bury_Type = 7;
					} else {
						this.Bury_Type = 2;
					}
				}
			},

			// 选择取货方式
			selectAddress: function selectAddress(index) {
				var _this2 = this;

				if (this.integralGoods) this.Bury_Type = 7;
				if (index == 0) {
					//物流
					this.selectAddress[0] = true;
					this.selectAddress[1] = false;
					wx.chooseAddress({
						success: function success(res) {
							_this2.userAddress = res;
							_this2.haveAddress = true;
							_this2.$apply();
							wx.setStorage({ key: 'address', data: res });
						}, fail: function fail(res) {
							wx.openSetting({});
						}
					});
				} else if (index == 1) {
					//自提
					this.selectAddress[0] = false;
					this.haveAddress = false;
					this.selectAddress[1] = true;
					this.userAddress = {};
					wx.removeStorageSync('address');
				}
			},
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

			// 下单
			confirmPayment: function confirmPayment() {
				var url = _requestUrl2.default.downOrder;
				var orderGoods = this.selectGoods;
				var data = {
					address: wx.getStorageSync('address') || '',
					p_id: _wepy2.default.$instance.globalData.p_id,
					m_id: this.shopId,
					m_TranType: this.localSpecialty ? this.localSpecialty : this.integralGoods ? 5 : 1, //判断交易类型 0 买单 1 自营商品下单 2-代购代销产品 3-外卖产品 5-积分产品
					Bury_Type: this.Bury_Type, //买单类型：0-微信支付 2-会员卡支付 3-微信+会员卡 4-微信+卡券 7-积分产品
					Bury_Money: this.Bury_Money,
					token: wx.getStorageSync('token'),
					product: orderGoods
				};
				(0, _requestData.requestData)(url, 'POST', data).then(function (res) {
					if (res.data.data.paytype == 1) {
						wx.showToast({
							title: '支付成功',
							icon: 'success',
							duration: 1500,
							success: function success(res) {
								setTimeout(function () {
									wx.redirectTo({
										url: './d/paymentSuccess'
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
												url: './d/paymentSuccess'
											});
										}, 1500);
									}
								});
							},
							'fail': function fail(res) {
								wx.showToast({
									title: '支付取消',
									icon: 'none',
									duration: 1500,
									mask: false
								});
							}
						});
					} else if (res.data.data.paytype == -1) {
						//支付失败
						wx.showToast({ title: res.data.data.msg, icon: 'none' });
					}
				});
			},

			//会员卡充值
			cardRecharge: function cardRecharge() {
				var item = { m_id: this.shopId };
				wx.navigateTo({
					url: '../../../packageMembershipCard/membershipCard/cardRecharge?item=' + JSON.stringify(item)
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(New, [{
		key: 'onLoad',
		value: function onLoad(options) {
			var _this3 = this;

			if (options.localSpecialty) {
				//代购代销产品
				this.localSpecialty = Number(options.localSpecialty) + 1;
			}
			this.shopId = options.m_id;
			this.Bury_Money = options.Bury_Money;
			if (options.integralGoods) {
				var integralNum = Number(options.goodsNum) * Number(options.point);
				this.integralGoods = options.integralGoods;
				this.integralNums = '+' + integralNum + '\u79EF\u5206';
				this.Bury_Type = 7;
			}

			//获取会员卡金额
			this.cardMessage();
			//获取屏幕宽高
			wx.getSystemInfo({
				success: function success(res) {
					_this3.screenHeight = res.windowHeight;
					_this3.screenWidth = res.windowWidth;
					_this3.$apply();
				}
			});
		}
	}, {
		key: 'cardMessage',

		// 获取会员卡余额
		value: function cardMessage() {
			var _this4 = this;

			var data = {
				p_id: _wepy2.default.$instance.globalData.p_id,
				m_id: this.shopId,
				type: "0",
				token: _wepy2.default.getStorageSync('token')
			};
			(0, _requestData.requestData)(_requestUrl2.default.cardMessage, 'POST', data).then(function (res) {
				_this4.amount = res.data.data[0].MemInfo.balance;
				_this4.$apply();
			});
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			var _this5 = this;

			//获取会员卡金额
			this.cardMessage();
			wx.getStorage({
				key: 'address',
				success: function success(res) {
					_this5.userAddress = res.data;
					_this5.$apply();
				}
			});
			wx.getStorage({
				key: 'userCode',
				success: function success(res) {
					_this5.userCode = res.data;
					_this5.$apply();
				}
			});
			wx.getStorage({
				key: 'address',
				success: function success(res) {
					_this5.userAddress = res.data;
					_this5.$apply();
				},
				fail: function fail() {
					_this5.haveAddress = false;
					_this5.$apply();
				}
			});
			wx.getStorage({
				key: 'deliverData',
				success: function success(res) {
					_this5.selectGoods = res.data;
					_this5.$apply();
				}
			});
		}
	}]);

	return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/confirmOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm1PcmRlci5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImJhbGxCb3R0b20iLCJiYWxsUmlnaHQiLCJzY3JlZW5IZWlnaHQiLCJzY3JlZW5XaWR0aCIsIm9yZGVyUHJpY2UiLCJ1c2VyQ29kZSIsInVzZXJJbmZvIiwib3JkZXJSZXN1bHQiLCJqc3NkayIsInVzZXJBZGRyZXNzIiwiY2FydEl0ZW1zIiwiVGlja2V0T3BlbmluZyIsInRpY2tldE1lc3NhZ2UiLCJtZXJjaGFudFRlbCIsImlzdm9pY2UiLCJwaWFvIiwiaGF2ZUFkZHJlc3MiLCJhbW91bnQiLCJzZWxlY3RTb25DYXJkIiwic2VsZWN0Q291cG9uIiwibW9uZXkiLCJnb29kSWQiLCJ1c2VyQ291cG9uIiwic2hvcElkIiwiQnVyeV9Nb25leSIsInNlbGVjdEdvb2RzIiwiQnVyeV9UeXBlIiwic2VsZWN0UGF5TWVudCIsInNlbGVjdEFkZHJlc3MiLCJsb2NhbFNwZWNpYWx0eSIsImludGVncmFsR29vZHMiLCJpbnRlZ3JhbE51bXMiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImluZGV4Iiwid3giLCJjaG9vc2VBZGRyZXNzIiwic3VjY2VzcyIsInJlcyIsIiRhcHBseSIsInNldFN0b3JhZ2UiLCJrZXkiLCJmYWlsIiwib3BlblNldHRpbmciLCJyZW1vdmVTdG9yYWdlU3luYyIsImJhbGxNb3ZlRXZlbnQiLCJlIiwidG91Y2hzIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJ4IiwieSIsImNvbmZpcm1QYXltZW50IiwidXJsIiwicmVxdWVzdFVybCIsImRvd25PcmRlciIsIm9yZGVyR29vZHMiLCJhZGRyZXNzIiwiZ2V0U3RvcmFnZVN5bmMiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJtX2lkIiwibV9UcmFuVHlwZSIsInRva2VuIiwicHJvZHVjdCIsInRoZW4iLCJwYXl0eXBlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRUaW1lb3V0IiwicmVkaXJlY3RUbyIsInJlcXVlc3RQYXltZW50IiwiYXBwSWQiLCJ0aW1lU3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwic2lnbiIsIm1hc2siLCJtc2ciLCJjYXJkUmVjaGFyZ2UiLCJpdGVtIiwibmF2aWdhdGVUbyIsIkpTT04iLCJzdHJpbmdpZnkiLCJvcHRpb25zIiwiTnVtYmVyIiwiaW50ZWdyYWxOdW0iLCJnb29kc051bSIsInBvaW50IiwiY2FyZE1lc3NhZ2UiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0Iiwid2luZG93V2lkdGgiLCJ0eXBlIiwiTWVtSW5mbyIsImJhbGFuY2UiLCJnZXRTdG9yYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsRzs7Ozs7Ozs7Ozs7Ozs7OEtBQ3BCQyxNLEdBQVM7QUFDUkMsMkJBQXdCO0FBRGhCLEcsUUFHVEMsSSxHQUFPO0FBQ05DLGVBQVksR0FETjtBQUVOQyxjQUFXLEVBRkw7QUFHTkMsaUJBQWMsQ0FIUjtBQUlOQyxnQkFBYSxDQUpQO0FBS05DLGVBQVcsRUFMTDtBQU1OQyxhQUFTLEVBTkg7QUFPTkMsYUFBUyxFQVBIO0FBUU47QUFDQUMsZ0JBQVksRUFUTjtBQVVOO0FBQ0FDLFVBQU0sRUFYQTtBQVlOO0FBQ0FDLGdCQUFZLEVBYk47QUFjTkMsY0FBVSxFQWRKO0FBZU47QUFDQUMsa0JBQWMsSUFoQlI7QUFpQk5DLGtCQUFjLEVBakJSO0FBa0JOO0FBQ0FDLGdCQUFZLEVBbkJOO0FBb0JOO0FBQ0FDLFlBQVEsRUFyQkY7QUFzQk47QUFDQUMsU0FBSyxLQXZCQztBQXdCTjtBQUNBQyxnQkFBWSxJQXpCTjtBQTBCTkMsV0FBTyxDQTFCRDtBQTJCTkMsa0JBQWMsSUEzQlI7QUE0Qk5DLGlCQUFhLEVBNUJQO0FBNkJO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QUFDQTtBQUxZLElBQWQ7QUFPQTs7OztFQTdQK0JzQixlQUFLMkMsSTs7a0JBQWpCNUcsRyIsImZpbGUiOiJjb25maXJtT3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblx0aW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblx0aW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi9hcGkvYXBpJ1xuXHRpbXBvcnQgdXRpbCBmcm9tICcuLi8uLi8uLi91dGlscy91dGlsJ1xuXG5cdGltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0VXJsJ1xuXHRpbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcblx0ZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3IGV4dGVuZHMgd2VweS5wYWdlIHtcblx0XHRjb25maWcgPSB7XG5cdFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn56Gu6K6k6K6i5Y2VJyxcblx0XHR9XG5cdFx0ZGF0YSA9IHtcblx0XHRcdGJhbGxCb3R0b206IDEyMCxcblx0XHRcdGJhbGxSaWdodDogMzAsXG5cdFx0XHRzY3JlZW5IZWlnaHQ6IDAsXG5cdFx0XHRzY3JlZW5XaWR0aDogMCxcblx0XHRcdG9yZGVyUHJpY2U6JycsXG5cdFx0XHR1c2VyQ29kZTonJyxcblx0XHRcdHVzZXJJbmZvOnt9LFxuXHRcdFx0Ly/orqLljZXkv6Hmga9cblx0XHRcdG9yZGVyUmVzdWx0OicnLFxuXHRcdFx0Ly/lvq7kv6HmlK/ku5jmiYDpnIDlj4LmlbBcblx0XHRcdGpzc2RrOnt9LFxuXHRcdFx0Ly/nlKjmiLflnLDlnYBcblx0XHRcdHVzZXJBZGRyZXNzOnt9LFxuXHRcdFx0Y2FydEl0ZW1zOltdLFxuXHRcdFx0Ly/lvIDnpahcblx0XHRcdFRpY2tldE9wZW5pbmc6dHJ1ZSxcblx0XHRcdHRpY2tldE1lc3NhZ2U6e30sXG5cdFx0XHQvL+WVhuaIt+eUteivnVxuXHRcdFx0bWVyY2hhbnRUZWw6JycsXG5cdFx0XHQvL+aYr+WQpuacieWPkeelqFxuXHRcdFx0aXN2b2ljZTonJyxcblx0XHRcdC8v5Y+R56Wo5bGV56S6XG5cdFx0XHRwaWFvOmZhbHNlLFxuXHRcdFx0Ly/mnInml6DlnLDlnYBcblx0XHRcdGhhdmVBZGRyZXNzOnRydWUsXG5cdFx0XHRhbW91bnQ6MCxcblx0XHRcdHNlbGVjdFNvbkNhcmQ6bnVsbCxcblx0XHRcdHNlbGVjdENvdXBvbjp7fSxcblx0XHRcdG1vbmV5OjAsXG5cdFx0XHRnb29kSWQ6W10sXG5cdFx0XHR1c2VyQ291cG9uOltdLFxuXHRcdFx0c2hvcElkOicnLFxuXHRcdFx0QnVyeV9Nb25leTowLFxuXHRcdFx0c2VsZWN0R29vZHM6W10sXG5cdFx0XHRCdXJ5X1R5cGU6MCwgLy/kubDljZXnsbvlnotcblx0XHRcdHNlbGVjdFBheU1lbnQ6W3RydWUsZmFsc2VdLFxuXHRcdFx0c2VsZWN0QWRkcmVzczpbdHJ1ZSxmYWxzZV0sXG5cdFx0XHRsb2NhbFNwZWNpYWx0eTonJyxcblx0XHRcdGludGVncmFsR29vZHM6JycsXG5cdFx0XHRpbnRlZ3JhbE51bXM6JycsXG5cdFx0fVxuXHRcdG9uTG9hZChvcHRpb25zKXtcblx0XHRcdGlmKG9wdGlvbnMubG9jYWxTcGVjaWFsdHkpeyAvL+S7o+i0reS7o+mUgOS6p+WTgVxuXHRcdFx0XHR0aGlzLmxvY2FsU3BlY2lhbHR5ID0gTnVtYmVyKG9wdGlvbnMubG9jYWxTcGVjaWFsdHkpICsxXG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNob3BJZCA9IG9wdGlvbnMubV9pZFxuXHRcdFx0dGhpcy5CdXJ5X01vbmV5ID0gb3B0aW9ucy5CdXJ5X01vbmV5XG5cdFx0XHRpZihvcHRpb25zLmludGVncmFsR29vZHMpe1xuXHRcdFx0XHRsZXQgaW50ZWdyYWxOdW0gPSBOdW1iZXIob3B0aW9ucy5nb29kc051bSkqTnVtYmVyKG9wdGlvbnMucG9pbnQpXG5cdFx0XHRcdHRoaXMuaW50ZWdyYWxHb29kcyA9IG9wdGlvbnMuaW50ZWdyYWxHb29kc1xuXHRcdFx0XHR0aGlzLmludGVncmFsTnVtcyA9IGArJHtpbnRlZ3JhbE51bX3np6/liIZgXG5cdFx0XHRcdHRoaXMuQnVyeV9UeXBlID0gN1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvL+iOt+WPluS8muWRmOWNoemHkeminVxuXHRcdFx0dGhpcy5jYXJkTWVzc2FnZSgpO1xuXHRcdFx0Ly/ojrflj5blsY/luZXlrr3pq5hcblx0XHRcdHd4LmdldFN5c3RlbUluZm8oe1xuXHRcdFx0XHRzdWNjZXNzOiAocmVzKT0+IHtcblx0XHRcdFx0XHR0aGlzLnNjcmVlbkhlaWdodCA9IHJlcy53aW5kb3dIZWlnaHRcblx0XHRcdFx0XHR0aGlzLnNjcmVlbldpZHRoID0gcmVzLndpbmRvd1dpZHRoXG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29tcG9uZW50cyA9IHt9XG5cdFx0bWV0aG9kcyA9IHtcblx0XHRcdC8vIOmAieaLqeaUr+S7mOaWueW8j1xuXHRcdFx0c2VsZWN0UGF5TWVudChpbmRleCl7XG5cdFx0XHRcdGlmKGluZGV4PT0wKXsgLy/lvq7kv6HmlK/ku5hcblx0XHRcdFx0XHR0aGlzLnNlbGVjdFBheU1lbnRbMF0gPSB0cnVlXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RQYXlNZW50WzFdID0gZmFsc2Vcblx0XHRcdFx0XHRpZih0aGlzLmludGVncmFsR29vZHMpIHtcblx0XHRcdFx0XHRcdHRoaXMuQnVyeV9UeXBlID0gN1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhpcy5CdXJ5X1R5cGUgPSAwXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZSBpZihpbmRleD09MSl7IC8v5Lya5ZGY5Y2h5pSv5LuYXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RQYXlNZW50WzBdID0gZmFsc2Vcblx0XHRcdFx0XHR0aGlzLnNlbGVjdFBheU1lbnRbMV0gPSB0cnVlXG5cdFx0XHRcdFx0aWYodGhpcy5pbnRlZ3JhbEdvb2RzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLkJ1cnlfVHlwZSA9IDdcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuQnVyeV9UeXBlID0gMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdC8vIOmAieaLqeWPlui0p+aWueW8j1xuXHRcdFx0c2VsZWN0QWRkcmVzcyhpbmRleCl7XG5cdFx0XHRcdGlmKHRoaXMuaW50ZWdyYWxHb29kcykgdGhpcy5CdXJ5X1R5cGUgPSA3XG5cdFx0XHRcdGlmKGluZGV4PT0wKXsgLy/nianmtYFcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEFkZHJlc3NbMF0gPSB0cnVlXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RBZGRyZXNzWzFdID0gZmFsc2Vcblx0XHRcdFx0XHR3eC5jaG9vc2VBZGRyZXNzKHtcblx0XHRcdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnVzZXJBZGRyZXNzID0gcmVzXG5cdFx0XHRcdFx0XHRcdHRoaXMuaGF2ZUFkZHJlc3MgPSB0cnVlXG5cdFx0XHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0XHRcdFx0d3guc2V0U3RvcmFnZSh7a2V5OidhZGRyZXNzJyxkYXRhOiByZXN9KVxuXHRcdFx0XHRcdFx0fSxmYWlsOiAocmVzKT0+IHtcblx0XHRcdFx0XHRcdFx0d3gub3BlblNldHRpbmcoe30pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2UgaWYoaW5kZXg9PTEpeyAvL+iHquaPkFxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0QWRkcmVzc1swXSA9IGZhbHNlXG5cdFx0XHRcdFx0dGhpcy5oYXZlQWRkcmVzcyA9IGZhbHNlXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RBZGRyZXNzWzFdID0gdHJ1ZVxuXHRcdFx0XHRcdHRoaXMudXNlckFkZHJlc3MgPSB7fVxuXHRcdFx0XHRcdHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCdhZGRyZXNzJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRiYWxsTW92ZUV2ZW50KGUpe1xuXHRcdFx0XHR2YXIgdG91Y2hzID0gZS50b3VjaGVzWzBdO1xuXHRcdFx0XHR2YXIgcGFnZVggPSB0b3VjaHMucGFnZVg7XG5cdFx0XHRcdHZhciBwYWdlWSA9IHRvdWNocy5wYWdlWTtcblx0XHRcdFx0Ly/pmLLmraLlnZDmoIfotornlYwsdmlld+WuvemrmOeahOS4gOWNilxuXHRcdFx0XHRpZiAocGFnZVggPCAyMSkgcmV0dXJuO1xuXHRcdFx0XHRpZiAocGFnZVggPiB0aGlzLnNjcmVlbldpZHRoIC0gMjEpIHJldHVybjtcblx0XHRcdFx0aWYgKHRoaXMuc2NyZWVuSGVpZ2h0IC0gcGFnZVkgPD0gMjEpIHJldHVybjtcblx0XHRcdFx0aWYgKHBhZ2VZIDw9IDIxKSByZXR1cm47XG5cdFx0XHRcdC8v55SocmlnaHTlkoxib3R0b20u5omA5Lul6ZyA6KaB5bCGcGFnZVggcGFnZVnovazmjaJcblx0XHRcdFx0dmFyIHggPSB0aGlzLnNjcmVlbldpZHRoIC0gcGFnZVggLSAyMTtcblx0XHRcdFx0dmFyIHkgPSB0aGlzLnNjcmVlbkhlaWdodCAtIHBhZ2VZIC0gMjE7XG5cdFx0XHRcdHRoaXMuYmFsbEJvdHRvbSA9IHksXG5cdFx0XHRcdHRoaXMuYmFsbFJpZ2h0ID0geFxuXHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHR9LFxuXHRcdFx0Ly8g5LiL5Y2VXG5cdFx0XHRjb25maXJtUGF5bWVudCgpe1xuXHRcdFx0XHRjb25zdCB1cmwgPSByZXF1ZXN0VXJsLmRvd25PcmRlcjtcblx0XHRcdFx0bGV0IG9yZGVyR29vZHMgPSB0aGlzLnNlbGVjdEdvb2RzO1xuXHRcdFx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0XHRcdGFkZHJlc3M6IHd4LmdldFN0b3JhZ2VTeW5jKCdhZGRyZXNzJykgfHwgJycsXG5cdFx0XHRcdFx0cF9pZDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuXHRcdFx0XHRcdG1faWQ6IHRoaXMuc2hvcElkLFxuXHRcdFx0XHRcdG1fVHJhblR5cGU6IHRoaXMubG9jYWxTcGVjaWFsdHk/dGhpcy5sb2NhbFNwZWNpYWx0eToodGhpcy5pbnRlZ3JhbEdvb2RzPzU6MSksXHQvL+WIpOaWreS6pOaYk+exu+WeiyAwIOS5sOWNlSAxIOiHquiQpeWVhuWTgeS4i+WNlSAyLeS7o+i0reS7o+mUgOS6p+WTgSAzLeWkluWNluS6p+WTgSA1Leenr+WIhuS6p+WTgVxuICAgICAgICBcdEJ1cnlfVHlwZTogdGhpcy5CdXJ5X1R5cGUsXHQvL+S5sOWNleexu+Wei++8mjAt5b6u5L+h5pSv5LuYIDIt5Lya5ZGY5Y2h5pSv5LuYIDMt5b6u5L+hK+S8muWRmOWNoSA0LeW+ruS/oSvljaHliLggNy3np6/liIbkuqflk4Fcblx0XHRcdFx0XHRCdXJ5X01vbmV5OiB0aGlzLkJ1cnlfTW9uZXksXG5cdFx0XHRcdFx0dG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuXHRcdFx0XHRcdHByb2R1Y3Q6IG9yZGVyR29vZHNcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG5cdFx0XHRcdFx0aWYocmVzLmRhdGEuZGF0YS5wYXl0eXBlID09IDEpe1xuXHRcdFx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6ICfmlK/ku5jmiJDlip8nLFxuXHRcdFx0XHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAxNTAwLFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOihyZXM9Pntcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT57XG5cdFx0XHRcdFx0XHRcdFx0XHR3eC5yZWRpcmVjdFRvKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dXJsOiAnLi9kL3BheW1lbnRTdWNjZXNzJ1xuXHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHR9LDE1MDApXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1lbHNlIGlmKHJlcy5kYXRhLmRhdGEucGF5dHlwZSA9PSAwKXtcblx0XHRcdFx0XHRcdGxldCBqc3NkayA9IHJlcy5kYXRhLmRhdGFcblx0XHRcdFx0XHRcdHd4LnJlcXVlc3RQYXltZW50KHtcblx0XHRcdFx0XHRcdFx0J2FwcElkJzpqc3Nkay5hcHBJZCxcblx0XHRcdFx0XHRcdFx0J3RpbWVTdGFtcCc6IGpzc2RrLnRpbWVTdGFtcC50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHQnbm9uY2VTdHInOiBqc3Nkay5ub25jZVN0cixcblx0XHRcdFx0XHRcdFx0J3BhY2thZ2UnOiBqc3Nkay5wYWNrYWdlLFxuXHRcdFx0XHRcdFx0XHQnc2lnblR5cGUnOiBqc3Nkay5zaWduVHlwZSxcblx0XHRcdFx0XHRcdFx0J3BheVNpZ24nOiBqc3Nkay5zaWduLFxuXHRcdFx0XHRcdFx0XHQnc3VjY2Vzcyc6cmVzPT57XG5cdFx0XHRcdFx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiAn5pSv5LuY5oiQ5YqfJyxcblx0XHRcdFx0XHRcdFx0XHRcdGljb246ICdzdWNjZXNzJyxcblx0XHRcdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAxNTAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0c3VjY2VzczoocmVzPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9Pntcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR3eC5yZWRpcmVjdFRvKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVybDogJy4vZC9wYXltZW50U3VjY2Vzcydcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LDE1MDApXG5cdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdCdmYWlsJzpyZXM9Pntcblx0XHRcdFx0XHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6ICfmlK/ku5jlj5bmtognLFxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDE1MDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRtYXNrOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9ZWxzZSBpZiAocmVzLmRhdGEuZGF0YS5wYXl0eXBlID09IC0xKXsgLy/mlK/ku5jlpLHotKVcblx0XHRcdFx0XHRcdHd4LnNob3dUb2FzdCh7dGl0bGU6IHJlcy5kYXRhLmRhdGEubXNnLGljb246ICdub25lJyx9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0Ly/kvJrlkZjljaHlhYXlgLxcblx0XHRcdGNhcmRSZWNoYXJnZSgpe1xuXHRcdFx0XHRsZXQgaXRlbSA9IHsgbV9pZDp0aGlzLnNob3BJZCB9O1xuXHRcdFx0XHR3eC5uYXZpZ2F0ZVRvKHtcblx0XHRcdFx0XHR1cmw6ICcuLi8uLi8uLi9wYWNrYWdlTWVtYmVyc2hpcENhcmQvbWVtYmVyc2hpcENhcmQvY2FyZFJlY2hhcmdlP2l0ZW09JyArIEpTT04uc3RyaW5naWZ5KGl0ZW0pXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyDojrflj5bkvJrlkZjljaHkvZnpop1cblx0XHRjYXJkTWVzc2FnZSgpe1xuXHRcdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRcdHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcblx0XHRcdFx0bV9pZDogdGhpcy5zaG9wSWQsXG5cdFx0XHRcdHR5cGU6XCIwXCIsXG5cdFx0XHRcdHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuXHRcdFx0fTtcblx0XHRcdHJlcXVlc3REYXRhKHJlcXVlc3RVcmwuY2FyZE1lc3NhZ2UsJ1BPU1QnLGRhdGEpLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0dGhpcy5hbW91bnQgPSByZXMuZGF0YS5kYXRhWzBdLk1lbUluZm8uYmFsYW5jZVxuXHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRvblNob3coKXtcblx0XHRcdC8v6I635Y+W5Lya5ZGY5Y2h6YeR6aKdXG5cdFx0XHR0aGlzLmNhcmRNZXNzYWdlKCk7XG5cdFx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdFx0a2V5OiAnYWRkcmVzcycsXG5cdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT4ge1xuXHRcdFx0XHRcdHRoaXMudXNlckFkZHJlc3MgPSByZXMuZGF0YVxuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0fSBcblx0XHRcdH0pXG5cdFx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdFx0a2V5Oid1c2VyQ29kZScsXG5cdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT4ge1xuXHRcdFx0XHRcdHRoaXMudXNlckNvZGUgPSByZXMuZGF0YVxuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0XHRrZXk6J2FkZHJlc3MnLFxuXHRcdFx0XHRzdWNjZXNzOiAocmVzKT0+IHtcblx0XHRcdFx0XHR0aGlzLnVzZXJBZGRyZXNzPSByZXMuZGF0YVxuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0fSxcblx0XHRcdFx0ZmFpbDooKT0+e1xuXHRcdFx0XHRcdHRoaXMuaGF2ZUFkZHJlc3MgPSBmYWxzZVxuXHRcdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdHd4LmdldFN0b3JhZ2Uoe1xuXHRcdFx0XHRrZXk6ICdkZWxpdmVyRGF0YScsXG5cdFx0XHRcdHN1Y2Nlc3M6IHJlcz0+IHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEdvb2RzID0gcmVzLmRhdGE7XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuIl19