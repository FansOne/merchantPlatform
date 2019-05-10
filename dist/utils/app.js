'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//单点登录
function login() {
    wx.getStorage({
        key: 'userInfoLogin',
        success: function success(res) {
            var user = res.data;
            wx.login({
                //获取code
                success: function success(res) {
                    wx.request({
                        url: 'https://sso.qumatou.com.cn/' + 'api/mini_login',
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            code: res.code,
                            app_id: 'wx9d4d36b4ef8d2653',
                            iv: user.iv,
                            encryptData: user.encryptedData,
                            grant_type: 'client_plat_credentials'
                        },
                        header: {
                            'Accept': 'application/vnd.sso.v1+json'
                            // 'SandBox' : true
                        },
                        success: function success(res) {
                            var status_code = res.statusCode;
                            if (status_code != 200) {
                                wx.showToast({ title: '登录失败', icon: 'none', duration: 2000 });
                                wx.removeStorageSync('access_token');
                            } else {
                                var timestamp = Date.parse(new Date());
                                timestamp = timestamp / 1000 + res.data.expires_in;
                                var access_token = { 'access_token': res.data.access_token, 'expires_in': timestamp };
                                wx.showToast({ title: '登录成功', icon: 'success', duration: 2000 });
                                wx.setStorage({
                                    key: 'access_token',
                                    data: access_token
                                });
                                wx.setStorage({
                                    key: 'userId',
                                    data: res.data.message
                                });
                            }
                        }
                    });
                }
            });
        },
        fail: function fail(res) {}
    });
}
//判断该页面是否需要跳转登录
function is_skip(skipUrl) {
    wx.getStorage({
        key: 'pagesUrl',
        success: function success(res) {
            res.data.forEach(function (item, index) {
                if (item.url == _util2.default.getCurrentPageUrl()) {
                    wx.getStorage({
                        key: 'access_token',
                        success: function success(res) {},
                        fail: function fail(res) {
                            //缓存里面没有access_token,跳转登录页面
                            wx.navigateTo({
                                url: skipUrl
                            });
                        }
                    });
                }
            });
        }
    });
}
//公共方法将商户添加到最近使用
function is_renctly_use(id) {
    //判断是否通过扫码进来的
    if (id) {
        var token = wx.getStorageSync('access_token').access_token;
        //id存在[通过扫码进来的]
        _wepy2.default.request({
            url: _api2.default.apiMall + 'api/store_use',
            method: 'POST',
            header: {
                'Accept': 'application/vnd.lingmo.v1+json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization': 'Bearer ' + token
            },
            data: {
                m_id: id
            }
        }).then(function (res) {});
    }
}

