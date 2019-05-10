'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _commentStar = require('./../../../components/commentStar.js');

var _commentStar2 = _interopRequireDefault(_commentStar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var New = function (_wepy$page) {
  _inherits(New, _wepy$page);

  function New() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, New);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = New.__proto__ || Object.getPrototypeOf(New)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '评论'
    }, _this.data = {
      goods: {},
      placeholder: '快告诉小伙伴宝贝有多好吧，大家都等着你的心得呢～（请至少写入5个字）',
      btnUse: false,
      disabled: true,
      tempFilePaths: [],
      commentContent: '',
      star: '',
      leng: 0,
      userId: '',
      token: ''
    }, _this.components = {
      commentStar: _commentStar2.default
    }, _this.methods = {
      sectionValue: function sectionValue(e) {
        var leng = e.detail.value.length;
        this.leng = leng;
        if (leng >= 5) {
          this.disabled = false;
          this.btnUse = true;
          this.commentContent = e.detail.value;
        } else {
          this.disabled = true;
          this.btnUse = false;
        }
      },
      chooseImage: function chooseImage() {
        var that = this;
        wx.chooseImage({
          count: 3, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            that.tempFilePaths.push(tempFilePaths);
            that.$apply();
          }
        });
      },
      uploadComment: function uploadComment() {
        var star = _wepy2.default.$instance.globalData.score;
        this.star = star;
        if (!this.star) {
          wx.showToast({
            title: '您还未评分哟',
            icon: 'none',
            image: '../images/星星.png',
            duration: 2000
          });
        } else {
          this.userComment();
          // wx.getStorage({
          //   key:'userId',
          //   success:(res)=>{
          //     this.userId = res.data
          //     this.$apply()
          //     this.userComment()
          //   }
          // })
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(New, [{
    key: 'onLoad',
    value: function onLoad(options) {
      //获取token
      var token = wx.getStorageSync("access_token");
      this.token = token.access_token;
      this.goods = options;
      this.$apply();
    }
  }, {
    key: 'userComment',

    //发布评论
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, url, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                url = _api2.default.apiMall + 'api/shop_comment/';
                data = {
                  order_id: that.goods.orderId,
                  good_id: that.goods.id,
                  content: that.commentContent,
                  images: that.tempFilePaths.length == 0 ? '' : that.tempFilePaths,
                  score: that.star
                };
                _context.next = 5;
                return _wepy2.default.request({
                  url: url,
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Authorization': 'Bearer ' + this.token
                  },
                  data: data
                }).then(function (res) {
                  wx.showToast({
                    title: '感谢您的评价',
                    icon: 'none',
                    image: '../../../images/感谢.png',
                    duration: 1000,
                    success: function success() {
                      // setTimeout(()=>{
                      //   wx.switchTab({
                      //     url: 'index'
                      //   })
                      // },1000)
                    }
                  });
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function userComment() {
        return _ref2.apply(this, arguments);
      }

      return userComment;
    }()
  }]);

  return New;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(New , 'pages/e/page/startComment'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0Q29tbWVudC5qcyJdLCJuYW1lcyI6WyJOZXciLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImdvb2RzIiwicGxhY2Vob2xkZXIiLCJidG5Vc2UiLCJkaXNhYmxlZCIsInRlbXBGaWxlUGF0aHMiLCJjb21tZW50Q29udGVudCIsInN0YXIiLCJsZW5nIiwidXNlcklkIiwidG9rZW4iLCJjb21wb25lbnRzIiwiY29tbWVudFN0YXIiLCJtZXRob2RzIiwic2VjdGlvblZhbHVlIiwiZSIsImRldGFpbCIsInZhbHVlIiwibGVuZ3RoIiwiY2hvb3NlSW1hZ2UiLCJ0aGF0Iiwid3giLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJwdXNoIiwiJGFwcGx5IiwidXBsb2FkQ29tbWVudCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwic2NvcmUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImR1cmF0aW9uIiwidXNlckNvbW1lbnQiLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJ1cmwiLCJhcGkiLCJhcGlNYWxsIiwib3JkZXJfaWQiLCJvcmRlcklkIiwiZ29vZF9pZCIsImlkIiwiY29udGVudCIsImltYWdlcyIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJ0aGVuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7Ozs7Z0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVkMsSSxHQUFPO0FBQ0pDLGFBQU0sRUFERjtBQUVKQyxtQkFBWSxvQ0FGUjtBQUdKQyxjQUFPLEtBSEg7QUFJSkMsZ0JBQVMsSUFKTDtBQUtKQyxxQkFBYyxFQUxWO0FBTUpDLHNCQUFlLEVBTlg7QUFPSkMsWUFBSyxFQVBEO0FB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QkFBVSxJQUpDO0FBS1hiLDZCQUFRLG1CQUFJO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBWFUsbUJBQWI7QUFhRCxpQkF2QkssQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXZGdUJLLGVBQUswQixJOztrQkFBakIzRCxHIiwiZmlsZSI6InN0YXJ0Q29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uLy4uL2FwaS9hcGknXG4gIGltcG9ydCBjb21tZW50U3RhciBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1lbnRTdGFyJ1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivhOiuuicsXG4gICAgfVxuICBcdGRhdGEgPSB7XG4gICAgICBnb29kczp7fSxcbiAgICAgIHBsYWNlaG9sZGVyOiflv6vlkYror4nlsI/kvJnkvLTlrp3otJ3mnInlpJrlpb3lkKfvvIzlpKflrrbpg73nrYnnnYDkvaDnmoTlv4PlvpflkaLvvZ7vvIjor7foh7PlsJHlhpnlhaU15Liq5a2X77yJJyxcbiAgICAgIGJ0blVzZTpmYWxzZSxcbiAgICAgIGRpc2FibGVkOnRydWUsXG4gICAgICB0ZW1wRmlsZVBhdGhzOltdLFxuICAgICAgY29tbWVudENvbnRlbnQ6JycsXG4gICAgICBzdGFyOicnLFxuICAgICAgbGVuZzowLFxuICAgICAgdXNlcklkOicnLFxuICAgICAgdG9rZW46JydcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIGNvbW1lbnRTdGFyOmNvbW1lbnRTdGFyXG4gICAgfVxuICAgIG9uTG9hZChvcHRpb25zKXtcbiAgICAgIC8v6I635Y+WdG9rZW5cbiAgICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgIHRoaXMuZ29vZHMgPSBvcHRpb25zXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBzZWN0aW9uVmFsdWUoZSl7XG4gICAgICAgIGxldCBsZW5nID0gZS5kZXRhaWwudmFsdWUubGVuZ3RoO1xuICAgICAgICB0aGlzLmxlbmcgPSBsZW5nO1xuICAgICAgICBpZihsZW5nID49IDUpe1xuICAgICAgICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmJ0blVzZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5jb21tZW50Q29udGVudCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuYnRuVXNlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNob29zZUltYWdlKCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAzLCAvLyDpu5jorqQ5XG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIx0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcbiAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICB0aGF0LnRlbXBGaWxlUGF0aHMucHVzaCh0ZW1wRmlsZVBhdGhzKVxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB1cGxvYWRDb21tZW50KCl7XG4gICAgICAgIGxldCBzdGFyID0gd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5zY29yZTtcbiAgICAgICAgdGhpcy5zdGFyID0gc3RhclxuICAgICAgICBpZighdGhpcy5zdGFyKXtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmgqjov5jmnKror4TliIblk58nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgaW1hZ2U6ICcuLi9pbWFnZXMv5pif5pifLnBuZycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMudXNlckNvbW1lbnQoKTtcbiAgICAgICAgICAvLyB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgICAvLyAgIGtleTondXNlcklkJyxcbiAgICAgICAgICAvLyAgIHN1Y2Nlc3M6KHJlcyk9PntcbiAgICAgICAgICAvLyAgICAgdGhpcy51c2VySWQgPSByZXMuZGF0YVxuICAgICAgICAgIC8vICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgLy8gICAgIHRoaXMudXNlckNvbW1lbnQoKVxuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy/lj5HluIPor4TorrpcbiAgICBhc3luYyB1c2VyQ29tbWVudCgpe1xuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvc2hvcF9jb21tZW50Lyc7XG4gICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBvcmRlcl9pZDogdGhhdC5nb29kcy5vcmRlcklkLFxuICAgICAgICBnb29kX2lkOnRoYXQuZ29vZHMuaWQsXG4gICAgICAgIGNvbnRlbnQ6dGhhdC5jb21tZW50Q29udGVudCxcbiAgICAgICAgaW1hZ2VzOnRoYXQudGVtcEZpbGVQYXRocy5sZW5ndGggPT0gMD8nJzp0aGF0LnRlbXBGaWxlUGF0aHMsXG4gICAgICAgIHNjb3JlOnRoYXQuc3RhclxuICAgICAgfVxuICAgICAgYXdhaXQgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTpkYXRhXG4gICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfmhJ/osKLmgqjnmoTor4Tku7cnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBpbWFnZTogJy4uLy4uLy4uL2ltYWdlcy/mhJ/osKIucG5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgICBzdWNjZXNzOigpPT57XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAvLyAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiAnaW5kZXgnXG4gICAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgICAvLyB9LDEwMDApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==