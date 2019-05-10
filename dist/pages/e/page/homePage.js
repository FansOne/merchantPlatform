'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Homepage = function (_wepy$page) {
  _inherits(Homepage, _wepy$page);

  function Homepage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Homepage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Homepage.__proto__ || Object.getPrototypeOf(Homepage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '商城'
    }, _this.data = {
      cur: 0,
      goodsTitle: [], //分类数据
      shopId: 0,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      indicatorActiveColor: "#fff",
      //当前页面
      currentPage: 0,
      //广告列表
      adList: [],
      logo: '',
      store_name: '',
      winHeight: "", //窗口高度
      currentTab: 0, //预设当前项的值
      scrollLeft: 0, //tab标题的滚动条位置
      allData: {},
      topCover: false,
      token: '',
      cate_id: '',
      localSpecialty: '',
      twoDomHeight: 0,
      goodsScroll: false
    }, _this.methods = {
      goToAdvert: function goToAdvert() {},

      // 滚动切换标签样式
      switchTab: function switchTab(e) {
        if (e.detail.current > this.currentTab && e.detail.current > 1) {
          this.scrollLeft += 125;
        } else if (e.detail.current < this.currentTab && this.currentTab != 1) {
          this.scrollLeft -= 125;
        }
        this.currentTab = e.detail.current;
      },

      // 点击标题切换当前页时改变样式
      swichNav: function swichNav(classid, idx) {
        if (idx > this.currentTab && idx > 1) {
          this.scrollLeft += 125;
        } else if (idx < this.currentTab && this.currentTab != 1) {
          this.scrollLeft -= 125;
        }
        if (this.currentTab == idx) {
          return false;
        } else {
          this.currentTab = idx;
        }
        this.cate_id = classid;
        this.getGoodsData(classid);
      },
      scollTop: function scollTop(e) {
        // wx.pageScrollTo({
        //   scrollTop: this.winHeight,
        //   duration: 300
        // })
      },
      touchMove: function touchMove() {
        // wx.createSelectorQuery().select('#storeClass').boundingClientRect((rect)=>{
        //   wx.pageScrollTo({
        //     scrollTop: this.winHeight,
        //     duration: 0
        //   })
        // }).exec()
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Homepage, [{
    key: 'onShow',
    value: function onShow() {
      var _this2 = this;

      //  高度自适应
      wx.getSystemInfo({
        success: function success(res) {
          var clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
              rpxR = 750 / clientWidth;
          var calc = clientHeight * rpxR - 120;
          _this2.winHeight = calc;
        }
      });
      var query = wx.createSelectorQuery();
      query.select('.swiper').boundingClientRect();
      query.exec(function (res) {
        _this2.twoDomHeight = res[0].height;
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.localSpecialty = options.localSpecialty;
      this.shopId = options.id;
      _wepy2.default.$instance.globalData.m_id = options.id;
      if (this.shopId) {
        this.getData();
      }
    }
  }, {
    key: 'onPageScroll',
    value: function onPageScroll(e) {
      // console.log(e.scrollTop)
      if (e.scrollTop >= this.twoDomHeight) {
        this.goodsScroll = true;
      } else {
        this.goodsScroll = false;
      }
    }
    // 获取商品数据

  }, {
    key: 'getGoodsData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(c_id) {
        var _this3 = this;

        var url, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wx.showLoading({ title: '加载中...' });
                url = _requestUrl2.default.GetProductByClass;
                data = {
                  page_Num: this.currentPage,
                  p_id: _wepy2.default.$instance.globalData.p_id,
                  m_id: this.shopId,
                  type: this.localSpecialty || 0,
                  c_id: c_id
                };

                (0, _requestData.requestData)(url, "POST", data).then(function (res) {
                  wx.hideLoading();
                  res.data.data.forEach(function (element) {
                    element.lable.forEach(function (ele) {
                      ele.l_name = ele.l_name + ' | ';
                    });
                  });

                  if (_this3.currentPage == 0) {
                    _this3.goodsTitle = res.data.data;
                    _this3.$apply();
                  } else {
                    if (res.data.data.length == 0) {
                      wx.showToast({ title: '已加载全部数据', icon: 'none' });
                      _this3.currentPage = 0;
                    } else {
                      res.data.data.forEach(function (element) {
                        _this3.goodsTitle.push(element);
                      });
                    }
                  }
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsData(_x) {
        return _ref2.apply(this, arguments);
      }

      return getGoodsData;
    }()
  }, {
    key: 'bindscrolltolower',
    value: function bindscrolltolower() {
      this.currentPage++;
      this.getGoodsData(this.cate_id);
    }
    // 获取店铺数据及商品分类

  }, {
    key: 'getData',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        var url_, data_;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                url_ = _requestUrl2.default.GetProductClass;
                data_ = {
                  p_id: _wepy2.default.$instance.globalData.p_id,
                  m_id: this.shopId,
                  type: this.localSpecialty || 0
                };

                (0, _requestData.requestData)(url_, 'POST', data_).then(function (res) {
                  _this4.topCover = true;
                  _this4.adList = res.data.data.Merchant_Banner;
                  _this4.store_name = res.data.data.Merchant_baseInfo.mName;
                  _this4.logo = res.data.data.Merchant_baseInfo.mLogo;
                  _this4.allData = res.data.data;
                  if (res.data.data.claid.length) {
                    _this4.cate_id = res.data.data.claid[0].classid;
                    _this4.getGoodsData(res.data.data.claid[0].classid);
                  }
                  _this4.$apply();
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getData() {
        return _ref3.apply(this, arguments);
      }

      return getData;
    }()
  }]);

  return Homepage;
}(_wepy2.default.page);


Page(require('./../../../npm/wepy/lib/wepy.js').default.$createPage(Homepage , 'pages/e/page/homePage'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVQYWdlLmpzIl0sIm5hbWVzIjpbIkhvbWVwYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjdXIiLCJnb29kc1RpdGxlIiwic2hvcElkIiwiYXV0b3BsYXkiLCJpbnRlcnZhbCIsImR1cmF0aW9uIiwiaW5kaWNhdG9yQWN0aXZlQ29sb3IiLCJjdXJyZW50UGFnZSIsImFkTGlzdCIsImxvZ28iLCJzdG9yZV9uYW1lIiwid2luSGVpZ2h0IiwiY3VycmVudFRhYiIsInNjcm9sbExlZnQiLCJhbGxEYXRhIiwidG9wQ292ZXIiLCJ0b2tlbiIsImNhdGVfaWQiLCJsb2NhbFNwZWNpYWx0eSIsInR3b0RvbUhlaWdodCIsImdvb2RzU2Nyb2xsIiwibWV0aG9kcyIsImdvVG9BZHZlcnQiLCJzd2l0Y2hUYWIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsInN3aWNoTmF2IiwiY2xhc3NpZCIsImlkeCIsImdldEdvb2RzRGF0YSIsInNjb2xsVG9wIiwidG91Y2hNb3ZlIiwid3giLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsImNsaWVudEhlaWdodCIsIndpbmRvd0hlaWdodCIsImNsaWVudFdpZHRoIiwid2luZG93V2lkdGgiLCJycHhSIiwiY2FsYyIsInF1ZXJ5IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImV4ZWMiLCJoZWlnaHQiLCJvcHRpb25zIiwiaWQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsIm1faWQiLCJnZXREYXRhIiwic2Nyb2xsVG9wIiwiY19pZCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ1cmwiLCJyZXF1ZXN0VXJsIiwiR2V0UHJvZHVjdEJ5Q2xhc3MiLCJwYWdlX051bSIsInBfaWQiLCJ0eXBlIiwidGhlbiIsImhpZGVMb2FkaW5nIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJsYWJsZSIsImVsZSIsImxfbmFtZSIsIiRhcHBseSIsImxlbmd0aCIsInNob3dUb2FzdCIsImljb24iLCJwdXNoIiwidXJsXyIsIkdldFByb2R1Y3RDbGFzcyIsImRhdGFfIiwiTWVyY2hhbnRfQmFubmVyIiwiTWVyY2hhbnRfYmFzZUluZm8iLCJtTmFtZSIsIm1Mb2dvIiwiY2xhaWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFdBQUksQ0FEQztBQUVMQyxrQkFBVyxFQUZOLEVBRWlCO0FBQ3RCQyxjQUFPLENBSEY7QUFJTEMsZ0JBQVUsSUFKTDtBQUtMQyxnQkFBVSxJQUxMO0FBTUxDLGdCQUFVLElBTkw7QUFPTEMsNEJBQXNCLE1BUGpCO0FBUUw7QUFDQUMsbUJBQWEsQ0FUUjtBQVVMO0FBQ0FDLGNBQVEsRUFYSDtBQVlMQyxZQUFNLEVBWkQ7QUFhTEMsa0JBQVksRUFiUDtBQWNMQyxpQkFBVSxFQWRMLEVBY1E7QUFDYkMsa0JBQVksQ0FmUCxFQWVVO0FBQ2ZDLGtCQUFZLENBaEJQLEVBZ0JVO0FBQ2ZDLGVBQVEsRUFqQkg7QUFrQkxDLGdCQUFTLEtBbEJKO0FBbUJMQyxhQUFNLEVBbkJEO0FBb0JMQyxlQUFRLEVBcEJIO0FBcUJMQyxzQkFBZSxFQXJCVjtBQXNCTEMsb0JBQWEsQ0F0QlI7QUF1QkxDLG1CQUFZO0FBdkJQLEssUUFzSFBDLE8sR0FBVTtBQUNSQyxnQkFEUSx3QkFDSyxDQUFFLENBRFA7O0FBRVI7QUFDQUMsZUFIUSxxQkFHRUMsQ0FIRixFQUdLO0FBQ1gsWUFBR0EsRUFBRUMsTUFBRixDQUFTQyxPQUFULEdBQWlCLEtBQUtkLFVBQXRCLElBQW9DWSxFQUFFQyxNQUFGLENBQVNDLE9BQVQsR0FBaUIsQ0FBeEQsRUFBMEQ7QUFDeEQsZUFBS2IsVUFBTCxJQUFtQixHQUFuQjtBQUNELFNBRkQsTUFFTSxJQUFHVyxFQUFFQyxNQUFGLENB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Q0FBWTRELElBQVosRUFBaUIsTUFBakIsRUFBd0JFLEtBQXhCLEVBQStCZCxJQUEvQixDQUFvQyxlQUFLO0FBQ3ZDLHlCQUFLbkQsUUFBTCxHQUFnQixJQUFoQjtBQUNBLHlCQUFLUCxNQUFMLEdBQWM0QixJQUFJckMsSUFBSixDQUFTQSxJQUFULENBQWNrRixlQUE1QjtBQUNBLHlCQUFLdkUsVUFBTCxHQUFrQjBCLElBQUlyQyxJQUFKLENBQVNBLElBQVQsQ0FBY21GLGlCQUFkLENBQWdDQyxLQUFsRDtBQUNBLHlCQUFLMUUsSUFBTCxHQUFZMkIsSUFBSXJDLElBQUosQ0FBU0EsSUFBVCxDQUFjbUYsaUJBQWQsQ0FBZ0NFLEtBQTVDO0FBQ0EseUJBQUt0RSxPQUFMLEdBQWVzQixJQUFJckMsSUFBSixDQUFTQSxJQUF4QjtBQUNBLHNCQUFHcUMsSUFBSXJDLElBQUosQ0FBU0EsSUFBVCxDQUFjc0YsS0FBZCxDQUFvQlgsTUFBdkIsRUFBOEI7QUFDMUIsMkJBQUt6RCxPQUFMLEdBQWVtQixJQUFJckMsSUFBSixDQUFTQSxJQUFULENBQWNzRixLQUFkLENBQW9CLENBQXBCLEVBQXVCekQsT0FBdEM7QUFDQSwyQkFBS0UsWUFBTCxDQUFrQk0sSUFBSXJDLElBQUosQ0FBU0EsSUFBVCxDQUFjc0YsS0FBZCxDQUFvQixDQUFwQixFQUF1QnpELE9BQXpDO0FBQ0Q7QUFDRCx5QkFBSzZDLE1BQUw7QUFDSCxpQkFYRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTVHa0N0QixlQUFLbUMsSTs7a0JBQXRCMUYsUSIsImZpbGUiOiJob21lUGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGltcG9ydCByZXF1ZXN0VXJsIGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0VXJsJ1xuICBpbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lcGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WVhuWfjicsXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBjdXI6MCxcbiAgICAgIGdvb2RzVGl0bGU6W10sICAgICAgICAvL+WIhuexu+aVsOaNrlxuICAgICAgc2hvcElkOjAsXG4gICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgIGludGVydmFsOiAzMDAwLFxuICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICBpbmRpY2F0b3JBY3RpdmVDb2xvcjogXCIjZmZmXCIsXG4gICAgICAvL+W9k+WJjemhtemdolxuICAgICAgY3VycmVudFBhZ2U6IDAsXG4gICAgICAvL+W5v+WRiuWIl+ihqFxuICAgICAgYWRMaXN0OiBbXSxcbiAgICAgIGxvZ286ICcnLFxuICAgICAgc3RvcmVfbmFtZTogJycsXG4gICAgICB3aW5IZWlnaHQ6XCJcIiwvL+eql+WPo+mrmOW6plxuICAgICAgY3VycmVudFRhYjogMCwgLy/pooTorr7lvZPliY3pobnnmoTlgLxcbiAgICAgIHNjcm9sbExlZnQ6IDAsIC8vdGFi5qCH6aKY55qE5rua5Yqo5p2h5L2N572uXG4gICAgICBhbGxEYXRhOnt9LFxuICAgICAgdG9wQ292ZXI6ZmFsc2UsXG4gICAgICB0b2tlbjonJyxcbiAgICAgIGNhdGVfaWQ6JycsXG4gICAgICBsb2NhbFNwZWNpYWx0eTonJyxcbiAgICAgIHR3b0RvbUhlaWdodDowLFxuICAgICAgZ29vZHNTY3JvbGw6ZmFsc2VcbiAgICB9XG4gICAgb25TaG93KCkge1xuICAgICAgLy8gIOmrmOW6puiHqumAguW6lFxuICAgICAgd3guZ2V0U3lzdGVtSW5mbyggeyAgXG4gICAgICAgICAgc3VjY2VzczogKCByZXMgKT0+IHtcbiAgICAgICAgICAgIHZhciBjbGllbnRIZWlnaHQ9cmVzLndpbmRvd0hlaWdodCxcbiAgICAgICAgICAgICAgICBjbGllbnRXaWR0aD1yZXMud2luZG93V2lkdGgsXG4gICAgICAgICAgICAgICAgcnB4Uj03NTAvY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB2YXIgY2FsYz1jbGllbnRIZWlnaHQqcnB4Ui0xMjA7XG4gICAgICAgICAgICB0aGlzLndpbkhlaWdodCA9IGNhbGMgICBcbiAgICAgICAgICB9ICAgIFxuICAgICAgfSlcbiAgICAgIHZhciBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTtcbiAgICAgIHF1ZXJ5LnNlbGVjdCgnLnN3aXBlcicpLmJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBxdWVyeS5leGVjKCAocmVzKT0+IHtcbiAgICAgICAgdGhpcy50d29Eb21IZWlnaHQgPSByZXNbMF0uaGVpZ2h0XG4gICAgICB9KVxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICB0aGlzLmxvY2FsU3BlY2lhbHR5ID0gb3B0aW9ucy5sb2NhbFNwZWNpYWx0eVxuICAgICAgdGhpcy5zaG9wSWQgPSBvcHRpb25zLmlkO1xuICAgICAgd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5tX2lkID0gb3B0aW9ucy5pZDtcbiAgICAgIGlmKHRoaXMuc2hvcElkKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKCk7XG4gICAgICB9XG4gICAgfVxuICAgIG9uUGFnZVNjcm9sbChlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhlLnNjcm9sbFRvcClcbiAgICAgIGlmKGUuc2Nyb2xsVG9wID49IHRoaXMudHdvRG9tSGVpZ2h0KXtcbiAgICAgICAgdGhpcy5nb29kc1Njcm9sbCA9IHRydWVcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLmdvb2RzU2Nyb2xsID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g6I635Y+W5ZWG5ZOB5pWw5o2uXG4gICAgYXN5bmMgZ2V0R29vZHNEYXRhKGNfaWQpe1xuICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Yqg6L295LitLi4uJ30pO1xuICAgICAgY29uc3QgdXJsID0gcmVxdWVzdFVybC5HZXRQcm9kdWN0QnlDbGFzcztcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIHBhZ2VfTnVtOiB0aGlzLmN1cnJlbnRQYWdlLFxuICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgIG1faWQ6IHRoaXMuc2hvcElkLFxuICAgICAgICB0eXBlOiB0aGlzLmxvY2FsU3BlY2lhbHR5IHx8IDAsXG4gICAgICAgIGNfaWQ6Y19pZFxuICAgICAgfVxuICAgICAgcmVxdWVzdERhdGEodXJsLFwiUE9TVFwiLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICBlbGVtZW50LmxhYmxlLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIGVsZS5sX25hbWUgPSBlbGUubF9uYW1lKycgfCAnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5jdXJyZW50UGFnZSA9PSAwKXtcbiAgICAgICAgICB0aGlzLmdvb2RzVGl0bGUgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgaWYocmVzLmRhdGEuZGF0YS5sZW5ndGggPT0gMCl7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+W3suWKoOi9veWFqOmDqOaVsOaNricsaWNvbjogJ25vbmUnfSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMFxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmdvb2RzVGl0bGUucHVzaChlbGVtZW50KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBiaW5kc2Nyb2xsdG9sb3dlcigpe1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSArK1xuICAgICAgdGhpcy5nZXRHb29kc0RhdGEodGhpcy5jYXRlX2lkKVxuICAgIH1cbiAgICAvLyDojrflj5blupfpk7rmlbDmja7lj4rllYblk4HliIbnsbtcbiAgICBhc3luYyBnZXREYXRhKCl7XG4gICAgICBsZXQgdXJsXyA9IHJlcXVlc3RVcmwuR2V0UHJvZHVjdENsYXNzO1xuICAgICAgbGV0IGRhdGFfID0ge1xuICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgIG1faWQ6IHRoaXMuc2hvcElkLFxuICAgICAgICB0eXBlOiB0aGlzLmxvY2FsU3BlY2lhbHR5IHx8IDBcbiAgICAgIH1cbiAgICAgIHJlcXVlc3REYXRhKHVybF8sJ1BPU1QnLGRhdGFfKS50aGVuKHJlcz0+e1xuICAgICAgICB0aGlzLnRvcENvdmVyID0gdHJ1ZVxuICAgICAgICB0aGlzLmFkTGlzdCA9IHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfQmFubmVyXG4gICAgICAgIHRoaXMuc3RvcmVfbmFtZSA9IHJlcy5kYXRhLmRhdGEuTWVyY2hhbnRfYmFzZUluZm8ubU5hbWVcbiAgICAgICAgdGhpcy5sb2dvID0gcmVzLmRhdGEuZGF0YS5NZXJjaGFudF9iYXNlSW5mby5tTG9nb1xuICAgICAgICB0aGlzLmFsbERhdGEgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICBpZihyZXMuZGF0YS5kYXRhLmNsYWlkLmxlbmd0aCl7XG4gICAgICAgICAgICB0aGlzLmNhdGVfaWQgPSByZXMuZGF0YS5kYXRhLmNsYWlkWzBdLmNsYXNzaWRcbiAgICAgICAgICAgIHRoaXMuZ2V0R29vZHNEYXRhKHJlcy5kYXRhLmRhdGEuY2xhaWRbMF0uY2xhc3NpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29Ub0FkdmVydCgpIHt9LFxuICAgICAgLy8g5rua5Yqo5YiH5o2i5qCH562+5qC35byPXG4gICAgICBzd2l0Y2hUYWIoZSkge1xuICAgICAgICBpZihlLmRldGFpbC5jdXJyZW50PnRoaXMuY3VycmVudFRhYiAmJiBlLmRldGFpbC5jdXJyZW50PjEpe1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTGVmdCArPSAxMjVcbiAgICAgICAgfWVsc2UgaWYoZS5kZXRhaWwuY3VycmVudDx0aGlzLmN1cnJlbnRUYWIgJiYgdGhpcy5jdXJyZW50VGFiICE9IDEpe1xuICAgICAgICAgIHRoaXMuc2Nyb2xsTGVmdCAtPSAxMjVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRUYWI9ZS5kZXRhaWwuY3VycmVudFxuICAgICAgfSxcbiAgICAgIC8vIOeCueWHu+agh+mimOWIh+aNouW9k+WJjemhteaXtuaUueWPmOagt+W8j1xuICAgICAgc3dpY2hOYXYgKGNsYXNzaWQsaWR4KXtcbiAgICAgICAgaWYoaWR4PnRoaXMuY3VycmVudFRhYiAmJiBpZHg+MSl7XG4gICAgICAgICAgdGhpcy5zY3JvbGxMZWZ0ICs9IDEyNVxuICAgICAgICB9ZWxzZSBpZihpZHg8dGhpcy5jdXJyZW50VGFiICYmIHRoaXMuY3VycmVudFRhYiAhPSAxKXtcbiAgICAgICAgICB0aGlzLnNjcm9sbExlZnQgLT0gMTI1XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jdXJyZW50VGFiPT1pZHgpe1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRUYWIgPSBpZHhcbiAgICAgICAgfVxuICAgICAgIHRoaXMuY2F0ZV9pZCA9IGNsYXNzaWRcbiAgICAgICB0aGlzLmdldEdvb2RzRGF0YShjbGFzc2lkKTtcbiAgICAgIH0sXG4gICAgICBzY29sbFRvcCAoZSkge1xuICAgICAgICAvLyB3eC5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAvLyAgIHNjcm9sbFRvcDogdGhpcy53aW5IZWlnaHQsXG4gICAgICAgIC8vICAgZHVyYXRpb246IDMwMFxuICAgICAgICAvLyB9KVxuICAgICAgfSxcbiAgICAgIHRvdWNoTW92ZSgpe1xuICAgICAgICAvLyB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuc2VsZWN0KCcjc3RvcmVDbGFzcycpLmJvdW5kaW5nQ2xpZW50UmVjdCgocmVjdCk9PntcbiAgICAgICAgLy8gICB3eC5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAvLyAgICAgc2Nyb2xsVG9wOiB0aGlzLndpbkhlaWdodCxcbiAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAwXG4gICAgICAgIC8vICAgfSlcbiAgICAgICAgLy8gfSkuZXhlYygpXG4gICAgICB9XG4gICAgfVxufVxuIl19