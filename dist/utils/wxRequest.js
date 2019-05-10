'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _tip = require('./tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import md5 from './md5';


// const API_SECRET_KEY = 'www.mall.cycle.com'
// const TIMESTAMP = util.getCurrentTime()
// const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

var wxRequest = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var url = arguments[1];
    var data, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _tip2.default.loading();
            data = params.query || {};
            // data.sign = SIGN;
            // data.time = TIMESTAMP;

            _context.next = 4;
            return _wepy2.default.request({
              url: url,
              method: params.method || 'GET',
              data: data,
              header: { 'Content-Type': 'application/json' }
            });

          case 4:
            res = _context.sent;

            _tip2.default.loaded();
            return _context.abrupt('return', res);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function wxRequest() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  wxRequest: wxRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJwYXJhbXMiLCJ1cmwiLCJ0aXAiLCJsb2FkaW5nIiwiZGF0YSIsInF1ZXJ5Iiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJyZXMiLCJsb2FkZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7OztBQURBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUE7QUFBQSxxRUFBWTtBQUFBLFFBQU1DLE1BQU4sdUVBQWUsRUFBZjtBQUFBLFFBQW1CQyxHQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaEJDLDBCQUFJQyxPQUFKO0FBQ0lDLGdCQUZZLEdBRUxKLE9BQU9LLEtBQVAsSUFBZ0IsRUFGWDtBQUdoQjtBQUNBOztBQUpnQjtBQUFBLG1CQUtBQyxlQUFLQyxPQUFMLENBQWE7QUFDM0JOLG1CQUFLQSxHQURzQjtBQUUzQk8sc0JBQVFSLE9BQU9RLE1BQVAsSUFBaUIsS0FGRTtBQUczQkosb0JBQU1BLElBSHFCO0FBSTNCSyxzQkFBUSxFQUFFLGdCQUFnQixrQkFBbEI7QUFKbUIsYUFBYixDQUxBOztBQUFBO0FBS1pDLGVBTFk7O0FBV2hCUiwwQkFBSVMsTUFBSjtBQVhnQiw2Q0FZVEQsR0FaUzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQU47O0FBZ0JBRSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZkO0FBRGUsQ0FBakIiLCJmaWxlIjoid3hSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgdXRpbCBmcm9tICcuL3V0aWwnO1xuLy8gaW1wb3J0IG1kNSBmcm9tICcuL21kNSc7XG5pbXBvcnQgdGlwIGZyb20gJy4vdGlwJ1xuXG4vLyBjb25zdCBBUElfU0VDUkVUX0tFWSA9ICd3d3cubWFsbC5jeWNsZS5jb20nXG4vLyBjb25zdCBUSU1FU1RBTVAgPSB1dGlsLmdldEN1cnJlbnRUaW1lKClcbi8vIGNvbnN0IFNJR04gPSBtZDUuaGV4X21kNSgoVElNRVNUQU1QICsgQVBJX1NFQ1JFVF9LRVkpLnRvTG93ZXJDYXNlKCkpXG5cbmNvbnN0IHd4UmVxdWVzdCA9IGFzeW5jKHBhcmFtcyA9IHt9LCB1cmwpID0+IHtcbiAgdGlwLmxvYWRpbmcoKTtcbiAgbGV0IGRhdGEgPSBwYXJhbXMucXVlcnkgfHwge307XG4gIC8vIGRhdGEuc2lnbiA9IFNJR047XG4gIC8vIGRhdGEudGltZSA9IFRJTUVTVEFNUDtcbiAgbGV0IHJlcyA9IGF3YWl0IHdlcHkucmVxdWVzdCh7XG4gICAgdXJsOiB1cmwsXG4gICAgbWV0aG9kOiBwYXJhbXMubWV0aG9kIHx8ICdHRVQnLFxuICAgIGRhdGE6IGRhdGEsXG4gICAgaGVhZGVyOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgfSk7XG4gIHRpcC5sb2FkZWQoKTtcbiAgcmV0dXJuIHJlcztcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHd4UmVxdWVzdFxufVxuIl19