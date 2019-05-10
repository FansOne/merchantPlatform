'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


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

var MemberCardSingleShop = function (_wepy$page) {
    _inherits(MemberCardSingleShop, _wepy$page);

    function MemberCardSingleShop() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MemberCardSingleShop);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MemberCardSingleShop.__proto__ || Object.getPrototypeOf(MemberCardSingleShop)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会员卡'
        }, _this.components = {}, _this.data = {
            amount: '0.00',
            shopInfo: null,
            token: '',
            is_get_member_card: 0,
            getCardWords: '开通会员卡',
            msgList: []
        }, _this.methods = {
            //领取会员卡
            getMember: function getMember() {
                if (this.is_get_member_card == 1) {
                    wx.redirectTo({
                        url: '../packageMembershipCard/membershipCard/memberList'
                    });
                } else {
                    this.getMember();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MemberCardSingleShop, [{
        key: 'getMember',

        //领取会员卡
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var url, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                url = _api2.default.apiMall + 'api/user_card';
                                data = {
                                    merchant_id: this.shopInfo.shopId
                                };

                                _wepy2.default.request({
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
                                        _this2.is_get_member_card = 1;
                                        _this2.getCardWords = '查看会员卡';
                                        // wx.getStorage({
                                        //     key:'gotShopMemberCard',
                                        //     success:res=>{
                                        //         let gotShopMemberCard = res.data;
                                        //         gotShopMemberCard.push({
                                        //             merchant_id:this.shopInfo.shopId
                                        //         })
                                        //         wx.setStorage({
                                        //             key: 'gotShopMemberCard',
                                        //             data: gotShopMemberCard
                                        //         });
                                        //     },
                                        //     fail:res=>{
                                        //         let gotShopMemberCard = [];
                                        //         gotShopMemberCard.push({
                                        //             merchant_id:this.shopInfo.shopId
                                        //         })
                                        //         wx.setStorage({
                                        //             key: 'gotShopMemberCard',
                                        //             data: gotShopMemberCard
                                        //         });
                                        //     }
                                        // })
                                        wx.showModal({
                                            title: '提示',
                                            content: '领取成功，是否查看会员卡？',
                                            showCancel: true,
                                            cancelText: '取消',
                                            cancelColor: '#000000',
                                            confirmText: '确定',
                                            confirmColor: '#3CC51F',
                                            success: function success(res) {
                                                if (res.confirm) {
                                                    wx.redirectTo({
                                                        url: '../packageMembershipCard/membershipCard/memberList'
                                                    });
                                                }
                                            }
                                        });
                                        _this2.$apply();
                                    }
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getMember() {
                return _ref2.apply(this, arguments);
            }

            return getMember;
        }()
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            //获取token
            var token = wx.getStorageSync("access_token");
            this.token = token.access_token;
            this.shopInfo = options; //商户信息 
            this.$apply();
            //获取是否该用户已经领取了会员卡
            // wx.getStorage({
            //     key: 'gotShopMemberCard',
            //     success: res => {
            //         if(res.data.length != 0){
            //             res.data.forEach((item,index)=>{
            //                 if(item.merchant_id == this.shopInfo.shopId){
            //                     //已领取该店会员卡
            //                     this.is_get_member_card = 1;
            //                     this.getCardWords = '查看会员卡';
            //                 }else{
            //                     this.is_get_member_card = 0;
            //                 }
            //             })
            //         }
            //     },
            //     fail:res=>{
            //     }
            // }); 
            this.getCardLists();
            this.$apply();
            this.is_have_card();
        }
    }, {
        key: 'getCardLists',

        // 会员卡充值优惠列表
        value: function getCardLists() {
            var _this3 = this;

            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/charge_members/' + this.shopInfo.shopId,
                method: 'GET',
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json'
                }
            }).then(function (res) {
                _this3.msgList = res.data.message;
                _this3.$apply();
            });
        }
    }, {
        key: 'is_have_card',

        //判断是否存在会员卡
        value: function is_have_card() {
            var _this4 = this;

            var data = {
                merchant_id: this.shopInfo.shopId
            };
            _wepy2.default.request({
                url: _api2.default.apiMall + 'api/isCard',
                method: 'GET',
                data: data,
                header: {
                    'Accept': 'application/vnd.lingmo.v1+json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(function (res) {
                if (res.data.message == 1) {
                    //已领取该店会员卡
                    _this4.is_get_member_card = 1;
                    _this4.getCardWords = '查看会员卡';
                } else {
                    _this4.is_get_member_card = 0;
                }
                _this4.$apply();
            });
        }
    }]);

    return MemberCardSingleShop;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(MemberCardSingleShop , 'pages/memberCardSingleShop'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lbWJlckNhcmRTaW5nbGVTaG9wLmpzIl0sIm5hbWVzIjpbIk1lbWJlckNhcmRTaW5nbGVTaG9wIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwiYW1vdW50Iiwic2hvcEluZm8iLCJ0b2tlbiIsImlzX2dldF9tZW1iZXJfY2FyZCIsImdldENhcmRXb3JkcyIsIm1zZ0xpc3QiLCJtZXRob2RzIiwiZ2V0TWVtYmVyIiwid3giLCJyZWRpcmVjdFRvIiwidXJsIiwiYXBpIiwiYXBpTWFsbCIsIm1lcmNoYW50X2lkIiwic2hvcElkIiwid2VweSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJ0aGVuIiwicmVzIiwic3RhdHVzIiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsImNvbmZpcm0iLCIkYXBwbHkiLCJvcHRpb25zIiwiZ2V0U3RvcmFnZVN5bmMiLCJhY2Nlc3NfdG9rZW4iLCJnZXRDYXJkTGlzdHMiLCJpc19oYXZlX2NhcmQiLCJtZXNzYWdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLG9COzs7Ozs7Ozs7Ozs7OztzTkFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxVLEdBQWEsRSxRQUViQyxJLEdBQU87QUFDSEMsb0JBQU8sTUFESjtBQUVIQyxzQkFBUyxJQUZOO0FBR0hDLG1CQUFNLEVBSEg7QUFJSEMsZ0NBQW1CLENBSmhCO0FBS0hDLDBCQUFhLE9BTFY7QUFNSEMscUJBQVE7QUFOTCxTLFFBUVBDLE8sR0FBVTtBQUNOO0FBQ0FDLHFCQUZNLHVCQUVLO0FBQ1Asb0JBQUcsS0FBS0osa0JBQUwsSUFBMkIsQ0FBOUIsRUFBZ0M7QUFDNUJLLHVCQUFH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Q1gsb0JBQUdBLElBQUlyQixJQUFKLENBQVN1QyxPQUFULElBQW9CLENBQXZCLEVBQXlCO0FBQ3JCO0FBQ0EsMkJBQUtuQyxrQkFBTCxHQUEwQixDQUExQjtBQUNBLDJCQUFLQyxZQUFMLEdBQW9CLE9BQXBCO0FBQ0gsaUJBSkQsTUFJSztBQUNELDJCQUFLRCxrQkFBTCxHQUEwQixDQUExQjtBQUNIO0FBQ0QsdUJBQUs2QixNQUFMO0FBQ0gsYUFsQkQ7QUFtQkg7Ozs7RUExSjZDakIsZUFBS3dCLEk7O2tCQUFsQzVDLG9CIiwiZmlsZSI6Im1lbWJlckNhcmRTaW5nbGVTaG9wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVtYmVyQ2FyZFNpbmdsZVNob3AgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S8muWRmOWNoScsXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6JzAuMDAnLFxuICAgICAgICBzaG9wSW5mbzpudWxsLFxuICAgICAgICB0b2tlbjonJyxcbiAgICAgICAgaXNfZ2V0X21lbWJlcl9jYXJkOjAsXG4gICAgICAgIGdldENhcmRXb3Jkczon5byA6YCa5Lya5ZGY5Y2hJyxcbiAgICAgICAgbXNnTGlzdDpbXVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgICAgLy/pooblj5bkvJrlkZjljaFcbiAgICAgICAgZ2V0TWVtYmVyKCl7XG4gICAgICAgICAgICBpZih0aGlzLmlzX2dldF9tZW1iZXJfY2FyZCA9PSAxKXtcbiAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnLi4vcGFja2FnZU1lbWJlcnNoaXBDYXJkL21lbWJlcnNoaXBDYXJkL21lbWJlckxpc3QnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE1lbWJlcigpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfTtcbiAgICAvL+mihuWPluS8muWRmOWNoVxuICAgIGFzeW5jIGdldE1lbWJlcigpe1xuICAgICAgICBjb25zdCB1cmwgPSBhcGkuYXBpTWFsbCArICdhcGkvdXNlcl9jYXJkJztcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuc2hvcEluZm8uc2hvcElkXG4gICAgICAgIH1cbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXI6e1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICB9KS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgaWYocmVzLmRhdGEuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgICAgICAgdGhpcy5pc19nZXRfbWVtYmVyX2NhcmQgPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FyZFdvcmRzID0gJ+afpeeci+S8muWRmOWNoSc7XG4gICAgICAgICAgICAgICAgLy8gd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgLy8gICAgIGtleTonZ290U2hvcE1lbWJlckNhcmQnLFxuICAgICAgICAgICAgICAgIC8vICAgICBzdWNjZXNzOnJlcz0+e1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGdvdFNob3BNZW1iZXJDYXJkID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBnb3RTaG9wTWVtYmVyQ2FyZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLnNob3BJbmZvLnNob3BJZFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGtleTogJ2dvdFNob3BNZW1iZXJDYXJkJyxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBkYXRhOiBnb3RTaG9wTWVtYmVyQ2FyZFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgIGZhaWw6cmVzPT57XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZ290U2hvcE1lbWJlckNhcmQgPSBbXTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGdvdFNob3BNZW1iZXJDYXJkLnB1c2goe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuc2hvcEluZm8uc2hvcElkXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAga2V5OiAnZ290U2hvcE1lbWJlckNhcmQnLFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRhdGE6IGdvdFNob3BNZW1iZXJDYXJkXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50Oifpooblj5bmiJDlip/vvIzmmK/lkKbmn6XnnIvkvJrlkZjljaHvvJ8nICxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbENvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnIzNDQzUxRicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXMuY29uZmlybSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BhY2thZ2VNZW1iZXJzaGlwQ2FyZC9tZW1iZXJzaGlwQ2FyZC9tZW1iZXJMaXN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgICAgLy/ojrflj5Z0b2tlblxuICAgICAgICBsZXQgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYyhcImFjY2Vzc190b2tlblwiKTtcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuLmFjY2Vzc190b2tlbjtcbiAgICAgICAgdGhpcy5zaG9wSW5mbyA9IG9wdGlvbnMgIC8v5ZWG5oi35L+h5oGvIFxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAvL+iOt+WPluaYr+WQpuivpeeUqOaIt+W3sue7j+mihuWPluS6huS8muWRmOWNoVxuICAgICAgICAvLyB3eC5nZXRTdG9yYWdlKHtcbiAgICAgICAgLy8gICAgIGtleTogJ2dvdFNob3BNZW1iZXJDYXJkJyxcbiAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYocmVzLmRhdGEubGVuZ3RoICE9IDApe1xuICAgICAgICAvLyAgICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoaXRlbS5tZXJjaGFudF9pZCA9PSB0aGlzLnNob3BJbmZvLnNob3BJZCl7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy/lt7Lpooblj5bor6XlupfkvJrlkZjljaFcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX2dldF9tZW1iZXJfY2FyZCA9IDE7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYXJkV29yZHMgPSAn5p+l55yL5Lya5ZGY5Y2hJztcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfZ2V0X21lbWJlcl9jYXJkID0gMDtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgZmFpbDpyZXM9PntcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7IFxuICAgICAgICB0aGlzLmdldENhcmRMaXN0cygpXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMuaXNfaGF2ZV9jYXJkKCk7XG4gICAgfTtcbiAgICAvLyDkvJrlkZjljaHlhYXlgLzkvJjmg6DliJfooahcbiAgICBnZXRDYXJkTGlzdHMoKXtcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9jaGFyZ2VfbWVtYmVycy8nICsgdGhpcy5zaG9wSW5mby5zaG9wSWQsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLm1zZ0xpc3QgPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8v5Yik5pat5piv5ZCm5a2Y5Zyo5Lya5ZGY5Y2hXG4gICAgaXNfaGF2ZV9jYXJkKCl7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLnNob3BJbmZvLnNob3BJZCxcbiAgICAgICAgfVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCsnYXBpL2lzQ2FyZCcsXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgZGF0YTpkYXRhLFxuICAgICAgICAgICAgaGVhZGVyOntcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLm1lc3NhZ2UgPT0gMSl7XG4gICAgICAgICAgICAgICAgLy/lt7Lpooblj5bor6XlupfkvJrlkZjljaFcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2dldF9tZW1iZXJfY2FyZCA9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYXJkV29yZHMgPSAn5p+l55yL5Lya5ZGY5Y2hJztcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuaXNfZ2V0X21lbWJlcl9jYXJkID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==