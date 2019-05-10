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

var _util = require('./../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var payMentSuccess = function (_wepy$page) {
    _inherits(payMentSuccess, _wepy$page);

    function payMentSuccess() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, payMentSuccess);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = payMentSuccess.__proto__ || Object.getPrototypeOf(payMentSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '支付成功',
            disableScroll: true
        }, _this.components = {}, _this.data = {
            money: 0,
            memberMess: null,
            m_id: '',
            getPhoneNumber: ''
        }, _this.methods = {
            backRoute: function backRoute() {
                if (this.memberMess.isMem != 2) {
                    wx.switchTab({
                        url: './order'
                    });
                } else {
                    return;
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(payMentSuccess, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.money = options.money;
            this.m_id = options.m_id;
            // 会员Data
            var cardMessage = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: this.m_id,
                type: "0",
                token: wx.getStorageSync('token')
            };
            (0, _requestData.requestData)(_requestUrl2.default.cardMessage, 'POST', cardMessage).then(function (res) {
                if (res.data.data[0].isMem == 2) {
                    //会员需实名认证
                    _this2.getPhoneNumber = 'getPhoneNumber';
                }
                _this2.memberMess = res.data.data[0];
                _this2.$apply();
            });
        }
    }, {
        key: 'bindgetphonenumber',

        // 微信解密接口（获取手机号明文）
        value: function bindgetphonenumber(e) {
            if (e.detail.errMsg == 'getPhoneNumber:ok') {
                (0, _requestData.requestData)(_requestUrl2.default.getwxUserInfo, "POST", {
                    p_id: _wepy2.default.$instance.globalData.p_id,
                    m_id: this.m_id,
                    type: 0,
                    token: wx.getStorageSync('token'),
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                }).then(function (res) {
                    var phoneNumber = res.data.data.phoneNumber;
                    (0, _requestData.requestData)(_requestUrl2.default.memUserInfo, 'POST', {
                        type: 1,
                        token: wx.getStorageSync('token'),
                        wxphone: phoneNumber,
                        memname: ""
                    }).then(function (res) {
                        wx.reLaunch({
                            url: './index'
                        });
                    });
                });
            }
        }
    }]);

    return payMentSuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(payMentSuccess , 'pages/payMentSuccess'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheU1lbnRTdWNjZXNzLmpzIl0sIm5hbWVzIjpbInBheU1lbnRTdWNjZXNzIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCJjb21wb25lbnRzIiwiZGF0YSIsIm1vbmV5IiwibWVtYmVyTWVzcyIsIm1faWQiLCJnZXRQaG9uZU51bWJlciIsIm1ldGhvZHMiLCJiYWNrUm91dGUiLCJpc01lbSIsInd4Iiwic3dpdGNoVGFiIiwidXJsIiwiZXZlbnRzIiwib3B0aW9ucyIsImNhcmRNZXNzYWdlIiwicF9pZCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwidHlwZSIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJhcGkiLCJ0aGVuIiwicmVzIiwiJGFwcGx5IiwiZSIsImRldGFpbCIsImVyck1zZyIsImdldHd4VXNlckluZm8iLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJwaG9uZU51bWJlciIsIm1lbVVzZXJJbmZvIiwid3hwaG9uZSIsIm1lbW5hbWUiLCJyZUxhdW5jaCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXVCLE1BRGxCO0FBRUxDLDJCQUFjO0FBRlQsUyxRQUlUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDSEMsbUJBQU0sQ0FESDtBQUVIQyx3QkFBVyxJQUZSO0FBR0hDLGtCQUFLLEVBSEY7QUFJSEMsNEJBQWU7QUFKWixTLFFBTVBDLE8sR0FBVTtBQUNOQyxxQkFETSx1QkFDSztBQUNQLG9CQUFHLEtBQUtKLFVBQUwsQ0FBZ0JLLEtBQWhCLElBQXlCLENBQTVCLEVBQThCO0FBQzFCQyx1QkFBR0MsU0FBSCxDQUFhO0FBQ1RDLDZCQUFLO0FBREkscUJBQWI7QUFHSCxpQkFKRCxNQUlLO0FBQ0Q7QUFDSDtBQUNKO0FBVEssUyxRQVlWQyxNLEdBQVMsRTs7Ozs7K0JBQ0ZDLE8sRUFBUztBQUFBOztBQUNaLGlCQUFLWCxLQUFMLEdBQWFXLFFBQVFYLEtBQXJCO0FBQ0EsaUJBQUtFLElBQUwsR0FBWVMsUUFBUVQsSUFBcEI7QUFDQTtBQUNBLGdCQUFJVSxjQUFjO0FBQ2RDLHNCQUFNQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJILElBRGxCO0FBRWRYLHNCQUFNLEtBQUtBLElBRkc7QUFHZGUsc0JBQU0sR0FIUTtBQUlkQyx1QkFBT1gsR0FBR1ksY0FBSCxDQUFrQixPQUFsQjtBQUpPLGFBQWxCO0FBTUEsMENBQVlDLHFCQUFJUixXQUFoQixFQUE0QixNQUE1QixFQUFtQ0EsV0FBbkMsRUFBZ0RTLElBQWhELENBQXFELGVBQUs7QUFDdEQsb0JBQUdDLElBQUl2QixJQUFKLENBQVNBLElBQVQsQ0FBYyxDQUFkLEVBQWlCTyxLQUFqQixJQUEwQixDQUE3QixFQUErQjtBQUFFO0FBQzdCLDJCQUFLSCxjQUFMLEdBQXNCLGdCQUF0QjtBQUNIO0FBQ0QsdUJBQUtGLFVBQUwsR0FBa0JxQixJQUFJdkIsSUFBSixDQUFTQSxJQUFULENBQWMsQ0FBZCxDQUFsQjtBQUNBLHVCQUFLd0IsTUFBTDtBQUNILGFBTkQ7QUFPSDs7OztBQUNEOzJDQUNtQkMsQyxFQUFFO0FBQ2pCLGdCQUFHQSxFQUFFQyxNQUFGLENBQVNDLE1BQVQsSUFBaUIsbUJBQXBCLEVBQXdDO0FBQ3BDLDhDQUFZTixxQkFBSU8sYUFBaEIsRUFBOEIsTUFBOUIsRUFBcUM7QUFDakNkLDBCQUFLQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJILElBREU7QUFFakNYLDBCQUFLLEtBQUtBLElBRnVCO0FBR2pDZSwwQkFBSyxDQUg0QjtBQUlqQ0MsMkJBQU1YLEdBQUdZLGNBQUgsQ0FBa0IsT0FBbEIsQ0FKMkI7QUFLakNTLG1DQUFjSixFQUFFQyxNQUFGLENBQVNHLGFBTFU7QUFNakNDLHdCQUFHTCxFQUFFQyxNQUFGLENBQVNJO0FBTnFCLGlCQUFyQyxFQU9HUixJQVBILENBT1EsZUFBSztBQUNULHdCQUFJUyxjQUFjUixJQUFJdkIsSUFBSixDQUFTQSxJQUFULENBQWMrQixXQUFoQztBQUNBLGtEQUFZVixxQkFBSVcsV0FBaEIsRUFBNEIsTUFBNUIsRUFBbUM7QUFDL0JkLDhCQUFLLENBRDBCO0FBRS9CQywrQkFBT1gsR0FBR1ksY0FBSCxDQUFrQixPQUFsQixDQUZ3QjtBQUcvQmEsaUNBQVFGLFdBSHVCO0FBSS9CRyxpQ0FBUTtBQUp1QixxQkFBbkMsRUFLR1osSUFMSCxDQUtRLGVBQUs7QUFDVGQsMkJBQUcyQixRQUFILENBQVk7QUFDUnpCLGlDQUFLO0FBREcseUJBQVo7QUFHSCxxQkFURDtBQVVILGlCQW5CRDtBQW9CSDtBQUNKOzs7O0VBcEV1Q0ssZUFBS3FCLEk7O2tCQUE1QnpDLGMiLCJmaWxlIjoicGF5TWVudFN1Y2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCc7XG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2FwaS9yZXF1ZXN0RGF0YSdcbmltcG9ydCB7IHZhaWxQaG9uZSB9IGZyb20gJy4uL3V0aWxzL3V0aWwnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBheU1lbnRTdWNjZXNzIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6J+aUr+S7mOaIkOWKnycsXG4gICAgICAgIGRpc2FibGVTY3JvbGw6dHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgbW9uZXk6MCxcbiAgICAgICAgbWVtYmVyTWVzczpudWxsLFxuICAgICAgICBtX2lkOicnLFxuICAgICAgICBnZXRQaG9uZU51bWJlcjonJ1xuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgYmFja1JvdXRlKCl7XG4gICAgICAgICAgICBpZih0aGlzLm1lbWJlck1lc3MuaXNNZW0gIT0gMil7XG4gICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi9vcmRlcidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIHRoaXMubW9uZXkgPSBvcHRpb25zLm1vbmV5XG4gICAgICAgIHRoaXMubV9pZCA9IG9wdGlvbnMubV9pZFxuICAgICAgICAvLyDkvJrlkZhEYXRhXG4gICAgICAgIGxldCBjYXJkTWVzc2FnZSA9IHtcbiAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgIG1faWQ6IHRoaXMubV9pZCxcbiAgICAgICAgICAgIHR5cGU6IFwiMFwiLFxuICAgICAgICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3REYXRhKGFwaS5jYXJkTWVzc2FnZSwnUE9TVCcsY2FyZE1lc3NhZ2UpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5kYXRhWzBdLmlzTWVtID09IDIpeyAvL+S8muWRmOmcgOWunuWQjeiupOivgVxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGhvbmVOdW1iZXIgPSAnZ2V0UGhvbmVOdW1iZXInXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1lbWJlck1lc3MgPSByZXMuZGF0YS5kYXRhWzBdXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfTtcbiAgICAvLyDlvq7kv6Hop6Plr4bmjqXlj6PvvIjojrflj5bmiYvmnLrlj7fmmI7mlofvvIlcbiAgICBiaW5kZ2V0cGhvbmVudW1iZXIoZSl7XG4gICAgICAgIGlmKGUuZGV0YWlsLmVyck1zZz09J2dldFBob25lTnVtYmVyOm9rJyl7XG4gICAgICAgICAgICByZXF1ZXN0RGF0YShhcGkuZ2V0d3hVc2VySW5mbyxcIlBPU1RcIix7XG4gICAgICAgICAgICAgICAgcF9pZDp3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgICAgbV9pZDp0aGlzLm1faWQsXG4gICAgICAgICAgICAgICAgdHlwZTowLFxuICAgICAgICAgICAgICAgIHRva2VuOnd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6ZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICBpdjplLmRldGFpbC5pdixcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgbGV0IHBob25lTnVtYmVyID0gcmVzLmRhdGEuZGF0YS5waG9uZU51bWJlcjtcbiAgICAgICAgICAgICAgICByZXF1ZXN0RGF0YShhcGkubWVtVXNlckluZm8sJ1BPU1QnLHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZToxLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgICAgICAgICAgICAgIHd4cGhvbmU6cGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIG1lbW5hbWU6XCJcIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIHd4LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vaW5kZXgnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuIl19