'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var deliciousFood = function (_wepy$page) {
    _inherits(deliciousFood, _wepy$page);

    function deliciousFood() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, deliciousFood);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = deliciousFood.__proto__ || Object.getPrototypeOf(deliciousFood)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: ''
        }, _this.data = {
            stars: [0, 1, 2, 3, 4],
            normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
            selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
            key: 0,
            shopInfo: [],
            cateInfo: {},
            latAndLng: null,
            page: 0,
            showOrHide: 'none',
            dataMessage: '上拉加载数据',
            takeOutM_id: ''
        }, _this.methods = {
            //跳转店铺  (配送费、店铺ID、店铺类型,外卖)
            toShop: function toShop(sendprice, id, type, takeout) {
                if ((type == 1 || type == 2 || type == 5 || type == 6 || type == 7) && !takeout) {
                    //电商和门店流程
                    wx.navigateTo({
                        url: './e/page/index/index?id=' + id + '&shopType=' + type
                    });
                } else if ((type == 3 || type == 4) && !takeout) {
                    //外卖和超市
                    wx.navigateTo({
                        url: './f/page/index/index?id=' + id + '&shopType=' + type
                    });
                } else if (takeout) {
                    //外卖直接跳产品
                    _wepy2.default.$instance.globalData.takeOutStatus = 2;
                    wx.navigateTo({
                        url: './f/page/d/d?m_id=' + id + '&sendPrice=' + sendprice + '&takeOutM_id=' + this.takeOutM_id
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(deliciousFood, [{
        key: 'onReachBottom',
        value: function onReachBottom() {
            var _this2 = this;

            wx.showLoading({ title: '加载中...' });
            this.page = this.page + 1;
            var url = _requestUrl2.default.goodLists;
            var data = {
                longitude: this.cateInfo.longitude ? this.cateInfo.longitude : this.latAndLng.lng,
                latitude: this.cateInfo.latitude ? this.cateInfo.latitude : this.latAndLng.lat,
                page_Num: this.page,
                Indust_id: this.cateInfo.Indust_id,
                p_id: _wepy2.default.$instance.globalData.p_id
            };
            _wepy2.default.request({
                url: url,
                method: 'POST',
                data: data
            }).then(function (res) {
                if (!res.data.data.list) {
                    _this2.dataMessage = '暂无更多数据';
                } else {
                    res.data.data.list.forEach(function (item, index) {
                        _this2.shopInfo.push(item);
                    });
                }
                wx.hideLoading();
                _this2.$apply();
            });
        }
        //请求数据

    }, {
        key: 'getShopList',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this3 = this;

                var url, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = _requestUrl2.default.goodLists;
                                data = {
                                    longitude: this.cateInfo.longitude ? this.cateInfo.longitude : this.latAndLng.lng,
                                    latitude: this.cateInfo.latitude ? this.cateInfo.latitude : this.latAndLng.lat,
                                    page_Num: this.page,
                                    Indust_id: this.cateInfo.Indust_id,
                                    p_id: _wepy2.default.$instance.globalData.p_id
                                };

                                if (this.takeOutM_id) data.m_id = this.takeOutM_id;
                                _context.next = 5;
                                return _wepy2.default.request({
                                    url: url,
                                    method: 'POST',
                                    data: data
                                }).then(function (res) {
                                    _this3.shopInfo = res.data.data.list;
                                    if (_this3.takeOutM_id && res.data.data.listNum == 1) {
                                        _wepy2.default.$instance.globalData.takeOutStatus = 2;
                                        wx.redirectTo({
                                            url: './f/page/d/d?m_id=' + res.data.data.list[0].mId + '&sendPrice=' + res.data.data.list[0].sendprice + '&takeOutM_id=' + _this3.takeOutM_id
                                        });
                                    }
                                    if (_this3.shopInfo.length == 0) {
                                        _this3.showOrHide = 'block';
                                    } else {
                                        _this3.showOrHide = 'none';
                                    }
                                    _this3.$apply();
                                });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getShopList() {
                return _ref2.apply(this, arguments);
            }

            return getShopList;
        }()
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            if (options.m_id) this.takeOutM_id = options.m_id;
            this.latAndLng = wx.getStorageSync("latAndLng");
            this.cateInfo = JSON.parse(options.info);
            wx.setNavigationBarTitle({ title: options.title });
            if (this.cateInfo) {
                this.getShopList();
            }
            this.$apply();
        }
    }]);

    return deliciousFood;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(deliciousFood , 'pages/deliciousFood'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGljaW91c0Zvb2QuanMiXSwibmFtZXMiOlsiZGVsaWNpb3VzRm9vZCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic3RhcnMiLCJub3JtYWxTcmMiLCJzZWxlY3RlZFNyYyIsImtleSIsInNob3BJbmZvIiwiY2F0ZUluZm8iLCJsYXRBbmRMbmciLCJwYWdlIiwic2hvd09ySGlkZSIsImRhdGFNZXNzYWdlIiwidGFrZU91dE1faWQiLCJtZXRob2RzIiwidG9TaG9wIiwic2VuZHByaWNlIiwiaWQiLCJ0eXBlIiwidGFrZW91dCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidGFrZU91dFN0YXR1cyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJyZXF1c2V0RGF0YSIsImdvb2RMaXN0cyIsImxvbmdpdHVkZSIsImxuZyIsImxhdGl0dWRlIiwibGF0IiwicGFnZV9OdW0iLCJJbmR1c3RfaWQiLCJwX2lkIiwicmVxdWVzdCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJsaXN0IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJoaWRlTG9hZGluZyIsIiRhcHBseSIsIm1faWQiLCJsaXN0TnVtIiwicmVkaXJlY3RUbyIsIm1JZCIsImxlbmd0aCIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsIkpTT04iLCJwYXJzZSIsImluZm8iLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJnZXRTaG9wTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsYTs7Ozs7Ozs7Ozs7Ozs7d01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLG1CQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsQ0FESjtBQUVIQyx1QkFB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aUIsT0FBakI7QUFDSCxxQ0FGRCxNQUVLO0FBQ0QsK0NBQUtBLFVBQUwsR0FBa0IsTUFBbEI7QUFDSDtBQUNELDJDQUFLcUMsTUFBTDtBQUNILGlDQWxCSyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBb0JITSxPLEVBQVE7QUFDWCxnQkFBR0EsUUFBUUwsSUFBWCxFQUFpQixLQUFLcEMsV0FBTCxHQUFtQnlDLFFBQVFMLElBQTNCO0FBQ2pCLGlCQUFLeEMsU0FBTCxHQUFpQlcsR0FBR21DLGNBQUgsQ0FBa0IsV0FBbEIsQ0FBakI7QUFDQSxpQkFBSy9DLFFBQUwsR0FBZ0JnRCxLQUFLQyxLQUFMLENBQVdILFFBQVFJLElBQW5CLENBQWhCO0FBQ0F0QyxlQUFHdUMscUJBQUgsQ0FBeUIsRUFBRS9CLE9BQU8wQixRQUFRMUIsS0FBakIsRUFBekI7QUFDQSxnQkFBRyxLQUFLcEIsUUFBUixFQUFpQjtBQUNiLHFCQUFLb0QsV0FBTDtBQUNIO0FBQ0QsaUJBQUtaLE1BQUw7QUFDSDs7OztFQTFHc0N6QixlQUFLYixJOztrQkFBM0JYLGEiLCJmaWxlIjoiZGVsaWNpb3VzRm9vZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJ1xuXG4gICAgaW1wb3J0IHJlcXVzZXREYXRhIGZyb20gJy4uL2FwaS9yZXF1ZXN0VXJsJ1xuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGRlbGljaW91c0Zvb2QgZXh0ZW5kcyB3ZXB5LnBhZ2V7XG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnXG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgICAgICAgICBub3JtYWxTcmM6ICdodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3N0YXIucG5nJyxcbiAgICAgICAgICAgIHNlbGVjdGVkU3JjOiAnaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9zdGFyV2hvbGUucG5nJyxcbiAgICAgICAgICAgIGtleTogMCxcbiAgICAgICAgICAgIHNob3BJbmZvOltdLFxuICAgICAgICAgICAgY2F0ZUluZm86e30sXG4gICAgICAgICAgICBsYXRBbmRMbmc6bnVsbCxcbiAgICAgICAgICAgIHBhZ2U6MCxcbiAgICAgICAgICAgIHNob3dPckhpZGU6J25vbmUnLFxuICAgICAgICAgICAgZGF0YU1lc3NhZ2U6J+S4iuaLieWKoOi9veaVsOaNricsXG4gICAgICAgICAgICB0YWtlT3V0TV9pZDonJyxcbiAgICAgICAgfVxuICAgICAgICBtZXRob2RzID0ge1xuICAgICAgICAgICAgLy/ot7Povazlupfpk7ogICjphY3pgIHotLnjgIHlupfpk7pJROOAgeW6l+mTuuexu+WeiyzlpJbljZYpXG4gICAgICAgICAgICB0b1Nob3Aoc2VuZHByaWNlLGlkLHR5cGUsdGFrZW91dCl7XG4gICAgICAgICAgICAgICAgaWYoKHR5cGUgPT0gMSB8fCB0eXBlID09IDIgfHwgdHlwZSA9PSA1IHx8IHR5cGUgPT0gNiB8fCB0eXBlID09IDcpICYmICF0YWtlb3V0KXtcbiAgICAgICAgICAgICAgICAgICAgLy/nlLXllYblkozpl6jlupfmtYHnqItcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6Jy4vZS9wYWdlL2luZGV4L2luZGV4P2lkPScgKyBpZCArICcmc2hvcFR5cGU9JyArIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZigodHlwZSA9PSAzIHx8IHR5cGUgPT0gNCkgJiYgIXRha2VvdXQpe1xuICAgICAgICAgICAgICAgICAgICAvL+WkluWNluWSjOi2heW4glxuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDonLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGlkICsgJyZzaG9wVHlwZT0nICsgdHlwZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRha2VvdXQpe1xuICAgICAgICAgICAgICAgICAgICAvL+WkluWNluebtOaOpei3s+S6p+WTgVxuICAgICAgICAgICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXMgPSAyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOmAuL2YvcGFnZS9kL2Q/bV9pZD0ke2lkfSZzZW5kUHJpY2U9JHtzZW5kcHJpY2V9JnRha2VPdXRNX2lkPSR7dGhpcy50YWtlT3V0TV9pZH1gXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICBvblJlYWNoQm90dG9tKCl7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn5Yqg6L295LitLi4uJyB9KVxuICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5wYWdlICsgMTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHJlcXVzZXREYXRhLmdvb2RMaXN0c1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6dGhpcy5jYXRlSW5mby5sb25naXR1ZGU/dGhpcy5jYXRlSW5mby5sb25naXR1ZGU6dGhpcy5sYXRBbmRMbmcubG5nLFxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOnRoaXMuY2F0ZUluZm8ubGF0aXR1ZGU/dGhpcy5jYXRlSW5mby5sYXRpdHVkZTp0aGlzLmxhdEFuZExuZy5sYXQsXG4gICAgICAgICAgICAgICAgcGFnZV9OdW06dGhpcy5wYWdlLFxuICAgICAgICAgICAgICAgIEluZHVzdF9pZDp0aGlzLmNhdGVJbmZvLkluZHVzdF9pZCxcbiAgICAgICAgICAgICAgICBwX2lkOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIGlmKCFyZXMuZGF0YS5kYXRhLmxpc3Qpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFNZXNzYWdlID0gJ+aaguaXoOabtOWkmuaVsOaNric7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEubGlzdC5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG9wSW5mby5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8v6K+35rGC5pWw5o2uXG4gICAgICAgIGFzeW5jIGdldFNob3BMaXN0KCl7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSByZXF1c2V0RGF0YS5nb29kTGlzdHNcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOnRoaXMuY2F0ZUluZm8ubG9uZ2l0dWRlP3RoaXMuY2F0ZUluZm8ubG9uZ2l0dWRlOnRoaXMubGF0QW5kTG5nLmxuZyxcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTp0aGlzLmNhdGVJbmZvLmxhdGl0dWRlP3RoaXMuY2F0ZUluZm8ubGF0aXR1ZGU6dGhpcy5sYXRBbmRMbmcubGF0LFxuICAgICAgICAgICAgICAgIHBhZ2VfTnVtOnRoaXMucGFnZSxcbiAgICAgICAgICAgICAgICBJbmR1c3RfaWQ6dGhpcy5jYXRlSW5mby5JbmR1c3RfaWQsXG4gICAgICAgICAgICAgICAgcF9pZDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy50YWtlT3V0TV9pZCkgZGF0YS5tX2lkID0gdGhpcy50YWtlT3V0TV9pZFxuICAgICAgICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNob3BJbmZvID0gcmVzLmRhdGEuZGF0YS5saXN0O1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudGFrZU91dE1faWQgJiYgcmVzLmRhdGEuZGF0YS5saXN0TnVtID09IDEpe1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnRha2VPdXRTdGF0dXMgPSAyXG4gICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOmAuL2YvcGFnZS9kL2Q/bV9pZD0ke3Jlcy5kYXRhLmRhdGEubGlzdFswXS5tSWR9JnNlbmRQcmljZT0ke3Jlcy5kYXRhLmRhdGEubGlzdFswXS5zZW5kcHJpY2V9JnRha2VPdXRNX2lkPSR7dGhpcy50YWtlT3V0TV9pZH1gXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hvcEluZm8ubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dPckhpZGU9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd09ySGlkZSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgb25Mb2FkKG9wdGlvbnMpe1xuICAgICAgICAgICAgaWYob3B0aW9ucy5tX2lkKSB0aGlzLnRha2VPdXRNX2lkID0gb3B0aW9ucy5tX2lkXG4gICAgICAgICAgICB0aGlzLmxhdEFuZExuZyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwibGF0QW5kTG5nXCIpO1xuICAgICAgICAgICAgdGhpcy5jYXRlSW5mbyA9IEpTT04ucGFyc2Uob3B0aW9ucy5pbmZvKTtcbiAgICAgICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7IHRpdGxlOiBvcHRpb25zLnRpdGxlIH0pO1xuICAgICAgICAgICAgaWYodGhpcy5jYXRlSW5mbyl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTaG9wTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgfVxuIl19