'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Memberlist = function (_wepy$page) {
    _inherits(Memberlist, _wepy$page);

    function Memberlist() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Memberlist);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Memberlist.__proto__ || Object.getPrototypeOf(Memberlist)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会员卡列表'
        }, _this.components = {}, _this.data = {
            memberData: [],
            memberData2: [],
            shopId: 0,
            page: 1,
            index: 0,
            height: 0
        }, _this.methods = {
            //跳转搜索
            toSearchPage: function toSearchPage() {
                wx.navigateTo({
                    url: './searchMember'
                });
            },

            //跳转会员卡详情
            toMemberInfo: function toMemberInfo(info) {
                wx.navigateTo({
                    url: './cardIndex?info=' + JSON.stringify(info)
                });
            },

            //立即充值
            cardRecharge: function cardRecharge(item) {
                this.is_shopping(item);
            },

            //跳转店铺
            goShop: function goShop(e) {
                var dataset = e.currentTarget.dataset;
                if (dataset.type == 1 || dataset.type == 2) {
                    //电商、门店流程
                    wx.navigateTo({
                        url: '../../pages/e/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
                    });
                } else if (dataset.type == 3 || dataset.type == 4) {
                    //外卖、超市
                    wx.navigateTo({
                        url: '../../pages/f/page/index/index?id=' + dataset.id + '&shopType=' + dataset.type
                    });
                }
            },
            scollBottom: function scollBottom() {},

            //最近使用的card
            cardRenctly: function cardRenctly() {
                this.memberData = [];
                this.index = 0;
                this.getMemberList();
            },

            //其它card
            otherCard: function otherCard() {
                this.memberData = [];
                this.index = 1;
                this.getMemberList(1, '');
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Memberlist, [{
        key: 'getMemberList',

        // 获取会员卡列表
        value: function getMemberList(type, userInput) {
            var _this2 = this;

            wx.showLoading({ title: '加载中...' });
            var url = _requestUrl2.default.memberList;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                token: wx.getStorageSync("token"),
                type: type || 0, //0-获取最近使用数据 1-全部数据 2-搜索数据
                m_name: userInput
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                wx.hideLoading();
                if (_this2.memberData.length) {
                    res.data.data.memberList.forEach(function (item, index) {
                        _this2.memberData.push(item);
                    });
                } else {
                    _this2.memberData = res.data.data.memberList;
                }
                _this2.$apply();
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this3 = this;

            var query = wx.createSelectorQuery();
            //选择id
            query.select('#search_wrap_update').boundingClientRect(function (rect) {
                //获取屏幕高度
                wx.getSystemInfo({
                    success: function success(res) {
                        _this3.height = res.windowHeight - rect.height;
                        _this3.$apply();
                    }
                });
            }).exec();
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            this.getMemberList();
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.memberData = [];
            this.memberData2 = [];
        }
        //立即充值

    }, {
        key: 'is_shopping',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(item) {
                var items;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                items = JSON.stringify(item);

                                wx.navigateTo({
                                    url: './cardRecharge?item=' + items
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function is_shopping(_x) {
                return _ref2.apply(this, arguments);
            }

            return is_shopping;
        }()
    }]);

    return Memberlist;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Memberlist , 'packageMembershipCard/membershipCard/memberList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlckxpc3QuanMiXSwibmFtZXMiOlsiTWVtYmVybGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsIm1lbWJlckRhdGEiLCJtZW1iZXJEYXRhMiIsInNob3BJZCIsInBhZ2UiLCJpbmRleCIsImhlaWdodCIsIm1ldGhvZHMiLCJ0b1NlYXJjaFBhZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0b01lbWJlckluZm8iLCJpbmZvIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhcmRSZWNoYXJnZSIsIml0ZW0iLCJpc19zaG9wcGluZyIsImdvU2hvcCIsImUiLCJkYXRhc2V0IiwiY3VycmVudFRhcmdldCIsInR5cGUiLCJpZCIsInNjb2xsQm90dG9tIiwiY2FyZFJlbmN0bHkiLCJnZXRNZW1iZXJMaXN0Iiwib3RoZXJDYXJkIiwidXNlcklucHV0Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInJlcXVlc3RVcmwiLCJtZW1iZXJMaXN0IiwicF9pZCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsIm1fbmFtZSIsInRoZW4iLCJoaWRlTG9hZGluZyIsImxlbmd0aCIsInJlcyIsImZvckVhY2giLCJwdXNoIiwiJGFwcGx5IiwicXVlcnkiLCJjcmVhdGVTZWxlY3RvclF1ZXJ5Iiwic2VsZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwicmVjdCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwid2luZG93SGVpZ2h0IiwiZXhlYyIsIml0ZW1zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLHdCQUFXLEVBRFI7QUFFSEMseUJBQVksRUFG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LEdBQUd3QyxtQkFBSCxFQUFaO0FBQ0E7QUFDQUQsa0JBQU1FLE1BQU4sQ0FBYSxxQkFBYixFQUFvQ0Msa0JBQXBDLENBQXVELFVBQUNDLElBQUQsRUFBUztBQUM1RDtBQUNBM0MsbUJBQUc0QyxhQUFILENBQWlCO0FBQ2JDLDZCQUFRLHNCQUFLO0FBQ1QsK0JBQUtoRCxNQUFMLEdBQWNzQyxJQUFJVyxZQUFKLEdBQW1CSCxLQUFLOUMsTUFBdEM7QUFDQSwrQkFBS3lDLE1BQUw7QUFDSDtBQUpZLGlCQUFqQjtBQU1ILGFBUkQsRUFRR1MsSUFSSDtBQVNIOzs7aUNBQ087QUFDSixpQkFBSzdCLGFBQUw7QUFDSDs7O2lDQUNPO0FBQ0osaUJBQUsxQixVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsaUJBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDSDtBQUNEOzs7OztpR0FDa0JlLEk7Ozs7OztBQUNWd0MscUMsR0FBUTNDLEtBQUtDLFNBQUwsQ0FBZUUsSUFBZixDOztBQUNaUixtQ0FBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlDQUFLLHlCQUF5QjhDO0FBRHBCLGlDQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBekdnQ3RCLGVBQUsvQixJOztrQkFBeEJSLFUiLCJmaWxlIjoibWVtYmVyTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0VXJsJ1xuaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi8uLi9hcGkvcmVxdWVzdERhdGEnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbWJlcmxpc3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOWNoeWIl+ihqCcsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBtZW1iZXJEYXRhOltdLFxuICAgICAgICBtZW1iZXJEYXRhMjpbXSxcbiAgICAgICAgc2hvcElkOjAsXG4gICAgICAgIHBhZ2U6MSxcbiAgICAgICAgaW5kZXg6MCxcbiAgICAgICAgaGVpZ2h0OjBcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIC8v6Lez6L2s5pCc57SiXG4gICAgICAgIHRvU2VhcmNoUGFnZSgpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOicuL3NlYXJjaE1lbWJlcidcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIC8v6Lez6L2s5Lya5ZGY5Y2h6K+m5oOFXG4gICAgICAgIHRvTWVtYmVySW5mbyhpbmZvKXtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDonLi9jYXJkSW5kZXg/aW5mbz0nICsgSlNPTi5zdHJpbmdpZnkoaW5mbylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIC8v56uL5Y2z5YWF5YC8XG4gICAgICAgIGNhcmRSZWNoYXJnZShpdGVtKXtcbiAgICAgICAgICAgIHRoaXMuaXNfc2hvcHBpbmcoaXRlbSlcbiAgICAgICAgfSxcbiAgICAgICAgLy/ot7Povazlupfpk7pcbiAgICAgICAgZ29TaG9wKGUpe1xuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldDtcbiAgICAgICAgICAgIGlmKGRhdGFzZXQudHlwZSA9PSAxIHx8IGRhdGFzZXQudHlwZSA9PSAyKXtcbiAgICAgICAgICAgIC8v55S15ZWG44CB6Zeo5bqX5rWB56iLXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6Jy4uLy4uL3BhZ2VzL2UvcGFnZS9pbmRleC9pbmRleD9pZD0nICsgZGF0YXNldC5pZCArICcmc2hvcFR5cGU9JyArIGRhdGFzZXQudHlwZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGFzZXQudHlwZSA9PSAzIHx8IGRhdGFzZXQudHlwZSA9PSA0KXtcbiAgICAgICAgICAgIC8v5aSW5Y2W44CB6LaF5biCXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6Jy4uLy4uL3BhZ2VzL2YvcGFnZS9pbmRleC9pbmRleD9pZD0nICsgZGF0YXNldC5pZCArICcmc2hvcFR5cGU9JyArIGRhdGFzZXQudHlwZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc2NvbGxCb3R0b20oKXt9LFxuICAgICAgICAvL+acgOi/keS9v+eUqOeahGNhcmRcbiAgICAgICAgY2FyZFJlbmN0bHkoKXtcbiAgICAgICAgICAgIHRoaXMubWVtYmVyRGF0YSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLmdldE1lbWJlckxpc3QoKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy/lhbblroNjYXJkXG4gICAgICAgIG90aGVyQ2FyZCgpe1xuICAgICAgICAgICAgdGhpcy5tZW1iZXJEYXRhID0gW107XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2V0TWVtYmVyTGlzdCgxLCcnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g6I635Y+W5Lya5ZGY5Y2h5YiX6KGoXG4gICAgZ2V0TWVtYmVyTGlzdCh0eXBlLHVzZXJJbnB1dCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLid9KTtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwubWVtYmVyTGlzdDtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgdG9rZW4gOiB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpLFxuICAgICAgICAgICAgdHlwZSA6IHR5cGUgfHwgMCwgIC8vMC3ojrflj5bmnIDov5Hkvb/nlKjmlbDmja4gMS3lhajpg6jmlbDmja4gMi3mkJzntKLmlbDmja5cbiAgICAgICAgICAgIG1fbmFtZSA6IHVzZXJJbnB1dFxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICBpZih0aGlzLm1lbWJlckRhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5kYXRhLm1lbWJlckxpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW1iZXJEYXRhLnB1c2goaXRlbSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW1iZXJEYXRhID0gcmVzLmRhdGEuZGF0YS5tZW1iZXJMaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgICAgIHZhciBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTtcbiAgICAgICAgLy/pgInmi6lpZFxuICAgICAgICBxdWVyeS5zZWxlY3QoJyNzZWFyY2hfd3JhcF91cGRhdGUnKS5ib3VuZGluZ0NsaWVudFJlY3QoKHJlY3QpPT4ge1xuICAgICAgICAgICAgLy/ojrflj5blsY/luZXpq5jluqZcbiAgICAgICAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCAtIHJlY3QuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLmV4ZWMoKTtcbiAgICB9O1xuICAgIG9uU2hvdygpe1xuICAgICAgICB0aGlzLmdldE1lbWJlckxpc3QoKVxuICAgIH1cbiAgICBvbkhpZGUoKXtcbiAgICAgICAgdGhpcy5tZW1iZXJEYXRhID0gW11cbiAgICAgICAgdGhpcy5tZW1iZXJEYXRhMiA9IFtdXG4gICAgfVxuICAgIC8v56uL5Y2z5YWF5YC8XG4gICAgYXN5bmMgaXNfc2hvcHBpbmcoaXRlbSl7XG4gICAgICAgIGxldCBpdGVtcyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vY2FyZFJlY2hhcmdlP2l0ZW09JyArIGl0ZW1zXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==