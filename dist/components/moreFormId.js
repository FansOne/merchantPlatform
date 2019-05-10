'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var moreFormId = function (_wepy$component) {
    _inherits(moreFormId, _wepy$component);

    // Other properties
    function moreFormId() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, moreFormId);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = moreFormId.__proto__ || Object.getPrototypeOf(moreFormId)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {}, _this.methods = {
            getFormId: function getFormId(e) {
                var url = _requestUrl2.default.updateFormid;
                var data = {
                    p_id: _wepy2.default.$instance.globalData.p_id,
                    m_id: 33,
                    type: 0,
                    token: wx.getStorageSync('token'),
                    formid: e.detail.formId
                };
                console.log('formId');
                if (e.detail.formId == 'the formId is a mock one') {
                    return;
                } else {
                    (0, _requestData.requestData)(url, 'POST', data);
                }
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return moreFormId;
}(_wepy2.default.component);

exports.default = moreFormId;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vcmVGb3JtSWQuanMiXSwibmFtZXMiOlsibW9yZUZvcm1JZCIsImNvbXBvbmVudHMiLCJkYXRhIiwibWV0aG9kcyIsImdldEZvcm1JZCIsImUiLCJ1cmwiLCJyZXF1ZXN0VXJsIiwidXBkYXRlRm9ybWlkIiwicF9pZCIsIndlcHkiLCIkaW5zdGFuY2UiLCJnbG9iYWxEYXRhIiwibV9pZCIsInR5cGUiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJmb3JtaWQiLCJkZXRhaWwiLCJmb3JtSWQiLCJjb25zb2xlIiwibG9nIiwiZXZlbnRzIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ3FCQSxVOzs7QUF3QmpCOzs7Ozs7Ozs7Ozs7a01BdkJBQyxVLEdBQWEsRSxRQUViQyxJLEdBQU8sRSxRQUNQQyxPLEdBQVU7QUFDTkMscUJBRE0scUJBQ0lDLENBREosRUFDTztBQUNULG9CQUFJQyxNQUFNQyxxQkFBV0MsWUFBckI7QUFDQSxvQkFBSU4sT0FBTztBQUNQTywwQkFBTUMsZUFBS0MsU0FBTCxDQUFlQyxVQUFmLENBQTBCSCxJQUR6QjtBQUVQSSwwQkFBTSxFQUZDO0FBR1BDLDBCQUFNLENBSEM7QUFJUEMsMkJBQU9DLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FKQTtBQUtQQyw0QkFBUWIsRUFBRWMsTUFBRixDQUFTQztBQUxWLGlCQUFYO0FBT0FDLHdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBLG9CQUFHakIsRUFBRWMsTUFBRixDQUFTQyxNQUFULElBQW1CLDBCQUF0QixFQUFpRDtBQUM3QztBQUNILGlCQUZELE1BRUs7QUFDRCxrREFBWWQsR0FBWixFQUFnQixNQUFoQixFQUF1QkosSUFBdkI7QUFDSDtBQUNKO0FBaEJLLFMsUUFtQlZxQixNLEdBQVMsRTs7OztFQXZCMkJiLGVBQUtjLFM7O2tCQUF4QnhCLFUiLCJmaWxlIjoibW9yZUZvcm1JZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vYXBpL3JlcXVlc3REYXRhJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9yZUZvcm1JZCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge307XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgZ2V0Rm9ybUlkKGUpIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLnVwZGF0ZUZvcm1pZDtcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgICAgICBtX2lkOiAzMyxcbiAgICAgICAgICAgICAgICB0eXBlOiAwLFxuICAgICAgICAgICAgICAgIHRva2VuOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKSxcbiAgICAgICAgICAgICAgICBmb3JtaWQ6IGUuZGV0YWlsLmZvcm1JZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Zvcm1JZCcpXG4gICAgICAgICAgICBpZihlLmRldGFpbC5mb3JtSWQgPT0gJ3RoZSBmb3JtSWQgaXMgYSBtb2NrIG9uZScpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIC8vIE90aGVyIHByb3BlcnRpZXNcbn1cbiJdfQ==