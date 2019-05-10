'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _app = require('./../../../../utils/app.js');

var _app2 = _interopRequireDefault(_app);

var _qqmapWxJssdkMin = require('./../../../../utils/qqmap-wx-jssdk.min.js');

var _qqmapWxJssdkMin2 = _interopRequireDefault(_qqmapWxJssdkMin);

var _util = require('./../../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _requestUrl = require('./../../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref, _this$data;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffd265',
      navigationBarTitleText: '首页',
      navigationBarTextStyle: 'black',
      backgroundColor: "#e5e5e5"
    }, _this.components = {}, _this.data = (_this$data = {
      token: '',
      dianXin: 0,
      allData: {},
      shopId: 0, //商户ID
      mockIndexData: [],
      groups: [],
      imgUrls: [],
      tel: '',
      starttime: 0,
      endtime: 0,
      syncTitle: 0,
      business: 'block',
      rest: 'none',
      extConfig: null,
      stars: [0, 1, 2, 3, 4],
      normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
      selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
      halfSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starHalf.png',
      key: 0,
      location: null,
      qqmapsdk: null,
      foodNumCode: 0,
      first: 1,
      mine: 0,
      results: null,
      pictures: [],
      comments: [],
      tab: 0,
      introduce: 'block',
      comment: 'none',
      type: 2,
      picsArr: []
    }, _defineProperty(_this$data, 'mockIndexData', []), _defineProperty(_this$data, 'arrUrlGroup', []), _defineProperty(_this$data, 'longBanner', []), _defineProperty(_this$data, 'merchantFunction', []), _defineProperty(_this$data, 'shareShow', false), _defineProperty(_this$data, 'haobaoShow', true), _defineProperty(_this$data, 'maskFlag', true), _defineProperty(_this$data, 'haiBaoImg', ''), _defineProperty(_this$data, 'shareStatus', false), _defineProperty(_this$data, 'shoppStatus', false), _defineProperty(_this$data, 'shareInfo', null), _defineProperty(_this$data, 'threeIconItemWidth', ''), _this$data), _this.methods = {
      // 根据id跳转商户开通功能页面
      merchantFunPageJump: function merchantFunPageJump(item) {
        if (item.id == 1) {
          //买单
          wx.navigateTo({
            url: '../../../inputValue?title=' + this.allData.Merchant_baseInfo.mName + '&m_id=' + this.shopId + '&isMemCard=' + item.isMem
          });
        } else if (item.id == 2 || item.id == 5) {
          //点餐页面
          _wepy2.default.$instance.globalData.takeOutStatus = '';
          //判断当商家在休息中，将不能进行点餐
          var time = _util2.default.getCurrentTime();
          if (Number(this.starttime) <= time && time < Number(this.endtime)) {
            var socketData = null;
            wx.navigateTo({
              url: '../d/chooseNum'
            });
          } else {
            // return;
            // ------
            wx.navigateTo({
              url: '../d/chooseNum?mLogo=' + this.allData.Merchant_baseInfo.mLogo + '&mTitle=' + this.allData.Merchant_baseInfo.mName + '&m_id=' + this.shopId
            });
            // -------
          }
        } else if (item.id == 3) {
          //本地特产
          _wepy2.default.$instance.globalData.localSpecialty = 1;
          // 请求传localSpecialty=1
          wx.navigateTo({
            url: '../../../e/page/homePage?id=' + this.shopId + '&localSpecialty=1'
          });
        } else if (item.id == 4) {
          //外卖
          var indust_id = JSON.stringify({ Indust_id: -4 });
          wx.navigateTo({
            url: '../../../deliciousFood?info=' + indust_id + '&title=\u672C\u5E97\u63A8\u8350\u5916\u5356&m_id=' + this.shopId
          });
        } else if (item.id == 12) {
          //积分商城
          wx.navigateTo({
            url: '../../../integralMall?m_id=' + this.shopId
          });
        }
      },

      //跳转我的页面
      minePage: function minePage() {
        wx.reLaunch({
          url: './d/mine'
        });
      },

      // 商家介绍页面
      tabIntroduce: function tabIntroduce() {
        this.tab = 0;
        this.introduce = "block";
        this.comment = "none";
      },

      // 商家评论
      tabComment: function tabComment() {
        this.tab = 1;
        this.introduce = "none";
        this.comment = "block";
        // this.getShopDetail();
      },

      //拨打电话
      storeCall: function storeCall() {
        wx.makePhoneCall({
          phoneNumber: this.allData.Merchant_baseInfo.conPhone
        });
      },

      // 跳转地图
      goLocal: function goLocal() {
        wx.openLocation({
          latitude: Number(this.allData.Merchant_baseInfo.latitude),
          longitude: Number(this.allData.Merchant_baseInfo.longitude)
        });
      },
      chooseNum: function chooseNum() {
        wx.navigateTo({
          url: './d/chooseNum'
        });
      },

      // 跳转我的页面
      mine: function mine() {
        wx.navigateTo({
          url: './d/mine'
        });
      },
      shareFriends: function shareFriends() {
        this.shareShow = !this.shareShow;
        this.maskFlag = !this.maskFlag;
      },

      //发朋友圈
      sharequan: function sharequan() {
        var _this2 = this;

        wx.showLoading({ title: '海报生成中...' });
        this.maskFlag = false;
        this.haobaoShow = false;
        //  请求图片链接
        var data = {
          p_id: _wepy2.default.$instance.globalData.p_id,
          m_id: this.shopId,
          type: 0,
          ponlyid: ''
        };
        (0, _requestData.requestData)(_requestUrl2.default.getMerchantCode, 'POST', data).then(function (res) {
          wx.hideLoading();
          _this2.haiBaoImg = res.data.data.URL;
          _this2.$apply();
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
        var _this3 = this;

        wx.downloadFile({
          url: imgUrl,
          success: function success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function success(data) {
                _this3.shareShow = false;
                _this3.haobaoShow = true;
                _this3.maskFlag = true;
                _this3.$apply();
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                });
              },
              fail: function fail(err) {
                wx.showModal({
                  title: '授权提示',
                  content: '您已拒绝访问相册授权，如需将图片保存至相册请点击‘确定’以获取用户授权设置',
                  showCancel: true,
                  cancelText: '取消',
                  cancelColor: '#000000',
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                  success: function success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: function success(res) {
                          if (res.authSetting['scope.writePhotosAlbum']) {
                            wx.showToast({ title: '授权成功，请重新保存', icon: 'none' });
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        });
      },
      previewImage: function previewImage(haiBaoImg) {
        wx.previewImage({
          urls: ['' + haiBaoImg] // 需要预览的图片http链接列表
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.shopId = options.id;
      this.getMerchantShareInfo(options.id);
      if (this.shopId) {
        this.getData();
        this.merchantF();
        // this.group();
        //读取缓存，判断该店是否被收藏过
        // wx.getStorage({
        //     key:'collectShopList',
        //     success:res=>{
        //       let collectShopList = res.data;
        //       collectShopList.forEach((item,index)=>{
        //         if(this.shopId == item){
        //             this.dianXin = 1;
        //         }
        //       })
        //     }
        // })
      }
      //获取token
      this.token = wx.getStorageSync("token");
      _wepy2.default.$instance.globalData.shopId = this.shopId;
      // 实例化API核心类
      this.qqmapsdk = new _qqmapWxJssdkMin2.default({
        key: '7T7BZ-WXLC6-VX6SS-EMEV2-YDC3H-UZB24'
      });
      var data = { socketTableNum: options.n || '无桌号', socketFoodNum: 1 }; //测试有桌号点餐
      wx.setStorage({
        key: "data",
        data: data
      });
      this.$apply();
      // this.is_shopping();
    }
    //转换地图的函数

  }, {
    key: 'toLocaltion',
    value: function toLocaltion() {
      var _this4 = this;

      // 调用接口
      this.qqmapsdk.reverseGeocoder({
        keyword: '科技园',
        location: {
          latitude: that.results.lat,
          longitude: that.results.lng
        },
        coord_type: 5,
        success: function success(res) {
          _this4.location = res.result.address_reference.landmark_l2.location;
          _this4.$apply();
        }
      });
    }
    //收藏店铺

  }, {
    key: 'collectShop',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this5 = this;

        var url, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _api2.default.apiMall + 'api/shop_collect';
                data = {
                  m_id: this.shopId
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
                }).then(function (res) {
                  if (res.data.status == 200) {
                    wx.showToast({
                      title: '收藏成功',
                      icon: 'success'
                    });
                    //存数组
                    wx.getStorage({
                      key: 'collectShopList',
                      success: function success(res) {
                        var collectShopList = res.data;
                        collectShopList.push(_this5.shopId);
                        wx.setStorage({
                          key: 'collectShopList',
                          data: collectShopList
                        });
                      },
                      fail: function fail(res) {
                        var collectShopList = [];
                        collectShopList.push(_this5.shopId);
                        wx.setStorage({
                          key: 'collectShopList',
                          data: collectShopList
                        });
                      }
                    });
                  }
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function collectShop() {
        return _ref2.apply(this, arguments);
      }

      return collectShop;
    }()
    //取消收藏

  }, {
    key: 'cancleCollectShop',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this6 = this;

        var url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = _api2.default.apiMall + 'api/shop_collect/' + this.shopId;

                _wepy2.default.request({
                  url: url,
                  method: 'GET',
                  header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + this.token
                  }
                }).then(function (res) {
                  wx.showToast({
                    title: '取消收藏',
                    icon: 'success'
                  });
                  //删除数组中的盖商铺
                  wx.getStorage({
                    key: 'collectShopList',
                    success: function success(res) {
                      var collectShopList = res.data;
                      if (collectShopList) {
                        collectShopList.forEach(function (item, index) {
                          if (_this6.shopId == item) {
                            collectShopList.splice(index, 1);
                          }
                        });
                        wx.setStorage({
                          key: 'collectShopList',
                          data: collectShopList
                        });
                      }
                    }
                  });
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function cancleCollectShop() {
        return _ref3.apply(this, arguments);
      }

      return cancleCollectShop;
    }()
  }, {
    key: 'getData',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this7 = this;

        var url, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = _requestUrl2.default.MerchantInfo;
                data = {
                  p_id: _wepy2.default.$instance.globalData.p_id,
                  m_id: this.shopId,
                  token: wx.getStorageSync('token')
                };

                _wepy2.default.request({
                  url: url,
                  method: 'POST',
                  data: data
                }).then(function (res) {
                  wx.setNavigationBarTitle({ title: '首页' });
                  wx.hideNavigationBarLoading();
                  // console.log(res.data.data.Merchant_baseInfo.Mabstractpath)
                  _this7.longBanner = res.data.data.Merchant_baseInfo.Mabstractpath.split(';').slice(0, -1);
                  _this7.topCover = true;
                  _this7.imgUrls = res.data.data.Merchant_Banner;
                  _this7.allData = res.data.data;
                  if (res.data.data.Merchant_baseInfo.open == 0) {
                    //shoppStatus == 0 营业
                    _this7.shoppStatus = true;
                  } else {
                    _this7.shoppStatus = false;
                  }
                  _this7.$apply();
                }).catch(function (res) {
                  wx.showToast({ title: '网络异常，请重试', icon: 'none' });
                });

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getData() {
        return _ref4.apply(this, arguments);
      }

      return getData;
    }()
    //获取商户转发好友信息内容

  }, {
    key: 'getMerchantShareInfo',
    value: function getMerchantShareInfo(m_id) {
      var _this8 = this;

      var url = _requestUrl2.default.getMerchantShareInfo;
      var data = {
        p_id: _wepy2.default.$instance.globalData.p_id,
        m_id: m_id
      };
      (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
        _this8.shareInfo = res.data.data;
        _this8.$apply();
      });
    }
    //获取当前页函数(判断当前页是否为首页)

  }, {
    key: 'getCurrentPageUrl',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var pages, currentPage, url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                pages = getCurrentPages();
                currentPage = pages[pages.length - 1];
                url = currentPage.route;

                if (url == 'pages/index/index') {
                  this.first = 1;
                  this.mine = 0;
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getCurrentPageUrl() {
        return _ref5.apply(this, arguments);
      }

      return getCurrentPageUrl;
    }()
    //设置转发

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      return {
        title: this.shareInfo.text ? this.shareInfo.text : '' + this.allData.Merchant_baseInfo.mName,
        path: '/pages/f/page/index/index?id=' + this.shopId,
        imageUrl: this.shareInfo.image ? this.shareInfo.image : '',
        success: function success(res) {
          if (res) {
            wx.showToast({
              title: '转发成功',
              icon: 'success',
              duration: 1000
            });
          }
        },
        fail: function fail(res) {
          wx.showToast({
            title: '转发失败',
            image: '../../images/warning.png',
            duration: 1000
          });
        }
      };
    }
    //获取商户开通功能列表

  }, {
    key: 'merchantF',
    value: function merchantF() {
      var _this9 = this;

      var url = _requestUrl2.default.merchantFunction;
      var data = { m_id: this.shopId };
      var merchantFunction = [];
      (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
        res.data.data.forEach(function (element) {
          if (element.id == 5) {
            _this9.shareStatus = true;
          } else {
            merchantFunction.push(element);
          }
        });
        _this9.merchantFunction = merchantFunction;
        _this9.$apply();
        if (_this9.merchantFunction.length >= 4) {
          _this9.threeIconItemWidth = 25;
        } else {
          _this9.threeIconItemWidth = 100 / _this9.merchantFunction.length;
        }
        _this9.$apply();
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      //获取token
      this.token = wx.getStorageSync("token");
      wx.setStorage({
        key: 'deliverData',
        data: ''
      });
      wx.setStorage({
        key: 'takeoutDeliverData',
        data: ''
      });
      wx.setStorage({
        key: 'isStorageInfo',
        data: ''
      });
      this.getCurrentPageUrl();
    }
    //判断该家商户是否可以购买
    // async is_shopping(){
    //   const url = api.apiMall + 'api/is_openid/' + this.shopId;
    //   wepy.request({
    //     url: url,
    //     method: 'GET',
    //     header:{
    //       'Accept':'application/vnd.lingmo.v1+json',
    //       'Content-type':'application/x-www-form-urlencoded',
    //       'Authorization':'Bearer ' + this.token
    //     },
    //   }).then(res=>{
    //     if(res.data.status == 200){
    //       if(res.data.message.tag == 0){
    //         wx.showToast({
    //           title: res.data.message.message,
    //           icon: 'none',
    //           duration: 1500,
    //           mask: true,
    //           success:()=>{
    //             // setTimeout(() => {
    //             //   wx.navigateBack({
    //             //       delta: 1
    //             //   });
    //             // }, 1000);
    //           }
    //         });
    //       }
    //     }
    //   })
    // }

  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/f/page/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImNvbXBvbmVudHMiLCJkYXRhIiwidG9rZW4iLCJkaWFuWGluIiwiYWxsRGF0YSIsInNob3BJZCIsIm1vY2tJbmRleERhdGEiLCJncm91cHMiLCJpbWdVcmxzIiwidGVsIiwic3RhcnR0aW1lIiwiZW5kdGltZSIsInN5bmNUaXRsZSIsImJ1c2luZXNzIiwicmVzdCIsImV4dENvbmZpZyIsInN0YXJzIiwibm9ybWFsU3JjIiwic2VsZWN0ZWRTcmMiLCJoYWxmU3JjIiwia2V5IiwibG9jYXRpb24iLCJxcW1hcHNkayIsImZvb2ROdW1Db2RlIiwiZmlyc3QiLCJtaW5lIiwicmVzdWx0cyIsInBpY3R1cmVzIiwiY29tbWVudHMiLCJ0YWIiLCJpbnRyb2R1Y2UiLCJjb21tZW50IiwidHlwZSIsInBpY3NBcnIiLCJtZXRob2RzIiwibWVyY2hhbnRGdW5QYWdlSnVtcCIsIml0ZW0iLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIk1lcmNoYW50X2Jhc2VJbmZvIiwibU5hbWUiLCJpc01lbSIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidGFrZU91dFN0YXR1cyIsInRpbWUiLCJ1dGlsIiwiZ2V0Q3VycmVudFRpbWUiLCJOdW1iZXIiLCJzb2NrZXREYXRhIiwibUxvZ28iLCJsb2NhbFNwZWNpYWx0eSIsImluZHVzdF9pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJJbmR1c3RfaWQiLCJtaW5lUGFnZSIsInJlTGF1bmNoIiwidGFiSW50cm9kdWNlIiwidGFiQ29tbWVudCIsInN0b3JlQ2FsbCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsImNvblBob25lIiwiZ29Mb2NhbCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiY2hvb3NlTnVtIiwic2hhcmVGcmllbmRzIiwic2hhcmVTaG93IiwibWFza0ZsYWciLCJzaGFyZXF1YW4iLCJzaG93TG9hZGluZyIsInRpdGxlIiwiaGFvYmFvU2hvdyIsInBfaWQiLCJtX2lkIiwicG9ubHlpZCIsInJlcXVlc3RVcmwiLCJnZXRNZXJjaGFudENvZGUiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJoYWlCYW9JbWciLCJyZXMiLCJVUkwiLCIkYXBwbHkiLCJjbG9zZVNwZWMiLCJib3R0b21TaG93IiwiY2xvc2VIYWlCYW8iLCJzYXZlSW1nIiwiaW1nVXJsIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJlcnIiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwib3B0aW9ucyIsImdldE1lcmNoYW50U2hhcmVJbmZvIiwiZ2V0RGF0YSIsIm1lcmNoYW50RiIsImdldFN0b3JhZ2VTeW5jIiwiUVFNYXBXWCIsInNvY2tldFRhYmxlTnVtIiwibiIsInNvY2tldEZvb2ROdW0iLCJzZXRTdG9yYWdlIiwicmV2ZXJzZUdlb2NvZGVyIiwia2V5d29yZCIsInRoYXQiLCJsYXQiLCJsbmciLCJjb29yZF90eXBlIiwicmVzdWx0IiwiYWRkcmVzc19yZWZlcmVuY2UiLCJsYW5kbWFya19sMiIsImFwaSIsImFwaU1hbGwiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwic3RhdHVzIiwiZ2V0U3RvcmFnZSIsImNvbGxlY3RTaG9wTGlzdCIsInB1c2giLCJmb3JFYWNoIiwiaW5kZXgiLCJzcGxpY2UiLCJNZXJjaGFudEluZm8iLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJsb25nQmFubmVyIiwiTWFic3RyYWN0cGF0aCIsInNwbGl0Iiwic2xpY2UiLCJ0b3BDb3ZlciIsIk1lcmNoYW50X0Jhbm5lciIsIm9wZW4iLCJzaG9wcFN0YXR1cyIsImNhdGNoIiwic2hhcmVJbmZvIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdXJyZW50UGFnZSIsImxlbmd0aCIsInJvdXRlIiwidGV4dCIsInBhdGgiLCJpbWFnZVVybCIsImltYWdlIiwibWVyY2hhbnRGdW5jdGlvbiIsImVsZW1lbnQiLCJzaGFyZVN0YXR1cyIsInRocmVlSWNvbkl0ZW1XaWR0aCIsImdldEN1cnJlbnRQYWdlVXJsIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNMQywyQkFBcUIsT0FEaEI7QUFFTEMsb0NBQThCLFNBRnpCO0FBR0xDLDhCQUF3QixJQUhuQjtBQUlMQyw4QkFBd0IsT0FKbkI7QUFLTEMsdUJBQWlCO0FBTFosSyxRQU9UQyxVLEdBQWEsRSxRQUNiQyxJO0FBQ0VDLGFBQU0sRTtBQUNOQyxlQUFRLEM7QUFDUkMsZUFBUSxFO0FBQ1JDLGNBQU8sQyxFQUEyQjtBQUNsQ0MscUJBQWMsRTtBQUNkQyxjQUFPLEU7QUFDUEMsZUFBUSxFO0FBQ1JDLFdBQUksRTtBQUNKQyxpQkFBVSxDO0FBQ1ZDLGVBQVEsQztBQUNSQyxpQkFBVSxDO0FBQ1ZDLGdCQUFTLE87QUFDVEMsWUFBSyxNO0FBQ0xDLGlCQUFVLEk7QUFDVkMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEM7QUFDUEMsaUJBQVcsbUQ7QUFDWEMsbUJBQWEsd0Q7QUFDYkMsZUFBUSx1RDtBQUNSQyxXQUFLLEM7QUFDTEMsZ0JBQVMsSTtBQUNUQyxnQkFBUyxJO0FBQ1RDLG1CQUFZLEM7QUFDWkMsYUFBTSxDO0FBQ05DLFlBQUssQztBQUNMQyxlQUFRLEk7QUFDUkMsZ0JBQVMsRTtBQUNUQyxnQkFBUyxFO0FBQ1RDLFdBQUksQztBQUNKQyxpQkFBVSxPO0FBQ1ZDLGVBQVEsTTtBQUNSQyxZQUFLLEM7QUFDTEMsZUFBUTtvREFFTSxFLDhDQUNGLEUsNkNBQ0QsRSxtREFDTSxFLDRDQUNQLEssNkNBQ0MsSSwyQ0FFRixJLDRDQUNDLEUsOENBQ0UsSyw4Q0FDQSxLLDRDQUNGLEkscURBQ1MsRSxzQkFFckJDLE8sR0FBVTtBQUNSO0FBQ0FDLHlCQUZRLCtCQUVZQyxJQUZaLEVBRWlCO0FBQ3ZCLFlBQUdBLEtBQUtDLEVBQUwsSUFBVyxDQUFkLEVBQWdCO0FBQUc7QUFDakJDLGFBQUdDLFVBQUgsQ0FBYztBQUNWQyxnREFBa0MsS0FBS3BDLE9BQUwsQ0FBYXFDLGlCQUFiLENBQStCQyxLQUFqRSxjQUErRSxLQUFLckMsTUFBcEYsbUJBQXdHK0IsS0FBS087QUFEbkcsV0FBZDtBQUdELFNBSkQsTUFJTSxJQUFHUCxLQUFLQyxFQUFMLElBQVcsQ0FBWCxJQUFnQkQsS0FBS0MsRUFBTCxJQUFXLENBQTlCLEVBQWdDO0FBQUU7QUFDdENPLHlCQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLGFBQTFCLEdBQTBDLEVBQTFDO0FBQ0E7QUFDQSxjQUFJQyxPQUFPQyxlQUFLQyxjQUFMLEVBQVg7QUFDQSxjQUFHQyxPQUFPLEtBQUt6QyxTQUFaLEtBQTBCc0MsSUFBMUIsSUFBa0NBLE9BQU9HLE9BQU8sS0FBS3hDLE9BQVosQ0FBNUMsRUFBaUU7QUFDL0QsZ0JBQUl5QyxhQUFhLElBQWpCO0FBQ0FkLGVBQUdDLFVBQUgsQ0FBYztBQUNaQztBQURZLGFBQWQ7QUFHRCxXQUxELE1BS0s7QUFDSDtBQUNBO0FBQ0FGLGVBQUdDLFVBQUgsQ0FBYztBQUNaQyw2Q0FBNEIsS0FBS3BDLE9BQUwsQ0FBYXFDLGlCQUFiLENBQStCWSxLQUEzRCxnQkFBMkUsS0FBS2pELE9BQUwsQ0FBYXFDLGlCQUFiLENBQStCQyxLQUExRyxjQUF3SCxLQUFLckM7QUFEakgsYUFBZDtBQUdBO0FBQ0Q7QUFDRixTQWpCSyxNQWlCQSxJQUFHK0IsS0FBS0MsRUFBTCxJQUFXLENBQWQsRUFBZ0I7QUFBRztBQUN2Qk8seUJBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQlEsY0FBMUIsR0FBMkMsQ0FBM0M7QUFDQTtBQUNBaEIsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGtEQUFvQyxLQUFLbkMsTUFBekM7QUFEWSxXQUFkO0FBR0QsU0FOSyxNQU1BLElBQUcrQixLQUFLQyxFQUFMLElBQVcsQ0FBZCxFQUFnQjtBQUFFO0FBQ3RCLGNBQUlrQixZQUFZQyxLQUFLQyxTQUFMLENBQWUsRUFBRUMsV0FBVyxDQUFDLENBQWQsRUFBZixDQUFoQjtBQUNBcEIsYUFBR0MsVUFBSCxDQUFjO0FBQ1pDLGtEQUFvQ2UsU0FBcEMseURBQW1FLEtBQUtsRDtBQUQ1RCxXQUFkO0FBR0QsU0FMSyxNQUtBLElBQUcrQixLQUFLQyxFQUFMLElBQVcsRUFBZCxFQUFpQjtBQUFFO0FBQ3ZCQyxhQUFHQyxVQUFILENBQWM7QUFDWkMsaURBQW1DLEtBQUtuQztBQUQ1QixXQUFkO0FBR0Q7QUFDRixPQXhDTzs7QUF5Q1I7QUFDQXNELGNBMUNRLHNCQTBDRTtBQUNSckIsV0FBR3NCLFFBQUgsQ0FBWTtBQUNWcEIsZUFBSTtBQURNLFNBQVo7QUFHRCxPQTlDTzs7QUErQ1I7QUFDQXFCLGtCQWhEUSwwQkFnRE07QUFDWixhQUFLaEMsR0FBTCxHQUFXLENBQVg7QUFDQSxhQUFLQyxTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLE1BQWY7QUFDRCxPQXBETzs7QUFxRFI7QUFDQStCLGdCQXREUSx3QkFzREk7QUFDVixhQUFLakMsR0FBTCxHQUFXLENBQVg7QUFDQSxhQUFLQyxTQUFMLEdBQWlCLE1BQWpCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLE9BQWY7QUFDQTtBQUNELE9BM0RPOztBQTREUjtBQUNBZ0MsZUE3RFEsdUJBNkRJO0FBQ1Z6QixXQUFHMEIsYUFBSCxDQUFpQjtBQUNmQyx1QkFBYSxLQUFLN0QsT0FBTCxDQUFhcUMsaUJBQWIsQ0FBK0J5QjtBQUQ3QixTQUFqQjtBQUdELE9BakVPOztBQWtFUjtBQUNBQyxhQW5FUSxxQkFtRUM7QUFDUDdCLFdBQUc4QixZQUFILENBQWdCO0FBQ2RDLG9CQUFVbEIsT0FBTyxLQUFLL0MsT0FBTCxDQUFhcUMsaUJBQWIsQ0FBK0I0QixRQUF0QyxDQURJO0FBRWRDLHFCQUFXbkIsT0FBTyxLQUFLL0MsT0FBTCxDQUFhcUMsaUJBQWIsQ0FBK0I2QixTQUF0QztBQUZHLFNBQWhCO0FBSUQsT0F4RU87QUF5RVJDLGVBekVRLHVCQXlFRztBQUNUakMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUk7QUFEUSxTQUFkO0FBR0QsT0E3RU87O0FBOEVSO0FBQ0FmLFVBL0VRLGtCQStFRjtBQUNKYSxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSTtBQURRLFNBQWQ7QUFHRCxPQW5GTztBQW9GUmdDLGtCQXBGUSwwQkFvRk07QUFDWixhQUFLQyxTQUFMLEdBQWlCLENBQUMsS0FBS0EsU0FBdkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLENBQUMsS0FBS0EsUUFBdEI7QUFDRCxPQXZGTzs7QUF3RlI7QUFDQUMsZUF6RlEsdUJBeUZHO0FBQUE7O0FBQ1ByQyxXQUFHc0MsV0FBSCxDQUFlLEVBQUNDLE9BQU8sVUFBUixFQUFmO0FBQ0EsYUFBS0gsUUFBTCxHQUFnQixLQUFoQjtBQUNBLGFBQUtJLFVBQUwsR0FBa0IsS0FBbEI7QUFDQTtBQUNBLFlBQUk3RSxPQUFNO0FBQ044RSxnQkFBT25DLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQmlDLElBRDNCO0FBRU5DLGdCQUFPLEtBQUszRSxNQUZOO0FBR04yQixnQkFBTSxDQUhBO0FBSU5pRCxtQkFBUztBQUpILFNBQVY7QUFNQSxzQ0FBWUMscUJBQVdDLGVBQXZCLEVBQXVDLE1BQXZDLEVBQThDbEYsSUFBOUMsRUFBb0RtRixJQUFwRCxDQUF5RCxlQUFLO0FBQzFEOUMsYUFBRytDLFdBQUg7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQkMsSUFBSXRGLElBQUosQ0FBU0EsSUFBVCxDQUFjdUYsR0FBL0I7QUFDQSxpQkFBS0MsTUFBTDtBQUNILFNBSkQ7QUFLSCxPQXpHTztBQTBHUkMsZUExR1EsdUJBMEdJO0FBQ1IsYUFBS0MsVUFBTCxHQUFrQixDQUFDLEtBQUtBLFVBQXhCLEVBQ0EsS0FBS2pCLFFBQUwsR0FBZ0IsSUFEaEI7QUFFSCxPQTdHTztBQThHUmtCLGlCQTlHUSx5QkE4R0s7QUFDVCxhQUFLZCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS1csTUFBTDtBQUNILE9BakhPOztBQWtIUjtBQUNBSSxhQW5IUSxtQkFtSEFDLE1BbkhBLEVBbUhPO0FBQUE7O0FBQ2J4RCxXQUFHeUQsWUFBSCxDQUFnQjtBQUNadkQsZUFBS3NELE1BRE87QUFFWkUsbUJBQVMsaUJBQUNULEdBQUQsRUFBTztBQUNkakQsZUFBRzJELHNCQUFILENBQTBCO0FBQ3RCQyx3QkFBVVgsSUFBSVksWUFEUTtBQUV0QkgsdUJBQVMsaUJBQUMvRixJQUFELEVBQVE7QUFDZix1QkFBS3dFLFNBQUwsR0FBaUIsS0FBakI7QUFDQSx1QkFBS0ssVUFBTCxHQUFrQixJQUFsQjtBQUNBLHVCQUFLSixRQUFMLEdBQWdCLElBQWhCO0FBQ0EsdUJBQUtlLE1BQUw7QUFDRW5ELG1CQUFHOEQsU0FBSCxDQUFhO0FBQ1R2Qix5QkFBTyxNQURFO0FBRVR3Qix3QkFBTSxTQUZHO0FBR1RDLDRCQUFVO0FBSEQsaUJBQWI7QUFLSCxlQVpxQjtBQWF0QkMsb0JBQU0sY0FBQ0MsR0FBRCxFQUFPO0FBQ1hsRSxtQkFBR21FLFNBQUgsQ0FBYTtBQUNUNUIseUJBQU8sTUFERTtBQUVUNkIsMkJBQVMsdUNBRkE7QUFHVEMsOEJBQVksSUFISDtBQUlUQyw4QkFBWSxJQUpIO0FBS1RDLCtCQUFhLFNBTEo7QUFNVEMsK0JBQWEsSUFOSjtBQU9UQyxnQ0FBYyxTQVBMO0FBUVRmLDJCQUFTLHNCQUFPO0FBQ1osd0JBQUdULElBQUl5QixPQUFQLEVBQWU7QUFDWDFFLHlCQUFHMkUsV0FBSCxDQUFlO0FBQ1hqQixpQ0FBUSxpQkFBQ1QsR0FBRCxFQUFPO0FBQ1gsOEJBQUdBLElBQUkyQixXQUFKLENBQWdCLHdCQUFoQixDQUFILEVBQTZDO0FBQzNDNUUsK0JBQUc4RCxTQUFILENBQWEsRUFBQ3ZCLE9BQU8sWUFBUixFQUFxQndCLE1BQU0sTUFBM0IsRUFBYjtBQUNEO0FBQ0o7QUFMVSx1QkFBZjtBQU9IO0FBQ0o7QUFsQlEsaUJBQWI7QUFvQkQ7QUFsQ3FCLGFBQTFCO0FBb0NEO0FBdkNXLFNBQWhCO0FBeUNELE9BN0pPO0FBOEpSYyxrQkE5SlEsd0JBOEpLN0IsU0E5SkwsRUE4SmU7QUFDbkJoRCxXQUFHNkUsWUFBSCxDQUFnQjtBQUNoQkMsZ0JBQU0sTUFBSTlCLFNBQUosQ0FEVSxDQUNPO0FBRFAsU0FBaEI7QUFHSDtBQWxLTyxLOzs7OzsyQkFvS0grQixPLEVBQVE7QUFDYixXQUFLaEgsTUFBTCxHQUFjZ0gsUUFBUWhGLEVBQXRCO0FBQ0EsV0FBS2lGLG9CQUFMLENBQTBCRCxRQUFRaEYsRUFBbEM7QUFDQSxVQUFHLEtBQUtoQyxNQUFSLEVBQWU7QUFDYixhQUFLa0gsT0FBTDtBQUNBLGFBQUtDLFNBQUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0Q7QUFDQSxXQUFLdEgsS0FBTCxHQUFhb0MsR0FBR21GLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBYjtBQUNBN0UscUJBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQnpDLE1BQTFCLEdBQW1DLEtBQUtBLE1BQXhDO0FBQ0E7QUFDQSxXQUFLaUIsUUFBTCxHQUFnQixJQUFJb0cseUJBQUosQ0FBWTtBQUMxQnRHLGFBQUs7QUFEcUIsT0FBWixDQUFoQjtBQUdBLFVBQUluQixPQUFPLEVBQUMwSCxnQkFBZU4sUUFBUU8sQ0FBUixJQUFXLEtBQTNCLEVBQWlDQyxlQUFlLENBQWhELEVBQVgsQ0EzQmEsQ0EyQm1EO0FBQ2hFdkYsU0FBR3dGLFVBQUgsQ0FBYztBQUNaMUcsYUFBSSxNQURRO0FBRVpuQixjQUFLQTtBQUZPLE9BQWQ7QUFJQSxXQUFLd0YsTUFBTDtBQUNBO0FBQ0Q7QUFDRDs7OztrQ0FDYztBQUFBOztBQUNaO0FBQ0EsV0FBS25FLFFBQUwsQ0FBY3lHLGVBQWQsQ0FBOEI7QUFDNUJDLGlCQUFTLEtBRG1CO0FBRTVCM0csa0JBQVU7QUFDUmdELG9CQUFVNEQsS0FBS3ZHLE9BQUwsQ0FBYXdHLEdBRGY7QUFFUjVELHFCQUFXMkQsS0FBS3ZHLE9BQUwsQ0FBYXlHO0FBRmhCLFNBRmtCO0FBTTVCQyxvQkFBWSxDQU5nQjtBQU81QnBDLGlCQUFTLHNCQUFLO0FBQ1osaUJBQUszRSxRQUFMLEdBQWdCa0UsSUFBSThDLE1BQUosQ0FBV0MsaUJBQVgsQ0FBNkJDLFdBQTdCLENBQXlDbEgsUUFBekQ7QUFDQSxpQkFBS29FLE1BQUw7QUFDRDtBQVYyQixPQUE5QjtBQVlEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUFFVWpELG1CLEdBQU1nRyxjQUFJQyxPQUFKLEdBQWMsa0I7QUFDcEJ4SSxvQixHQUFPO0FBQ1QrRSx3QkFBSyxLQUFLM0U7QUFERCxpQjs7QUFHYnVDLCtCQUFLOEYsT0FBTCxDQUFhO0FBQ1RsRyx1QkFBS0EsR0FESTtBQUVUbUcsMEJBQVEsTUFGQztBQUdUQywwQkFBTztBQUNMLDhCQUFTLGdDQURKO0FBRUwsb0NBQWUsaURBRlY7QUFHTCxxQ0FBZ0IsWUFBWSxLQUFLMUk7QUFINUIsbUJBSEU7QUFRVEQsd0JBQU1BO0FBUkcsaUJBQWIsRUFTR21GLElBVEgsQ0FTUSxlQUFLO0FBQ1Qsc0JBQUdHLElBQUl0RixJQUFKLENBQVM0SSxNQUFULElBQW1CLEdBQXRCLEVBQTBCO0FBQ3RCdkcsdUJBQUc4RCxTQUFILENBQWE7QUFDVHZCLDZCQUFNLE1BREc7QUFFVHdCLDRCQUFLO0FBRkkscUJBQWI7QUFJQTtBQUNBL0QsdUJBQUd3RyxVQUFILENBQWM7QUFDVjFILDJCQUFJLGlCQURNO0FBRVY0RSwrQkFBUSxzQkFBSztBQUNULDRCQUFJK0Msa0JBQWtCeEQsSUFBSXRGLElBQTFCO0FBQ0E4SSx3Q0FBZ0JDLElBQWhCLENBQXFCLE9BQUszSSxNQUExQjtBQUNBaUMsMkJBQUd3RixVQUFILENBQWM7QUFDVjFHLCtCQUFJLGlCQURNO0FBRVZuQixnQ0FBSzhJO0FBRksseUJBQWQ7QUFJSCx1QkFUUztBQVVWeEMsNEJBQUssbUJBQUs7QUFDTiw0QkFBSXdDLGtCQUFrQixFQUF0QjtBQUNBQSx3Q0FBZ0JDLElBQWhCLENBQXFCLE9BQUszSSxNQUExQjtBQUNBaUMsMkJBQUd3RixVQUFILENBQWM7QUFDVjFHLCtCQUFJLGlCQURNO0FBRVZuQixnQ0FBSzhJO0FBRksseUJBQWQ7QUFJSDtBQWpCUyxxQkFBZDtBQW9CSDtBQUNKLGlCQXJDRDs7Ozs7Ozs7Ozs7Ozs7OztBQXVDSjs7Ozs7Ozs7Ozs7OztBQUVVdkcsbUIsR0FBTWdHLGNBQUlDLE9BQUosR0FBYyxtQkFBZCxHQUFvQyxLQUFLcEksTTs7QUFDckR1QywrQkFBSzhGLE9BQUwsQ0FBYTtBQUNUbEcsdUJBQUtBLEdBREk7QUFFVG1HLDBCQUFRLEtBRkM7QUFHVEMsMEJBQU87QUFDSCw4QkFBUyxnQ0FETjtBQUVILG9DQUFlLG1DQUZaO0FBR0gscUNBQWdCLFlBQVksS0FBSzFJO0FBSDlCO0FBSEUsaUJBQWIsRUFRR2tGLElBUkgsQ0FRUSxlQUFLO0FBQ1Q5QyxxQkFBRzhELFNBQUgsQ0FBYTtBQUNUdkIsMkJBQU0sTUFERztBQUVUd0IsMEJBQUs7QUFGSSxtQkFBYjtBQUlBO0FBQ0EvRCxxQkFBR3dHLFVBQUgsQ0FBYztBQUNWMUgseUJBQUksaUJBRE07QUFFVjRFLDZCQUFRLHNCQUFLO0FBQ1QsMEJBQUkrQyxrQkFBa0J4RCxJQUFJdEYsSUFBMUI7QUFDQSwwQkFBRzhJLGVBQUgsRUFBbUI7QUFDZkEsd0NBQWdCRSxPQUFoQixDQUF3QixVQUFDN0csSUFBRCxFQUFNOEcsS0FBTixFQUFjO0FBQ2xDLDhCQUFHLE9BQUs3SSxNQUFMLElBQWUrQixJQUFsQixFQUF1QjtBQUNuQjJHLDRDQUFnQkksTUFBaEIsQ0FBdUJELEtBQXZCLEVBQTZCLENBQTdCO0FBQ0g7QUFDSix5QkFKRDtBQUtBNUcsMkJBQUd3RixVQUFILENBQWM7QUFDVjFHLCtCQUFJLGlCQURNO0FBRVZuQixnQ0FBSzhJO0FBRksseUJBQWQ7QUFJSDtBQUVKO0FBaEJTLG1CQUFkO0FBbUJILGlCQWpDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NNdkcsbUIsR0FBTTBDLHFCQUFXa0UsWTtBQUNqQm5KLG9CLEdBQU87QUFDVDhFLHdCQUFLbkMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCaUMsSUFEdEI7QUFFVEMsd0JBQUssS0FBSzNFLE1BRkQ7QUFHVEgseUJBQU9vQyxHQUFHbUYsY0FBSCxDQUFrQixPQUFsQjtBQUhFLGlCOztBQUtiN0UsK0JBQUs4RixPQUFMLENBQWE7QUFDVGxHLHVCQUFLQSxHQURJO0FBRVRtRywwQkFBUSxNQUZDO0FBR1QxSSx3QkFBTUE7QUFIRyxpQkFBYixFQUlHbUYsSUFKSCxDQUlRLFVBQUNHLEdBQUQsRUFBTztBQUNYakQscUJBQUcrRyxxQkFBSCxDQUF5QixFQUFFeEUsT0FBTyxJQUFULEVBQXpCO0FBQ0F2QyxxQkFBR2dILHdCQUFIO0FBQ0E7QUFDQSx5QkFBS0MsVUFBTCxHQUFrQmhFLElBQUl0RixJQUFKLENBQVNBLElBQVQsQ0FBY3dDLGlCQUFkLENBQWdDK0csYUFBaEMsQ0FBOENDLEtBQTlDLENBQW9ELEdBQXBELEVBQXlEQyxLQUF6RCxDQUErRCxDQUEvRCxFQUFpRSxDQUFDLENBQWxFLENBQWxCO0FBQ0EseUJBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSx5QkFBS25KLE9BQUwsR0FBZStFLElBQUl0RixJQUFKLENBQVNBLElBQVQsQ0FBYzJKLGVBQTdCO0FBQ0EseUJBQUt4SixPQUFMLEdBQWVtRixJQUFJdEYsSUFBSixDQUFTQSxJQUF4QjtBQUNBLHNCQUFHc0YsSUFBSXRGLElBQUosQ0FBU0EsSUFBVCxDQUFjd0MsaUJBQWQsQ0FBZ0NvSCxJQUFoQyxJQUF3QyxDQUEzQyxFQUE2QztBQUN6QztBQUNBLDJCQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0gsbUJBSEQsTUFHSztBQUNELDJCQUFLQSxXQUFMLEdBQW1CLEtBQW5CO0FBQ0g7QUFDRCx5QkFBS3JFLE1BQUw7QUFDSCxpQkFuQkQsRUFtQkdzRSxLQW5CSCxDQW1CUyxVQUFDeEUsR0FBRCxFQUFPO0FBQ1pqRCxxQkFBRzhELFNBQUgsQ0FBYSxFQUFFdkIsT0FBTyxVQUFULEVBQW9Cd0IsTUFBSyxNQUF6QixFQUFiO0FBQ0gsaUJBckJEOzs7Ozs7Ozs7Ozs7Ozs7O0FBdUJKOzs7O3lDQUNxQnJCLEksRUFBSztBQUFBOztBQUN0QixVQUFJeEMsTUFBTTBDLHFCQUFXb0Msb0JBQXJCO0FBQ0EsVUFBSXJILE9BQU87QUFDUDhFLGNBQU9uQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJpQyxJQUQxQjtBQUVQQyxjQUFPQTtBQUZBLE9BQVg7QUFJQSxvQ0FBWXhDLEdBQVosRUFBZ0IsTUFBaEIsRUFBdUJ2QyxJQUF2QixFQUE2Qm1GLElBQTdCLENBQWtDLGVBQUs7QUFDbkMsZUFBSzRFLFNBQUwsR0FBaUJ6RSxJQUFJdEYsSUFBSixDQUFTQSxJQUExQjtBQUNBLGVBQUt3RixNQUFMO0FBQ0gsT0FIRDtBQUlIO0FBQ0Q7Ozs7Ozs7Ozs7O0FBRU13RSxxQixHQUFRQyxpQjtBQUNSQywyQixHQUFjRixNQUFNQSxNQUFNRyxNQUFOLEdBQWEsQ0FBbkIsQztBQUNkNUgsbUIsR0FBTTJILFlBQVlFLEs7O0FBQ3RCLG9CQUFHN0gsT0FBTyxtQkFBVixFQUE4QjtBQUM1Qix1QkFBS2hCLEtBQUwsR0FBYSxDQUFiO0FBQ0EsdUJBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSDs7OztzQ0FDa0I4RCxHLEVBQUk7QUFDcEIsYUFBTztBQUNMVixlQUFPLEtBQUttRixTQUFMLENBQWVNLElBQWYsR0FBb0IsS0FBS04sU0FBTCxDQUFlTSxJQUFuQyxRQUEyQyxLQUFLbEssT0FBTCxDQUFhcUMsaUJBQWIsQ0FBK0JDLEtBRDVFO0FBRUw2SCxjQUFNLGtDQUFpQyxLQUFLbEssTUFGdkM7QUFHTG1LLGtCQUFVLEtBQUtSLFNBQUwsQ0FBZVMsS0FBZixHQUFxQixLQUFLVCxTQUFMLENBQWVTLEtBQXBDLEdBQTBDLEVBSC9DO0FBSUx6RSxpQkFBUyxzQkFBSztBQUNaLGNBQUdULEdBQUgsRUFBTztBQUNMakQsZUFBRzhELFNBQUgsQ0FBYTtBQUNYdkIscUJBQU8sTUFESTtBQUVYd0Isb0JBQU0sU0FGSztBQUdYQyx3QkFBVTtBQUhDLGFBQWI7QUFLRDtBQUNGLFNBWkk7QUFhTEMsY0FBTSxtQkFBSztBQUNUakUsYUFBRzhELFNBQUgsQ0FBYTtBQUNYdkIsbUJBQU8sTUFESTtBQUVYNEYsbUJBQU0sMEJBRks7QUFHWG5FLHNCQUFVO0FBSEMsV0FBYjtBQUtEO0FBbkJJLE9BQVA7QUFxQkQ7QUFDRDs7OztnQ0FDVztBQUFBOztBQUNULFVBQUk5RCxNQUFNMEMscUJBQVd3RixnQkFBckI7QUFDQSxVQUFJekssT0FBTyxFQUFFK0UsTUFBSyxLQUFLM0UsTUFBWixFQUFYO0FBQ0EsVUFBSXFLLG1CQUFtQixFQUF2QjtBQUNBLG9DQUFZbEksR0FBWixFQUFnQixNQUFoQixFQUF1QnZDLElBQXZCLEVBQTZCbUYsSUFBN0IsQ0FBa0MsZUFBSztBQUNuQ0csWUFBSXRGLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0osT0FBZCxDQUFzQixtQkFBVztBQUM5QixjQUFHMEIsUUFBUXRJLEVBQVIsSUFBYyxDQUFqQixFQUFtQjtBQUNqQixtQkFBS3VJLFdBQUwsR0FBbUIsSUFBbkI7QUFDRCxXQUZELE1BRUs7QUFDSEYsNkJBQWlCMUIsSUFBakIsQ0FBc0IyQixPQUF0QjtBQUNEO0FBQ0gsU0FORDtBQU9BLGVBQUtELGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDQSxlQUFLakYsTUFBTDtBQUNBLFlBQUcsT0FBS2lGLGdCQUFMLENBQXNCTixNQUF0QixJQUE4QixDQUFqQyxFQUFtQztBQUNqQyxpQkFBS1Msa0JBQUwsR0FBMEIsRUFBMUI7QUFDRCxTQUZELE1BRUs7QUFDSCxpQkFBS0Esa0JBQUwsR0FBMEIsTUFBSSxPQUFLSCxnQkFBTCxDQUFzQk4sTUFBcEQ7QUFDRDtBQUNELGVBQUszRSxNQUFMO0FBQ0gsT0FoQkQ7QUFpQkQ7Ozs2QkFDTztBQUNOO0FBQ0EsV0FBS3ZGLEtBQUwsR0FBYW9DLEdBQUdtRixjQUFILENBQWtCLE9BQWxCLENBQWI7QUFDQW5GLFNBQUd3RixVQUFILENBQWM7QUFDWjFHLGFBQUksYUFEUTtBQUVabkIsY0FBSztBQUZPLE9BQWQ7QUFJQXFDLFNBQUd3RixVQUFILENBQWM7QUFDWjFHLGFBQUksb0JBRFE7QUFFWm5CLGNBQUs7QUFGTyxPQUFkO0FBSUFxQyxTQUFHd0YsVUFBSCxDQUFjO0FBQ1oxRyxhQUFJLGVBRFE7QUFFWm5CLGNBQUs7QUFGTyxPQUFkO0FBSUEsV0FBSzZLLGlCQUFMO0FBQ0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUFyZmlDbEksZUFBS21JLEk7O2tCQUFuQnRMLEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvYXBpJ1xuICBpbXBvcnQgYXBwIGZyb20gJy4uLy4uLy4uLy4uL3V0aWxzL2FwcCdcbiAgaW1wb3J0IFFRTWFwV1ggZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvcXFtYXAtd3gtanNzZGsubWluLmpzJ1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy91dGlsJ1xuXG4gIGltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9yZXF1ZXN0VXJsJ1xuICBpbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogJ2xpZ2h0JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmQyNjUnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ2JsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNlNWU1ZTVcIlxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge31cbiAgICBkYXRhID0ge1xuICAgICAgdG9rZW46JycsXG4gICAgICBkaWFuWGluOjAsXG4gICAgICBhbGxEYXRhOnt9LFxuICAgICAgc2hvcElkOjAsICAgICAgICAgICAgICAgICAgICAgICAgIC8v5ZWG5oi3SURcbiAgICAgIG1vY2tJbmRleERhdGE6W10sXG4gICAgICBncm91cHM6W10sXG4gICAgICBpbWdVcmxzOltdLFxuICAgICAgdGVsOicnLFxuICAgICAgc3RhcnR0aW1lOjAsXG4gICAgICBlbmR0aW1lOjAsXG4gICAgICBzeW5jVGl0bGU6MCxcbiAgICAgIGJ1c2luZXNzOidibG9jaycsXG4gICAgICByZXN0Oidub25lJyxcbiAgICAgIGV4dENvbmZpZzpudWxsLFxuICAgICAgc3RhcnM6IFswLCAxLCAyLCAzLCA0XSxcbiAgICAgIG5vcm1hbFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3Rhci5wbmcnLFxuICAgICAgc2VsZWN0ZWRTcmM6ICdodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3N0YXJXaG9sZS5wbmcnLFxuICAgICAgaGFsZlNyYzonaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9zdGFySGFsZi5wbmcnLFxuICAgICAga2V5OiAwLFxuICAgICAgbG9jYXRpb246bnVsbCxcbiAgICAgIHFxbWFwc2RrOm51bGwsXG4gICAgICBmb29kTnVtQ29kZTowLFxuICAgICAgZmlyc3Q6MSxcbiAgICAgIG1pbmU6MCxcbiAgICAgIHJlc3VsdHM6bnVsbCxcbiAgICAgIHBpY3R1cmVzOltdLFxuICAgICAgY29tbWVudHM6W10sXG4gICAgICB0YWI6MCxcbiAgICAgIGludHJvZHVjZTonYmxvY2snLFxuICAgICAgY29tbWVudDonbm9uZScsXG4gICAgICB0eXBlOjIsXG4gICAgICBwaWNzQXJyOltdLFxuICAgICAgLy8g5ou85Zui5ZWG5ZOBXG4gICAgICBtb2NrSW5kZXhEYXRhOltdLFxuICAgICAgYXJyVXJsR3JvdXA6W10sXG4gICAgICBsb25nQmFubmVyOltdLFxuICAgICAgbWVyY2hhbnRGdW5jdGlvbjpbXSwgIC8v5ZWG5a625byA6YCa5Yqf6IO9XG4gICAgICBzaGFyZVNob3c6ZmFsc2UsXG4gICAgICBoYW9iYW9TaG93OnRydWUsXG4gICAgICAvL+mBrue9qVxuICAgICAgbWFza0ZsYWc6dHJ1ZSxcbiAgICAgIGhhaUJhb0ltZzonJyxcbiAgICAgIHNoYXJlU3RhdHVzOmZhbHNlLFxuICAgICAgc2hvcHBTdGF0dXM6ZmFsc2UsXG4gICAgICBzaGFyZUluZm86bnVsbCxcbiAgICAgIHRocmVlSWNvbkl0ZW1XaWR0aDonJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8g5qC55o2uaWTot7PovazllYbmiLflvIDpgJrlip/og73pobXpnaJcbiAgICAgIG1lcmNoYW50RnVuUGFnZUp1bXAoaXRlbSl7XG4gICAgICAgIGlmKGl0ZW0uaWQgPT0gMSl7ICAvL+S5sOWNlVxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGAuLi8uLi8uLi9pbnB1dFZhbHVlP3RpdGxlPSR7dGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLm1OYW1lfSZtX2lkPSR7dGhpcy5zaG9wSWR9JmlzTWVtQ2FyZD0ke2l0ZW0uaXNNZW19YFxuICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZSBpZihpdGVtLmlkID09IDIgfHwgaXRlbS5pZCA9PSA1KXsgLy/ngrnppJDpobXpnaJcbiAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXMgPSAnJ1xuICAgICAgICAgIC8v5Yik5pat5b2T5ZWG5a625Zyo5LyR5oGv5Lit77yM5bCG5LiN6IO96L+b6KGM54K56aSQXG4gICAgICAgICAgbGV0IHRpbWUgPSB1dGlsLmdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgaWYoTnVtYmVyKHRoaXMuc3RhcnR0aW1lKSA8PSB0aW1lICYmIHRpbWUgPCBOdW1iZXIodGhpcy5lbmR0aW1lKSl7XG4gICAgICAgICAgICBsZXQgc29ja2V0RGF0YSA9IG51bGw7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOmAuLi9kL2Nob29zZU51bWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyByZXR1cm47XG4gICAgICAgICAgICAvLyAtLS0tLS1cbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6YC4uL2QvY2hvb3NlTnVtP21Mb2dvPSR7dGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLm1Mb2dvfSZtVGl0bGU9JHt0aGlzLmFsbERhdGEuTWVyY2hhbnRfYmFzZUluZm8ubU5hbWV9Jm1faWQ9JHt0aGlzLnNob3BJZH1gXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gLS0tLS0tLVxuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYoaXRlbS5pZCA9PSAzKXsgIC8v5pys5Zyw54m55LqnXG4gICAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5sb2NhbFNwZWNpYWx0eSA9IDFcbiAgICAgICAgICAvLyDor7fmsYLkvKBsb2NhbFNwZWNpYWx0eT0xXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAuLi8uLi8uLi9lL3BhZ2UvaG9tZVBhZ2U/aWQ9JHt0aGlzLnNob3BJZH0mbG9jYWxTcGVjaWFsdHk9MWBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoaXRlbS5pZCA9PSA0KXsgLy/lpJbljZZcbiAgICAgICAgICBsZXQgaW5kdXN0X2lkID0gSlNPTi5zdHJpbmdpZnkoeyBJbmR1c3RfaWQ6IC00IH0pO1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOiBgLi4vLi4vLi4vZGVsaWNpb3VzRm9vZD9pbmZvPSR7aW5kdXN0X2lkfSZ0aXRsZT3mnKzlupfmjqjojZDlpJbljZYmbV9pZD0ke3RoaXMuc2hvcElkfWBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2UgaWYoaXRlbS5pZCA9PSAxMil7IC8v56ev5YiG5ZWG5Z+OXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6IGAuLi8uLi8uLi9pbnRlZ3JhbE1hbGw/bV9pZD0ke3RoaXMuc2hvcElkfWBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8v6Lez6L2s5oiR55qE6aG16Z2iXG4gICAgICBtaW5lUGFnZSgpe1xuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOicuL2QvbWluZSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDllYblrrbku4vnu43pobXpnaJcbiAgICAgIHRhYkludHJvZHVjZSgpe1xuICAgICAgICB0aGlzLnRhYiA9IDA7XG4gICAgICAgIHRoaXMuaW50cm9kdWNlID0gXCJibG9ja1wiO1xuICAgICAgICB0aGlzLmNvbW1lbnQgPSBcIm5vbmVcIlxuICAgICAgfSxcbiAgICAgIC8vIOWVhuWutuivhOiuulxuICAgICAgdGFiQ29tbWVudCgpe1xuICAgICAgICB0aGlzLnRhYiA9IDE7XG4gICAgICAgIHRoaXMuaW50cm9kdWNlID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuY29tbWVudCA9IFwiYmxvY2tcIjtcbiAgICAgICAgLy8gdGhpcy5nZXRTaG9wRGV0YWlsKCk7XG4gICAgICB9LFxuICAgICAgLy/mi6jmiZPnlLXor51cbiAgICAgIHN0b3JlQ2FsbCAoKXtcbiAgICAgICAgd3gubWFrZVBob25lQ2FsbCh7XG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHRoaXMuYWxsRGF0YS5NZXJjaGFudF9iYXNlSW5mby5jb25QaG9uZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIC8vIOi3s+i9rOWcsOWbvlxuICAgICAgZ29Mb2NhbCgpe1xuICAgICAgICB3eC5vcGVuTG9jYXRpb24oe1xuICAgICAgICAgIGxhdGl0dWRlOiBOdW1iZXIodGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLmxhdGl0dWRlKSxcbiAgICAgICAgICBsb25naXR1ZGU6IE51bWJlcih0aGlzLmFsbERhdGEuTWVyY2hhbnRfYmFzZUluZm8ubG9uZ2l0dWRlKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNob29zZU51bSgpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy4vZC9jaG9vc2VOdW0nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g6Lez6L2s5oiR55qE6aG16Z2iXG4gICAgICBtaW5lKCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDonLi9kL21pbmUnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgc2hhcmVGcmllbmRzKCl7XG4gICAgICAgIHRoaXMuc2hhcmVTaG93ID0gIXRoaXMuc2hhcmVTaG93XG4gICAgICAgIHRoaXMubWFza0ZsYWcgPSAhdGhpcy5tYXNrRmxhZ1xuICAgICAgfSxcbiAgICAgIC8v5Y+R5pyL5Y+L5ZyIXG4gICAgICBzaGFyZXF1YW4oKXtcbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICfmtbfmiqXnlJ/miJDkuK0uLi4nfSk7XG4gICAgICAgICAgdGhpcy5tYXNrRmxhZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5oYW9iYW9TaG93ID0gZmFsc2U7XG4gICAgICAgICAgLy8gIOivt+axguWbvueJh+mTvuaOpVxuICAgICAgICAgIGxldCBkYXRhID17XG4gICAgICAgICAgICAgIHBfaWQgOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgIG1faWQgOiB0aGlzLnNob3BJZCxcbiAgICAgICAgICAgICAgdHlwZTogMCxcbiAgICAgICAgICAgICAgcG9ubHlpZCA6JydcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcXVlc3REYXRhKHJlcXVlc3RVcmwuZ2V0TWVyY2hhbnRDb2RlLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB0aGlzLmhhaUJhb0ltZyA9IHJlcy5kYXRhLmRhdGEuVVJMXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsb3NlU3BlYyAoKXtcbiAgICAgICAgICB0aGlzLmJvdHRvbVNob3cgPSAhdGhpcy5ib3R0b21TaG93LFxuICAgICAgICAgIHRoaXMubWFza0ZsYWcgPSB0cnVlO1xuICAgICAgfSxcbiAgICAgIGNsb3NlSGFpQmFvKCl7XG4gICAgICAgICAgdGhpcy5oYW9iYW9TaG93ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLy8g5L+d5a2Y5Zu+54mH6Iez55u45YaMXG4gICAgICBzYXZlSW1nKGltZ1VybCl7XG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICB1cmw6IGltZ1VybCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT57XG4gICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZVNob3cgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhb2Jhb1Nob3cgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFza0ZsYWcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKT0+e1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmjojmnYPmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+aCqOW3suaLkue7neiuv+mXruebuOWGjOaOiOadg++8jOWmgumcgOWwhuWbvueJh+S/neWtmOiHs+ebuOWGjOivt+eCueWHu+KAmOehruWumuKAmeS7peiOt+WPlueUqOaIt+aOiOadg+iuvue9ricsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzNDQzUxRicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5jb25maXJtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczoocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUud3JpdGVQaG90b3NBbGJ1bSddKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfmjojmnYPmiJDlip/vvIzor7fph43mlrDkv53lrZgnLGljb246ICdub25lJ30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcHJldmlld0ltYWdlKGhhaUJhb0ltZyl7XG4gICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgICB1cmxzOiBbYCR7aGFpQmFvSW1nfWBdIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICB0aGlzLnNob3BJZCA9IG9wdGlvbnMuaWQ7XG4gICAgICB0aGlzLmdldE1lcmNoYW50U2hhcmVJbmZvKG9wdGlvbnMuaWQpXG4gICAgICBpZih0aGlzLnNob3BJZCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICB0aGlzLm1lcmNoYW50RigpXG4gICAgICAgIC8vIHRoaXMuZ3JvdXAoKTtcbiAgICAgICAgLy/or7vlj5bnvJPlrZjvvIzliKTmlq3or6XlupfmmK/lkKbooqvmlLbol4/ov4dcbiAgICAgICAgLy8gd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIC8vICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgICAgIC8vICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAvLyAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gcmVzLmRhdGE7XG4gICAgICAgIC8vICAgICAgIGNvbGxlY3RTaG9wTGlzdC5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuc2hvcElkID09IGl0ZW0pe1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmRpYW5YaW4gPSAxO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgfSlcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcbiAgICAgIH1cbiAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpO1xuICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zaG9wSWQgPSB0aGlzLnNob3BJZDtcbiAgICAgIC8vIOWunuS+i+WMlkFQSeaguOW/g+exu1xuICAgICAgdGhpcy5xcW1hcHNkayA9IG5ldyBRUU1hcFdYKHtcbiAgICAgICAga2V5OiAnN1Q3QlotV1hMQzYtVlg2U1MtRU1FVjItWURDM0gtVVpCMjQnXG4gICAgICB9KTtcbiAgICAgIGxldCBkYXRhID0ge3NvY2tldFRhYmxlTnVtOm9wdGlvbnMubnx8J+aXoOahjOWPtycsc29ja2V0Rm9vZE51bTogMX07ICAvL+a1i+ivleacieahjOWPt+eCuemkkFxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTpcImRhdGFcIixcbiAgICAgICAgZGF0YTpkYXRhXG4gICAgICB9KVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIC8vIHRoaXMuaXNfc2hvcHBpbmcoKTtcbiAgICB9XG4gICAgLy/ovazmjaLlnLDlm77nmoTlh73mlbBcbiAgICB0b0xvY2FsdGlvbigpIHtcbiAgICAgIC8vIOiwg+eUqOaOpeWPo1xuICAgICAgdGhpcy5xcW1hcHNkay5yZXZlcnNlR2VvY29kZXIoe1xuICAgICAgICBrZXl3b3JkOiAn56eR5oqA5ZutJyxcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICBsYXRpdHVkZTogdGhhdC5yZXN1bHRzLmxhdCxcbiAgICAgICAgICBsb25naXR1ZGU6IHRoYXQucmVzdWx0cy5sbmdcbiAgICAgICAgfSxcbiAgICAgICAgY29vcmRfdHlwZTogNSxcbiAgICAgICAgc3VjY2VzczoocmVzPT57XG4gICAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHJlcy5yZXN1bHQuYWRkcmVzc19yZWZlcmVuY2UubGFuZG1hcmtfbDIubG9jYXRpb247XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICAgIC8v5pS26JeP5bqX6ZO6XG4gICAgYXN5bmMgY29sbGVjdFNob3AoKXtcbiAgICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3BfY29sbGVjdCc7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBtX2lkOnRoaXMuc2hvcElkXG4gICAgICAgIH1cbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgaWYocmVzLmRhdGEuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+aUtuiXj+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246J3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL+WtmOaVsOe7hFxuICAgICAgICAgICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QucHVzaCh0aGlzLnNob3BJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpjb2xsZWN0U2hvcExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhaWw6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QucHVzaCh0aGlzLnNob3BJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpjb2xsZWN0U2hvcExpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvL+WPlua2iOaUtuiXj1xuICAgIGFzeW5jIGNhbmNsZUNvbGxlY3RTaG9wKCl7XG4gICAgICAgIGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wX2NvbGxlY3QvJyArIHRoaXMuc2hvcElkO1xuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC10eXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6J+WPlua2iOaUtuiXjycsXG4gICAgICAgICAgICAgICAgaWNvbjonc3VjY2VzcydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL+WIoOmZpOaVsOe7hOS4reeahOebluWVhumTulxuICAgICAgICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5Oidjb2xsZWN0U2hvcExpc3QnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0U2hvcExpc3QgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29sbGVjdFNob3BMaXN0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3RTaG9wTGlzdC5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvcElkID09IGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3Quc3BsaWNlKGluZGV4LDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTonY29sbGVjdFNob3BMaXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOmNvbGxlY3RTaG9wTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGFzeW5jIGdldERhdGEoKXtcbiAgICAgICAgY29uc3QgdXJsID0gcmVxdWVzdFVybC5NZXJjaGFudEluZm9cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIHBfaWQ6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgbV9pZDp0aGlzLnNob3BJZCxcbiAgICAgICAgICAgIHRva2VuOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgICB9XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6ICfpppbpobUnIH0pXG4gICAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YS5NZXJjaGFudF9iYXNlSW5mby5NYWJzdHJhY3RwYXRoKVxuICAgICAgICAgICAgdGhpcy5sb25nQmFubmVyID0gcmVzLmRhdGEuZGF0YS5NZXJjaGFudF9iYXNlSW5mby5NYWJzdHJhY3RwYXRoLnNwbGl0KCc7Jykuc2xpY2UoMCwtMSk7XG4gICAgICAgICAgICB0aGlzLnRvcENvdmVyID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy5pbWdVcmxzID0gcmVzLmRhdGEuZGF0YS5NZXJjaGFudF9CYW5uZXI7IFxuICAgICAgICAgICAgdGhpcy5hbGxEYXRhID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfYmFzZUluZm8ub3BlbiA9PSAwKXtcbiAgICAgICAgICAgICAgICAvL3Nob3BwU3RhdHVzID09IDAg6JCl5LiaXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wcFN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BwU3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9KS5jYXRjaCgocmVzKT0+e1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfnvZHnu5zlvILluLjvvIzor7fph43or5UnLGljb246J25vbmUnfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy/ojrflj5bllYbmiLfovazlj5Hlpb3lj4vkv6Hmga/lhoXlrrlcbiAgICBnZXRNZXJjaGFudFNoYXJlSW5mbyhtX2lkKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0TWVyY2hhbnRTaGFyZUluZm87XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgcF9pZCA6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgIG1faWQgOiBtX2lkXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgdGhpcy5zaGFyZUluZm8gPSByZXMuZGF0YS5kYXRhXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8v6I635Y+W5b2T5YmN6aG15Ye95pWwKOWIpOaWreW9k+WJjemhteaYr+WQpuS4uummlumhtSlcbiAgICBhc3luYyBnZXRDdXJyZW50UGFnZVVybCgpe1xuICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XG4gICAgICBsZXQgY3VycmVudFBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGgtMV07XG4gICAgICBsZXQgdXJsID0gY3VycmVudFBhZ2Uucm91dGU7XG4gICAgICBpZih1cmwgPT0gJ3BhZ2VzL2luZGV4L2luZGV4Jyl7XG4gICAgICAgIHRoaXMuZmlyc3QgPSAxO1xuICAgICAgICB0aGlzLm1pbmUgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICAvL+iuvue9rui9rOWPkVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcyl7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0aXRsZTogdGhpcy5zaGFyZUluZm8udGV4dD90aGlzLnNoYXJlSW5mby50ZXh0OmAke3RoaXMuYWxsRGF0YS5NZXJjaGFudF9iYXNlSW5mby5tTmFtZX1gLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2YvcGFnZS9pbmRleC9pbmRleD9pZD0nKyB0aGlzLnNob3BJZCxcbiAgICAgICAgaW1hZ2VVcmw6IHRoaXMuc2hhcmVJbmZvLmltYWdlP3RoaXMuc2hhcmVJbmZvLmltYWdlOicnLFxuICAgICAgICBzdWNjZXNzOihyZXM9PntcbiAgICAgICAgICBpZihyZXMpe1xuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfovazlj5HmiJDlip8nLFxuICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZhaWw6KHJlcz0+e1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+i9rOWPkeWksei0pScsXG4gICAgICAgICAgICBpbWFnZTonLi4vLi4vaW1hZ2VzL3dhcm5pbmcucG5nJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgLy/ojrflj5bllYbmiLflvIDpgJrlip/og73liJfooahcbiAgICBtZXJjaGFudEYoKXtcbiAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLm1lcmNoYW50RnVuY3Rpb247XG4gICAgICBsZXQgZGF0YSA9IHsgbV9pZDp0aGlzLnNob3BJZCB9XG4gICAgICBsZXQgbWVyY2hhbnRGdW5jdGlvbiA9IFtdO1xuICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICBpZihlbGVtZW50LmlkID09IDUpe1xuICAgICAgICAgICAgICAgdGhpcy5zaGFyZVN0YXR1cyA9IHRydWVcbiAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgIG1lcmNoYW50RnVuY3Rpb24ucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLm1lcmNoYW50RnVuY3Rpb24gPSBtZXJjaGFudEZ1bmN0aW9uXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIGlmKHRoaXMubWVyY2hhbnRGdW5jdGlvbi5sZW5ndGg+PTQpe1xuICAgICAgICAgICAgdGhpcy50aHJlZUljb25JdGVtV2lkdGggPSAyNVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy50aHJlZUljb25JdGVtV2lkdGggPSAxMDAvdGhpcy5tZXJjaGFudEZ1bmN0aW9uLmxlbmd0aFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpO1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTonZGVsaXZlckRhdGEnLFxuICAgICAgICBkYXRhOicnXG4gICAgICB9KVxuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTondGFrZW91dERlbGl2ZXJEYXRhJyxcbiAgICAgICAgZGF0YTonJ1xuICAgICAgfSlcbiAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICBrZXk6J2lzU3RvcmFnZUluZm8nLFxuICAgICAgICBkYXRhOicnXG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRDdXJyZW50UGFnZVVybCgpO1xuICAgIH1cbiAgICAvL+WIpOaWreivpeWutuWVhuaIt+aYr+WQpuWPr+S7pei0reS5sFxuICAgIC8vIGFzeW5jIGlzX3Nob3BwaW5nKCl7XG4gICAgLy8gICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvaXNfb3BlbmlkLycgKyB0aGlzLnNob3BJZDtcbiAgICAvLyAgIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICAgIHVybDogdXJsLFxuICAgIC8vICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIC8vICAgICBoZWFkZXI6e1xuICAgIC8vICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgIC8vICAgICAgICdDb250ZW50LXR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgIC8vICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9KS50aGVuKHJlcz0+e1xuICAgIC8vICAgICBpZihyZXMuZGF0YS5zdGF0dXMgPT0gMjAwKXtcbiAgICAvLyAgICAgICBpZihyZXMuZGF0YS5tZXNzYWdlLnRhZyA9PSAwKXtcbiAgICAvLyAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgLy8gICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tZXNzYWdlLm1lc3NhZ2UsXG4gICAgLy8gICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAvLyAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgLy8gICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgLy8gICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAvLyAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAvLyAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgLy8gICAgICAgICAgICAgLy8gICAgICAgZGVsdGE6IDFcbiAgICAvLyAgICAgICAgICAgICAvLyAgIH0pO1xuICAgIC8vICAgICAgICAgICAgIC8vIH0sIDEwMDApO1xuICAgIC8vICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICB9XG4iXX0=