'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var collegeAddress = function (_wepy$component) {
    _inherits(collegeAddress, _wepy$component);

    function collegeAddress() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, collegeAddress);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = collegeAddress.__proto__ || Object.getPrototypeOf(collegeAddress)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {}, _this.methods = {
            goLocal: function goLocal() {
                var that = this;
                var lat = Number(that.syncTitle.lat);
                var lon = Number(that.syncTitle.lng);
                wx.request({
                    url: 'https://apis.map.qq.com/ws/coord/v1/translate?type=' + '3' + '&locations=' + lat + ',' + lon + '&key=' + 'UBWBZ-5WFC4-BWCUY-DTW7U-DOIIK-BYBXU',
                    method: 'GET',
                    success: function success(res) {
                        // console.log(res.data.locations[0].lat)
                        var tencentLat = res.data.locations[0].lat,
                            tencentLng = res.data.locations[0].lng;
                        wx.getLocation({
                            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                            success: function success(res) {
                                wx.openLocation({
                                    latitude: tencentLat,
                                    longitude: tencentLng,
                                    scale: 16,
                                    name: that.syncTitle.name || that.syncTitle.title,
                                    address: that.syncTitle.address
                                });
                            },
                            fail: function fail(res) {
                                wx.openSetting();
                            }
                        });
                    }
                });
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(collegeAddress, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return collegeAddress;
}(_wepy2.default.component);

exports.default = collegeAddress;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlZ2VBZGRyZXNzLmpzIl0sIm5hbWVzIjpbImNvbGxlZ2VBZGRyZXNzIiwiY29tcG9uZW50cyIsImRhdGEiLCJtZXRob2RzIiwiZ29Mb2NhbCIsInRoYXQiLCJsYXQiLCJOdW1iZXIiLCJzeW5jVGl0bGUiLCJsb24iLCJsbmciLCJ3eCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwidGVuY2VudExhdCIsImxvY2F0aW9ucyIsInRlbmNlbnRMbmciLCJnZXRMb2NhdGlvbiIsInR5cGUiLCJvcGVuTG9jYXRpb24iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsInNjYWxlIiwibmFtZSIsInRpdGxlIiwiYWRkcmVzcyIsImZhaWwiLCJvcGVuU2V0dGluZyIsImV2ZW50cyIsInByb3BzIiwiT2JqZWN0IiwiZGVmYXVsdCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGM7Ozs7Ozs7Ozs7Ozs7OzBNQUNqQkMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPLEUsUUFDUEMsTyxHQUFVO0FBQ05DLG1CQURNLHFCQUNJO0FBQ04sb0JBQUlDLE9BQU8sSUFBWDtBQUNBLG9CQUFJQyxNQUFNQyxPQUFPRixLQUFLRyxTQUFMLENBQWVGLEdBQXRCLENBQVY7QUFDQSxvQkFBSUcsTUFBTUYsT0FBT0YsS0FBS0csU0FBTCxDQUFlRSxHQUF0QixDQUFWO0FBQ0FDLG1CQUFHQyxPQUFILENBQVc7QUFDUEMseUJBQUssd0RBQXNELEdBQXRELEdBQTBELGFBQTFELEdBQXdFUCxHQUF4RSxHQUE0RSxHQUE1RSxHQUFnRkcsR0FBaEYsR0FBb0YsT0FBcEYsR0FBNEYscUNBRDFGO0FBRVBLLDRCQUFRLEtBRkQ7QUFHUEMsNkJBQVMsaUJBQUNDLEdBQUQsRUFBTztBQUNaO0FBQ0EsNEJBQUlDLGFBQWFELElBQUlkLElBQUosQ0FBU2dCLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0JaLEdBQXZDO0FBQUEsNEJBQ0lhLGFBQWFILElBQUlkLElBQUosQ0FBU2dCLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0JSLEdBRHZDO0FBRUFDLDJCQUFHUyxXQUFILENBQWU7QUFDWEMsa0NBQU0sT0FESyxFQUNJO0FBQ2ZOLHFDQUFTLGlCQUFDQyxHQUFELEVBQVE7QUFDYkwsbUNBQUdXLFlBQUgsQ0FBZ0I7QUFDaEJDLDhDQUFVTixVQURNO0FBRWhCTywrQ0FBV0wsVUFGSztBQUdoQk0sMkNBQU8sRUFIUztBQUloQkMsMENBQU1yQixLQUFLRyxTQUFMLENBQWVrQixJQUFmLElBQXVCckIsS0FBS0csU0FBTCxDQUFlbUIsS0FKNUI7QUFLaEJDLDZDQUFTdkIsS0FBS0csU0FBTCxDQUFlb0I7QUFMUixpQ0FBaEI7QUFPSCw2QkFWVTtBQVdYQyxrQ0FBSyxjQUFDYixHQUFELEVBQU87QUFDUkwsbUNBQUdtQixXQUFIO0FBQ0g7QUFiVSx5QkFBZjtBQWVIO0FBdEJNLGlCQUFYO0FBd0JMO0FBN0JPLFMsUUFnQ1ZDLE0sR0FBUyxFLFFBQ1RDLEssR0FBUTtBQUNKeEIsdUJBQVU7QUFDTmEsc0JBQUtZLE1BREM7QUFFTkMseUJBQVM7QUFGSDtBQUROLFM7Ozs7O2lDQU1BLENBQ1A7Ozs7RUE1Q3VDQyxlQUFLQyxTOztrQkFBNUJwQyxjIiwiZmlsZSI6ImNvbGxlZ2VBZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbGxlZ2VBZGRyZXNzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7fTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBnb0xvY2FsKCkge1xuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgbGV0IGxhdCA9IE51bWJlcih0aGF0LnN5bmNUaXRsZS5sYXQpO1xuICAgICAgICAgICAgbGV0IGxvbiA9IE51bWJlcih0aGF0LnN5bmNUaXRsZS5sbmcpO1xuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly9hcGlzLm1hcC5xcS5jb20vd3MvY29vcmQvdjEvdHJhbnNsYXRlP3R5cGU9JysnMycrJyZsb2NhdGlvbnM9JytsYXQrJywnK2xvbisnJmtleT0nKydVQldCWi01V0ZDNC1CV0NVWS1EVFc3VS1ET0lJSy1CWUJYVScsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZGF0YS5sb2NhdGlvbnNbMF0ubGF0KVxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVuY2VudExhdCA9IHJlcy5kYXRhLmxvY2F0aW9uc1swXS5sYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW5jZW50TG5nID0gcmVzLmRhdGEubG9jYXRpb25zWzBdLmxuZztcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0TG9jYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2djajAyJywgLy/ov5Tlm57lj6/ku6XnlKjkuo53eC5vcGVuTG9jYXRpb27nmoTnu4/nuqzluqZcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4Lm9wZW5Mb2NhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHRlbmNlbnRMYXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiB0ZW5jZW50TG5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAxNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGF0LnN5bmNUaXRsZS5uYW1lIHx8IHRoYXQuc3luY1RpdGxlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHRoYXQuc3luY1RpdGxlLmFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWw6KHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZygpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6e1xuICAgICAgICAgICAgdHlwZTpPYmplY3QsXG4gICAgICAgICAgICBkZWZhdWx0OiAnbnVsbCdcbiAgICAgICAgfSxcbiAgICB9XG4gICAgb25Mb2FkKCl7XG4gICAgfVxufVxuIl19