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

var _userSelectUseCoupon = require('./../components/userSelectUseCoupon.js');

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
                    _this2.money = _util2.default.getELowPrice(res.data);
                    if (res.data[0].goodsId) {
                        res.data.forEach(function (item, index) {
                            item.price = item.price * 100;
                        });
                        _this2.goodId = _util2.default.getELowPrice(res.data);
                    } else {
                        res.data.forEach(function (item, index) {
                            _this2.goodId.push(item.good_id);
                        });
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
                    // money:this.money,
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


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(selectCoupon , 'pages/selectCoupon'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdENvdXBvbi5qcyJdLCJuYW1lcyI6WyJzZWxlY3RDb3Vwb24iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidXNlclNlbGVjdFVzZUNvdXBvbiIsImRhdGEiLCJ1c2VyQ291cG9uIiwiZ29vZElkIiwibm9kYXRhIiwibW9uZXkiLCJtZXRob2RzIiwiZXZlbnRzIiwib3B0aW9ucyIsInRva2VuIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsImZhc3RNb25leSIsInBheW1lbnRDb3Vwb25zIiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJ1dGlsIiwiZ2V0RUxvd1ByaWNlIiwicmVzIiwiZ29vZHNJZCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJwcmljZSIsInB1c2giLCJnb29kX2lkIiwidXNlckNvdXBvbnMiLCIkYXBwbHkiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImFwaSIsImFwaU1hbGwiLCJtZXRob2QiLCJtZXJjaGFudF9pZCIsInNob3BJZCIsImdvb2RzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9yZGVyX3R5cGUiLCJoZWFkZXIiLCJ0aGVuIiwibWVzc2FnZSIsImJlZ2luX3RpbWUiLCJlbmRfdGltZSIsInRpbWVzdGFtcFRvVGltZSIsImxlbmd0aCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLHVCQUFzQixFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHlCQUF3QixZQUEzQyxFQUF2QixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOQyxpQ0FBb0JBO0FBRGQs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QUFDQSwyQkFBS3lCLE1BQUw7QUFDSCxpQkFIRCxNQUdLO0FBQ0QsMkJBQUt6QixNQUFMLEdBQWMsSUFBZDtBQUNBLDJCQUFLeUIsTUFBTDtBQUNIO0FBQ0QsdUJBQUtBLE1BQUw7QUFDSCxhQWhDRDtBQWlDSDs7OztFQTNIcUNDLGVBQUttQixJOztrQkFBMUJ4RCxZIiwiZmlsZSI6InNlbGVjdENvdXBvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbHMvdXRpbCc7XG5pbXBvcnQgdXNlclNlbGVjdFVzZUNvdXBvbiBmcm9tICcuLi9jb21wb25lbnRzL3VzZXJTZWxlY3RVc2VDb3Vwb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZWxlY3RDb3Vwb24gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeaUr+S7mOWNoeWIuCcsXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widXNlclNlbGVjdFVzZUNvdXBvblwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c3luY1RpdGxlLnN5bmNcIjpcInVzZXJDb3Vwb25cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICB1c2VyU2VsZWN0VXNlQ291cG9uOnVzZXJTZWxlY3RVc2VDb3Vwb25cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJDb3Vwb246W10sXG4gICAgICAgIGdvb2RJZDpbXSxcbiAgICAgICAgbm9kYXRhOnRydWUsXG4gICAgICAgIG1vbmV5OjBcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgIGlmKG9wdGlvbnMuZmFzdE1vbmV5KXtcbiAgICAgICAgICAgIHRoaXMucGF5bWVudENvdXBvbnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgLy/ojrflj5bllYblk4FpZFxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIGtleTonc2VsZWN0QnV5JyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57XG4gICAgICAgICAgICAgICAgdGhpcy5tb25leSA9IHV0aWwuZ2V0RUxvd1ByaWNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YVswXS5nb29kc0lkKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucHJpY2UgPSBpdGVtLnByaWNlKjEwMDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb29kSWQgPSB1dGlsLmdldEVMb3dQcmljZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvb2RJZC5wdXNoKGl0ZW0uZ29vZF9pZClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5tb25leSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbnMob3B0aW9ucylcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXltZW50Q291cG9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKTsgIFxuICAgIH07XG4gICAgLy8g55So5oi35Luj6YeR5Yi4XG4gICAgdXNlckNvdXBvbnMob3B0aW9ucyl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsICsgJ2FwaS9teUNhcmQnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDpvcHRpb25zLnNob3BJZCxcbiAgICAgICAgICAgICAgICBnb29kczogSlNPTi5zdHJpbmdpZnkodGhpcy5nb29kSWQpLFxuICAgICAgICAgICAgICAgIC8vIG1vbmV5OnRoaXMubW9uZXksXG4gICAgICAgICAgICAgICAgb3JkZXJfdHlwZToxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICByZXMuZGF0YS5tZXNzYWdlLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgICAgICAgICAgaWYoaXRlbS5iZWdpbl90aW1lID09IDB8fGl0ZW0uZW5kX3RpbWUgPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5iZWdpbl90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5iZWdpbl90aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmRfdGltZSA9IHV0aWwudGltZXN0YW1wVG9UaW1lKGl0ZW0uZW5kX3RpbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnVzZXJDb3Vwb24gPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgaWYoIXJlcy5kYXRhLm1lc3NhZ2UubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGF0YSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm9kYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pOyAgICAgICAgICAgXG4gICAgfVxuICAgIC8v5Lmw5Y2V6YCJ5oup5LyY5oOg5Yi4XG4gICAgcGF5bWVudENvdXBvbnMob3B0aW9ucyl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsICsgJ2FwaS91c2VyX2NvdXBvbnMnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDpvcHRpb25zLnNob3BJZCxcbiAgICAgICAgICAgICAgICBvcmRlcl90eXBlOjMsXG4gICAgICAgICAgICAgICAgbW9uZXk6b3B0aW9ucy5mYXN0TW9uZXlcbiAgICAgICAgICAgICAgICAvLyBtb25leTpvcHRpb25zLmZhc3RNb25leVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgcmVzLmRhdGEubWVzc2FnZS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0uYmVnaW5fdGltZSA9PSAwfHxpdGVtLmVuZF90aW1lID09IDApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYmVnaW5fdGltZSA9IHV0aWwudGltZXN0YW1wVG9UaW1lKGl0ZW0uYmVnaW5fdGltZSk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW5kX3RpbWUgPSB1dGlsLnRpbWVzdGFtcFRvVGltZShpdGVtLmVuZF90aW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy51c2VyQ291cG9uID0gcmVzLmRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgIGlmKCFyZXMuZGF0YS5tZXNzYWdlLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RhdGEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGF0YSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KTsgICAgICAgICAgIFxuICAgIH1cbn1cbiJdfQ==