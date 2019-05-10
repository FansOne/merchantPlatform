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

var Searchmember = function (_wepy$page) {
    _inherits(Searchmember, _wepy$page);

    function Searchmember() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Searchmember);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Searchmember.__proto__ || Object.getPrototypeOf(Searchmember)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '搜索会员卡'
        }, _this.components = {}, _this.data = {
            title: '',
            memberData: []
        }, _this.methods = {
            //获取输入名称
            inputName: function inputName(e) {
                this.title = e.detail.value;
                this.$apply();
            },
            toSearch: function toSearch() {
                if (this.title != '') {
                    this.getMemberList();
                } else {
                    wx.showToast({
                        title: '搜索框不能为空',
                        icon: 'none',
                        duration: 1500,
                        mask: true
                    });
                }
            },

            //跳转会员卡详情
            toMemberInfo: function toMemberInfo(info) {
                wx.navigateTo({
                    url: './cardIndex?info=' + JSON.stringify(info)
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Searchmember, [{
        key: 'getMemberList',

        //获取会员卡列表
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var url, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({ title: '加载中...' });
                                url = _requestUrl2.default.memberList;
                                data = {
                                    p_id: _wepy2.default.$instance.globalData.p_id,
                                    token: wx.getStorageSync("token"),
                                    type: 2, //0-获取最近使用数据 1-全部数据 2-搜索数据
                                    m_name: this.title
                                };

                                (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                                    wx.hideLoading();
                                    _this2.memberData = res.data.data.memberList;
                                    _this2.$apply();
                                    if (!res.data.data.memberList.length) {
                                        wx.showToast({ title: '未找到该店铺会员卡', icon: 'none' });
                                    }
                                });

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getMemberList() {
                return _ref2.apply(this, arguments);
            }

            return getMemberList;
        }()
    }]);

    return Searchmember;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Searchmember , 'packageMembershipCard/membershipCard/searchMember'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaE1lbWJlci5qcyJdLCJuYW1lcyI6WyJTZWFyY2htZW1iZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJ0aXRsZSIsIm1lbWJlckRhdGEiLCJtZXRob2RzIiwiaW5wdXROYW1lIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwidG9TZWFyY2giLCJnZXRNZW1iZXJMaXN0Iiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJtYXNrIiwidG9NZW1iZXJJbmZvIiwiaW5mbyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5Iiwic2hvd0xvYWRpbmciLCJyZXF1ZXN0VXJsIiwibWVtYmVyTGlzdCIsInBfaWQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0eXBlIiwibV9uYW1lIiwidGhlbiIsImhpZGVMb2FkaW5nIiwicmVzIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQyxtQkFBTSxFQURIO0FBRUhDLHdCQUFXO0FBRlIsUyxRQUlQQyxPLEdBQVU7QUFDUDtBQUNDQyxxQkFGTSxxQkFFSUMsQ0FGSixFQUVNO0FBQ1IscUJBQUtKLEtBQUwsR0FBYUksRUFBRUMsTUFBRixDQUFTQyxLQUF0QjtBQUNBLHFCQUFLQyxNQUFMO0FBQ0gsYUFMSztBQU1OQyxvQkFOTSxzQkFNSTtBQUNOLG9CQUFHLEtBQUtSLEtBQUwsSUFBYyxFQUFqQixFQUFvQjtBQUNoQix5QkFBS1MsYUFBTDtBQUNILGlCQUZELE1BRUs7QUFDREMsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUWCwrQkFBTyxTQURFO0FBRVRZLDhCQUFNLE1BRkc7QUFHVEMsa0NBQVUsSUFIRDtBQUlUQyw4QkFBTTtBQUpHLHFCQUFiO0FBTUg7QUFDSixhQWpCSzs7QUFrQk47QUFDQUMsd0JBbkJNLHdCQW1CT0MsSUFuQlAsRUFtQlk7QUFDZE4sbUJBQUdPLFVBQUgsQ0FBYztBQUNWQyx5QkFBSSxzQkFBc0JDLEtBQUtDLFNBQUwsQ0FBZUosSUFBZjtBQURoQixpQkFBZDtBQUdIO0FBdkJLLFM7Ozs7OztBQXlCVjs7Ozs7Ozs7OztBQUVJTixtQ0FBR1csV0FBSCxDQUFlLEVBQUNyQixPQUFPLFFBQVIsRUFBZjtBQUNJa0IsbUMsR0FBTUkscUJBQVdDLFU7QUFDakJ4QixvQyxHQUFPO0FBQ1B5QiwwQ0FBT0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCSCxJQUQxQjtBQUVQSSwyQ0FBUWxCLEdBQUdtQixjQUFILENBQWtCLE9BQWxCLENBRkQ7QUFHUEMsMENBQVEsQ0FIRCxFQUdLO0FBQ1pDLDRDQUFTLEtBQUsvQjtBQUpQLGlDOztBQU1YLDhEQUFZa0IsR0FBWixFQUFnQixNQUFoQixFQUF1Qm5CLElBQXZCLEVBQTZCaUMsSUFBN0IsQ0FBa0MsZUFBSztBQUNuQ3RCLHVDQUFHdUIsV0FBSDtBQUNBLDJDQUFLaEMsVUFBTCxHQUFrQmlDLElBQUluQyxJQUFKLENBQVNBLElBQVQsQ0FBY3dCLFVBQWhDO0FBQ0EsMkNBQUtoQixNQUFMO0FBQ0Esd0NBQUcsQ0FBQzJCLElBQUluQyxJQUFKLENBQVNBLElBQVQsQ0FBY3dCLFVBQWQsQ0FBeUJZLE1BQTdCLEVBQW9DO0FBQ2hDekIsMkNBQUdDLFNBQUgsQ0FBYSxFQUFDWCxPQUFPLFdBQVIsRUFBb0JZLE1BQU0sTUFBMUIsRUFBYjtBQUNIO0FBQ0osaUNBUEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE3Q2tDYSxlQUFLVyxJOztrQkFBMUJ6QyxZIiwiZmlsZSI6InNlYXJjaE1lbWJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3REYXRhJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNobWVtYmVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKLkvJrlkZjljaEnLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgdGl0bGU6JycsXG4gICAgICAgIG1lbWJlckRhdGE6W11cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgLy/ojrflj5bovpPlhaXlkI3np7BcbiAgICAgICAgaW5wdXROYW1lKGUpe1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSwgXG4gICAgICAgIHRvU2VhcmNoKCl7XG4gICAgICAgICAgICBpZih0aGlzLnRpdGxlICE9ICcnKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1lbWJlckxpc3QoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5pCc57Si5qGG5LiN6IO95Li656m6JyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy/ot7PovazkvJrlkZjljaHor6bmg4VcbiAgICAgICAgdG9NZW1iZXJJbmZvKGluZm8pe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOicuL2NhcmRJbmRleD9pbmZvPScgKyBKU09OLnN0cmluZ2lmeShpbmZvKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy/ojrflj5bkvJrlkZjljaHliJfooahcbiAgICBhc3luYyBnZXRNZW1iZXJMaXN0KCl7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHt0aXRsZTogJ+WKoOi9veS4rS4uLid9KTtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwubWVtYmVyTGlzdDtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgdG9rZW4gOiB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpLFxuICAgICAgICAgICAgdHlwZSA6ICAyLCAgLy8wLeiOt+WPluacgOi/keS9v+eUqOaVsOaNriAxLeWFqOmDqOaVsOaNriAyLeaQnOe0ouaVsOaNrlxuICAgICAgICAgICAgbV9uYW1lIDogdGhpcy50aXRsZVxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB0aGlzLm1lbWJlckRhdGEgPSByZXMuZGF0YS5kYXRhLm1lbWJlckxpc3Q7XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgaWYoIXJlcy5kYXRhLmRhdGEubWVtYmVyTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfmnKrmib7liLDor6Xlupfpk7rkvJrlkZjljaEnLGljb246ICdub25lJ30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==