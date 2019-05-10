'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 数据请求
var requestData = function requestData(url) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return _wepy2.default.request({
    url: url,
    method: method,
    data: data
  }).catch(function () {
    wx.showToast({
      title: '请求服务器数据异常',
      icon: 'none',
      duration: 1500,
      success: function success() {
        setTimeout(function () {
          wx.navigateBack({
            delta: -1
          });
        }, 1500);
      }
    });
  });
};

module.exports = {
  requestData: requestData
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3REYXRhLmpzIl0sIm5hbWVzIjpbInJlcXVlc3REYXRhIiwidXJsIiwibWV0aG9kIiwiZGF0YSIsIndlcHkiLCJyZXF1ZXN0IiwiY2F0Y2giLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic3VjY2VzcyIsInNldFRpbWVvdXQiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjLENBQUNDLEdBQUQsRUFBZ0M7QUFBQSxNQUEzQkMsTUFBMkIsdUVBQWxCLEtBQWtCO0FBQUEsTUFBWkMsSUFBWSx1RUFBTCxFQUFLOztBQUNoRCxTQUFPQyxlQUFLQyxPQUFMLENBQWE7QUFDaEJKLFNBQUtBLEdBRFc7QUFFaEJDLFlBQVFBLE1BRlE7QUFHaEJDLFVBQU1BO0FBSFUsR0FBYixFQUlGRyxLQUpFLENBSUksWUFBSTtBQUNYQyxPQUFHQyxTQUFILENBQWE7QUFDWEMsYUFBTyxXQURJO0FBRVhDLFlBQU0sTUFGSztBQUdYQyxnQkFBVSxJQUhDO0FBSVhDLGVBQVMsbUJBQUk7QUFDWEMsbUJBQVcsWUFBTTtBQUNmTixhQUFHTyxZQUFILENBQWdCO0FBQ2RDLG1CQUFPLENBQUM7QUFETSxXQUFoQjtBQUdELFNBSkQsRUFJRyxJQUpIO0FBS0Q7QUFWVSxLQUFiO0FBWUQsR0FqQkksQ0FBUDtBQWtCSCxDQW5CRDs7QUFxQkFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYmpCO0FBRGEsQ0FBakIiLCJmaWxlIjoicmVxdWVzdERhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuLy8g5pWw5o2u6K+35rGCXG5jb25zdCByZXF1ZXN0RGF0YSA9ICh1cmwsbWV0aG9kID0gJ0dFVCcsZGF0YSA9IHt9KT0+e1xuICAgIHJldHVybiB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmNhdGNoKCgpPT57XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor7fmsYLmnI3liqHlmajmlbDmja7lvILluLgnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICBzdWNjZXNzOiAoKT0+e1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgZGVsdGE6IC0xXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMTUwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZXF1ZXN0RGF0YVxufSJdfQ==