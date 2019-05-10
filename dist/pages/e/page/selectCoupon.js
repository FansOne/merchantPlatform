'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _userSelectUseCoupon = require('./../../../components/userSelectUseCoupon.js');

var _userSelectUseCoupon2 = _interopRequireDefault(_userSelectUseCoupon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectCoupon = function (_wepy$page) {
    _inherits(selectCoupon, _wepy$page);

    function selectCoupon() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, selectCoupon);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = selectCoupon.__proto__ || Object.getPrototypeOf(selectCoupon)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '选择支付卡券'
        }, _this.$repeat = {}, _this.$props = { "userSelectUseCoupon": { "xmlns:v-bind": "", "v-bind:syncTitle.sync": "userCoupon" } }, _this.$events = {}, _this.components = {
            userSelectUseCoupon: _userSelectUseCoupon2.default
        }, _this.data = {
            userCoupon: [],
            goodId: [],
            nodata: true,
            money: 0
        }, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(selectCoupon, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            //获取token
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
            if (options.fastMoney) {
                this.paymentCoupons(options);
            }
            //获取商品id
            wx.getStorage({
                key: 'selectBuy',
                success: function success(res) {
                    // this.money = util.getELowPrice(res.data);
                    if (res.data[0].goodsId) {
                        res.data.forEach(function (item, index) {
                            _this2.goodId.push(item.id);
                        });
                    } else {
                        // res.data.forEach((item,index)=>{
                        //     this.goodId.push(item.good_id) 
                        // })
                        _this2.goodId = _util2.default.getELowPrice(res.data);
                    }
                    if (options.money) {
                        _this2.userCoupons(options);
                    } else {
                        _this2.paymentCoupons(options);
                    }
                    _this2.$apply();
                }
            });
            this.$apply();
        }
    }, {
        key: 'userCoupons',

        // 用户代金券
        value: function userCoupons(options) {
            var _this3 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/myCard',
                method: 'GET',
                data: {
                    merchant_id: options.shopId,
                    goods: JSON.stringify(this.goodId),
                    // money:this.money/100,
                    // money:12,
                    // money:Number(options.money)-Number(options.normalsend) || '',
                    order_type: 1
                },
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(function (res) {
                res.data.message.forEach(function (item, index) {
                    if (item.begin_time == 0 || item.end_time == 0) {
                        return false;
                    } else {
                        item.begin_time = _util2.default.timestampToTime(item.begin_time);
                        item.end_time = _util2.default.timestampToTime(item.end_time);
                    }
                });
                _this3.userCoupon = res.data.message;
                if (!res.data.message.length) {
                    _this3.nodata = false;
                    _this3.$apply();
                } else {
                    _this3.nodata = true;
                    _this3.$apply();
                }
                _this3.$apply();
            });
        }
        //买单选择优惠券

    }, {
        key: 'paymentCoupons',
        value: function paymentCoupons(options) {
            var _this4 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/user_coupons',
                method: 'GET',
                data: {
                    merchant_id: options.shopId,
                    order_type: 3,
                    money: options.fastMoney
                    // money:options.fastMoney
                },
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(function (res) {
                res.data.message.forEach(function (item, index) {
                    if (item.begin_time == 0 || item.end_time == 0) {
                        return false;
                    } else {
                        item.begin_time = _util2.default.timestampToTime(item.begin_time);
                        item.end_time = _util2.default.timestampToTime(item.end_time);
                    }
                });
                _this4.userCoupon = res.data.message;
                if (!res.data.message.length) {
                    _this4.nodata = false;
                    _this4.$apply();
                } else {
                    _this4.nodata = true;
                    _this4.$apply();
                }
                _this4.$apply();
            });
        }
    }]);

    return selectCoupon;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(selectCoupon , 'pages/e/page/selectCoupon'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdENvdXBvbi5qcyJdLCJuYW1lcyI6WyJzZWxlY3RDb3Vwb24iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidXNlclNlbGVjdFVzZUNvdXBvbiIsImRhdGEiLCJ1c2VyQ291cG9uIiwiZ29vZElkIiwibm9kYXRhIiwibW9uZXkiLCJtZXRob2RzIiwiZXZlbnRzIiwib3B0aW9ucyIsInRva2VuIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsImZhc3RNb25leSIsInBheW1lbnRDb3Vwb25zIiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJnb29kc0lkIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJpZCIsInV0aWwiLCJnZXRFTG93UHJpY2UiLCJ1c2VyQ291cG9ucyIsIiRhcHBseSIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiYXBpIiwiYXBpTWFsbCIsIm1ldGhvZCIsIm1lcmNoYW50X2lkIiwic2hvcElkIiwiZ29vZHMiLCJKU09OIiwic3RyaW5naWZ5Iiwib3JkZXJfdHlwZSIsImhlYWRlciIsInRoZW4iLCJtZXNzYWdlIiwiYmVnaW5fdGltZSIsImVuZF90aW1lIiwidGltZXN0YW1wVG9UaW1lIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsdUJBQXNCLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLFlBQTNDLEVBQXZCLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DLGlDQUFvQkE7QUFEZCxTLFFBR1ZDLEksR0FB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ZWN0Q291cG9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vYXBpL2FwaSc7XG5pbXBvcnQgdXRpbCBmcm9tICcuLi8uLi8uLi91dGlscy91dGlsJztcbmltcG9ydCB1c2VyU2VsZWN0VXNlQ291cG9uIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdXNlclNlbGVjdFVzZUNvdXBvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNlbGVjdENvdXBvbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YCJ5oup5pSv5LuY5Y2h5Yi4JyxcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ1c2VyU2VsZWN0VXNlQ291cG9uXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzeW5jVGl0bGUuc3luY1wiOlwidXNlckNvdXBvblwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIHVzZXJTZWxlY3RVc2VDb3Vwb246dXNlclNlbGVjdFVzZUNvdXBvblxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgICAgdXNlckNvdXBvbjpbXSxcbiAgICAgICAgZ29vZElkOltdLFxuICAgICAgICBub2RhdGE6dHJ1ZSxcbiAgICAgICAgbW9uZXk6MFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgLy/ojrflj5Z0b2tlblxuICAgICAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgaWYob3B0aW9ucy5mYXN0TW9uZXkpe1xuICAgICAgICAgICAgdGhpcy5wYXltZW50Q291cG9ucyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICAvL+iOt+WPluWVhuWTgWlkXG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OidzZWxlY3RCdXknLFxuICAgICAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm1vbmV5ID0gdXRpbC5nZXRFTG93UHJpY2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhWzBdLmdvb2RzSWQpe1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nb29kSWQucHVzaChpdGVtLmlkKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAvLyByZXMuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nb29kSWQucHVzaChpdGVtLmdvb2RfaWQpIFxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2RJZCA9IHV0aWwuZ2V0RUxvd1ByaWNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5tb25leSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbnMob3B0aW9ucylcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50Q291cG9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKTsgIFxuICAgIH07XG4gICAgLy8g55So5oi35Luj6YeR5Yi4XG4gICAgdXNlckNvdXBvbnMob3B0aW9ucyl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsICsgJ2FwaS9teUNhcmQnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDpvcHRpb25zLnNob3BJZCxcbiAgICAgICAgICAgICAgICBnb29kczogSlNPTi5zdHJpbmdpZnkodGhpcy5nb29kSWQpLFxuICAgICAgICAgICAgICAgIC8vIG1vbmV5OnRoaXMubW9uZXkvMTAwLFxuICAgICAgICAgICAgICAgIC8vIG1vbmV5OjEyLFxuICAgICAgICAgICAgICAgIC8vIG1vbmV5Ok51bWJlcihvcHRpb25zLm1vbmV5KS1OdW1iZXIob3B0aW9ucy5ub3JtYWxzZW5kKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBvcmRlcl90eXBlOjFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLmJlZ2luX3RpbWUgPT0gMHx8aXRlbS5lbmRfdGltZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJlZ2luX3RpbWUgPSB1dGlsLnRpbWVzdGFtcFRvVGltZShpdGVtLmJlZ2luX3RpbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZF90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5lbmRfdGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbiA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICBpZighcmVzLmRhdGEubWVzc2FnZS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMubm9kYXRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RhdGEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSk7ICAgICAgICAgICBcbiAgICB9XG4gICAgLy/kubDljZXpgInmi6nkvJjmg6DliLhcbiAgICBwYXltZW50Q291cG9ucyhvcHRpb25zKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwgKyAnYXBpL3VzZXJfY291cG9ucycsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lcmNoYW50X2lkOm9wdGlvbnMuc2hvcElkLFxuICAgICAgICAgICAgICAgIG9yZGVyX3R5cGU6MyxcbiAgICAgICAgICAgICAgICBtb25leTpvcHRpb25zLmZhc3RNb25leVxuICAgICAgICAgICAgICAgIC8vIG1vbmV5Om9wdGlvbnMuZmFzdE1vbmV5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICByZXMuZGF0YS5tZXNzYWdlLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5iZWdpbl90aW1lID09IDB8fGl0ZW0uZW5kX3RpbWUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5iZWdpbl90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5iZWdpbl90aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmRfdGltZSA9IHV0aWwudGltZXN0YW1wVG9UaW1lKGl0ZW0uZW5kX3RpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnVzZXJDb3Vwb24gPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgaWYoIXJlcy5kYXRhLm1lc3NhZ2UubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGF0YSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm9kYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pOyAgICAgICAgICAgXG4gICAgfVxufVxuIl19