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

var _orderGoods = require('./../components/orderGoods.js');

var _orderGoods2 = _interopRequireDefault(_orderGoods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var order = function (_wepy$page) {
    _inherits(order, _wepy$page);

    function order() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, order);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = order.__proto__ || Object.getPrototypeOf(order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '我的订单'
        }, _this.$repeat = {}, _this.$props = { "orderGoods": { "xmlns:v-bind": "", "v-bind:orderList.sync": "orderList", "v-bind:noOrderList.sync": "noOrderList" } }, _this.$events = {}, _this.components = {
            orderGoods: _orderGoods2.default
        }, _this.data = {
            navbar: ['到店买单', '门店/电商', '本地产品', '外卖'],
            currentTab: 0,
            scrollHeight: '',
            page_Num: 0,
            orderList: {},
            noOrderList: false,
            toview: ''
        }, _this.watch = {
            currentTab: function currentTab(newValue, oldValue) {
                this.page_Num = 0;
                this.orderList = [];
                this.noOrderList = false;
                this.orderListsData(newValue);
            }
        }, _this.methods = {
            navbarTap: function navbarTap(status) {
                this.page_Num = 0;
                this.orderList = [];
                this.noOrderList = false;
                this.currentTab = status;
                this.orderListsData(status);
                if (status == 2) this.toview = 'data2';
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(order, [{
        key: 'onReady',
        value: function onReady() {
            var mineOrderStatus = _wepy2.default.$instance.globalData.mineOrderStatus;
            if (mineOrderStatus != undefined) {
                this.currentTab = mineOrderStatus;
            } else {
                this.orderListsData();
            }
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            wx.getSystemInfo({
                success: function success(res) {
                    //创建节点选择器
                    var height = 0;
                    var query = wx.createSelectorQuery();
                    query.select('.orderTabs').boundingClientRect();
                    query.exec(function (result) {
                        _this2.scrollHeight = res.windowHeight - result[0].height;
                        _this2.$apply();
                    });
                }
            });
        }
    }, {
        key: 'orderListsData',

        // 获取订单列表
        value: function orderListsData(status) {
            var _this3 = this;

            wx.showLoading({ title: '加载中...' });
            var url = _requestUrl2.default.orderList;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                object: 0, //0-消费者 1-商户
                // userid:"15309291231", //objec 为1的时候 填此字段
                type: status ? status : 0, //-1-全部订单 0 到店买单 1 门店/电商 2-本地产品 3-外卖
                page_Num: this.page_Num,
                token: wx.getStorageSync('token')
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                wx.hideLoading();
                if (_this3.page_Num == 0) {
                    _this3.orderList = res.data.data;
                    if (!res.data.data.length) _this3.noOrderList = true;
                    _this3.$apply();
                } else {
                    if (res.data.data.length) {
                        res.data.data.forEach(function (element) {
                            _this3.orderList.push(element);
                        });
                    } else {
                        wx.showToast({ title: '已加载全部数据', icon: 'none' });
                    }
                }
            });
        }
        // 触底加载

    }, {
        key: 'paging',
        value: function paging() {
            this.page_Num++;
            this.orderListsData(this.currentTab);
        }
    }]);

    return order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIm9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm9yZGVyR29vZHMiLCJkYXRhIiwibmF2YmFyIiwiY3VycmVudFRhYiIsInNjcm9sbEhlaWdodCIsInBhZ2VfTnVtIiwib3JkZXJMaXN0Iiwibm9PcmRlckxpc3QiLCJ0b3ZpZXciLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJvcmRlckxpc3RzRGF0YSIsIm1ldGhvZHMiLCJuYXZiYXJUYXAiLCJzdGF0dXMiLCJldmVudHMiLCJtaW5lT3JkZXJTdGF0dXMiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInVuZGVmaW5lZCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXMiLCJoZWlnaHQiLCJxdWVyeSIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJleGVjIiwicmVzdWx0Iiwid2luZG93SGVpZ2h0IiwiJGFwcGx5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInVybCIsInJlcXVlc3RVcmwiLCJwX2lkIiwib2JqZWN0IiwidHlwZSIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJsZW5ndGgiLCJmb3JFYWNoIiwicHVzaCIsImVsZW1lbnQiLCJzaG93VG9hc3QiLCJpY29uIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxnQkFBZSxFQUFoQixFQUFtQix5QkFBd0IsV0FBM0MsRUFBdUQsMkJB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SztBQUNELHdCQUFHVCxJQUFJeEIsSUFBSixDQUFTQSxJQUFULENBQWM2QyxNQUFqQixFQUF3QjtBQUNwQnJCLDRCQUFJeEIsSUFBSixDQUFTQSxJQUFULENBQWM4QyxPQUFkLENBQXNCLG1CQUFXO0FBQzdCLG1DQUFLekMsU0FBTCxDQUFlMEMsSUFBZixDQUFvQkMsT0FBcEI7QUFDSCx5QkFGRDtBQUdILHFCQUpELE1BSUs7QUFDRDNCLDJCQUFHNEIsU0FBSCxDQUFhLEVBQUNkLE9BQU8sU0FBUixFQUFrQmUsTUFBSyxNQUF2QixFQUFiO0FBQ0g7QUFDSjtBQUNKLGFBZkQ7QUFnQkg7QUFDRDs7OztpQ0FDUTtBQUNKLGlCQUFLOUMsUUFBTDtBQUNBLGlCQUFLTyxjQUFMLENBQW9CLEtBQUtULFVBQXpCO0FBQ0g7Ozs7RUFoRzhCZSxlQUFLa0MsSTs7a0JBQW5CM0QsSyIsImZpbGUiOiJvcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vYXBpL3JlcXVlc3REYXRhJ1xuXG5pbXBvcnQgb3JkZXJHb29kcyBmcm9tICcuLi9jb21wb25lbnRzL29yZGVyR29vZHMnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBvcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K6i5Y2VJ1xuICAgIH07XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm9yZGVyR29vZHNcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9yZGVyTGlzdC5zeW5jXCI6XCJvcmRlckxpc3RcIixcInYtYmluZDpub09yZGVyTGlzdC5zeW5jXCI6XCJub09yZGVyTGlzdFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICAgIG9yZGVyR29vZHM6b3JkZXJHb29kc1xuICAgIH07XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBuYXZiYXI6IFsn5Yiw5bqX5Lmw5Y2VJywgJ+mXqOW6ly/nlLXllYYnLCAn5pys5Zyw5Lqn5ZOBJywgJ+WkluWNliddLFxuICAgICAgICBjdXJyZW50VGFiOiAwLFxuICAgICAgICBzY3JvbGxIZWlnaHQ6JycsXG4gICAgICAgIHBhZ2VfTnVtOjAsXG4gICAgICAgIG9yZGVyTGlzdDp7fSxcbiAgICAgICAgbm9PcmRlckxpc3Q6ZmFsc2UsXG4gICAgICAgIHRvdmlldzonJyxcbiAgICB9O1xuICAgIHdhdGNoID0ge1xuICAgICAgICBjdXJyZW50VGFiIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnBhZ2VfTnVtID0gMFxuICAgICAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgICAgICB0aGlzLm5vT3JkZXJMaXN0ID0gZmFsc2VcbiAgICAgICAgICB0aGlzLm9yZGVyTGlzdHNEYXRhKG5ld1ZhbHVlKVxuICAgICAgICB9XG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBuYXZiYXJUYXAoc3RhdHVzKXtcbiAgICAgICAgICB0aGlzLnBhZ2VfTnVtID0gMFxuICAgICAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgICAgICB0aGlzLm5vT3JkZXJMaXN0ID0gZmFsc2VcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBzdGF0dXM7XG4gICAgICAgICAgdGhpcy5vcmRlckxpc3RzRGF0YShzdGF0dXMpXG4gICAgICAgICAgaWYoc3RhdHVzID09IDIpIHRoaXMudG92aWV3ID0gJ2RhdGEyJ1xuICAgICAgICB9LFxuICAgIH07XG5cbiAgICBldmVudHMgPSB7XG4gICAgfTtcbiAgICBvblJlYWR5KCl7XG4gICAgICAgIGxldCBtaW5lT3JkZXJTdGF0dXMgPSB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLm1pbmVPcmRlclN0YXR1cztcbiAgICAgICAgaWYobWluZU9yZGVyU3RhdHVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFiID0gbWluZU9yZGVyU3RhdHVzXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5vcmRlckxpc3RzRGF0YSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKCkge1xuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICBzdWNjZXNzOihyZXMpPT4ge1xuICAgICAgICAgICAgICAvL+WIm+W7uuiKgueCuemAieaLqeWZqFxuICAgICAgICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgbGV0IHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpO1xuICAgICAgICAgICAgICBxdWVyeS5zZWxlY3QoJy5vcmRlclRhYnMnKS5ib3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICBxdWVyeS5leGVjKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodCAtIHJlc3VsdFswXS5oZWlnaHRcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfTtcbiAgICAvLyDojrflj5borqLljZXliJfooahcbiAgICBvcmRlckxpc3RzRGF0YShzdGF0dXMpe1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7dGl0bGU6ICfliqDovb3kuK0uLi4nfSk7XG4gICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLm9yZGVyTGlzdDtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBvYmplY3Q6MCwvLzAt5raI6LS56ICFIDEt5ZWG5oi3XG4gICAgICAgICAgICAvLyB1c2VyaWQ6XCIxNTMwOTI5MTIzMVwiLCAvL29iamVjIOS4ujHnmoTml7blgJkg5aGr5q2k5a2X5q61XG4gICAgICAgICAgICB0eXBlOiBzdGF0dXM/c3RhdHVzOjAsLy8tMS3lhajpg6jorqLljZUgMCDliLDlupfkubDljZUgMSDpl6jlupcv55S15ZWGIDIt5pys5Zyw5Lqn5ZOBIDMt5aSW5Y2WXG4gICAgICAgICAgICBwYWdlX051bTogdGhpcy5wYWdlX051bSxcbiAgICAgICAgICAgIHRva2VuOnd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIGlmKHRoaXMucGFnZV9OdW09PTApe1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0ID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIGlmKCFyZXMuZGF0YS5kYXRhLmxlbmd0aCkgdGhpcy5ub09yZGVyTGlzdCA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5kYXRhLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0LnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICflt7LliqDovb3lhajpg6jmlbDmja4nLGljb246J25vbmUnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyDop6blupXliqDovb1cbiAgICBwYWdpbmcoKXtcbiAgICAgICAgdGhpcy5wYWdlX051bSsrXG4gICAgICAgIHRoaXMub3JkZXJMaXN0c0RhdGEodGhpcy5jdXJyZW50VGFiKVxuICAgIH1cbn1cbiJdfQ==