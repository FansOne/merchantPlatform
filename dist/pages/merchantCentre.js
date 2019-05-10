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

var merchantCentre = function (_wepy$page) {
    _inherits(merchantCentre, _wepy$page);

    function merchantCentre() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, merchantCentre);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = merchantCentre.__proto__ || Object.getPrototypeOf(merchantCentre)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '商户中心'
        }, _this.components = {}, _this.data = {
            otherModular: [{ icon: 'http://www.qumatou.com.cn/zheng/xcximage/mdzzSHRZ.png', title: '商户认证' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/mdzzSHCZ.png', title: '商户充值' }, { icon: 'http://www.qumatou.com.cn/zheng/xcximage/mdzzSYS.png', title: '扫-扫' }]
        }, _this.methods = {
            otherModularItem: function otherModularItem(index) {
                if (index == 0) {
                    var url = _requestUrl2.default.MerchantAuth;
                    var data = {
                        p_id: _wepy2.default.$instance.globalData.p_id,
                        role: 0,
                        type: 0,
                        token: wx.getStorageSync("token")
                    };
                    (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                        if (res.data.data.status != 0 && res.data.data.status != -1) {
                            wx.navigateTo({
                                url: './merchantCA'
                            });
                        } else if (res.data.data.status == 0) {
                            wx.showModal({
                                title: '商户认证',
                                content: '\u60A8\u5DF2\u5728' + res.data.data.mname + '\u5546\u6237\u8BA4\u8BC1\u6210\u529F',
                                showCancel: false,
                                cancelColor: '#000000',
                                confirmText: '确定',
                                confirmColor: '#3CC51F'
                            });
                        } else if (res.data.data.status == -1) {
                            wx.showToast({
                                title: '审核中..',
                                icon: 'none',
                                duration: 1500,
                                mask: false
                            });
                        }
                    });
                } else if (index == 1) {
                    (0, _requestData.requestData)(_requestUrl2.default.MerchantAuth, 'POST', {
                        p_id: _wepy2.default.$instance.globalData.p_id,
                        role: 0,
                        type: 0,
                        token: wx.getStorageSync("token")
                    }).then(function (res) {
                        if (res.data.data.status == 0) {
                            var m_id = res.data.data.m_id;
                            wx.navigateTo({
                                url: './merchatPrecharge?m_id=' + m_id
                            });
                        } else {
                            wx.showToast({ title: '须进行商户认证', icon: 'none' });
                        }
                    });
                } else if (index == 2) {
                    wx.scanCode({
                        onlyFromCamera: true,
                        scanType: ['qrCode'],
                        success: function success(res) {
                            console.log(res);
                        }
                    });
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(merchantCentre, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return merchantCentre;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(merchantCentre , 'pages/merchantCentre'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lcmNoYW50Q2VudHJlLmpzIl0sIm5hbWVzIjpbIm1lcmNoYW50Q2VudHJlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwib3RoZXJNb2R1bGFyIiwiaWNvbiIsInRpdGxlIiwibWV0aG9kcyIsIm90aGVyTW9kdWxhckl0ZW0iLCJpbmRleCIsInVybCIsInJlcXVlc3RVcmwiLCJNZXJjaGFudEF1dGgiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJyb2xlIiwidHlwZSIsInRva2VuIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInRoZW4iLCJyZXMiLCJzdGF0dXMiLCJuYXZpZ2F0ZVRvIiwic2hvd01vZGFsIiwiY29udGVudCIsIm1uYW1lIiwic2hvd0NhbmNlbCIsImNhbmNlbENvbG9yIiwiY29uZmlybVRleHQiLCJjb25maXJtQ29sb3IiLCJzaG93VG9hc3QiLCJkdXJhdGlvbiIsIm1hc2siLCJtX2lkIiwic2NhbkNvZGUiLCJvbmx5RnJvbUNhbWVyYSIsInNjYW5UeXBlIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7OzBNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQywwQkFBYSxDQUNULEVBQUVDLE1BQUssdURBQVAsRUFBZ0VDLE9BQU0sTUFBdEUsRUFEUyxFQUVULEVBQUVELE1BQUssdURBQVAsRUFBZ0VDLE9BQU0sTUFBdEUsRUFGUyxFQUdULEVBQUVELE1BQUssc0RBQVAsRUFBK0RDLE9BQU0sS0FBckUsRUFIUztBQURWLFMsUUFPUEMsTyxHQUFVO0FBQ05DLDRCQURNLDRCQUNXQyxLQURYLEVBQ2lCO0FBQ25CLG9CQUFHQSxTQUFTLENBQVosRUFBYztBQUNWLHdCQUFJQyxNQUFNQyxxQkFBV0MsWUFBckI7QUFDSSx3QkFBSVQsT0FBTztBQUNQVSw4QkFBTUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCSCxJQUR6QjtBQUVQSSw4QkFBTSxDQUZDO0FBR1BDLDhCQUFNLENBSEM7QUFJUEMsK0JBQU9DLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEI7QUFKQSxxQkFBWDtBQU1BLGtEQUFZWCxHQUFaLEVBQWdCLE1BQWhCLEVBQXVCUCxJQUF2QixFQUE2Qm1CLElBQTdCLENBQWtDLGVBQUs7QUFDbkMsNEJBQUdDLElBQUlwQixJQUFKLENBQVNBLElBQVQsQ0FBY3FCLE1BQWQsSUFBd0IsQ0FBeEIsSUFBNkJELElBQUlwQixJQUFKLENBQVNBLElBQVQsQ0FBY3FCLE1BQWQsSUFBd0IsQ0FBQyxDQUF6RCxFQUEyRDtBQUN2REosK0JBQUdLLFVBQUgsQ0FBYztBQUNWZixxQ0FBSztBQURLLDZCQUFkO0FBR0gseUJBSkQsTUFJTSxJQUFHYSxJQUFJcEIsSUFBSixDQUFTQSxJQUFULENBQWNxQixNQUFkLElBQXdCLENBQTNCLEVBQTZCO0FBQy9CSiwrQkFBR00sU0FBSCxDQUFhO0FBQ1RwQix1Q0FBTSxNQURHO0FBRVRxQixnRUFBZUosSUFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjeUIsS0FBN0IseUNBRlM7QUFHVEMsNENBQVksS0FISDtBQUlUQyw2Q0FBYSxTQUpKO0FBS1RDLDZDQUFhLElBTEo7QUFNVEMsOENBQWM7QUFOTCw2QkFBYjtBQVFILHlCQVRLLE1BU0EsSUFBR1QsSUFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjcUIsTUFBZCxJQUF3QixDQUFDLENBQTVCLEVBQThCO0FBQ2hDSiwrQkFBR2EsU0FBSCxDQUFhO0FBQ1QzQix1Q0FBTyxPQURFO0FBRVRELHNDQUFNLE1BRkc7QUFHVDZCLDBDQUFVLElBSEQ7QUFJVEMsc0NBQU07QUFKRyw2QkFBYjtBQU1IO0FBQ0oscUJBdEJEO0FBdUJQLGlCQS9CRCxNQStCTSxJQUFHMUIsU0FBUyxDQUFaLEVBQWM7QUFDaEIsa0RBQVlFLHFCQUFXQyxZQUF2QixFQUFvQyxNQUFwQyxFQUEyQztBQUN2Q0MsOEJBQU1DLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkgsSUFETztBQUV2Q0ksOEJBQU0sQ0FGaUM7QUFHdkNDLDhCQUFNLENBSGlDO0FBSXZDQywrQkFBT0MsR0FBR0MsY0FBSCxDQUFrQixPQUFsQjtBQUpnQyxxQkFBM0MsRUFLR0MsSUFMSCxDQUtRLGVBQUs7QUFDVCw0QkFBR0MsSUFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjcUIsTUFBZCxJQUF3QixDQUEzQixFQUE2QjtBQUN6QixnQ0FBSVksT0FBT2IsSUFBSXBCLElBQUosQ0FBU0EsSUFBVCxDQUFjaUMsSUFBekI7QUFDQWhCLCtCQUFHSyxVQUFILENBQWM7QUFDVmYsa0VBQWdDMEI7QUFEdEIsNkJBQWQ7QUFHSCx5QkFMRCxNQUtLO0FBQ0RoQiwrQkFBR2EsU0FBSCxDQUFhLEVBQUMzQixPQUFPLFNBQVIsRUFBa0JELE1BQU0sTUFBeEIsRUFBYjtBQUNIO0FBQ0oscUJBZEQ7QUFlSCxpQkFoQkssTUFnQkEsSUFBR0ksU0FBUyxDQUFaLEVBQWM7QUFDaEJXLHVCQUFHaUIsUUFBSCxDQUFZO0FBQ1JDLHdDQUFlLElBRFA7QUFFUkMsa0NBQVMsQ0FBQyxRQUFELENBRkQ7QUFHUkMsaUNBQVEsaUJBQUNqQixHQUFELEVBQU87QUFDWGtCLG9DQUFRQyxHQUFSLENBQVluQixHQUFaO0FBQ0g7QUFMTyxxQkFBWjtBQU9IO0FBQ0o7QUExREssUyxRQTZEVm9CLE0sR0FBUyxFOzs7OztpQ0FDQSxDQUFFOzs7O0VBM0U2QjdCLGVBQUs4QixJOztrQkFBNUI3QyxjIiwiZmlsZSI6Im1lcmNoYW50Q2VudHJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uL2FwaS9yZXF1ZXN0VXJsJ1xuaW1wb3J0IHsgcmVxdWVzdERhdGEgfSBmcm9tICcuLi9hcGkvcmVxdWVzdERhdGEnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1lcmNoYW50Q2VudHJlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfllYbmiLfkuK3lv4MnLFxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgb3RoZXJNb2R1bGFyOltcbiAgICAgICAgICAgIHsgaWNvbjonaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9tZHp6U0hSWi5wbmcnLCB0aXRsZTon5ZWG5oi36K6k6K+BJ30sXG4gICAgICAgICAgICB7IGljb246J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2UvbWR6elNIQ1oucG5nJywgdGl0bGU6J+WVhuaIt+WFheWAvCd9LFxuICAgICAgICAgICAgeyBpY29uOidodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL21kenpTWVMucG5nJywgdGl0bGU6J+aJqy3miasnfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBvdGhlck1vZHVsYXJJdGVtKGluZGV4KXtcbiAgICAgICAgICAgIGlmKGluZGV4ID09IDApe1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLk1lcmNoYW50QXV0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiB3eC5nZXRTdG9yYWdlU3luYyhcInRva2VuXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuZGF0YS5zdGF0dXMgIT0gMCAmJiByZXMuZGF0YS5kYXRhLnN0YXR1cyAhPSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4vbWVyY2hhbnRDQSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJlcy5kYXRhLmRhdGEuc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifllYbmiLforqTor4EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBg5oKo5bey5ZyoJHtyZXMuZGF0YS5kYXRhLm1uYW1lfeWVhuaIt+iupOivgeaIkOWKn2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+ehruWumicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyMzQ0M1MUYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihyZXMuZGF0YS5kYXRhLnN0YXR1cyA9PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICflrqHmoLjkuK0uLicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2s6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gMSl7XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEocmVxdWVzdFVybC5NZXJjaGFudEF1dGgsJ1BPU1QnLHtcbiAgICAgICAgICAgICAgICAgICAgcF9pZDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiAwLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAwLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoXCJ0b2tlblwiKVxuICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmRhdGEuc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1faWQgPSByZXMuZGF0YS5kYXRhLm1faWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAuL21lcmNoYXRQcmVjaGFyZ2U/bV9pZD0ke21faWR9YFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTogJ+mhu+i/m+ihjOWVhuaIt+iupOivgScsaWNvbjogJ25vbmUnfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2UgaWYoaW5kZXggPT0gMil7XG4gICAgICAgICAgICAgICAgd3guc2NhbkNvZGUoe1xuICAgICAgICAgICAgICAgICAgICBvbmx5RnJvbUNhbWVyYTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzY2FuVHlwZTpbJ3FyQ29kZSddLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOihyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHt9O1xufVxuIl19