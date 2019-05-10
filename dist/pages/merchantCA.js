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

var merchantCA = function (_wepy$page) {
    _inherits(merchantCA, _wepy$page);

    function merchantCA() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, merchantCA);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = merchantCA.__proto__ || Object.getPrototypeOf(merchantCA)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '商户认证'
        }, _this.components = {}, _this.data = {
            inputValue: null
        }, _this.methods = {
            formSubmit: function formSubmit(e) {
                var _this2 = this;

                var inputOjb = e.detail.value;
                if (inputOjb.userName && inputOjb.userTel && inputOjb.password) {
                    var url = _requestUrl2.default.MerchantAuth;
                    var data = {
                        p_id: _wepy2.default.$instance.globalData.p_id,
                        role: 0,
                        type: 1,
                        token: wx.getStorageSync("token"),
                        name: inputOjb.userName,
                        userid: inputOjb.userTel,
                        password: inputOjb.password,
                        cardno: ''

                    };
                    (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                        if (res.data.data.status == -4) {
                            wx.showToast({
                                title: '账户信息验证失败',
                                icon: 'none',
                                duration: 1500
                            });
                        } else if (res.data.data.status == 0) {
                            wx.showToast({
                                title: '成功认证',
                                icon: 'success',
                                duration: 1500,
                                success: function success() {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1200);
                                }
                            });
                        } else if (res.data.data.status == -1) {
                            wx.showToast({
                                title: '待审核中',
                                icon: 'none',
                                duration: 1500,
                                success: function success() {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1200);
                                }
                            });
                        } else if (res.data.data.status == -2) {
                            wx.showToast({
                                title: '请勿重复提交',
                                icon: 'none',
                                duration: 1500,
                                success: function success() {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1200);
                                }
                            });
                        } else if (res.data.data.status == -3) {
                            wx.showToast({
                                title: '提交成功',
                                icon: 'success',
                                duration: 1500,
                                success: function success() {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 1200);
                                }
                            });
                        } else if (res.data.data.status == 1) {
                            wx.showToast({
                                title: '审核未通过',
                                icon: 'none',
                                duration: 1500
                            });
                        }
                        _this2.inputValue = '';
                        _this2.$apply();
                    });
                } else {
                    wx.showToast({
                        title: '请完善信息',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(merchantCA, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return merchantCA;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(merchantCA , 'pages/merchantCA'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50Q0EuanMiXSwibmFtZXMiOlsibWVyY2hhbnRDQSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImlucHV0VmFsdWUiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJpbnB1dE9qYiIsImRldGFpbCIsInZhbHVlIiwidXNlck5hbWUiLCJ1c2VyVGVsIiwicGFzc3dvcmQiLCJ1cmwiLCJyZXF1ZXN0VXJsIiwiTWVyY2hhbnRBdXRoIiwicF9pZCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwicm9sZSIsInR5cGUiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJuYW1lIiwidXNlcmlkIiwiY2FyZG5vIiwidGhlbiIsInJlcyIsInN0YXR1cyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIiRhcHBseSIsIm1hc2siLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQyx3QkFBVztBQURSLFMsUUFHUEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxDQURMLEVBQ087QUFBQTs7QUFDVCxvQkFBSUMsV0FBV0QsRUFBRUUsTUFBRixDQUFTQyxLQUF4QjtBQUNBLG9CQUFJRixTQUFTRyxRQUFULElBQXFCSCxTQUFTSSxPQUE5QixJQUF5Q0osU0FBU0ssUUFBdEQsRUFBZ0U7QUFDNUQsd0JBQUlDLE1BQU1DLHFCQUFXQyxZQUFyQjtBQUNBLHdCQUFJYixPQUFPO0FBQ1BjLDhCQUFNQyxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJI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Q0FBVSxJQUhEO0FBSVRNLDhCQUFNO0FBSkcscUJBQWI7QUFNSDtBQUNKO0FBN0ZLLFMsUUFnR1ZDLE0sR0FBUyxFOzs7OztpQ0FDQSxDQUFFOzs7O0VBMUd5QnhCLGVBQUt5QixJOztrQkFBeEI1QyxVIiwiZmlsZSI6Im1lcmNoYW50Q0EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vYXBpL3JlcXVlc3RVcmwnXG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uL2FwaS9yZXF1ZXN0RGF0YSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1lcmNoYW50Q0EgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuaIt+iupOivgSdcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIGlucHV0VmFsdWU6bnVsbFxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZm9ybVN1Ym1pdChlKXtcbiAgICAgICAgICAgIGxldCBpbnB1dE9qYiA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICAgICAgaWYoIGlucHV0T2piLnVzZXJOYW1lICYmIGlucHV0T2piLnVzZXJUZWwgJiYgaW5wdXRPamIucGFzc3dvcmQgKXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gcmVxdWVzdFVybC5NZXJjaGFudEF1dGg7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKFwidG9rZW5cIiksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGlucHV0T2piLnVzZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICB1c2VyaWQ6IGlucHV0T2piLnVzZXJUZWwsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBpbnB1dE9qYi5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgY2FyZG5vOicnXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5kYXRhLnN0YXR1cyA9PSAtNCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6LSm5oi35L+h5oGv6aqM6K+B5aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKHJlcy5kYXRhLmRhdGEuc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aIkOWKn+iupOivgScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChyZXMuZGF0YS5kYXRhLnN0YXR1cyA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5b6F5a6h5qC45LitJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKHJlcy5kYXRhLmRhdGEuc3RhdHVzID09IC0yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7fli7/ph43lpI3mj5DkuqQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEyMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAocmVzLmRhdGEuZGF0YS5zdGF0dXMgPT0gLTMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOS6pOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChyZXMuZGF0YS5kYXRhLnN0YXR1cyA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflrqHmoLjmnKrpgJrov4cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7flrozlloTkv6Hmga8nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQoKSB7fTtcbiAgICAvLyBPdGhlciBwcm9wZXJ0aWVzXG59XG4iXX0=