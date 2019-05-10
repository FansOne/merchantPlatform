'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var count = 0;

var Commentstar = function (_wepy$component) {
  _inherits(Commentstar, _wepy$component);

  function Commentstar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Commentstar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Commentstar.__proto__ || Object.getPrototypeOf(Commentstar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      stars: [0, 1, 2, 3, 4],
      normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/star.png',
      selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starWhole.png',
      halfSrc: 'http://www.qumatou.com.cn/zheng/xcximage/starHalf.png',
      key: 0
    }, _this.components = {}, _this.methods = {
      selectLeft: function selectLeft(e) {
        var key = e.currentTarget.dataset.key;
        if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
          key = 0;
        }
        count = key;
        this.key = key;
        _wepy2.default.$instance.globalData.score = key;
        this.$apply();
      },
      selectRight: function selectRight(e) {
        var key = e.currentTarget.dataset.key;
        count = key;
        this.key = key;
        _wepy2.default.$instance.globalData.score = key;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Commentstar;
}(_wepy2.default.component);

exports.default = Commentstar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnRTdGFyLmpzIl0sIm5hbWVzIjpbImNvdW50IiwiQ29tbWVudHN0YXIiLCJkYXRhIiwic3RhcnMiLCJub3JtYWxTcmMiLCJzZWxlY3RlZFNyYyIsImhhbGZTcmMiLCJrZXkiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInNlbGVjdExlZnQiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsInNjb3JlIiwiJGFwcGx5Iiwic2VsZWN0UmlnaHQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsUUFBUSxDQUFaOztJQUNxQkMsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxJLEdBQU87QUFDTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBREY7QUFFTEMsaUJBQVcsbURBRk47QUFHTEMsbUJBQWEsd0RBSFI7QUFJTEMsZUFBUSx1REFKSDtBQUtMQyxXQUFLO0FBTEEsSyxRQU9QQyxVLEdBQWEsRSxRQUNiQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0lDLENBREosRUFDTztBQUNiLFlBQUlKLE1BQU1JLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCTixHQUFsQztBQUNBLFlBQUksS0FBS0wsSUFBTCxDQUFVSyxHQUFWLElBQWlCLEdBQWpCLElBQXdCSSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3Qk4sR0FBeEIsSUFBK0IsR0FBM0QsRUFBZ0U7QUFDOURBLGdCQUFNLENBQU47QUFDRDtBQUNEUCxnQkFBUU8sR0FBUjtBQUNBLGFBQUtBLEdBQUwsR0FBV0EsR0FBWDtBQUNBTyx1QkFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxLQUExQixHQUFrQ1YsR0FBbEM7QUFDQSxhQUFLVyxNQUFMO0FBQ0QsT0FWTztBQVdSQyxpQkFYUSx1QkFXS1IsQ0FYTCxFQVdRO0FBQ2QsWUFBSUosTUFBTUksRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JOLEdBQWxDO0FBQ0FQLGdCQUFRTyxHQUFSO0FBQ0EsYUFBS0EsR0FBTCxHQUFXQSxHQUFYO0FBQ0FPLHVCQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLEtBQTFCLEdBQWtDVixHQUFsQztBQUNBLGFBQUtXLE1BQUw7QUFDRDtBQWpCTyxLOzs7O0VBVDZCSixlQUFLTSxTOztrQkFBekJuQixXIiwiZmlsZSI6ImNvbW1lbnRTdGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGxldCBjb3VudCA9IDBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudHN0YXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIHN0YXJzOiBbMCwgMSwgMiwgMywgNF0sXG4gICAgICBub3JtYWxTcmM6ICdodHRwOi8vd3d3LnF1bWF0b3UuY29tLmNuL3poZW5nL3hjeGltYWdlL3N0YXIucG5nJyxcbiAgICAgIHNlbGVjdGVkU3JjOiAnaHR0cDovL3d3dy5xdW1hdG91LmNvbS5jbi96aGVuZy94Y3hpbWFnZS9zdGFyV2hvbGUucG5nJyxcbiAgICAgIGhhbGZTcmM6J2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvc3RhckhhbGYucG5nJyxcbiAgICAgIGtleTogMCxcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHt9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHNlbGVjdExlZnQgKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleVxuICAgICAgICBpZiAodGhpcy5kYXRhLmtleSA9PSAwLjUgJiYgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5ID09IDAuNSkge1xuICAgICAgICAgIGtleSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgY291bnQgPSBrZXlcbiAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zY29yZSA9IGtleVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgc2VsZWN0UmlnaHQgKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmtleVxuICAgICAgICBjb3VudCA9IGtleVxuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnNjb3JlID0ga2V5XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgfVxuICB9XG4iXX0=