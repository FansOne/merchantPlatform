'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _app = require('./../utils/app.js');

var _app2 = _interopRequireDefault(_app);

var _util = require('./../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mine = function (_wepy$page) {
    _inherits(Mine, _wepy$page);

    function Mine() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mine);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '分类'
        }, _this.data = {
            imagesBtn: []
        }, _this.methods = {
            toModelDetail: function toModelDetail(c_id, title) {
                var Indust_id = c_id;
                var data = {
                    'longitude': this.lng,
                    'latitude': this.lat,
                    'Indust_id': Indust_id
                };
                if (Indust_id != 666 && Indust_id != 50) {
                    wx.navigateTo({
                        url: './deliciousFood?info=' + JSON.stringify(data) + '&title=' + title
                    });
                } else if (Indust_id == 666) {
                    wx.navigateTo({
                        url: './cateList'
                    });
                } else if (Indust_id == 50) {
                    //领券中心
                    wx.navigateTo({
                        url: './couponsCenter?shopId=' + 92
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mine, [{
        key: 'getAllClassify',

        //分类大全
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var url, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = _requestUrl2.default.getIndexData;
                                data = {
                                    p_id: _wepy2.default.$instance.globalData.p_id
                                };

                                (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                                    _this2.imagesBtn = res.data.data.cla;
                                    _this2.$apply();
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getAllClassify() {
                return _ref2.apply(this, arguments);
            }

            return getAllClassify;
        }()
    }, {
        key: 'onLoad',
        value: function onLoad() {
            this.getAllClassify();
        }
    }]);

    return Mine;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Mine , 'pages/cateList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVMaXN0LmpzIl0sIm5hbWVzIjpbIk1pbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImltYWdlc0J0biIsIm1ldGhvZHMiLCJ0b01vZGVsRGV0YWlsIiwiY19pZCIsInRpdGxlIiwiSW5kdXN0X2lkIiwibG5nIiwibGF0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcXVlc3RVcmwiLCJnZXRJbmRleERhdGEiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJ0aGVuIiwicmVzIiwiY2xhIiwiJGFwcGx5IiwiZ2V0QWxsQ2xhc3NpZnkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSTs7Ozs7Ozs7Ozs7Ozs7c0xBQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLHVCQUFVO0FBRFAsUyxRQUdQQyxPLEdBQVU7QUFDTkMseUJBRE0seUJBQ1FDLElBRFIsRUFDYUMsS0FEYixFQUNtQjtBQUNyQixvQkFBSUMsWUFBWUYsSUFBaEI7QUFDQSxvQkFBSUosT0FBTztBQUNYLGlDQUFZLEtBQUtPLEdBRE47QUFFWCxnQ0FBVyxLQUFLQyxHQUZMO0FBR1gsaUNBQVlGO0FBSEQsaUJBQVg7QUFLQSxvQkFBR0EsYUFBYSxHQUFiLElBQW9CQSxhQUFhLEVBQXBDLEVBQXVDO0FBQ25DRyx1QkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHVEQUE0QkMsS0FBS0MsU0FBTCxDQUFlYixJQUFmLENBQTVCLGVBQTBESztBQURoRCxxQkFBZDtBQUdILGlCQUpELE1BSU0sSUFBR0MsYUFBYSxHQUFoQixFQUFvQjtBQUN0QkcsdUJBQUdDLFVBQUgsQ0FBYztBQUNWQyw2QkFBSTtBQURNLHFCQUFkO0FBR0gsaUJBSkssTUFJQSxJQUFHTCxhQUFhLEVBQWhCLEVBQW1CO0FBQ3JCO0FBQ0FHLHVCQUFHQyxVQUFILENBQWM7QUFDVkMsNkJBQUksNEJBQTRCO0FBRHRCLHFCQUFkO0FBR0g7QUFDSjtBQXRCSyxTOzs7Ozs7QUF3QlY7Ozs7Ozs7Ozs7QUFFVUEsbUMsR0FBTUcscUJBQVdDLFk7QUFDakJmLG9DLEdBQU87QUFDVGdCLDBDQUFNQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJIO0FBRHZCLGlDOztBQUdiLDhEQUFZTCxHQUFaLEVBQWdCLE1BQWhCLEVBQXVCWCxJQUF2QixFQUE2Qm9CLElBQTdCLENBQWtDLGVBQUs7QUFDbkMsMkNBQUtuQixTQUFMLEdBQWlCb0IsSUFBSXJCLElBQUosQ0FBU0EsSUFBVCxDQUFjc0IsR0FBL0I7QUFDQSwyQ0FBS0MsTUFBTDtBQUNILGlDQUhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBS0k7QUFDSixpQkFBS0MsY0FBTDtBQUNIOzs7O0VBNUM2QlAsZUFBS1EsSTs7a0JBQWxCNUIsSSIsImZpbGUiOiJjYXRlTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gICAgaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJ1xuICAgIGltcG9ydCBhcHAgZnJvbSAnLi4vdXRpbHMvYXBwJ1xuICAgIGltcG9ydCB1dGlsIGZyb20gJy4uL3V0aWxzL3V0aWwnXG5cbiAgICBpbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbiAgICBpbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2FwaS9yZXF1ZXN0RGF0YSdcbiAgICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5lIGV4dGVuZHMgd2VweS5wYWdle1xuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5YiG57G7J1xuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICBpbWFnZXNCdG46W10sXG4gICAgICAgIH1cbiAgICAgICAgbWV0aG9kcyA9IHtcbiAgICAgICAgICAgIHRvTW9kZWxEZXRhaWwoY19pZCx0aXRsZSl7XG4gICAgICAgICAgICAgICAgbGV0IEluZHVzdF9pZCA9IGNfaWQ7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2xvbmdpdHVkZSc6dGhpcy5sbmcsXG4gICAgICAgICAgICAgICAgJ2xhdGl0dWRlJzp0aGlzLmxhdCxcbiAgICAgICAgICAgICAgICAnSW5kdXN0X2lkJzpJbmR1c3RfaWQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKEluZHVzdF9pZCAhPSA2NjYgJiYgSW5kdXN0X2lkICE9IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6YC4vZGVsaWNpb3VzRm9vZD9pbmZvPSR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9JnRpdGxlPSR7dGl0bGV9YFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKEluZHVzdF9pZCA9PSA2NjYpe1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDonLi9jYXRlTGlzdCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihJbmR1c3RfaWQgPT0gNTApe1xuICAgICAgICAgICAgICAgICAgICAvL+mihuWIuOS4reW/g1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDonLi9jb3Vwb25zQ2VudGVyP3Nob3BJZD0nICsgOTJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICAgIC8v5YiG57G75aSn5YWoXG4gICAgICAgIGFzeW5jIGdldEFsbENsYXNzaWZ5KCl7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSByZXF1ZXN0VXJsLmdldEluZGV4RGF0YVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcXVlc3REYXRhKHVybCwnUE9TVCcsZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc0J0biA9IHJlcy5kYXRhLmRhdGEuY2xhO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIG9uTG9hZCgpe1xuICAgICAgICAgICAgdGhpcy5nZXRBbGxDbGFzc2lmeSgpO1xuICAgICAgICB9XG4gICAgfVxuIl19