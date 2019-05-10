'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../../../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChooseNum = function (_wepy$page) {
  _inherits(ChooseNum, _wepy$page);

  function ChooseNum() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChooseNum);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChooseNum.__proto__ || Object.getPrototypeOf(ChooseNum)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      getTableData: null, //缓存中取出的桌号
      title: '', //商户名
      logoImg: '', //商户logo
      tips: '', //备注信息
      inputEatFoodNum: _this.inputEatFoodNum ? _this.inputEatFoodNum : 1,
      numData: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人', '11人', '更多'],
      eatFoodNum: 0,
      tableNum: 0,
      socketOpen: false,
      socketData: null,
      extConfig: null,
      m_id: ''
    }, _this.config = {
      navigationBarBackgroundColor: '#ffd265',
      navigationBarTitleText: '选择人数'
    }, _this.components = {}, _this.methods = {
      // 跳转点餐页面
      chooseFood: function chooseFood() {
        this.saveData();
        wx.navigateTo({
          url: './d?num=' + this.inputEatFoodNum + '&logoImg=' + this.logoImg + '&m_id=' + this.m_id
        });
      },

      // 选择用餐的具体人数
      choosePeopleNum: function choosePeopleNum(num) {
        if (num <= 10) {
          this.eatFoodNum = num;
          // this.socketFoodNum = this.tableNum;
          this.inputEatFoodNum = num + 1;
        } else {
          if (num == 11) {
            this.show(); //遮罩出现
          }
        }
        wx.setStorage({
          key: "deliverData",
          data: ''
        });
      },

      // 显示遮罩
      showModal: function showModal() {
        this.show();
      },

      //隐藏遮罩
      hideModal: function hideModal() {
        // 隐藏遮罩层
        this.hide();
        this.inputEatFoodNum = this.eatFoodNum + 1;
        this.eatFoodNum = this.eatFoodNum;
      },

      // 获取用餐人数
      getEatFoodNum: function getEatFoodNum(e) {
        this.inputEatFoodNum = e.detail.value ? e.detail.value : 0;
      },

      // 获取备注信息
      tips: function tips(e) {
        this.tips = e.detail.value;
      },

      // 点击确定
      sureEatFoodNum: function sureEatFoodNum() {
        if (this.inputEatFoodNum == '') {} else if (this.inputEatFoodNum < 11) {
          this.eatFoodNum = this.inputEatFoodNum - 1;
        } else if (this.inputEatFoodNum >= 11) {
          this.eatFoodNum = 11;
        }
        this.hide();
        wx.setStorage({
          key: "deliverData",
          data: ''
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChooseNum, [{
    key: 'saveData',

    // 存储用餐人数和备注信息
    value: function saveData() {
      wx.setStorage({
        key: 'tips',
        data: this.tips ? this.tips : ''
      });
    }
    // 显示隐藏遮罩

  }, {
    key: 'hide',
    value: function hide() {
      // 隐藏遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({
        animationData: animation.export()
      });
      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        });
      }.bind(this), 200);
    }
  }, {
    key: 'show',
    value: function show() {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      });
      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export()
        });
      }.bind(this), 200);
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.logoImg = options.mLogo;
      this.title = options.mTitle;
      this.m_id = options.m_id;
    }
  }]);

  return ChooseNum;
}(_wepy2.default.page);


