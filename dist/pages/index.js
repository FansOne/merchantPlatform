'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _app = require('./../utils/app.js');

var _app2 = _interopRequireDefault(_app);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _commentStar = require('./../components/commentStar.js');

var _commentStar2 = _interopRequireDefault(_commentStar);

var _moreFormId = require('./../components/moreFormId.js');

var _moreFormId2 = _interopRequireDefault(_moreFormId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      // enablePullDownRefresh:true,
      // backgroundTextStyle:'dark',
    }, _this.components = {
      commentStar: _commentStar2.default,
      moreFormId: _moreFormId2.default
    }, _this.data = {
      token: '',
      page: 0,
      lng: 0,
      lat: 0,
      notButton: false,
      button: false,
      stars: [0, 1, 2, 3, 4],
      normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
      selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
      key: 0,
      imgUrls: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      imagesBtn: [],
      shopInfo: [],
      message: [],
      dataMessage: '上拉加载数据',
      is_close: true,
      shareShow: false,
      haobaoShow: true,
      //遮罩
      maskFlag: true,
      haiBaoImg: 'http://www.qumatou.com.cn/zheng/xcximage/TTHD_indexShare.png',
      share: ''
    }, _this.computed = {}, _this.methods = {
      //跳转搜索
      toSearch: function toSearch() {
        wx.navigateTo({
          url: './search'
        });
      },

      //跳转附近店铺
      moreShop: function moreShop() {
        wx.switchTab({
          url: './around'
        });
      },

      //跳转拼团列表页
      toGroups: function toGroups() {
        wx.navigateTo({
          url: './groups-buying'
        });
      },

      // 跳转领券
      toCoupons: function toCoupons() {
        wx.navigateTo({
          url: './coupons'
        });
      },

      // 打开设置页面
      getSetting: function getSetting(e) {
        wx.getSetting({
          success: function success(res) {
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
              //非初始化进入该页面,且未授权
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则店铺位置功能将无法使用',
                success: function success(res) {
                  if (res.cancel) {} else if (res.confirm) {
                    wx.openSetting({
                      success: function success(data) {
                        if (data.authSetting["scope.userLocation"] == true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 600
                          });
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 600
                          });
                        }
                      }
                    });
                  }
                }
              });
            }
          }
        });
      },

      //跳转各个模块
      toModelDetail: function toModelDetail(c_id, title) {
        var data = {
          'longitude': this.lng,
          'latitude': this.lat,
          'Indust_id': c_id
        };
        if (title == '更多') {
          wx.navigateTo({
            url: './cateList?info=' + JSON.stringify(data)
          });
        } else {
          wx.navigateTo({
            url: './deliciousFood?info=' + JSON.stringify(data) + '&title=' + title
          });
        }
      },

      //触底事件
      onReachBottom: function onReachBottom() {
        var _this2 = this;

        wx.showLoading({
          title: '加载中...'
        });
        this.page = this.page + 1;
        var url = _requestUrl2.default.goodLists;
        var data = {
          longitude: this.lng,
          latitude: this.lat,
          page_Num: this.page,
          p_id: _wepy2.default.$instance.globalData.p_id,
          Indust_id: -1
        };
        _wepy2.default.request({
          url: url,
          method: 'POST',
          data: data
        }).then(function (res) {
          if (res.data.data.list.length == 0) {
            _this2.dataMessage = '暂无更多数据';
          }
          var data = res.data.data.list;
          for (var i = 0; i < data.length; i++) {
            _this2.shopInfo.push(data[i]);
          }
          _this2.$apply();
          if (data.length == 0) {
            wx.showToast({
              title: '已加载全部数据',
              image: '../images/warning.png',
              duration: 1000
            });
            _this2.$apply();
          }
          wx.hideLoading();
        });
      },

      //跳转店铺
      toShop: function toShop(e) {
        var dataset = e.currentTarget.dataset;
        if (dataset.type == 1 || dataset.type == 2 || dataset.type == 5 || dataset.type == 6 || dataset.type == 7) {
          //电商、门店、大学生、贫困户、农户流程
          wx.navigateTo({
            url: './e/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
          });
        } else if (dataset.type == 3 || dataset.type == 4) {
          //外卖、超市
          wx.navigateTo({
            url: './f/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
          });
        }
      },

      //首页轮播图跳转
      goUrl: function goUrl(e) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
      },

      //分享
      shareMoments: function shareMoments() {
        this.shareShow = !this.shareShow;
        this.maskFlag = !this.maskFlag;
      },

      //取消
      shareFriends: function shareFriends() {
        this.shareShow = !this.shareShow;
        this.maskFlag = !this.maskFlag;
      },

      //发朋友圈
      sharequan: function sharequan() {
        this.maskFlag = false;
        this.haobaoShow = false;
        this.shareShow = !this.shareShow;
        this.$apply();
      },

      // 关闭遮罩
      closeHaiBao: function closeHaiBao() {
        this.haobaoShow = !this.haobaoShow, this.maskFlag = true;
      },

      // 保存图片至相册
      saveImg: function saveImg(imgUrl) {
        wx.downloadFile({
          url: imgUrl,
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
                        // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                          // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                        }
                    }
                  });
                }
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
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onShareAppMessage',

    //小程序转发
    value: function onShareAppMessage() {
      return {
        title: '天天好店商户服务平台',
        path: '/pages/index',
        imageUrl: 'http://www.qumatou.com.cn/zheng/xcximage/indexShareCard.jpg',
        success: function success(res) {},
        fail: function fail() {
          wx.showToast({
            title: '转发失败',
            image: '../../images/warning.png',
            duration: 1000
          });
        }
      };
    }
  }, {
    key: 'getLunboAndCate',

    //分类和轮播数据 --------------------
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var url, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _requestUrl2.default.getIndexData;
                data = {
                  p_id: _wepy2.default.$instance.globalData.p_id
                };
                _context.next = 4;
                return _wepy2.default.request({
                  url: url,
                  method: 'POST',
                  data: data
                }).then(function (res) {
                  if (res.data.data.cla.length >= 9) {
                    var _data = { c_id: 666, c_image: '../images/10.png', c_name: '更多' };
                    _this3.imagesBtn = res.data.data.cla.slice(0, 9);
                    _this3.imagesBtn.push(_data);
                    // let data1 = {id:667,c_image:'../images/10.png',c_name:'领券中心'};
                    // this.imagesBtn.splice(0,0,data1);
                  } else {
                    _this3.imagesBtn = res.data.data.cla;
                  }
                  _this3.share = res.data.data.share;
                  _this3.imgUrls = res.data.data.banner;
                  _this3.$apply();
                  // console.log(this.imagesBtn)
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLunboAndCate() {
        return _ref2.apply(this, arguments);
      }

      return getLunboAndCate;
    }()
    //请求店铺列表

  }, {
    key: 'getAddressList',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        var url, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url = _requestUrl2.default.goodLists;
                data = {
                  longitude: this.lng,
                  latitude: this.lat,
                  page_Num: 0,
                  p_id: _wepy2.default.$instance.globalData.p_id,
                  Indust_id: -1
                };
                _context2.next = 4;
                return _wepy2.default.request({
                  url: url,
                  method: 'POST',
                  data: data
                }).then(function (res) {
                  wx.stopPullDownRefresh();
                  _this4.shopInfo = res.data.data.list;
                  // 未知操作------------------------
                  wx.setStorage({
                    key: 'shopInfo',
                    data: res.data.message
                  });
                  // end ----------------------------
                  _this4.$apply();
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAddressList() {
        return _ref3.apply(this, arguments);
      }

      return getAddressList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.getLunboAndCate();
      this.$apply();
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.is_close = 'false';
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var _this5 = this;

      this.page = 0;
      wx.setStorageSync('selectSonCard', '');
      wx.removeStorage({ key: 'shopId' });

      wx.getStorage({
        key: 'userInfoLogin',
        success: function success(res) {
          _this5.getClassify();
        }
      });
      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.userLocation']) {
            _this5.notButton = true;
            _this5.button = false;
            _this5.$apply();
          }
        }
      });
      wx.getLocation({
        type: 'wgs84',
        success: function success(res) {
          _this5.lng = res.longitude;
          _this5.lat = res.latitude;
          if (_this5.lat && _this5.lng) {
            _this5.getAddressList();
          }
          var data = { 'lng': _this5.lng, 'lat': _this5.lat };
          wx.setStorage({
            key: 'latAndLng',
            data: data
          });
          _this5.button = false;
          _this5.notButton = true;
          _this5.$apply();
        },
        fail: function fail(res) {
          _this5.notButton = false;
          _this5.button = true;
          _this5.$apply();
        }
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsImNvbW1lbnRTdGFyIiwibW9yZUZvcm1JZCIsImRhdGEiLCJ0b2tlbiIsInBhZ2UiLCJsbmciLCJsYXQiLCJub3RCdXR0b24iLCJidXR0b24iLCJzdGFycyIsIm5vcm1hbFNyYyIsInNlbGVjdGVkU3JjIiwia2V5IiwiaW1nVXJscyIsImluZGljYXRvckRvdHMiLCJhdXRvcGxheSIsImludGVydmFsIiwiZHVyYXRpb24iLCJpbWFnZXNCdG4iLCJzaG9wSW5mbyIsIm1lc3NhZ2UiLCJkYXRhTWVzc2FnZSIsImlzX2Nsb3NlIiwic2hhcmVTaG93IiwiaGFvYmFvU2hvdyIsIm1hc2tGbGFnIiwiaGFpQmFvSW1nIiwic2hhcmUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJ0b1NlYXJjaCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIm1vcmVTaG9wIiwic3dpdGNoVGFiIiwidG9Hcm91cHMiLCJ0b0NvdXBvbnMiLCJnZXRTZXR0aW5nIiwiZSIsInN1Y2Nlc3MiLCJyZXMiLCJhdXRoU2V0dGluZyIsInVuZGVmaW5lZCIsInNob3dNb2RhbCIsInRpdGxlIiwiY29udGVudCIsImNhbmNlbCIsImNvbmZpcm0iLCJvcGVuU2V0dGluZyIsInNob3dUb2FzdCIsImljb24iLCJ0b01vZGVsRGV0YWlsIiwiY19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJvblJlYWNoQm90dG9tIiwic2hvd0xvYWRpbmciLCJyZXF1c2V0RGF0YSIsImdvb2RMaXN0cyIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwicGFnZV9OdW0iLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJJbmR1c3RfaWQiLCJyZXF1ZXN0IiwibWV0aG9kIiwidGhlbiIsImxpc3QiLCJsZW5ndGgiLCJpIiwicHVzaCIsIiRhcHBseSIsImltYWdlIiwiaGlkZUxvYWRpbmciLCJ0b1Nob3AiLCJkYXRhc2V0IiwiY3VycmVudFRhcmdldCIsInR5cGUiLCJpZCIsImdvVXJsIiwic2hhcmVNb21lbnRzIiwic2hhcmVGcmllbmRzIiwic2hhcmVxdWFuIiwiY2xvc2VIYWlCYW8iLCJzYXZlSW1nIiwiaW1nVXJsIiwiZG93bmxvYWRGaWxlIiwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bSIsImZpbGVQYXRoIiwidGVtcEZpbGVQYXRoIiwiZmFpbCIsImVyciIsImVyck1zZyIsInNldHRpbmdkYXRhIiwicHJldmlld0ltYWdlIiwidXJscyIsImV2ZW50cyIsInBhdGgiLCJpbWFnZVVybCIsImdldEluZGV4RGF0YSIsImNsYSIsImNfaW1hZ2UiLCJjX25hbWUiLCJzbGljZSIsImJhbm5lciIsInN0b3BQdWxsRG93blJlZnJlc2giLCJzZXRTdG9yYWdlIiwib3B0aW9ucyIsImdldEx1bmJvQW5kQ2F0ZSIsInNldFN0b3JhZ2VTeW5jIiwicmVtb3ZlU3RvcmFnZSIsImdldFN0b3JhZ2UiLCJnZXRDbGFzc2lmeSIsImdldExvY2F0aW9uIiwiZ2V0QWRkcmVzc0xpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUDtBQUNBO0FBRk8sSyxRQUlUQyxVLEdBQWE7QUFDWEMsd0NBRFc7QUFFWEM7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxhQUFNLEVBREQ7QUFFTEMsWUFBSyxDQUZBO0FBR0xDLFdBQUksQ0FIQztBQUlMQyxXQUFJLENBSkM7QUFLTEMsaUJBQVUsS0FMTDtBQU1MQyxjQUFPLEtBTkY7QUFPTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBUEY7QUFRTEMsaUJBQVcsbURBUk47QUFTTEMsbUJBQWEsd0RBVFI7QUFVTEMsV0FBSyxDQVZBO0FBV0xDLGVBQVMsRUFYSjtBQVlM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ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknXG4gIGltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWxzL3V0aWwnXG4gIGltcG9ydCBhcHAgZnJvbSAnLi4vdXRpbHMvYXBwJ1xuXG4gIGltcG9ydCByZXF1c2V0RGF0YSBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbiAgXG4gIGltcG9ydCBjb21tZW50U3RhciBmcm9tICcuLi9jb21wb25lbnRzL2NvbW1lbnRTdGFyJ1xuICBpbXBvcnQgbW9yZUZvcm1JZCBmcm9tICcuLi9jb21wb25lbnRzL21vcmVGb3JtSWQnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAvLyBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcbiAgICAgIC8vIGJhY2tncm91bmRUZXh0U3R5bGU6J2RhcmsnLFxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgY29tbWVudFN0YXIsXG4gICAgICBtb3JlRm9ybUlkXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICB0b2tlbjonJyxcbiAgICAgIHBhZ2U6MCxcbiAgICAgIGxuZzowLFxuICAgICAgbGF0OjAsXG4gICAgICBub3RCdXR0b246ZmFsc2UsXG4gICAgICBidXR0b246ZmFsc2UsXG4gICAgICBzdGFyczogWzAsIDEsIDIsIDMsIDRdLFxuICAgICAgbm9ybWFsU3JjOiAnaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9zdGFyLnBuZycsXG4gICAgICBzZWxlY3RlZFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3Rhcldob2xlLnBuZycsXG4gICAgICBrZXk6IDAsXG4gICAgICBpbWdVcmxzOiBbXSwgICAgICAgICBcbiAgICAgIGluZGljYXRvckRvdHM6IGZhbHNlLFxuICAgICAgYXV0b3BsYXk6IHRydWUsXG4gICAgICBpbnRlcnZhbDogNTAwMCxcbiAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgaW1hZ2VzQnRuOltdLFxuICAgICAgc2hvcEluZm86W10sXG4gICAgICBtZXNzYWdlOltdLFxuICAgICAgZGF0YU1lc3NhZ2U6J+S4iuaLieWKoOi9veaVsOaNricsXG4gICAgICBpc19jbG9zZTp0cnVlLFxuICAgICAgc2hhcmVTaG93OmZhbHNlLFxuICAgICAgaGFvYmFvU2hvdzp0cnVlLFxuICAgICAgLy/pga7nvalcblx0ICAgIG1hc2tGbGFnOnRydWUsXG4gICAgICBoYWlCYW9JbWc6J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2UvVFRIRF9pbmRleFNoYXJlLnBuZycsXG4gICAgICBzaGFyZTonJ1xuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG4gICAgLy/lsI/nqIvluo/ovazlj5FcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiAn5aSp5aSp5aW95bqX5ZWG5oi35pyN5Yqh5bmz5Y+wJyxcbiAgICAgICAgcGF0aDogJy9wYWdlcy9pbmRleCcsXG4gICAgICAgIGltYWdlVXJsOiAnaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9pbmRleFNoYXJlQ2FyZC5qcGcnLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge30sXG4gICAgICAgIGZhaWw6ICgpID0+IHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfovazlj5HlpLHotKUnLFxuICAgICAgICAgICAgaW1hZ2U6Jy4uLy4uL2ltYWdlcy93YXJuaW5nLnBuZycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy/ot7PovazmkJzntKJcbiAgICAgIHRvU2VhcmNoKCl7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDonLi9zZWFyY2gnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy/ot7PovazpmYTov5Hlupfpk7pcbiAgICAgIG1vcmVTaG9wKCl7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgdXJsOiAnLi9hcm91bmQnXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8v6Lez6L2s5ou85Zui5YiX6KGo6aG1XG4gICAgICB0b0dyb3Vwcygpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy4vZ3JvdXBzLWJ1eWluZydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDot7PovazpoobliLhcbiAgICAgIHRvQ291cG9ucygpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy4vY291cG9ucydcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDmiZPlvIDorr7nva7pobXpnaJcbiAgICAgIGdldFNldHRpbmcoZSl7XG4gICAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJMb2NhdGlvbiddICE9IHVuZGVmaW5lZCAmJiByZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJMb2NhdGlvbiddICE9IHRydWUpIHsvL+mdnuWIneWni+WMlui/m+WFpeivpemhtemdoizkuJTmnKrmjojmnYNcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aYr+WQpuaOiOadg+W9k+WJjeS9jee9ricsXG4gICAgICAgICAgICAgICAgY29udGVudDogJ+mcgOimgeiOt+WPluaCqOeahOWcsOeQhuS9jee9ru+8jOivt+ehruiupOaOiOadg++8jOWQpuWImeW6l+mTuuS9jee9ruWKn+iDveWwhuaXoOazleS9v+eUqCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcyk9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNhbmNlbCkge30gZWxzZSBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KGRhdGEpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYXV0aFNldHRpbmdbXCJzY29wZS51c2VyTG9jYXRpb25cIl0gPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o6I5p2D5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDYwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o6I5p2D5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDYwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIC8v6Lez6L2s5ZCE5Liq5qih5Z2XXG4gICAgICB0b01vZGVsRGV0YWlsKGNfaWQsdGl0bGUpe1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAnbG9uZ2l0dWRlJzp0aGlzLmxuZyxcbiAgICAgICAgICAnbGF0aXR1ZGUnOnRoaXMubGF0LFxuICAgICAgICAgICdJbmR1c3RfaWQnOmNfaWQsXG4gICAgICAgIH1cbiAgICAgICAgaWYodGl0bGUgPT0gJ+abtOWkmicpe1xuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgdXJsOmAuL2NhdGVMaXN0P2luZm89JHtKU09OLnN0cmluZ2lmeShkYXRhKX1gXG4gICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6YC4vZGVsaWNpb3VzRm9vZD9pbmZvPSR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9JnRpdGxlPSR7dGl0bGV9YFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvL+inpuW6leS6i+S7tlxuICAgICAgb25SZWFjaEJvdHRvbSgpe1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nLFxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnBhZ2UgPSB0aGlzLnBhZ2UgKyAxO1xuICAgICAgICBjb25zdCB1cmwgPSByZXF1c2V0RGF0YS5nb29kTGlzdHNcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICBsb25naXR1ZGU6dGhpcy5sbmcsXG4gICAgICAgICAgbGF0aXR1ZGU6dGhpcy5sYXQsXG4gICAgICAgICAgcGFnZV9OdW06dGhpcy5wYWdlLFxuICAgICAgICAgIHBfaWQ6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgIEluZHVzdF9pZDotMSxcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgaWYocmVzLmRhdGEuZGF0YS5saXN0Lmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMuZGF0YU1lc3NhZ2UgPSAn5pqC5peg5pu05aSa5pWw5o2uJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgZGF0YSA9IHJlcy5kYXRhLmRhdGEubGlzdDtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc2hvcEluZm8ucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICBpZihkYXRhLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5bey5Yqg6L295YWo6YOo5pWw5o2uJyxcbiAgICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZXMvd2FybmluZy5wbmcnLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy/ot7Povazlupfpk7pcbiAgICAgIHRvU2hvcChlKXtcbiAgICAgICAgbGV0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgaWYoZGF0YXNldC50eXBlID09IDEgfHwgZGF0YXNldC50eXBlID09IDIgfHwgZGF0YXNldC50eXBlID09IDUgfHwgZGF0YXNldC50eXBlID09IDYgfHwgZGF0YXNldC50eXBlID09IDcpe1xuICAgICAgICAgIC8v55S15ZWG44CB6Zeo5bqX44CB5aSn5a2m55Sf44CB6LSr5Zuw5oi344CB5Yac5oi35rWB56iLXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6Jy4vZS9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBkYXRhc2V0LmlkICsgJyZzaG9wVHlwZT0nICsgZGF0YXNldC50eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfWVsc2UgaWYoZGF0YXNldC50eXBlID09IDMgfHwgZGF0YXNldC50eXBlID09IDQpe1xuICAgICAgICAgIC8v5aSW5Y2W44CB6LaF5biCXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6Jy4vZi9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBkYXRhc2V0LmlkICsgJyZzaG9wVHlwZT0nICsgZGF0YXNldC50eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8v6aaW6aG16L2u5pKt5Zu+6Lez6L2sXG4gICAgICBnb1VybChlKXtcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgLy/liIbkuqtcbiAgICAgIHNoYXJlTW9tZW50cygpe1xuICAgICAgICB0aGlzLnNoYXJlU2hvdyA9ICF0aGlzLnNoYXJlU2hvd1xuICAgICAgICB0aGlzLm1hc2tGbGFnID0gIXRoaXMubWFza0ZsYWdcbiAgICAgIH0sXG4gICAgICAvL+WPlua2iFxuICAgICAgc2hhcmVGcmllbmRzKCl7XG4gICAgICAgIHRoaXMuc2hhcmVTaG93ID0gIXRoaXMuc2hhcmVTaG93XG4gICAgICAgIHRoaXMubWFza0ZsYWcgPSAhdGhpcy5tYXNrRmxhZ1xuICAgICAgfSxcbiAgICAgIC8v5Y+R5pyL5Y+L5ZyIXG4gICAgICBzaGFyZXF1YW4oKXtcbiAgICAgICAgdGhpcy5tYXNrRmxhZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhb2Jhb1Nob3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGFyZVNob3cgPSAhdGhpcy5zaGFyZVNob3dcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXremBrue9qVxuICAgICAgY2xvc2VIYWlCYW8oKXtcbiAgICAgICAgdGhpcy5oYW9iYW9TaG93ID0gIXRoaXMuaGFvYmFvU2hvdyxcbiAgICAgICAgdGhpcy5tYXNrRmxhZyA9IHRydWU7XG4gICAgICB9LFxuICAgICAgLy8g5L+d5a2Y5Zu+54mH6Iez55u45YaMXG4gICAgICBzYXZlSW1nKGltZ1VybCl7XG4gICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOiBpbWdVcmwsXG4gICAgICAgICAgc3VjY2VzczogKHJlcyk9PntcbiAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcbiAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZhaWw6IChlcnIpPT57XG4gICAgICAgICAgICAgICAgaWYgKGVyci5lcnJNc2cgPT09IFwic2F2ZUltYWdlVG9QaG90b3NBbGJ1bTpmYWlsIGF1dGggZGVuaWVkXCIpIHtcbiAgICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhzZXR0aW5nZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nZGF0YS5hdXRoU2V0dGluZ1snc2NvcGUud3JpdGVQaG90b3NBbGJ1bSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn6I635Y+W5p2D6ZmQ5oiQ5Yqf77yM57uZ5Ye65YaN5qyh54K55Ye75Zu+54mH5L+d5a2Y5Yiw55u45YaM55qE5o+Q56S644CCJylcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+iOt+WPluadg+mZkOWksei0pe+8jOe7meWHuuS4jee7meadg+mZkOWwseaXoOazleato+W4uOS9v+eUqOeahOaPkOekuicpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgcHJldmlld0ltYWdlKGhhaUJhb0ltZyl7XG4gICAgICAgIHd4LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgdXJsczogW2Ake2hhaUJhb0ltZ31gXSAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIC8v5YiG57G75ZKM6L2u5pKt5pWw5o2uIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgYXN5bmMgZ2V0THVuYm9BbmRDYXRlKCl7XG4gICAgICBjb25zdCB1cmwgPSByZXF1c2V0RGF0YS5nZXRJbmRleERhdGFcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZFxuICAgICAgfVxuICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgaWYocmVzLmRhdGEuZGF0YS5jbGEubGVuZ3RoID49IDkpe1xuICAgICAgICAgIGxldCBkYXRhID0ge2NfaWQ6NjY2LGNfaW1hZ2U6Jy4uL2ltYWdlcy8xMC5wbmcnLGNfbmFtZTon5pu05aSaJ307XG4gICAgICAgICAgdGhpcy5pbWFnZXNCdG4gPSByZXMuZGF0YS5kYXRhLmNsYS5zbGljZSgwLDkpXG4gICAgICAgICAgdGhpcy5pbWFnZXNCdG4ucHVzaChkYXRhKVxuICAgICAgICAgIC8vIGxldCBkYXRhMSA9IHtpZDo2NjcsY19pbWFnZTonLi4vaW1hZ2VzLzEwLnBuZycsY19uYW1lOifpoobliLjkuK3lv4MnfTtcbiAgICAgICAgICAvLyB0aGlzLmltYWdlc0J0bi5zcGxpY2UoMCwwLGRhdGExKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5pbWFnZXNCdG4gPSByZXMuZGF0YS5kYXRhLmNsYTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlID0gcmVzLmRhdGEuZGF0YS5zaGFyZVxuICAgICAgICB0aGlzLmltZ1VybHMgPSByZXMuZGF0YS5kYXRhLmJhbm5lcjtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pbWFnZXNCdG4pXG4gICAgICB9KVxuICAgIH1cbiAgICAvL+ivt+axguW6l+mTuuWIl+ihqFxuICAgIGFzeW5jIGdldEFkZHJlc3NMaXN0KCl7XG4gICAgICBjb25zdCB1cmwgPSByZXF1c2V0RGF0YS5nb29kTGlzdHNcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGxvbmdpdHVkZTp0aGlzLmxuZyxcbiAgICAgICAgbGF0aXR1ZGU6dGhpcy5sYXQsXG4gICAgICAgIHBhZ2VfTnVtOjAsXG4gICAgICAgIHBfaWQ6d2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICBJbmR1c3RfaWQ6LTEsXG4gICAgICB9XG4gICAgICBhd2FpdCB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICAgIHRoaXMuc2hvcEluZm8gPSByZXMuZGF0YS5kYXRhLmxpc3Q7XG4gICAgICAgIC8vIOacquefpeaTjeS9nC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICBrZXk6J3Nob3BJbmZvJyxcbiAgICAgICAgICBkYXRhOnJlcy5kYXRhLm1lc3NhZ2VcbiAgICAgICAgfSlcbiAgICAgICAgLy8gZW5kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIGV2ZW50cyA9IHt9XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZ2V0THVuYm9BbmRDYXRlKClcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG9uSGlkZSgpe1xuICAgICAgdGhpcy5pc19jbG9zZSA9ICdmYWxzZSc7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnc2VsZWN0U29uQ2FyZCcsICcnKTtcbiAgICAgIHd4LnJlbW92ZVN0b3JhZ2Uoe2tleTogJ3Nob3BJZCd9KTtcbiAgICAgIFxuICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTondXNlckluZm9Mb2dpbicsXG4gICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgdGhpcy5nZXRDbGFzc2lmeSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczoocmVzKT0+e1xuICAgICAgICAgIGlmKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckxvY2F0aW9uJ10pe1xuICAgICAgICAgICAgdGhpcy5ub3RCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5idXR0b24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICAgIHR5cGU6ICd3Z3M4NCcsXG4gICAgICAgIHN1Y2Nlc3M6KHJlcz0+e1xuICAgICAgICAgIHRoaXMubG5nID0gcmVzLmxvbmdpdHVkZTtcbiAgICAgICAgICB0aGlzLmxhdCA9IHJlcy5sYXRpdHVkZTtcbiAgICAgICAgICBpZih0aGlzLmxhdCAmJiB0aGlzLmxuZyl7XG4gICAgICAgICAgICB0aGlzLmdldEFkZHJlc3NMaXN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBkYXRhID0geydsbmcnOiB0aGlzLmxuZywnbGF0Jzp0aGlzLmxhdH07XG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICBrZXk6J2xhdEFuZExuZycsXG4gICAgICAgICAgICBkYXRhOmRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMuYnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5ub3RCdXR0b24gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pLFxuICAgICAgICBmYWlsOihyZXM9PntcbiAgICAgICAgICB0aGlzLm5vdEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuYnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==