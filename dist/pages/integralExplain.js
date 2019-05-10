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

var integralExplain = function (_wepy$page) {
    _inherits(integralExplain, _wepy$page);

    function integralExplain() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, integralExplain);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = integralExplain.__proto__ || Object.getPrototypeOf(integralExplain)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '赚取积分'
        }, _this.components = {}, _this.data = {
            imgUrls: [{
                imagePath: 'http://www.qumatou.com.cn/zheng/20190417/FF9D2670E6D09188FFE219AF0D33C705.jpg'
            }],
            m_id: '',
            maskShow: false,
            wxCode: ''
        }, _this.methods = {
            requestCode: function requestCode() {
                var _this2 = this;

                (0, _requestData.requestData)(_requestUrl2.default.getPersonalCode, 'POST', {
                    toekn: wx.getStorageSync('token'),
                    m_id: this.m_id,
                    type: 1
                }).then(function (res) {
                    _this2.maskShow = true;
                    _this2.wxCode = res.data.data.URL;
                    _this2.$apply();
                });
            },
            closeMask: function closeMask() {
                this.maskShow = !this.maskShow;
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(integralExplain, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.m_id = options.m_id;
        }
    }]);

    return integralExplain;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(integralExplain , 'pages/integralExplain'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludGVncmFsRXhwbGFpbi5qcyJdLCJuYW1lcyI6WyJpbnRlZ3JhbEV4cGxhaW4iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJpbWdVcmxzIiwiaW1hZ2VQYXRoIiwibV9pZCIsIm1hc2tTaG93Iiwid3hDb2RlIiwibWV0aG9kcyIsInJlcXVlc3RDb2RlIiwicmVxdWVzdFVybCIsImdldFBlcnNvbmFsQ29kZSIsInRvZWtuIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInR5cGUiLCJ0aGVuIiwicmVzIiwiVVJMIiwiJGFwcGx5IiwiY2xvc2VNYXNrIiwiZXZlbnRzIiwib3B0aW9ucyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs7Ozs7OzRNQUNqQkMsTSxHQUFTO0FBQ0xDLG9DQUF3QjtBQURuQixTLFFBR1RDLFUsR0FBYSxFLFFBRWJDLEksR0FBTztBQUNIQyxxQkFBUSxDQUNKO0FBQ0lDLDJCQUFVO0FBRGQsYUFESSxDQURMO0FBTUhDLGtCQUFLLEVBTkY7QUFPSEMsc0JBQVMsS0FQTjtBQVFIQyxvQkFBTztBQVJKLFMsUUFVUEMsTyxHQUFVO0FBQ05DLHVCQURNLHlCQUNPO0FBQUE7O0FBQ1QsOENBQVlDLHFCQUFXQyxlQUF2QixFQUF1QyxNQUF2QyxFQUE4QztBQUMxQ0MsMkJBQVFDLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FEa0M7QUFFMUNULDBCQUFPLEtBQUtBLElBRjhCO0FBRzFDVSwwQkFBTztBQUhtQyxpQkFBOUMsRUFJR0MsSUFKSCxDQUlRLGVBQUs7QUFDVCwyQkFBS1YsUUFBTCxHQUFnQixJQUFoQjtBQUNBLDJCQUFLQyxNQUFMLEdBQWNVLElBQUlmLElBQUosQ0FBU0EsSUFBVCxDQUFjZ0IsR0FBNUI7QUFDQSwyQkFBS0MsTUFBTDtBQUNILGlCQVJEO0FBU0gsYUFYSztBQVlOQyxxQkFaTSx1QkFZSztBQUNQLHFCQUFLZCxRQUFMLEdBQWdCLENBQUMsS0FBS0EsUUFBdEI7QUFDSDtBQWRLLFMsUUFpQlZlLE0sR0FBUyxFOzs7OzsrQkFDRkMsTyxFQUFTO0FBQ1osaUJBQUtqQixJQUFMLEdBQVlpQixRQUFRakIsSUFBcEI7QUFDSDs7OztFQXBDd0NrQixlQUFLQyxJOztrQkFBN0IxQixlIiwiZmlsZSI6ImludGVncmFsRXhwbGFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vYXBpL3JlcXVlc3REYXRhJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbnRlZ3JhbEV4cGxhaW4gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+i1muWPluenr+WIhicsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBpbWdVcmxzOltcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbWFnZVBhdGg6J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcvMjAxOTA0MTcvRkY5RDI2NzBFNkQwOTE4OEZGRTIxOUFGMEQzM0M3MDUuanBnJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBtX2lkOicnLFxuICAgICAgICBtYXNrU2hvdzpmYWxzZSxcbiAgICAgICAgd3hDb2RlOicnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICByZXF1ZXN0Q29kZSgpe1xuICAgICAgICAgICAgcmVxdWVzdERhdGEocmVxdWVzdFVybC5nZXRQZXJzb25hbENvZGUsJ1BPU1QnLHtcbiAgICAgICAgICAgICAgICB0b2VrbiA6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgICAgIG1faWQgOiB0aGlzLm1faWQsXG4gICAgICAgICAgICAgICAgdHlwZSA6IDFcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrU2hvdyA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLnd4Q29kZSA9IHJlcy5kYXRhLmRhdGEuVVJMXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VNYXNrKCl7XG4gICAgICAgICAgICB0aGlzLm1hc2tTaG93ID0gIXRoaXMubWFza1Nob3dcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICB0aGlzLm1faWQgPSBvcHRpb25zLm1faWRcbiAgICB9O1xufVxuIl19