"use strict";

var dtime = '_deadtime';
function put(k, v, t) {
  wx.setStorageSync(k, v);
  var seconds = parseInt(t);
  if (seconds > 0) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000 + seconds;
    wx.setStorageSync(k + dtime, timestamp + "");
  } else {
    wx.removeStorageSync(k + dtime);
  }
}

function get(k, def) {
  var deadtime = parseInt(wx.getStorageSync(k + dtime));
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      if (def) {
        return def;
      } else {
        return;
      }
    }
  }
  var res = wx.getStorageSync(k);
  if (res) {
    return res;
  } else {
    return def;
  }
}

function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + dtime);
}

function clear() {
  wx.clearStorageSync();
}

module.exports = {
  put: put,
  get: get,
  remove: remove,
  clear: clear
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndjYWNoZS5qcyJdLCJuYW1lcyI6WyJkdGltZSIsInB1dCIsImsiLCJ2IiwidCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJzZWNvbmRzIiwicGFyc2VJbnQiLCJ0aW1lc3RhbXAiLCJEYXRlIiwicGFyc2UiLCJyZW1vdmVTdG9yYWdlU3luYyIsImdldCIsImRlZiIsImRlYWR0aW1lIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZXMiLCJyZW1vdmUiLCJjbGVhciIsImNsZWFyU3RvcmFnZVN5bmMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFFBQVEsV0FBWjtBQUNBLFNBQVNDLEdBQVQsQ0FBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCO0FBQ3BCQyxLQUFHQyxjQUFILENBQWtCSixDQUFsQixFQUFxQkMsQ0FBckI7QUFDQSxNQUFJSSxVQUFVQyxTQUFTSixDQUFULENBQWQ7QUFDQSxNQUFJRyxVQUFVLENBQWQsRUFBaUI7QUFDZixRQUFJRSxZQUFZQyxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLENBQWhCO0FBQ0FELGdCQUFZQSxZQUFZLElBQVosR0FBbUJGLE9BQS9CO0FBQ0FGLE9BQUdDLGNBQUgsQ0FBa0JKLElBQUlGLEtBQXRCLEVBQTZCUyxZQUFZLEVBQXpDO0FBQ0QsR0FKRCxNQUlPO0FBQ0xKLE9BQUdPLGlCQUFILENBQXFCVixJQUFJRixLQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU2EsR0FBVCxDQUFhWCxDQUFiLEVBQWdCWSxHQUFoQixFQUFxQjtBQUNuQixNQUFJQyxXQUFXUCxTQUFTSCxHQUFHVyxjQUFILENBQWtCZCxJQUFJRixLQUF0QixDQUFULENBQWY7QUFDQSxNQUFJZSxRQUFKLEVBQWM7QUFDWixRQUFJUCxTQUFTTyxRQUFULElBQXFCTCxLQUFLQyxLQUFMLENBQVcsSUFBSUQsSUFBSixFQUFYLElBQXlCLElBQWxELEVBQXdEO0FBQ3RELFVBQUlJLEdBQUosRUFBUztBQUFFLGVBQU9BLEdBQVA7QUFBYSxPQUF4QixNQUE4QjtBQUFFO0FBQVM7QUFDMUM7QUFDRjtBQUNELE1BQUlHLE1BQU1aLEdBQUdXLGNBQUgsQ0FBa0JkLENBQWxCLENBQVY7QUFDQSxNQUFJZSxHQUFKLEVBQVM7QUFDUCxXQUFPQSxHQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBT0gsR0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBU0ksTUFBVCxDQUFnQmhCLENBQWhCLEVBQW1CO0FBQ2pCRyxLQUFHTyxpQkFBSCxDQUFxQlYsQ0FBckI7QUFDQUcsS0FBR08saUJBQUgsQ0FBcUJWLElBQUlGLEtBQXpCO0FBQ0Q7O0FBRUQsU0FBU21CLEtBQVQsR0FBaUI7QUFDZmQsS0FBR2UsZ0JBQUg7QUFDRDs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQjtBQUNmckIsT0FBS0EsR0FEVTtBQUVmWSxPQUFLQSxHQUZVO0FBR2ZLLFVBQVFBLE1BSE87QUFJZkMsU0FBT0E7QUFKUSxDQUFqQiIsImZpbGUiOiJ3Y2FjaGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZHRpbWUgPSAnX2RlYWR0aW1lJztcbmZ1bmN0aW9uIHB1dChrLCB2LCB0KSB7XG4gIHd4LnNldFN0b3JhZ2VTeW5jKGssIHYpXG4gIHZhciBzZWNvbmRzID0gcGFyc2VJbnQodCk7XG4gIGlmIChzZWNvbmRzID4gMCkge1xuICAgIHZhciB0aW1lc3RhbXAgPSBEYXRlLnBhcnNlKG5ldyBEYXRlKCkpO1xuICAgIHRpbWVzdGFtcCA9IHRpbWVzdGFtcCAvIDEwMDAgKyBzZWNvbmRzO1xuICAgIHd4LnNldFN0b3JhZ2VTeW5jKGsgKyBkdGltZSwgdGltZXN0YW1wICsgXCJcIilcbiAgfSBlbHNlIHtcbiAgICB3eC5yZW1vdmVTdG9yYWdlU3luYyhrICsgZHRpbWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0KGssIGRlZikge1xuICB2YXIgZGVhZHRpbWUgPSBwYXJzZUludCh3eC5nZXRTdG9yYWdlU3luYyhrICsgZHRpbWUpKVxuICBpZiAoZGVhZHRpbWUpIHtcbiAgICBpZiAocGFyc2VJbnQoZGVhZHRpbWUpIDwgRGF0ZS5wYXJzZShuZXcgRGF0ZSgpKSAvIDEwMDApIHtcbiAgICAgIGlmIChkZWYpIHsgcmV0dXJuIGRlZjsgfSBlbHNlIHsgcmV0dXJuOyB9XG4gICAgfVxuICB9XG4gIHZhciByZXMgPSB3eC5nZXRTdG9yYWdlU3luYyhrKTtcbiAgaWYgKHJlcykge1xuICAgIHJldHVybiByZXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRlZjtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoaykge1xuICB3eC5yZW1vdmVTdG9yYWdlU3luYyhrKTtcbiAgd3gucmVtb3ZlU3RvcmFnZVN5bmMoayArIGR0aW1lKTtcbn1cblxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIHd4LmNsZWFyU3RvcmFnZVN5bmMoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHB1dDogcHV0LFxuICBnZXQ6IGdldCxcbiAgcmVtb3ZlOiByZW1vdmUsXG4gIGNsZWFyOiBjbGVhcixcbn0iXX0=