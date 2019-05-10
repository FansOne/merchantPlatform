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

var personalAuthentication = function (_wepy$page) {
    _inherits(personalAuthentication, _wepy$page);

    function personalAuthentication() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, personalAuthentication);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = personalAuthentication.__proto__ || Object.getPrototypeOf(personalAuthentication)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '个人认证'
        }, _this.components = {}, _this.data = {
            identityChoose: [{
                id: 0,
                title: '村民',
                bgColor: '#f41928',
                color: '#ffffff'
            }, {
                id: 1,
                title: '贫困户',
                bgColor: '#f3f3f3',
                color: '#999999'
            }, {
                id: 2,
                title: '扶贫干部',
                bgColor: '#f3f3f3',
                color: '#999999'
            }]
        }, _this.methods = {
            uerChooseIdentity: function uerChooseIdentity(id) {
                this.identityChoose.forEach(function (element, index) {
                    if (id == index) {
                        element.bgColor = '#f41928';
                        element.color = '#ffffff';
                    } else {
                        element.bgColor = '#f3f3f3';
                        element.color = '#999999';
                    }
                });
                console.log('----------', this.identityChoose[id].title);
            },
            formSubmit: function formSubmit() {
                wx.showToast({
                    title: '系统升级中...',
                    icon: 'none',
                    duration: 1500,
                    mask: false
                });
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(personalAuthentication, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return personalAuthentication;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(personalAuthentication , 'pages/personalAuthentication'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsQXV0aGVudGljYXRpb24uanMiXSwibmFtZXMiOlsicGVyc29uYWxBdXRoZW50aWNhdGlvbiIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsImlkZW50aXR5Q2hvb3NlIiwiaWQiLCJ0aXRsZSIsImJnQ29sb3IiLCJjb2xvciIsIm1ldGhvZHMiLCJ1ZXJDaG9vc2VJZGVudGl0eSIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiZm9ybVN1Ym1pdCIsInd4Iiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImV2ZW50cyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxzQjs7Ozs7Ozs7Ozs7Ozs7ME5BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLDRCQUFlLENBQ1g7QUFDSUMsb0JBQUcsQ0FEUDtBQUVJQyx1QkFBTSxJQUZWO0FBR0lDLHlCQUFRLFNBSFo7QUFJSUMsdUJBQU07QUFKVixhQURXLEVBT1g7QUFDSUgsb0JBQUcsQ0FEUDtBQUVJQyx1QkFBTSxLQUZWO0FBR0lDLHlCQUFRLFNBSFo7QUFJSUMsdUJBQU07QUFKVixhQVBXLEVBYVg7QUFDSUgsb0JBQUcsQ0FEUDtBQUVJQyx1QkFBTSxNQUZWO0FBR0lDLHlCQUFRLFNBSFo7QUFJSUMsdUJBQU07QUFKVixhQWJXO0FBRFosUyxRQXNCUEMsTyxHQUFVO0FBQ05DLDZCQURNLDZCQUNZTCxFQURaLEVBQ2U7QUFDakIscUJBQUtELGNBQUwsQ0FBb0JPLE9BQXBCLENBQTRCLFVBQUNDLE9BQUQsRUFBU0MsS0FBVCxFQUFtQjtBQUMzQyx3QkFBR1IsTUFBTVEsS0FBVCxFQUFlO0FBQ1hELGdDQUFRTCxPQUFSLEdBQWtCLFNBQWxCO0FBQ0FLLGdDQUFRSixLQUFSLEdBQWdCLFNBQWhCO0FBQ0gscUJBSEQsTUFHSztBQUNESSxnQ0FBUUwsT0FBUixHQUFrQixTQUFsQjtBQUNBSyxnQ0FBUUosS0FBUixHQUFnQixTQUFoQjtBQUNIO0FBQ0osaUJBUkQ7QUFTQU0sd0JBQVFDLEdBQVIsZUFBeUIsS0FBS1gsY0FBTCxDQUFvQkMsRUFBcEIsRUFBd0JDLEtBQWpEO0FBQ0gsYUFaSztBQWFOVSxzQkFiTSx3QkFhTTtBQUNSQyxtQkFBR0MsU0FBSCxDQUFhO0FBQ1RaLDJCQUFPLFVBREU7QUFFVGEsMEJBQU0sTUFGRztBQUdUQyw4QkFBVSxJQUhEO0FBSVRDLDBCQUFNO0FBSkcsaUJBQWI7QUFNSDtBQXBCSyxTLFFBdUJWQyxNLEdBQVMsRTs7Ozs7aUNBQ0EsQ0FBRTs7OztFQXBEcUNDLGVBQUtDLEk7O2tCQUFwQ3pCLHNCIiwiZmlsZSI6InBlcnNvbmFsQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwZXJzb25hbEF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuKrkurrorqTor4EnXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBpZGVudGl0eUNob29zZTpbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6MCxcbiAgICAgICAgICAgICAgICB0aXRsZTon5p2R5rCRJyxcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOicjZjQxOTI4JyxcbiAgICAgICAgICAgICAgICBjb2xvcjonI2ZmZmZmZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6MSxcbiAgICAgICAgICAgICAgICB0aXRsZTon6LSr5Zuw5oi3JyxcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOicjZjNmM2YzJyxcbiAgICAgICAgICAgICAgICBjb2xvcjonIzk5OTk5OSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6MixcbiAgICAgICAgICAgICAgICB0aXRsZTon5om26LSr5bmy6YOoJyxcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOicjZjNmM2YzJyxcbiAgICAgICAgICAgICAgICBjb2xvcjonIzk5OTk5OSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICB1ZXJDaG9vc2VJZGVudGl0eShpZCl7XG4gICAgICAgICAgICB0aGlzLmlkZW50aXR5Q2hvb3NlLmZvckVhY2goKGVsZW1lbnQsaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZihpZCA9PSBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYmdDb2xvciA9ICcjZjQxOTI4J1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNvbG9yID0gJyNmZmZmZmYnXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYmdDb2xvciA9ICcjZjNmM2YzJ1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNvbG9yID0gJyM5OTk5OTknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgLS0tLS0tLS0tLWAsdGhpcy5pZGVudGl0eUNob29zZVtpZF0udGl0bGUpXG4gICAgICAgIH0sXG4gICAgICAgIGZvcm1TdWJtaXQoKXtcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfns7vnu5/ljYfnuqfkuK0uLi4nLFxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHt9O1xufVxuIl19