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

var Deliver = function (_wepy$page) {
  _inherits(Deliver, _wepy$page);

  function Deliver() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Deliver);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Deliver.__proto__ || Object.getPrototypeOf(Deliver)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      token: '',
      shopId: 0,
      updateTotal: 0, //更新的总价
      updateCount: 0, //更新的数量
      extConfig: null,
      jObject: null, //详情页数据
      sellInfoShow: false,
      foodInfoShow: false,
      imgUrls: [],
      detailTitle: '',
      detailPrice: 0,
      detailContent: '',
      detailCover: '',
      detailId: 0, //商品Id
      domHeight: [], //商品列表scrollTop数组
      detailNum: 0,
      detailObject: null,
      tableNum: 0,
      eatFoodNum: 0,
      activity: [],
      catelogs: [],
      takeaways: [],
      allTakeaways: [],
      activitysLength: 0, //活动长度
      goods: [],
      goodsLength: 0,
      reduceIcon: 'none', //减少的icon
      count: 0, //购物车总数
      price: 0, //商品总价
      orderGoods: [], //用户所选的商品对象
      detailData: null,
      socketFoodNum: '',
      socketTableNum: '',
      socketOpen: false,
      price1: 0, //中间变量，用来总价转换
      logoImg: '',
      deliverData: null,
      socktBtnTitle: '连接socket',
      socketMsgQueue: [],
      shareShow: false,
      showModalStatus: false,
      haibaobtn: false,
      haobaoShow: true,
      haiBaoImg: '',
      xaingqingData: '',
      page: 0,
      newStyles: 0,
      goodsShow: false,
      currentIndex: 0,
      scrollRightTo: 0,
      classid: '',
      ProductDetails: null,
      goodsSkus: [],
      specs: [],
      ponlyid: '',
      choosePrice: '',
      skusGoodsItem: null,
      skusFoodNum: 0,
      SKU: [],
      skusNum: 1,
      sku_num: 1,
      SKUString: '',
      productM_id: '',
      sku_: [],
      takeOutStatus: '',
      sendPrice: '',
      takeOutM_id: ''
    }, _this.config = {
      navigationBarBackgroundColor: '#ffd265',
      navigationBarTitleText: '点餐',
      disableScroll: true
    }, _this.components = {}, _this.computed = {}, _this.methods = {
      eventStop: function eventStop() {},

      //回到云上首页
      backFirst: function backFirst() {
        wx.switchTab({
          url: '../../../index'
        });
      },

      //点击跳转事件
      getStatus: function getStatus(classid, index) {
        this.skusFoodNum = 0;
        if (this.scrollRightTo == 0) {
          this.scrollRightTo = 1;
        } else {
          this.scrollRightTo = 0;
        }
        this.page = 0;
        this.currentIndex = index;
        this.classid = classid;
        this.getProductByClass(classid);
      },
      scrolltolower: function scrolltolower() {
        this.page++;
        wx.showLoading({ title: '加载中...' });
        this.getProductByClass(this.classid);
      },

      //隐藏遮罩
      hideModal: function hideModal() {
        this.showModalStatus = false;
        this.modalHide();
      },

      // 跳转套餐食品详情页
      foodsDetail: function foodsDetail() {
        wx.navigateTo({
          url: './foodsDetail'
        });
      },

      // 跳转购物车
      myMenu: function myMenu() {
        if (this.takeOutStatus) {
          if (Number(this.updateTotal) < Number(this.sendPrice)) {
            wx.showToast({
              title: '未达到起送价',
              image: '../../../../images/warning.png',
              duration: 1000
            });
          } else {
            this.myMenuPayment();
          }
        } else {
          this.myMenuPayment();
        }
      },

      //商品加1
      add: function add(item, index) {
        var _this2 = this;

        if (index == undefined) {
          var SKUItem = {
            sku: this.SKUString,
            num: this.skusNum,
            price: this.choosePrice
          };
          if (this.SKU.length == 0) {
            this.SKU.push(SKUItem);
          } else {
            var skuOther = 0; //判断选择其他带规格产品
            this.orderGoods.forEach(function (element) {
              if (element.ponlyid == _this2.skusGoodsItem.ponlyid) {
                skuOther = 1;
                var haveSku = 0;
                _this2.SKU.forEach(function (ele) {
                  if (ele.sku == SKUItem.sku) {
                    ele.num++;
                    haveSku = 1;
                  }
                });
                if (haveSku == 0) {
                  _this2.SKU.push(SKUItem);
                }
              }
            });
            if (skuOther == 0) {
              //选择了带规格的其他产品
              this.SKU = [];
              this.SKU.push(SKUItem);
            }
          }
          var skusItm = {
            ponlyid: this.skusGoodsItem.ponlyid,
            m_id: this.productM_id,
            claid: this.classid,
            SKU: this.SKU,
            price: this.skusGoodsItem.price,
            logopath: this.skusGoodsItem.logopath,
            pname: this.skusGoodsItem.pname,
            packing: this.skusGoodsItem.packing
          };
          this.skusGoodsItem.sku = this.SKU;
          this.skusGoodsItem.price = this.choosePrice;
          index = this.skusGoodsIndex;
          this.takeaways[index].foodNum++;
          item = skusItm;
          this.skusFoodNum++;
          this.$apply();
        } else {
          this.choosePrice = item.price;
          this.takeaways[index].foodNum++;
          var skusItm_ = {
            sku: item.SKUS.SKU,
            price: item.SKUS.price,
            num: this.sku_num
          };
          if (this.sku_.length == 0) {
            this.sku_.push(skusItm_);
          } else {
            var haveSku_ = 0;
            this.orderGoods.forEach(function (element) {
              if (element.ponlyid == item.ponlyid) {
                haveSku_ = 1;
                _this2.sku_[0].num++;
                _this2.$apply();
              }
            });
            if (haveSku_ == 0) {
              this.sku_ = [];
              this.sku_.push(skusItm_);
            }
          }
          var _skusItm = {
            ponlyid: item.ponlyid,
            m_id: item.SKUS.m_id,
            claid: this.classid,
            SKU: this.sku_,
            price: item.price,
            logopath: item.logopath,
            pname: item.pname,
            packing: item.packing
          };
          item = _skusItm;
        }
        if (this.orderGoods.length == 0) {
          this.orderGoods.push(item);
        } else {
          var have_ = 0;
          this.orderGoods.forEach(function (element) {
            if (element.ponlyid == item.ponlyid) {
              have_ = 1;
            }
          });
          if (have_ == 0) {
            this.orderGoods.push(item);
          }
        }
        wx.setStorage({ key: 'isStorageInfo', data: "没缓存" });
        var fixed = this.choosePrice * 1;
        this.updateTotal = Number(this.updateTotal) + Number(fixed);
        this.updateTotal = Number(_util2.default.keepTwoDecimalFull(this.updateTotal));
        this.updateCount++;
      },

      //商品减1
      reduce: function reduce(item, index) {
        var _this3 = this;

        if (index == undefined) {
          this.goodsrReduce();
        } else {
          this.orderGoods.forEach(function (element, idx) {
            if (element.ponlyid == item.ponlyid) {
              if (element.SKU[0].sku == item.SKUS.SKU) {
                element.SKU[0].num--;
                _this3.updateCount--;
                _this3.takeaways[index].foodNum--;
                if (element.SKU[0].price) {
                  _this3.updateTotal = Number(_this3.updateTotal) - Number(element.SKU[0].price);
                  _this3.updateTotal = Number(_util2.default.keepTwoDecimalFull(_this3.updateTotal));
                  _this3.$apply();
                }
                if (element.SKU[0].num == 0) {
                  _this3.orderGoods.splice(idx, 1);
                  _this3.$apply();
                }
              }
            } else {
              return;
            }
          });
        }
        // console.log(this.orderGoods)
        wx.setStorage({ key: 'isStorageInfo', data: "没缓存" });
      },

      // 分享按钮
      shareFriends: function shareFriends() {
        this.foodInfoShow = !this.shareShow;
        this.shareShow = !this.shareShow;
      },

      //发朋友圈
      sharequan: function sharequan() {
        var _this4 = this;

        wx.getStorage({
          key: 'token',
          success: function success(res) {
            console.log('有access');
            wx.showLoading({
              title: '海报生成中...',
              mask: true
            });
            _this4.showModalStatus = true;
            _this4.shareShow = false;
            _this4.haibaobtn = true;
            _this4.haobaoShow = false;
            _this4.$apply();
            _wepy2.default.request({
              url: api.apiMall + '/api/get_good_share_img',
              method: 'GET',
              data: {
                good_id: _this4.detailId,
                // path_url: '/pages/f/page/d/d?id=' + this.shopId + '&goodsId=' + this.detailId + '&jObject=' + JSON.stringify(this.jObject),
                path_url: '/pages/f/page/d/d?sid=' + _this4.shopId + '&id=' + _this4.detailId
              },
              header: {
                Accept: 'application/vnd.lingmo.v1+json',
                Authorization: 'Bearer ' + _this4.token
              }
            }).then(function (result) {
              wx.hideLoading();
              _this4.haiBaoImg = result.data.message;
              _this4.$apply();
            });
          }
        });
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
      },
      closeHaiBao: function closeHaiBao() {
        this.haobaoShow = true;
        this.showModalStatus = false;
        this.$apply();
      },
      selectSkus: function selectSkus(ponlyid, goodsItem, goodsIndex) {
        var _this5 = this;

        var nums = 0;
        var havie = 1;
        this.orderGoods.forEach(function (element) {
          if (element.ponlyid == ponlyid) {
            havie = 0;
            element.SKU.forEach(function (ele) {
              nums += ele.num;
            });
            _this5.skusFoodNum = nums;
          }
        });
        if (havie == 1) {
          this.skusFoodNum = 0;
        }
        this.skusGoodsItem = goodsItem;
        this.skusGoodsIndex = goodsIndex;
        this.ponlyid = ponlyid;
        this.specs = [];
        var url = _requestUrl2.default.getProductDetails;
        (0, _requestData.requestData)(url, 'POST', { ponlyid: ponlyid }).then(function (res) {
          _this5.ProductDetails = res.data.data[0];
          _this5.goodsSkus = res.data.data[0].remark3;
          _this5.$apply();
          res.data.data[0].remark3.forEach(function (element) {
            _this5.specs.push(element.specValue[0].id);
            element.specValue[0].checked = true;
          });
          _this5.getProductSKU(_this5.specs);
        });
      },
      hezhuang: function hezhuang(itemName, item, goodskusIdx) {
        var _this6 = this;

        var specs = [];
        item.specValue.forEach(function (element, idx_) {
          if (element.id == itemName.id) {
            _this6.goodsSkus[goodskusIdx].specValue[idx_].checked = true;
          } else {
            _this6.goodsSkus[goodskusIdx].specValue[idx_].checked = false;
          }
        });
        this.$apply();
        this.goodsSkus.forEach(function (element, idx) {
          if (item.spec == element.spec) {
            element.specValue.forEach(function (ele) {
              if (ele.checked) {
                if (_this6.specs[idx] == ele.id) {
                  return;
                } else {
                  _this6.specs[idx] = ele.id;
                }
              }
            });
          }
        });
        this.$apply();
        this.getProductSKU(this.specs);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  //计算属性


  _createClass(Deliver, [{
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      var that = this;
      if (res.from === 'button') {}
      // 来自页面内转发按钮

      //  + '&jObject=' + JSON.stringify(this.jObject)
      return {
        title: this.jObject.title,
        path: '/pages/f/page/d/d?sid=' + this.shopId + '&id=' + this.detailId,
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
    key: 'myMenuPayment',

    // 跳转支付
    value: function myMenuPayment() {
      var _this7 = this;

      var data1 = {
        orderGoods: this.orderGoods
      };
      var totalPack = 0;
      this.orderGoods.forEach(function (element) {
        var num = 0;
        element.SKU.forEach(function (ele) {
          num += ele.num;
        });
        element.totalNum = num;
      });
      if (this.takeOutStatus) {
        //取外卖产品包装费
        this.orderGoods.forEach(function (element) {
          var num = 0;
          element.SKU.forEach(function (ele) {
            num += ele.num;
          });
          totalPack += Number(element.packing) * num;
        });
      }
      if (this.updateCount <= 0 || this.updateTotal == '0.00') {
        wx.showToast({
          title: '请选择商品',
          image: '../../../../images/warning.png',
          duration: 1000
        });
      } else {
        wx.setStorage({
          key: 'deliverData',
          data: data1,
          success: function success() {
            wx.navigateTo({
              url: './myMenu?id=1&m_id=' + _this7.shopId + '&Bury_Money=' + _this7.updateTotal + '&totalPack=' + totalPack + '&takeOutM_id=' + _this7.takeOutM_id
            });
          }
        });
      }
    }
    // 商品减函数

  }, {
    key: 'goodsrReduce',
    value: function goodsrReduce() {
      var _this8 = this;

      this.orderGoods.forEach(function (element, index) {
        if (element.ponlyid == _this8.skusGoodsItem.ponlyid) {
          element.SKU.forEach(function (ele, idx) {
            if (ele.sku == _this8.SKUString) {
              ele.num--;
              _this8.updateCount--;
              _this8.skusFoodNum--;
              var fixed = _this8.choosePrice * 1;
              _this8.updateTotal = Number(_this8.updateTotal) - Number(fixed);
              _this8.updateTotal = Number(_util2.default.keepTwoDecimalFull(_this8.updateTotal));
              if (ele.num == 0) {
                element.SKU.splice(idx, 1);
                if (element.SKU.length == 0) {
                  _this8.orderGoods.splice(index, 1);
                } else {
                  return;
                }
              }
            } else {
              wx.showToast({ title: '未点过该规格商品', icon: 'none' });
            }
          });
        } else {
          return;
        }
      });
    }
    //获取所有商品 +++++++++++++++++++++++++++++++++++++++++++++++

  }, {
    key: 'getAllGoodsData',
    value: function getAllGoodsData() {
      var _this9 = this;

      // 获取商品分类
      var urlClassification = _requestUrl2.default.GetProductClass;
      var dataClassification = {
        p_id: _wepy2.default.$instance.globalData.p_id,
        m_id: this.shopId,
        type: _wepy2.default.$instance.globalData.takeOutStatus || 0
      };
      (0, _requestData.requestData)(urlClassification, 'POST', dataClassification).then(function (res) {
        _this9.catelogs = res.data.data.claid;
        _this9.classid = res.data.data.claid[0].classid;
        _this9.$apply();
        // 获取分类下商品
        _this9.getProductByClass(res.data.data.claid[0].classid);
      });
    }
    // 获取分类下商品

  }, {
    key: 'getProductByClass',
    value: function getProductByClass(classid) {
      var _this10 = this;

      var url = _requestUrl2.default.GetProductByClass;
      var data = {
        p_id: _wepy2.default.$instance.globalData.p_id,
        m_id: this.shopId,
        type: _wepy2.default.$instance.globalData.takeOutStatus || 0,
        c_id: classid,
        page_Num: this.page
      };
      (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
        wx.hideLoading();
        if (_this10.page == 0) {
          _this10.goodsShow = true;
          res.data.data.forEach(function (element) {
            if (element.SKU == 0) {
              element.price = element.SKUS.price;
            }
            element.foodNum = 0;
          });
          _this10.takeaways = res.data.data;
          _wepy2.default.$instance.globalData.takeaways = res.data.data;
          _this10.$apply();
        } else {
          if (res.data.data.length == 0) {
            wx.showToast({ title: '已加载全部数据', icon: 'none' });
          } else {
            res.data.data.forEach(function (element) {
              if (element.SKU == 0) {
                element.price = element.SKUS.price;
              }
              element.foodNum = 0;
              _this10.takeaways.push(element);
            });
          }
        }
        _this10.takeaways.forEach(function (element, index) {
          _this10.orderGoods.forEach(function (ele, idx) {
            if (element.ponlyid == ele.ponlyid) {
              _this10.takeaways[index].foodNum = ele.SKU[0].num;
              _this10.$apply();
            }
          });
        });
      });
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // 详情页请求数据

  }, {
    key: 'getFoodDetailData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this11 = this;

        var goodsId, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                goodsId = this.goodsId;
                url = api.apiMall + 'api/takeaway/' + this.detailId;
                _context.next = 4;
                return _wepy2.default.request({
                  url: url,
                  method: 'GET',
                  header: {
                    'Accept': 'application/vnd.lingmo.v1+json'
                  }
                }).then(function (res) {
                  _this11.imgUrls = res.data.message.good_img;
                  _wepy2.default.$instance.globalData.shopId = res.data.message.merchant_id;
                  // if(res.data.message.content){
                  //   this.detailContent = res.data.message.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
                  //     capture = capture
                  //     return '<img src="' + capture+'">'
                  //   })
                  // }else{
                  //   this.detailContent = '<p>暂无简介</p>';
                  // }
                  _this11.xaingqingData = res.data.message;
                  _this11.detailContent = res.data.message.content;
                  _this11.$apply();
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFoodDetailData() {
        return _ref2.apply(this, arguments);
      }

      return getFoodDetailData;
    }()
    // getData(){
    //   let data = wx.getStorageSync("data");
    //   this.tableNum = data.socketTableNum;
    //   this.foodNum = data.socketFoodNum;
    // }

  }, {
    key: 'getProductSKU',
    value: function getProductSKU(specs) {
      var _this12 = this;

      var url = _requestUrl2.default.getProductSKU;
      var data = {
        ponlyid: this.ponlyid,
        specs: specs || ''
      };
      (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
        _this12.choosePrice = res.data.data[0].price;
        _this12.Stock = res.data.data[0].Stock;
        _this12.SKUString = res.data.data[0].SKU;
        _this12.productM_id = res.data.data[0].m_id;
        _this12.modalShow();
        _this12.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var _this13 = this;

      if (options.takeOutM_id) this.takeOutM_id = options.takeOutM_id;
      this.sendPrice = options.sendPrice;
      this.takeOutStatus = _wepy2.default.$instance.globalData.takeOutStatus;
      this.shopId = options.m_id;
      _wepy2.default.$instance.globalData.shopId = options.m_id;
      this.logoImg = options.logoImg;
      // this.getFoodDetailData();
      this.getAllGoodsData();
      //获取token
      this.token = wx.getStorageSync("token");;
      this.eatFoodNum = options.num;
      // this.shopId = wx.getStorageSync("shopId");
      //获取桌号
      wx.getStorage({
        key: 'data',
        success: function success(res) {
          _this13.socketTableNum = res.data.socketTableNum;
          _this13.socketFoodNum = res.data.socketFoodNum;
          _this13.$apply();
          //判断桌号是否存在
          if (_this13.socketTableNum) {
            if (_this13.socketFoodNum) {
              //桌号跟用餐人数都存在
            } else {
              //桌号存在 用餐人数不存在都选择人数
              wx.redirectTo({
                url: './chooseNum'
              });
            }
          }
        }
      });
      wx.getSystemInfo({
        success: function success(res) {
          _this13.newStyles = res.windowHeight - 210;
          _this13.$apply();
        }
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (_wepy2.default.$instance.globalData.takeOutStatus) wx.setNavigationBarTitle({ title: '外卖' });
      wx.removeStorage({ key: 'selectCoupon' });
    }
    //遮罩显示和隐藏

  }, {
    key: 'modalShow',
    value: function modalShow() {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.animationData = animation.export(), this.showModalStatus = true;
      setTimeout(function () {
        animation.translateY(0).step();
        this.animationData = animation.export();
      }.bind(this), 200);
    }
    // 隐藏遮罩层

  }, {
    key: 'modalHide',
    value: function modalHide() {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.animationData = animation.export(), setTimeout(function () {
        animation.translateY(0).step();
        this.animationData = animation.export(), this.showModalStatus = false;
      }.bind(this), 200);
    }
  }]);

  return Deliver;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Deliver , 'pages/f/page/d/d'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQuanMiXSwibmFtZXMiOlsiRGVsaXZlciIsImRhdGEiLCJ0b2tlbiIsInNob3BJZCIsInVwZGF0ZVRvdGFsIiwidXBkYXRlQ291bnQiLCJleHRDb25maWciLCJqT2JqZWN0Iiwic2VsbEluZm9TaG93IiwiZm9vZEluZm9TaG93IiwiaW1nVXJscyIsImRldGFpbFRpdGxlIiwiZGV0YWlsUHJpY2UiLCJkZXRhaWxDb250ZW50IiwiZGV0YWlsQ292ZXIiLCJkZXRhaWxJZCIsImRvbUhlaWdodCIsImRldGFpbE51bSIsImRldGFpbE9iamVjdCIsInRhYmxlTnVtIiwiZWF0Rm9vZE51bSIsImFjdGl2aXR5IiwiY2F0ZWxvZ3MiLCJ0YWtlYXdheXMiLCJhbGxUYWtlYXdheXMiLCJhY3Rpdml0eXNMZW5ndGgiLCJnb29kcyIsImdvb2RzTGVuZ3RoIiwicmVkdWNlSWNvbiIsImNvdW50IiwicHJpY2UiLCJvcmRlckdvb2RzIiwiZGV0YWlsRGF0YSIsInNvY2tldEZvb2ROdW0iLCJzb2NrZXRUYWJsZU51bSIsInNvY2tldE9wZW4iLCJwcmljZTEiLCJsb2dvSW1nIiwiZGVsaXZlckRhdGEiLCJzb2NrdEJ0blRpdGxlIiwic29ja2V0TXNnUXVldWUiLCJzaGFyZVNob3ciLCJzaG93TW9kYWxTdGF0dXMiLCJoYWliYW9idG4iLCJoYW9iYW9TaG93IiwiaGFpQmFvSW1nIiwieGFpbmdxaW5nRGF0YSIsInBhZ2UiLCJuZXdTdHlsZXMiLCJnb29kc1Nob3ciLCJjdXJyZW50SW5kZXgiLCJzY3JvbGxSaWdodFRvIiwiY2xhc3NpZCIsIlByb2R1Y3REZXRhaWxzIiwiZ29vZHNTa3VzIiwic3BlY3MiLCJwb25seWlkIiwiY2hvb3NlUHJpY2UiLCJza3VzR29vZHNJdGVtIiwic2t1c0Zvb2ROdW0iLCJTS1UiLCJza3VzTnVtIiwic2t1X251bSIsIlNLVVN0cmluZyIsInByb2R1Y3RNX2lkIiwic2t1XyIsInRha2VPdXRTdGF0dXMiLCJzZW5kUHJpY2UiLCJ0YWtlT3V0TV9pZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGlzYWJsZVNjcm9sbCIsImNvbXBvbmVudHMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJldmVudFN0b3AiLCJiYWNrRmlyc3QiLCJ3eCIsInN3aXRjaFRhYiIsInVybCIsImdldFN0YXR1cyIsImluZGV4IiwiZ2V0UHJvZHVjdEJ5Q2xhc3MiLCJzY3JvbGx0b2xvd2VyIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImhpZGVNb2RhbCIsIm1vZGFsSGlkZSIsImZvb2RzRGV0YWlsIiwibmF2aWdhdGVUbyIsIm15TWVudSIsIk51bWJlciIsInNob3dUb2FzdCIsImltYWdlIiwiZHVyYXRpb24iLCJteU1lbnVQYXltZW50IiwiYWRkIiwiaXRlbSIsInVuZGVmaW5lZCIsIlNLVUl0ZW0iLCJza3UiLCJudW0iLCJsZW5ndGgiLCJwdXNoIiwic2t1T3RoZXIiLCJmb3JFYWNoIiwiZWxlbWVudCIsImhhdmVTa3UiLCJlbGUiLCJza3VzSXRtIiwibV9pZCIsImNsYWlkIiwibG9nb3BhdGgiLCJwbmFtZSIsInBhY2tpbmciLCJza3VzR29vZHNJbmRleCIsImZvb2ROdW0iLCIkYXBwbHkiLCJza3VzSXRtXyIsIlNLVVMiLCJoYXZlU2t1XyIsImhhdmVfIiwic2V0U3RvcmFnZSIsImtleSIsImZpeGVkIiwidXRpbCIsImtlZXBUd29EZWNpbWFsRnVsbCIsInJlZHVjZSIsImdvb2RzclJlZHVjZSIsImlkeCIsInNwbGljZSIsInNoYXJlRnJpZW5kcyIsInNoYXJlcXVhbiIsImdldFN0b3JhZ2UiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIm1hc2siLCJ3ZXB5IiwicmVxdWVzdCIsImFwaSIsImFwaU1hbGwiLCJtZXRob2QiLCJnb29kX2lkIiwicGF0aF91cmwiLCJoZWFkZXIiLCJBY2NlcHQiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsImhpZGVMb2FkaW5nIiwicmVzdWx0IiwibWVzc2FnZSIsInNhdmVJbWciLCJpbWdVcmwiLCJpbWdTcmMiLCJkb3dubG9hZEZpbGUiLCJyZXMiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJ0ZW1wRmlsZVBhdGgiLCJpY29uIiwiZmFpbCIsImVyciIsImVyck1zZyIsIm9wZW5TZXR0aW5nIiwic2V0dGluZ2RhdGEiLCJhdXRoU2V0dGluZyIsImNsb3NlSGFpQmFvIiwic2VsZWN0U2t1cyIsImdvb2RzSXRlbSIsImdvb2RzSW5kZXgiLCJudW1zIiwiaGF2aWUiLCJyZXF1ZXN0VXJsIiwiZ2V0UHJvZHVjdERldGFpbHMiLCJyZW1hcmszIiwic3BlY1ZhbHVlIiwiaWQiLCJjaGVja2VkIiwiZ2V0UHJvZHVjdFNLVSIsImhlemh1YW5nIiwiaXRlbU5hbWUiLCJnb29kc2t1c0lkeCIsImlkeF8iLCJzcGVjIiwidGhhdCIsImZyb20iLCJwYXRoIiwiYnRuU2hhcmUiLCJzaGFyZUVuZCIsInN0b3JlUHJpY2UiLCJkYXRhMSIsInRvdGFsUGFjayIsInRvdGFsTnVtIiwidXJsQ2xhc3NpZmljYXRpb24iLCJHZXRQcm9kdWN0Q2xhc3MiLCJkYXRhQ2xhc3NpZmljYXRpb24iLCJwX2lkIiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInR5cGUiLCJHZXRQcm9kdWN0QnlDbGFzcyIsImNfaWQiLCJwYWdlX051bSIsImdvb2RzSWQiLCJnb29kX2ltZyIsIm1lcmNoYW50X2lkIiwiY29udGVudCIsIlN0b2NrIiwibW9kYWxTaG93Iiwib3B0aW9ucyIsImdldEFsbEdvb2RzRGF0YSIsImdldFN0b3JhZ2VTeW5jIiwicmVkaXJlY3RUbyIsImdldFN5c3RlbUluZm8iLCJ3aW5kb3dIZWlnaHQiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJyZW1vdmVTdG9yYWdlIiwiYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJkZWxheSIsInRyYW5zbGF0ZVkiLCJzdGVwIiwiYW5pbWF0aW9uRGF0YSIsImV4cG9ydCIsInNldFRpbWVvdXQiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxhQUFNLEVBREQ7QUFFTEMsY0FBTyxDQUZGO0FBR0xDLG1CQUFZLENBSFAsRUFHd0I7QUFDN0JDLG1CQUFZLENBSlAsRUFJd0I7QUFDN0JDLGlCQUFVLElBTEw7QUFNTEMsZUFBUSxJQU5ILEVBTXdCO0FBQzdCQyxvQkFBYSxLQVBSO0FBUUxDLG9CQUFhLEtBUlI7QUFTTEMsZUFBUyxFQVRKO0FBVUxDLG1CQUFZLEVBVlA7QUFXTEMsbUJBQVksQ0FYUDtBQVlMQyxxQkFBYyxFQVpUO0FBYUxDLG1CQUFZLEVBYlA7QUFjTEMsZ0JBQVMsQ0FkSixFQWNlO0FBQ3BCQyxpQkFBVSxFQWZMLEVBZWU7QUFDcEJDLGlCQUFVLENBaEJMO0FBaUJMQyxvQkFBYSxJQWpCUjtBQWtCTEMsZ0JBQVMsQ0FsQko7QUFtQkxDLGtCQUFXLENBbkJOO0FBb0JMQyxnQkFBUyxFQXBCSjtBQXFCTEMsZ0JBQVMsRUFyQko7QUFzQkxDLGlCQUFVLEVBdEJMO0FBdUJMQyxvQkFBYSxFQXZCUjtBQXdCTEMsdUJBQWdCLENBeEJYLEVBd0JnQjtBQUNyQkMsYUFBTSxFQXpCRDtBQTBCTEMsbUJBQVksQ0ExQlA7QUEyQkxDLGtCQUFXLE1BM0JOLEVBMkJlO0FBQ3BCQyxhQUFNLENBNUJELEVBNEJXO0FBQ2hCQyxhQUFNLENBN0JELEVBNkJXO0FBQ2hCQyxrQkFBVyxFQTlCTixFQThCWTtBQUNqQkMsa0JBQVcsSUEvQk47QUFnQ0xDLHFCQUFjLEVBaENUO0FBaUNMQyxzQkFBZSxFQWpDVjtBQWtDTEMsa0JBQVcsS0FsQ047QUFtQ0xDLGNBQU8sQ0FuQ0YsRUFtQ1E7QUFDYkMsZUFBUSxFQXBDSDtBQXFDTEMsbUJBQVksSUFyQ1A7QUFzQ0xDLHFCQUFlLFVBdENWO0FBdUNMQyxzQkFBZSxFQXZDVjtBQXdDTEMsaUJBQVUsS0F4Q0w7QUF5Q0xDLHVCQUFnQixLQXpDWDtBQTBDTEMsaUJBQVUsS0ExQ0w7QUEyQ0xDLGtCQUFXLElBM0NOO0FBNENMQyxpQkFBVSxFQTVDTDtBQTZDTEMscUJBQWMsRUE3Q1Q7QUE4Q0xDLFlBQUssQ0E5Q0E7QUErQ0xDLGlCQUFVLENBL0NMO0FBZ0RMQyxpQkFBVSxLQWhETDtBQWlETEMsb0JBQWEsQ0FqRFI7QUFrRExDLHFCQUFjLENBbERUO0FBbURMQyxlQUFRLEVBbkRIO0FBb0RMQyxzQkFBZSxJQXBEVjtBQXFETEMsaUJBQVUsRUFyREw7QUFzRExDLGFBQU0sRUF0REQ7QUF1RExDLGVBQVEsRUF2REg7QUF3RExDLG1CQUFZLEVBeERQO0FBeURMQyxxQkFBYyxJQXpEVDtBQTBETEMsbUJBQVksQ0ExRFA7QUEyRExDLFdBQUksRUEzREM7QUE0RExDLGVBQVEsQ0E1REg7QUE2RExDLGVBQVEsQ0E3REg7QUE4RExDLGlCQUFVLEVBOURMO0FBK0RMQyxtQkFBWSxFQS9EUDtBQWdFTEMsWUFBSyxFQWhFQTtBQWlFTEMscUJBQWMsRUFqRVQ7QUFrRUxDLGlCQUFVLEVBbEVMO0FBbUVMQyxtQkFBWTtBQW5FUCxLLFFBcUVQQyxNLEdBQVM7QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixJQUZqQjtBQUdQQyxxQkFBYztBQUhQLEssUUFLVEMsVSxHQUFhLEUsUUFFYkMsUSxHQUFXLEUsUUFxQlhDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNHLENBQUUsQ0FETDs7QUFFUjtBQUNBQyxlQUhRLHVCQUdHO0FBQ1RDLFdBQUdDLFNBQUgsQ0FBYTtBQUNYQyxlQUFLO0FBRE0sU0FBYjtBQUdELE9BUE87O0FBUVI7QUFDQUMsZUFUUSxxQkFTRTdCLE9BVEYsRUFTVThCLEtBVFYsRUFTaUI7QUFDdkIsYUFBS3ZCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxZQUFHLEtBQUtSLGFBQUwsSUFBc0IsQ0FBekIsRUFBMkI7QUFDekIsZUFBS0EsYUFBTCxHQUFxQixDQUFyQjtBQUNELFNBRkQsTUFFSztBQUNILGVBQUtBLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDtBQUNELGFBQUtKLElBQUwsR0FBWSxDQUFaO0FBQ0EsYUFBS0csWUFBTCxHQUFvQmdDLEtBQXBCO0FBQ0EsYUFBSzlCLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUsrQixpQkFBTCxDQUF1Qi9CLE9BQXZCO0FBQ0QsT0FwQk87QUFxQlJnQyxtQkFyQlEsMkJBcUJPO0FBQ2IsYUFBS3JDLElBQUw7QUFDQStCLFdBQUdPLFdBQUgsQ0FBZSxFQUFDQyxPQUFPLFFBQVIsRUFBZjtBQUNBLGFBQUtILGlCQUFMLENBQXVCLEtBQUsvQixPQUE1QjtBQUNELE9BekJPOztBQTBCUjtBQUNBbUMsZUEzQlEsdUJBMkJJO0FBQ1YsYUFBSzdDLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxhQUFLOEMsU0FBTDtBQUNELE9BOUJPOztBQStCUjtBQUNBQyxpQkFoQ1EseUJBZ0NLO0FBQ1hYLFdBQUdZLFVBQUgsQ0FBYztBQUNaVixlQUFJO0FBRFEsU0FBZDtBQUdELE9BcENPOztBQXFDUjtBQUNBVyxZQXRDUSxvQkFzQ0E7QUFDTixZQUFHLEtBQUt6QixhQUFSLEVBQXNCO0FBQ3BCLGNBQUcwQixPQUFPLEtBQUt4RixXQUFaLElBQXlCd0YsT0FBTyxLQUFLekIsU0FBWixDQUE1QixFQUFtRDtBQUNqRFcsZUFBR2UsU0FBSCxDQUFhO0FBQ1hQLHFCQUFPLFFBREk7QUFFWFEscUJBQU0sZ0NBRks7QUFHWEMsd0JBQVU7QUFIQyxhQUFiO0FBS0QsV0FORCxNQU1LO0FBQ0gsaUJBQUtDLGFBQUw7QUFDRDtBQUNGLFNBVkQsTUFVSztBQUNILGVBQUtBLGFBQUw7QUFDRDtBQUNGLE9BcERPOztBQXFEUjtBQUNBQyxTQXREUSxlQXNESkMsSUF0REksRUFzRENoQixLQXRERCxFQXNETztBQUFBOztBQUNiLFlBQUdBLFNBQU9pQixTQUFWLEVBQW9CO0FBQ2xCLGNBQUlDLFVBQVU7QUFDWkMsaUJBQUksS0FBS3RDLFNBREc7QUFFWnVDLGlCQUFJLEtBQUt6QyxPQUZHO0FBR1ovQixtQkFBTSxLQUFLMkI7QUFIQyxXQUFkO0FBS0EsY0FBRyxLQUFLRyxHQUFMLENBQVMyQyxNQUFULElBQW1CLENBQXRCLEVBQXdCO0FBQ3RCLGlCQUFLM0MsR0FBTCxDQUFTNEMsSUFBVCxDQUFjSixPQUFkO0FBQ0QsV0FGRCxNQUVLO0FBQ0gsZ0JBQUlLLFdBQVcsQ0FBZixDQURHLENBQ2U7QUFDbEIsaUJBQUsxRSxVQUFMLENBQWdCMkUsT0FBaEIsQ0FBd0IsbUJBQVc7QUFDakMsa0JBQUdDLFFBQVFuRCxPQUFSLElBQW1CLE9BQUtFLGFBQUwsQ0FBbUJGLE9BQXpDLEVBQWlEO0FBQy9DaUQsMkJBQVcsQ0FBWDtBQUNBLG9CQUFJRyxVQUFVLENBQWQ7QUFDQSx1QkFBS2hELEdBQUwsQ0FBUzhDLE9BQVQsQ0FBaUIsZUFBTztBQUN0QixzQkFBR0csSUFBSVIsR0FBSixJQUFXRCxRQUFRQyxHQUF0QixFQUEwQjtBQUN4QlEsd0JBQUlQLEdBQUo7QUFDQU0sOEJBQVUsQ0FBVjtBQUNEO0FBQ0YsaUJBTEQ7QUFNQSxvQkFBR0EsV0FBVyxDQUFkLEVBQWdCO0FBQ2QseUJBQUtoRCxHQUFMLENBQVM0QyxJQUFULENBQWNKLE9BQWQ7QUFDRDtBQUNGO0FBQ0YsYUFkRDtBQWVBLGdCQUFHSyxZQUFZLENBQWYsRUFBaUI7QUFBRTtBQUNqQixtQkFBSzdDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsbUJBQUtBLEdBQUwsQ0FBUzRDLElBQVQsQ0FBY0osT0FBZDtBQUNEO0FBQ0Y7QUFDRCxjQUFJVSxVQUFVO0FBQ1p0RCxxQkFBVSxLQUFLRSxhQUFMLENBQW1CRixPQURqQjtBQUVadUQsa0JBQU8sS0FBSy9DLFdBRkE7QUFHWmdELG1CQUFRLEtBQUs1RCxPQUhEO0FBSVpRLGlCQUFNLEtBQUtBLEdBSkM7QUFLWjlCLG1CQUFRLEtBQUs0QixhQUFMLENBQW1CNUIsS0FMZjtBQU1abUYsc0JBQVUsS0FBS3ZELGFBQUwsQ0FBbUJ1RCxRQU5qQjtBQU9aQyxtQkFBTyxLQUFLeEQsYUFBTCxDQUFtQndELEtBUGQ7QUFRWkMscUJBQVMsS0FBS3pELGFBQUwsQ0FBbUJ5RDtBQVJoQixXQUFkO0FBVUEsZUFBS3pELGFBQUwsQ0FBbUIyQyxHQUFuQixHQUF5QixLQUFLekMsR0FBOUI7QUFDQSxlQUFLRixhQUFMLENBQW1CNUIsS0FBbkIsR0FBMkIsS0FBSzJCLFdBQWhDO0FBQ0F5QixrQkFBUSxLQUFLa0MsY0FBYjtBQUNBLGVBQUs3RixTQUFMLENBQWUyRCxLQUFmLEVBQXNCbUMsT0FBdEI7QUFDQW5CLGlCQUFPWSxPQUFQO0FBQ0EsZUFBS25ELFdBQUw7QUFDQSxlQUFLMkQsTUFBTDtBQUNELFNBL0NELE1BK0NLO0FBQ0gsZUFBSzdELFdBQUwsR0FBbUJ5QyxLQUFLcEUsS0FBeEI7QUFDQSxlQUFLUCxTQUFMLENBQWUyRCxLQUFmLEVBQXNCbUMsT0FBdEI7QUFDQSxjQUFJRSxXQUFXO0FBQ2JsQixpQkFBTUgsS0FBS3NCLElBQUwsQ0FBVTVELEdBREg7QUFFYjlCLG1CQUFRb0UsS0FBS3NCLElBQUwsQ0FBVTFGLEtBRkw7QUFHYndFLGlCQUFNLEtBQUt4QztBQUhFLFdBQWY7QUFLQSxjQUFHLEtBQUtHLElBQUwsQ0FBVXNDLE1BQVYsSUFBa0IsQ0FBckIsRUFBdUI7QUFDckIsaUJBQUt0QyxJQUFMLENBQVV1QyxJQUFWLENBQWVlLFFBQWY7QUFDRCxXQUZELE1BRUs7QUFDSCxnQkFBSUUsV0FBVyxDQUFmO0FBQ0EsaUJBQUsxRixVQUFMLENBQWdCMkUsT0FBaEIsQ0FBd0IsbUJBQVc7QUFDakMsa0JBQUdDLFFBQVFuRCxPQUFSLElBQW1CMEMsS0FBSzFDLE9BQTNCLEVBQW1DO0FBQ2pDaUUsMkJBQVcsQ0FBWDtBQUNBLHVCQUFLeEQsSUFBTCxDQUFVLENBQVYsRUFBYXFDLEdBQWI7QUFDQSx1QkFBS2dCLE1BQUw7QUFDRDtBQUNGLGFBTkQ7QUFPQSxnQkFBR0csWUFBWSxDQUFmLEVBQWlCO0FBQ2YsbUJBQUt4RCxJQUFMLEdBQVksRUFBWjtBQUNBLG1CQUFLQSxJQUFMLENBQVV1QyxJQUFWLENBQWVlLFFBQWY7QUFDRDtBQUNGO0FBQ0QsY0FBSVQsV0FBVTtBQUNadEQscUJBQVUwQyxLQUFLMUMsT0FESDtBQUVadUQsa0JBQU9iLEtBQUtzQixJQUFMLENBQVVULElBRkw7QUFHWkMsbUJBQVEsS0FBSzVELE9BSEQ7QUFJWlEsaUJBQU0sS0FBS0ssSUFKQztBQUtabkMsbUJBQVFvRSxLQUFLcEUsS0FMRDtBQU1abUYsc0JBQVVmLEtBQUtlLFFBTkg7QUFPWkMsbUJBQU9oQixLQUFLZ0IsS0FQQTtBQVFaQyxxQkFBU2pCLEtBQUtpQjtBQVJGLFdBQWQ7QUFVQWpCLGlCQUFPWSxRQUFQO0FBQ0Q7QUFDRCxZQUFHLEtBQUsvRSxVQUFMLENBQWdCd0UsTUFBaEIsSUFBMEIsQ0FBN0IsRUFBK0I7QUFDN0IsZUFBS3hFLFVBQUwsQ0FBZ0J5RSxJQUFoQixDQUFxQk4sSUFBckI7QUFDRCxTQUZELE1BRUs7QUFDSCxjQUFJd0IsUUFBUSxDQUFaO0FBQ0EsZUFBSzNGLFVBQUwsQ0FBZ0IyRSxPQUFoQixDQUF3QixtQkFBVztBQUNqQyxnQkFBR0MsUUFBUW5ELE9BQVIsSUFBbUIwQyxLQUFLMUMsT0FBM0IsRUFBbUM7QUFDakNrRSxzQkFBUSxDQUFSO0FBQ0Q7QUFDRixXQUpEO0FBS0EsY0FBR0EsU0FBUyxDQUFaLEVBQWM7QUFDWixpQkFBSzNGLFVBQUwsQ0FBZ0J5RSxJQUFoQixDQUFxQk4sSUFBckI7QUFDRDtBQUNGO0FBQ0RwQixXQUFHNkMsVUFBSCxDQUFjLEVBQUNDLEtBQUksZUFBTCxFQUFxQjNILE1BQUssS0FBMUIsRUFBZDtBQUNBLFlBQUk0SCxRQUFTLEtBQUtwRSxXQUFOLEdBQW1CLENBQS9CO0FBQ0EsYUFBS3JELFdBQUwsR0FBbUJ3RixPQUFPLEtBQUt4RixXQUFaLElBQTJCd0YsT0FBT2lDLEtBQVAsQ0FBOUM7QUFDQSxhQUFLekgsV0FBTCxHQUFtQndGLE9BQU9rQyxlQUFLQyxrQkFBTCxDQUF3QixLQUFLM0gsV0FBN0IsQ0FBUCxDQUFuQjtBQUNBLGFBQUtDLFdBQUw7QUFDRCxPQTVKTzs7QUE2SlI7QUFDQTJILFlBOUpRLGtCQThKRDlCLElBOUpDLEVBOEpJaEIsS0E5SkosRUE4SlU7QUFBQTs7QUFDaEIsWUFBR0EsU0FBT2lCLFNBQVYsRUFBb0I7QUFDbEIsZUFBSzhCLFlBQUw7QUFDRCxTQUZELE1BRUs7QUFDSCxlQUFLbEcsVUFBTCxDQUFnQjJFLE9BQWhCLENBQXdCLFVBQUNDLE9BQUQsRUFBU3VCLEdBQVQsRUFBaUI7QUFDdkMsZ0JBQUd2QixRQUFRbkQsT0FBUixJQUFtQjBDLEtBQUsxQyxPQUEzQixFQUFtQztBQUNqQyxrQkFBR21ELFFBQVEvQyxHQUFSLENBQVksQ0FBWixFQUFleUMsR0FBZixJQUFzQkgsS0FBS3NCLElBQUwsQ0FBVTVELEdBQW5DLEVBQXVDO0FBQ3JDK0Msd0JBQVEvQyxHQUFSLENBQVksQ0FBWixFQUFlMEMsR0FBZjtBQUNBLHVCQUFLakcsV0FBTDtBQUNBLHVCQUFLa0IsU0FBTCxDQUFlMkQsS0FBZixFQUFzQm1DLE9BQXRCO0FBQ0Esb0JBQUdWLFFBQVEvQyxHQUFSLENBQVksQ0FBWixFQUFlOUIsS0FBbEIsRUFBd0I7QUFDdEIseUJBQUsxQixXQUFMLEdBQW1Cd0YsT0FBTyxPQUFLeEYsV0FBWixJQUEyQndGLE9BQU9lLFFBQVEvQyxHQUFSLENBQVksQ0FBWixFQUFlOUIsS0FBdEIsQ0FBOUM7QUFDQSx5QkFBSzFCLFdBQUwsR0FBbUJ3RixPQUFPa0MsZUFBS0Msa0JBQUwsQ0FBd0IsT0FBSzNILFdBQTdCLENBQVAsQ0FBbkI7QUFDQSx5QkFBS2tILE1BQUw7QUFDRDtBQUNELG9CQUFHWCxRQUFRL0MsR0FBUixDQUFZLENBQVosRUFBZTBDLEdBQWYsSUFBc0IsQ0FBekIsRUFBMkI7QUFDekIseUJBQUt2RSxVQUFMLENBQWdCb0csTUFBaEIsQ0FBdUJELEdBQXZCLEVBQTJCLENBQTNCO0FBQ0EseUJBQUtaLE1BQUw7QUFDRDtBQUNGO0FBQ0YsYUFmRCxNQWVLO0FBQ0g7QUFDRDtBQUNGLFdBbkJEO0FBb0JEO0FBQ0Q7QUFDQXhDLFdBQUc2QyxVQUFILENBQWMsRUFBQ0MsS0FBSSxlQUFMLEVBQXFCM0gsTUFBSyxLQUExQixFQUFkO0FBQ0QsT0F6TE87O0FBMExSO0FBQ0FtSSxrQkEzTFEsMEJBMkxNO0FBQ1osYUFBSzNILFlBQUwsR0FBb0IsQ0FBQyxLQUFLZ0MsU0FBMUI7QUFDQSxhQUFLQSxTQUFMLEdBQWlCLENBQUMsS0FBS0EsU0FBdkI7QUFDSCxPQTlMUzs7QUErTFI7QUFDQTRGLGVBaE1RLHVCQWdNRztBQUFBOztBQUNUdkQsV0FBR3dELFVBQUgsQ0FBYztBQUNaVixlQUFLLE9BRE87QUFFWlcsbUJBQVMsc0JBQU87QUFDZEMsb0JBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EzRCxlQUFHTyxXQUFILENBQWU7QUFDYkMscUJBQU8sVUFETTtBQUVib0Qsb0JBQU07QUFGTyxhQUFmO0FBSUEsbUJBQUtoRyxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsbUJBQUtELFNBQUwsR0FBaUIsS0FBakI7QUFDQSxtQkFBS0UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLG1CQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsbUJBQUswRSxNQUFMO0FBQ0FxQiwyQkFBS0MsT0FBTCxDQUFhO0FBQ1g1RCxtQkFBSzZELElBQUlDLE9BQUosR0FBYyx5QkFEUjtBQUVYQyxzQkFBUSxLQUZHO0FBR1g5SSxvQkFBTTtBQUNKK0kseUJBQVEsT0FBS2pJLFFBRFQ7QUFFSjtBQUNBa0ksMEJBQVUsMkJBQTJCLE9BQUs5SSxNQUFoQyxHQUF5QyxNQUF6QyxHQUFrRCxPQUFLWTtBQUg3RCxlQUhLO0FBUVhtSSxzQkFBUTtBQUNOQyx3QkFBUyxnQ0FESDtBQUVOQywrQkFBZ0IsWUFBVyxPQUFLbEo7QUFGMUI7QUFSRyxhQUFiLEVBWUdtSixJQVpILENBWVEsa0JBQVE7QUFDZHZFLGlCQUFHd0UsV0FBSDtBQUNBLHFCQUFLekcsU0FBTCxHQUFpQjBHLE9BQU90SixJQUFQLENBQVl1SixPQUE3QjtBQUNBLHFCQUFLbEMsTUFBTDtBQUNELGFBaEJEO0FBaUJEO0FBOUJXLFNBQWQ7QUFnQ0QsT0FqT087O0FBa09SO0FBQ0FtQyxhQW5PUSxtQkFtT0FDLE1Bbk9BLEVBbU9PO0FBQ2IsWUFBSUMsU0FBU0QsTUFBYjtBQUNBNUUsV0FBRzhFLFlBQUgsQ0FBZ0I7QUFDZDVFLGVBQUsyRSxNQURTO0FBRWRwQixtQkFBUyxpQkFBQ3NCLEdBQUQsRUFBTztBQUNkL0UsZUFBR2dGLHNCQUFILENBQTBCO0FBQ3hCQyx3QkFBVUYsSUFBSUcsWUFEVTtBQUV4QnpCLHVCQUFTLGlCQUFDdEksSUFBRCxFQUFRO0FBQ2Y2RSxtQkFBR2UsU0FBSCxDQUFhO0FBQ1hQLHlCQUFPLE1BREk7QUFFWDJFLHdCQUFNLFNBRks7QUFHWGxFLDRCQUFVO0FBSEMsaUJBQWI7QUFLRCxlQVJ1QjtBQVN4Qm1FLG9CQUFNLGNBQUNDLEdBQUQsRUFBTztBQUNULG9CQUFJQSxJQUFJQyxNQUFKLEtBQWUseUNBQW5CLEVBQThEO0FBQzVEdEYscUJBQUd1RixXQUFILENBQWU7QUFDYjlCLDJCQURhLG1CQUNMK0IsV0FESyxFQUNRO0FBQ3JCLDBCQUFJQSxZQUFZQyxXQUFaLENBQXdCLHdCQUF4QixDQUFKLEVBQXVEO0FBQ3JEL0IsZ0NBQVFDLEdBQVIsQ0FBWSwwQkFBWjtBQUNELHVCQUZELE1BRU87QUFDTEQsZ0NBQVFDLEdBQVIsQ0FBWSx5QkFBWjtBQUNEO0FBQ0E7QUFQWSxtQkFBZjtBQVNEO0FBQ0o7QUFyQnVCLGFBQTFCO0FBdUJEO0FBMUJhLFNBQWhCO0FBNEJELE9BalFPO0FBa1FSK0IsaUJBbFFRLHlCQWtRSztBQUNYLGFBQUs1SCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0YsZUFBTCxHQUF1QixLQUF2QjtBQUNBLGFBQUs0RSxNQUFMO0FBQ0QsT0F0UU87QUF1UVJtRCxnQkF2UVEsc0JBdVFHakgsT0F2UUgsRUF1UVdrSCxTQXZRWCxFQXVRcUJDLFVBdlFyQixFQXVRZ0M7QUFBQTs7QUFDdEMsWUFBSUMsT0FBTyxDQUFYO0FBQ0EsWUFBSUMsUUFBUSxDQUFaO0FBQ0EsYUFBSzlJLFVBQUwsQ0FBZ0IyRSxPQUFoQixDQUF3QixtQkFBVztBQUNqQyxjQUFHQyxRQUFRbkQsT0FBUixJQUFtQkEsT0FBdEIsRUFBOEI7QUFDNUJxSCxvQkFBTyxDQUFQO0FBQ0FsRSxvQkFBUS9DLEdBQVIsQ0FBWThDLE9BQVosQ0FBb0IsZUFBTztBQUN6QmtFLHNCQUFNL0QsSUFBSVAsR0FBVjtBQUNELGFBRkQ7QUFHQSxtQkFBSzNDLFdBQUwsR0FBbUJpSCxJQUFuQjtBQUNEO0FBQ0YsU0FSRDtBQVNBLFlBQUdDLFNBQU8sQ0FBVixFQUFZO0FBQ1YsZUFBS2xILFdBQUwsR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGFBQUtELGFBQUwsR0FBcUJnSCxTQUFyQjtBQUNBLGFBQUt0RCxjQUFMLEdBQXNCdUQsVUFBdEI7QUFDQSxhQUFLbkgsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0QsS0FBTCxHQUFhLEVBQWI7QUFDQSxZQUFJeUIsTUFBTThGLHFCQUFXQyxpQkFBckI7QUFDQSxzQ0FBWS9GLEdBQVosRUFBZ0IsTUFBaEIsRUFBdUIsRUFBQ3hCLFNBQVFBLE9BQVQsRUFBdkIsRUFBMEM2RixJQUExQyxDQUErQyxlQUFLO0FBQ2xELGlCQUFLaEcsY0FBTCxHQUFzQndHLElBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLENBQXRCO0FBQ0EsaUJBQUtxRCxTQUFMLEdBQWlCdUcsSUFBSTVKLElBQUosQ0FBU0EsSUFBVCxDQUFjLENBQWQsRUFBaUIrSyxPQUFsQztBQUNBLGlCQUFLMUQsTUFBTDtBQUNBdUMsY0FBSTVKLElBQUosQ0FBU0EsSUFBVCxDQUFjLENBQWQsRUFBaUIrSyxPQUFqQixDQUF5QnRFLE9BQXpCLENBQWlDLG1CQUFXO0FBQzFDLG1CQUFLbkQsS0FBTCxDQUFXaUQsSUFBWCxDQUFnQkcsUUFBUXNFLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUJDLEVBQXJDO0FBQ0x2RSxvQkFBUXNFLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUJFLE9BQXJCLEdBQStCLElBQS9CO0FBQ0ksV0FIRDtBQUlKLGlCQUFLQyxhQUFMLENBQW1CLE9BQUs3SCxLQUF4QjtBQUNHLFNBVEQ7QUFVRCxPQXJTTztBQXNTUjhILGNBdFNRLG9CQXNTRUMsUUF0U0YsRUFzU1dwRixJQXRTWCxFQXNTZ0JxRixXQXRTaEIsRUFzUzRCO0FBQUE7O0FBQ2xDLFlBQUloSSxRQUFRLEVBQVo7QUFDSjJDLGFBQUsrRSxTQUFMLENBQWV2RSxPQUFmLENBQXVCLFVBQUNDLE9BQUQsRUFBUzZFLElBQVQsRUFBa0I7QUFDeEMsY0FBRzdFLFFBQVF1RSxFQUFSLElBQWNJLFNBQVNKLEVBQTFCLEVBQTZCO0FBQzVCLG1CQUFLNUgsU0FBTCxDQUFlaUksV0FBZixFQUE0Qk4sU0FBNUIsQ0FBc0NPLElBQXRDLEVBQTRDTCxPQUE1QyxHQUFzRCxJQUF0RDtBQUNBLFdBRkQsTUFFSztBQUNKLG1CQUFLN0gsU0FBTCxDQUFlaUksV0FBZixFQUE0Qk4sU0FBNUIsQ0FBc0NPLElBQXRDLEVBQTRDTCxPQUE1QyxHQUFzRCxLQUF0RDtBQUNBO0FBQ0QsU0FORDtBQU9BLGFBQUs3RCxNQUFMO0FBQ0EsYUFBS2hFLFNBQUwsQ0FBZW9ELE9BQWYsQ0FBdUIsVUFBQ0MsT0FBRCxFQUFTdUIsR0FBVCxFQUFpQjtBQUN2QyxjQUFHaEMsS0FBS3VGLElBQUwsSUFBYTlFLFFBQVE4RSxJQUF4QixFQUE2QjtBQUM1QjlFLG9CQUFRc0UsU0FBUixDQUFrQnZFLE9BQWxCLENBQTBCLGVBQU87QUFDaEMsa0JBQUdHLElBQUlzRSxPQUFQLEVBQWU7QUFDZCxvQkFBRyxPQUFLNUgsS0FBTCxDQUFXMkUsR0FBWCxLQUFtQnJCLElBQUlxRSxFQUExQixFQUE2QjtBQUM1QjtBQUNBLGlCQUZELE1BRUs7QUFDSyx5QkFBSzNILEtBQUwsQ0FBVzJFLEdBQVgsSUFBa0JyQixJQUFJcUUsRUFBdEI7QUFDRDtBQUNUO0FBQ0QsYUFSRDtBQVNBO0FBQ0csU0FaTDtBQWFJLGFBQUs1RCxNQUFMO0FBQ0osYUFBSzhELGFBQUwsQ0FBbUIsS0FBSzdILEtBQXhCO0FBQ0E7QUEvVFUsSzs7QUF0QlY7Ozs7O3NDQUVrQnNHLEcsRUFBSTtBQUNyQixVQUFJNkIsT0FBTyxJQUFYO0FBQ0EsVUFBSTdCLElBQUk4QixJQUFKLEtBQWEsUUFBakIsRUFBMkIsQ0FFMUI7QUFEQzs7QUFFRDtBQUNELGFBQU87QUFDTHJHLGVBQU8sS0FBSy9FLE9BQUwsQ0FBYStFLEtBRGY7QUFFTHNHLGNBQU0sMkJBQTJCLEtBQUt6TCxNQUFoQyxHQUF5QyxNQUF6QyxHQUFrRCxLQUFLWSxRQUZ4RDtBQUdMd0gsaUJBQVMsaUJBQVNzQixHQUFULEVBQWM7QUFDdEI2QixlQUFLRyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0FILGVBQUtJLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQUosZUFBS0ssVUFBTCxHQUFrQixHQUFsQjtBQUNBTCxlQUFLcEUsTUFBTDtBQUNBLFNBUkk7QUFTTDRDLGNBQU0sY0FBU0wsR0FBVCxFQUFjO0FBQ2xCO0FBQ0Q7QUFYSSxPQUFQO0FBYUE7Ozs7QUFrVUQ7b0NBQ2U7QUFBQTs7QUFDYixVQUFJbUMsUUFBUTtBQUNWakssb0JBQVcsS0FBS0E7QUFETixPQUFaO0FBR0EsVUFBSWtLLFlBQVksQ0FBaEI7QUFDQSxXQUFLbEssVUFBTCxDQUFnQjJFLE9BQWhCLENBQXdCLG1CQUFXO0FBQy9CLFlBQUlKLE1BQU0sQ0FBVjtBQUNBSyxnQkFBUS9DLEdBQVIsQ0FBWThDLE9BQVosQ0FBb0IsZUFBTztBQUN6QkosaUJBQU9PLElBQUlQLEdBQVg7QUFDRCxTQUZEO0FBR0FLLGdCQUFRdUYsUUFBUixHQUFtQjVGLEdBQW5CO0FBQ0gsT0FORDtBQU9BLFVBQUcsS0FBS3BDLGFBQVIsRUFBc0I7QUFBTTtBQUMxQixhQUFLbkMsVUFBTCxDQUFnQjJFLE9BQWhCLENBQXdCLG1CQUFXO0FBQy9CLGNBQUlKLE1BQU0sQ0FBVjtBQUNBSyxrQkFBUS9DLEdBQVIsQ0FBWThDLE9BQVosQ0FBb0IsZUFBTztBQUN6QkosbUJBQU9PLElBQUlQLEdBQVg7QUFDRCxXQUZEO0FBR0EyRix1QkFBYXJHLE9BQU9lLFFBQVFRLE9BQWYsSUFBd0JiLEdBQXJDO0FBQ0gsU0FORDtBQU9EO0FBQ0QsVUFBRyxLQUFLakcsV0FBTCxJQUFvQixDQUFwQixJQUF5QixLQUFLRCxXQUFMLElBQW9CLE1BQWhELEVBQXVEO0FBQ3JEMEUsV0FBR2UsU0FBSCxDQUFhO0FBQ1hQLGlCQUFPLE9BREk7QUFFWFEsaUJBQU0sZ0NBRks7QUFHWEMsb0JBQVU7QUFIQyxTQUFiO0FBS0QsT0FORCxNQU1LO0FBQ0hqQixXQUFHNkMsVUFBSCxDQUFjO0FBQ1pDLGVBQUssYUFETztBQUVaM0gsZ0JBQUsrTCxLQUZPO0FBR1p6RCxtQkFBUSxtQkFBSTtBQUNWekQsZUFBR1ksVUFBSCxDQUFjO0FBQ1pWLDJDQUEwQixPQUFLN0UsTUFBL0Isb0JBQW9ELE9BQUtDLFdBQXpELG1CQUFrRjZMLFNBQWxGLHFCQUEyRyxPQUFLN0g7QUFEcEcsYUFBZDtBQUdEO0FBUFcsU0FBZDtBQVNEO0FBQ0Y7QUFDRDs7OzttQ0FDYztBQUFBOztBQUNaLFdBQUtyQyxVQUFMLENBQWdCMkUsT0FBaEIsQ0FBd0IsVUFBQ0MsT0FBRCxFQUFTekIsS0FBVCxFQUFtQjtBQUN2QyxZQUFHeUIsUUFBUW5ELE9BQVIsSUFBbUIsT0FBS0UsYUFBTCxDQUFtQkYsT0FBekMsRUFBaUQ7QUFDL0NtRCxrQkFBUS9DLEdBQVIsQ0FBWThDLE9BQVosQ0FBb0IsVUFBQ0csR0FBRCxFQUFLcUIsR0FBTCxFQUFhO0FBQy9CLGdCQUFHckIsSUFBSVIsR0FBSixJQUFXLE9BQUt0QyxTQUFuQixFQUE2QjtBQUMzQjhDLGtCQUFJUCxHQUFKO0FBQ0EscUJBQUtqRyxXQUFMO0FBQ0EscUJBQUtzRCxXQUFMO0FBQ0Esa0JBQUlrRSxRQUFTLE9BQUtwRSxXQUFOLEdBQW1CLENBQS9CO0FBQ0EscUJBQUtyRCxXQUFMLEdBQW1Cd0YsT0FBTyxPQUFLeEYsV0FBWixJQUEyQndGLE9BQU9pQyxLQUFQLENBQTlDO0FBQ0EscUJBQUt6SCxXQUFMLEdBQW1Cd0YsT0FBT2tDLGVBQUtDLGtCQUFMLENBQXdCLE9BQUszSCxXQUE3QixDQUFQLENBQW5CO0FBQ0Esa0JBQUd5RyxJQUFJUCxHQUFKLElBQVcsQ0FBZCxFQUFnQjtBQUNkSyx3QkFBUS9DLEdBQVIsQ0FBWXVFLE1BQVosQ0FBbUJELEdBQW5CLEVBQXVCLENBQXZCO0FBQ0Esb0JBQUd2QixRQUFRL0MsR0FBUixDQUFZMkMsTUFBWixJQUFvQixDQUF2QixFQUF5QjtBQUN2Qix5QkFBS3hFLFVBQUwsQ0FBZ0JvRyxNQUFoQixDQUF1QmpELEtBQXZCLEVBQTZCLENBQTdCO0FBQ0QsaUJBRkQsTUFFSztBQUNIO0FBQ0Q7QUFDRjtBQUNGLGFBZkQsTUFlSztBQUNISixpQkFBR2UsU0FBSCxDQUFhLEVBQUNQLE9BQU8sVUFBUixFQUFtQjJFLE1BQU0sTUFBekIsRUFBYjtBQUNEO0FBQ0YsV0FuQkQ7QUFvQkQsU0FyQkQsTUFxQks7QUFDSDtBQUNEO0FBQ0YsT0F6Qkg7QUEwQkQ7QUFDRDs7OztzQ0FDaUI7QUFBQTs7QUFDZjtBQUNBLFVBQUlrQyxvQkFBb0JyQixxQkFBV3NCLGVBQW5DO0FBQ0EsVUFBSUMscUJBQXFCO0FBQ3ZCQyxjQUFNM0QsZUFBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQkYsSUFEVDtBQUV2QnZGLGNBQU0sS0FBSzVHLE1BRlk7QUFHdkJzTSxjQUFNOUQsZUFBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQnRJLGFBQTFCLElBQTJDO0FBSDFCLE9BQXpCO0FBS0Esb0NBQVlpSSxpQkFBWixFQUE4QixNQUE5QixFQUFxQ0Usa0JBQXJDLEVBQXlEaEQsSUFBekQsQ0FBOEQsZUFBSztBQUNqRSxlQUFLL0gsUUFBTCxHQUFnQnVJLElBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBYytHLEtBQTlCO0FBQ0EsZUFBSzVELE9BQUwsR0FBZXlHLElBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBYytHLEtBQWQsQ0FBb0IsQ0FBcEIsRUFBdUI1RCxPQUF0QztBQUNBLGVBQUtrRSxNQUFMO0FBQ0E7QUFDQSxlQUFLbkMsaUJBQUwsQ0FBdUIwRSxJQUFJNUosSUFBSixDQUFTQSxJQUFULENBQWMrRyxLQUFkLENBQW9CLENBQXBCLEVBQXVCNUQsT0FBOUM7QUFDRCxPQU5EO0FBT0Q7QUFDRDs7OztzQ0FDa0JBLE8sRUFBUTtBQUFBOztBQUN4QixVQUFJNEIsTUFBTThGLHFCQUFXNEIsaUJBQXJCO0FBQ0EsVUFBSXpNLE9BQU87QUFDVHFNLGNBQU0zRCxlQUFLNEQsU0FBTCxDQUFlQyxVQUFmLENBQTBCRixJQUR2QjtBQUVUdkYsY0FBTSxLQUFLNUcsTUFGRjtBQUdUc00sY0FBTTlELGVBQUs0RCxTQUFMLENBQWVDLFVBQWYsQ0FBMEJ0SSxhQUExQixJQUEyQyxDQUh4QztBQUlUeUksY0FBTXZKLE9BSkc7QUFLVHdKLGtCQUFVLEtBQUs3SjtBQUxOLE9BQVg7QUFPQSxvQ0FBWWlDLEdBQVosRUFBZ0IsTUFBaEIsRUFBdUIvRSxJQUF2QixFQUE2Qm9KLElBQTdCLENBQWtDLGVBQUs7QUFDckN2RSxXQUFHd0UsV0FBSDtBQUNBLFlBQUcsUUFBS3ZHLElBQUwsSUFBYSxDQUFoQixFQUFrQjtBQUNoQixrQkFBS0UsU0FBTCxHQUFpQixJQUFqQjtBQUNBNEcsY0FBSTVKLElBQUosQ0FBU0EsSUFBVCxDQUFjeUcsT0FBZCxDQUFzQixtQkFBVztBQUMvQixnQkFBR0MsUUFBUS9DLEdBQVIsSUFBZSxDQUFsQixFQUFvQjtBQUNsQitDLHNCQUFRN0UsS0FBUixHQUFnQjZFLFFBQVFhLElBQVIsQ0FBYTFGLEtBQTdCO0FBQ0Q7QUFDRDZFLG9CQUFRVSxPQUFSLEdBQWtCLENBQWxCO0FBQ0QsV0FMRDtBQU1BLGtCQUFLOUYsU0FBTCxHQUFpQnNJLElBQUk1SixJQUFKLENBQVNBLElBQTFCO0FBQ0EwSSx5QkFBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQmpMLFNBQTFCLEdBQXNDc0ksSUFBSTVKLElBQUosQ0FBU0EsSUFBL0M7QUFDQSxrQkFBS3FILE1BQUw7QUFDRCxTQVhELE1BV0s7QUFDSCxjQUFHdUMsSUFBSTVKLElBQUosQ0FBU0EsSUFBVCxDQUFjc0csTUFBZCxJQUF3QixDQUEzQixFQUE2QjtBQUMzQnpCLGVBQUdlLFNBQUgsQ0FBYSxFQUFDUCxPQUFPLFNBQVIsRUFBa0IyRSxNQUFNLE1BQXhCLEVBQWI7QUFDRCxXQUZELE1BRUs7QUFDSEosZ0JBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBY3lHLE9BQWQsQ0FBc0IsbUJBQVc7QUFDL0Isa0JBQUdDLFFBQVEvQyxHQUFSLElBQWUsQ0FBbEIsRUFBb0I7QUFDbEIrQyx3QkFBUTdFLEtBQVIsR0FBZ0I2RSxRQUFRYSxJQUFSLENBQWExRixLQUE3QjtBQUNEO0FBQ0Q2RSxzQkFBUVUsT0FBUixHQUFrQixDQUFsQjtBQUNBLHNCQUFLOUYsU0FBTCxDQUFlaUYsSUFBZixDQUFvQkcsT0FBcEI7QUFDRCxhQU5EO0FBT0Q7QUFDRjtBQUNELGdCQUFLcEYsU0FBTCxDQUFlbUYsT0FBZixDQUF1QixVQUFDQyxPQUFELEVBQVN6QixLQUFULEVBQW1CO0FBQ3hDLGtCQUFLbkQsVUFBTCxDQUFnQjJFLE9BQWhCLENBQXdCLFVBQUNHLEdBQUQsRUFBS3FCLEdBQUwsRUFBYTtBQUNuQyxnQkFBR3ZCLFFBQVFuRCxPQUFSLElBQWlCcUQsSUFBSXJELE9BQXhCLEVBQWdDO0FBQzlCLHNCQUFLakMsU0FBTCxDQUFlMkQsS0FBZixFQUFzQm1DLE9BQXRCLEdBQWdDUixJQUFJakQsR0FBSixDQUFRLENBQVIsRUFBVzBDLEdBQTNDO0FBQ0Esc0JBQUtnQixNQUFMO0FBQ0Q7QUFDRixXQUxEO0FBTUQsU0FQRDtBQVFELE9BbENEO0FBbUNEO0FBQ0Q7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUFFUXVGLHVCLEdBQVUsS0FBS0EsTztBQUNmN0gsbUIsR0FBTTZELElBQUlDLE9BQUosR0FBYyxlQUFkLEdBQWdDLEtBQUsvSCxROzt1QkFDM0M0SCxlQUFLQyxPQUFMLENBQWE7QUFDakI1RCx1QkFBS0EsR0FEWTtBQUVqQitELDBCQUFRLEtBRlM7QUFHakJHLDBCQUFPO0FBQ0wsOEJBQVM7QUFESjtBQUhVLGlCQUFiLEVBTUhHLElBTkcsQ0FNRSxlQUFLO0FBQ1gsMEJBQUszSSxPQUFMLEdBQWVtSixJQUFJNUosSUFBSixDQUFTdUosT0FBVCxDQUFpQnNELFFBQWhDO0FBQ0FuRSxpQ0FBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQnJNLE1BQTFCLEdBQW1DMEosSUFBSTVKLElBQUosQ0FBU3VKLE9BQVQsQ0FBaUJ1RCxXQUFwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBS2pLLGFBQUwsR0FBcUIrRyxJQUFJNUosSUFBSixDQUFTdUosT0FBOUI7QUFDQSwwQkFBSzNJLGFBQUwsR0FBcUJnSixJQUFJNUosSUFBSixDQUFTdUosT0FBVCxDQUFpQndELE9BQXRDO0FBQ0EsMEJBQUsxRixNQUFMO0FBQ0QsaUJBcEJLLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztrQ0FDYy9ELEssRUFBTTtBQUFBOztBQUNyQixVQUFJeUIsTUFBTThGLHFCQUFXTSxhQUFyQjtBQUNBLFVBQUluTCxPQUFPO0FBQ1Z1RCxpQkFBUSxLQUFLQSxPQURIO0FBRVJELGVBQU9BLFNBQVM7QUFGUixPQUFYO0FBSUEsb0NBQVl5QixHQUFaLEVBQWdCLE1BQWhCLEVBQXVCL0UsSUFBdkIsRUFBNkJvSixJQUE3QixDQUFrQyxlQUFLO0FBQ2xDLGdCQUFLNUYsV0FBTCxHQUFtQm9HLElBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLEVBQWlCNkIsS0FBcEM7QUFDQSxnQkFBS21MLEtBQUwsR0FBYXBELElBQUk1SixJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLEVBQWlCZ04sS0FBOUI7QUFDQSxnQkFBS2xKLFNBQUwsR0FBaUI4RixJQUFJNUosSUFBSixDQUFTQSxJQUFULENBQWMsQ0FBZCxFQUFpQjJELEdBQWxDO0FBQ0EsZ0JBQUtJLFdBQUwsR0FBbUI2RixJQUFJNUosSUFBSixDQUFTQSxJQUFULENBQWMsQ0FBZCxFQUFpQjhHLElBQXBDO0FBQ0EsZ0JBQUttRyxTQUFMO0FBQ0EsZ0JBQUs1RixNQUFMO0FBQ0QsT0FQSjtBQVFBOzs7MkJBQ1E2RixPLEVBQVE7QUFBQTs7QUFDYixVQUFHQSxRQUFRL0ksV0FBWCxFQUF3QixLQUFLQSxXQUFMLEdBQW1CK0ksUUFBUS9JLFdBQTNCO0FBQ3hCLFdBQUtELFNBQUwsR0FBaUJnSixRQUFRaEosU0FBekI7QUFDQSxXQUFLRCxhQUFMLEdBQXFCeUUsZUFBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQnRJLGFBQS9DO0FBQ0EsV0FBSy9ELE1BQUwsR0FBY2dOLFFBQVFwRyxJQUF0QjtBQUNBNEIscUJBQUs0RCxTQUFMLENBQWVDLFVBQWYsQ0FBMEJyTSxNQUExQixHQUFtQ2dOLFFBQVFwRyxJQUEzQztBQUNBLFdBQUsxRSxPQUFMLEdBQWU4SyxRQUFROUssT0FBdkI7QUFDQTtBQUNBLFdBQUsrSyxlQUFMO0FBQ0E7QUFDQSxXQUFLbE4sS0FBTCxHQUFhNEUsR0FBR3VJLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBYixDQUF3QztBQUN4QyxXQUFLak0sVUFBTCxHQUFrQitMLFFBQVE3RyxHQUExQjtBQUNBO0FBQ0E7QUFDQXhCLFNBQUd3RCxVQUFILENBQWM7QUFDWlYsYUFBSyxNQURPO0FBRVpXLGlCQUFTLHNCQUFLO0FBQ1osa0JBQUtyRyxjQUFMLEdBQXNCMkgsSUFBSTVKLElBQUosQ0FBU2lDLGNBQS9CO0FBQ0Esa0JBQUtELGFBQUwsR0FBcUI0SCxJQUFJNUosSUFBSixDQUFTZ0MsYUFBOUI7QUFDQSxrQkFBS3FGLE1BQUw7QUFDQTtBQUNBLGNBQUcsUUFBS3BGLGNBQVIsRUFBdUI7QUFDckIsZ0JBQUcsUUFBS0QsYUFBUixFQUFzQjtBQUNwQjtBQUNELGFBRkQsTUFFSztBQUNIO0FBQ0E2QyxpQkFBR3dJLFVBQUgsQ0FBYztBQUNadEkscUJBQUk7QUFEUSxlQUFkO0FBR0Q7QUFDRjtBQUNGO0FBakJXLE9BQWQ7QUFtQkFGLFNBQUd5SSxhQUFILENBQWlCO0FBQ2ZoRixpQkFBUSxpQkFBQ3NCLEdBQUQsRUFBTztBQUNiLGtCQUFLN0csU0FBTCxHQUFpQjZHLElBQUkyRCxZQUFKLEdBQWlCLEdBQWxDO0FBQ0Esa0JBQUtsRyxNQUFMO0FBQ0Q7QUFKYyxPQUFqQjtBQU1EOzs7NkJBQ087QUFDTixVQUFHcUIsZUFBSzRELFNBQUwsQ0FBZUMsVUFBZixDQUEwQnRJLGFBQTdCLEVBQTRDWSxHQUFHMkkscUJBQUgsQ0FBeUIsRUFBQ25JLE9BQU8sSUFBUixFQUF6QjtBQUM1Q1IsU0FBRzRJLGFBQUgsQ0FBaUIsRUFBQzlGLEtBQUssY0FBTixFQUFqQjtBQUNEO0FBQ0Q7Ozs7Z0NBQ1c7QUFDVDtBQUNBLFVBQUkrRixZQUFZN0ksR0FBRzhJLGVBQUgsQ0FBbUI7QUFDakM3SCxrQkFBVSxHQUR1QjtBQUVqQzhILHdCQUFnQixRQUZpQjtBQUdqQ0MsZUFBTztBQUgwQixPQUFuQixDQUFoQjtBQUtBLFdBQUtILFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0FBLGdCQUFVSSxVQUFWLENBQXFCLEdBQXJCLEVBQTBCQyxJQUExQjtBQUNBLFdBQUtDLGFBQUwsR0FBcUJOLFVBQVVPLE1BQVYsRUFBckIsRUFDQSxLQUFLeEwsZUFBTCxHQUFzQixJQUR0QjtBQUVBeUwsaUJBQVcsWUFBWTtBQUNyQlIsa0JBQVVJLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0JDLElBQXhCO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQk4sVUFBVU8sTUFBVixFQUFyQjtBQUNELE9BSFUsQ0FHVEUsSUFIUyxDQUdKLElBSEksQ0FBWCxFQUdjLEdBSGQ7QUFJRDtBQUNEOzs7O2dDQUNXO0FBQ1QsVUFBSVQsWUFBWTdJLEdBQUc4SSxlQUFILENBQW1CO0FBQ2pDN0gsa0JBQVUsR0FEdUI7QUFFakM4SCx3QkFBZ0IsUUFGaUI7QUFHakNDLGVBQU87QUFIMEIsT0FBbkIsQ0FBaEI7QUFLQSxXQUFLSCxTQUFMLEdBQWlCQSxTQUFqQjtBQUNBQSxnQkFBVUksVUFBVixDQUFxQixHQUFyQixFQUEwQkMsSUFBMUI7QUFDQSxXQUFLQyxhQUFMLEdBQXFCTixVQUFVTyxNQUFWLEVBQXJCLEVBQ0FDLFdBQVcsWUFBWTtBQUNyQlIsa0JBQVVJLFVBQVYsQ0FBcUIsQ0FBckIsRUFBd0JDLElBQXhCO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQk4sVUFBVU8sTUFBVixFQUFyQixFQUNBLEtBQUt4TCxlQUFMLEdBQXVCLEtBRHZCO0FBRUQsT0FKVSxDQUlUMEwsSUFKUyxDQUlKLElBSkksQ0FBWCxFQUljLEdBSmQsQ0FEQTtBQU1EOzs7O0VBbnFCa0N6RixlQUFLNUYsSTs7a0JBQXJCL0MsTyIsImZpbGUiOiJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB1dGlsIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL3V0aWwnXG4gIFxuICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdFVybCdcbiAgaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdERhdGEnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGl2ZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjonJyxcbiAgICAgIHNob3BJZDowLFxuICAgICAgdXBkYXRlVG90YWw6MCwgICAgICAgICAgICAgICAvL+abtOaWsOeahOaAu+S7t1xuICAgICAgdXBkYXRlQ291bnQ6MCwgICAgICAgICAgICAgICAvL+abtOaWsOeahOaVsOmHj1xuICAgICAgZXh0Q29uZmlnOm51bGwsXG4gICAgICBqT2JqZWN0Om51bGwsICAgICAgICAgICAgICAgIC8v6K+m5oOF6aG15pWw5o2uXG4gICAgICBzZWxsSW5mb1Nob3c6ZmFsc2UsXG4gICAgICBmb29kSW5mb1Nob3c6ZmFsc2UsXG4gICAgICBpbWdVcmxzOiBbXSxcbiAgICAgIGRldGFpbFRpdGxlOicnLFxuICAgICAgZGV0YWlsUHJpY2U6MCxcbiAgICAgIGRldGFpbENvbnRlbnQ6JycsXG4gICAgICBkZXRhaWxDb3ZlcjonJyxcbiAgICAgIGRldGFpbElkOjAsICAgICAgICAgLy/llYblk4FJZFxuICAgICAgZG9tSGVpZ2h0OltdLCAgICAgICAvL+WVhuWTgeWIl+ihqHNjcm9sbFRvcOaVsOe7hFxuICAgICAgZGV0YWlsTnVtOjAsXG4gICAgICBkZXRhaWxPYmplY3Q6bnVsbCxcbiAgICAgIHRhYmxlTnVtOjAsXG4gICAgICBlYXRGb29kTnVtOjAsXG4gICAgICBhY3Rpdml0eTpbXSxcbiAgICAgIGNhdGVsb2dzOltdLFxuICAgICAgdGFrZWF3YXlzOltdLFxuICAgICAgYWxsVGFrZWF3YXlzOltdLFxuICAgICAgYWN0aXZpdHlzTGVuZ3RoOjAsICAgLy/mtLvliqjplb/luqZcbiAgICAgIGdvb2RzOltdLFxuICAgICAgZ29vZHNMZW5ndGg6MCxcbiAgICAgIHJlZHVjZUljb246J25vbmUnLCAgLy/lh4/lsJHnmoRpY29uXG4gICAgICBjb3VudDowLCAgICAgICAgLy/otK3nianovabmgLvmlbBcbiAgICAgIHByaWNlOjAsICAgICAgICAvL+WVhuWTgeaAu+S7t1xuICAgICAgb3JkZXJHb29kczpbXSwgICAvL+eUqOaIt+aJgOmAieeahOWVhuWTgeWvueixoVxuICAgICAgZGV0YWlsRGF0YTpudWxsLFxuICAgICAgc29ja2V0Rm9vZE51bTonJyxcbiAgICAgIHNvY2tldFRhYmxlTnVtOicnLFxuICAgICAgc29ja2V0T3BlbjpmYWxzZSxcbiAgICAgIHByaWNlMTowLCAgICAvL+S4remXtOWPmOmHj++8jOeUqOadpeaAu+S7t+i9rOaNolxuICAgICAgbG9nb0ltZzonJyxcbiAgICAgIGRlbGl2ZXJEYXRhOm51bGwsXG4gICAgICBzb2NrdEJ0blRpdGxlOiAn6L+e5o6lc29ja2V0JyxcbiAgICAgIHNvY2tldE1zZ1F1ZXVlOltdLFxuICAgICAgc2hhcmVTaG93OmZhbHNlLFxuICAgICAgc2hvd01vZGFsU3RhdHVzOmZhbHNlLFxuICAgICAgaGFpYmFvYnRuOmZhbHNlLFxuICAgICAgaGFvYmFvU2hvdzp0cnVlLFxuICAgICAgaGFpQmFvSW1nOicnLFxuICAgICAgeGFpbmdxaW5nRGF0YTonJyxcbiAgICAgIHBhZ2U6MCxcbiAgICAgIG5ld1N0eWxlczowLFxuICAgICAgZ29vZHNTaG93OmZhbHNlLFxuICAgICAgY3VycmVudEluZGV4OjAsXG4gICAgICBzY3JvbGxSaWdodFRvOjAsXG4gICAgICBjbGFzc2lkOicnLFxuICAgICAgUHJvZHVjdERldGFpbHM6bnVsbCxcbiAgICAgIGdvb2RzU2t1czpbXSxcbiAgICAgIHNwZWNzOltdLFxuICAgICAgcG9ubHlpZDonJyxcbiAgICAgIGNob29zZVByaWNlOicnLFxuICAgICAgc2t1c0dvb2RzSXRlbTpudWxsLFxuICAgICAgc2t1c0Zvb2ROdW06MCxcbiAgICAgIFNLVTpbXSxcbiAgICAgIHNrdXNOdW06MSxcbiAgICAgIHNrdV9udW06MSxcbiAgICAgIFNLVVN0cmluZzonJyxcbiAgICAgIHByb2R1Y3RNX2lkOicnLFxuICAgICAgc2t1XzpbXSxcbiAgICAgIHRha2VPdXRTdGF0dXM6JycsXG4gICAgICBzZW5kUHJpY2U6JycsXG4gICAgICB0YWtlT3V0TV9pZDonJ1xuICAgIH1cbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI2NScsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn54K56aSQJyxcbiAgICAgIGRpc2FibGVTY3JvbGw6dHJ1ZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge31cbiAgICAvL+iuoeeul+WxnuaAp1xuICAgIGNvbXB1dGVkID0ge31cbiAgICBvblNoYXJlQXBwTWVzc2FnZShyZXMpe1xuICAgIFx0bGV0IHRoYXQgPSB0aGlzO1xuICAgIFx0aWYgKHJlcy5mcm9tID09PSAnYnV0dG9uJykge1xuXHQgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cbiAgICBcdH1cbiAgICAgIC8vICArICcmak9iamVjdD0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5qT2JqZWN0KVxuICAgIFx0cmV0dXJuIHtcblx0ICAgICAgdGl0bGU6IHRoaXMuak9iamVjdC50aXRsZSxcblx0ICAgICAgcGF0aDogJy9wYWdlcy9mL3BhZ2UvZC9kP3NpZD0nICsgdGhpcy5zaG9wSWQgKyAnJmlkPScgKyB0aGlzLmRldGFpbElkLFxuXHQgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcblx0ICAgICAgIHRoYXQuYnRuU2hhcmUgPSBmYWxzZVxuXHQgICAgICAgdGhhdC5zaGFyZUVuZCA9IGZhbHNlXG5cdCAgICAgICB0aGF0LnN0b3JlUHJpY2UgPSAxNDNcblx0ICAgICAgIHRoYXQuJGFwcGx5KClcblx0ICAgICAgfSxcblx0ICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG5cdCAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXG5cdCAgICAgIH1cblx0ICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGV2ZW50U3RvcCgpe30sXG4gICAgICAvL+WbnuWIsOS6keS4iummlumhtVxuICAgICAgYmFja0ZpcnN0KCl7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi4vLi4vLi4vaW5kZXgnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8v54K55Ye76Lez6L2s5LqL5Lu2XG4gICAgICBnZXRTdGF0dXMoY2xhc3NpZCxpbmRleCkge1xuICAgICAgICB0aGlzLnNrdXNGb29kTnVtID0gMFxuICAgICAgICBpZih0aGlzLnNjcm9sbFJpZ2h0VG8gPT0gMCl7XG4gICAgICAgICAgdGhpcy5zY3JvbGxSaWdodFRvID0gMVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNjcm9sbFJpZ2h0VG8gPSAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBpbmRleFxuICAgICAgICB0aGlzLmNsYXNzaWQgPSBjbGFzc2lkXG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdEJ5Q2xhc3MoY2xhc3NpZClcbiAgICAgIH0sXG4gICAgICBzY3JvbGx0b2xvd2VyKCl7XG4gICAgICAgIHRoaXMucGFnZSsrO1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nfSk7XG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdEJ5Q2xhc3ModGhpcy5jbGFzc2lkKVxuICAgICAgfSxcbiAgICAgIC8v6ZqQ6JeP6YGu572pXG4gICAgICBoaWRlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsU3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW9kYWxIaWRlKCk7XG4gICAgICB9LFxuICAgICAgLy8g6Lez6L2s5aWX6aSQ6aOf5ZOB6K+m5oOF6aG1XG4gICAgICBmb29kc0RldGFpbCgpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy4vZm9vZHNEZXRhaWwnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g6Lez6L2s6LSt54mp6L2mXG4gICAgICBteU1lbnUoKXtcbiAgICAgICAgaWYodGhpcy50YWtlT3V0U3RhdHVzKXtcbiAgICAgICAgICBpZihOdW1iZXIodGhpcy51cGRhdGVUb3RhbCk8TnVtYmVyKHRoaXMuc2VuZFByaWNlKSl7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+acqui+vuWIsOi1t+mAgeS7tycsXG4gICAgICAgICAgICAgIGltYWdlOicuLi8uLi8uLi8uLi9pbWFnZXMvd2FybmluZy5wbmcnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubXlNZW51UGF5bWVudCgpXG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLm15TWVudVBheW1lbnQoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy/llYblk4HliqAxXG4gICAgICBhZGQoaXRlbSxpbmRleCl7XG4gICAgICAgIGlmKGluZGV4PT11bmRlZmluZWQpe1xuICAgICAgICAgIGxldCBTS1VJdGVtID0ge1xuICAgICAgICAgICAgc2t1OnRoaXMuU0tVU3RyaW5nLFxuICAgICAgICAgICAgbnVtOnRoaXMuc2t1c051bSxcbiAgICAgICAgICAgIHByaWNlOnRoaXMuY2hvb3NlUHJpY2UsXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHRoaXMuU0tVLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMuU0tVLnB1c2goU0tVSXRlbSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBza3VPdGhlciA9IDA7IC8v5Yik5pat6YCJ5oup5YW25LuW5bim6KeE5qC85Lqn5ZOBXG4gICAgICAgICAgICB0aGlzLm9yZGVyR29vZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYoZWxlbWVudC5wb25seWlkID09IHRoaXMuc2t1c0dvb2RzSXRlbS5wb25seWlkKXtcbiAgICAgICAgICAgICAgICBza3VPdGhlciA9IDFcbiAgICAgICAgICAgICAgICBsZXQgaGF2ZVNrdSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5TS1UuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYoZWxlLnNrdSA9PSBTS1VJdGVtLnNrdSl7XG4gICAgICAgICAgICAgICAgICAgIGVsZS5udW0rK1xuICAgICAgICAgICAgICAgICAgICBoYXZlU2t1ID0gMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmKGhhdmVTa3UgPT0gMCl7XG4gICAgICAgICAgICAgICAgICB0aGlzLlNLVS5wdXNoKFNLVUl0ZW0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKHNrdU90aGVyID09IDApeyAvL+mAieaLqeS6huW4puinhOagvOeahOWFtuS7luS6p+WTgVxuICAgICAgICAgICAgICB0aGlzLlNLVSA9IFtdO1xuICAgICAgICAgICAgICB0aGlzLlNLVS5wdXNoKFNLVUl0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBza3VzSXRtID0ge1xuICAgICAgICAgICAgcG9ubHlpZCA6IHRoaXMuc2t1c0dvb2RzSXRlbS5wb25seWlkLFxuICAgICAgICAgICAgbV9pZCA6IHRoaXMucHJvZHVjdE1faWQsXG4gICAgICAgICAgICBjbGFpZCA6IHRoaXMuY2xhc3NpZCxcbiAgICAgICAgICAgIFNLVSA6IHRoaXMuU0tVLFxuICAgICAgICAgICAgcHJpY2UgOiB0aGlzLnNrdXNHb29kc0l0ZW0ucHJpY2UsXG4gICAgICAgICAgICBsb2dvcGF0aCA6dGhpcy5za3VzR29vZHNJdGVtLmxvZ29wYXRoLFxuICAgICAgICAgICAgcG5hbWU6IHRoaXMuc2t1c0dvb2RzSXRlbS5wbmFtZSxcbiAgICAgICAgICAgIHBhY2tpbmc6IHRoaXMuc2t1c0dvb2RzSXRlbS5wYWNraW5nXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2t1c0dvb2RzSXRlbS5za3UgPSB0aGlzLlNLVVxuICAgICAgICAgIHRoaXMuc2t1c0dvb2RzSXRlbS5wcmljZSA9IHRoaXMuY2hvb3NlUHJpY2VcbiAgICAgICAgICBpbmRleCA9IHRoaXMuc2t1c0dvb2RzSW5kZXhcbiAgICAgICAgICB0aGlzLnRha2Vhd2F5c1tpbmRleF0uZm9vZE51bSsrO1xuICAgICAgICAgIGl0ZW0gPSBza3VzSXRtXG4gICAgICAgICAgdGhpcy5za3VzRm9vZE51bSsrXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmNob29zZVByaWNlID0gaXRlbS5wcmljZVxuICAgICAgICAgIHRoaXMudGFrZWF3YXlzW2luZGV4XS5mb29kTnVtKys7XG4gICAgICAgICAgbGV0IHNrdXNJdG1fID0ge1xuICAgICAgICAgICAgc2t1IDogaXRlbS5TS1VTLlNLVSxcbiAgICAgICAgICAgIHByaWNlIDogaXRlbS5TS1VTLnByaWNlLFxuICAgICAgICAgICAgbnVtIDogdGhpcy5za3VfbnVtXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZih0aGlzLnNrdV8ubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgIHRoaXMuc2t1Xy5wdXNoKHNrdXNJdG1fKVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IGhhdmVTa3VfID0gMDtcbiAgICAgICAgICAgIHRoaXMub3JkZXJHb29kcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBpZihlbGVtZW50LnBvbmx5aWQgPT0gaXRlbS5wb25seWlkKXtcbiAgICAgICAgICAgICAgICBoYXZlU2t1XyA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5za3VfWzBdLm51bSsrXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKGhhdmVTa3VfID09IDApe1xuICAgICAgICAgICAgICB0aGlzLnNrdV8gPSBbXTtcbiAgICAgICAgICAgICAgdGhpcy5za3VfLnB1c2goc2t1c0l0bV8pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBza3VzSXRtID0ge1xuICAgICAgICAgICAgcG9ubHlpZCA6IGl0ZW0ucG9ubHlpZCxcbiAgICAgICAgICAgIG1faWQgOiBpdGVtLlNLVVMubV9pZCxcbiAgICAgICAgICAgIGNsYWlkIDogdGhpcy5jbGFzc2lkLFxuICAgICAgICAgICAgU0tVIDogdGhpcy5za3VfLFxuICAgICAgICAgICAgcHJpY2UgOiBpdGVtLnByaWNlLFxuICAgICAgICAgICAgbG9nb3BhdGggOml0ZW0ubG9nb3BhdGgsXG4gICAgICAgICAgICBwbmFtZTogaXRlbS5wbmFtZSxcbiAgICAgICAgICAgIHBhY2tpbmc6IGl0ZW0ucGFja2luZ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtID0gc2t1c0l0bVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMub3JkZXJHb29kcy5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgdGhpcy5vcmRlckdvb2RzLnB1c2goaXRlbSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgbGV0IGhhdmVfID0gMFxuICAgICAgICAgIHRoaXMub3JkZXJHb29kcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYoZWxlbWVudC5wb25seWlkID09IGl0ZW0ucG9ubHlpZCl7XG4gICAgICAgICAgICAgIGhhdmVfID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmKGhhdmVfID09IDApe1xuICAgICAgICAgICAgdGhpcy5vcmRlckdvb2RzLnB1c2goaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3guc2V0U3RvcmFnZSh7a2V5Oidpc1N0b3JhZ2VJbmZvJyxkYXRhOlwi5rKh57yT5a2YXCJ9KVxuICAgICAgICBsZXQgZml4ZWQgPSAodGhpcy5jaG9vc2VQcmljZSkqMTtcbiAgICAgICAgdGhpcy51cGRhdGVUb3RhbCA9IE51bWJlcih0aGlzLnVwZGF0ZVRvdGFsKSArIE51bWJlcihmaXhlZCk7XG4gICAgICAgIHRoaXMudXBkYXRlVG90YWwgPSBOdW1iZXIodXRpbC5rZWVwVHdvRGVjaW1hbEZ1bGwodGhpcy51cGRhdGVUb3RhbCkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50ICsrO1xuICAgICAgfSxcbiAgICAgIC8v5ZWG5ZOB5YePMVxuICAgICAgcmVkdWNlKGl0ZW0saW5kZXgpe1xuICAgICAgICBpZihpbmRleD09dW5kZWZpbmVkKXtcbiAgICAgICAgICB0aGlzLmdvb2RzclJlZHVjZSgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMub3JkZXJHb29kcy5mb3JFYWNoKChlbGVtZW50LGlkeCkgPT4ge1xuICAgICAgICAgICAgaWYoZWxlbWVudC5wb25seWlkID09IGl0ZW0ucG9ubHlpZCl7XG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuU0tVWzBdLnNrdSA9PSBpdGVtLlNLVVMuU0tVKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LlNLVVswXS5udW0tLVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ291bnQgLS07XG4gICAgICAgICAgICAgICAgdGhpcy50YWtlYXdheXNbaW5kZXhdLmZvb2ROdW0gLS07XG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5TS1VbMF0ucHJpY2Upe1xuICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb3RhbCA9IE51bWJlcih0aGlzLnVwZGF0ZVRvdGFsKSAtIE51bWJlcihlbGVtZW50LlNLVVswXS5wcmljZSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVRvdGFsID0gTnVtYmVyKHV0aWwua2VlcFR3b0RlY2ltYWxGdWxsKHRoaXMudXBkYXRlVG90YWwpKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5TS1VbMF0ubnVtID09IDApe1xuICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckdvb2RzLnNwbGljZShpZHgsMSlcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9yZGVyR29vZHMpXG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe2tleTonaXNTdG9yYWdlSW5mbycsZGF0YTpcIuayoee8k+WtmFwifSlcbiAgICAgIH0sXG4gICAgICAvLyDliIbkuqvmjInpkq5cbiAgICAgIHNoYXJlRnJpZW5kcygpe1xuICAgICAgICB0aGlzLmZvb2RJbmZvU2hvdyA9ICF0aGlzLnNoYXJlU2hvdztcbiAgICAgICAgdGhpcy5zaGFyZVNob3cgPSAhdGhpcy5zaGFyZVNob3dcblx0ICBcdH0sXG4gICAgICAvL+WPkeaci+WPi+WciFxuICAgICAgc2hhcmVxdWFuKCl7XG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTogJ3Rva2VuJyxcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aciWFjY2VzcycpXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5rW35oql55Sf5oiQ5LitLi4uJyxcbiAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWxTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaGFyZVNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGFpYmFvYnRuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGFvYmFvU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwgKyAnL2FwaS9nZXRfZ29vZF9zaGFyZV9pbWcnLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZ29vZF9pZDp0aGlzLmRldGFpbElkLFxuICAgICAgICAgICAgICAgIC8vIHBhdGhfdXJsOiAnL3BhZ2VzL2YvcGFnZS9kL2Q/aWQ9JyArIHRoaXMuc2hvcElkICsgJyZnb29kc0lkPScgKyB0aGlzLmRldGFpbElkICsgJyZqT2JqZWN0PScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLmpPYmplY3QpLFxuICAgICAgICAgICAgICAgIHBhdGhfdXJsOiAnL3BhZ2VzL2YvcGFnZS9kL2Q/c2lkPScgKyB0aGlzLnNob3BJZCArICcmaWQ9JyArIHRoaXMuZGV0YWlsSWRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0IDogJ2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbiA6ICdCZWFyZXIgJysgdGhpcy50b2tlblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdD0+e1xuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB0aGlzLmhhaUJhb0ltZyA9IHJlc3VsdC5kYXRhLm1lc3NhZ2VcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAvLyDkv53lrZjlm77niYfoh7Pnm7jlhoxcbiAgICAgIHNhdmVJbWcoaW1nVXJsKXtcbiAgICAgICAgbGV0IGltZ1NyYyA9IGltZ1VybDtcbiAgICAgICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6IGltZ1NyYyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgIGZpbGVQYXRoOiByZXMudGVtcEZpbGVQYXRoLFxuICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZmFpbDogKGVycik9PntcbiAgICAgICAgICAgICAgICAgIGlmIChlcnIuZXJyTXNnID09PSBcInNhdmVJbWFnZVRvUGhvdG9zQWxidW06ZmFpbCBhdXRoIGRlbmllZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHNldHRpbmdkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdkYXRhLmF1dGhTZXR0aW5nWydzY29wZS53cml0ZVBob3Rvc0FsYnVtJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5bmnYPpmZDmiJDlip/vvIznu5nlh7rlho3mrKHngrnlh7vlm77niYfkv53lrZjliLDnm7jlhoznmoTmj5DnpLrjgIInKVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6I635Y+W5p2D6ZmQ5aSx6LSl77yM57uZ5Ye65LiN57uZ5p2D6ZmQ5bCx5peg5rOV5q2j5bi45L2/55So55qE5o+Q56S6JylcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGNsb3NlSGFpQmFvKCl7XG4gICAgICAgIHRoaXMuaGFvYmFvU2hvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsU3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBzZWxlY3RTa3VzKHBvbmx5aWQsZ29vZHNJdGVtLGdvb2RzSW5kZXgpe1xuICAgICAgICBsZXQgbnVtcyA9IDA7XG4gICAgICAgIGxldCBoYXZpZSA9IDE7XG4gICAgICAgIHRoaXMub3JkZXJHb29kcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGlmKGVsZW1lbnQucG9ubHlpZCA9PSBwb25seWlkKXtcbiAgICAgICAgICAgIGhhdmllPSAwXG4gICAgICAgICAgICBlbGVtZW50LlNLVS5mb3JFYWNoKGVsZSA9PiB7XG4gICAgICAgICAgICAgIG51bXMrPWVsZS5udW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5za3VzRm9vZE51bSA9IG51bXNcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihoYXZpZT09MSl7XG4gICAgICAgICAgdGhpcy5za3VzRm9vZE51bSA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNrdXNHb29kc0l0ZW0gPSBnb29kc0l0ZW1cbiAgICAgICAgdGhpcy5za3VzR29vZHNJbmRleCA9IGdvb2RzSW5kZXhcbiAgICAgICAgdGhpcy5wb25seWlkID0gcG9ubHlpZFxuICAgICAgICB0aGlzLnNwZWNzID0gW11cbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0UHJvZHVjdERldGFpbHM7XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcse3Bvbmx5aWQ6cG9ubHlpZH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgdGhpcy5Qcm9kdWN0RGV0YWlscyA9IHJlcy5kYXRhLmRhdGFbMF1cbiAgICAgICAgICB0aGlzLmdvb2RzU2t1cyA9IHJlcy5kYXRhLmRhdGFbMF0ucmVtYXJrMztcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgcmVzLmRhdGEuZGF0YVswXS5yZW1hcmszLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNwZWNzLnB1c2goZWxlbWVudC5zcGVjVmFsdWVbMF0uaWQpXG5cdFx0XHRcdFx0ICBlbGVtZW50LnNwZWNWYWx1ZVswXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0pO1xuXHRcdFx0XHQgIHRoaXMuZ2V0UHJvZHVjdFNLVSh0aGlzLnNwZWNzKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGhlemh1YW5nIChpdGVtTmFtZSxpdGVtLGdvb2Rza3VzSWR4KXtcbiAgICAgICAgbGV0IHNwZWNzID0gW107XG5cdFx0XHRcdGl0ZW0uc3BlY1ZhbHVlLmZvckVhY2goKGVsZW1lbnQsaWR4XykgPT4ge1xuXHRcdFx0XHRcdGlmKGVsZW1lbnQuaWQgPT0gaXRlbU5hbWUuaWQpe1xuXHRcdFx0XHRcdFx0dGhpcy5nb29kc1NrdXNbZ29vZHNrdXNJZHhdLnNwZWNWYWx1ZVtpZHhfXS5jaGVja2VkID0gdHJ1ZVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhpcy5nb29kc1NrdXNbZ29vZHNrdXNJZHhdLnNwZWNWYWx1ZVtpZHhfXS5jaGVja2VkID0gZmFsc2Vcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLiRhcHBseSgpXG5cdFx0XHRcdHRoaXMuZ29vZHNTa3VzLmZvckVhY2goKGVsZW1lbnQsaWR4KSA9PiB7XG5cdFx0XHRcdFx0aWYoaXRlbS5zcGVjID09IGVsZW1lbnQuc3BlYyl7XG5cdFx0XHRcdFx0XHRlbGVtZW50LnNwZWNWYWx1ZS5mb3JFYWNoKGVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmKGVsZS5jaGVja2VkKXtcblx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLnNwZWNzW2lkeF0gPT0gZWxlLmlkKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuICAgICAgICAgICAgICAgICAgdGhpcy5zcGVjc1tpZHhdID0gZWxlLmlkXG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpXG5cdFx0XHRcdHRoaXMuZ2V0UHJvZHVjdFNLVSh0aGlzLnNwZWNzKVxuXHRcdFx0fSxcbiAgICB9XG4gICAgLy8g6Lez6L2s5pSv5LuYXG4gICAgbXlNZW51UGF5bWVudCgpe1xuICAgICAgbGV0IGRhdGExID0ge1xuICAgICAgICBvcmRlckdvb2RzOnRoaXMub3JkZXJHb29kc1xuICAgICAgfTtcbiAgICAgIGxldCB0b3RhbFBhY2sgPSAwO1xuICAgICAgdGhpcy5vcmRlckdvb2RzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgbGV0IG51bSA9IDA7XG4gICAgICAgICAgZWxlbWVudC5TS1UuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgbnVtICs9IGVsZS5udW1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50LnRvdGFsTnVtID0gbnVtXG4gICAgICB9KTtcbiAgICAgIGlmKHRoaXMudGFrZU91dFN0YXR1cyl7ICAgICAvL+WPluWkluWNluS6p+WTgeWMheijhei0uVxuICAgICAgICB0aGlzLm9yZGVyR29vZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBudW0gPSAwO1xuICAgICAgICAgICAgZWxlbWVudC5TS1UuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgICBudW0gKz0gZWxlLm51bVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0b3RhbFBhY2sgKz0gTnVtYmVyKGVsZW1lbnQucGFja2luZykqbnVtXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYodGhpcy51cGRhdGVDb3VudCA8PSAwIHx8IHRoaXMudXBkYXRlVG90YWwgPT0gJzAuMDAnKXtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivt+mAieaLqeWVhuWTgScsXG4gICAgICAgICAgaW1hZ2U6Jy4uLy4uLy4uLy4uL2ltYWdlcy93YXJuaW5nLnBuZycsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgfSlcbiAgICAgIH1lbHNle1xuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICdkZWxpdmVyRGF0YScsXG4gICAgICAgICAgZGF0YTpkYXRhMSxcbiAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOmAuL215TWVudT9pZD0xJm1faWQ9JHt0aGlzLnNob3BJZH0mQnVyeV9Nb25leT0ke3RoaXMudXBkYXRlVG90YWx9JnRvdGFsUGFjaz0ke3RvdGFsUGFja30mdGFrZU91dE1faWQ9JHt0aGlzLnRha2VPdXRNX2lkfWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICAvLyDllYblk4Hlh4/lh73mlbBcbiAgICBnb29kc3JSZWR1Y2UoKXtcbiAgICAgIHRoaXMub3JkZXJHb29kcy5mb3JFYWNoKChlbGVtZW50LGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYoZWxlbWVudC5wb25seWlkID09IHRoaXMuc2t1c0dvb2RzSXRlbS5wb25seWlkKXtcbiAgICAgICAgICAgIGVsZW1lbnQuU0tVLmZvckVhY2goKGVsZSxpZHgpID0+IHtcbiAgICAgICAgICAgICAgaWYoZWxlLnNrdSA9PSB0aGlzLlNLVVN0cmluZyl7XG4gICAgICAgICAgICAgICAgZWxlLm51bS0tXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb3VudCAtLTtcbiAgICAgICAgICAgICAgICB0aGlzLnNrdXNGb29kTnVtIC0tO1xuICAgICAgICAgICAgICAgIGxldCBmaXhlZCA9ICh0aGlzLmNob29zZVByaWNlKSoxO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG90YWwgPSBOdW1iZXIodGhpcy51cGRhdGVUb3RhbCkgLSBOdW1iZXIoZml4ZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVG90YWwgPSBOdW1iZXIodXRpbC5rZWVwVHdvRGVjaW1hbEZ1bGwodGhpcy51cGRhdGVUb3RhbCkpO1xuICAgICAgICAgICAgICAgIGlmKGVsZS5udW0gPT0gMCl7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50LlNLVS5zcGxpY2UoaWR4LDEpXG4gICAgICAgICAgICAgICAgICBpZihlbGVtZW50LlNLVS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyR29vZHMuc3BsaWNlKGluZGV4LDEpXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5pyq54K56L+H6K+l6KeE5qC85ZWG5ZOBJyxpY29uOiAnbm9uZSd9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL+iOt+WPluaJgOacieWVhuWTgSArKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgIGdldEFsbEdvb2RzRGF0YSgpe1xuICAgICAgLy8g6I635Y+W5ZWG5ZOB5YiG57G7XG4gICAgICBsZXQgdXJsQ2xhc3NpZmljYXRpb24gPSByZXF1ZXN0VXJsLkdldFByb2R1Y3RDbGFzcztcbiAgICAgIGxldCBkYXRhQ2xhc3NpZmljYXRpb24gPSB7XG4gICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgbV9pZDogdGhpcy5zaG9wSWQsXG4gICAgICAgIHR5cGU6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudGFrZU91dFN0YXR1cyB8fCAwXG4gICAgICB9O1xuICAgICAgcmVxdWVzdERhdGEodXJsQ2xhc3NpZmljYXRpb24sJ1BPU1QnLGRhdGFDbGFzc2lmaWNhdGlvbikudGhlbihyZXM9PntcbiAgICAgICAgdGhpcy5jYXRlbG9ncyA9IHJlcy5kYXRhLmRhdGEuY2xhaWRcbiAgICAgICAgdGhpcy5jbGFzc2lkID0gcmVzLmRhdGEuZGF0YS5jbGFpZFswXS5jbGFzc2lkXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8g6I635Y+W5YiG57G75LiL5ZWG5ZOBXG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdEJ5Q2xhc3MocmVzLmRhdGEuZGF0YS5jbGFpZFswXS5jbGFzc2lkKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6I635Y+W5YiG57G75LiL5ZWG5ZOBXG4gICAgZ2V0UHJvZHVjdEJ5Q2xhc3MoY2xhc3NpZCl7XG4gICAgICBsZXQgdXJsID0gcmVxdWVzdFVybC5HZXRQcm9kdWN0QnlDbGFzcztcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgIG1faWQ6IHRoaXMuc2hvcElkLFxuICAgICAgICB0eXBlOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXMgfHwgMCxcbiAgICAgICAgY19pZDogY2xhc3NpZCxcbiAgICAgICAgcGFnZV9OdW06IHRoaXMucGFnZVxuICAgICAgfVxuICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICBpZih0aGlzLnBhZ2UgPT0gMCl7XG4gICAgICAgICAgdGhpcy5nb29kc1Nob3cgPSB0cnVlXG4gICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYoZWxlbWVudC5TS1UgPT0gMCl7XG4gICAgICAgICAgICAgIGVsZW1lbnQucHJpY2UgPSBlbGVtZW50LlNLVVMucHJpY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsZW1lbnQuZm9vZE51bSA9IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnRha2Vhd2F5cyA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2Vhd2F5cyA9IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmRhdGEubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+W3suWKoOi9veWFqOmDqOaVsOaNricsaWNvbjogJ25vbmUnfSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIGlmKGVsZW1lbnQuU0tVID09IDApe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucHJpY2UgPSBlbGVtZW50LlNLVVMucHJpY2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbGVtZW50LmZvb2ROdW0gPSAwXG4gICAgICAgICAgICAgIHRoaXMudGFrZWF3YXlzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRha2Vhd2F5cy5mb3JFYWNoKChlbGVtZW50LGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5vcmRlckdvb2RzLmZvckVhY2goKGVsZSxpZHgpID0+IHtcbiAgICAgICAgICAgIGlmKGVsZW1lbnQucG9ubHlpZD09ZWxlLnBvbmx5aWQpe1xuICAgICAgICAgICAgICB0aGlzLnRha2Vhd2F5c1tpbmRleF0uZm9vZE51bSA9IGVsZS5TS1VbMF0ubnVtXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cbiAgICAvLyArKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcblxuICAgIC8vIOivpuaDhemhteivt+axguaVsOaNrlxuICAgIGFzeW5jIGdldEZvb2REZXRhaWxEYXRhKCl7XG4gICAgICBjb25zdCBnb29kc0lkID0gdGhpcy5nb29kc0lkO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Rha2Vhd2F5LycgKyB0aGlzLmRldGFpbElkO1xuICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgIHRoaXMuaW1nVXJscyA9IHJlcy5kYXRhLm1lc3NhZ2UuZ29vZF9pbWc7XG4gICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2hvcElkID0gcmVzLmRhdGEubWVzc2FnZS5tZXJjaGFudF9pZDtcbiAgICAgICAgLy8gaWYocmVzLmRhdGEubWVzc2FnZS5jb250ZW50KXtcbiAgICAgICAgLy8gICB0aGlzLmRldGFpbENvbnRlbnQgPSByZXMuZGF0YS5tZXNzYWdlLmNvbnRlbnQucmVwbGFjZSgvPGltZyBbXj5dKnNyYz1bJ1wiXShbXidcIl0rKVtePl0qPi9naSwgZnVuY3Rpb24gKG1hdGNoLCBjYXB0dXJlKSB7XG4gICAgICAgIC8vICAgICBjYXB0dXJlID0gY2FwdHVyZVxuICAgICAgICAvLyAgICAgcmV0dXJuICc8aW1nIHNyYz1cIicgKyBjYXB0dXJlKydcIj4nXG4gICAgICAgIC8vICAgfSlcbiAgICAgICAgLy8gfWVsc2V7XG4gICAgICAgIC8vICAgdGhpcy5kZXRhaWxDb250ZW50ID0gJzxwPuaaguaXoOeugOS7izwvcD4nO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMueGFpbmdxaW5nRGF0YSA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgIHRoaXMuZGV0YWlsQ29udGVudCA9IHJlcy5kYXRhLm1lc3NhZ2UuY29udGVudDtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGdldERhdGEoKXtcbiAgICAvLyAgIGxldCBkYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJkYXRhXCIpO1xuICAgIC8vICAgdGhpcy50YWJsZU51bSA9IGRhdGEuc29ja2V0VGFibGVOdW07XG4gICAgLy8gICB0aGlzLmZvb2ROdW0gPSBkYXRhLnNvY2tldEZvb2ROdW07XG4gICAgLy8gfVxuICAgIGdldFByb2R1Y3RTS1Uoc3BlY3Mpe1xuXHRcdFx0bGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0UHJvZHVjdFNLVTtcblx0XHRcdGxldCBkYXRhID0ge1xuXHRcdFx0XHRwb25seWlkOnRoaXMucG9ubHlpZCxcbiAgICBcdFx0c3BlY3M6IHNwZWNzIHx8ICcnXG5cdFx0XHR9XG5cdFx0XHRyZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgIHRoaXMuY2hvb3NlUHJpY2UgPSByZXMuZGF0YS5kYXRhWzBdLnByaWNlXG4gICAgICAgIHRoaXMuU3RvY2sgPSByZXMuZGF0YS5kYXRhWzBdLlN0b2NrXG4gICAgICAgIHRoaXMuU0tVU3RyaW5nID0gcmVzLmRhdGEuZGF0YVswXS5TS1VcbiAgICAgICAgdGhpcy5wcm9kdWN0TV9pZCA9IHJlcy5kYXRhLmRhdGFbMF0ubV9pZFxuICAgICAgICB0aGlzLm1vZGFsU2hvdygpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG5cdFx0fVxuICAgIG9uTG9hZChvcHRpb25zKXtcbiAgICAgIGlmKG9wdGlvbnMudGFrZU91dE1faWQpIHRoaXMudGFrZU91dE1faWQgPSBvcHRpb25zLnRha2VPdXRNX2lkXG4gICAgICB0aGlzLnNlbmRQcmljZSA9IG9wdGlvbnMuc2VuZFByaWNlXG4gICAgICB0aGlzLnRha2VPdXRTdGF0dXMgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXNcbiAgICAgIHRoaXMuc2hvcElkID0gb3B0aW9ucy5tX2lkO1xuICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zaG9wSWQgPSBvcHRpb25zLm1faWRcbiAgICAgIHRoaXMubG9nb0ltZyA9IG9wdGlvbnMubG9nb0ltZztcbiAgICAgIC8vIHRoaXMuZ2V0Rm9vZERldGFpbERhdGEoKTtcbiAgICAgIHRoaXMuZ2V0QWxsR29vZHNEYXRhKCk7XG4gICAgICAvL+iOt+WPlnRva2VuXG4gICAgICB0aGlzLnRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKTs7XG4gICAgICB0aGlzLmVhdEZvb2ROdW0gPSBvcHRpb25zLm51bTtcbiAgICAgIC8vIHRoaXMuc2hvcElkID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJzaG9wSWRcIik7XG4gICAgICAvL+iOt+WPluahjOWPt1xuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2RhdGEnLFxuICAgICAgICBzdWNjZXNzOihyZXM9PntcbiAgICAgICAgICB0aGlzLnNvY2tldFRhYmxlTnVtID0gcmVzLmRhdGEuc29ja2V0VGFibGVOdW07XG4gICAgICAgICAgdGhpcy5zb2NrZXRGb29kTnVtID0gcmVzLmRhdGEuc29ja2V0Rm9vZE51bTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIC8v5Yik5pat5qGM5Y+35piv5ZCm5a2Y5ZyoXG4gICAgICAgICAgaWYodGhpcy5zb2NrZXRUYWJsZU51bSl7XG4gICAgICAgICAgICBpZih0aGlzLnNvY2tldEZvb2ROdW0pe1xuICAgICAgICAgICAgICAvL+ahjOWPt+i3n+eUqOmkkOS6uuaVsOmDveWtmOWcqFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIC8v5qGM5Y+35a2Y5ZyoIOeUqOmkkOS6uuaVsOS4jeWtmOWcqOmDvemAieaLqeS6uuaVsFxuICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICB1cmw6Jy4vY2hvb3NlTnVtJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6KHJlcyk9PntcbiAgICAgICAgICB0aGlzLm5ld1N0eWxlcyA9IHJlcy53aW5kb3dIZWlnaHQtMjEwXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIGlmKHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEudGFrZU91dFN0YXR1cykgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHt0aXRsZTogJ+WkluWNlid9KTtcbiAgICAgIHd4LnJlbW92ZVN0b3JhZ2Uoe2tleTogJ3NlbGVjdENvdXBvbid9KTtcbiAgICB9XG4gICAgLy/pga7nvanmmL7npLrlkozpmpDol49cbiAgICBtb2RhbFNob3coKXtcbiAgICAgIC8vIOaYvuekuumBrue9qeWxglxuICAgICAgbGV0IGFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImxpbmVhclwiLFxuICAgICAgICBkZWxheTogMFxuICAgICAgfSlcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uXG4gICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgzMDApLnN0ZXAoKVxuICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gYW5pbWF0aW9uLmV4cG9ydCgpLFxuICAgICAgdGhpcy5zaG93TW9kYWxTdGF0dXMgPXRydWVcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgwKS5zdGVwKClcbiAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICB9LmJpbmQodGhpcyksIDIwMClcbiAgICB9XG4gICAgLy8g6ZqQ6JeP6YGu572p5bGCXG4gICAgbW9kYWxIaWRlKCl7XG4gICAgICBsZXQgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgdGltaW5nRnVuY3Rpb246IFwibGluZWFyXCIsXG4gICAgICAgIGRlbGF5OiAwXG4gICAgICB9KVxuICAgICAgdGhpcy5hbmltYXRpb24gPSBhbmltYXRpb25cbiAgICAgIGFuaW1hdGlvbi50cmFuc2xhdGVZKDMwMCkuc3RlcCgpXG4gICAgICB0aGlzLmFuaW1hdGlvbkRhdGEgPSBhbmltYXRpb24uZXhwb3J0KCksXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYW5pbWF0aW9uLnRyYW5zbGF0ZVkoMCkuc3RlcCgpXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IGFuaW1hdGlvbi5leHBvcnQoKSxcbiAgICAgICAgdGhpcy5zaG93TW9kYWxTdGF0dXMgPSBmYWxzZVxuICAgICAgfS5iaW5kKHRoaXMpLCAyMDApXG4gICAgfVxuICB9XG4iXX0=