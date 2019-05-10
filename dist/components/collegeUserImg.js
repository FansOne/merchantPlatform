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

var _allUsers = require('./allUsers.js');

var _allUsers2 = _interopRequireDefault(_allUsers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var collegeUserImg = function (_wepy$component) {
    _inherits(collegeUserImg, _wepy$component);

    function collegeUserImg() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, collegeUserImg);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = collegeUserImg.__proto__ || Object.getPrototypeOf(collegeUserImg)).call.apply(_ref, [this].concat(args))), _this), _this.$repeat = {}, _this.$props = { "allUsers": { "xmlns:v-bind": "", "v-bind:syncTitle.sync": "userMess" } }, _this.$events = {}, _this.components = {
            allUsers: _allUsers2.default
        }, _this.data = {
            Mask: true,
            userMess: {},
            token: ''
        }, _this.methods = {
            bottomShow: function bottomShow() {
                var _this2 = this;

                this.Mask = !this.Mask;
                this.$apply();
                wx.getStorage({
                    key: 'groupOrderId',
                    success: function success(res) {
                        var that = _this2;
                        var url = _api2.default.apiMall + 'api/share_page/' + res.data;
                        _wepy2.default.request({
                            url: url,
                            method: 'GET',
                            header: {
                                'Accept': 'application/vnd.lingmo.v1+json',
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                'Authorization': 'Bearer ' + _this2.token
                            }
                        }).then(function (res) {
                            that.userMess = res.data.message.user;
                            that.$apply();
                        });
                    }
                });
            }
        }, _this.events = {}, _this.props = {
            syncTitle: {
                type: Object,
                default: 'null'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(collegeUserImg, [{
        key: 'onLoad',
        value: function onLoad() {
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
        }
    }]);

    return collegeUserImg;
}(_wepy2.default.component);

exports.default = collegeUserImg;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlZ2VVc2VySW1nLmpzIl0sIm5hbWVzIjpbImNvbGxlZ2VVc2VySW1nIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYWxsVXNlcnMiLCJkYXRhIiwiTWFzayIsInVzZXJNZXNzIiwidG9rZW4iLCJtZXRob2RzIiwiYm90dG9tU2hvdyIsIiRhcHBseSIsInd4IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJ0aGF0IiwidXJsIiwiYXBpIiwiYXBpTWFsbCIsInJlcyIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiaGVhZGVyIiwidGhlbiIsIm1lc3NhZ2UiLCJ1c2VyIiwiZXZlbnRzIiwicHJvcHMiLCJzeW5jVGl0bGUiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsImdldFN0b3JhZ2VTeW5jIiwiYWNjZXNzX3Rva2VuIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2xCQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIseUJBQXdCLFVBQTNDLEVBQVosRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDTkMsc0JBQVNBO0FBREgsUyxRQUdWQyxJLEdBQU87QUFDSEMsa0JBQUssSUFERjtBQUVIQyxzQkFBUyxFQUZOO0FBR0hDLG1CQUFNO0FBSEgsUyxRQUtQQyxPLEdBQVU7QUFDTkMsc0JBRE0sd0JBQ007QUFBQTs7QUFDUixxQkFBS0osSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQSxxQkFBS0ssTUFBTDtBQUNBQyxtQkFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHlCQUFLLGNBREs7QUFFVkMsNkJBQVMsc0JBQU87QUFDWiw0QkFBTUMsT0FBTyxNQUFiO0FBQ0EsNEJBQU1DLE1BQU1DLGNBQUlDLE9BQUosR0FBYyxpQkFBZCxHQUFrQ0MsSUFBSWYsSUFBbEQ7QUFDQWdCLHVDQUFLQyxPQUFMLENBQWE7QUFDVEwsaUNBQUtBLEdBREk7QUFFVE0sb0NBQVEsS0FGQztBQUdUQyxvQ0FBTztBQUNILDBDQUFTLGdDQUROO0FBRUgsZ0RBQWUsaURBRlo7QUFHSCxpREFBZ0IsWUFBWSxPQUFLaEI7QUFIOUI7QUFIRSx5QkFBYixFQVFHaUIsSUFSSCxDQVFRLFVBQUNMLEdBQUQsRUFBTztBQUNYSixpQ0FBS1QsUUFBTCxHQUFnQmEsSUFBSWYsSUFBSixDQUFTcUIsT0FBVCxDQUFpQkMsSUFBakM7QUFDQVgsaUNBQUtMLE1BQUw7QUFDSCx5QkFYRDtBQVlIO0FBakJTLGlCQUFkO0FBbUJIO0FBdkJLLFMsUUF5QlZpQixNLEdBQVMsRSxRQUNUQyxLLEdBQVE7QUFDSkMsdUJBQVc7QUFDUEMsc0JBQUtDLE1BREU7QUFFUEMseUJBQVM7QUFGRjtBQURQLFM7Ozs7O2lDQU1BO0FBQ0osZ0JBQUl6QixRQUFRSSxHQUFHc0IsY0FBSCxDQUFrQixjQUFsQixDQUFaO0FBQ0EsaUJBQUsxQixLQUFMLEdBQWFBLE1BQU0yQixZQUFuQjtBQUNIOzs7O0VBL0N1Q2QsZUFBS2UsUzs7a0JBQTVCckMsYyIsImZpbGUiOiJjb2xsZWdlVXNlckltZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknXG5pbXBvcnQgYWxsVXNlcnMgZnJvbSAnLi9hbGxVc2VycydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbGxlZ2VVc2VySW1nIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJhbGxVc2Vyc1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c3luY1RpdGxlLnN5bmNcIjpcInVzZXJNZXNzXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgICAgYWxsVXNlcnM6YWxsVXNlcnNcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICAgIE1hc2s6dHJ1ZSxcbiAgICAgICAgdXNlck1lc3M6e30sXG4gICAgICAgIHRva2VuOicnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgICBib3R0b21TaG93KCl7XG4gICAgICAgICAgICB0aGlzLk1hc2sgPSAhdGhpcy5NYXNrO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAga2V5OiAnZ3JvdXBPcmRlcklkJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYXBpLmFwaU1hbGwgKyAnYXBpL3NoYXJlX3BhZ2UvJyArIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXNlck1lc3MgPSByZXMuZGF0YS5tZXNzYWdlLnVzZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHt9O1xuICAgIHByb3BzID0ge1xuICAgICAgICBzeW5jVGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6T2JqZWN0LFxuICAgICAgICAgICAgZGVmYXVsdDogJ251bGwnXG4gICAgICAgIH0sXG4gICAgfVxuICAgIG9uTG9hZCgpe1xuICAgICAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICB9XG59XG4iXX0=