module.exports = {
    login: login,
    is_skip: is_skip,
    is_renctly_use: is_renctly_use
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJsb2dpbiIsInd4IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJ1c2VyIiwicmVzIiwiZGF0YSIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImNvZGUiLCJhcHBfaWQiLCJpdiIsImVuY3J5cHREYXRhIiwiZW5jcnlwdGVkRGF0YSIsImdyYW50X3R5cGUiLCJoZWFkZXIiLCJzdGF0dXNfY29kZSIsInN0YXR1c0NvZGUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInJlbW92ZVN0b3JhZ2VTeW5jIiwidGltZXN0YW1wIiwiRGF0ZSIsInBhcnNlIiwiZXhwaXJlc19pbiIsImFjY2Vzc190b2tlbiIsInNldFN0b3JhZ2UiLCJtZXNzYWdlIiwiZmFpbCIsImlzX3NraXAiLCJza2lwVXJsIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsInV0aWwiLCJnZXRDdXJyZW50UGFnZVVybCIsIm5hdmlnYXRlVG8iLCJpc19yZW5jdGx5X3VzZSIsImlkIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsIndlcHkiLCJhcGkiLCJhcGlNYWxsIiwibV9pZCIsInRoZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBQ0E7QUFDQSxTQUFTQSxLQUFULEdBQWlCO0FBQ2JDLE9BQUdDLFVBQUgsQ0FBYztBQUNWQyxhQUFJLGVBRE07QUFFVkMsaUJBQVEsc0JBQUs7QUFDVCxnQkFBSUMsT0FBT0MsSUFBSUMsSUFBZjtBQUNBTixlQUFHRCxLQUFILENBQVM7QUFDTDtBQUNBSSx5QkFBUSxzQkFBSztBQUNUSCx1QkFBR08sT0FBSCxDQUFXO0FBQ1BDLDZCQUFLLGdDQUErQixnQkFEN0I7QUFFUEMsZ0NBQU8sTUFGQTtBQUdQQyxrQ0FBUyxNQUhGO0FBSVBKLDhCQUFNO0FBQ0ZLLGtDQUFLTixJQUFJTSxJQURQO0FBRUZDLG9DQUFPLG9CQUZMO0FBR0ZDLGdDQUFHVCxLQUFLUyxFQUhOO0FBSUZDLHlDQUFZVixLQUFLVyxhQUpmO0FBS0ZDLHdDQUFXO0FBTFQseUJBSkM7QUFXUEMsZ0NBQVE7QUFDSixzQ0FBVTtBQUNWO0FBRkkseUJBWEQ7QUFlUGQsaUNBQVMsaUJBQVNFLEdBQVQsRUFBYztBQUNuQixnQ0FBSWEsY0FBWWIsSUFBSWMsVUFBcEI7QUFDQSxnQ0FBR0QsZUFBYSxHQUFoQixFQUFvQjtBQUNoQmxCLG1DQUFHb0IsU0FBSCxDQUFhLEVBQUNDLE9BQU8sTUFBUixFQUFnQkMsTUFBTSxNQUF0QixFQUE4QkMsVUFBVSxJQUF4QyxFQUFiO0FBQ0F2QixtQ0FBR3dCLGlCQUFILENBQXFCLGNBQXJCO0FBQ0gsNkJBSEQsTUFHSztBQUNELG9DQUFJQyxZQUFZQyxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLENBQWhCO0FBQ0FELDRDQUFZQSxZQUFZLElBQVosR0FBbUJwQixJQUFJQyxJQUFKLENBQVNzQixVQUF4QztBQUNBLG9DQUFJQyxlQUFlLEVBQUMsZ0JBQWV4QixJQUFJQyxJQUFKLENBQVN1QixZQUF6QixFQUFzQyxjQUFhSixTQUFuRCxFQUFuQjtBQUNBekIsbUNBQUdvQixTQUFILENBQWEsRUFBQ0MsT0FBTyxNQUFSLEVBQWdCQyxNQUFNLFNBQXRCLEVBQWlDQyxVQUFVLElBQTNDLEVBQWI7QUFDQXZCLG1DQUFHOEIsVUFBSCxDQUFjO0FBQ1Y1Qix5Q0FBSSxjQURNO0FBRVZJLDBDQUFLdUI7QUFGSyxpQ0FBZDtBQUlBN0IsbUNBQUc4QixVQUFILENBQWM7QUFDVjVCLHlDQUFJLFFBRE07QUFFVkksMENBQUtELElBQUlDLElBQUosQ0FBU3lCO0FBRkosaUNBQWQ7QUFJSDtBQUNKO0FBbENNLHFCQUFYO0FBb0NIO0FBdkNJLGFBQVQ7QUF5Q0gsU0E3Q1M7QUE4Q1ZDLGNBQUssbUJBQUssQ0FBRTtBQTlDRixLQUFkO0FBZ0RIO0FBQ0Q7QUFDQSxTQUFTQyxPQUFULENBQWlCQyxPQUFqQixFQUF5QjtBQUNyQmxDLE9BQUdDLFVBQUgsQ0FBYztBQUNWQyxhQUFJLFVBRE07QUFFVkMsaUJBQVEsc0JBQUs7QUFDVEUsZ0JBQUlDLElBQUosQ0FBUzZCLE9BQVQsQ0FBaUIsVUFBQ0MsSUFBRCxFQUFNQyxLQUFOLEVBQWM7QUFDM0Isb0JBQUdELEtBQUs1QixHQUFMLElBQVk4QixlQUFLQyxpQkFBTCxFQUFmLEVBQXdDO0FBQ3BDdkMsdUJBQUdDLFVBQUgsQ0FBYztBQUNWQyw2QkFBSSxjQURNO0FBRVZDLGlDQUFRLHNCQUFLLENBQUUsQ0FGTDtBQUdWNkIsOEJBQUssbUJBQUs7QUFDTjtBQUNBaEMsK0JBQUd3QyxVQUFILENBQWM7QUFDVmhDLHFDQUFJMEI7QUFETSw2QkFBZDtBQUdIO0FBUlMscUJBQWQ7QUFVSDtBQUNKLGFBYkQ7QUFjSDtBQWpCUyxLQUFkO0FBbUJIO0FBQ0Q7QUFDQSxTQUFTTyxjQUFULENBQXdCQyxFQUF4QixFQUEyQjtBQUN2QjtBQUNBLFFBQUdBLEVBQUgsRUFBTTtBQUNGLFlBQUlDLFFBQVEzQyxHQUFHNEMsY0FBSCxDQUFrQixjQUFsQixFQUFrQ2YsWUFBOUM7QUFDQTtBQUNBZ0IsdUJBQUt0QyxPQUFMLENBQWE7QUFDVEMsaUJBQUtzQyxjQUFJQyxPQUFKLEdBQWMsZUFEVjtBQUVUdEMsb0JBQVEsTUFGQztBQUdUUSxvQkFBTztBQUNILDBCQUFTLGdDQUROO0FBRUgsZ0NBQWUsaURBRlo7QUFHSCxpQ0FBZ0IsWUFBWTBCO0FBSHpCLGFBSEU7QUFRVHJDLGtCQUFNO0FBQ0YwQyxzQkFBS047QUFESDtBQVJHLFNBQWIsRUFXR08sSUFYSCxDQVdRLGVBQUssQ0FBRSxDQVhmO0FBWUg7QUFDSjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQjtBQUNicEQsV0FBTUEsS0FETztBQUVia0MsYUFBUUEsT0FGSztBQUdiUSxvQkFBZUE7QUFIRixDQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJ1xuaW1wb3J0IHV0aWwgZnJvbSAnLi4vdXRpbHMvdXRpbCdcbi8v5Y2V54K555m75b2VXG5mdW5jdGlvbiBsb2dpbigpIHtcbiAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAga2V5Oid1c2VySW5mb0xvZ2luJyxcbiAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgIGxldCB1c2VyID0gcmVzLmRhdGE7XG4gICAgICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgICAgICAgLy/ojrflj5Zjb2RlXG4gICAgICAgICAgICAgICAgc3VjY2VzczpyZXM9PntcbiAgICAgICAgICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3Nzby5xdW1hdG91LmNvbS5jbi8nICsnYXBpL21pbmlfbG9naW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOidqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOnJlcy5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcF9pZDond3g5ZDRkMzZiNGVmOGQyNjUzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdjp1c2VyLml2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHREYXRhOnVzZXIuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFudF90eXBlOidjbGllbnRfcGxhdF9jcmVkZW50aWFscydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vdm5kLnNzby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAnU2FuZEJveCcgOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXR1c19jb2RlPXJlcy5zdGF0dXNDb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0YXR1c19jb2RlIT0yMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOiAn55m75b2V5aSx6LSlJywgaWNvbjogJ25vbmUnLCBkdXJhdGlvbjogMjAwMH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygnYWNjZXNzX3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXAgPSB0aW1lc3RhbXAgLyAxMDAwICsgcmVzLmRhdGEuZXhwaXJlc19pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjY2Vzc190b2tlbiA9IHsnYWNjZXNzX3Rva2VuJzpyZXMuZGF0YS5hY2Nlc3NfdG9rZW4sJ2V4cGlyZXNfaW4nOnRpbWVzdGFtcH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7dGl0bGU6ICfnmbvlvZXmiJDlip8nLCBpY29uOiAnc3VjY2VzcycsIGR1cmF0aW9uOiAyMDAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OidhY2Nlc3NfdG9rZW4nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6YWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6J3VzZXJJZCcsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpyZXMuZGF0YS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6cmVzPT57fVxuICAgIH0pICAgIFxufVxuLy/liKTmlq3or6XpobXpnaLmmK/lkKbpnIDopoHot7PovaznmbvlvZVcbmZ1bmN0aW9uIGlzX3NraXAoc2tpcFVybCl7XG4gICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgIGtleToncGFnZXNVcmwnLFxuICAgICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgICAgICAgICBpZihpdGVtLnVybCA9PSB1dGlsLmdldEN1cnJlbnRQYWdlVXJsKCkpe1xuICAgICAgICAgICAgICAgICAgICB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTonYWNjZXNzX3Rva2VuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6cmVzPT57fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6cmVzPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nvJPlrZjph4zpnaLmsqHmnIlhY2Nlc3NfdG9rZW4s6Lez6L2s55m75b2V6aG16Z2iXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDpza2lwVXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbn1cbi8v5YWs5YWx5pa55rOV5bCG5ZWG5oi35re75Yqg5Yiw5pyA6L+R5L2/55SoXG5mdW5jdGlvbiBpc19yZW5jdGx5X3VzZShpZCl7XG4gICAgLy/liKTmlq3mmK/lkKbpgJrov4fmiavnoIHov5vmnaXnmoRcbiAgICBpZihpZCl7XG4gICAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdhY2Nlc3NfdG9rZW4nKS5hY2Nlc3NfdG9rZW47XG4gICAgICAgIC8vaWTlrZjlnKhb6YCa6L+H5omr56CB6L+b5p2l55qEXVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCArICdhcGkvc3RvcmVfdXNlJyxcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0b2tlblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtX2lkOmlkXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KS50aGVuKHJlcz0+e30pXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsb2dpbjpsb2dpbixcbiAgICBpc19za2lwOmlzX3NraXAsXG4gICAgaXNfcmVuY3RseV91c2U6aXNfcmVuY3RseV91c2Vcbn0iXX0=