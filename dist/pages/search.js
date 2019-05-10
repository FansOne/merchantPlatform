'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$page) {
    _inherits(Search, _wepy$page);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '搜索'
        }, _this.components = {}, _this.data = {
            stars: [0, 1, 2, 3, 4],
            normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
            selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
            latAndLng: null,
            shop_name: '',
            searchHistory: [],
            shopList: [],
            placeWords: '请输入商家、品类或商圈'
        }, _this.methods = {
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
            },

            //删除历史纪录
            deleteHistory: function deleteHistory() {
                wx.showModal({
                    title: '提示',
                    content: '确认删除搜索记录吗？',
                    success: function success(res) {
                        if (res.confirm) {
                            wx.redirectTo({
                                url: './search'
                            });
                            wx.removeStorage({ key: 'searchHistory' });
                        }
                    }
                });
            },

            //获取输入名称
            inputName: function inputName(e) {
                this.shop_name = e.detail.value;
                this.$apply();
            },

            //搜索
            toSearch: function toSearch() {
                if (this.shop_name != '') {
                    this.searchShop();
                }
            },

            //使用历史纪录进行搜索
            useHistorySearch: function useHistorySearch(shopName) {
                this.shop_name = shopName;
                this.$apply();
                this.searchShop(shopName);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: 'searchShop',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(shopName) {
                var _this2 = this;

                var url_, data_;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url_ = _requestUrl2.default.goodLists;
                                data_ = {
                                    p_id: _wepy2.default.$instance.globalData.p_id,
                                    Indust_id: -1,
                                    longitude: this.latAndLng.lng,
                                    latitude: this.latAndLng.lat,
                                    page_Num: 0,
                                    title: this.shop_name ? this.shop_name : shopName
                                };

                                (0, _requestData.requestData)(url_, 'POST', data_).then(function (res) {
                                    if (!res.data.data.list) wx.showToast({ title: '未找到该店铺', icon: 'none' });
                                    _this2.shopList = res.data.data.list;
                                    _this2.searchHistory.push(_this2.shop_name);
                                    _this2.$apply();
                                    wx.setStorage({
                                        key: 'searchHistory',
                                        data: _this2.searchHistory,
                                        success: function success(res) {
                                            wx.getStorage({
                                                key: 'searchHistory',
                                                success: function success(res) {
                                                    _this2.searchHistory = [].concat(_toConsumableArray(new Set(res.data)));
                                                    _this2.$apply();
                                                    wx.setStorage({
                                                        key: 'searchHistory',
                                                        data: _this2.searchHistory
                                                    });
                                                }
                                            });
                                        }
                                    });
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function searchShop(_x) {
                return _ref2.apply(this, arguments);
            }

            return searchShop;
        }()
    }, {
        key: 'onLoad',
        value: function onLoad() {
            //获取经纬度
            this.latAndLng = wx.getStorageSync('latAndLng');
            this.searchHistory = wx.getStorageSync("searchHistory");
            if (this.searchHistory == '') {
                this.searchHistory = [];
            }
            this.$apply();
        }
    }]);

    return Search;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Search , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJzdGFycyIsIm5vcm1hbFNyYyIsInNlbGVjdGVkU3JjIiwibGF0QW5kTG5nIiwic2hvcF9uYW1lIiwic2VhcmNoSGlzdG9yeSIsInNob3BMaXN0IiwicGxhY2VXb3JkcyIsIm1ldGhvZHMiLCJ0b1Nob3AiLCJlIiwiZGF0YXNldCIsImN1cnJlbnRUYXJnZXQiLCJ0eXBlIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWQiLCJkZWxldGVIaXN0b3J5Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJyZWRpcmVjdFRvIiwicmVtb3ZlU3RvcmFnZSIsImtleSIsImlucHV0TmFtZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwidG9TZWFyY2giLCJzZWFyY2hTaG9wIiwidXNlSGlzdG9yeVNlYXJjaCIsInNob3BOYW1lIiwidXJsXyIsInJlcXVlc3RVcmwiLCJnb29kTGlzdHMiLCJkYXRhXyIsInBfaWQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsIkluZHVzdF9pZCIsImxvbmdpdHVkZSIsImxuZyIsImxhdGl0dWRlIiwibGF0IiwicGFnZV9OdW0iLCJ0aGVuIiwibGlzdCIsInNob3dUb2FzdCIsImljb24iLCJwdXNoIiwic2V0U3RvcmFnZSIsImdldFN0b3JhZ2UiLCJTZXQiLCJnZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQyxtQkFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBREo7QUFFSEMsdUJBQVcsbURBRlI7QUFHSEMseUJBQWEsd0RBSFY7QUFJSEMsdUJBQVUsSUFKUDtBQUtIQyx1QkFBVSxFQUxQO0FBTUhDLDJCQUFjLEVBTlg7QUFPSEMsc0JBQVMsRUFQTjtBQVFIQyx3QkFBVztBQVJSLFMsUUFVUEMsTyxHQUFVO0FBQ047QUFDQUMsa0JBRk0sa0JBRUNDLENBRkQsRUFFRztBQUNMLG9CQUFJQyxVQUFVRCxFQUFFRSxhQUFGLENBQWdCRCxPQUE5QjtBQUNBLG9CQUFHQSxRQUFRRSxJQUFSLElBQWdCLENBQWhCLElBQXFCRixRQUFRRSxJQUFSLElBQWdCLENBQXhDLEVBQTBDO0FBQzFDO0FBQ0FDLHVCQUFHQyxVQUFILENBQWM7QUFDVkMsNkJBQUksNkJBQTZCTCxRQUFRTSxFQUFyQyxHQUEwQyxZQUExQyxHQUF5RE4sUUFBUUU7QUFEM0QscUJBQWQ7QUFHQyxpQkFMRCxNQUtLO0FBQ0w7QUFDQUMsdUJBQUdDLFVBQUgsQ0FBYztBQUNWQyw2QkFBSSw2QkFBNkJMLFFBQVFNLEVBQXJDLEdBQTBDLFlBQTFDLEdBQXlETixRQUFRRTtBQUQzRCxxQkFBZDtBQUdDO0FBQ0osYUFmSzs7QUFnQk47QUFDQUsseUJBakJNLDJCQWlCUztBQUNYSixtQkFBR0ssU0FBSCxDQUFhO0FBQ1RDLDJCQUFPLElBREU7QUFFVEMsNkJBQVEsWUFGQztBQUdUQyw2QkFBUyxzQkFBTztBQUNaLDRCQUFHQyxJQUFJQyxPQUFQLEVBQWU7QUFDWFYsK0JBQUdXLFVBQUgsQ0FBYztBQUNWVCxxQ0FBSTtBQURNLDZCQUFkO0FBR0FGLCtCQUFHWSxhQUFILENBQWlCLEVBQUNDLEtBQUssZUFBTixFQUFqQjtBQUNIO0FBQ0o7QUFWUSxpQkFBYjtBQVlILGFBOUJLOztBQStCTjtBQUNBQyxxQkFoQ00scUJBZ0NJbEIsQ0FoQ0osRUFnQ007QUFDUixxQkFBS04sU0FBTCxHQUFpQk0sRUFBRW1CLE1BQUYsQ0FBU0MsS0FBMUI7QUFDQSxxQkFBS0MsTUFBTDtBQUNILGFBbkNLOztBQW9DTjtBQUNBQyxvQkFyQ00sc0JBcUNJO0FBQ04sb0JBQUcsS0FBSzVCLFNBQUwsSUFBa0IsRUFBckIsRUFBd0I7QUFDcEIseUJBQUs2QixVQUFMO0FBQ0g7QUFDSixhQXpDSzs7QUEwQ047QUFDQUMsNEJBM0NNLDRCQTJDV0MsUUEzQ1gsRUEyQ29CO0FBQ3RCLHFCQUFLL0IsU0FBTCxHQUFpQitCLFFBQWpCO0FBQ0EscUJBQUtKLE1BQUw7QUFDQSxxQkFBS0UsVUFBTCxDQUFnQkUsUUFBaEI7QUFDSDtBQS9DSyxTOzs7Ozs7aUdBaURPQSxROzs7Ozs7OztBQUNUQyxvQyxHQUFPQyxxQkFBV0MsUztBQUNsQkMscUMsR0FBUTtBQUNSQywwQ0FBTUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCSCxJQUR4QjtBQUVSSSwrQ0FBVSxDQUFDLENBRkg7QUFHUkMsK0NBQVUsS0FBSzFDLFNBQUwsQ0FBZTJDLEdBSGpCO0FBSVJDLDhDQUFTLEtBQUs1QyxTQUFMLENBQWU2QyxHQUpoQjtBQUtSQyw4Q0FBUyxDQUxEO0FBTVI3QiwyQ0FBTSxLQUFLaEIsU0FBTCxHQUFlLEtBQUtBLFNBQXBCLEdBQThCK0I7QUFONUIsaUM7O0FBUVosOERBQVlDLElBQVosRUFBaUIsTUFBakIsRUFBd0JHLEtBQXhCLEVBQStCVyxJQUEvQixDQUFvQyxVQUFDM0IsR0FBRCxFQUFPO0FBQ3hDLHdDQUFHLENBQUNBLElBQUl4QixJQUFKLENBQVNBLElBQVQsQ0FBY29ELElBQWxCLEVBQXdCckMsR0FBR3NDLFNBQUgsQ0FBYSxFQUFFaEMsT0FBTyxRQUFULEVBQWtCaUMsTUFBTSxNQUF4QixFQUFiO0FBQ3ZCLDJDQUFLL0MsUUFBTCxHQUFnQmlCLElBQUl4QixJQUFKLENBQVNBLElBQVQsQ0FBY29ELElBQTlCO0FBQ0EsMkNBQUs5QyxhQUFMLENBQW1CaUQsSUFBbkIsQ0FBd0IsT0FBS2xELFNBQTdCO0FBQ0EsMkNBQUsyQixNQUFMO0FBQ0FqQix1Q0FBR3lDLFVBQUgsQ0FBYztBQUNWNUIsNkNBQUksZUFETTtBQUVWNUIsOENBQUssT0FBS00sYUFGQTtBQUdWaUIsaURBQVEsc0JBQUs7QUFDVFIsK0NBQUcwQyxVQUFILENBQWM7QUFDVjdCLHFEQUFJLGVBRE07QUFFVkwseURBQVEsc0JBQUs7QUFDVCwyREFBS2pCLGFBQUwsZ0NBQXlCLElBQUlvRCxHQUFKLENBQVFsQyxJQUFJeEIsSUFBWixDQUF6QjtBQUNBLDJEQUFLZ0MsTUFBTDtBQUNBakIsdURBQUd5QyxVQUFILENBQWM7QUFDVjVCLDZEQUFLLGVBREs7QUFFVjVCLDhEQUFNLE9BQUtNO0FBRkQscURBQWQ7QUFJSDtBQVRTLDZDQUFkO0FBV0g7QUFmUyxxQ0FBZDtBQWlCSCxpQ0F0QkQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0F3Qkk7QUFDSjtBQUNBLGlCQUFLRixTQUFMLEdBQWlCVyxHQUFHNEMsY0FBSCxDQUFrQixXQUFsQixDQUFqQjtBQUNBLGlCQUFLckQsYUFBTCxHQUFxQlMsR0FBRzRDLGNBQUgsQ0FBa0IsZUFBbEIsQ0FBckI7QUFDQSxnQkFBRyxLQUFLckQsYUFBTCxJQUFzQixFQUF6QixFQUE0QjtBQUN4QixxQkFBS0EsYUFBTCxHQUFxQixFQUFyQjtBQUNIO0FBQ0QsaUJBQUswQixNQUFMO0FBQ0g7Ozs7RUEzRytCVSxlQUFLa0IsSTs7a0JBQXBCaEUsTSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vYXBpL3JlcXVlc3REYXRhJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgICAgIG5vcm1hbFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3Rhci5wbmcnLFxuICAgICAgICBzZWxlY3RlZFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3Rhcldob2xlLnBuZycsXG4gICAgICAgIGxhdEFuZExuZzpudWxsLFxuICAgICAgICBzaG9wX25hbWU6JycsXG4gICAgICAgIHNlYXJjaEhpc3Rvcnk6W10sXG4gICAgICAgIHNob3BMaXN0OltdLFxuICAgICAgICBwbGFjZVdvcmRzOifor7fovpPlhaXllYblrrbjgIHlk4HnsbvmiJbllYblnIgnXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIC8v6Lez6L2s5bqX6ZO6XG4gICAgICAgIHRvU2hvcChlKXtcbiAgICAgICAgICAgIGxldCBkYXRhc2V0ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBpZihkYXRhc2V0LnR5cGUgPT0gMSB8fCBkYXRhc2V0LnR5cGUgPT0gMil7XG4gICAgICAgICAgICAvL+eUteWVhuWSjOmXqOW6l+a1geeoi1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOicuL2UvcGFnZS9pbmRleC9pbmRleD9pZD0nICsgZGF0YXNldC5pZCArICcmc2hvcFR5cGU9JyArIGRhdGFzZXQudHlwZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy/lpJbljZblkozotoXluIJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDonLi9mL3BhZ2UvaW5kZXgvaW5kZXg/aWQ9JyArIGRhdGFzZXQuaWQgKyAnJnNob3BUeXBlPScgKyBkYXRhc2V0LnR5cGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8v5Yig6Zmk5Y6G5Y+y57qq5b2VXG4gICAgICAgIGRlbGV0ZUhpc3RvcnkoKXtcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6J+ehruiupOWIoOmZpOaQnOe0ouiusOW9leWQl++8nycgLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5jb25maXJtKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDonLi9zZWFyY2gnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7a2V5OiAnc2VhcmNoSGlzdG9yeSd9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvL+iOt+WPlui+k+WFpeWQjeensFxuICAgICAgICBpbnB1dE5hbWUoZSl7XG4gICAgICAgICAgICB0aGlzLnNob3BfbmFtZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy/mkJzntKJcbiAgICAgICAgdG9TZWFyY2goKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvcF9uYW1lICE9ICcnKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFNob3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy/kvb/nlKjljoblj7LnuqrlvZXov5vooYzmkJzntKJcbiAgICAgICAgdXNlSGlzdG9yeVNlYXJjaChzaG9wTmFtZSl7XG4gICAgICAgICAgICB0aGlzLnNob3BfbmFtZSA9IHNob3BOYW1lO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoU2hvcChzaG9wTmFtZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBzZWFyY2hTaG9wKHNob3BOYW1lKXtcbiAgICAgICAgbGV0IHVybF8gPSByZXF1ZXN0VXJsLmdvb2RMaXN0cztcbiAgICAgICAgbGV0IGRhdGFfID0ge1xuICAgICAgICAgICAgcF9pZDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgSW5kdXN0X2lkOi0xLFxuICAgICAgICAgICAgbG9uZ2l0dWRlOnRoaXMubGF0QW5kTG5nLmxuZyxcbiAgICAgICAgICAgIGxhdGl0dWRlOnRoaXMubGF0QW5kTG5nLmxhdCxcbiAgICAgICAgICAgIHBhZ2VfTnVtOjAsXG4gICAgICAgICAgICB0aXRsZTp0aGlzLnNob3BfbmFtZT90aGlzLnNob3BfbmFtZTpzaG9wTmFtZSxcbiAgICAgICAgfVxuICAgICAgICByZXF1ZXN0RGF0YSh1cmxfLCdQT1NUJyxkYXRhXykudGhlbigocmVzKT0+e1xuICAgICAgICAgICBpZighcmVzLmRhdGEuZGF0YS5saXN0KSB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+acquaJvuWIsOivpeW6l+mTuicsaWNvbjogJ25vbmUnIH0pXG4gICAgICAgICAgICB0aGlzLnNob3BMaXN0ID0gcmVzLmRhdGEuZGF0YS5saXN0O1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hIaXN0b3J5LnB1c2godGhpcy5zaG9wX25hbWUpXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5OidzZWFyY2hIaXN0b3J5JyxcbiAgICAgICAgICAgICAgICBkYXRhOnRoaXMuc2VhcmNoSGlzdG9yeSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTonc2VhcmNoSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoSGlzdG9yeSA9IFsuLi5uZXcgU2V0KHJlcy5kYXRhKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnc2VhcmNoSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VhcmNoSGlzdG9yeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICAvL+iOt+WPlue7j+e6rOW6plxuICAgICAgICB0aGlzLmxhdEFuZExuZyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsYXRBbmRMbmcnKTtcbiAgICAgICAgdGhpcy5zZWFyY2hIaXN0b3J5ID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJzZWFyY2hIaXN0b3J5XCIpO1xuICAgICAgICBpZih0aGlzLnNlYXJjaEhpc3RvcnkgPT0gJycpe1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hIaXN0b3J5ID0gW11cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH1cblxufVxuIl19