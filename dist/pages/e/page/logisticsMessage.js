'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logisticsmessage = function (_wepy$page) {
  _inherits(Logisticsmessage, _wepy$page);

  function Logisticsmessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Logisticsmessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Logisticsmessage.__proto__ || Object.getPrototypeOf(Logisticsmessage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '物流追踪'
    }, _this.data = {
      logisticsData: {},
      //实时物流状态
      trackList: [],
      token: ''
    }, _this.methods = {
      copyNumber: function copyNumber() {
        var self = this;
        wx.setClipboardData({
          data: self.logisticsData.logistic_number,
          success: function success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'none',
              image: '../images/复制.png',
              duration: 1000
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Logisticsmessage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      //获取token
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.orderId = options.orderId;
      if (this.token && this.orderId) {
        this.getLogistics();
      }
    }
  }, {
    key: 'getLogistics',

    //物流信息
    value: function getLogistics() {
      var that = this;
      // const url = api.apiMall + 'api/shop_order_details/' + that.orderId;
      var url = _api2.default.apiMall + 'api/kuaiDi/';
      _wepy2.default.request({
        url: url,
        method: 'GET',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/vnd.lingmo.v1+json'
        },
        data: {
          out_id: "868123456789"
        }
      }).then(function (res) {
        that.logisticsData = res.data.message;
        that.trackList = res.data.message.tracklist.TrackList.reverse();
        that.$apply();
        that.trackList.forEach(function (item, index) {
          item.status = false;
        });
        that.trackList[0].status = true;
        that.$apply();
      });
    }
    // getLogistics(){
    //   const that = this;
    //   const url = api.apiMall + '/shop/logistic';
    //   const data = {
    //     orderId: that.orderId,
    //   }
    //   wepy.request({
    //     url: url,
    //     method: 'POST',
    //     data: data,
    //   }).then((res)=>{
    //     that.logisticsData = res.data
    //     that.trackList = res.data.logistic.TrackList.reverse()
    //     that.$apply()
    //     that.trackList.forEach((item,index)=>{
    //     	item.status = false
    //     })
    //     that.trackList[0].status = true
    //     that.$apply()
    //   })
    // }

  }]);

  return Logisticsmessage;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Logisticsmessage , 'pages/e/page/logisticsMessage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2lzdGljc01lc3NhZ2UuanMiXSwibmFtZXMiOlsiTG9naXN0aWNzbWVzc2FnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwibG9naXN0aWNzRGF0YSIsInRyYWNrTGlzdCIsInRva2VuIiwibWV0aG9kcyIsImNvcHlOdW1iZXIiLCJzZWxmIiwid3giLCJzZXRDbGlwYm9hcmREYXRhIiwibG9naXN0aWNfbnVtYmVyIiwic3VjY2VzcyIsInJlcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZHVyYXRpb24iLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJvcmRlcklkIiwiZ2V0TG9naXN0aWNzIiwidGhhdCIsInVybCIsImFwaSIsImFwaU1hbGwiLCJ3ZXB5IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsIm91dF9pZCIsInRoZW4iLCJtZXNzYWdlIiwidHJhY2tsaXN0IiwiVHJhY2tMaXN0IiwicmV2ZXJzZSIsIiRhcHBseSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJzdGF0dXMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7Ozs7Ozs7Ozs7OzswTUFDcEJDLE0sR0FBUztBQUNSQyw4QkFBd0I7QUFEaEIsSyxRQUdUQyxJLEdBQU87QUFDTkMscUJBQWMsRUFEUjtBQUVOO0FBQ0RDLGlCQUFVLEVBSEg7QUFJUEMsYUFBTTtBQUpDLEssUUFlTkMsTyxHQUFVO0FBQ1RDLGdCQURTLHdCQUNHO0FBQ1IsWUFBSUMsT0FBSyxJQUFUO0FBQ0FDLFdBQUdDLGdCQUFILENBQW9CO0FBQ2xCUixnQkFBTU0sS0FBS0wsYUFBTCxDQUFtQlEsZUFEUDtBQUVsQkMsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkosZUFBR0ssU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLE1BREk7QUFFWEMsb0JBQU0sTUFGSztBQUdYQyxxQkFBTyxrQkFISTtBQUlYQyx3QkFBVTtBQUpDLGFBQWI7QUFNRDtBQVRpQixTQUFwQjtBQVdIO0FBZFEsSzs7Ozs7MkJBVEhDLE8sRUFBUTtBQUNoQjtBQUNHLFVBQUlkLFFBQVFJLEdBQUdXLGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWjtBQUNBLFdBQUtmLEtBQUwsR0FBYUEsTUFBTWdCLFlBQW5CO0FBQ0gsV0FBS0MsT0FBTCxHQUFlSCxRQUFRRyxPQUF2QjtBQUNBLFVBQUcsS0FBS2pCLEtBQUwsSUFBYyxLQUFLaUIsT0FBdEIsRUFBOEI7QUFDN0IsYUFBS0MsWUFBTDtBQUNBO0FBQ0M7Ozs7QUFpQkg7bUNBQ2M7QUFDVixVQUFNQyxPQUFPLElBQWI7QUFDQTtBQUNBLFVBQU1DLE1BQU1DLGNBQUlDLE9BQUosR0FBYyxhQUExQjtBQUNBQyxxQkFBS0MsT0FBTCxDQUFhO0FBQ1hKLGFBQUtBLEdBRE07QUFFWEssZ0JBQVEsS0FGRztBQUdYQyxnQkFBTztBQUNMLDBCQUFlLGlEQURWO0FBRUwsb0JBQVM7QUFGSixTQUhJO0FBT2Y3QixjQUFLO0FBQ0o4QixrQkFBTztBQURIO0FBUFUsT0FBYixFQVVHQyxJQVZILENBVVEsVUFBQ3BCLEdBQUQsRUFBTztBQUNqQlcsYUFBS3JCLGFBQUwsR0FBcUJVLElBQUlYLElBQUosQ0FBU2dDLE9BQTlCO0FBQ0FWLGFBQUtwQixTQUFMLEdBQWlCUyxJQUFJWCxJQUFKLENBQVNnQyxPQUFULENBQWlCQyxTQUFqQixDQUEyQkMsU0FBM0IsQ0FBcUNDLE9BQXJDLEVBQWpCO0FBQ0FiLGFBQUtjLE1BQUw7QUFDQWQsYUFBS3BCLFNBQUwsQ0FBZW1DLE9BQWYsQ0FBdUIsVUFBQ0MsSUFBRCxFQUFNQyxLQUFOLEVBQWM7QUFDaENELGVBQUtFLE1BQUwsR0FBYyxLQUFkO0FBQ0osU0FGRDtBQUdJbEIsYUFBS3BCLFNBQUwsQ0FBZSxDQUFmLEVBQWtCc0MsTUFBbEIsR0FBMkIsSUFBM0I7QUFDQWxCLGFBQUtjLE1BQUw7QUFDRCxPQW5CRDtBQW9CRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUFqRjRDVixlQUFLZSxJOztrQkFBOUI1QyxnQiIsImZpbGUiOiJsb2dpc3RpY3NNZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vYXBpL2FwaSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpc3RpY3NtZXNzYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgXHRjb25maWcgPSB7XG4gIFx0XHRuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn54mp5rWB6L+96LiqJyxcbiAgXHR9XG4gIFx0ZGF0YSA9IHtcbiAgXHRcdGxvZ2lzdGljc0RhdGE6e30sXG4gIFx0XHQvL+WunuaXtueJqea1geeKtuaAgVxuXHRcdFx0dHJhY2tMaXN0OltdLFxuXHRcdFx0dG9rZW46JydcbiAgXHR9XG4gICAgb25Mb2FkKG9wdGlvbnMpe1xuXHRcdFx0Ly/ojrflj5Z0b2tlblxuICAgICAgbGV0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoXCJhY2Nlc3NfdG9rZW5cIik7XG4gICAgICB0aGlzLnRva2VuID0gdG9rZW4uYWNjZXNzX3Rva2VuO1xuXHRcdFx0dGhpcy5vcmRlcklkID0gb3B0aW9ucy5vcmRlcklkXG5cdFx0XHRpZih0aGlzLnRva2VuICYmIHRoaXMub3JkZXJJZCl7XG5cdFx0XHRcdHRoaXMuZ2V0TG9naXN0aWNzKClcblx0XHRcdH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICBcdGNvcHlOdW1iZXIoKXtcblx0ICAgICAgICB2YXIgc2VsZj10aGlzO1xuXHQgICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoeyBcblx0ICAgICAgICAgIGRhdGE6IHNlbGYubG9naXN0aWNzRGF0YS5sb2dpc3RpY19udW1iZXIsXG5cdCAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcblx0ICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcblx0ICAgICAgICAgICAgICB0aXRsZTogJ+WkjeWItuaIkOWKnycsXG5cdCAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuXHQgICAgICAgICAgICAgIGltYWdlOiAnLi4vaW1hZ2VzL+WkjeWIti5wbmcnLFxuXHQgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG5cdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfSlcbiAgICBcdH1cbiAgICB9XG5cdFx0Ly/nianmtYHkv6Hmga9cblx0XHRnZXRMb2dpc3RpY3MoKXtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgLy8gY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3Nob3Bfb3JkZXJfZGV0YWlscy8nICsgdGhhdC5vcmRlcklkO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL2t1YWlEaS8nO1xuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGhlYWRlcjp7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTp7XG5cdFx0XHRcdFx0b3V0X2lkOlwiODY4MTIzNDU2Nzg5XCJcblx0XHRcdFx0fVxuICAgICAgfSkudGhlbigocmVzKT0+e1xuXHRcdFx0XHR0aGF0LmxvZ2lzdGljc0RhdGEgPSByZXMuZGF0YS5tZXNzYWdlO1xuXHRcdFx0XHR0aGF0LnRyYWNrTGlzdCA9IHJlcy5kYXRhLm1lc3NhZ2UudHJhY2tsaXN0LlRyYWNrTGlzdC5yZXZlcnNlKCk7XG5cdFx0XHRcdHRoYXQuJGFwcGx5KClcblx0XHRcdFx0dGhhdC50cmFja0xpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAgICAgXHRpdGVtLnN0YXR1cyA9IGZhbHNlXG5cdFx0XHRcdH0pXG4gICAgICAgIHRoYXQudHJhY2tMaXN0WzBdLnN0YXR1cyA9IHRydWVcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8gZ2V0TG9naXN0aWNzKCl7XG4gICAgLy8gICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAvLyAgIGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJy9zaG9wL2xvZ2lzdGljJztcbiAgICAvLyAgIGNvbnN0IGRhdGEgPSB7XG4gICAgLy8gICAgIG9yZGVySWQ6IHRoYXQub3JkZXJJZCxcbiAgICAvLyAgIH1cbiAgICAvLyAgIHdlcHkucmVxdWVzdCh7XG4gICAgLy8gICAgIHVybDogdXJsLFxuICAgIC8vICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAvLyAgICAgZGF0YTogZGF0YSxcbiAgICAvLyAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAvLyAgICAgdGhhdC5sb2dpc3RpY3NEYXRhID0gcmVzLmRhdGFcbiAgICAvLyAgICAgdGhhdC50cmFja0xpc3QgPSByZXMuZGF0YS5sb2dpc3RpYy5UcmFja0xpc3QucmV2ZXJzZSgpXG4gICAgLy8gICAgIHRoYXQuJGFwcGx5KClcbiAgICAvLyAgICAgdGhhdC50cmFja0xpc3QuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcbiAgICAvLyAgICAgXHRpdGVtLnN0YXR1cyA9IGZhbHNlXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIHRoYXQudHJhY2tMaXN0WzBdLnN0YXR1cyA9IHRydWVcbiAgICAvLyAgICAgdGhhdC4kYXBwbHkoKVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG4gIH1cbiJdfQ==