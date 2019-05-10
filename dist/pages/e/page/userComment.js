'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commentContent = require('./../../../components/commentContent.js');

var _commentContent2 = _interopRequireDefault(_commentContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Usercomment = function (_wepy$page) {
  _inherits(Usercomment, _wepy$page);

  function Usercomment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Usercomment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Usercomment.__proto__ || Object.getPrototypeOf(Usercomment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '评价'
    }, _this.data = {
      options: {},
      stars: [0, 1, 2, 3, 4],
      normalSrc: 'http://www.qumatou.com.cn/zheng/xcximage/noComment.png',
      selectedSrc: 'http://www.qumatou.com.cn/zheng/xcximage/评价_03.jpg',
      noComment: true
    }, _this.components = {
      commentContent: _commentContent2.default
    }, _this.watch = {
      options: function options(newValue, oldValue) {
        if (newValue.totalScore == 0) {
          this.noComment = false;
        }
      }
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Usercomment, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.options = options;
      this.$apply();
      this.$invoke('commentContent', 'getCommentsInfo', this.options);
    }
  }]);

  return Usercomment;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Usercomment , 'pages/e/page/userComment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJDb21tZW50LmpzIl0sIm5hbWVzIjpbIlVzZXJjb21tZW50IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJvcHRpb25zIiwic3RhcnMiLCJub3JtYWxTcmMiLCJzZWxlY3RlZFNyYyIsIm5vQ29tbWVudCIsImNvbXBvbmVudHMiLCJjb21tZW50Q29udGVudCIsIndhdGNoIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInRvdGFsU2NvcmUiLCJtZXRob2RzIiwiJGFwcGx5IiwiJGludm9rZSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNwQkMsTSxHQUFTO0FBQ05DLDhCQUF3QjtBQURsQixLLFFBR1JDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsYUFBTyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBRkY7QUFHTEMsaUJBQVcsd0RBSE47QUFJTEMsbUJBQWEsb0RBSlI7QUFLTEMsaUJBQVU7QUFMTCxLLFFBT1BDLFUsR0FBYTtBQUNYQyxzQkFBZUE7QUFESixLLFFBUWJDLEssR0FBUTtBQUNOUCxhQURNLG1CQUNHUSxRQURILEVBQ2FDLFFBRGIsRUFDdUI7QUFDekIsWUFBR0QsU0FBU0UsVUFBVCxJQUF1QixDQUExQixFQUE0QjtBQUMxQixlQUFLTixTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUFDSjtBQUxLLEssUUFRUk8sTyxHQUFVLEU7Ozs7OzJCQWJIWCxPLEVBQVE7QUFDYixXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxXQUFLWSxNQUFMO0FBQ0EsV0FBS0MsT0FBTCxDQUFhLGdCQUFiLEVBQThCLGlCQUE5QixFQUFnRCxLQUFLYixPQUFyRDtBQUNEOzs7O0VBbEJzQ2MsZUFBS0MsSTs7a0JBQXpCbkIsVyIsImZpbGUiOiJ1c2VyQ29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgY29tbWVudENvbnRlbnQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9jb21tZW50Q29udGVudCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyY29tbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIFx0Y29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivhOS7tydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgc3RhcnM6IFswLCAxLCAyLCAzLCA0XSxcbiAgICAgIG5vcm1hbFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uvbm9Db21tZW50LnBuZycsXG4gICAgICBzZWxlY3RlZFNyYzogJ2h0dHA6Ly93d3cucXVtYXRvdS5jb20uY24vemhlbmcveGN4aW1hZ2Uv6K+E5Lu3XzAzLmpwZycsXG4gICAgICBub0NvbW1lbnQ6dHJ1ZSxcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbW1lbnRDb250ZW50OmNvbW1lbnRDb250ZW50XG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKXtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB0aGlzLiRpbnZva2UoJ2NvbW1lbnRDb250ZW50JywnZ2V0Q29tbWVudHNJbmZvJyx0aGlzLm9wdGlvbnMpXG4gICAgfVxuICAgIHdhdGNoID0ge1xuICAgICAgb3B0aW9ucyAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgaWYobmV3VmFsdWUudG90YWxTY29yZSA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMubm9Db21tZW50ID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHt9XG4gIH1cbiJdfQ==