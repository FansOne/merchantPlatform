'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./../../../../utils/util.js');

var _util2 = _interopRequireDefault(_util);

var _userSelectUseCoupon = require('./../../../../components/userSelectUseCoupon.js');

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
            goodId: '',
            nodata: true,
            goodsIdArr: [],
            money: ''
        }, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(selectCoupon, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            //获取token
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
            //获取商品的id
            wx.getStorage({
                key: 'deliverData',
                success: function success(res) {
                    // this.money = util.getLowPrice(res.data.orderGoods);
                    // res.data.orderGoods.forEach((item,index)=>{
                    //     this.goodsIdArr.push(item.id)
                    // })
                    _this2.goodsIdArr = _util2.default.getLowPrice(res.data.orderGoods);
                    console.log(_this2.goodsIdArr);
                    _this2.userCoupons(options);
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
                    goods: JSON.stringify(this.goodsIdArr),
                    order_type: 2
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
    }]);

    return selectCoupon;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(selectCoupon , 'pages/f/page/d/selectCoupon'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbGVjdENvdXBvbi5qcyJdLCJuYW1lcyI6WyJzZWxlY3RDb3Vwb24iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwidXNlclNlbGVjdFVzZUNvdXBvbiIsImRhdGEiLCJ1c2VyQ291cG9uIiwiZ29vZElkIiwibm9kYXRhIiwiZ29vZHNJZEFyciIsIm1vbmV5IiwibWV0aG9kcyIsImV2ZW50cyIsIm9wdGlvbnMiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJnZXRTdG9yYWdlIiwia2V5Iiwic3VjY2VzcyIsInV0aWwiLCJnZXRMb3dQcmljZSIsInJlcyIsIm9yZGVyR29vZHMiLCJjb25zb2xlIiwibG9nIiwidXNlckNvdXBvbnMiLCIkYXBwbHkiLCJ3ZXB5IiwicmVxdWVzdCIsInVybCIsImFwaSIsImFwaU1hbGwiLCJtZXRob2QiLCJtZXJjaGFudF9pZCIsInNob3BJZCIsImdvb2RzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9yZGVyX3R5cGUiLCJoZWFkZXIiLCJ0aGVuIiwibWVzc2FnZSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJiZWdpbl90aW1lIiwiZW5kX3RpbWUiLCJ0aW1lc3RhbXBUb1RpbWUiLCJsZW5ndGgiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdWQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyx1QkFBc0IsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix5QkFBd0IsWUFBM0MsRUFBdkIsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsaUNBQW9CQTtBQURkLFMsUUFHVkMsSSxHQUFPO0FBQ0hDLHdCQUFXLEVBRFI7QUFFSEMsb0JBQU8sRUFGSjtBQUdIQyxvQkFBTyxJQUhKO0FBSUhDLHdCQUFXLEVBSlI7QUFLSEMsbUJBQU07QUFMSCxTLFFBT1BDLE8sR0FBVSxFLFFBR1ZDLE0sR0FBUyxFOzs7OzsrQkFDRkMsTyxFQUFTO0FBQUE7O0FBQ1o7QUFDQSxnQkFBSUMsUUFBUUMsR0FBR0MsY0FBSCxDQUFrQixjQUFsQixDQUFaO0FBQ0EsaUJBQUtGLEtBQUwsR0FBYUEsTUFBTUcsWUFBbkI7QUFDQTtBQUNBRixlQUFHRyxVQUFILENBQWM7QUFDVkMscUJBQUksYUFETTtBQUVWQyx5QkFBUSxzQkFBSztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQUtYLFVBQUwsR0FBa0JZLGVBQUtDLFdBQUwsQ0FBaUJDLElBQUlsQixJQUFKLENBQVNtQixVQUExQixDQUFsQjtBQUNBQyw0QkFBUUMsR0FBUixDQUFZLE9BQUtqQixVQUFqQjtBQUNBLDJCQUFLa0IsV0FBTCxDQUFpQmQsT0FBakI7QUFDQSwyQkFBS2UsTUFBTDtBQUNIO0FBWFMsYUFBZDtBQWFBLGlCQUFLQSxNQUFMO0FBQ0g7Ozs7QUFDRDtvQ0FDWWYsTyxFQUFRO0FBQUE7O0FBQ2hCZ0IsMkJBQUtDLE9BQUwsQ0FBYTtBQUNUQyxxQkFBS0MsY0FBSUMsT0FBSixHQUFjLFlBRFY7QUFFVEMsd0JBQVEsS0FGQztBQUdUN0Isc0JBQU07QUFDRjhCLGlDQUFZdEIsUUFBUXVCLE1BRGxCO0FBRUZDLDJCQUFPQyxLQUFLQyxTQUFMLENBQWUsS0FBSzlCLFVBQXBCLENBRkw7QUFHRitCLGdDQUFXO0FBSFQsaUJBSEc7QUFRVEMsd0JBQU87QUFDSCw4QkFBUyxnQ0FETjtBQUVILG9DQUFlLGlEQUZaO0FBR0gscUNBQWdCLFlBQVksS0FBSzNCO0FBSDlCO0FBUkUsYUFBYixFQWFHNEIsSUFiSCxDQWFRLFVBQUNuQixHQUFELEVBQU87QUFDWEEsb0JBQUlsQixJQUFKLENBQVNzQyxPQUFULENBQWlCQyxPQUFqQixDQUF5QixVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBYztBQUNuQyx3QkFBR0QsS0FBS0UsVUFBTCxJQUFtQixDQUFuQixJQUFzQkYsS0FBS0csUUFBTCxJQUFpQixDQUExQyxFQUE0QztBQUN4QywrQkFBTyxLQUFQO0FBQ0gscUJBRkQsTUFFSztBQUNESCw2QkFBS0UsVUFBTCxHQUFrQjFCLGVBQUs0QixlQUFMLENBQXFCSixLQUFLRSxVQUExQixDQUFsQjtBQUNBRiw2QkFBS0csUUFBTCxHQUFnQjNCLGVBQUs0QixlQUFMLENBQXFCSixLQUFLRyxRQUExQixDQUFoQjtBQUNIO0FBQ0osaUJBUEQ7QUFRQSx1QkFBSzFDLFVBQUwsR0FBa0JpQixJQUFJbEIsSUFBSixDQUFTc0MsT0FBM0I7QUFDQSxvQkFBRyxDQUFDcEIsSUFBSWxCLElBQUosQ0FBU3NDLE9BQVQsQ0FBaUJPLE1BQXJCLEVBQTRCO0FBQ3hCLDJCQUFLMUMsTUFBTCxHQUFjLEtBQWQ7QUFDQSwyQkFBS29CLE1BQUw7QUFDSCxpQkFIRCxNQUdLO0FBQ0QsMkJBQUtwQixNQUFMLEdBQWMsSUFBZDtBQUNBLDJCQUFLb0IsTUFBTDtBQUNIO0FBQ0QsdUJBQUtBLE1BQUw7QUFDSCxhQS9CRDtBQWdDSDs7OztFQTNFcUNDLGVBQUtzQixJOztrQkFBMUJ0RCxZIiwiZmlsZSI6InNlbGVjdENvdXBvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uLy4uL2FwaS9hcGknO1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vLi4vLi4vLi4vdXRpbHMvdXRpbCc7XG5pbXBvcnQgdXNlclNlbGVjdFVzZUNvdXBvbiBmcm9tICcuLi8uLi8uLi8uLi9jb21wb25lbnRzL3VzZXJTZWxlY3RVc2VDb3Vwb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZWxlY3RDb3Vwb24gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeaUr+S7mOWNoeWIuCcsXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1widXNlclNlbGVjdFVzZUNvdXBvblwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c3luY1RpdGxlLnN5bmNcIjpcInVzZXJDb3Vwb25cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgICB1c2VyU2VsZWN0VXNlQ291cG9uOnVzZXJTZWxlY3RVc2VDb3Vwb25cbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIHVzZXJDb3Vwb246W10sXG4gICAgICAgIGdvb2RJZDonJyxcbiAgICAgICAgbm9kYXRhOnRydWUsXG4gICAgICAgIGdvb2RzSWRBcnI6W10sXG4gICAgICAgIG1vbmV5OicnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICAvL+iOt+WPlnRva2VuXG4gICAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgICAgICAvL+iOt+WPluWVhuWTgeeahGlkXG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5OidkZWxpdmVyRGF0YScsXG4gICAgICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubW9uZXkgPSB1dGlsLmdldExvd1ByaWNlKHJlcy5kYXRhLm9yZGVyR29vZHMpO1xuICAgICAgICAgICAgICAgIC8vIHJlcy5kYXRhLm9yZGVyR29vZHMuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5nb29kc0lkQXJyLnB1c2goaXRlbS5pZClcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIHRoaXMuZ29vZHNJZEFyciA9IHV0aWwuZ2V0TG93UHJpY2UocmVzLmRhdGEub3JkZXJHb29kcyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5nb29kc0lkQXJyKVxuICAgICAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKTsgIFxuICAgIH07XG4gICAgLy8g55So5oi35Luj6YeR5Yi4XG4gICAgdXNlckNvdXBvbnMob3B0aW9ucyl7XG4gICAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IGFwaS5hcGlNYWxsICsgJ2FwaS9teUNhcmQnLFxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXJjaGFudF9pZDpvcHRpb25zLnNob3BJZCxcbiAgICAgICAgICAgICAgICBnb29kczogSlNPTi5zdHJpbmdpZnkodGhpcy5nb29kc0lkQXJyKSxcbiAgICAgICAgICAgICAgICBvcmRlcl90eXBlOjJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLmJlZ2luX3RpbWUgPT0gMHx8aXRlbS5lbmRfdGltZSA9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmJlZ2luX3RpbWUgPSB1dGlsLnRpbWVzdGFtcFRvVGltZShpdGVtLmJlZ2luX3RpbWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZF90aW1lID0gdXRpbC50aW1lc3RhbXBUb1RpbWUoaXRlbS5lbmRfdGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMudXNlckNvdXBvbiA9IHJlcy5kYXRhLm1lc3NhZ2U7XG4gICAgICAgICAgICBpZighcmVzLmRhdGEubWVzc2FnZS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIHRoaXMubm9kYXRhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RhdGEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSk7ICAgICAgICAgICBcbiAgICB9XG59XG4iXX0=