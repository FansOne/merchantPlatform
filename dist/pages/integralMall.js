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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var integralMall = function (_wepy$page) {
    _inherits(integralMall, _wepy$page);

    function integralMall() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, integralMall);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = integralMall.__proto__ || Object.getPrototypeOf(integralMall)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '积分商城',
            backgroundColor: '#e5e5e5'
        }, _this.components = {}, _this.data = {
            m_id: '',
            adsorbentScroll: 0,
            adsorbentTabs: true,
            imgUrls: [],
            navbar: [],
            product: [],
            currentTab: 0,
            toview: '',
            page_Num: 0,
            member_points: '' //我的积分
        }, _this.methods = {
            navbarTap: function navbarTap(status) {
                wx.pageScrollTo({ scrollTop: this.adsorbentScroll, duration: 300 });
                this.product = [];
                this.page_Num = 0;
                this.currentTab = status;
                this.GetProductByClass(status == 0 ? this.navbar[0].classid : this.navbar[1].classid);
            },
            integralExplain: function integralExplain() {
                wx.navigateTo({
                    url: './integralExplain?m_id=' + this.m_id
                });
            },
            goodDetail: function goodDetail(ponlyid, c_id) {
                wx.navigateTo({
                    url: './e/page/details?id=' + ponlyid + '&claid=' + c_id + '&integralGoods=integralGoods'
                });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(integralMall, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.m_id = options.m_id;
            _wepy2.default.$instance.globalData.m_id = options.m_id;
            // 获取swiper、积分标题高度
            var query = wx.createSelectorQuery();
            query.select('.page-swiper-wrap').boundingClientRect();
            query.select('.userIntegraMall').boundingClientRect();
            query.exec(function (result) {
                _this2.adsorbentScroll = result[0].height + result[1].height + 15;
                _this2.$apply();
            });
            // 获取积分商城产品分类
            (0, _requestData.requestData)(_requestUrl2.default.GetProductClass, 'POST', {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: "8",
                type: 3,
                token: wx.getStorageSync('token')
            }).then(function (res) {
                _this2.imgUrls = res.data.data.Merchant_Banner;
                _this2.navbar = res.data.data.claid;
                _this2.member_points = res.data.data.member_points;
                _this2.$apply();
                _this2.GetProductByClass(_this2.navbar[0].classid);
            });
        }
    }, {
        key: 'onPageScroll',
        value: function onPageScroll(e) {
            var scrollTop = e.scrollTop;
            if (scrollTop > this.adsorbentScroll) {
                this.adsorbentTabs = false;
                this.$apply();
            } else {
                this.adsorbentTabs = true;
                this.$apply();
            }
        }
    }, {
        key: 'onReachBottom',
        value: function onReachBottom() {
            this.page_Num++;
            this.GetProductByClass(this.currentTab == 0 ? this.navbar[0].classid : this.navbar[1].classid);
        }
        // 根据分类获取商品

    }, {
        key: 'GetProductByClass',
        value: function GetProductByClass(claid) {
            var _this3 = this;

            (0, _requestData.requestData)(_requestUrl2.default.GetProductByClass, 'POST', {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: "8",
                type: 3,
                c_id: claid,
                page_Num: this.page_Num
            }).then(function (res) {
                var productData = res.data.data;
                if (_this3.page_Num == 0) {
                    _this3.product = productData;
                } else if (_this3.page_Num != 0 && productData.length) {
                    productData.forEach(function (element) {
                        _this3.product.push(element);
                    });
                } else if (_this3.page_Num != 0 && productData.length == 0) {
                    wx.showToast({ title: '已加载全部数据', icon: 'none', duration: 500 });
                }
                _this3.$apply();
            });
        }
    }]);

    return integralMall;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(integralMall , 'pages/integralMall'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVncmFsTWFsbC5qcyJdLCJuYW1lcyI6WyJpbnRlZ3JhbE1hbGwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZENvbG9yIiwiY29tcG9uZW50cyIsImRhdGEiLCJtX2lkIiwiYWRzb3JiZW50U2Nyb2xsIiwiYWRzb3JiZW50VGFicyIsImltZ1VybHMiLCJuYXZiYXIiLCJwcm9kdWN0IiwiY3VycmVudFRhYiIsInRvdmlldyIsInBhZ2VfTnVtIiwibWVtYmVyX3BvaW50cyIsIm1ldGhvZHMiLCJuYXZiYXJUYXAiLCJzdGF0dXMiLCJ3eCIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsImR1cmF0aW9uIiwiR2V0UHJvZHVjdEJ5Q2xhc3MiLCJjbGFzc2lkIiwiaW50ZWdyYWxFeHBsYWluIiwibmF2aWdhdGVUbyIsInVybCIsImdvb2REZXRhaWwiLCJwb25seWlkIiwiY19pZCIsImV2ZW50cyIsIm9wdGlvbnMiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInF1ZXJ5IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImV4ZWMiLCJyZXN1bHQiLCJoZWlnaHQiLCIkYXBwbHkiLCJyZXF1ZXN0VXJsIiwiR2V0UHJvZHVjdENsYXNzIiwicF9pZCIsInR5cGUiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwidGhlbiIsInJlcyIsIk1lcmNoYW50X0Jhbm5lciIsImNsYWlkIiwiZSIsInByb2R1Y3REYXRhIiwibGVuZ3RoIiwiZm9yRWFjaCIsInB1c2giLCJlbGVtZW50Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0IsTUFEbkI7QUFFTEMsNkJBQWdCO0FBRlgsUyxR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QixNQUFMO0FBQ0gsYUFsQkQ7QUFtQkg7Ozs7RUFwR3FDVixlQUFLOEIsSTs7a0JBQTFCL0QsWSIsImZpbGUiOiJpbnRlZ3JhbE1hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vYXBpL3JlcXVlc3RVcmwnXG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2FwaS9yZXF1ZXN0RGF0YSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW50ZWdyYWxNYWxsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnp6/liIbllYbln44nLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6JyNlNWU1ZTUnXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBtX2lkOicnLFxuICAgICAgICBhZHNvcmJlbnRTY3JvbGw6MCxcbiAgICAgICAgYWRzb3JiZW50VGFiczp0cnVlLFxuICAgICAgICBpbWdVcmxzOltdLFxuICAgICAgICBuYXZiYXI6IFtdLFxuICAgICAgICBwcm9kdWN0OltdLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICB0b3ZpZXc6JycsXG4gICAgICAgIHBhZ2VfTnVtOjAsXG4gICAgICAgIG1lbWJlcl9wb2ludHM6JycsIC8v5oiR55qE56ev5YiGXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBuYXZiYXJUYXAoc3RhdHVzKXtcbiAgICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe3Njcm9sbFRvcDp0aGlzLmFkc29yYmVudFNjcm9sbCxkdXJhdGlvbjozMDB9KVxuICAgICAgICAgIHRoaXMucHJvZHVjdCA9IFtdXG4gICAgICAgICAgdGhpcy5wYWdlX051bSA9IDBcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBzdGF0dXM7XG4gICAgICAgICAgdGhpcy5HZXRQcm9kdWN0QnlDbGFzcyhzdGF0dXMgPT0gMD90aGlzLm5hdmJhclswXS5jbGFzc2lkOnRoaXMubmF2YmFyWzFdLmNsYXNzaWQpXG4gICAgICAgIH0sXG4gICAgICAgIGludGVncmFsRXhwbGFpbigpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgLi9pbnRlZ3JhbEV4cGxhaW4/bV9pZD0ke3RoaXMubV9pZH1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ29vZERldGFpbChwb25seWlkLGNfaWQpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgLi9lL3BhZ2UvZGV0YWlscz9pZD0ke3Bvbmx5aWR9JmNsYWlkPSR7Y19pZH0maW50ZWdyYWxHb29kcz1pbnRlZ3JhbEdvb2RzYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tX2lkID0gb3B0aW9ucy5tX2lkXG4gICAgICAgIHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEubV9pZCA9IG9wdGlvbnMubV9pZDtcbiAgICAgICAgLy8g6I635Y+Wc3dpcGVy44CB56ev5YiG5qCH6aKY6auY5bqmXG4gICAgICAgIGxldCBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTtcbiAgICAgICAgcXVlcnkuc2VsZWN0KCcucGFnZS1zd2lwZXItd3JhcCcpLmJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHF1ZXJ5LnNlbGVjdCgnLnVzZXJJbnRlZ3JhTWFsbCcpLmJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHF1ZXJ5LmV4ZWMoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZHNvcmJlbnRTY3JvbGwgPXJlc3VsdFswXS5oZWlnaHQgKyByZXN1bHRbMV0uaGVpZ2h0ICsgMTVcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICAgICAgLy8g6I635Y+W56ev5YiG5ZWG5Z+O5Lqn5ZOB5YiG57G7XG4gICAgICAgIHJlcXVlc3REYXRhKHJlcXVlc3RVcmwuR2V0UHJvZHVjdENsYXNzLCdQT1NUJyx7XG4gICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBtX2lkOiBcIjhcIixcbiAgICAgICAgICAgIHR5cGU6IDMsXG4gICAgICAgICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIHRoaXMuaW1nVXJscyA9IHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfQmFubmVyXG4gICAgICAgICAgICB0aGlzLm5hdmJhciA9IHJlcy5kYXRhLmRhdGEuY2xhaWRcbiAgICAgICAgICAgIHRoaXMubWVtYmVyX3BvaW50cyA9IHJlcy5kYXRhLmRhdGEubWVtYmVyX3BvaW50c1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgdGhpcy5HZXRQcm9kdWN0QnlDbGFzcyh0aGlzLm5hdmJhclswXS5jbGFzc2lkKVxuICAgICAgICB9KVxuICAgIH07XG4gICAgb25QYWdlU2Nyb2xsKGUpe1xuICAgICAgICBsZXQgc2Nyb2xsVG9wID0gZS5zY3JvbGxUb3A7XG4gICAgICAgIGlmKHNjcm9sbFRvcCA+IHRoaXMuYWRzb3JiZW50U2Nyb2xsKXtcbiAgICAgICAgICAgIHRoaXMuYWRzb3JiZW50VGFicyA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5hZHNvcmJlbnRUYWJzID0gdHJ1ZVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgfVxuICAgIG9uUmVhY2hCb3R0b20oKXtcbiAgICAgICAgdGhpcy5wYWdlX051bSArK1xuICAgICAgICB0aGlzLkdldFByb2R1Y3RCeUNsYXNzKHRoaXMuY3VycmVudFRhYiA9PSAwP3RoaXMubmF2YmFyWzBdLmNsYXNzaWQ6dGhpcy5uYXZiYXJbMV0uY2xhc3NpZClcbiAgICB9XG4gICAgLy8g5qC55o2u5YiG57G76I635Y+W5ZWG5ZOBXG4gICAgR2V0UHJvZHVjdEJ5Q2xhc3MoY2xhaWQpe1xuICAgICAgICByZXF1ZXN0RGF0YShyZXF1ZXN0VXJsLkdldFByb2R1Y3RCeUNsYXNzLCdQT1NUJyx7XG4gICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBtX2lkOlwiOFwiLFxuICAgICAgICAgICAgdHlwZTozLFxuICAgICAgICAgICAgY19pZDpjbGFpZCxcbiAgICAgICAgICAgIHBhZ2VfTnVtOnRoaXMucGFnZV9OdW1cbiAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgIGxldCBwcm9kdWN0RGF0YSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBpZih0aGlzLnBhZ2VfTnVtID09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMucHJvZHVjdCA9IHByb2R1Y3REYXRhXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLnBhZ2VfTnVtICE9IDAgJiYgcHJvZHVjdERhdGEubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICBwcm9kdWN0RGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5wYWdlX051bSAhPSAwICYmIHByb2R1Y3REYXRhLmxlbmd0aCA9PSAwKXtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn5bey5Yqg6L295YWo6YOo5pWw5o2uJyxpY29uOiAnbm9uZScsZHVyYXRpb246IDUwMH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==