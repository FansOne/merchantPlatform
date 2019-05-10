'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collections = function (_wepy$page) {
    _inherits(Collections, _wepy$page);

    function Collections() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Collections);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collections.__proto__ || Object.getPrototypeOf(Collections)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '我的收藏'
        }, _this.data = {
            deleteShopId: 0,
            shopId: 0,
            token: '',
            stars: [0, 1, 2, 3, 4],
            normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
            selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
            halfSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starHalf.png',
            key: 0,
            shopInfo: []
        }, _this.methods = {
            cancleCollection: function cancleCollection(e) {
                var _this2 = this;

                this.deleteShopId = e.currentTarget.dataset.id;
                this.shopId = e.currentTarget.dataset.shopid;
                this.$apply();
                if (this.shopId) {
                    wx.showModal({
                        title: '提示',
                        content: '确认取消收藏吗？',
                        duration: 1000,
                        success: function success(res) {
                            if (res.confirm) {
                                _this2.cancleCollectShop();
                            }
                        }
                    });
                }
            },

            //跳转店铺
            toShop: function toShop(e) {
                var dataset = e.currentTarget.dataset;
                if (dataset.type == 1 || dataset.type == 2) {
                    //电商和门店流程
                    wx.navigateTo({
                        url: './e/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
                    });
                } else {
                    //外卖和超市
                    wx.navigateTo({
                        url: './f/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Collections, [{
        key: 'collectShopList',

        //店铺列表
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                var url;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = _api2.default.apiMall + 'api/shop_collect';

                                _wepy2.default.request({
                                    url: url,
                                    method: 'GET',
                                    header: {
                                        'Accept': 'application/vnd.lingmo.v1+json',
                                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                        'Authorization': 'Bearer ' + this.token
                                    }
                                }).then(function (res) {
                                    _this3.shopInfo = res.data.message;
                                    _this3.$apply();
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function collectShopList() {
                return _ref2.apply(this, arguments);
            }

            return collectShopList;
        }()
        //取消收藏

    }, {
        key: 'cancleCollectShop',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this4 = this;

                var url;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                url = _api2.default.apiMall + 'api/shop_collect/' + this.deleteShopId;

                                _wepy2.default.request({
                                    url: url,
                                    method: 'DELETE',
                                    header: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Accept': 'application/vnd.lingmo.v1+json',
                                        'Authorization': 'Bearer ' + this.token
                                    }
                                }).then(function (res) {
                                    if (res.data.status == 200) {
                                        wx.showToast({
                                            title: '取消收藏成功',
                                            icon: 'success',
                                            success: function success(res) {
                                                //删除数组中的盖商铺
                                                wx.getStorage({
                                                    key: 'collectShopList',
                                                    success: function success(res) {
                                                        var collectShopList = res.data;
                                                        if (collectShopList) {
                                                            collectShopList.forEach(function (item, index) {
                                                                if (_this4.shopId == item) {
                                                                    collectShopList.splice(index, 1);
                                                                }
                                                            });
                                                            wx.setStorage({
                                                                key: 'collectShopList',
                                                                data: collectShopList,
                                                                success: function success(res) {}
                                                            });
                                                        }
                                                    }
                                                });
                                                _this4.collectShopList();
                                            }
                                        });
                                    }
                                    _this4.$apply();
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
        key: 'onLoad',
        value: function onLoad() {
            //获取token
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
            if (this.token) {
                this.collectShopList();
            }
        }
    }]);

    return Collections;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Collections , 'pages/collections'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25zLmpzIl0sIm5hbWVzIjpbIkNvbGxlY3Rpb25zIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJkZWxldGVTaG9wSWQiLCJzaG9wSWQiLCJ0b2tlbiIsInN0YXJzIiwibm9ybWFsU3JjIiwic2VsZWN0ZWRTcmMiLCJoYWxmU3JjIiwia2V5Iiwic2hvcEluZm8iLCJtZXRob2RzIiwiY2FuY2xlQ29sbGVjdGlvbiIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwic2hvcGlkIiwiJGFwcGx5Iiwid3giLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwiY2FuY2xlQ29sbGVjdFNob3AiLCJ0b1Nob3AiLCJ0eXBlIiwibmF2aWdhdGVUbyIsInVybCIsImFwaSIsImFwaU1hbGwiLCJ3ZXB5IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsInRoZW4iLCJtZXNzYWdlIiwic3RhdHVzIiwic2hvd1RvYXN0IiwiaWNvbiIsImdldFN0b3JhZ2UiLCJjb2xsZWN0U2hvcExpc3QiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4Iiwic3BsaWNlIiwic2V0U3RvcmFnZSIsImdldFN0b3JhZ2VTeW5jIiwiYWNjZXNzX3Rva2VuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O29NQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLEksR0FBTztBQUNIQywwQkFBYSxDQURWO0FBRUhDLG9CQUFPLENBRko7QUFHSEMsbUJBQU0sRUFISDtBQUlIQyxtQkFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBSko7QUFLSEMsdUJBQVcsbURBTFI7QUFNSEMseUJBQWEsd0RBTlY7QUFPSEMs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QiwrREFBRzhCLFVBQUgsQ0FBYztBQUNWeEMscUVBQUksaUJBRE07QUFFVlIsc0VBQUsyQyxlQUZLO0FBR1ZwQix5RUFBUSxzQkFBSyxDQUNaO0FBSlMsNkRBQWQ7QUFNSDtBQUVKO0FBbEJTLGlEQUFkO0FBb0JBLHVEQUFLb0IsZUFBTDtBQUNIO0FBMUJRLHlDQUFiO0FBNkJIO0FBQ0QsMkNBQUsxQixNQUFMO0FBQ0gsaUNBekNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBMkNJO0FBQ0o7QUFDQSxnQkFBSWQsUUFBUWUsR0FBRytCLGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWjtBQUNBLGlCQUFLOUMsS0FBTCxHQUFhQSxNQUFNK0MsWUFBbkI7QUFDQSxnQkFBRyxLQUFLL0MsS0FBUixFQUFjO0FBQ1YscUJBQUt3QyxlQUFMO0FBQ0g7QUFDSjs7OztFQXRIb0NWLGVBQUtrQixJOztrQkFBekJ0RCxXIiwiZmlsZSI6ImNvbGxlY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgICBpbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbnMgZXh0ZW5kcyB3ZXB5LnBhZ2V7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmlLbol48nXG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIGRlbGV0ZVNob3BJZDowLFxuICAgICAgICAgICAgc2hvcElkOjAsXG4gICAgICAgICAgICB0b2tlbjonJyxcbiAgICAgICAgICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgICAgICAgICBub3JtYWxTcmM6ICdodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3N0YXIucG5nJyxcbiAgICAgICAgICAgIHNlbGVjdGVkU3JjOiAnaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9zdGFyV2hvbGUucG5nJyxcbiAgICAgICAgICAgIGhhbGZTcmM6J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3RhckhhbGYucG5nJyxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgICAgIHNob3BJbmZvOltdLFxuICAgICAgICB9XG4gICAgICAgIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBjYW5jbGVDb2xsZWN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlU2hvcElkID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9wSWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5zaG9waWQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNob3BJZCl7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6J+ehruiupOWPlua2iOaUtuiXj+WQl++8nycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjoxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29uZmlybSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FuY2xlQ29sbGVjdFNob3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy/ot7Povazlupfpk7pcbiAgICAgICAgICAgIHRvU2hvcChlKXtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YXNldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgICAgIGlmKGRhdGFzZXQudHlwZSA9PSAxIHx8IGRhdGFzZXQudHlwZSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgLy/nlLXllYblkozpl6jlupfmtYHnqItcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6Jy4vZS9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBkYXRhc2V0LmlkICsgJyZzaG9wVHlwZT0nICsgZGF0YXNldC50eXBlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8v5aSW5Y2W5ZKM6LaF5biCXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOicuL2YvcGFnZS9pbmRleC9pbmRleD9pZD0nICsgZGF0YXNldC5pZCArICcmc2hvcFR5cGU9JyArIGRhdGFzZXQudHlwZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgLy/lupfpk7rliJfooahcbiAgICAgICAgYXN5bmMgY29sbGVjdFNob3BMaXN0KCl7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvc2hvcF9jb2xsZWN0JztcbiAgICAgICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BJbmZvID0gcmVzLmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvL+WPlua2iOaUtuiXj1xuICAgICAgICBhc3luYyBjYW5jbGVDb2xsZWN0U2hvcCgpe1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3BfY29sbGVjdC8nICsgdGhpcy5kZWxldGVTaG9wSWQ7XG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+WPlua2iOaUtuiXj+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOidzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/liKDpmaTmlbDnu4TkuK3nmoTnm5bllYbpk7pcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5Oidjb2xsZWN0U2hvcExpc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxlY3RTaG9wTGlzdCA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29sbGVjdFNob3BMaXN0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zaG9wSWQgPT0gaXRlbSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWN0U2hvcExpc3Quc3BsaWNlKGluZGV4LDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2NvbGxlY3RTaG9wTGlzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6Y29sbGVjdFNob3BMaXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RTaG9wTGlzdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBvbkxvYWQoKXtcbiAgICAgICAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgICAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIGlmKHRoaXMudG9rZW4pe1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdFNob3BMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4iXX0=