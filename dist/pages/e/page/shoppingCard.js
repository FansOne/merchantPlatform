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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = New.__proto__ || Object.getPrototypeOf(New)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
			carts: [], // 购物车列表
			hasList: false, // 列表是否有数据
			totalPrice: 0, // 总价，初始为0
			selectAllStatus: false, // 全选状态
			//推荐商品
			commodityMessage: [],
			//购物车添加商品列表
			cartItems: [],
			//购物车是否为空
			noBuy: true,
			//选择支付的商品
			selectBuy: [],
			userId: '',
			goodsId: '',
			judgeLogin: false,
			normalsend: 1,
			sendprice: 1,
			token: ''
		}, _this.config = {
			navigationBarTitleText: '购物车'
		}, _this.watch = {
			cartItems: function cartItems(newValue, oldValue) {
				if (!newValue.length) {
					this.noBuy = true;
					this.$apply();
				}
			}
		}, _this.components = {}, _this.methods = {
			selectList: function selectList(e) {
				var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
				var cartItems = this.cartItems; // 获取购物车列表
				var selected = cartItems[index].selected; // 获取当前商品的选中状态
				cartItems[index].selected = !selected; // 改变状态
				this.cartItems = cartItems;
				this.getTotalPrice(selected); // 重新获取总价
			},
			selectAll: function selectAll(e) {
				var selectAllStatus = this.selectAllStatus; // 是否全选状态
				selectAllStatus = !selectAllStatus;
				var cartItems = this.cartItems;

				for (var i = 0; i < cartItems.length; i++) {
					cartItems[i].selected = selectAllStatus; // 改变所有商品状态
				}
				this.selectAllStatus = selectAllStatus, this.cartItems = cartItems, this.getTotalPrice(!this.selectAllStatus); // 重新获取总价
			},

			// 增加数量
			addCount: function addCount(e) {
				var index = e.currentTarget.dataset.index;
				var cartItems = this.cartItems;
				var quantity = cartItems[index].quantity;
				quantity = quantity + 1;
				cartItems[index].quantity = quantity;
				this.cartItems = cartItems;
				var url = _api2.default.apiMall + 'api/shopping_cart/' + e.currentTarget.dataset.id;
				var data = {
					type: 1,
					num: 1
				};
				_wepy2.default.request({
					url: url,
					method: 'PUT',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						'Accept': 'application/vnd.lingmo.v1+json',
						'Authorization': 'Bearer ' + this.token
					},
					data: data
				}).then(function (res) {
					// this.getShoppingCarGoods();
				});
				this.getTotalPrice();
			},

			// 减少数量
			minusCount: function minusCount(e) {
				var index = e.currentTarget.dataset.index;
				var cartItems = this.cartItems;
				var quantity = cartItems[index].quantity;
				if (quantity <= 1) {
					return false;
				}
				quantity = quantity - 1;
				cartItems[index].quantity = quantity;
				this.cartItems = cartItems;
				var url = _api2.default.apiMall + 'api/shopping_cart/' + e.currentTarget.dataset.id;
				var data = {
					type: 2,
					num: 1
				};
				_wepy2.default.request({
					url: url,
					method: 'PUT',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						'Accept': 'application/vnd.lingmo.v1+json',
						'Authorization': 'Bearer ' + this.token
					},
					data: data
				}).then(function (res) {
					// this.getShoppingCarGoods();
				});
				this.getTotalPrice();
			},
			deleteList: function deleteList(e) {
				var index = e.currentTarget.dataset.index;
				var cartItems = this.cartItems;
				cartItems.splice(index, 1); // 删除购物车列表里这个商品
				this.cartItems = cartItems;
				if (!cartItems.length) {
					// 如果购物车为空
					this.hasList = false; // 修改标识为false，显示购物车为空页面
				} else {
					// 如果不为空
					this.getTotalPrice(); // 重新计算总价格
				}
				var url = _api2.default.apiMall + 'api/shopping_cart/' + e.currentTarget.dataset.id;
				_wepy2.default.request({
					url: url,
					method: 'DELETE',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
						'Accept': 'application/vnd.lingmo.v1+json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then(function (res) {});
			},
			jiesuan: function jiesuan() {
				this.judgeUserLogin();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(New, [{
		key: 'onLoad',
		value: function onLoad(options) {
			var _this2 = this;

			this.shopId = options.shopId;
			//获取token
			var token = wx.getStorageSync("access_token");
			this.token = token.access_token;
			this.$apply();
			wx.getStorage({
				key: 'normalsend',
				success: function success(res) {
					_this2.normalsend = res.data;
					_this2.$apply();
				}
			});
			wx.getStorage({
				key: 'sendPrice',
				success: function success(res) {
					_this2.sendprice = res.data;
					_this2.$apply();
				}
			});
			if (this.noBuy == false) {
				wx.showNavigationBarLoading();
			}
		}
		//调接口将商品添加到购物车

	}, {
		key: 'getShoppingCar',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var url, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								url = _api2.default.apiMall + 'api/shopping_cart';
								data = {
									m_id: this.shopId
								};
								_context.next = 4;
								return _wepy2.default.request({
									url: url,
									method: 'GET',
									header: {
										'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
										'Accept': 'application/vnd.lingmo.v1+json',
										'Authorization': 'Bearer ' + this.token
									},
									data: data
								}).then(function (res) {});

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getShoppingCar() {
				return _ref2.apply(this, arguments);
			}

			return getShoppingCar;
		}()
	}, {
		key: 'getShoppingCarGoods',
		value: function getShoppingCarGoods() {
			var _this3 = this;

			var url = _api2.default.apiMall + 'api/shopping_cart';
			var data = {
				m_id: this.shopId
			};
			_wepy2.default.request({
				url: url,
				method: 'GET',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'Accept': 'application/vnd.lingmo.v1+json',
					'Authorization': 'Bearer ' + this.token
				},
				data: data
			}).then(function (res) {
				_this3.cartItems = res.data.message;
				_this3.cartItems.forEach(function (item, index) {
					item.selected = false;
				});
				_this3.$apply();
				if (_this3.cartItems.length == 0) {
					_this3.noBuy = true;
					_this3.$apply();
				} else {
					_this3.noBuy = false;
					_this3.$apply();
				}
				if (_this3.cartItems) {
					_this3.getTotalPrice();
				}
			});
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			var _this4 = this;

			//获取token
			var token = wx.getStorageSync("access_token");
			this.token = token.access_token;

			var that = this;
			that.hasList = true;
			this.getShoppingCarGoods();
			//清空所选择支付商品数组
			this.selectBuy.splice(0, this.selectBuy.length);
			// wx.removeStorage({key: 'selectBuy'});
			wx.getStorage({
				key: 'userId',
				success: function success() {
					_this4.judgeLogin = true;
					_this4.$apply();
				},
				fail: function fail() {
					_this4.judgeLogin = false;
					_this4.$apply();
				}
			});
		}
	}, {
		key: 'onHide',
		value: function onHide() {
			this.selectAllStatus = false, this.totalPrice = 0;
			this.$apply();
		}
		//监听购物车是否添加商品

	}, {
		key: 'getRandomGoods',

		//获取推荐商品
		value: function getRandomGoods() {
			var that = this;
			var url = _api2.default.apiMall + '/shop/randomGoods';
			var data = {
				merchantId: _wepy2.default.$instance.globalData.payMessage.merchantId
			};
			_wepy2.default.request({
				url: url,
				method: 'POST',
				data: data
			}).then(function (res) {
				wx.hideNavigationBarLoading();
				that.commodityMessage = res.data.data;
				that.$apply();
			});
		}
		//计算总价

	}, {
		key: 'getTotalPrice',
		value: function getTotalPrice(selected) {
			var cartItems = this.cartItems; // 获取购物车列表
			var total = 0;
			for (var i = 0; i < cartItems.length; i++) {
				// 循环列表得到每个数据
				if (cartItems[i].selected) {
					// 判断选中才会计算价格
					total += cartItems[i].quantity * cartItems[i].price / 100; // 所有价格加起来
				}
			}
			this.cartItems = cartItems, // 最后赋值到data中渲染到页面
			this.totalPrice = Number(total.toFixed(2)) + Number(this.normalsend);
			if (selected) {
				this.totalPrice = Number(this.totalPrice) - Number(this.normalsend);
				this.$apply();
			}
		}
	}, {
		key: 'judgeUserLogin',

		//用户登录成功执行
		value: function judgeUserLogin() {
			var that = this;
			var nowPrice = that.totalPrice;
			var cartItems = that.cartItems;
			var sendprice = that.sendprice;
			var normalsend = that.normalsend;
			for (var attr in cartItems) {
				if (cartItems[attr].selected) {
					that.selectBuy.push(cartItems[attr]);
					that.$apply();
				}
			}
			if (nowPrice <= that.sendprice) {
				wx.showToast({
					title: '请选择商品',
					icon: 'none',
					duration: 2000
				});
			} else {
				if (nowPrice >= sendprice) {
					wx.navigateTo({
						url: "confirmOrder_shoppingCar?shopId=" + this.shopId
					});
				} else {
					wx.showToast({
						title: '未达到起送价格',
						icon: 'none',
						duration: 2000,
						mask: false
					});
				}
			}
			wx.setStorage({
				key: 'selectBuy',
				data: that.selectBuy
			});
			wx.setStorage({
				key: 'totalPrice',
				data: that.totalPrice - normalsend
			});
		}
	}]);

	return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/shoppingCard'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3BwaW5nQ2FyZC5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb21wb25lbnRzIiwiZGF0YSIsImNhcnRzIiwiaGFzTGlzdCIsInRvdGFsUHJpY2UiLCJzZWxlY3RBbGxTdGF0dXMiLCJjb21tb2RpdHlNZXNzYWdlIiwiY2FydEl0ZW1zIiwibm9CdXkiLCJzZWxlY3RCdXkiLCJ1c2VySWQiLCJnb29kc0lkIiwianVkZ2VMb2dpbiIsIm5vcm1hbHNlbmQiLCJzZW5kcHJpY2UiLCJ0b2tlbiIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJsZW5ndGgiLCIkYXBwbHkiLCJtZXRob2RzIiwic2VsZWN0TGlzdCIsImUiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0Iiwic2VsZWN0ZWQiLCJnZXRUb3RhbFByaWNlIiwic2VsZWN0QWxsIiwiaSIsImFkZENvdW50IiwicXVhbnRpdHkiLCJ1cmwiLCJhcGkiLCJhcGlNYWxsIiwiaWQiLCJ0eXBlIiwibnVtIiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwibWludXNDb3VudCIsImRlbGV0ZUxpc3QiLCJzcGxpY2UiLCJqaWVzdWFuIiwianVkZ2VVc2VyTG9naW4iLCJvcHRpb25zIiwic2hvcElkIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwibV9pZCIsIm1lc3NhZ2UiLCJmb3JFYWNoIiwiaXRlbSIsInRoYXQiLCJnZXRTaG9wcGluZ0Nhckdvb2RzIiwiZmFpbCIsIm1lcmNoYW50SWQiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwicGF5TWVzc2FnZSIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInRvdGFsIiwicHJpY2UiLCJOdW1iZXIiLCJ0b0ZpeGVkIiwibm93UHJpY2UiLCJhdHRyIiwicHVzaCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibmF2aWdhdGVUbyIsIm1hc2siLCJzZXRTdG9yYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7OzhLQUNwQkMsVSxHQUFhLEUsUUFFWkMsSSxHQUFPO0FBQ05DLFVBQU0sRUFEQSxFQUNrQjtBQUNyQkMsWUFBUSxLQUZMLEVBRXFCO0FBQ3hCQyxlQUFZLENBSFQsRUFHZTtBQUNsQkMsb0JBQWdCLEtBSmIsRUFJc0I7QUFDekI7QUFDQUMscUJBQWlCLEVBTmQ7QUFPSjtBQUNBQyxjQUFVLEVBUk47QUFTSjtBQUNBQyxVQUFNLElBVkY7QUFXSjtBQUNBQyxjQUFVLEVBWk47QUFhSkMsV0FBTyxFQWJIO0FBY0pDLFlBQVEsRUFkSjtBQWVKQyxlQUFXLEtBZlA7QUFnQlRDLGVBQVcsQ0FoQkY7QUFpQlRDLGNBQVUsQ0FqQkQ7QUFrQlRDLFVBQU07QUFsQkcsRyxRQW9CUEMsTSxHQUFTO0FBQ1BDLDJCQUF3QjtBQURqQixHLFFBMEdUQyxLLEdBQVE7QUFDTFgsWUFESyxxQkFDTVksUUFETixFQUNnQkMsUUFEaEIsRUFDMEI7QUFDM0IsUUFBRyxDQUFDRCxTQUFTRSxNQUFiLEVBQW9CO0FBQ25CLFVBQUtiLEtBQUwsR0FBYSxJQUFiO0FBQ0EsVUFBS2MsTUFBTDtBQUNBO0FBQ0o7QUFOSSxHLFFBeUNSdEIsVSxHQUFhLEUsUUFDYnVCLE8sR0FBVTtBQUNUQyxhQURTLHNCQUNFQyxDQURGLEVBQ0s7QUFDYixRQUFNQyxRQUFRRCxFQUFFRSxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkYsS0FBdEMsQ0FEYSxDQUNxQztBQUNsRCxRQUFJbkIsWUFBWSxLQUFLQSxTQUFyQixDQUZhLENBRXdDO0FBQ3JELFFBQU1zQixXQUFXdEIsVUFBVW1CLEtBQVYsRUFBaUJHLFFBQWxDLENBSGEsQ0FHd0M7QUFDckR0QixjQUFV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QUlHOzs7O0VBNVQ4QjRCLGVBQUs4QyxJOztrQkFBakJ4RixHIiwiZmlsZSI6InNob3BwaW5nQ2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uL2FwaS9hcGknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgXHRjb21wb25lbnRzID0ge1xuICBcdH1cbiAgICBkYXRhID0ge1xuICAgIFx0Y2FydHM6W10sICAgICAgICAgICAgICAgLy8g6LSt54mp6L2m5YiX6KGoXG4gICAgICAgIGhhc0xpc3Q6ZmFsc2UsICAgICAgICAgIC8vIOWIl+ihqOaYr+WQpuacieaVsOaNrlxuICAgICAgICB0b3RhbFByaWNlOiAwLCAgICAvLyDmgLvku7fvvIzliJ3lp4vkuLowXG4gICAgICAgIHNlbGVjdEFsbFN0YXR1czpmYWxzZSwgICAvLyDlhajpgInnirbmgIFcbiAgICAgICAgLy/mjqjojZDllYblk4FcbiAgICAgICAgY29tbW9kaXR5TWVzc2FnZTpbXSxcbiAgICAgIFx0Ly/otK3nianovabmt7vliqDllYblk4HliJfooahcbiAgICAgIFx0Y2FydEl0ZW1zOltdLFxuICAgICAgXHQvL+i0reeJqei9puaYr+WQpuS4uuepulxuICAgICAgXHRub0J1eTp0cnVlLFxuICAgICAgXHQvL+mAieaLqeaUr+S7mOeahOWVhuWTgVxuICAgICAgXHRzZWxlY3RCdXk6W10sXG4gICAgICBcdHVzZXJJZDonJyxcbiAgICAgIFx0Z29vZHNJZDonJyxcbiAgICAgIFx0anVkZ2VMb2dpbjpmYWxzZSxcblx0XHRub3JtYWxzZW5kOjEsXG5cdFx0c2VuZHByaWNlOjEsXG5cdFx0dG9rZW46JydcbiAgICB9XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i0reeJqei9picsXG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKXtcblx0XHR0aGlzLnNob3BJZCA9IG9wdGlvbnMuc2hvcElkO1xuXHRcdC8v6I635Y+WdG9rZW5cblx0XHRsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcblx0XHR0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuXHRcdHRoaXMuJGFwcGx5KCk7XG5cdFx0d3guZ2V0U3RvcmFnZSh7XG5cdFx0XHRrZXk6ICdub3JtYWxzZW5kJyxcblx0XHRcdHN1Y2Nlc3M6IHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMubm9ybWFsc2VuZCA9IHJlcy5kYXRhXG5cdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdH1cblx0XHR9KTtcblx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdGtleTogJ3NlbmRQcmljZScsXG5cdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNlbmRwcmljZSA9IHJlcy5kYXRhXG5cdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdH1cblx0XHR9KTtcbiAgICBcdGlmKHRoaXMubm9CdXkgPT0gZmFsc2Upe1xuICAgIFx0XHR3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgIFx0fVxuXHR9XG5cdC8v6LCD5o6l5Y+j5bCG5ZWG5ZOB5re75Yqg5Yiw6LSt54mp6L2mXG5cdGFzeW5jIGdldFNob3BwaW5nQ2FyKCl7XG5cdFx0Y29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3BwaW5nX2NhcnQnO1xuXHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRtX2lkOiB0aGlzLnNob3BJZCxcblx0XHR9XG5cdFx0YXdhaXQgd2VweS5yZXF1ZXN0KHtcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0bWV0aG9kOiAnR0VUJyxcblx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdCdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG5cdFx0XHRcdCdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuXHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0fSwgXG5cdFx0XHRkYXRhOiBkYXRhLFxuXHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHR9KVxuXHR9XG5cdGdldFNob3BwaW5nQ2FyR29vZHMoKXtcblx0XHRjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvc2hvcHBpbmdfY2FydCdcblx0XHRjb25zdCBkYXRhID0ge1xuXHRcdFx0bV9pZDogdGhpcy5zaG9wSWQsXG5cdFx0fVxuXHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHR1cmw6IHVybCxcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHQnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuXHRcdFx0XHQnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcblx0XHRcdFx0J0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cblx0XHRcdH0sIFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHR9KS50aGVuKChyZXMpPT57XG5cdFx0XHR0aGlzLmNhcnRJdGVtcyA9cmVzLmRhdGEubWVzc2FnZVxuXHRcdFx0dGhpcy5jYXJ0SXRlbXMuZm9yRWFjaCgoaXRlbSxpbmRleCk9Pntcblx0XHRcdFx0aXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0fSlcblx0XHQgICAgdGhpcy4kYXBwbHkoKVxuXHRcdCAgICBpZiAodGhpcy5jYXJ0SXRlbXMubGVuZ3RoID09IDApIHtcblx0XHQgICAgXHR0aGlzLm5vQnV5ID10cnVlXG5cdFx0ICAgIFx0dGhpcy4kYXBwbHkoKVxuXHRcdCAgICB9ZWxzZXtcblx0XHQgICAgXHR0aGlzLm5vQnV5ID1mYWxzZVxuXHRcdCAgICBcdHRoaXMuJGFwcGx5KClcblx0XHQgICAgfVxuXHRcdFx0aWYodGhpcy5jYXJ0SXRlbXMpe1xuXHRcdFx0XHR0aGlzLmdldFRvdGFsUHJpY2UoKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbiAgICBvblNob3coKSB7XG5cdFx0Ly/ojrflj5Z0b2tlblxuXHRcdGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG5cbiAgICBcdGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGF0Lmhhc0xpc3QgPSB0cnVlO1xuXHRcdHRoaXMuZ2V0U2hvcHBpbmdDYXJHb29kcygpO1xuXHRcdC8v5riF56m65omA6YCJ5oup5pSv5LuY5ZWG5ZOB5pWw57uEXG5cdFx0dGhpcy5zZWxlY3RCdXkuc3BsaWNlKDAsdGhpcy5zZWxlY3RCdXkubGVuZ3RoKVxuXHRcdC8vIHd4LnJlbW92ZVN0b3JhZ2Uoe2tleTogJ3NlbGVjdEJ1eSd9KTtcblx0XHR3eC5nZXRTdG9yYWdlKHtcbiAgICBcdFx0a2V5Oid1c2VySWQnLFxuICAgIFx0XHRzdWNjZXNzOigpPT57XG4gICAgXHRcdFx0dGhpcy5qdWRnZUxvZ2luID0gdHJ1ZVxuICAgIFx0XHRcdHRoaXMuJGFwcGx5KClcbiAgICBcdFx0fSxcbiAgICBcdFx0ZmFpbDooKT0+e1xuICAgIFx0XHRcdHRoaXMuanVkZ2VMb2dpbiA9IGZhbHNlXG4gICAgXHRcdFx0dGhpcy4kYXBwbHkoKVxuICAgIFx0XHR9XG4gICAgXHR9KVxuICBcdH1cbiAgICBvbkhpZGUoKXtcbiAgICBcdHRoaXMuc2VsZWN0QWxsU3RhdHVzID0gZmFsc2UsXG4gICAgXHR0aGlzLnRvdGFsUHJpY2UgPSAwXG4gICAgXHR0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIC8v55uR5ZCs6LSt54mp6L2m5piv5ZCm5re75Yqg5ZWG5ZOBXG4gICAgd2F0Y2ggPSB7XG4gICAgICBcdGNhcnRJdGVtcyAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgXHRpZighbmV3VmFsdWUubGVuZ3RoKXtcbiAgICAgICAgICBcdFx0dGhpcy5ub0J1eSA9IHRydWVcbiAgICAgICAgICBcdFx0dGhpcy4kYXBwbHkoKVxuICAgICAgICAgIFx0fVxuICAgICAgXHR9XG4gIFx0fVxuICAgIC8v6I635Y+W5o6o6I2Q5ZWG5ZOBXG4gICAgZ2V0UmFuZG9tR29vZHMoKXtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnL3Nob3AvcmFuZG9tR29vZHMnO1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgbWVyY2hhbnRJZDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wYXlNZXNzYWdlLm1lcmNoYW50SWQsXG4gICAgICB9XG4gICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICBcdHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgIHRoYXQuY29tbW9kaXR5TWVzc2FnZSA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy/orqHnrpfmgLvku7dcbiAgICBnZXRUb3RhbFByaWNlKHNlbGVjdGVkKSB7XG5cdCAgICBsZXQgY2FydEl0ZW1zID0gdGhpcy5jYXJ0SXRlbXM7ICAgICAgICAgICAgICAgICAgLy8g6I635Y+W6LSt54mp6L2m5YiX6KGoXG5cdCAgICBsZXQgdG90YWwgPSAwO1xuXHQgICAgZm9yKGxldCBpID0gMDsgaTxjYXJ0SXRlbXMubGVuZ3RoOyBpKyspIHsgICAgICAgICAvLyDlvqrnjq/liJfooajlvpfliLDmr4/kuKrmlbDmja5cblx0ICAgICAgICBpZihjYXJ0SXRlbXNbaV0uc2VsZWN0ZWQpIHsgICAgICAgICAgICAgICAgICAgLy8g5Yik5pat6YCJ5Lit5omN5Lya6K6h566X5Lu35qC8XG5cdCAgICAgICAgICAgIHRvdGFsICs9IGNhcnRJdGVtc1tpXS5xdWFudGl0eSAqIGNhcnRJdGVtc1tpXS5wcmljZS8xMDA7ICAgICAvLyDmiYDmnInku7fmoLzliqDotbfmnaVcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB0aGlzLmNhcnRJdGVtcyA9ICBjYXJ0SXRlbXMsICAgICAgICAgICAgICAgICAgICAgLy8g5pyA5ZCO6LWL5YC85YiwZGF0YeS4rea4suafk+WIsOmhtemdolxuXHQgICAgdGhpcy50b3RhbFByaWNlID0gTnVtYmVyKHRvdGFsLnRvRml4ZWQoMikpK051bWJlcih0aGlzLm5vcm1hbHNlbmQpXG5cdFx0aWYoc2VsZWN0ZWQpe1xuXHRcdFx0dGhpcy50b3RhbFByaWNlID0gTnVtYmVyKHRoaXMudG90YWxQcmljZSkgLSBOdW1iZXIodGhpcy5ub3JtYWxzZW5kKVxuXHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdH1cblx0fVxuICAgIGNvbXBvbmVudHMgPSB7fVxuICAgIG1ldGhvZHMgPSB7XG4gICAgXHRzZWxlY3RMaXN0KGUpIHtcblx0XHQgICAgY29uc3QgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDsgICAgXHRcdC8vIOiOt+WPlmRhdGEtIOS8oOi/m+adpeeahGluZGV4XG5cdFx0ICAgIGxldCBjYXJ0SXRlbXMgPSB0aGlzLmNhcnRJdGVtczsgICAgICAgICAgICAgICAgICAgIFx0XHQvLyDojrflj5botK3nianovabliJfooahcblx0XHQgICAgY29uc3Qgc2VsZWN0ZWQgPSBjYXJ0SXRlbXNbaW5kZXhdLnNlbGVjdGVkOyAgICAgICAgIFx0Ly8g6I635Y+W5b2T5YmN5ZWG5ZOB55qE6YCJ5Lit54q25oCBXG5cdFx0ICAgIGNhcnRJdGVtc1tpbmRleF0uc2VsZWN0ZWQgPSAhc2VsZWN0ZWQ7ICAgICAgICAgICAgICBcdC8vIOaUueWPmOeKtuaAgVxuXHRcdCAgICB0aGlzLmNhcnRJdGVtcyA9IGNhcnRJdGVtc1xuXHRcdCAgICB0aGlzLmdldFRvdGFsUHJpY2Uoc2VsZWN0ZWQpOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmHjeaWsOiOt+WPluaAu+S7t1xuXHRcdH0sXG5cdFx0c2VsZWN0QWxsKGUpIHtcblx0XHQgICAgbGV0IHNlbGVjdEFsbFN0YXR1cyA9IHRoaXMuc2VsZWN0QWxsU3RhdHVzOyAgICBcdFx0XHQvLyDmmK/lkKblhajpgInnirbmgIFcblx0XHQgICAgc2VsZWN0QWxsU3RhdHVzID0gIXNlbGVjdEFsbFN0YXR1cztcblx0XHQgICAgbGV0IGNhcnRJdGVtcyA9IHRoaXMuY2FydEl0ZW1zO1xuXG5cdFx0ICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FydEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgICAgICBjYXJ0SXRlbXNbaV0uc2VsZWN0ZWQgPSBzZWxlY3RBbGxTdGF0dXM7ICAgICAgICAgICAgLy8g5pS55Y+Y5omA5pyJ5ZWG5ZOB54q25oCBXG5cdFx0ICAgIH1cblx0XHQgICAgdGhpcy5zZWxlY3RBbGxTdGF0dXMgPSBzZWxlY3RBbGxTdGF0dXMsXG5cdCAgICAgICAgdGhpcy5jYXJ0SXRlbXMgPSBjYXJ0SXRlbXMsXG5cdFx0ICAgIHRoaXMuZ2V0VG90YWxQcmljZSghdGhpcy5zZWxlY3RBbGxTdGF0dXMpICAgICAgICAgICAgICAgLy8g6YeN5paw6I635Y+W5oC75Lu3XG5cdFx0fSxcblx0XHQvLyDlop7liqDmlbDph49cblx0XHRhZGRDb3VudChlKSB7XG5cdFx0ICAgIGNvbnN0IGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cdFx0ICAgIGxldCBjYXJ0SXRlbXMgPSB0aGlzLmNhcnRJdGVtcztcblx0XHQgICAgbGV0IHF1YW50aXR5ID0gY2FydEl0ZW1zW2luZGV4XS5xdWFudGl0eTtcblx0XHQgICAgcXVhbnRpdHkgPSBxdWFudGl0eSArIDE7XG5cdFx0ICAgIGNhcnRJdGVtc1tpbmRleF0ucXVhbnRpdHkgPSBxdWFudGl0eTtcblx0XHQgICAgdGhpcy5jYXJ0SXRlbXMgPSBjYXJ0SXRlbXNcblx0XHRcdGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wcGluZ19jYXJ0LycgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcblx0XHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRcdHR5cGU6MSxcblx0XHRcdFx0bnVtOjFcblx0XHRcdH1cblx0XHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRtZXRob2Q6ICdQVVQnLFxuXHRcdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG5cdFx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0J0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0Ly8gdGhpcy5nZXRTaG9wcGluZ0Nhckdvb2RzKCk7XG5cdFx0XHR9KVxuXHRcdCAgICB0aGlzLmdldFRvdGFsUHJpY2UoKTtcblx0XHR9LFxuXHRcdC8vIOWHj+WwkeaVsOmHj1xuXHRcdG1pbnVzQ291bnQoZSkge1xuXHRcdCAgICBjb25zdCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHRcdCAgICBsZXQgY2FydEl0ZW1zID0gdGhpcy5jYXJ0SXRlbXM7XG5cdFx0ICAgIGxldCBxdWFudGl0eSA9IGNhcnRJdGVtc1tpbmRleF0ucXVhbnRpdHk7XG5cdFx0ICAgIGlmKHF1YW50aXR5IDw9IDEpe1xuXHRcdCAgICAgIHJldHVybiBmYWxzZTtcblx0XHQgICAgfVxuXHRcdCAgICBxdWFudGl0eSA9IHF1YW50aXR5IC0gMTtcblx0XHQgICAgY2FydEl0ZW1zW2luZGV4XS5xdWFudGl0eSA9IHF1YW50aXR5O1xuXHRcdCAgICB0aGlzLmNhcnRJdGVtcyA9IGNhcnRJdGVtcztcblx0XHRcdGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wcGluZ19jYXJ0LycgKyBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcblx0XHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHRcdHR5cGU6Mixcblx0XHRcdFx0bnVtOjFcblx0XHRcdH1cblx0XHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHRcdHVybDogdXJsLFxuXHRcdFx0XHRtZXRob2Q6ICdQVVQnLFxuXHRcdFx0XHRoZWFkZXI6e1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG5cdFx0XHRcdFx0J0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0J0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdH0pLnRoZW4oKHJlcyk9Pntcblx0XHRcdFx0Ly8gdGhpcy5nZXRTaG9wcGluZ0Nhckdvb2RzKCk7XG5cdFx0XHR9KVxuXHRcdCAgICB0aGlzLmdldFRvdGFsUHJpY2UoKTtcblx0XHR9LFxuXHRcdGRlbGV0ZUxpc3QoZSkge1xuXHRcdCAgICBjb25zdCBpbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuXHRcdCAgICBsZXQgY2FydEl0ZW1zID0gdGhpcy5jYXJ0SXRlbXM7XG5cdFx0ICAgIGNhcnRJdGVtcy5zcGxpY2UoaW5kZXgsMSk7ICAgICAgICAgICAgICAvLyDliKDpmaTotK3nianovabliJfooajph4zov5nkuKrllYblk4Fcblx0XHQgICAgdGhpcy5jYXJ0SXRlbXMgPSBjYXJ0SXRlbXM7XG5cdFx0ICAgIGlmKCFjYXJ0SXRlbXMubGVuZ3RoKXsgICAgICAgICAgICAgICAgIC8vIOWmguaenOi0reeJqei9puS4uuepulxuXHRcdCAgICAgICAgdGhpcy5oYXNMaXN0ID0gZmFsc2UgICAgICAgICAgICAgIC8vIOS/ruaUueagh+ivhuS4umZhbHNl77yM5pi+56S66LSt54mp6L2m5Li656m66aG16Z2iXG5cdFx0ICAgIH1lbHNleyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOS4jeS4uuepulxuXHRcdCAgICAgICAgdGhpcy5nZXRUb3RhbFByaWNlKCk7ICAgICAgICAgICAvLyDph43mlrDorqHnrpfmgLvku7fmoLxcblx0XHQgICAgfSAgIFxuXHRcdFx0Y29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3BwaW5nX2NhcnQvJyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuXHRcdFx0d2VweS5yZXF1ZXN0KHtcblx0XHRcdFx0dXJsOiB1cmwsXG5cdFx0XHRcdG1ldGhvZDogJ0RFTEVURScsXG5cdFx0XHRcdGhlYWRlcjp7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyxcblx0XHRcdFx0XHQnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcblx0XHRcdFx0XHQnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuXHRcdFx0XHR9LFxuXHRcdFx0fSkudGhlbigocmVzKT0+e1xuXHRcdFx0fSlcblx0XHR9LFxuXHRcdGppZXN1YW4oKXtcblx0XHRcdHRoaXMuanVkZ2VVc2VyTG9naW4oKVxuXHRcdH0sXG4gICAgfVxuICAgIC8v55So5oi355m75b2V5oiQ5Yqf5omn6KGMXG4gICAganVkZ2VVc2VyTG9naW4oKXtcbiAgICBcdGxldCB0aGF0ID0gdGhpcztcblx0XHRsZXQgbm93UHJpY2UgPSB0aGF0LnRvdGFsUHJpY2U7XG5cdFx0bGV0IGNhcnRJdGVtcyA9IHRoYXQuY2FydEl0ZW1zO1xuXHRcdGxldCBzZW5kcHJpY2UgPSB0aGF0LnNlbmRwcmljZTtcblx0XHRsZXQgbm9ybWFsc2VuZCA9IHRoYXQubm9ybWFsc2VuZDtcblx0XHRmb3IodmFyIGF0dHIgaW4gY2FydEl0ZW1zKXtcblx0XHRcdGlmKGNhcnRJdGVtc1thdHRyXS5zZWxlY3RlZCl7XG5cdFx0XHRcdHRoYXQuc2VsZWN0QnV5LnB1c2goY2FydEl0ZW1zW2F0dHJdKVxuXHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKG5vd1ByaWNlIDw9IHRoYXQuc2VuZHByaWNlKXtcblx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHR0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG5cdFx0XHRpY29uOiAnbm9uZScsXG5cdFx0XHRkdXJhdGlvbjogMjAwMFxuXHRcdFx0fSlcblx0XHR9ZWxzZXtcblx0XHRcdGlmKG5vd1ByaWNlID49IHNlbmRwcmljZSl7XG5cdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0XHRcdHVybDpcImNvbmZpcm1PcmRlcl9zaG9wcGluZ0Nhcj9zaG9wSWQ9XCIgKyB0aGlzLnNob3BJZFxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0dGl0bGU6ICfmnKrovr7liLDotbfpgIHku7fmoLwnLFxuXHRcdFx0XHRcdGljb246ICdub25lJyxcblx0XHRcdFx0XHRkdXJhdGlvbjogMjAwMCxcblx0XHRcdFx0XHRtYXNrOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHd4LnNldFN0b3JhZ2Uoe1xuXHRcdFx0a2V5OidzZWxlY3RCdXknLFxuXHRcdFx0ZGF0YTogdGhhdC5zZWxlY3RCdXlcblx0XHR9KVxuXHRcdHd4LnNldFN0b3JhZ2Uoe1xuXHRcdFx0a2V5Oid0b3RhbFByaWNlJyxcblx0XHRcdGRhdGE6IHRoYXQudG90YWxQcmljZSAtIG5vcm1hbHNlbmRcblx0XHR9KVxuICAgIH1cbiAgfVxuIl19