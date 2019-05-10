'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputValue = function (_wepy$page) {
  _inherits(inputValue, _wepy$page);

  function inputValue() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, inputValue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = inputValue.__proto__ || Object.getPrototypeOf(inputValue)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      // navigationBarTitleText: '',
    }, _this.components = {}, _this.data = {
      title: '',
      m_id: '',
      inputValue: null,
      btnDisabled: true,
      inputFocus: true,
      isMemCard: '' //商户是否开通会员卡
    }, _this.methods = {
      changeInput: function changeInput(e) {
        var value = e.detail.value;
        if (value[0] === '.' || value[0] === '0' && value[1] !== '.' && this.inputValue.length !== 2) {
          this.inputValue = '0.';
          return {
            value: '0.'
          };
        } else if (this._have2Digit(value)) {
          this.inputValue = value.slice(0, -1);
          return {
            value: value.slice(0, -1)
          };
        } else if (this._haveDigit(value)) {
          var index = value.indexOf('.');
          this.inputValue = value.slice(0, index + 3);
          return {
            value: value.slice(0, index + 3)
          };
        }
        this.inputValue = value;
      },
      goRecharge: function goRecharge() {
        wx.navigateTo({
          url: './payMentRecharge?inputValue=' + this.inputValue + '&m_id=' + this.m_id
        });
      }
    }, _this.computed = {
      inputValid: function inputValid() {
        if (this.inputValue === '0' || this.inputValue === '0.' || !this.inputValue || this.inputValue === '0.0' || this.inputValue === '0.00' || this.inputValue[this.inputValue.length - 1] === '.') {
          this.btnDisabled = true;
          return false;
        } else if (this.inputValue > 50000) {
          this.btnDisabled = true;
          return false;
        } else {
          this.btnDisabled = false;
          return true;
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(inputValue, [{
    key: '_have2Digit',
    value: function _have2Digit(str) {
      var sum = 0;
      for (var i = 0; i < str.length; i++) {
        if (str[i] === '.') {
          sum += 1;
        }
      }
      return sum > 1;
    }
  }, {
    key: '_haveDigit',
    value: function _haveDigit(str) {
      var index = str.indexOf('.');
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.title = options.title;
      this.m_id = options.m_id;
      this.isMemCard = options.isMemCard;
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.inputFocus = true;
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.inputValue = null;
      this.inputFocus = false;
    }
  }]);

  return inputValue;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(inputValue , 'pages/inputValue'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0VmFsdWUuanMiXSwibmFtZXMiOlsiaW5wdXRWYWx1ZSIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJkYXRhIiwidGl0bGUiLCJtX2lkIiwiYnRuRGlzYWJsZWQiLCJpbnB1dEZvY3VzIiwiaXNNZW1DYXJkIiwibWV0aG9kcyIsImNoYW5nZUlucHV0IiwiZSIsInZhbHVlIiwiZGV0YWlsIiwibGVuZ3RoIiwiX2hhdmUyRGlnaXQiLCJzbGljZSIsIl9oYXZlRGlnaXQiLCJpbmRleCIsImluZGV4T2YiLCJnb1JlY2hhcmdlIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiY29tcHV0ZWQiLCJpbnB1dFZhbGlkIiwic3RyIiwic3VtIiwiaSIsIm9wdGlvbnMiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUDtBQURPLEssUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGFBQU0sRUFERDtBQUVMQyxZQUFLLEVBRkE7QUFHTEwsa0JBQVksSUFIUDtBQUlMTSxtQkFBWSxJQUpQO0FBS0xDLGtCQUFXLElBTE47QUFNTEMsaUJBQVUsRUFOTCxDQU1RO0FBTlIsSyxRQVNQQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0tDLENBREwsRUFDUTtBQUNkLFlBQUlDLFFBQVFELEVBQUVFLE1BQUYsQ0FBU0QsS0FBckI7QUFDQSxZQUFJQSxNQUFNLENBQU4sTUFBYSxHQUFiLElBQXFCQSxNQUFNLENBQU4sTUFBYSxHQUFiLElBQW9CQSxNQUFNLENBQU4sTUFBYSxHQUFqQyxJQUF3QyxLQUFLWixVQUFMLENBQWdCYyxNQUFoQixLQUEyQixDQUE1RixFQUFnRztBQUM5RixlQUFLZCxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsaUJBQU87QUFDTFksbUJBQU87QUFERixXQUFQO0FBR0QsU0FMRCxNQUtPLElBQUksS0FBS0csV0FBTCxDQUFpQkgsS0FBakIsQ0FBSixFQUE2QjtBQUNsQyxlQUFLWixVQUFMLEdBQWtCWSxNQUFNSSxLQUFOLENBQVksQ0FBWixFQUFlLENBQUMsQ0FBaEIsQ0FBbEI7QUFDQSxpQkFBTztBQUNMSixtQkFBT0EsTUFBTUksS0FBTixDQUFZLENBQVosRUFBZSxDQUFDLENBQWhCO0FBREYsV0FBUDtBQUdELFNBTE0sTUFLQSxJQUFJLEtBQUtDLFVBQUwsQ0FBZ0JMLEtBQWhCLENBQUosRUFBNEI7QUFDakMsY0FBSU0sUUFBUU4sTUFBTU8sT0FBTixDQUFjLEdBQWQsQ0FBWjtBQUNBLGVBQUtuQixVQUFMLEdBQWtCWSxNQUFNSSxLQUFOLENBQVksQ0FBWixFQUFlRSxRQUFRLENBQXZCLENBQWxCO0FBQ0EsaUJBQU87QUFDTE4sbUJBQU9BLE1BQU1JLEtBQU4sQ0FBWSxDQUFaLEVBQWVFLFFBQVEsQ0FBdkI7QUFERixXQUFQO0FBR0Q7QUFDRCxhQUFLbEIsVUFBTCxHQUFrQlksS0FBbEI7QUFDRCxPQXJCTztBQXNCUlEsZ0JBdEJRLHdCQXNCSTtBQUNWQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsaURBQXFDLEtBQUt2QixVQUExQyxjQUE2RCxLQUFLSztBQUR0RCxTQUFkO0FBR0Q7QUExQk8sSyxRQTZCVm1CLFEsR0FBVztBQUNUQyxnQkFEUyx3QkFDSztBQUNaLFlBQUksS0FBS3pCLFVBQUwsS0FBb0IsR0FBcEIsSUFBMkIsS0FBS0EsVUFBTCxLQUFvQixJQUEvQyxJQUF1RCxDQUFDLEtBQUtBLFVBQTdELElBQTJFLEtBQUtBLFVBQUwsS0FBb0IsS0FBL0YsSUFBd0csS0FBS0EsVUFBTCxLQUFvQixNQUE1SCxJQUNGLEtBQUtBLFVBQUwsQ0FBZ0IsS0FBS0EsVUFBTCxDQUFnQmMsTUFBaEIsR0FBeUIsQ0FBekMsTUFBZ0QsR0FEbEQsRUFDdUQ7QUFDckQsZUFBS1IsV0FBTCxHQUFtQixJQUFuQjtBQUNBLGlCQUFPLEtBQVA7QUFDRCxTQUpELE1BSU8sSUFBRyxLQUFLTixVQUFMLEdBQWtCLEtBQXJCLEVBQTJCO0FBQ2hDLGVBQUtNLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxpQkFBTyxLQUFQO0FBQ0QsU0FITSxNQUdEO0FBQ0osZUFBS0EsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGlCQUFPLElBQVA7QUFDRDtBQUNGO0FBYlEsSzs7Ozs7Z0NBZUVvQixHLEVBQUs7QUFDaEIsVUFBSUMsTUFBTSxDQUFWO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLElBQUlaLE1BQXhCLEVBQWdDYyxHQUFoQyxFQUFxQztBQUNuQyxZQUFJRixJQUFJRSxDQUFKLE1BQVcsR0FBZixFQUFvQjtBQUNsQkQsaUJBQU8sQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxhQUFPQSxNQUFNLENBQWI7QUFDRDs7OytCQUNXRCxHLEVBQUs7QUFDZixVQUFJUixRQUFRUSxJQUFJUCxPQUFKLENBQVksR0FBWixDQUFaO0FBQ0EsVUFBSUQsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDaEIsZUFBTyxLQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxJQUFQO0FBQ0Q7QUFDRjs7OzJCQUNNVyxPLEVBQVE7QUFDYixXQUFLekIsS0FBTCxHQUFheUIsUUFBUXpCLEtBQXJCO0FBQ0EsV0FBS0MsSUFBTCxHQUFZd0IsUUFBUXhCLElBQXBCO0FBQ0EsV0FBS0csU0FBTCxHQUFpQnFCLFFBQVFyQixTQUF6QjtBQUNEOzs7NkJBQ087QUFDTixXQUFLRCxVQUFMLEdBQWtCLElBQWxCO0FBQ0Q7Ozs2QkFDTztBQUNOLFdBQUtQLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxXQUFLTyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0Q7Ozs7RUF2RnFDdUIsZUFBS0MsSTs7a0JBQXhCL0IsVSIsImZpbGUiOiJpbnB1dFZhbHVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5wdXRWYWx1ZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLy8gbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7fVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIHRpdGxlOicnLFxuICAgICAgbV9pZDonJyxcbiAgICAgIGlucHV0VmFsdWU6IG51bGwsXG4gICAgICBidG5EaXNhYmxlZDp0cnVlLFxuICAgICAgaW5wdXRGb2N1czp0cnVlLFxuICAgICAgaXNNZW1DYXJkOicnLC8v5ZWG5oi35piv5ZCm5byA6YCa5Lya5ZGY5Y2hXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGNoYW5nZUlucHV0IChlKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIGlmICh2YWx1ZVswXSA9PT0gJy4nIHx8ICh2YWx1ZVswXSA9PT0gJzAnICYmIHZhbHVlWzFdICE9PSAnLicgJiYgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aCAhPT0gMikpIHtcbiAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnMC4nXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiAnMC4nLFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXZlMkRpZ2l0KHZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUuc2xpY2UoMCwgLTEpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhdmVEaWdpdCh2YWx1ZSkpIHtcbiAgICAgICAgICBsZXQgaW5kZXggPSB2YWx1ZS5pbmRleE9mKCcuJylcbiAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBpbmRleCArIDMpXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS5zbGljZSgwLCBpbmRleCArIDMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHZhbHVlXG4gICAgICB9LFxuICAgICAgZ29SZWNoYXJnZSgpe1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGAuL3BheU1lbnRSZWNoYXJnZT9pbnB1dFZhbHVlPSR7dGhpcy5pbnB1dFZhbHVlfSZtX2lkPSR7dGhpcy5tX2lkfWBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBpbnB1dFZhbGlkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWYWx1ZSA9PT0gJzAnIHx8IHRoaXMuaW5wdXRWYWx1ZSA9PT0gJzAuJyB8fCAhdGhpcy5pbnB1dFZhbHVlIHx8IHRoaXMuaW5wdXRWYWx1ZSA9PT0gJzAuMCcgfHwgdGhpcy5pbnB1dFZhbHVlID09PSAnMC4wMCcgfHxcbiAgICAgICAgICB0aGlzLmlucHV0VmFsdWVbdGhpcy5pbnB1dFZhbHVlLmxlbmd0aCAtIDFdID09PSAnLicpIHtcbiAgICAgICAgICB0aGlzLmJ0bkRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuaW5wdXRWYWx1ZSA+IDUwMDAwKXtcbiAgICAgICAgICB0aGlzLmJ0bkRpc2FibGVkID0gdHJ1ZVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgdGhpcy5idG5EaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgX2hhdmUyRGlnaXQgKHN0cikge1xuICAgICAgbGV0IHN1bSA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc3RyW2ldID09PSAnLicpIHtcbiAgICAgICAgICBzdW0gKz0gMVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VtID4gMVxuICAgIH1cbiAgICBfaGF2ZURpZ2l0IChzdHIpIHtcbiAgICAgIGxldCBpbmRleCA9IHN0ci5pbmRleE9mKCcuJylcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucyl7XG4gICAgICB0aGlzLnRpdGxlID0gb3B0aW9ucy50aXRsZVxuICAgICAgdGhpcy5tX2lkID0gb3B0aW9ucy5tX2lkXG4gICAgICB0aGlzLmlzTWVtQ2FyZCA9IG9wdGlvbnMuaXNNZW1DYXJkXG4gICAgfVxuICAgIG9uU2hvdygpe1xuICAgICAgdGhpcy5pbnB1dEZvY3VzID0gdHJ1ZVxuICAgIH1cbiAgICBvbkhpZGUoKXtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IG51bGxcbiAgICAgIHRoaXMuaW5wdXRGb2N1cyA9IGZhbHNlXG4gICAgfVxuICB9XG4iXX0=