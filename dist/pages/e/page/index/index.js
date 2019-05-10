'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../../api/requestData.js');

var _moreFormId = require('./../../../../components/moreFormId.js');

var _moreFormId2 = _interopRequireDefault(_moreFormId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commentContent = function (_wepy$page) {
    _inherits(commentContent, _wepy$page);

    function commentContent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, commentContent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = commentContent.__proto__ || Object.getPrototypeOf(commentContent)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '加载中...',
            backgroundColor: "#e5e5e5"
        }, _this.components = {
            moreFormId: _moreFormId2.default
        }, _this.data = {
            token: '',
            dianXin: 0,
            shopId: 0,
            shopType: 0,
            imgUrls: [],
            allData: {},
            baidu_local: 'http://www.qumatou.com.cn/zheng/xcximage/位置.png',
            store_phone: 'http://www.qumatou.com.cn/zheng/xcximage/电话.png',
            ballBottom: 40,
            ballRight: 15,
            screenHeight: 0,
            screenWidth: 0,
            //保存所有需预览图片链接
            arrUrlGroup: [],
            nowTime: '',
            shoppStatus: true,
            topCover: false,
            //店铺商品
            indexGoods: [],
            longBanner: [],
            merchantFunction: [], //商家开通功能
            shareShow: false,
            haobaoShow: true,
            //遮罩
            maskFlag: true,
            haiBaoImg: '',
            shareStatus: false,
            shareInfo: null,
            threeIconItemWidth: ''
        }, _this.methods = {
            // 根据id跳转商户开通功能页面
            merchantFunPageJump: function merchantFunPageJump(id) {
                if (id == 1) {
                    //买单
                    wx.navigateTo({
                        url: '../../../inputValue?title=' + this.allData.Merchant_baseInfo.mName + '&m_id=' + this.shopId
                    });
                } else if (id == 2 || id == 5) {
                    //进入店铺
                    _wepy2.default.$instance.globalData.localSpecialty = '';
                    wx.navigateTo({
                        url: '../homePage?id=' + this.shopId
                    });
                } else if (id == 3) {
                    //本地特产
                    // 请求传localSpecialty=1
                    _wepy2.default.$instance.globalData.localSpecialty = 1;
                    wx.navigateTo({
                        url: '../homePage?id=' + this.shopId + '&localSpecialty=1'
                    });
                } else if (id == 4) {
                    //外卖
                    var indust_id = JSON.stringify({ Indust_id: -4 });
                    wx.navigateTo({
                        url: '../../../deliciousFood?info=' + indust_id + '&title=\u672C\u5E97\u63A8\u8350\u5916\u5356&m_id=' + this.shopId
                    });
                } else if (id == 12) {
                    //积分商城
                    wx.navigateTo({
                        url: '../../../integralMall?m_id=' + this.shopId
                    });
                }
            },

            //会员卡
            memberCard: function memberCard() {
                wx.navigateTo({
                    url: '../../../memberCardSingleShop?title=' + this.allData.title + '&cover_url=' + this.allData.cover_url + "&shopId=" + this.allData.id
                });
            },

            //购物车
            // ShoppingCar(){
            //     wx.navigateTo({
            //         url: '../shoppingCard?shopId=' + this.shopId
            //     })
            // },
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
                    type: this.shopType,
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
                        // console.log(res)
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
            goLocal: function goLocal() {
                wx.openLocation({
                    latitude: Number(this.allData.Merchant_baseInfo.latitude),
                    longitude: Number(this.allData.Merchant_baseInfo.longitude),
                    name: this.allData.Merchant_baseInfo.address
                });
            },
            storeCall: function storeCall() {
                wx.makePhoneCall({
                    phoneNumber: this.allData.Merchant_baseInfo.conPhone
                });
            },

            // 积分商城
            // goIntegralMall(){
            //     wx.getStorage({
            //     key: 'access_token',
            //     success: res => {
            //         wx.navigateTo({
            //             url: '../../../../packageMembershipCard/IntegralMall/index?shopId=' + this.allData.id
            //         });
            //     },
            //     fail:res=>{
            //         let url = '../../../login';
            //         app.is_skip(url);
            //     }
            //     });
            // },
            // 积分抽奖
            // luckDrawIndex(){
            //     wx.getStorage({
            //     key: 'access_token',
            //     success: res => {
            //         wx.navigateTo({
            //             url: '../../../../packageMembershipCard/integralManagement/luckDrawIndex?shopId=' + this.allData.id
            //         });
            //     },
            //     fail:res=>{
            //         let url = '../../../login';
            //         app.is_skip(url);
            //     }
            //     });
            // }
            previewImage: function previewImage(haiBaoImg) {
                wx.previewImage({
                    urls: ['' + haiBaoImg] // 需要预览的图片http链接列表
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(commentContent, [{
        key: 'onShareAppMessage',

        //设置转发
        value: function onShareAppMessage(res) {
            this.shareShow = false;
            this.maskFlag = true;
            var shareTitle = '';
            if (this.shopType == 5) {
                //5-大学生 6-贫困户 7-农户
                shareTitle = '(大学创业店)';
            } else if (this.shopType == 6) {
                shareTitle = '(贫困户精准扶贫店)';
            } else if (this.shopType == 7) {
                shareTitle = '(农户自产自销店)';
            }
            // shareInfo
            return {
                title: this.shareInfo.text ? this.shareInfo.text : '' + this.allData.Merchant_baseInfo.mName + shareTitle,
                path: '/pages/e/page/index/index?id=' + this.shopId + '&shopType=' + this.shopType,
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
        //收藏店铺 ------------------接口待提供
        // async collectShop(){
        //     const url = api.apiMall + 'api/shop_collect';
        //     const data = {
        //         m_id:this.shopId
        //     }
        //     wepy.request({
        //         url: url,
        //         method: 'POST',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        //             'Authorization':'Bearer ' + this.token
        //         },
        //         data: data,
        //     }).then(res=>{
        //         if(res.data.status == 200){
        //             wx.showToast({
        //                 title:'收藏成功',
        //                 icon:'success'
        //             })
        //             //存数组
        //             wx.getStorage({
        //                 key:'collectShopList',
        //                 success:res=>{
        //                     let collectShopList = res.data;
        //                     collectShopList.push(this.shopId);
        //                     wx.setStorage({
        //                         key:'collectShopList',
        //                         data:collectShopList
        //                     })
        //                 },
        //                 fail:res=>{
        //                     let collectShopList = [];
        //                     collectShopList.push(this.shopId);
        //                     wx.setStorage({
        //                         key:'collectShopList',
        //                         data:collectShopList
        //                     })
        //                 }
        //             })
        //         }
        //     })
        // }
        //取消收藏 ------------------接口待提供
        // async cancleCollectShop(){
        //     const url = api.apiMall + 'api/shop_collect/' + this.shopId;
        //     wepy.request({
        //         url: url,
        //         method: 'GET',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Content-type':'application/x-www-form-urlencoded',
        //             'Authorization':'Bearer ' + this.token
        //         },
        //     }).then(res=>{
        //         wx.showToast({
        //             title:'取消收藏',
        //             icon:'success'
        //         })
        //         //删除数组中的盖商铺
        //         wx.getStorage({
        //             key:'collectShopList',
        //             success:res=>{
        //                 let collectShopList = res.data;
        //                 if(collectShopList){
        //                     collectShopList.forEach((item,index)=>{
        //                         if(this.shopId == item){
        //                             collectShopList.splice(index,1)
        //                         }
        //                     })
        //                     wx.setStorage({
        //                         key:'collectShopList',
        //                         data:collectShopList
        //                     })
        //                 }
        //             }
        //         })
        //     })
        // }

    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var _this4 = this;

            this.shopId = options.id;
            this.getMerchantShareInfo(options.id);
            if (options.shopType == 5 || options.shopType == 6 || options.shopType == 7) {
                this.shopType = options.shopType;
            }
            if (this.shopId) {
                // 获取商户开通功能列表
                this.merchantF();
                //读取缓存，判断该店是否被收藏过
                wx.getStorage({
                    key: 'collectShopList', //店铺收藏列表                     
                    success: function success(res) {
                        var collectShopList = res.data;
                        collectShopList.forEach(function (item, index) {
                            if (_this4.shopId == item) {
                                _this4.dianXin = 1;
                            }
                        });
                    }
                });
            }
            _wepy2.default.$instance.globalData.shopId = options.id;
            wx.showNavigationBarLoading();
            try {
                this.getData();
            } catch (err) {}
            //获取屏幕宽高
            wx.getSystemInfo({
                success: function success(res) {
                    _this4.screenHeight = res.windowHeight;
                    _this4.screenWidth = res.windowWidth;
                    _this4.$apply();
                }
            });
            //获取token
            this.token = wx.getStorageSync("token");
            this.$apply();
        }

        //获取商户转发好友信息内容

    }, {
        key: 'getMerchantShareInfo',
        value: function getMerchantShareInfo(m_id) {
            var _this5 = this;

            var url = _requestUrl2.default.getMerchantShareInfo;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: m_id
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                _this5.shareInfo = res.data.data;
                _this5.$apply();
            });
        }
        // 获取店铺数据

    }, {
        key: 'getData',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this6 = this;

                var url, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
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
                                    console.log(res.data.data.Merchant_baseInfo.Mabstractpath);
                                    _this6.longBanner = res.data.data.Merchant_baseInfo.Mabstractpath.split(';').slice(0, -1);
                                    _this6.topCover = true;
                                    _this6.imgUrls = res.data.data.Merchant_Banner;
                                    _this6.allData = res.data.data;
                                    if (res.data.data.Merchant_baseInfo.open == 0) {
                                        //shoppStatus == 0 营业
                                        _this6.shoppStatus = true;
                                    } else {
                                        _this6.shoppStatus = false;
                                    }
                                    //将起送费保存到storage中
                                    wx.setStorage({
                                        key: 'sendPrice',
                                        data: res.data.data.Merchant_baseInfo.sendPrice
                                    });
                                    //将配送费保存到storage中
                                    wx.setStorage({
                                        key: 'normalsend',
                                        data: res.data.data.Merchant_baseInfo.normalsend
                                    });
                                    _this6.$apply();
                                }).catch(function (res) {
                                    wx.showToast({ title: '网络异常，请重试', icon: 'none' });
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getData() {
                return _ref2.apply(this, arguments);
            }

            return getData;
        }()
        // 获取商户开通功能列表

    }, {
        key: 'merchantF',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this7 = this;

                var url, data, merchantFunction;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                url = _requestUrl2.default.merchantFunction;
                                data = { m_id: this.shopId };
                                merchantFunction = [];

                                (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                                    res.data.data.forEach(function (element) {
                                        if (element.id == 5) {
                                            _this7.shareStatus = true;
                                        } else {
                                            merchantFunction.push(element);
                                        }
                                    });
                                    _this7.merchantFunction = merchantFunction;
                                    _this7.$apply();
                                    if (_this7.merchantFunction.length >= 4) {
                                        _this7.threeIconItemWidth = 25;
                                    } else {
                                        _this7.threeIconItemWidth = 100 / _this7.merchantFunction.length;
                                    }
                                    _this7.$apply();
                                });

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function merchantF() {
                return _ref3.apply(this, arguments);
            }

            return merchantF;
        }()
    }, {
        key: 'onShow',
        value: function onShow() {
            //获取token
            this.token = wx.getStorageSync("token");
        }
    }]);

    return commentContent;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(commentContent , 'pages/e/page/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbW1lbnRDb250ZW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRDb2xvciIsImNvbXBvbmVudHMiLCJtb3JlRm9ybUlkIiwiZGF0YSIsInRva2VuIiwiZGlhblhpbiIsInNob3BJZCIsInNob3BUeXBlIiwiaW1nVXJscyIsImFsbERhdGEiLCJiYWlkdV9sb2NhbCIsInN0b3JlX3Bob25lIiwiYmFsbEJvdHRvbSIsImJhbGxSaWdodCIsInNjcmVlbkhlaWdodCIsInNjcmVlbldpZHRoIiwiYXJyVXJsR3JvdXAiLCJub3dUaW1lIiwic2hvcHBTdGF0dXMiLCJ0b3BDb3ZlciIsImluZGV4R29vZHMiLCJsb25nQmFubmVyIiwibWVyY2hhbnRGdW5jdGlvbiIsInNoYXJlU2hvdyIsImhhb2Jhb1Nob3ciLCJtYXNrRmxhZyIsImhhaUJhb0ltZyIsInNoYXJlU3RhdHVzIiwic2hhcmVJbmZvIiwidGhyZWVJY29uSXRlbVdpZHRoIiwibWV0aG9kcyIsIm1lcmNoYW50RnVuUGFnZUp1bXAiLCJpZCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIk1lcmNoYW50X2Jhc2VJbmZvIiwibU5hbWUiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsImxvY2FsU3BlY2lhbHR5IiwiaW5kdXN0X2lkIiwiSlNPTiIsInN0cmluZ2lmeSIsIkluZHVzdF9pZCIsIm1lbWJlckNhcmQiLCJ0aXRsZSIsImNvdmVyX3VybCIsInNoYXJlRnJpZW5kcyIsInNoYXJlcXVhbiIsInNob3dMb2FkaW5nIiwicF9pZCIsIm1faWQiLCJ0eXBlIiwicG9ubHlpZCIsInJlcXVlc3RVcmwiLCJnZXRNZXJjaGFudENvZGUiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJVUkwiLCIkYXBwbHkiLCJjbG9zZVNwZWMiLCJib3R0b21TaG93IiwiY2xvc2VIYWlCYW8iLCJzYXZlSW1nIiwiaW1nVXJsIiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiLCJlcnIiLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwiY29uZmlybSIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJnb0xvY2FsIiwib3BlbkxvY2F0aW9uIiwibGF0aXR1ZGUiLCJOdW1iZXIiLCJsb25naXR1ZGUiLCJuYW1lIiwiYWRkcmVzcyIsInN0b3JlQ2FsbCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsImNvblBob25lIiwicHJldmlld0ltYWdlIiwidXJscyIsInNoYXJlVGl0bGUiLCJ0ZXh0IiwicGF0aCIsImltYWdlVXJsIiwiaW1hZ2UiLCJvcHRpb25zIiwiZ2V0TWVyY2hhbnRTaGFyZUluZm8iLCJtZXJjaGFudEYiLCJnZXRTdG9yYWdlIiwia2V5IiwiY29sbGVjdFNob3BMaXN0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsImdldERhdGEiLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93SGVpZ2h0Iiwid2luZG93V2lkdGgiLCJnZXRTdG9yYWdlU3luYyIsIk1lcmNoYW50SW5mbyIsInJlcXVlc3QiLCJtZXRob2QiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJjb25zb2xlIiwibG9nIiwiTWFic3RyYWN0cGF0aCIsInNwbGl0Iiwic2xpY2UiLCJNZXJjaGFudF9CYW5uZXIiLCJvcGVuIiwic2V0U3RvcmFnZSIsInNlbmRQcmljZSIsIm5vcm1hbHNlbmQiLCJjYXRjaCIsImVsZW1lbnQiLCJwdXNoIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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akIsRUFBbUI7QUFDZixtREFBS0wsV0FBTCxHQUFtQixJQUFuQjtBQUNILHlDQUZELE1BRUs7QUFDREwsNkRBQWlCb0gsSUFBakIsQ0FBc0JELE9BQXRCO0FBQ0g7QUFDSixxQ0FORDtBQU9BLDJDQUFLbkgsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLDJDQUFLd0MsTUFBTDtBQUNBLHdDQUFHLE9BQUt4QyxnQkFBTCxDQUFzQnFILE1BQXRCLElBQThCLENBQWpDLEVBQW1DO0FBQy9CLCtDQUFLOUcsa0JBQUwsR0FBMEIsRUFBMUI7QUFDSCxxQ0FGRCxNQUVLO0FBQ0QsK0NBQUtBLGtCQUFMLEdBQTBCLE1BQUksT0FBS1AsZ0JBQUwsQ0FBc0JxSCxNQUFwRDtBQUNIO0FBQ0QsMkNBQUs3RSxNQUFMO0FBQ0gsaUNBaEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBa0JJO0FBQ0o7QUFDQSxpQkFBSzFELEtBQUwsR0FBYTZCLEdBQUd1RixjQUFILENBQWtCLE9BQWxCLENBQWI7QUFDSDs7OztFQXJieUNsRixlQUFLc0csSTs7a0JBQTVCL0ksYyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdFVybCdcbiAgaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvcmVxdWVzdERhdGEnXG5cbiAgaW1wb3J0IG1vcmVGb3JtSWQgZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9tb3JlRm9ybUlkJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBjb21tZW50Q29udGVudCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yqg6L295LitLi4uJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNlNWU1ZTVcIlxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgICBtb3JlRm9ybUlkXG4gICAgfTtcbiAgXHRkYXRhID0ge1xuICAgICAgICB0b2tlbjonJyxcbiAgICAgICAgZGlhblhpbjowLFxuICAgICAgICBzaG9wSWQ6MCxcbiAgICAgICAgc2hvcFR5cGU6MCxcbiAgICAgICAgaW1nVXJsczpbXSxcbiAgICAgICAgYWxsRGF0YTp7fSxcbiAgICAgICAgYmFpZHVfbG9jYWw6ICdodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL+S9jee9ri5wbmcnLFxuICAgICAgICBzdG9yZV9waG9uZTogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uv55S16K+dLnBuZycsXG4gICAgICAgIGJhbGxCb3R0b206IDQwLFxuXHQgICAgYmFsbFJpZ2h0OiAxNSxcbiAgICAgICAgc2NyZWVuSGVpZ2h0OiAwLFxuICAgICAgICBzY3JlZW5XaWR0aDogMCxcbiAgICAgICAgLy/kv53lrZjmiYDmnInpnIDpooTop4jlm77niYfpk77mjqVcbiAgICAgICAgYXJyVXJsR3JvdXA6W10sXG4gICAgICAgIG5vd1RpbWU6JycsXG4gICAgICAgIHNob3BwU3RhdHVzOnRydWUsXG4gICAgICAgIHRvcENvdmVyOmZhbHNlLFxuICAgICAgICAvL+W6l+mTuuWVhuWTgVxuICAgICAgICBpbmRleEdvb2RzOltdLFxuICAgICAgICBsb25nQmFubmVyOltdLFxuICAgICAgICBtZXJjaGFudEZ1bmN0aW9uOltdLCAgLy/llYblrrblvIDpgJrlip/og71cbiAgICAgICAgc2hhcmVTaG93OmZhbHNlLFxuICAgICAgICBoYW9iYW9TaG93OnRydWUsXG4gICAgICAgIC8v6YGu572pXG4gICAgICAgIG1hc2tGbGFnOnRydWUsXG4gICAgICAgIGhhaUJhb0ltZzonJyxcbiAgICAgICAgc2hhcmVTdGF0dXM6ZmFsc2UsXG4gICAgICAgIHNoYXJlSW5mbzpudWxsLFxuICAgICAgICB0aHJlZUljb25JdGVtV2lkdGg6JydcbiAgXHR9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy8g5qC55o2uaWTot7PovazllYbmiLflvIDpgJrlip/og73pobXpnaJcbiAgICAgICAgbWVyY2hhbnRGdW5QYWdlSnVtcChpZCl7XG4gICAgICAgICAgICBpZihpZCA9PSAxKXsgIC8v5Lmw5Y2VXG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYC4uLy4uLy4uL2lucHV0VmFsdWU/dGl0bGU9JHt0aGlzLmFsbERhdGEuTWVyY2hhbnRfYmFzZUluZm8ubU5hbWV9Jm1faWQ9JHt0aGlzLnNob3BJZH1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZSBpZihpZCA9PSAyIHx8IGlkID09IDUpeyAvL+i/m+WFpeW6l+mTulxuICAgICAgICAgICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubG9jYWxTcGVjaWFsdHkgPSAnJ1xuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6ICcuLi9ob21lUGFnZT9pZD0nK3RoaXMuc2hvcElkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2UgaWYoaWQgPT0gMyl7ICAvL+acrOWcsOeJueS6p1xuICAgICAgICAgICAgICAgIC8vIOivt+axguS8oGxvY2FsU3BlY2lhbHR5PTFcbiAgICAgICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLmxvY2FsU3BlY2lhbHR5ID0gMVxuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IGAuLi9ob21lUGFnZT9pZD0ke3RoaXMuc2hvcElkfSZsb2NhbFNwZWNpYWx0eT0xYFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2UgaWYoaWQgPT0gNCl7IC8v5aSW5Y2WXG4gICAgICAgICAgICAgICAgbGV0IGluZHVzdF9pZCA9IEpTT04uc3RyaW5naWZ5KHsgSW5kdXN0X2lkOiAtNCB9KTtcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi4vLi4vLi4vZGVsaWNpb3VzRm9vZD9pbmZvPSR7aW5kdXN0X2lkfSZ0aXRsZT3mnKzlupfmjqjojZDlpJbljZYmbV9pZD0ke3RoaXMuc2hvcElkfWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNlIGlmKGlkID09IDEyKXsgLy/np6/liIbllYbln45cbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgLi4vLi4vLi4vaW50ZWdyYWxNYWxsP21faWQ9JHt0aGlzLnNob3BJZH1gXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8v5Lya5ZGY5Y2hXG4gICAgICAgIG1lbWJlckNhcmQoKXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogJy4uLy4uLy4uL21lbWJlckNhcmRTaW5nbGVTaG9wP3RpdGxlPScgKyB0aGlzLmFsbERhdGEudGl0bGUgKyAnJmNvdmVyX3VybD0nICsgdGhpcy5hbGxEYXRhLmNvdmVyX3VybCArIFwiJnNob3BJZD1cIiArIHRoaXMuYWxsRGF0YS5pZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgLy/otK3nianovaZcbiAgICAgICAgLy8gU2hvcHBpbmdDYXIoKXtcbiAgICAgICAgLy8gICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAvLyAgICAgICAgIHVybDogJy4uL3Nob3BwaW5nQ2FyZD9zaG9wSWQ9JyArIHRoaXMuc2hvcElkXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9LFxuICAgICAgICBzaGFyZUZyaWVuZHMoKXtcbiAgICAgICAgICAgIHRoaXMuc2hhcmVTaG93ID0gIXRoaXMuc2hhcmVTaG93XG4gICAgICAgICAgICB0aGlzLm1hc2tGbGFnID0gIXRoaXMubWFza0ZsYWdcbiAgICAgICAgfSxcbiAgICAgICAgLy/lj5HmnIvlj4vlnIhcbiAgICAgICAgc2hhcmVxdWFuKCl7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICfmtbfmiqXnlJ/miJDkuK0uLi4nfSk7XG4gICAgICAgICAgICB0aGlzLm1hc2tGbGFnID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuaGFvYmFvU2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gIOivt+axguWbvueJh+mTvuaOpVxuICAgICAgICAgICAgbGV0IGRhdGEgPXtcbiAgICAgICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgICAgIG1faWQgOiB0aGlzLnNob3BJZCxcbiAgICAgICAgICAgICAgICB0eXBlIDogdGhpcy5zaG9wVHlwZSxcbiAgICAgICAgICAgICAgICBwb25seWlkIDogJydcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXF1ZXN0RGF0YShyZXF1ZXN0VXJsLmdldE1lcmNoYW50Q29kZSwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFpQmFvSW1nID0gcmVzLmRhdGEuZGF0YS5VUkxcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZVNwZWMgKCl7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbVNob3cgPSAhdGhpcy5ib3R0b21TaG93LFxuICAgICAgICAgICAgdGhpcy5tYXNrRmxhZyA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlSGFpQmFvKCl7XG4gICAgICAgICAgICB0aGlzLmhhb2Jhb1Nob3cgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9LFxuICAgICAgICAvLyDkv53lrZjlm77niYfoh7Pnm7jlhoxcbiAgICAgICAgc2F2ZUltZyhpbWdVcmwpe1xuICAgICAgICAgICAgd3guZG93bmxvYWRGaWxlKHtcbiAgICAgICAgICAgICAgICB1cmw6IGltZ1VybCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIHd4LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlU2hvdyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW9iYW9TaG93ID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFza0ZsYWcgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6IChlcnIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmjojmnYPmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5oKo5bey5ouS57ud6K6/6Zeu55u45YaM5o6I5p2D77yM5aaC6ZyA5bCG5Zu+54mH5L+d5a2Y6Iez55u45YaM6K+354K55Ye74oCY56Gu5a6a4oCZ5Lul6I635Y+W55So5oi35o6I5p2D6K6+572uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbENvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzNDQzUxRicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29uZmlybSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gub3BlblNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+aOiOadg+aIkOWKn++8jOivt+mHjeaWsOS/neWtmCcsaWNvbjogJ25vbmUnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBnb0xvY2FsKCkge1xuICAgICAgICAgICAgd3gub3BlbkxvY2F0aW9uKHtcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogTnVtYmVyKHRoaXMuYWxsRGF0YS5NZXJjaGFudF9iYXNlSW5mby5sYXRpdHVkZSksXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBOdW1iZXIodGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLmxvbmdpdHVkZSksXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLmFkZHJlc3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHN0b3JlQ2FsbCgpIHtcbiAgICAgICAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiB0aGlzLmFsbERhdGEuTWVyY2hhbnRfYmFzZUluZm8uY29uUGhvbmUgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICAvLyDnp6/liIbllYbln45cbiAgICAgICAgLy8gZ29JbnRlZ3JhbE1hbGwoKXtcbiAgICAgICAgLy8gICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAvLyAgICAga2V5OiAnYWNjZXNzX3Rva2VuJyxcbiAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIC8vICAgICAgICAgICAgIHVybDogJy4uLy4uLy4uLy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9JbnRlZ3JhbE1hbGwvaW5kZXg/c2hvcElkPScgKyB0aGlzLmFsbERhdGEuaWRcbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICBmYWlsOnJlcz0+e1xuICAgICAgICAvLyAgICAgICAgIGxldCB1cmwgPSAnLi4vLi4vLi4vbG9naW4nO1xuICAgICAgICAvLyAgICAgICAgIGFwcC5pc19za2lwKHVybCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8g56ev5YiG5oq95aWWXG4gICAgICAgIC8vIGx1Y2tEcmF3SW5kZXgoKXtcbiAgICAgICAgLy8gICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAvLyAgICAga2V5OiAnYWNjZXNzX3Rva2VuJyxcbiAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIC8vICAgICAgICAgICAgIHVybDogJy4uLy4uLy4uLy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9pbnRlZ3JhbE1hbmFnZW1lbnQvbHVja0RyYXdJbmRleD9zaG9wSWQ9JyArIHRoaXMuYWxsRGF0YS5pZFxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIGZhaWw6cmVzPT57XG4gICAgICAgIC8vICAgICAgICAgbGV0IHVybCA9ICcuLi8uLi8uLi9sb2dpbic7XG4gICAgICAgIC8vICAgICAgICAgYXBwLmlzX3NraXAodXJsKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgICAgIHByZXZpZXdJbWFnZShoYWlCYW9JbWcpe1xuICAgICAgICAgICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgIHVybHM6IFtgJHtoYWlCYW9JbWd9YF0gLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+iuvue9rui9rOWPkVxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKHJlcyl7XG4gICAgICAgIHRoaXMuc2hhcmVTaG93ID0gZmFsc2VcbiAgICAgICAgdGhpcy5tYXNrRmxhZyA9IHRydWVcbiAgICAgICAgbGV0IHNoYXJlVGl0bGUgPSAnJztcbiAgICAgICAgaWYodGhpcy5zaG9wVHlwZSA9PSA1KXsgICAgIC8vNS3lpKflrabnlJ8gNi3otKvlm7DmiLcgNy3lhpzmiLdcbiAgICAgICAgICAgIHNoYXJlVGl0bGUgPSAnKOWkp+WtpuWIm+S4muW6lyknXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuc2hvcFR5cGUgPT0gNil7XG4gICAgICAgICAgICBzaGFyZVRpdGxlID0gJyjotKvlm7DmiLfnsr7lh4bmibbotKvlupcpJ1xuICAgICAgICB9ZWxzZSBpZih0aGlzLnNob3BUeXBlID09IDcpe1xuICAgICAgICAgICAgc2hhcmVUaXRsZSA9ICco5Yac5oi36Ieq5Lqn6Ieq6ZSA5bqXKSdcbiAgICAgICAgfVxuICAgICAgICAvLyBzaGFyZUluZm9cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlSW5mby50ZXh0P3RoaXMuc2hhcmVJbmZvLnRleHQ6YCR7dGhpcy5hbGxEYXRhLk1lcmNoYW50X2Jhc2VJbmZvLm1OYW1lfSR7c2hhcmVUaXRsZX1gLFxuICAgICAgICAgICAgcGF0aDogYC9wYWdlcy9lL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JHt0aGlzLnNob3BJZH0mc2hvcFR5cGU9JHt0aGlzLnNob3BUeXBlfWAsXG4gICAgICAgICAgICBpbWFnZVVybDogdGhpcy5zaGFyZUluZm8uaW1hZ2U/dGhpcy5zaGFyZUluZm8uaW1hZ2U6JycsXG4gICAgICAgICAgICBzdWNjZXNzOihyZXM9PntcbiAgICAgICAgICAgICAgICBpZihyZXMpe1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+i9rOWPkeaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZhaWw6KHJlcz0+e1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6L2s5Y+R5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6Jy4uLy4uL2ltYWdlcy93YXJuaW5nLnBuZycsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/mlLbol4/lupfpk7ogLS0tLS0tLS0tLS0tLS0tLS0t5o6l5Y+j5b6F5o+Q5L6bXG4gICAgLy8gYXN5bmMgY29sbGVjdFNob3AoKXtcbiAgICAvLyAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3BfY29sbGVjdCc7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgLy8gICAgICAgICBtX2lkOnRoaXMuc2hvcElkXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogdXJsLFxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgLy8gICAgICAgICBoZWFkZXI6e1xuICAgIC8vICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgIC8vICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBkYXRhOiBkYXRhLFxuICAgIC8vICAgICB9KS50aGVuKHJlcz0+e1xuICAgIC8vICAgICAgICAgaWYocmVzLmRhdGEuc3RhdHVzID09IDIwMCl7XG4gICAgLy8gICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGl0bGU6J+aUtuiXj+aIkOWKnycsXG4gICAgLy8gICAgICAgICAgICAgICAgIGljb246J3N1Y2Nlc3MnXG4gICAgLy8gICAgICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgICAgICAvL+WtmOaVsOe7hFxuICAgIC8vICAgICAgICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgIC8vICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gcmVzLmRhdGE7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QucHVzaCh0aGlzLnNob3BJZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpjb2xsZWN0U2hvcExpc3RcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgICAgIGZhaWw6cmVzPT57XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gW107XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QucHVzaCh0aGlzLnNob3BJZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpjb2xsZWN0U2hvcExpc3RcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbiAgICAvL+WPlua2iOaUtuiXjyAtLS0tLS0tLS0tLS0tLS0tLS3mjqXlj6PlvoXmj5DkvptcbiAgICAvLyBhc3luYyBjYW5jbGVDb2xsZWN0U2hvcCgpe1xuICAgIC8vICAgICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvc2hvcF9jb2xsZWN0LycgKyB0aGlzLnNob3BJZDtcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogdXJsLFxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0NvbnRlbnQtdHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgIH0pLnRoZW4ocmVzPT57XG4gICAgLy8gICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgIC8vICAgICAgICAgICAgIHRpdGxlOiflj5bmtojmlLbol48nLFxuICAgIC8vICAgICAgICAgICAgIGljb246J3N1Y2Nlc3MnXG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLy/liKDpmaTmlbDnu4TkuK3nmoTnm5bllYbpk7pcbiAgICAvLyAgICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgIC8vICAgICAgICAgICAgIGtleTonY29sbGVjdFNob3BMaXN0JyxcbiAgICAvLyAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgY29sbGVjdFNob3BMaXN0ID0gcmVzLmRhdGE7XG4gICAgLy8gICAgICAgICAgICAgICAgIGlmKGNvbGxlY3RTaG9wTGlzdCl7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNob3BJZCA9PSBpdGVtKXtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdFNob3BMaXN0LnNwbGljZShpbmRleCwxKVxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpjb2xsZWN0U2hvcExpc3RcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICAgIHRoaXMuc2hvcElkID0gb3B0aW9ucy5pZDtcbiAgICAgICAgdGhpcy5nZXRNZXJjaGFudFNoYXJlSW5mbyhvcHRpb25zLmlkKVxuICAgICAgICBpZihvcHRpb25zLnNob3BUeXBlID09IDUgfHwgb3B0aW9ucy5zaG9wVHlwZT09NiB8fCBvcHRpb25zLnNob3BUeXBlPT03KXtcbiAgICAgICAgICAgIHRoaXMuc2hvcFR5cGUgPSBvcHRpb25zLnNob3BUeXBlO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc2hvcElkKXtcbiAgICAgICAgICAgIC8vIOiOt+WPluWVhuaIt+W8gOmAmuWKn+iDveWIl+ihqFxuICAgICAgICAgICAgdGhpcy5tZXJjaGFudEYoKVxuICAgICAgICAgICAgLy/or7vlj5bnvJPlrZjvvIzliKTmlq3or6XlupfmmK/lkKbooqvmlLbol4/ov4dcbiAgICAgICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIGtleTonY29sbGVjdFNob3BMaXN0JywgICAgICAgICAgICAgICAgIC8v5bqX6ZO65pS26JeP5YiX6KGoICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxlY3RTaG9wTGlzdCA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvcElkID09IGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhblhpbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNob3BJZCA9IG9wdGlvbnMuaWQ7XG4gICAgICAgIHd4LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICB9Y2F0Y2goZXJyKXt9XG4gICAgICAgIC8v6I635Y+W5bGP5bmV5a696auYXG5cdCAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgICAgICAgICAgICAgIHRoaXMuc2NyZWVuV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgICAgdGhpcy50b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwidG9rZW5cIik7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIFxuICAgIC8v6I635Y+W5ZWG5oi36L2s5Y+R5aW95Y+L5L+h5oGv5YaF5a65XG4gICAgZ2V0TWVyY2hhbnRTaGFyZUluZm8obV9pZCl7XG4gICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLmdldE1lcmNoYW50U2hhcmVJbmZvO1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHBfaWQgOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBtX2lkIDogbV9pZFxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHRoaXMuc2hhcmVJbmZvID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyDojrflj5blupfpk7rmlbDmja5cbiAgICBhc3luYyBnZXREYXRhKCl7XG4gICAgICAgIGNvbnN0IHVybCA9IHJlcXVlc3RVcmwuTWVyY2hhbnRJbmZvXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgIG1faWQ6dGhpcy5zaG9wSWQsXG4gICAgICAgICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiAn6aaW6aG1JyB9KVxuICAgICAgICAgICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfYmFzZUluZm8uTWFic3RyYWN0cGF0aClcbiAgICAgICAgICAgIHRoaXMubG9uZ0Jhbm5lciA9IHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfYmFzZUluZm8uTWFic3RyYWN0cGF0aC5zcGxpdCgnOycpLnNsaWNlKDAsLTEpO1xuICAgICAgICAgICAgdGhpcy50b3BDb3ZlciA9IHRydWVcbiAgICAgICAgICAgIHRoaXMuaW1nVXJscyA9IHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfQmFubmVyOyBcbiAgICAgICAgICAgIHRoaXMuYWxsRGF0YSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5kYXRhLk1lcmNoYW50X2Jhc2VJbmZvLm9wZW4gPT0gMCl7XG4gICAgICAgICAgICAgICAgLy9zaG9wcFN0YXR1cyA9PSAwIOiQpeS4mlxuICAgICAgICAgICAgICAgIHRoaXMuc2hvcHBTdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wcFN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lsIbotbfpgIHotLnkv53lrZjliLBzdG9yYWdl5LitXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICBrZXk6J3NlbmRQcmljZScsXG4gICAgICAgICAgICAgICAgZGF0YTpyZXMuZGF0YS5kYXRhLk1lcmNoYW50X2Jhc2VJbmZvLnNlbmRQcmljZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8v5bCG6YWN6YCB6LS55L+d5a2Y5Yiwc3RvcmFnZeS4rVxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5Oidub3JtYWxzZW5kJyxcbiAgICAgICAgICAgICAgICBkYXRhOnJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfYmFzZUluZm8ubm9ybWFsc2VuZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pLmNhdGNoKChyZXMpPT57XG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+e9kee7nOW8guW4uO+8jOivt+mHjeivlScsaWNvbjonbm9uZSd9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyDojrflj5bllYbmiLflvIDpgJrlip/og73liJfooahcbiAgICBhc3luYyBtZXJjaGFudEYoKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwubWVyY2hhbnRGdW5jdGlvbjtcbiAgICAgICAgbGV0IGRhdGEgPSB7IG1faWQ6dGhpcy5zaG9wSWQgfTtcbiAgICAgICAgbGV0IG1lcmNoYW50RnVuY3Rpb24gPSBbXVxuICAgICAgICByZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pZCA9PSA1KXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZVN0YXR1cyA9IHRydWVcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbWVyY2hhbnRGdW5jdGlvbi5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1lcmNoYW50RnVuY3Rpb24gPSBtZXJjaGFudEZ1bmN0aW9uXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICBpZih0aGlzLm1lcmNoYW50RnVuY3Rpb24ubGVuZ3RoPj00KXtcbiAgICAgICAgICAgICAgICB0aGlzLnRocmVlSWNvbkl0ZW1XaWR0aCA9IDI1XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnRocmVlSWNvbkl0ZW1XaWR0aCA9IDEwMC90aGlzLm1lcmNoYW50RnVuY3Rpb24ubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgICAvL+iOt+WPlnRva2VuXG4gICAgICAgIHRoaXMudG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpO1xuICAgIH1cbiAgfVxuIl19