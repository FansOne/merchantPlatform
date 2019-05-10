'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Details = function (_wepy$page) {
	_inherits(Details, _wepy$page);

	function Details() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Details);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Details.__proto__ || Object.getPrototypeOf(Details)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
			navigationBarTitleText: '加载中...'
		}, _this.data = {
			shopId: 0,
			wxTimerList: {},
			topCover: false,
			btnShare: true,
			isLike: true,
			// banner
			adList: ['../images/banner_02.jpg', '../images/lsde.jpg', '../images/ss_02.jpg'],
			indicatorDots: false, //是否显示面板指示点	
			autoplay: true, //是否自动切换
			interval: 3000, //自动切换时间间隔,3s
			duration: 1000, //  滑动动画时长1s
			//商品参数
			parameter: [],
			//规格属性底部浮出数据
			detailsBottom: {
				choose: '5袋装（100g*5）',
				choose1: '5袋装（100g*5）',
				choose2: '3袋装（100g*3）'
			},
			storePrice: 183,
			hezhuang: false,
			num: 0,
			//默认隐藏底部悬浮窗
			bottomShow: false,
			//遮罩
			maskFlag: true,
			//分享后按钮
			shareEnd: false,
			//选择地址
			address: '请选择地址',
			bannerImg: [1],
			dianXin: true,
			goodsDetails: {
				id: '',
				title: '',
				price: '',
				cover: '',
				selected: ''
			},
			//商品id
			goodsId: 0,
			//储存用户所点击商品信息
			clickGoods: [],
			//商品库存
			goodsSkus: [],
			chooseSpec: '',
			choosePrice: '',
			//推荐商品
			randomGoods: [],
			//富文本-商品特色Banner
			characteristicBanner: '',
			//判断是否收藏商品
			isColletion: 0,
			goodsNum: false,
			cartItemsLength: 0,
			bottomBannerUrl: '',
			commentLength: '',
			userId: '',
			judgeLogin: false,
			score: '',
			noScore: true,
			// 商品细节_banner下
			threeCover: [],
			token: '',
			skuIndex: 0,
			shareShow: false,
			haiBaoImg: '',
			haobaoShow: true,
			specs: [],
			Stock: '',
			numPlusShow: true,
			goodsSkus_: null,
			claid: '',
			Bury_Money: 0,
			localSpecialty: '',
			integralGoods: ''
		}, _this.watch = {
			cartItemsLength: function cartItemsLength(newValue, oldValue) {
				if (newValue) {
					this.goodsNum = true;
					this.$apply();
				}
			},
			num: function num(newValue, oldValue) {
				if (newValue == this.Stock) {
					this.numPlusShow = false;
				} else {
					this.numPlusShow = true;
				}
			}
		}, _this.components = {}, _this.methods = {
			//回到云上首页
			backFirst: function backFirst() {
				wx.switchTab({
					url: '../../index'
				});
			},
			backIndex: function backIndex() {
				wx.navigateBack({
					delta: 1
				});
				wx.setStorage({
					key: 'cartItems',
					data: ''
				});
			},
			hezhuang: function hezhuang(itemName, item, goodskusIdx) {
				var _this2 = this;

				this.num = 0;
				var specs = [];
				item.specValue.forEach(function (element, idx_) {
					if (element.id == itemName.id) {
						_this2.goodsSkus[goodskusIdx].specValue[idx_].checked = true;
					} else {
						_this2.goodsSkus[goodskusIdx].specValue[idx_].checked = false;
					}
				});
				this.$apply();
				this.goodsSkus.forEach(function (element, idx) {
					if (item.spec == element.spec) {
						element.specValue.forEach(function (ele) {
							if (ele.checked) {
								if (_this2.specs[idx] == ele.id) {
									return;
								} else {
									_this2.specs[idx] = ele.id;
								}
							}
						});
					}
				});
				this.getProductSKU(this.specs);
			},
			showSpec: function showSpec() {
				this.bottomShow = !this.bottomShow;
				this.maskFlag = false;
			},
			numMinus: function numMinus() {
				if (this.num > 0) {
					this.num--;
				} else {
					return;
				}
			},
			numPlus: function numPlus() {
				if (this.numPlusShow) {
					this.num++;
				} else {
					wx.showToast({
						title: '已达到最大库存数',
						icon: 'none'
					});
				}
			},
			goAddress: function goAddress() {
				var that = this;
				wx.chooseAddress({
					success: function success(res) {
						var address = res;
						that.address = res.provinceName + " " + res.cityName + " " + res.countyName;
						that.$apply();
						wx.setStorage({
							key: 'address',
							data: address
						});
					},
					fail: function fail() {
						wx.openSetting();
					}
				});
			},
			currentImg: function currentImg(e) {
				this.bannerImg.pop();
				this.bannerImg.push(e.detail.current + 1);
			},
			dianXin: function dianXin(e) {
				return;
				if (e.currentTarget.dataset.goodsId) {
					this.goodsCollection(e.currentTarget.dataset.goodsId);
				}
			},
			immediatelyBuy: function immediatelyBuy() {
				var _this3 = this;

				wx.getStorage({
					key: 'address',
					success: function success(res) {
						if (_this3.num) {
							if (_this3.integralGoods) {
								_this3.Bury_Money = _this3.num * _this3.goodsSkus_.currentprice;
							} else {
								_this3.Bury_Money = _this3.num * _this3.goodsSkus_.price;
							}
							var productData = [{
								ponlyid: _this3.goodsId,
								m_id: _this3.goodsSkus_.m_id,
								claid: Number(_this3.claid),
								price: _this3.goodsSkus_.price,
								logopath: _this3.clickGoods.logopath,
								pname: _this3.clickGoods.pname,
								foodNum: _this3.num,
								SKU: [{
									sku: _this3.goodsSkus_.SKU,
									num: Number(_this3.num),
									price: _this3.goodsSkus_.currentprice
								}]
							}];
							if (_this3.integralGoods) productData[0].points = _this3.goodsSkus_.point;
							wx.setStorage({
								key: 'deliverData',
								data: productData,
								success: function success() {
									wx.navigateTo({
										url: './confirmOrder?m_id=' + _this3.shopId + '&Bury_Money=' + _this3.Bury_Money + '&localSpecialty=' + _this3.localSpecialty + '&integralGoods=' + _this3.integralGoods + '&point=' + _this3.goodsSkus_.point + '&goodsNum=' + _this3.num
									});
								}
							});

							// console.log(productData,this.Bury_Money)
						} else {
							wx.showToast({
								title: '请选择商品数量',
								icon: 'none',
								duration: 1500,
								mask: false
							});
						}
					},
					fail: function fail() {
						wx.showToast({
							title: '请选择收货地址',
							icon: 'none',
							duration: 1500,
							mask: false
						});
					}
				});
			},

			//update share
			shareFriends: function shareFriends() {
				this.shareShow = !this.shareShow;
				this.maskFlag = !this.maskFlag;
			},

			//发朋友圈
			sharequan: function sharequan() {
				var _this4 = this;

				wx.showLoading({
					title: '海报生成中...',
					mask: true
				});
				this.maskFlag = false;
				this.haobaoShow = false;
				this.$apply();
				_wepy2.default.request({
					url: api.apiMall + '/api/get_good_share_img',
					method: 'GET',
					data: {
						good_id: this.goodsId,
						// path_url:'/pages/e/page/details?id='+this.goodsId
						path_url: '/pages/e/page/details?id=' + this.goodsId
					},
					header: {
						Accept: 'application/vnd.lingmo.v1+json',
						Authorization: 'Bearer ' + this.token
					}
				}).then(function (result) {
					wx.hideLoading();
					_this4.haiBaoImg = result.data.message;
					_this4.$apply();
				});
			},
			closeSpec: function closeSpec() {
				this.bottomShow = !this.bottomShow, this.maskFlag = true;
			},
			closeHaiBao: function closeHaiBao() {
				this.haobaoShow = true;
				this.$apply();
			},

			// 保存图片至相册
			saveImg: function saveImg(imgUrl) {
				var imgSrc = imgUrl;
				wx.downloadFile({
					url: imgSrc,
					success: function success(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function success(data) {
								wx.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
							},
							fail: function fail(err) {
								if (err.errMsg === "saveImageToPhotosAlbum:fail auth denied") {
									wx.openSetting({
										success: function success(settingdata) {
											if (settingdata.authSetting['scope.writePhotosAlbum']) {
												console.log('获取权限成功，给出再次点击图片保存到相册的提示。');
											} else {
												console.log('获取权限失败，给出不给权限就无法正常使用的提示');
											}
										}
									});
								}
							}
						});
					}
				});
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Details, [{
		key: 'onLoad',
		value: function onLoad(e) {
			this.shopId = _wepy2.default.$instance.globalData.m_id;
			this.claid = e.claid;
			if (e.localSpecialty) this.localSpecialty = e.localSpecialty;
			if (e.integralGoods) this.integralGoods = e.integralGoods;
			//获取token
			this.token = wx.getStorageSync("token");
			wx.showShareMenu({ withShareTicket: true });
			wx.showNavigationBarLoading();
			this.goodsId = e.id; //	ponlyid
			this.getUserClickGoods();
		}
	}, {
		key: 'onShareAppMessage',
		value: function onShareAppMessage(res) {
			var that = this;
			if (res.from === 'button') {
				// 来自页面内转发按钮
			}
			return {
				title: that.clickGoods.title,
				path: '/pages/e/page/details?id=' + this.goodsId,
				success: function success(res) {
					that.btnShare = false;
					that.shareEnd = false;
					that.storePrice = 143;
					that.$apply();
				},
				fail: function fail(res) {
					// 转发失败
				}
			};
		}
	}, {
		key: 'onShow',
		value: function onShow() {
			var _this5 = this;

			wx.getStorage({
				key: 'address',
				success: function success(res) {
					_this5.address = res.data.provinceName + " " + res.data.cityName + " " + res.data.countyName;
				}
			});
			wx.removeStorage({ key: 'selectCoupon' });
		}
	}, {
		key: 'onHide',
		value: function onHide() {
			wx.setStorage({
				key: 'cartItems',
				data: ''
			});
			this.cartItemsLength = Number(0);
			this.$apply();
			// console.log(this.cartItemsLength)
		}
	}, {
		key: 'getUserClickGoods',

		// 获取用户点击商品数据
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var _this6 = this;

				var url, data;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								url = _requestUrl2.default.getProductDetails;
								data = { ponlyid: this.goodsId };

								if (this.integralGoods) data.type = 3;
								(0, _requestData.requestData)(url, 'POST', data).then(function (res) {
									wx.hideNavigationBarLoading();
									res.data.data[0].remark3.forEach(function (element) {
										_this6.specs.push(element.specValue[0].id);
										element.specValue[0].checked = true;
									});
									if (_this6.integralGoods) res.data.data[0].price = res.data.data[0].point + '\u79EF\u5206+' + res.data.data[0].currentprice + '\u5143';
									_this6.$apply();
									_this6.getProductSKU(_this6.specs);
									wx.setNavigationBarTitle({ title: '商品详情' });
									_this6.topCover = true;
									_this6.clickGoods = res.data.data[0];
									_this6.goodsSkus = res.data.data[0].remark3;
									_this6.parameter = res.data.data[0].spec;
									_this6.characteristicBanner = res.data.data[0].imagedescpath.split(';').slice(0, -1);
									_this6.$apply();
								});

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getUserClickGoods() {
				return _ref2.apply(this, arguments);
			}

			return getUserClickGoods;
		}()
		// 根据SKU获取及价格详情

	}, {
		key: 'getProductSKU',
		value: function getProductSKU(specs) {
			var _this7 = this;

			var url = _requestUrl2.default.getProductSKU;
			var data = {
				ponlyid: this.goodsId,
				specs: specs
			};
			if (this.integralGoods) data.type = 3;
			(0, _requestData.requestData)(url, 'POST', data).then(function (res) {
				if (_this7.integralGoods) res.data.data[0].price = res.data.data[0].point + '\u79EF\u5206+' + res.data.data[0].currentprice + '\u5143';
				_this7.choosePrice = res.data.data[0].price;
				_this7.Stock = res.data.data[0].Stock;
				_this7.goodsSkus_ = res.data.data[0];
				_this7.$apply();
			});
		}
	}]);

	return Details;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Details , 'pages/e/page/details'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbHMuanMiXSwibmFtZXMiOlsiRGV0YWlscyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2hvcElkIiwid3hUaW1lckxpc3QiLCJ0b3BDb3ZlciIsImJ0blNoYXJlIiwiaXNMaWtlIiwiYWRMaXN0IiwiaW5kaWNhdG9yRG90cyIsImF1dG9wbGF5IiwiaW50ZXJ2YWwiLCJkdXJhdGlvbiIsInBhcmFtZXRlciIsImRldGFpbHNCb3R0b20iLCJjaG9vc2UiLCJjaG9vc2UxIiwiY2hvb3NlMiIsInN0b3JlUHJpY2UiLCJoZXpodWFuZyIsIm51bSIsImJvdHRvbVNob3ciLCJtYXNrRmxhZyIsInNoYXJlRW5kIiwiYWRkcmVzcyIsImJhbm5lckltZyIsImRpYW5YaW4iLCJnb29kc0RldGFpbHMiLCJpZCIsInRpdGxlIiwicHJpY2UiLCJjb3ZlciIsInNlbGVjdGVkIiwiZ29vZHNJZCIsImNsaWNrR29vZHMiLCJnb29kc1NrdXMiLCJjaG9vc2VTcGVjIiwiY2hvb3NlUHJpY2UiLCJyYW5kb21Hb29kcyIsImNoYXJhY3RlcmlzdGljQmFubmVyIiwiaXNDb2xsZXRpb24iLCJnb29kc051bSIsImNhcnRJdGVtc0xlbmd0aCIsImJvdHRvbUJhbm5lclVybCIsImNvbW1lbnRMZW5ndGgiLCJ1c2VySWQiLCJqdWRnZUxvZ2luIiwic2NvcmUiLCJub1Njb3JlIiwidGhyZWVDb3ZlciIsInRva2VuIiwic2t1SW5kZXgiLCJzaGFyZVNob3ciLCJoYWlCYW9JbWciLCJoYW9iYW9TaG93Iiwic3BlY3MiLCJTdG9jayIsIm51bVBsdXNTaG93IiwiZ29vZHNTa3VzXyIsImNsYWlkIiwiQnVyeV9Nb25leSIsImxvY2FsU3BlY2lhbHR5IiwiaW50ZWdyYWxHb29kcyIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsIiRhcHBseSIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiYmFja0ZpcnN0Iiwid3giLCJzd2l0Y2hUYWIiLCJ1cmwiLCJiYWNrSW5kZXgiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInNldFN0b3JhZ2UiLCJrZXkiLCJpdGVtTmFtZSIsIml0ZW0iLCJnb29kc2t1c0lkeCIsInNwZWNWYWx1ZSIsImZvckVhY2giLCJlbGVtZW50IiwiaWR4XyIsImNoZWNrZWQiLCJpZHgiLCJzcGVjIiwiZWxlIiwiZ2V0UHJvZHVjdFNLVSIsInNob3dTcGVjIiwibnVtTWludXMiLCJudW1QbHVzIiwic2hvd1RvYXN0IiwiaWNvbiIsImdvQWRkcmVzcyIsInRoYXQiLCJjaG9vc2VBZGRyZXNzIiwic3VjY2VzcyIsInJlcyIsInByb3ZpbmNlTmFtZSIsImNpdHlOYW1lIiwiY291bnR5TmFtZSIsImZhaWwiLCJvcGVuU2V0dGluZyIsImN1cnJlbnRJbWciLCJlIiwicG9wIiwicHVzaCIsImRldGFpbCIsImN1cnJlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImdvb2RzQ29sbGVjdGlvbiIsImltbWVkaWF0ZWx5QnV5IiwiZ2V0U3RvcmFnZSIsImN1cnJlbnRwcmljZSIsInByb2R1Y3REYXRhIiwicG9ubHlpZCIsIm1faWQiLCJOdW1iZXIiLCJsb2dvcGF0aCIsInBuYW1lIiwiZm9vZE51bSIsIlNLVSIsInNrdSIsInBvaW50cyIsInBvaW50IiwibmF2aWdhdGVUbyIsIm1hc2siLCJzaGFyZUZyaWVuZHMiLCJzaGFyZXF1YW4iLCJzaG93TG9hZGluZyIsIndlcHkiLCJyZXF1ZXN0IiwiYXBpIiwiYXBpTWFsbCIsIm1ldGhvZCIsImdvb2RfaWQiLCJwYXRoX3VybCIsImhlYWRlciIsIkFjY2VwdCIsIkF1dGhvcml6YXRpb24iLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXN1bHQiLCJtZXNzYWdlIiwiY2xvc2VTcGVjIiwiY2xvc2VIYWlCYW8iLCJzYXZlSW1nIiwiaW1nVXJsIiwiaW1nU3JjIiwiZG93bmxvYWRGaWxlIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsImZpbGVQYXRoIiwidGVtcEZpbGVQYXRoIiwiZXJyIiwiZXJyTXNnIiwic2V0dGluZ2RhdGEiLCJhdXRoU2V0dGluZyIsImNvbnNvbGUiLCJsb2ciLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwiZ2V0U3RvcmFnZVN5bmMiLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiZ2V0VXNlckNsaWNrR29vZHMiLCJmcm9tIiwicGF0aCIsInJlbW92ZVN0b3JhZ2UiLCJyZXF1ZXN0VXJsIiwiZ2V0UHJvZHVjdERldGFpbHMiLCJ0eXBlIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwicmVtYXJrMyIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsImltYWdlZGVzY3BhdGgiLCJzcGxpdCIsInNsaWNlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0M7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDc0JBLE87Ozs7Ozs7Ozs7Ozs7O3NMQUNwQkMsTSxHQUFTO0FBQ05DLDJCQUF3QjtBQURsQixHLFFBR1JDLEksR0FBTztBQUNSQyxXQUFPLENBREM7QUFFUkMsZ0JBQVksRUFGSjtBQUdSQyxhQUFTLEtBSEQ7QUFJTkMsYUFBUyxJQUpIO0FBS1JDLFdBQVEsSUFMQTtBQU1OO0FBQ0FDLFdBQVEsQ0FDUCx5QkFETyxFQUVOLG9CQUZNLEVBR04scUJBSE0sQ0FQRjtBQVlOQyxrQkFBZSxLQVpULEVBWWdCO0FBQ3RCQyxhQUFVLElBYkosRUFhVTtBQUNoQkMsYUFBVSxJQWRKLEVBY1U7QUFDaEJDLGFBQVUsSUFmSixFQWVVO0FBQ2hCO0FBQ0FDLGNBQVUsRUFqQko7QUFrQk47QUFDQUMsa0JBQWM7QUFDYkMsWUFBUSxhQURLO0FBRWJDLGFBQVMsYUFGSTtBQUdiQyxhQUFTO0FBSEksSUFuQlI7QUF3Qk5DLGVBQVksR0F4Qk47QUF5Qk5DLGFBQVUsS0F6Qko7QUEwQk5DLFFBQUksQ0ExQkU7QUEyQk47QUFDQUMsZUFBVyxLQTVCTDtBQTZCTjtBQUNBQyxhQUFTLElBOUJIO0FBK0JOO0FBQ0FDLGFBQVMsS0Fo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QUFrQnlDLElBQUlqRyxJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLENBQWxCO0FBQ0EsV0FBS2dFLE1BQUw7QUFDRCxJQU5EO0FBT0E7Ozs7RUEzWm9DbUUsZUFBS2dELEk7O2tCQUFyQnRMLE8iLCJmaWxlIjoiZGV0YWlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXHRpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXHRpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi8uLi9hcGkvcmVxdWVzdFVybCdcblx0aW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi8uLi9hcGkvcmVxdWVzdERhdGEnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbHMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBcdGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliqDovb3kuK0uLi4nLFxuICAgIH1cbiAgICBkYXRhID0ge1xuXHRcdFx0c2hvcElkOjAsXG5cdFx0XHR3eFRpbWVyTGlzdDp7fSxcblx0XHRcdHRvcENvdmVyOmZhbHNlLFxuICAgIFx0YnRuU2hhcmU6dHJ1ZSxcblx0XHRcdGlzTGlrZTogdHJ1ZSxcblx0ICAgIC8vIGJhbm5lclxuXHQgICAgYWRMaXN0OiBbXG5cdCAgICBcdCcuLi9pbWFnZXMvYmFubmVyXzAyLmpwZycsXG4gICAgICBcdCcuLi9pbWFnZXMvbHNkZS5qcGcnLFxuICAgICAgXHQnLi4vaW1hZ2VzL3NzXzAyLmpwZydcbiAgICAgIF0sXG5cdCAgICBpbmRpY2F0b3JEb3RzOiBmYWxzZSwgLy/mmK/lkKbmmL7npLrpnaLmnb/mjIfnpLrngrlcdFxuXHQgICAgYXV0b3BsYXk6IHRydWUsIC8v5piv5ZCm6Ieq5Yqo5YiH5o2iXG5cdCAgICBpbnRlcnZhbDogMzAwMCwgLy/oh6rliqjliIfmjaLml7bpl7Tpl7TpmpQsM3Ncblx0ICAgIGR1cmF0aW9uOiAxMDAwLCAvLyAg5ruR5Yqo5Yqo55S75pe26ZW/MXNcblx0ICAgIC8v5ZWG5ZOB5Y+C5pWwXG5cdCAgICBwYXJhbWV0ZXI6W10sXG5cdCAgICAvL+inhOagvOWxnuaAp+W6lemDqOa1ruWHuuaVsOaNrlxuXHQgICAgZGV0YWlsc0JvdHRvbTp7XG5cdCAgICBcdGNob29zZTogJzXooovoo4XvvIgxMDBnKjXvvIknLFxuXHQgICAgXHRjaG9vc2UxOiAnNeiii+ijhe+8iDEwMGcqNe+8iScsXG5cdCAgICBcdGNob29zZTI6ICcz6KKL6KOF77yIMTAwZyoz77yJJyxcblx0ICAgIH0sXG5cdCAgICBzdG9yZVByaWNlOiAxODMsXG5cdCAgICBoZXpodWFuZzogZmFsc2UsXG5cdCAgICBudW06MCxcblx0ICAgIC8v6buY6K6k6ZqQ6JeP5bqV6YOo5oKs5rWu56qXXG5cdCAgICBib3R0b21TaG93OmZhbHNlLFxuXHQgICAgLy/pga7nvalcblx0ICAgIG1hc2tGbGFnOnRydWUsXG5cdCAgICAvL+WIhuS6q+WQjuaMiemSrlxuXHQgICAgc2hhcmVFbmQ6ZmFsc2UsXG5cdCAgICAvL+mAieaLqeWcsOWdgFxuXHQgICAgYWRkcmVzczon6K+36YCJ5oup5Zyw5Z2AJyxcblx0ICAgIGJhbm5lckltZzpbMV0sXG5cdCAgICBkaWFuWGluOnRydWUsXG5cdCAgIFx0Z29vZHNEZXRhaWxzIDp7XG5cdCAgICBcdGlkOiAnJyxcblx0ICAgIFx0dGl0bGU6JycsXG5cdCAgICBcdHByaWNlOiAnJyxcblx0ICAgIFx0Y292ZXI6JycsXG5cdCAgICBcdHNlbGVjdGVkOicnXG5cdCAgICB9LFxuXHQgICAgLy/llYblk4FpZFxuXHQgICAgZ29vZHNJZDowLFxuXHQgICAgLy/lgqjlrZjnlKjmiLfmiYDngrnlh7vllYblk4Hkv6Hmga9cblx0ICAgIGNsaWNrR29vZHM6W10sXG5cdCAgICAvL+WVhuWTgeW6k+WtmFxuXHQgICAgZ29vZHNTa3VzOltdLFxuXHRcdFx0Y2hvb3NlU3BlYzonJyxcblx0ICAgIGNob29zZVByaWNlOicnLFxuXHQgICAgLy/mjqjojZDllYblk4Fcblx0ICAgIHJhbmRvbUdvb2RzOltdLFxuXHQgICAgLy/lr4zmlofmnKwt5ZWG5ZOB54m56ImyQmFubmVyXG5cdCAgICBjaGFyYWN0ZXJpc3RpY0Jhbm5lcjogJycsXG5cdCAgICAvL+WIpOaWreaYr+WQpuaUtuiXj+WVhuWTgVxuXHQgICAgaXNDb2xsZXRpb246MCxcblx0ICAgIGdvb2RzTnVtOmZhbHNlLFxuXHQgICAgY2FydEl0ZW1zTGVuZ3RoOjAsXG5cdCAgICBib3R0b21CYW5uZXJVcmw6JycsXHRcblx0ICAgIGNvbW1lbnRMZW5ndGg6JycsXG5cdCAgICB1c2VySWQ6JycsXG5cdCAgICBqdWRnZUxvZ2luOmZhbHNlLFxuXHQgICAgc2NvcmU6JycsXG5cdCAgICBub1Njb3JlOnRydWUsXG5cdFx0XHQvLyDllYblk4Hnu4boioJfYmFubmVy5LiLXG5cdFx0XHR0aHJlZUNvdmVyOltdLFxuXHRcdFx0dG9rZW46JycsXG5cdFx0XHRza3VJbmRleDowLFxuXHRcdFx0c2hhcmVTaG93OmZhbHNlLFxuXHRcdFx0aGFpQmFvSW1nOicnLFxuXHRcdFx0aGFvYmFvU2hvdzp0cnVlLFxuXHRcdFx0c3BlY3M6W10sXG5cdFx0XHRTdG9jazonJyxcblx0XHRcdG51bVBsdXNTaG93OnRydWUsXG5cdFx0XHRnb29kc1NrdXNfOm51bGwsXG5cdFx0XHRjbGFpZDonJyxcblx0XHRcdEJ1cnlfTW9uZXk6MCxcblx0XHRcdGxvY2FsU3BlY2lhbHR5OicnLFxuXHRcdFx0aW50ZWdyYWxHb29kczonJ1xuICAgIH1cbiAgICBvbkxvYWQoZSkge1xuXHRcdFx0dGhpcy5zaG9wSWQgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLm1faWQ7XG5cdFx0XHR0aGlzLmNsYWlkID0gZS5jbGFpZFxuXHRcdFx0aWYoZS5sb2NhbFNwZWNpYWx0eSkgdGhpcy5sb2NhbFNwZWNpYWx0eSA9IGUubG9jYWxTcGVjaWFsdHlcblx0XHRcdGlmKGUuaW50ZWdyYWxHb29kcykgdGhpcy5pbnRlZ3JhbEdvb2RzID0gZS5pbnRlZ3JhbEdvb2RzXG5cdFx0XHQvL+iOt+WPlnRva2VuXG5cdFx0XHR0aGlzLnRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKTtcblx0XHRcdHd4LnNob3dTaGFyZU1lbnUoe3dpdGhTaGFyZVRpY2tldDogdHJ1ZX0pXG4gICAgXHR3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuXHRcdFx0dGhpcy5nb29kc0lkID0gZS5pZDsgLy9cdHBvbmx5aWRcblx0XHRcdHRoaXMuZ2V0VXNlckNsaWNrR29vZHMoKTtcbiAgICB9XG4gICAgb25TaGFyZUFwcE1lc3NhZ2UocmVzKXtcbiAgICBcdGxldCB0aGF0ID0gdGhpcztcbiAgICBcdGlmIChyZXMuZnJvbSA9PT0gJ2J1dHRvbicpIHtcblx0ICAgICAgLy8g5p2l6Ieq6aG16Z2i5YaF6L2s5Y+R5oyJ6ZKuXG4gICAgXHR9XG4gICAgXHRyZXR1cm4ge1xuXHQgICAgICB0aXRsZTogdGhhdC5jbGlja0dvb2RzLnRpdGxlLFxuXHQgICAgICBwYXRoOiAnL3BhZ2VzL2UvcGFnZS9kZXRhaWxzP2lkPScgKyB0aGlzLmdvb2RzSWQsXG5cdCAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuXHQgICAgICAgdGhhdC5idG5TaGFyZSA9IGZhbHNlXG5cdCAgICAgICB0aGF0LnNoYXJlRW5kID0gZmFsc2Vcblx0ICAgICAgIHRoYXQuc3RvcmVQcmljZSA9IDE0M1xuXHQgICAgICAgdGhhdC4kYXBwbHkoKVxuXHQgICAgICB9LFxuXHQgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcblx0ICAgICAgICAvLyDovazlj5HlpLHotKVcblx0ICAgICAgfVxuXHQgICAgfVxuXHRcdH1cbiAgICB3YXRjaCA9IHtcbiAgICAgIFx0Y2FydEl0ZW1zTGVuZ3RoIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIFx0XHRpZihuZXdWYWx1ZSl7XG4gICAgICBcdFx0XHR0aGlzLmdvb2RzTnVtID0gdHJ1ZVxuICAgICAgXHRcdFx0dGhpcy4kYXBwbHkoKVxuICAgICAgXHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0bnVtKG5ld1ZhbHVlLG9sZFZhbHVlKXtcblx0XHRcdFx0XHRcdGlmKG5ld1ZhbHVlPT10aGlzLlN0b2NrKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5udW1QbHVzU2hvdyA9IGZhbHNlXG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0dGhpcy5udW1QbHVzU2hvdyA9IHRydWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG4gIFx0fVxuICAgIGNvbXBvbmVudHMgPSB7fVxuICAgIG9uU2hvdygpe1x0XG4gICAgXHR3eC5nZXRTdG9yYWdlKHtcbiAgICBcdFx0a2V5OidhZGRyZXNzJyxcbiAgICBcdFx0c3VjY2VzczoocmVzKT0+e1xuXHRcdFx0XHRcdHRoaXMuYWRkcmVzcyA9IHJlcy5kYXRhLnByb3ZpbmNlTmFtZStcIiBcIityZXMuZGF0YS5jaXR5TmFtZStcIiBcIityZXMuZGF0YS5jb3VudHlOYW1lXG4gICAgXHRcdH1cbiAgICBcdH0pXG5cdFx0XHR3eC5yZW1vdmVTdG9yYWdlKHtrZXk6ICdzZWxlY3RDb3Vwb24nfSk7XG4gICAgfVxuXHRcdG9uSGlkZSgpe1xuXHRcdFx0d3guc2V0U3RvcmFnZSh7XG5cdFx0XHRcdGtleTonY2FydEl0ZW1zJyxcblx0XHRcdFx0ZGF0YTonJ1xuXHRcdFx0fSlcblx0XHRcdHRoaXMuY2FydEl0ZW1zTGVuZ3RoID0gTnVtYmVyKDApO1xuXHRcdFx0dGhpcy4kYXBwbHkoKTtcblx0XHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuY2FydEl0ZW1zTGVuZ3RoKVxuXHRcdH1cbiAgICBtZXRob2RzID0ge1xuXHRcdFx0Ly/lm57liLDkupHkuIrpppbpobVcblx0XHRcdGJhY2tGaXJzdCgpe1xuXHRcdFx0XHR3eC5zd2l0Y2hUYWIoe1xuXHRcdFx0XHRcdHVybDogJy4uLy4uL2luZGV4J1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sXG5cdFx0XHRiYWNrSW5kZXggKCkge1xuXHRcdFx0XHR3eC5uYXZpZ2F0ZUJhY2soe1xuXHRcdFx0XHRcdGRlbHRhOiAxXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHd4LnNldFN0b3JhZ2Uoe1xuXHRcdFx0XHRcdGtleTonY2FydEl0ZW1zJyxcblx0XHRcdFx0XHRkYXRhOicnXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0aGV6aHVhbmcgKGl0ZW1OYW1lLGl0ZW0sZ29vZHNrdXNJZHgpe1xuXHRcdFx0XHR0aGlzLm51bSA9IDA7XG5cdFx0XHRcdGxldCBzcGVjcyA9IFtdO1xuXHRcdFx0XHRpdGVtLnNwZWNWYWx1ZS5mb3JFYWNoKChlbGVtZW50LGlkeF8pID0+IHtcblx0XHRcdFx0XHRpZihlbGVtZW50LmlkID09IGl0ZW1OYW1lLmlkKXtcblx0XHRcdFx0XHRcdHRoaXMuZ29vZHNTa3VzW2dvb2Rza3VzSWR4XS5zcGVjVmFsdWVbaWR4X10uY2hlY2tlZCA9IHRydWVcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZ29vZHNTa3VzW2dvb2Rza3VzSWR4XS5zcGVjVmFsdWVbaWR4X10uY2hlY2tlZCA9IGZhbHNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHR0aGlzLmdvb2RzU2t1cy5mb3JFYWNoKChlbGVtZW50LGlkeCkgPT4ge1xuXHRcdFx0XHRcdGlmKGl0ZW0uc3BlYyA9PSBlbGVtZW50LnNwZWMpe1xuXHRcdFx0XHRcdFx0ZWxlbWVudC5zcGVjVmFsdWUuZm9yRWFjaChlbGUgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZihlbGUuY2hlY2tlZCl7XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5zcGVjc1tpZHhdID09IGVsZS5pZCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc3BlY3NbaWR4XSA9IGVsZS5pZFxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5nZXRQcm9kdWN0U0tVKHRoaXMuc3BlY3MpXG5cdFx0XHR9LFxuXHRcdFx0c2hvd1NwZWMgKCl7XG5cdFx0XHRcdHRoaXMuYm90dG9tU2hvdyA9ICF0aGlzLmJvdHRvbVNob3dcblx0XHRcdFx0dGhpcy5tYXNrRmxhZyA9IGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdG51bU1pbnVzICgpe1xuXHRcdFx0XHRpZiAodGhpcy5udW0+MCkge1xuXHRcdFx0XHRcdHRoaXMubnVtLS1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRudW1QbHVzICgpe1xuXHRcdFx0XHRpZih0aGlzLm51bVBsdXNTaG93KXtcblx0XHRcdFx0XHR0aGlzLm51bSsrXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0XHR0aXRsZTogJ+W3sui+vuWIsOacgOWkp+W6k+WtmOaVsCcsXG5cdFx0XHRcdFx0XHRpY29uOiAnbm9uZSdcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGdvQWRkcmVzcygpe1xuXHRcdFx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0XHRcdHd4LmNob29zZUFkZHJlc3Moe1xuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRcdFx0bGV0IGFkZHJlc3MgPSByZXM7XG5cdFx0XHRcdFx0dGhhdC5hZGRyZXNzID0gcmVzLnByb3ZpbmNlTmFtZStcIiBcIityZXMuY2l0eU5hbWUrXCIgXCIrcmVzLmNvdW50eU5hbWVcblx0XHRcdFx0XHR0aGF0LiRhcHBseSgpXG5cdFx0XHRcdFx0d3guc2V0U3RvcmFnZSh7XG5cdFx0XHRcdFx0XHRrZXk6J2FkZHJlc3MnLFxuXHRcdFx0XHRcdFx0ZGF0YTogYWRkcmVzc1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZhaWw6KCk9Pntcblx0XHRcdFx0XHR3eC5vcGVuU2V0dGluZygpXG5cdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRjdXJyZW50SW1nKGUpe1xuXHRcdFx0XHR0aGlzLmJhbm5lckltZy5wb3AoKVxuXHRcdFx0XHR0aGlzLmJhbm5lckltZy5wdXNoKGUuZGV0YWlsLmN1cnJlbnQrMSlcblx0XHRcdH0sXG5cdFx0XHRkaWFuWGluKGUpe1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdGlmKGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lmdvb2RzSWQpe1xuXHRcdFx0XHRcdHRoaXMuZ29vZHNDb2xsZWN0aW9uKGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lmdvb2RzSWQpXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbW1lZGlhdGVseUJ1eSgpe1xuXHRcdFx0XHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdFx0XHRrZXk6ICdhZGRyZXNzJyxcblx0XHRcdFx0XHRzdWNjZXNzOiByZXMgPT4ge1xuXHRcdFx0XHRcdFx0aWYodGhpcy5udW0pe1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmludGVncmFsR29vZHMpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuQnVyeV9Nb25leSA9IHRoaXMubnVtKnRoaXMuZ29vZHNTa3VzXy5jdXJyZW50cHJpY2Vcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5CdXJ5X01vbmV5ID0gdGhpcy5udW0qdGhpcy5nb29kc1NrdXNfLnByaWNlXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bGV0IHByb2R1Y3REYXRhID0gW1xuXHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdHBvbmx5aWQ6IHRoaXMuZ29vZHNJZCxcblx0XHRcdFx0XHRcdFx0XHRcdG1faWQ6IHRoaXMuZ29vZHNTa3VzXy5tX2lkLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhaWQ6IE51bWJlcih0aGlzLmNsYWlkKSxcblx0XHRcdFx0XHRcdFx0XHRcdHByaWNlOiB0aGlzLmdvb2RzU2t1c18ucHJpY2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRsb2dvcGF0aCA6IHRoaXMuY2xpY2tHb29kcy5sb2dvcGF0aCxcblx0XHRcdFx0XHRcdFx0XHRcdHBuYW1lIDogdGhpcy5jbGlja0dvb2RzLnBuYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0Zm9vZE51bSA6IHRoaXMubnVtLFxuXHRcdFx0XHRcdFx0XHRcdFx0U0tVOltcblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHNrdTogdGhpcy5nb29kc1NrdXNfLlNLVSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRudW06IE51bWJlcih0aGlzLm51bSksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHJpY2U6IHRoaXMuZ29vZHNTa3VzXy5jdXJyZW50cHJpY2Vcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XTtcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5pbnRlZ3JhbEdvb2RzKSBwcm9kdWN0RGF0YVswXS5wb2ludHMgPSB0aGlzLmdvb2RzU2t1c18ucG9pbnRcblx0XHRcdFx0XHRcdFx0d3guc2V0U3RvcmFnZSh7XG5cdFx0XHRcdFx0XHRcdFx0a2V5OiAnZGVsaXZlckRhdGEnLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHByb2R1Y3REYXRhLFxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6KCk9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHd4Lm5hdmlnYXRlVG8oe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR1cmw6IGAuL2NvbmZpcm1PcmRlcj9tX2lkPSR7dGhpcy5zaG9wSWR9JkJ1cnlfTW9uZXk9JHt0aGlzLkJ1cnlfTW9uZXl9JmxvY2FsU3BlY2lhbHR5PSR7dGhpcy5sb2NhbFNwZWNpYWx0eX0maW50ZWdyYWxHb29kcz0ke3RoaXMuaW50ZWdyYWxHb29kc30mcG9pbnQ9JHt0aGlzLmdvb2RzU2t1c18ucG9pbnR9Jmdvb2RzTnVtPSR7dGhpcy5udW19YFxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKHByb2R1Y3REYXRhLHRoaXMuQnVyeV9Nb25leSlcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHR3eC5zaG93VG9hc3Qoe1xuXHRcdFx0XHRcdFx0XHRcdHRpdGxlOiAn6K+36YCJ5oup5ZWG5ZOB5pWw6YePJyxcblx0XHRcdFx0XHRcdFx0XHRpY29uOiAnbm9uZScsXG5cdFx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDE1MDAsXG5cdFx0XHRcdFx0XHRcdFx0bWFzazogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZmFpbDooKT0+e1xuXHRcdFx0XHRcdFx0d3guc2hvd1RvYXN0KHtcblx0XHRcdFx0XHRcdFx0XHR0aXRsZTogJ+ivt+mAieaLqeaUtui0p+WcsOWdgCcsXG5cdFx0XHRcdFx0XHRcdFx0aWNvbjogJ25vbmUnLFxuXHRcdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAxNTAwLFxuXHRcdFx0XHRcdFx0XHRcdG1hc2s6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdC8vdXBkYXRlIHNoYXJlXG5cdFx0XHRzaGFyZUZyaWVuZHMoKXtcblx0XHRcdFx0dGhpcy5zaGFyZVNob3cgPSAhdGhpcy5zaGFyZVNob3dcblx0XHRcdFx0dGhpcy5tYXNrRmxhZyA9ICF0aGlzLm1hc2tGbGFnXG5cdFx0XHR9LFxuXHRcdFx0Ly/lj5HmnIvlj4vlnIhcblx0XHRcdHNoYXJlcXVhbigpe1xuXHRcdFx0XHRcdHd4LnNob3dMb2FkaW5nKHtcblx0XHRcdFx0XHRcdHRpdGxlOiAn5rW35oql55Sf5oiQ5LitLi4uJyxcblx0XHRcdFx0XHRcdG1hc2s6IHRydWUsXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5tYXNrRmxhZyA9IGZhbHNlXG5cdFx0XHRcdFx0dGhpcy5oYW9iYW9TaG93ID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHRcdHdlcHkucmVxdWVzdCh7XG5cdFx0XHRcdFx0XHR1cmw6IGFwaS5hcGlNYWxsICsgJy9hcGkvZ2V0X2dvb2Rfc2hhcmVfaW1nJyxcblx0XHRcdFx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdGdvb2RfaWQ6dGhpcy5nb29kc0lkLFxuXHRcdFx0XHRcdFx0XHQvLyBwYXRoX3VybDonL3BhZ2VzL2UvcGFnZS9kZXRhaWxzP2lkPScrdGhpcy5nb29kc0lkXG5cdFx0XHRcdFx0XHRcdHBhdGhfdXJsOicvcGFnZXMvZS9wYWdlL2RldGFpbHM/aWQ9Jyt0aGlzLmdvb2RzSWRcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRoZWFkZXI6IHtcblx0XHRcdFx0XHRcdFx0QWNjZXB0IDogJ2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG5cdFx0XHRcdFx0XHRcdEF1dGhvcml6YXRpb24gOiAnQmVhcmVyICcrIHRoaXMudG9rZW5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KS50aGVuKHJlc3VsdD0+e1xuXHRcdFx0XHRcdFx0d3guaGlkZUxvYWRpbmcoKTtcblx0XHRcdFx0XHRcdHRoaXMuaGFpQmFvSW1nID0gcmVzdWx0LmRhdGEubWVzc2FnZVxuXHRcdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGNsb3NlU3BlYyAoKXtcblx0XHRcdFx0dGhpcy5ib3R0b21TaG93ID0gIXRoaXMuYm90dG9tU2hvdyxcblx0XHRcdFx0dGhpcy5tYXNrRmxhZyA9IHRydWU7XG5cdFx0XHR9LFxuXHRcdFx0Y2xvc2VIYWlCYW8oKXtcblx0XHRcdFx0dGhpcy5oYW9iYW9TaG93ID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0fSxcblx0XHRcdC8vIOS/neWtmOWbvueJh+iHs+ebuOWGjFxuXHRcdFx0c2F2ZUltZyhpbWdVcmwpe1xuXHRcdFx0XHRsZXQgaW1nU3JjID0gaW1nVXJsO1xuXHRcdFx0XHR3eC5kb3dubG9hZEZpbGUoe1xuXHRcdFx0XHRcdHVybDogaW1nU3JjLFxuXHRcdFx0XHRcdHN1Y2Nlc3M6IChyZXMpPT57XG5cdFx0XHRcdFx0XHR3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcblx0XHRcdFx0XHRcdFx0ZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3M6IChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRcdHd4LnNob3dUb2FzdCh7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTogJ+S/neWtmOaIkOWKnycsXG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uOiAnc3VjY2VzcycsXG5cdFx0XHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogMjAwMFxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRmYWlsOiAoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGVyci5lcnJNc2cgPT09IFwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bTpmYWlsIGF1dGggZGVuaWVkXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0d3gub3BlblNldHRpbmcoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3Moc2V0dGluZ2RhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2V0dGluZ2RhdGEuYXV0aFNldHRpbmdbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ+iOt+WPluadg+mZkOaIkOWKn++8jOe7meWHuuWGjeasoeeCueWHu+WbvueJh+S/neWtmOWIsOebuOWGjOeahOaPkOekuuOAgicpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCfojrflj5bmnYPpmZDlpLHotKXvvIznu5nlh7rkuI3nu5nmnYPpmZDlsLHml6Dms5XmraPluLjkvb/nlKjnmoTmj5DnpLonKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuICBcdH1cbiAgICAvLyDojrflj5bnlKjmiLfngrnlh7vllYblk4HmlbDmja5cbiAgICBhc3luYyBnZXRVc2VyQ2xpY2tHb29kcygpe1xuXHRcdFx0bGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0UHJvZHVjdERldGFpbHM7XG5cdFx0XHRsZXQgZGF0YSA9IHsgcG9ubHlpZDogdGhpcy5nb29kc0lkIH07XG5cdFx0XHRpZih0aGlzLmludGVncmFsR29vZHMpIGRhdGEudHlwZSA9IDNcblx0XHRcdHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9Pntcblx0XHRcdFx0d3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcblx0XHRcdFx0cmVzLmRhdGEuZGF0YVswXS5yZW1hcmszLmZvckVhY2goZWxlbWVudCA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zcGVjcy5wdXNoKGVsZW1lbnQuc3BlY1ZhbHVlWzBdLmlkKVxuXHRcdFx0XHRcdGVsZW1lbnQuc3BlY1ZhbHVlWzBdLmNoZWNrZWQgPSB0cnVlXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZih0aGlzLmludGVncmFsR29vZHMpIHJlcy5kYXRhLmRhdGFbMF0ucHJpY2UgPSBgJHtyZXMuZGF0YS5kYXRhWzBdLnBvaW50feenr+WIhiske3Jlcy5kYXRhLmRhdGFbMF0uY3VycmVudHByaWNlfeWFg2Bcblx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0XHR0aGlzLmdldFByb2R1Y3RTS1UodGhpcy5zcGVjcylcblx0XHRcdFx0d3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHt0aXRsZTogJ+WVhuWTgeivpuaDhSd9KVxuXHRcdFx0XHR0aGlzLnRvcENvdmVyID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5jbGlja0dvb2RzID0gcmVzLmRhdGEuZGF0YVswXTtcblx0XHRcdFx0dGhpcy5nb29kc1NrdXMgPSByZXMuZGF0YS5kYXRhWzBdLnJlbWFyazM7XG5cdFx0XHRcdHRoaXMucGFyYW1ldGVyID0gcmVzLmRhdGEuZGF0YVswXS5zcGVjO1xuXHRcdFx0XHR0aGlzLmNoYXJhY3RlcmlzdGljQmFubmVyID0gcmVzLmRhdGEuZGF0YVswXS5pbWFnZWRlc2NwYXRoLnNwbGl0KCc7Jykuc2xpY2UoMCwtMSk7XG5cdFx0XHRcdHRoaXMuJGFwcGx5KClcblx0XHRcdH0pXG5cdFx0fVxuXHRcdC8vIOagueaNrlNLVeiOt+WPluWPiuS7t+agvOivpuaDhVxuXHRcdGdldFByb2R1Y3RTS1Uoc3BlY3Mpe1xuXHRcdFx0bGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0UHJvZHVjdFNLVTtcblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRwb25seWlkOnRoaXMuZ29vZHNJZCxcbiAgICBcdFx0c3BlY3M6c3BlY3Ncblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuaW50ZWdyYWxHb29kcykgZGF0YS50eXBlID0gM1xuXHRcdFx0cmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuXHRcdFx0XHRcdGlmKHRoaXMuaW50ZWdyYWxHb29kcykgcmVzLmRhdGEuZGF0YVswXS5wcmljZSA9IGAke3Jlcy5kYXRhLmRhdGFbMF0ucG9pbnR956ev5YiGKyR7cmVzLmRhdGEuZGF0YVswXS5jdXJyZW50cHJpY2V95YWDYFxuXHRcdFx0XHRcdHRoaXMuY2hvb3NlUHJpY2UgPSByZXMuZGF0YS5kYXRhWzBdLnByaWNlXG5cdFx0XHRcdFx0dGhpcy5TdG9jayA9IHJlcy5kYXRhLmRhdGFbMF0uU3RvY2tcblx0XHRcdFx0XHR0aGlzLmdvb2RzU2t1c18gPSByZXMuZGF0YS5kYXRhWzBdXG5cdFx0XHRcdFx0dGhpcy4kYXBwbHkoKVxuXHRcdFx0fSlcblx0XHR9XG59XG4iXX0=