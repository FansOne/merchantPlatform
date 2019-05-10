'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _requestUrl = require('./../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cardRecharge = function (_wepy$page) {
    _inherits(cardRecharge, _wepy$page);

    function cardRecharge() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, cardRecharge);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = cardRecharge.__proto__ || Object.getPrototypeOf(cardRecharge)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会员卡充值'
        }, _this.components = {}, _this.data = {
            selectPay: [],
            selectElement: {},
            inputStatus: false,
            userValue: null,
            cardItem: null,
            userInput: null,
            balance: ''
        }, _this.methods = {
            selectPay: function selectPay(item) {
                this.selectPay.forEach(function (element) {
                    if (item.id == element.id) {
                        element.borderColor = '#cd525b';
                        element.sanJiaoColor = '#cd525b';
                        element.moneyColor = '#cd525b';
                        element.beanColor = '#666';
                    } else {
                        element.borderColor = '#ccc';
                        element.sanJiaoColor = '#ccc';
                        element.moneyColor = '#666';
                        element.beanColor = '#ccc';
                    }
                });
                this.selectElement = item;
                if (item.id == '其他金额') {
                    this.inputStatus = true;
                    this.selectElement.elasticBigDec = this.userValue;
                } else {
                    this.inputStatus = false;
                }
                this.$apply();
            },
            bindinput: function bindinput(event) {
                var _this2 = this;

                this.userValue = event.detail.value;
                this.selectElement.elasticBigDec = event.detail.value;
                if (this.selectElement.elasticBigDec) {
                    var data = {
                        p_id: _wepy2.default.$instance.globalData.p_id,
                        m_id: this.cardItem.m_id,
                        TranType: 0,
                        Bury_Type: 1,
                        Bury_Money: this.selectElement.elasticBigDec
                    };
                    (0, _requestData.requestData)(_requestUrl2.default.getRechargeRule, "POST", data).then(function (res) {
                        console.log('--------用户输入金额获取赠送比例---' + JSON.stringify(res.data.data[0]));
                        _this2.userInput = res.data.data[0];
                        _this2.selectElement.elasticBigDec = res.data.data[0].elasticBigDec1;
                        _this2.$apply();
                    });
                }
            },
            bindconfirm: function bindconfirm() {
                // console.log(this.userValue)
                this.selectElement.elasticBigDec = this.userValue;
                this.$apply();
            },
            immediatelyRecharge: function immediatelyRecharge() {
                var _this3 = this;

                wx.showLoading({ title: '发起支付...' });
                if (this.selectElement.elasticBigDec) {
                    var url = _requestUrl2.default.MemCard_Recharge;
                    var data = {
                        p_id: _wepy2.default.$instance.globalData.p_id,
                        m_id: this.cardItem.m_id,
                        elasticMoney: this.selectElement.elasticBigDec,
                        givenMoney: this.selectElement.givenMoenyBigDec,
                        token: wx.getStorageSync('token')
                    };
                    (0, _requestData.requestData)(url, 'POST', data).then(function (res) {
                        wx.hideLoading();
                        var jssdk = res.data.data[0];
                        wx.requestPayment({
                            'appId': jssdk.appId,
                            'timeStamp': jssdk.timeStamp.toString(),
                            'nonceStr': jssdk.nonceStr,
                            'package': jssdk.package,
                            'signType': jssdk.signType,
                            'paySign': jssdk.sign,
                            success: function success(res) {
                                wx.showToast({
                                    title: '充值成功',
                                    icon: 'success',
                                    success: function success() {
                                        setTimeout(function () {
                                            wx.navigateTo({
                                                url: './membershipMessage?m_id=' + _this3.cardItem.m_id
                                            });
                                        }, 1000);
                                    }
                                });
                            }
                        });
                    });
                } else {
                    wx.showToast({
                        title: '请输入金额',
                        icon: 'none',
                        duration: 1500,
                        mask: false
                    });
                }
            },
            closePopup: function closePopup() {
                this.inputStatus = false;
                this.selectPay[0].borderColor = '#cd525b';
                this.selectPay[0].sanJiaoColor = '#cd525b';
                this.selectPay[0].moneyColor = '#cd525b';
                this.selectPay[0].beanColor = '#666';
                this.selectPay[3].borderColor = '#ccc';
                this.selectPay[3].sanJiaoColor = '#ccc';
                this.selectPay[3].moneyColor = '#666';
                this.selectPay[3].beanColor = '#ccc';
                this.selectElement = this.selectPay[0];
            }
        }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(cardRecharge, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this4 = this;

            var cardItem_ = JSON.parse(options.item);
            this.cardItem = cardItem_;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: cardItem_.m_id,
                TranType: 0,
                Bury_Type: 1,
                Bury_Money: 0
            };
            (0, _requestData.requestData)(_requestUrl2.default.getRechargeRule, "POST", data).then(function (res) {
                if (res.data.data == null) {
                    wx.showToast({
                        title: '该店铺暂时无法充值',
                        icon: 'none',
                        duration: 1200,
                        mask: false,
                        success: function success() {
                            setTimeout(function () {
                                wx.navigateBack({
                                    delta: 1
                                });
                            }, 1200);
                        }
                    });
                } else {
                    res.data.data.forEach(function (element) {
                        if (element.id == res.data.data[0].id) {
                            element.borderColor = '#cd525b';
                            element.sanJiaoColor = '#cd525b';
                            element.moneyColor = '#cd525b';
                            element.beanColor = '#666';
                        } else {
                            element.borderColor = '#ccc';
                            element.sanJiaoColor = '#ccc';
                            element.moneyColor = '#666';
                            element.beanColor = '#ccc';
                        }
                    });
                    res.data.data.push({ id: '其他金额', borderColor: '#ccc', sanJiaoColor: '#ccc', moneyColor: '#666', beanColor: '#ccc' });
                    _this4.selectElement = res.data.data[0];
                    _this4.selectPay = res.data.data;
                    _this4.$apply();
                }
            });
            // 获取会员卡余额
            this.cardMessage();
        }
    }, {
        key: 'cardMessage',

        // 获取会员卡余额
        value: function cardMessage() {
            var _this5 = this;

            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: this.cardItem.m_id,
                type: "0",
                token: _wepy2.default.getStorageSync('token')
            };
            (0, _requestData.requestData)(_requestUrl2.default.cardMessage, 'POST', data).then(function (res) {
                _this5.balance = res.data.data[0].MemInfo.balance;
                _this5.$apply();
            });
        }
    }]);

    return cardRecharge;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(cardRecharge , 'packageMembershipCard/membershipCard/cardRecharge'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRSZWNoYXJnZS5qcyJdLCJuYW1lcyI6WyJjYXJkUmVjaGFyZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJzZWxlY3RQYXkiLCJzZWxlY3RFbGVtZW50IiwiaW5wdXRTdGF0dXMiLCJ1c2VyVmFsdWUiLCJjYXJkSXRlbSIsInVzZXJJbnB1dCIsImJhbGFuY2UiLCJtZXRob2RzIiwiaXRlbSIsImZvckVhY2giLCJpZCIsImVsZW1lbnQiLCJib3JkZXJDb2xvciIsInNhbkppYW9Db2xvciIsIm1vbmV5Q29sb3IiLCJiZWFuQ29sb3IiLCJlbGFzdGljQmlnRGVjIiwiJGFwcGx5IiwiYmluZGlucHV0IiwiZXZlbnQiLCJkZXRhaWwiLCJ2YWx1ZSIsInBfaWQiLCJ3ZXB5IiwiJGluc3RhbmNlIiwiZ2xvYmFsRGF0YSIsIm1faWQiLCJUcmFuVHlwZSIsIkJ1cnlfVHlwZSIsIkJ1cnlfTW9uZXkiLCJyZXF1ZXN0VXJsIiwiZ2V0UmVjaGFyZ2VSdWxlIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwicmVzIiwiZWxhc3RpY0JpZ0RlYzEiLCJiaW5kY29uZmlybSIsImltbWVkaWF0ZWx5UmVjaGFyZ2UiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ1cmwiLCJNZW1DYXJkX1JlY2hhcmdlIiwiZWxhc3RpY01vbmV5IiwiZ2l2ZW5Nb25leSIsImdpdmVuTW9lbnlCaWdEZWMiLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiaGlkZUxvYWRpbmciLCJqc3NkayIsInJlcXVlc3RQYXltZW50IiwiYXBwSWQiLCJ0aW1lU3RhbXAiLCJ0b1N0cmluZyIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwic2lnbiIsInN1Y2Nlc3MiLCJzaG93VG9hc3QiLCJpY29uIiwic2V0VGltZW91dCIsIm5hdmlnYXRlVG8iLCJkdXJhdGlvbiIsIm1hc2siLCJjbG9zZVBvcHVwIiwiZXZlbnRzIiwib3B0aW9ucyIsImNhcmRJdGVtXyIsInBhcnNlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJwdXNoIiwiY2FyZE1lc3NhZ2UiLCJ0eXBlIiwiTWVtSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsVSxHQUFhLEUsUUFFYkMsSSxHQUFPO0FBQ0hDLHVCQUFVLEVBRFA7QUFFSEMsMkJBQWMsRUFGWDtBQUdIQyx5QkFBWSxLQUhUO0FBSUhDLHVCQUFVLElBSlA7QUFLSEMsc0JBQVMsSUFMTjtBQU1IQyx1QkFBVSxJQU5QO0FBT0hDLHFCQUFRO0FBUEwsUyxRQVNQQyxPLEdBQVU7QUFDTlAscUJBRE0scUJBQ0lRLElBREosRUFDUztBQUNYLHFCQUFLUixTQUFMLENBQWVTLE9BQWYsQ0FBdUIsbUJBQVc7QUFDOUIsd0JBQUdELEtBQUtFLEVBQUwsSUFBV0MsUUFBUUQsRUFBdEIsRUFBeUI7QUFDckJDLGdDQUFRQyxXQUFSLEdBQXNCLFNBQXRCO0FBQ0FELGdDQUFRRSxZQUFSLEdBQXVCLFNBQXZCO0FBQ0FGLGdDQUFRRyxVQUFSLEdBQXFCLFNBQXJCO0FBQ0FILGdDQUFRSSxTQUFSLEdBQW9CLE1BQXBCO0FBQ0gscUJBTEQsTUFLSztBQUNESixnQ0FBUUMsV0FBUixHQUFzQixNQUF0QjtBQUNBRCxnQ0FBUUUsWUFBUixHQUF1QixNQUF2QjtBQUNBRixnQ0FBUUcsVUFBUixHQUFxQixNQUFyQjtBQUNBSCxnQ0FBUUksU0FBUixHQUFvQixNQUFwQjtBQUNIO0FBQ0osaUJBWkQ7QUFhQSxxQkFBS2QsYUFBTCxHQUFxQk8sSUFBckI7QUFDQSxvQkFBR0EsS0FBS0UsRUFBTCxJQUFXLE1BQWQsRUFBcUI7QUFDakIseUJBQUtSLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSx5QkFBS0QsYUFBTCxDQUFtQmUsYUFBbkIsR0FB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LE1BQXBCO0FBQ0g7QUFDSixxQkFaRDtBQWFBc0Isd0JBQUl0QyxJQUFKLENBQVNBLElBQVQsQ0FBYzRFLElBQWQsQ0FBbUIsRUFBQ2pFLElBQUcsTUFBSixFQUFXRSxhQUFZLE1BQXZCLEVBQThCQyxjQUFhLE1BQTNDLEVBQWtEQyxZQUFXLE1BQTdELEVBQW9FQyxXQUFVLE1BQTlFLEVBQW5CO0FBQ0EsMkJBQUtkLGFBQUwsR0FBcUJvQyxJQUFJdEMsSUFBSixDQUFTQSxJQUFULENBQWMsQ0FBZCxDQUFyQjtBQUNBLDJCQUFLQyxTQUFMLEdBQWlCcUMsSUFBSXRDLElBQUosQ0FBU0EsSUFBMUI7QUFDQSwyQkFBS2tCLE1BQUw7QUFDSDtBQUNKLGFBbENEO0FBbUNBO0FBQ0EsaUJBQUsyRCxXQUFMO0FBQ0g7Ozs7QUFDRDtzQ0FDYTtBQUFBOztBQUNULGdCQUFJN0UsT0FBTztBQUNQdUIsc0JBQU1DLGVBQUtDLFNBQUwsQ0FBZUMsVUFBZixDQUEwQkgsSUFEekI7QUFFUEksc0JBQU0sS0FBS3RCLFFBQUwsQ0FBY3NCLElBRmI7QUFHUG1ELHNCQUFLLEdBSEU7QUFJUDVCLHVCQUFPMUIsZUFBSzJCLGNBQUwsQ0FBb0IsT0FBcEI7QUFKQSxhQUFYO0FBTUEsMENBQVlwQixxQkFBVzhDLFdBQXZCLEVBQW1DLE1BQW5DLEVBQTBDN0UsSUFBMUMsRUFBZ0RpQyxJQUFoRCxDQUFxRCxVQUFDSyxHQUFELEVBQU87QUFDeEQsdUJBQUsvQixPQUFMLEdBQWUrQixJQUFJdEMsSUFBSixDQUFTQSxJQUFULENBQWMsQ0FBZCxFQUFpQitFLE9BQWpCLENBQXlCeEUsT0FBeEM7QUFDQSx1QkFBS1csTUFBTDtBQUNILGFBSEQ7QUFJSDs7OztFQXZMcUNNLGVBQUt3RCxJOztrQkFBMUJwRixZIiwiZmlsZSI6ImNhcmRSZWNoYXJnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgcmVxdWVzdFVybCBmcm9tICcuLi8uLi9hcGkvcmVxdWVzdFVybCdcbmltcG9ydCB7IHJlcXVlc3REYXRhIH0gZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3REYXRhJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjYXJkUmVjaGFyZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOWNoeWFheWAvCdcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIHNlbGVjdFBheTpbXSxcbiAgICAgICAgc2VsZWN0RWxlbWVudDp7fSxcbiAgICAgICAgaW5wdXRTdGF0dXM6ZmFsc2UsXG4gICAgICAgIHVzZXJWYWx1ZTpudWxsLFxuICAgICAgICBjYXJkSXRlbTpudWxsLFxuICAgICAgICB1c2VySW5wdXQ6bnVsbCxcbiAgICAgICAgYmFsYW5jZTonJ1xuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgc2VsZWN0UGF5KGl0ZW0pe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYXkuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZihpdGVtLmlkID09IGVsZW1lbnQuaWQpe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJvcmRlckNvbG9yID0gJyNjZDUyNWInXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2FuSmlhb0NvbG9yID0gJyNjZDUyNWInXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubW9uZXlDb2xvciA9ICcjY2Q1MjViJ1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJlYW5Db2xvciA9ICcjNjY2J1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJvcmRlckNvbG9yID0gJyNjY2MnXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2FuSmlhb0NvbG9yID0gJyNjY2MnXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQubW9uZXlDb2xvciA9ICcjNjY2J1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJlYW5Db2xvciA9ICcjY2NjJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gaXRlbVxuICAgICAgICAgICAgaWYoaXRlbS5pZCA9PSAn5YW25LuW6YeR6aKdJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFN0YXR1cyA9IHRydWVcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuZWxhc3RpY0JpZ0RlYyA9IHRoaXMudXNlclZhbHVlXG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRTdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9LFxuICAgICAgICBiaW5kaW5wdXQoZXZlbnQpe1xuICAgICAgICAgICAgdGhpcy51c2VyVmFsdWUgPSBldmVudC5kZXRhaWwudmFsdWVcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5lbGFzdGljQmlnRGVjID0gZXZlbnQuZGV0YWlsLnZhbHVlXG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdEVsZW1lbnQuZWxhc3RpY0JpZ0RlYyl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBfaWQgOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICAgICAgICAgIG1faWQgOiB0aGlzLmNhcmRJdGVtLm1faWQsXG4gICAgICAgICAgICAgICAgICAgIFRyYW5UeXBlIDogMCxcbiAgICAgICAgICAgICAgICAgICAgQnVyeV9UeXBlIDogMSxcbiAgICAgICAgICAgICAgICAgICAgQnVyeV9Nb25leSA6IHRoaXMuc2VsZWN0RWxlbWVudC5lbGFzdGljQmlnRGVjXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcXVlc3REYXRhKHJlcXVlc3RVcmwuZ2V0UmVjaGFyZ2VSdWxlLFwiUE9TVFwiLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLeeUqOaIt+i+k+WFpemHkemineiOt+WPlui1oOmAgeavlOS+iy0tLScrSlNPTi5zdHJpbmdpZnkocmVzLmRhdGEuZGF0YVswXSkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcklucHV0ID0gcmVzLmRhdGEuZGF0YVswXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQuZWxhc3RpY0JpZ0RlYyA9IHJlcy5kYXRhLmRhdGFbMF0uZWxhc3RpY0JpZ0RlYzFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJpbmRjb25maXJtKCl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnVzZXJWYWx1ZSlcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudC5lbGFzdGljQmlnRGVjID0gdGhpcy51c2VyVmFsdWVcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSxcbiAgICAgICAgaW1tZWRpYXRlbHlSZWNoYXJnZSgpe1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe3RpdGxlOiAn5Y+R6LW35pSv5LuYLi4uJ30pO1xuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RFbGVtZW50LmVsYXN0aWNCaWdEZWMpe1xuICAgICAgICAgICAgICAgIGxldCB1cmwgPSByZXF1ZXN0VXJsLk1lbUNhcmRfUmVjaGFyZ2U7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIHBfaWQ6IHdlcHkuJGluc3RhbmNlLmdsb2JhbERhdGEucF9pZCxcbiAgICAgICAgICAgICAgICAgICAgbV9pZDogdGhpcy5jYXJkSXRlbS5tX2lkLFxuICAgICAgICAgICAgICAgICAgICBlbGFzdGljTW9uZXk6IHRoaXMuc2VsZWN0RWxlbWVudC5lbGFzdGljQmlnRGVjLFxuICAgICAgICAgICAgICAgICAgICBnaXZlbk1vbmV5OiB0aGlzLnNlbGVjdEVsZW1lbnQuZ2l2ZW5Nb2VueUJpZ0RlYyxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxdWVzdERhdGEodXJsLCdQT1NUJyxkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBsZXQganNzZGsgPSByZXMuZGF0YS5kYXRhWzBdXG4gICAgICAgICAgICAgICAgICAgIHd4LnJlcXVlc3RQYXltZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcHBJZCc6IGpzc2RrLmFwcElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IGpzc2RrLnRpbWVTdGFtcC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ25vbmNlU3RyJzoganNzZGsubm9uY2VTdHIsXG4gICAgICAgICAgICAgICAgICAgICAgICAncGFja2FnZSc6IGpzc2RrLnBhY2thZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2lnblR5cGUnOiBqc3Nkay5zaWduVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdwYXlTaWduJzoganNzZGsuc2lnbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6KHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+WFheWAvOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYC4vbWVtYmVyc2hpcE1lc3NhZ2U/bV9pZD0ke3RoaXMuY2FyZEl0ZW0ubV9pZH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXph5Hpop0nLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xvc2VQb3B1cCgpe1xuICAgICAgICAgICAgdGhpcy5pbnB1dFN0YXR1cyA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBheVswXS5ib3JkZXJDb2xvciA9ICcjY2Q1MjViJ1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RQYXlbMF0uc2FuSmlhb0NvbG9yID0gJyNjZDUyNWInXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBheVswXS5tb25leUNvbG9yID0gJyNjZDUyNWInXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBheVswXS5iZWFuQ29sb3IgPSAnIzY2NidcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGF5WzNdLmJvcmRlckNvbG9yID0gJyNjY2MnXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBheVszXS5zYW5KaWFvQ29sb3IgPSAnI2NjYydcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGF5WzNdLm1vbmV5Q29sb3IgPSAnIzY2NidcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0UGF5WzNdLmJlYW5Db2xvciA9ICcjY2NjJ1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ICA9IHRoaXMuc2VsZWN0UGF5WzBdXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICAgIGxldCBjYXJkSXRlbV8gPSBKU09OLnBhcnNlKG9wdGlvbnMuaXRlbSk7XG4gICAgICAgIHRoaXMuY2FyZEl0ZW0gPSBjYXJkSXRlbV9cbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgbV9pZCA6IGNhcmRJdGVtXy5tX2lkLFxuICAgICAgICAgICAgVHJhblR5cGUgOiAwLFxuICAgICAgICAgICAgQnVyeV9UeXBlIDogMSxcbiAgICAgICAgICAgIEJ1cnlfTW9uZXkgOiAwXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdERhdGEocmVxdWVzdFVybC5nZXRSZWNoYXJnZVJ1bGUsXCJQT1NUXCIsZGF0YSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgaWYocmVzLmRhdGEuZGF0YT09bnVsbCl7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfor6Xlupfpk7rmmoLml7bml6Dms5XlhYXlgLwnLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMjAwLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEyMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaWQgPT0gcmVzLmRhdGEuZGF0YVswXS5pZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJvcmRlckNvbG9yID0gJyNjZDUyNWInXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNhbkppYW9Db2xvciA9ICcjY2Q1MjViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5tb25leUNvbG9yICA9ICcjY2Q1MjViJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5iZWFuQ29sb3IgPSAnIzY2NidcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmJvcmRlckNvbG9yID0gJyNjY2MnXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNhbkppYW9Db2xvciA9ICcjY2NjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5tb25leUNvbG9yICA9ICcjNjY2J1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5iZWFuQ29sb3IgPSAnI2NjYydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEucHVzaCh7aWQ6J+WFtuS7lumHkeminScsYm9yZGVyQ29sb3I6JyNjY2MnLHNhbkppYW9Db2xvcjonI2NjYycsbW9uZXlDb2xvcjonIzY2NicsYmVhbkNvbG9yOicjY2NjJ30pXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFbGVtZW50ID0gcmVzLmRhdGEuZGF0YVswXVxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UGF5ID0gcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8g6I635Y+W5Lya5ZGY5Y2h5L2Z6aKdXG4gICAgICAgIHRoaXMuY2FyZE1lc3NhZ2UoKVxuICAgIH07XG4gICAgLy8g6I635Y+W5Lya5ZGY5Y2h5L2Z6aKdXG4gICAgY2FyZE1lc3NhZ2UoKXtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkOiB3ZXB5LiRpbnN0YW5jZS5nbG9iYWxEYXRhLnBfaWQsXG4gICAgICAgICAgICBtX2lkOiB0aGlzLmNhcmRJdGVtLm1faWQsXG4gICAgICAgICAgICB0eXBlOlwiMFwiLFxuICAgICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3REYXRhKHJlcXVlc3RVcmwuY2FyZE1lc3NhZ2UsJ1BPU1QnLGRhdGEpLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZSA9IHJlcy5kYXRhLmRhdGFbMF0uTWVtSW5mby5iYWxhbmNlXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19