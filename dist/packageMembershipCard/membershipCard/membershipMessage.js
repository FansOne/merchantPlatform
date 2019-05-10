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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var membershipMessage = function (_wepy$page) {
    _inherits(membershipMessage, _wepy$page);

    function membershipMessage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, membershipMessage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = membershipMessage.__proto__ || Object.getPrototypeOf(membershipMessage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '完善会员信息'
        }, _this.components = {}, _this.data = {
            m_id: '',
            wxTel: ''
        }, _this.methods = {
            formSubmit: function formSubmit(e) {
                console.log(e.detail.value);
                if (!e.detail.value.userName || !e.detail.value.telNumber) {
                    wx.showToast({ title: '请完善会员信息', icon: 'none' });
                } else {
                    var url = _requestUrl2.default.memUserInfo;
                    var data = {
                        type: "1",
                        token: wx.getStorageSync('token'),
                        wxphone: e.detail.value.telNumber,
                        memname: e.detail.value.userName
                    };
                    (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                        if (res.data.code == 1) {
                            wx.showToast({
                                title: '绑定成功',
                                icon: 'success',
                                duration: 1500,
                                mask: false,
                                success: function success() {
                                    setTimeout(function () {
                                        wx.navigateBack({
                                            delta: 3
                                        });
                                    }, 1200);
                                }
                            });
                        } else {
                            wx.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 1500,
                                mask: false
                            });
                        }
                    });
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(membershipMessage, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.m_id = options.m_id;
        }
    }, {
        key: 'getPhoneNumber',

        // 获取用户手机号
        value: function getPhoneNumber(e) {
            var _this2 = this;

            wx.checkSession({
                success: function success() {
                    // session_key 未过期，并且在本生命周期一直有效
                    _this2.getwxUserInfo(e.detail.iv, e.detail.encryptedData);
                },
                fail: function fail() {
                    // session_key 已经失效，需要重新执行登录流程 ,登录换取用户Token
                    wx.login({
                        success: function success(res) {
                            _wepy2.default.request({
                                url: _requestUrl2.default.getToken,
                                method: 'POST',
                                data: {
                                    p_id: _wepy2.default.$instance.globalData.p_id,
                                    m_id: 0,
                                    CODE: res.code
                                }
                            }).then(function (res) {
                                var token = res.data.data[0].accessToken;
                                wx.setStorageSync('token', token);
                                _this2.getwxUserInfo(e.detail.iv, e.detail.encryptedData);
                            }).catch(function (res) {
                                wx.showToast({
                                    title: '请求服务器数据异常',
                                    icon: 'none',
                                    duration: 1500
                                });
                            });
                        }
                    });
                }
            });
        }
        // 第三方服务端进行解密获取手机号

    }, {
        key: 'getwxUserInfo',
        value: function getwxUserInfo(iv, encryptedData) {
            var _this3 = this;

            var url = _requestUrl2.default.getwxUserInfo;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: 8,
                type: 0,
                token: wx.getStorageSync('token'),
                iv: iv,
                encryptedData: encryptedData
            };
            (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                if (res.data.code == 1) {
                    _this3.wxTel = res.data.data.phoneNumber;
                    _this3.$apply();
                } else {
                    wx.showToast({
                        title: '请求服务器数据异常',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        }
    }]);

    return membershipMessage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(membershipMessage , 'packageMembershipCard/membershipCard/membershipMessage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlcnNoaXBNZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1lbWJlcnNoaXBNZXNzYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwibV9pZCIsInd4VGVsIiwibWV0aG9kcyIsImZvcm1TdWJtaXQiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwidXNlck5hbWUiLCJ0ZWxOdW1iZXIiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInVybCIsInJlcXVlc3RVcmwiLCJtZW1Vc2VySW5mbyIsInR5cGUiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwid3hwaG9uZSIsIm1lbW5hbWUiLCJ0aGVuIiwicmVzIiwiY29kZSIsImR1cmF0aW9uIiwibWFzayIsInN1Y2Nlc3MiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJtZXNzYWdlIiwiZXZlbnRzIiwib3B0aW9ucyIsImNoZWNrU2Vzc2lvbiIsImdldHd4VXNlckluZm8iLCJpdiIsImVuY3J5cHRlZERhdGEiLCJmYWlsIiwibG9naW4iLCJ3ZXB5IiwicmVxdWVzdCIsImdldFRva2VuIiwibWV0aG9kIiwicF9pZCIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJDT0RFIiwiYWNjZXNzVG9rZW4iLCJzZXRTdG9yYWdlU3luYyIsImNhdGNoIiwicGhvbmVOdW1iZXIiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLGlCOzs7Ozs7Ozs7Ozs7OztnTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDSEMsa0JBQUssRUFERjtBQUVIQyxtQkFBTTtBQUZILFMsUUFJUEMsTyxHQUFVO0FBQ05DLHNCQURNLHNCQUNLQyxDQURMLEVBQ087QUFDVEMsd0JBQVFD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QWhCO0FBOEJIO0FBQ0Q7Ozs7c0NBQ2NXLEUsRUFBR0MsYSxFQUFjO0FBQUE7O0FBQzNCLGdCQUFJdkIsTUFBTUMscUJBQVdvQixhQUFyQjtBQUNBLGdCQUFJckMsT0FBTztBQUNIOEMsc0JBQU1KLGVBQUtLLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkYsSUFEN0I7QUFFSDdDLHNCQUFLLENBRkY7QUFHSGtCLHNCQUFLLENBSEY7QUFJSEMsdUJBQU9SLEdBQUdTLGNBQUgsQ0FBa0IsT0FBbEIsQ0FKSjtBQUtIaUIsb0JBQUlBLEVBTEQ7QUFNSEMsK0JBQWVBO0FBTlosYUFBWDtBQVFBLDBDQUFZdkIsR0FBWixFQUFnQixNQUFoQixFQUF1QmhCLElBQXZCLEVBQTZCd0IsSUFBN0IsQ0FBa0MsZUFBSztBQUNuQyxvQkFBR0MsSUFBSXpCLElBQUosQ0FBUzBCLElBQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDbEIsMkJBQUt4QixLQUFMLEdBQWF1QixJQUFJekIsSUFBSixDQUFTQSxJQUFULENBQWNxRCxXQUEzQjtBQUNBLDJCQUFLQyxNQUFMO0FBQ0gsaUJBSEQsTUFHSztBQUNEMUMsdUJBQUdDLFNBQUgsQ0FBYTtBQUNUQywrQkFBTyxXQURFO0FBRVRDLDhCQUFNLE1BRkc7QUFHVFksa0NBQVU7QUFIRCxxQkFBYjtBQUtIO0FBQ0osYUFYRDtBQVlIOzs7O0VBL0cwQ2UsZUFBS2EsSTs7a0JBQS9CM0QsaUIiLCJmaWxlIjoibWVtYmVyc2hpcE1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3RVcmwnXG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1lbWJlcnNoaXBNZXNzYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflrozlloTkvJrlkZjkv6Hmga8nLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgbV9pZDonJyxcbiAgICAgICAgd3hUZWw6JycsXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBmb3JtU3VibWl0KGUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZS5kZXRhaWwudmFsdWUpXG4gICAgICAgICAgICBpZighZS5kZXRhaWwudmFsdWUudXNlck5hbWUgfHwgIWUuZGV0YWlsLnZhbHVlLnRlbE51bWJlcil7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+ivt+WujOWWhOS8muWRmOS/oeaBrycsaWNvbjogJ25vbmUnfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gcmVxdWVzdFVybC5tZW1Vc2VySW5mbztcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTpcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46ICB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICAgICAgICAgICAgd3hwaG9uZTogZS5kZXRhaWwudmFsdWUudGVsTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBtZW1uYW1lOiBlLmRldGFpbC52YWx1ZS51c2VyTmFtZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+e7keWumuaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzazogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5tX2lkID0gb3B0aW9ucy5tX2lkXG4gICAgfTtcbiAgICAvLyDojrflj5bnlKjmiLfmiYvmnLrlj7dcbiAgICBnZXRQaG9uZU51bWJlcihlKSB7XG4gICAgICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICAgICAgICBzdWNjZXNzOigpPT4geyAgICAvLyBzZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAgICAgICAgICAgICB0aGlzLmdldHd4VXNlckluZm8oZS5kZXRhaWwuaXYsZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOigpPT4geyAgICAvLyBzZXNzaW9uX2tleSDlt7Lnu4/lpLHmlYjvvIzpnIDopoHph43mlrDmiafooYznmbvlvZXmtYHnqIsgLOeZu+W9leaNouWPlueUqOaIt1Rva2VuXG4gICAgICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcXVlc3RVcmwuZ2V0VG9rZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1faWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENPREU6IHJlcy5jb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSByZXMuZGF0YS5kYXRhWzBdLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldHd4VXNlckluZm8oZS5kZXRhaWwuaXYsZS5kZXRhaWwuZW5jcnlwdGVkRGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35rGC5pyN5Yqh5Zmo5pWw5o2u5byC5bi4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8g56ys5LiJ5pa55pyN5Yqh56uv6L+b6KGM6Kej5a+G6I635Y+W5omL5py65Y+3XG4gICAgZ2V0d3hVc2VySW5mbyhpdixlbmNyeXB0ZWREYXRhKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwuZ2V0d3hVc2VySW5mbztcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgcF9pZDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgICAgIG1faWQ6OCxcbiAgICAgICAgICAgICAgICB0eXBlOjAsXG4gICAgICAgICAgICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgICAgIGl2OiBpdixcbiAgICAgICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlbmNyeXB0ZWREYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0RGF0YSh1cmwsJ1BPU1QnLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDEpe1xuICAgICAgICAgICAgICAgIHRoaXMud3hUZWwgPSByZXMuZGF0YS5kYXRhLnBob25lTnVtYmVyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7fmsYLmnI3liqHlmajmlbDmja7lvILluLgnLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==