Page(require('./../../../../npm/wepy/lib/wepy.js').default.$createPage(ChooseNum , 'pages/f/page/d/chooseNum'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNob29zZU51bS5qcyJdLCJuYW1lcyI6WyJDaG9vc2VOdW0iLCJkYXRhIiwiZ2V0VGFibGVEYXRhIiwidGl0bGUiLCJsb2dvSW1nIiwidGlwcyIsImlucHV0RWF0Rm9vZE51bSIsIm51bURhdGEiLCJlYXRGb29kTnVtIiwidGFibGVOdW0iLCJzb2NrZXRPcGVuIiwic29ja2V0RGF0YSIsImV4dENvbmZpZyIsIm1faWQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiY2hvb3NlRm9vZCIsInNhdmVEYXRhIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY2hvb3NlUGVvcGxlTnVtIiwibnVtIiwic2hvdyIsInNldFN0b3JhZ2UiLCJrZXkiLCJzaG93TW9kYWwiLCJoaWRlTW9kYWwiLCJoaWRlIiwiZ2V0RWF0Rm9vZE51bSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInN1cmVFYXRGb29kTnVtIiwiYW5pbWF0aW9uIiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsImRlbGF5IiwidHJhbnNsYXRlWSIsInN0ZXAiLCJzZXREYXRhIiwiYW5pbWF0aW9uRGF0YSIsImV4cG9ydCIsInNldFRpbWVvdXQiLCJzaG93TW9kYWxTdGF0dXMiLCJiaW5kIiwib3B0aW9ucyIsIm1Mb2dvIiwibVRpdGxlIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEksR0FBTztBQUNMQyxvQkFBYSxJQURSLEVBQ2lCO0FBQ3RCQyxhQUFNLEVBRkQsRUFFTztBQUNaQyxlQUFRLEVBSEgsRUFHTztBQUNaQyxZQUFLLEVBSkEsRUFJTztBQUNaQyx1QkFBZ0IsTUFBS0EsZUFBTCxHQUF1QixNQUFLQSxlQUE1QixHQUE4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O2tCQUF2QnRELFMiLCJmaWxlIjoiY2hvb3NlTnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vLi4vLi4vYXBpL2FwaSdcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi8uLi8uLi91dGlscy90aXAnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENob29zZU51bSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGdldFRhYmxlRGF0YTpudWxsLCAgICAvL+e8k+WtmOS4reWPluWHuueahOahjOWPt1xuICAgICAgdGl0bGU6JycsICAgLy/llYbmiLflkI1cbiAgICAgIGxvZ29JbWc6JycsIC8v5ZWG5oi3bG9nb1xuICAgICAgdGlwczonJywgICAgLy/lpIfms6jkv6Hmga9cbiAgICAgIGlucHV0RWF0Rm9vZE51bTp0aGlzLmlucHV0RWF0Rm9vZE51bSA/IHRoaXMuaW5wdXRFYXRGb29kTnVtIDogMSxcbiAgICAgIG51bURhdGE6Wycx5Lq6JywnMuS6uicsJzPkuronLCc05Lq6JywnNeS6uicsJzbkuronLCc35Lq6JywnOOS6uicsJznkuronLCcxMOS6uicsJzEx5Lq6Jywn5pu05aSaJ10sXG4gICAgICBlYXRGb29kTnVtOjAsXG4gICAgICB0YWJsZU51bTowLFxuICAgICAgc29ja2V0T3BlbjpmYWxzZSxcbiAgICAgIHNvY2tldERhdGE6bnVsbCxcbiAgICAgIGV4dENvbmZpZzpudWxsLFxuICAgICAgbV9pZDonJyxcbiAgICB9XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyNmZmQyNjUnLFxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mAieaLqeS6uuaVsCcsXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyDot7PovazngrnppJDpobXpnaJcbiAgICAgIGNob29zZUZvb2QoKXtcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6Jy4vZD9udW09JyArIHRoaXMuaW5wdXRFYXRGb29kTnVtICsnJmxvZ29JbWc9Jyt0aGlzLmxvZ29JbWcrJyZtX2lkPScrdGhpcy5tX2lkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g6YCJ5oup55So6aSQ55qE5YW35L2T5Lq65pWwXG4gICAgICBjaG9vc2VQZW9wbGVOdW0obnVtKXtcbiAgICAgICAgaWYobnVtIDw9IDEwKXtcbiAgICAgICAgICB0aGlzLmVhdEZvb2ROdW0gPSBudW07XG4gICAgICAgICAgLy8gdGhpcy5zb2NrZXRGb29kTnVtID0gdGhpcy50YWJsZU51bTtcbiAgICAgICAgICB0aGlzLmlucHV0RWF0Rm9vZE51bSA9IG51bSArIDE7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIGlmKG51bSA9PSAxMSl7XG4gICAgICAgICAgICB0aGlzLnNob3coKTsgICAgLy/pga7nvanlh7rnjrBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAga2V5OlwiZGVsaXZlckRhdGFcIixcbiAgICAgICAgICBkYXRhOicnXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g5pi+56S66YGu572pXG4gICAgICBzaG93TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgfSxcbiAgICAgIC8v6ZqQ6JeP6YGu572pXG4gICAgICBoaWRlTW9kYWwoKSB7XG4gICAgICAgIC8vIOmakOiXj+mBrue9qeWxglxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5pbnB1dEVhdEZvb2ROdW0gPSB0aGlzLmVhdEZvb2ROdW0gKyAxO1xuICAgICAgICB0aGlzLmVhdEZvb2ROdW0gPSB0aGlzLmVhdEZvb2ROdW07XG4gICAgICB9LFxuICAgICAgLy8g6I635Y+W55So6aSQ5Lq65pWwXG4gICAgICBnZXRFYXRGb29kTnVtKGUpe1xuICAgICAgICB0aGlzLmlucHV0RWF0Rm9vZE51bSA9IGUuZGV0YWlsLnZhbHVlID8gZS5kZXRhaWwudmFsdWUgOiAwO1xuICAgICAgfSxcbiAgICAgIC8vIOiOt+WPluWkh+azqOS/oeaBr1xuICAgICAgdGlwcyhlKXtcbiAgICAgICAgdGhpcy50aXBzID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgLy8g54K55Ye756Gu5a6aXG4gICAgICBzdXJlRWF0Rm9vZE51bSgpe1xuICAgICAgICBpZih0aGlzLmlucHV0RWF0Rm9vZE51bSA9PSAnJyl7XG5cbiAgICAgICAgfWVsc2UgaWYodGhpcy5pbnB1dEVhdEZvb2ROdW0gPCAxMSl7XG4gICAgICAgICAgdGhpcy5lYXRGb29kTnVtID0gdGhpcy5pbnB1dEVhdEZvb2ROdW0gLSAxO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLmlucHV0RWF0Rm9vZE51bSA+PSAxMSl7XG4gICAgICAgICAgdGhpcy5lYXRGb29kTnVtID0gMTE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgIGtleTpcImRlbGl2ZXJEYXRhXCIsXG4gICAgICAgICAgZGF0YTonJ1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICAvLyDlrZjlgqjnlKjppJDkurrmlbDlkozlpIfms6jkv6Hmga9cbiAgICBzYXZlRGF0YSgpe1xuICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgIGtleTondGlwcycsXG4gICAgICAgIGRhdGE6dGhpcy50aXBzID8gdGhpcy50aXBzIDogJydcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIOaYvuekuumakOiXj+mBrue9qVxuICAgIGhpZGUoKXtcbiAgICAgIC8vIOmakOiXj+mBrue9qeWxglxuICAgICAgdmFyIGFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImxpbmVhclwiLFxuICAgICAgICBkZWxheTogMFxuICAgICAgfSlcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uXG4gICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgzMDApLnN0ZXAoKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uLmV4cG9ydCgpLFxuICAgICAgfSlcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgwKS5zdGVwKClcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBhbmltYXRpb25EYXRhOiBhbmltYXRpb24uZXhwb3J0KCksXG4gICAgICAgICAgc2hvd01vZGFsU3RhdHVzOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfS5iaW5kKHRoaXMpLCAyMDApXG4gICAgfVxuICAgIHNob3coKXtcbiAgICAgIC8vIOaYvuekuumBrue9qeWxglxuICAgICAgdmFyIGFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImxpbmVhclwiLFxuICAgICAgICBkZWxheTogMFxuICAgICAgfSlcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbWF0aW9uXG4gICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgzMDApLnN0ZXAoKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uLmV4cG9ydCgpLFxuICAgICAgICBzaG93TW9kYWxTdGF0dXM6IHRydWVcbiAgICAgIH0pXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYW5pbWF0aW9uLnRyYW5zbGF0ZVkoMCkuc3RlcCgpXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgIH0pXG4gICAgICB9LmJpbmQodGhpcyksIDIwMClcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpe1xuICAgICAgdGhpcy5sb2dvSW1nID0gb3B0aW9ucy5tTG9nb1xuICAgICAgdGhpcy50aXRsZSA9IG9wdGlvbnMubVRpdGxlXG4gICAgICB0aGlzLm1faWQgPSBvcHRpb25zLm1faWRcbiAgICB9XG4gIH1cbiJdfQ==