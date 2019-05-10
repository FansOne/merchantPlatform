'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var commentContent = function (_wepy$component) {
  _inherits(commentContent, _wepy$component);

  function commentContent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, commentContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = commentContent.__proto__ || Object.getPrototypeOf(commentContent)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      comments: [],
      stars: [0, 1, 2, 3, 4],
      normalSrc: '../images/star.png',
      selectedSrc: '../images/starWhole.png',
      halfSrc: '../images/starHalf.png'
      // key: 3, //评分
    }, _this.methods = {
      dianZan: function dianZan(e) {
        var that = this,
            index = e.currentTarget.dataset.id;
        if (that.content[index].num == 2) {
          that.content[index].dianZan = '../images/评价_10.jpg', that.content[index].num = that.content[index].num + 1, wx.setStorage({
            key: 'key',
            data: { img: that.content[index].dianZan, num: that.content[index].num },
            success: function success(res) {
              wx.getStorage({
                key: 'key',
                success: function success(ress) {
                  // console.log(ress.data.img)
                  that.content[index].dianZan = ress.data.img;
                  that.$apply();
                }
              });
            }
          });
        } else {
          that.content[index].dianZan = '../images/评价_07.jpg', that.content[index].num = that.content[index].num - 1;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(commentContent, [{
    key: 'getCommentsInfo',

    //获取商品评论列表
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var goodsId, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                goodsId = this.goodsId;
                url = _api2.default.apiMall + 'api/shop_comment/' + this.goodsId + '/type/2';
                _context.next = 4;
                return _wepy2.default.request({
                  url: url,
                  method: 'GET'
                }).then(function (res) {
                  console.log("评价");
                  console.log(res);
                  wx.hideNavigationBarLoading();
                  _this2.comments = res.data.message, _this2.$apply();
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCommentsInfo() {
        return _ref2.apply(this, arguments);
      }

      return getCommentsInfo;
    }()
    // 获取用户评论

  }, {
    key: 'getUserComments',
    value: function getUserComments(options) {
      wx.showNavigationBarLoading();
      var that = this;
      var goodsId = that.goodsId;
      var url = _api2.default.apiMall + '/shop/goodDetail';
      var data = {
        goodId: options.goodsId,
        userId: options.userId
      };
      _wepy2.default.request({
        url: url,
        method: 'POST',
        data: data
      }).then(function (res) {
        wx.hideNavigationBarLoading();
        that.comments = res.data.data.comments, that.$apply();
        // console.log(that.comments)  
      });
    }
  }]);

  return commentContent;
}(_wepy2.default.component);

exports.default = commentContent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnRDb250ZW50LmpzIl0sIm5hbWVzIjpbImNvbW1lbnRDb250ZW50IiwiZGF0YSIsImNvbW1lbnRzIiwic3RhcnMiLCJub3JtYWxTcmMiLCJzZWxlY3RlZFNyYyIsImhhbGZTcmMiLCJtZXRob2RzIiwiZGlhblphbiIsImUiLCJ0aGF0IiwiaW5kZXgiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImlkIiwiY29udGVudCIsIm51bSIsInd4Iiwic2V0U3RvcmFnZSIsImtleSIsImltZyIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRTdG9yYWdlIiwicmVzcyIsIiRhcHBseSIsImdvb2RzSWQiLCJ1cmwiLCJhcGkiLCJhcGlNYWxsIiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsIm1lc3NhZ2UiLCJvcHRpb25zIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiZ29vZElkIiwidXNlcklkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ3BCQyxJLEdBQU87QUFDTkMsZ0JBQVMsRUFESDtBQUVOQyxhQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsQ0FGRDtBQUdOQyxpQkFBVyxvQkFITDtBQUlMQyxtQkFBYSx5QkFKUjtBQUtMQyxlQUFRO0FBQ1I7QUFOSyxLLFFBUU5DLE8sR0FBVTtBQUNUQyxhQURTLG1CQUNEQyxDQURDLEVBQ0M7QUFDVCxZQUFJQyxPQUFPLElBQVg7QUFBQSxZQUNDQyxRQUFRRixFQUFFRyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsRUFEakM7QUFFQSxZQUFHSixLQUFLSyxPQUFMLENBQWFKLEtBQWIsRUFBb0JLLEdBQXBCLElBQTJCLENBQTlCLEVBQWdDO0FBQy9CTixlQUFLSyxPQUFMLENBQWFKLEtBQWIsRUFBb0JILE9BQXBCLEdBQThCLHFCQUE5QixFQUNBRSxLQUFLSyxPQUFMLENBQWFKLEtBQWIsRUFBb0JLLEdBQXBCLEdBQTJCTixLQUFLSyxPQUFMLENBQWFKLEtBQWIsRUFBb0JLLEdBQXBCLEdBQXdCLENBRG5ELEVBRUFDLEdBQUdDLFVBQUgsQ0FBYztBQUNaQyxpQkFBSyxLQURPO0FBRVpsQixrQkFBTSxFQUFDbUIsS0FBSVYsS0FBS0ssT0FBTCxDQUFhSixLQUFiLEVBQW9CSCxPQUF6QixFQUFpQ1EsS0FBSU4sS0FBS0ssT0FBTCxDQUFhSixLQUFiLEVBQW9CSyxHQUF6RCxFQUZNO0FBR1pLLHFCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDdEJMLGlCQUFHTSxVQUFILENBQWM7QUFDakJKLHFCQUFLLEtBRFk7QUFFakJFLHlCQUFTLGlCQUFTRyxJQUFULEVBQWU7QUFDcEI7QUFDQWQsdUJBQUtLLE9BQUwsQ0FBYUosS0FBYixFQUFvQkgsT0FBcEIsR0FBOEJnQixLQUFLdkIsSUFBTCxDQUFVbUIsR0FBeEM7QUFDQVYsdUJBQUtlLE1BQUw7QUFDSDtBQU5nQixlQUFkO0FBUUE7QUFaVyxXQUFkLENBRkE7QUFnQkEsU0FqQkQsTUFpQks7QUFDSmYsZUFBS0ssT0FBTCxDQUFhSixLQUFiLEVBQW9CSCxPQUFwQixHQUE4QixxQkFBOUIsRUFDQUUsS0FBS0ssT0FBTCxDQUFhSixLQUFiLEVBQW9CSyxHQUFwQixHQUEyQk4sS0FBS0ssT0FBTCxDQUFhSixLQUFiLEVBQW9CSyxHQUFwQixHQUF3QixDQURuRDtBQUVBO0FBQ0Q7QUF6QlEsSzs7Ozs7O0FBMkJiOzs7Ozs7Ozs7O0FBRVdVLHVCLEdBQVUsS0FBS0EsTztBQUNmQyxtQixHQUFNQyxjQUFJQyxPQUFKLEdBQWMsbUJBQWQsR0FBb0MsS0FBS0gsT0FBekMsR0FBbUQsUzs7dUJBQ3pESSxlQUFLQyxPQUFMLENBQWE7QUFDakJKLHVCQUFLQSxHQURZO0FBRWpCSywwQkFBUTtBQUZTLGlCQUFiLEVBR0hDLElBSEcsQ0FHRSxVQUFDWCxHQUFELEVBQU87QUFDbkJZLDBCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBRCwwQkFBUUMsR0FBUixDQUFZYixHQUFaO0FBQ01MLHFCQUFHbUIsd0JBQUg7QUFDQSx5QkFBS2xDLFFBQUwsR0FBZ0JvQixJQUFJckIsSUFBSixDQUFTb0MsT0FBekIsRUFDQSxPQUFLWixNQUFMLEVBREE7QUFFRCxpQkFUSyxDOzs7Ozs7Ozs7Ozs7Ozs7O0FBV1I7Ozs7b0NBQ2dCYSxPLEVBQVE7QUFDdEJyQixTQUFHc0Isd0JBQUg7QUFDQSxVQUFNN0IsT0FBTyxJQUFiO0FBQ0EsVUFBTWdCLFVBQVVoQixLQUFLZ0IsT0FBckI7QUFDQSxVQUFNQyxNQUFNQyxjQUFJQyxPQUFKLEdBQWMsa0JBQTFCO0FBQ0EsVUFBTTVCLE9BQU87QUFDWHVDLGdCQUFRRixRQUFRWixPQURMO0FBRVhlLGdCQUFRSCxRQUFRRztBQUZMLE9BQWI7QUFJQVgscUJBQUtDLE9BQUwsQ0FBYTtBQUNYSixhQUFLQSxHQURNO0FBRVhLLGdCQUFRLE1BRkc7QUFHWC9CLGNBQU1BO0FBSEssT0FBYixFQUlHZ0MsSUFKSCxDQUlRLFVBQUNYLEdBQUQsRUFBTztBQUNkTCxXQUFHbUIsd0JBQUg7QUFDQzFCLGFBQUtSLFFBQUwsR0FBZ0JvQixJQUFJckIsSUFBSixDQUFTQSxJQUFULENBQWNDLFFBQTlCLEVBQ0FRLEtBQUtlLE1BQUwsRUFEQTtBQUVBO0FBQ0QsT0FURDtBQVVEOzs7O0VBdkV5Q0ssZUFBS1ksUzs7a0JBQTVCMUMsYyIsImZpbGUiOiJjb21tZW50Q29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgY29tbWVudENvbnRlbnQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIFx0ZGF0YSA9IHtcbiAgXHRcdGNvbW1lbnRzOltdLFxuICBcdFx0c3RhcnM6IFswLCAxLCAyLCAzLCA0XSxcbiAgXHRcdG5vcm1hbFNyYzogJy4uL2ltYWdlcy9zdGFyLnBuZycsXG4gICAgXHRzZWxlY3RlZFNyYzogJy4uL2ltYWdlcy9zdGFyV2hvbGUucG5nJyxcbiAgICBcdGhhbGZTcmM6Jy4uL2ltYWdlcy9zdGFySGFsZi5wbmcnLFxuICAgIFx0Ly8ga2V5OiAzLCAvL+ivhOWIhlxuICBcdH1cbiAgICBtZXRob2RzID0ge1xuICAgIFx0ZGlhblphbihlKXtcbiAgICBcdFx0bGV0IHRoYXQgPSB0aGlzLFxuICAgIFx0XHRcdGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgXHRcdGlmKHRoYXQuY29udGVudFtpbmRleF0ubnVtID09IDIpe1xuICAgIFx0XHRcdHRoYXQuY29udGVudFtpbmRleF0uZGlhblphbiA9ICcuLi9pbWFnZXMv6K+E5Lu3XzEwLmpwZycsXG4gICAgXHRcdFx0dGhhdC5jb250ZW50W2luZGV4XS5udW0gPSAodGhhdC5jb250ZW50W2luZGV4XS5udW0rMSksXG4gICAgXHRcdFx0d3guc2V0U3RvcmFnZSh7XG5cdFx0XHQgICAgICBrZXk6ICdrZXknLFxuXHRcdFx0ICAgICAgZGF0YToge2ltZzp0aGF0LmNvbnRlbnRbaW5kZXhdLmRpYW5aYW4sbnVtOnRoYXQuY29udGVudFtpbmRleF0ubnVtfSxcblx0XHRcdCAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0ICAgICAgXHR3eC5nZXRTdG9yYWdlKHtcblx0XHRcdFx0XHQgIGtleTogJ2tleScsXG5cdFx0XHRcdFx0ICBzdWNjZXNzOiBmdW5jdGlvbihyZXNzKSB7XG5cdFx0XHRcdFx0ICAgICAgLy8gY29uc29sZS5sb2cocmVzcy5kYXRhLmltZylcblx0XHRcdFx0XHQgICAgICB0aGF0LmNvbnRlbnRbaW5kZXhdLmRpYW5aYW4gPSByZXNzLmRhdGEuaW1nXG5cdFx0XHRcdFx0ICAgICAgdGhhdC4kYXBwbHkoKVxuXHRcdFx0XHRcdCAgfSBcblx0XHRcdFx0XHR9KVxuXHRcdFx0ICAgICAgfVxuXHRcdFx0ICAgIH0pXG4gICAgXHRcdH1lbHNle1xuICAgIFx0XHRcdHRoYXQuY29udGVudFtpbmRleF0uZGlhblphbiA9ICcuLi9pbWFnZXMv6K+E5Lu3XzA3LmpwZycsXG4gICAgXHRcdFx0dGhhdC5jb250ZW50W2luZGV4XS5udW0gPSAodGhhdC5jb250ZW50W2luZGV4XS5udW0tMSlcbiAgICBcdFx0fVxuICAgIFx0fSxcbiAgICB9XG5cdC8v6I635Y+W5ZWG5ZOB6K+E6K665YiX6KGoXG5cdGFzeW5jIGdldENvbW1lbnRzSW5mbygpe1xuICAgICAgY29uc3QgZ29vZHNJZCA9IHRoaXMuZ29vZHNJZDtcbiAgICAgIGNvbnN0IHVybCA9IGFwaS5hcGlNYWxsICsgJ2FwaS9zaG9wX2NvbW1lbnQvJyArIHRoaXMuZ29vZHNJZCArICcvdHlwZS8yJ1xuICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgIH0pLnRoZW4oKHJlcyk9Pntcblx0XHRjb25zb2xlLmxvZyhcIuivhOS7t1wiKVxuXHRcdGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgIHRoaXMuY29tbWVudHMgPSByZXMuZGF0YS5tZXNzYWdlLFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICAvLyDojrflj5bnlKjmiLfor4TorrpcbiAgICBnZXRVc2VyQ29tbWVudHMob3B0aW9ucyl7XG4gICAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zdCBnb29kc0lkID0gdGhhdC5nb29kc0lkO1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnL3Nob3AvZ29vZERldGFpbCc7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBnb29kSWQ6IG9wdGlvbnMuZ29vZHNJZCxcbiAgICAgICAgdXNlcklkOiBvcHRpb25zLnVzZXJJZFxuICAgICAgfVxuICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgXHR3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICB0aGF0LmNvbW1lbnRzID0gcmVzLmRhdGEuZGF0YS5jb21tZW50cyxcbiAgICAgICAgdGhhdC4kYXBwbHkoKSBcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5jb21tZW50cykgIFxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==