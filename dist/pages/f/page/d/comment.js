'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _commentStar = require('./../../../../components/commentStar.js');

var _commentStar2 = _interopRequireDefault(_commentStar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_wepy$page) {
  _inherits(Comment, _wepy$page);

  function Comment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Comment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '评价',
      navigationBarBackgroundColor: '#ffd265'
    }, _this.data = {
      commentDesc: '',
      orderInfo: null,
      token: ''
    }, _this.components = {
      commentStar: _commentStar2.default
    }, _this.methods = {
      // 评价描述
      commentDesc: function commentDesc(e) {
        this.commentDesc = e.detail.value;
      },

      // 提交评价
      submit: function submit() {
        if (_wepy2.default.$instance.globalData.score && this.commentDesc) {
          this.getOrderList();
        } else {
          wx.showToast({
            title: '请进行评论',
            icon: 'none',
            duration: 1000
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Comment, [{
    key: 'getOrderList',

    // 订单评论页面
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                url = _api2.default.apiMall + 'api/eat_comment';
                data = {
                  order_id: this.orderInfo.id,
                  score: _wepy2.default.$instance.globalData.score,
                  content: this.commentDesc
                };
                _context.next = 4;
                return _wepy2.default.request({
                  url: url,
                  method: 'POST',
                  header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + this.token
                  },
                  data: data
                }).then(function (res) {
                  if (res.data.status == 200) {
                    wx.showToast({
                      title: '评价成功',
                      icon: 'success',
                      duration: 1000
                    });
                    wx.switchTab({
                      url: '../../../order'
                    });
                  }
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrderList() {
        return _ref2.apply(this, arguments);
      }

      return getOrderList;
    }()
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.orderInfo = JSON.parse(options.orderInfo);
      this.$apply();
    }
  }]);

  return Comment;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(Comment , 'pages/f/page/d/comment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsImNvbW1lbnREZXNjIiwib3JkZXJJbmZvIiwidG9rZW4iLCJjb21wb25lbnRzIiwiY29tbWVudFN0YXIiLCJtZXRob2RzIiwiZSIsImRldGFpbCIsInZhbHVlIiwic3VibWl0Iiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJzY29yZSIsImdldE9yZGVyTGlzdCIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJ1cmwiLCJhcGkiLCJhcGlNYWxsIiwib3JkZXJfaWQiLCJpZCIsImNvbnRlbnQiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsInJlcyIsInN0YXR1cyIsInN3aXRjaFRhYiIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsImFjY2Vzc190b2tlbiIsIkpTT04iLCJwYXJzZSIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyxvQ0FBOEI7QUFGdkIsSyxRQUlUQyxJLEdBQU87QUFDTEMsbUJBQVksRUFEUDtBQUVMQyxpQkFBVSxJQUZMO0FBR0xDLGFBQU07QUFIRCxLLFFBS1BDLFUsR0FBYTtBQUNYQyxtQkFBWUE7QUFERCxLLFFBR2JDLE8sR0FBVTtBQUNSO0FBQ0FMLGlCQUZRLHVCQUVJTSxDQUZKLEVBRU07QUFDWixhQUFLTixXQUFMLEdBQW1CTSxFQUFFQyxNQUFGLENBQVNDLEtBQTVCO0FBQ0QsT0FKTzs7QUFLUjtBQUNBQyxZQU5RLG9CQU1BO0FBQ04sWUFBR0MsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCQyxLQUExQixJQUFtQyxLQUFLYixXQUEzQyxFQUF1RDtBQUNyRCxlQUFLYyxZQUFMO0FBQ0QsU0FGRCxNQUVLO0FBQ0hDLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxPQURJO0FBRVhDLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0Q7QUFDRjtBQWhCTyxLOzs7Ozs7QUFrQlY7Ozs7Ozs7O0FBRVFDLG1CLEdBQU1DLGNBQUlDLE9BQUosR0FBYyxpQjtBQUNwQnZCLG9CLEdBQU87QUFDWHdCLDRCQUFTLEtBQUt0QixTQUFMLENBQWV1QixFQURiO0FBRVhYLHlCQUFNSCxlQUFLQyxTQUFMLENBQWVDLFVBQWYsQ0FBMEJDLEtBRnJCO0FBR1hZLDJCQUFRLEtBQUt6QjtBQUhGLGlCOzt1QkFLUFUsZUFBS2dCLE9BQUwsQ0FBYTtBQUNqQk4sdUJBQUtBLEdBRFk7QUFFakJPLDBCQUFRLE1BRlM7QUFHakJDLDBCQUFPO0FBQ0wsOEJBQVMsZ0NBREo7QUFFTCxvQ0FBZSxpREFGVjtBQUdMLHFDQUFnQixZQUFZLEtBQUsxQjtBQUg1QixtQkFIVTtBQVFqQkgsd0JBQU1BO0FBUlcsaUJBQWIsRUFTSDhCLElBVEcsQ0FTRSxVQUFDQyxHQUFELEVBQU87QUFDYixzQkFBR0EsSUFBSS9CLElBQUosQ0FBU2dDLE1BQVQsSUFBbUIsR0FBdEIsRUFBMEI7QUFDeEJoQix1QkFBR0MsU0FBSCxDQUFhO0FBQ1hDLDZCQUFPLE1BREk7QUFFWEMsNEJBQU0sU0FGSztBQUdYQyxnQ0FBVTtBQUhDLHFCQUFiO0FBS0FKLHVCQUFHaUIsU0FBSCxDQUFhO0FBQ1haLDJCQUFJO0FBRE8scUJBQWI7QUFHRDtBQUNGLGlCQXBCSyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBc0JEYSxPLEVBQVE7QUFDYixVQUFJL0IsUUFBUWEsR0FBR21CLGNBQUgsQ0FBa0IsY0FBbEIsQ0FBWjtBQUNBLFdBQUtoQyxLQUFMLEdBQWFBLE1BQU1pQyxZQUFuQjtBQUNBLFdBQUtsQyxTQUFMLEdBQWlCbUMsS0FBS0MsS0FBTCxDQUFXSixRQUFRaEMsU0FBbkIsQ0FBakI7QUFDQSxXQUFLcUMsTUFBTDtBQUNEOzs7O0VBbEVrQzVCLGVBQUs2QixJOztrQkFBckI1QyxPIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi8uLi8uLi9hcGkvYXBpJ1xuICBpbXBvcnQgY29tbWVudFN0YXIgZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb21tZW50U3RhcidcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivhOS7tycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI2NScsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBjb21tZW50RGVzYzonJyxcbiAgICAgIG9yZGVySW5mbzpudWxsLFxuICAgICAgdG9rZW46JydcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbW1lbnRTdGFyOmNvbW1lbnRTdGFyXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyDor4Tku7fmj4/ov7BcbiAgICAgIGNvbW1lbnREZXNjKGUpe1xuICAgICAgICB0aGlzLmNvbW1lbnREZXNjID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgLy8g5o+Q5Lqk6K+E5Lu3XG4gICAgICBzdWJtaXQoKXtcbiAgICAgICAgaWYod2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zY29yZSAmJiB0aGlzLmNvbW1lbnREZXNjKXtcbiAgICAgICAgICB0aGlzLmdldE9yZGVyTGlzdCgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fov5vooYzor4TorronLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIOiuouWNleivhOiuuumhtemdolxuICAgIGFzeW5jIGdldE9yZGVyTGlzdCgpe1xuICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL2VhdF9jb21tZW50J1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgb3JkZXJfaWQ6dGhpcy5vcmRlckluZm8uaWQsXG4gICAgICAgIHNjb3JlOndlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEuc2NvcmUsXG4gICAgICAgIGNvbnRlbnQ6dGhpcy5jb21tZW50RGVzY1xuICAgICAgfVxuICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgaWYocmVzLmRhdGEuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+E5Lu35oiQ5YqfJyxcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xuICAgICAgICAgICAgdXJsOicuLi8uLi8uLi9vcmRlcidcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcbiAgICAgIHRoaXMudG9rZW4gPSB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgICB0aGlzLm9yZGVySW5mbyA9IEpTT04ucGFyc2Uob3B0aW9ucy5vcmRlckluZm8pO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH1cbiJdfQ==