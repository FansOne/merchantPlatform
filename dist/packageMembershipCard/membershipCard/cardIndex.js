'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _requestUrl = require('./../../api/requestUrl.js');

var _requestUrl2 = _interopRequireDefault(_requestUrl);

var _requestData = require('./../../api/requestData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cardIndex = function (_wepy$page) {
    _inherits(cardIndex, _wepy$page);

    function cardIndex() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, cardIndex);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = cardIndex.__proto__ || Object.getPrototypeOf(cardIndex)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '会员卡',
            navigationBarBackgroundColor: '#ffd270',
            enablePullDownRefresh: true,
            backgroundTextStyle: 'dark'
        }, _this.components = {}, _this.data = {
            Mask: true,
            currentTab: 0,
            // navbar: ['充值记录','消费记录','我的子卡','我的分享'],
            navbar: ['充值记录', '消费记录'],
            // 充值记录&消费记录
            rechargeRecord: [],
            // 消费记录
            // consumptionRecord:[],
            // 子卡
            // Subcard:[],
            // 我的分享
            // shareCard:[],
            MaskHeight: '',
            SelectIcon: [{
                id: 0,
                color: '#ffd270',
                title: '有限'
            }, {
                id: 1,
                color: '#969696',
                title: '无限'
            }],
            inputHidden: false,
            iconWho: 0,
            userInputNum_update: '-1',
            shareBtn: '',
            amount: '',
            // noShareCard:true,
            noRechargeRecord: true,
            // noConsumptionRecord:true,
            // noSubcard:true,
            info: null,
            cardShareNumber: ''
        }, _this.methods = {
            navbarTap: function navbarTap(e) {
                this.currentTab = e;
            },

            // bottomShow(){
            //     this.Mask = !this.Mask
            // },
            selectIcon: function selectIcon(e) {
                this.SelectIcon.forEach(function (element) {
                    if (e == element.id) {
                        element.color = '#ffd270';
                    } else {
                        element.color = '#969696';
                    }
                });
                if (!e) {
                    this.iconWho = e;
                    this.inputHidden = false;
                    this.$apply();
                } else {
                    this.iconWho = e;
                    this.inputHidden = true;
                    this.$apply();
                }
            },

            // shareBefore(){
            //     this.getData();
            //     if(this.amount == '0.00'){
            //         wx.showToast({
            //             title: '余额不足,请充值',
            //             icon: 'none',
            //         });
            //     }else{
            //         // 当选择‘有限’时，用户是否输入次数
            //         if(!this.iconWho){      //选择‘有限’
            //             if(!this.userInputNum_update || this.userInputNum_update <= 0){     //未输入次数
            //                 wx.showToast({
            //                     title: '请输入会员卡使用次数',
            //                     icon: 'none',
            //                 })
            //             }else{              
            //             }
            //         }else{
            //             this.userInputNum_update='0'
            //             this.$apply()
            //         }
            //     }
            // },
            cardRecharge: function cardRecharge() {
                wx.navigateTo({
                    url: './cardRecharge?item=' + JSON.stringify(this.info)
                });
            }
        }, _this.computed = {
            // abledShare(){
            //     if(this.amount == '0.00'){
            //         return
            //     }else{
            //         if(!this.iconWho){      //选择‘有限’
            //             if(this.userInputNum_update && this.userInputNum_update > 0){     //输入次数
            //                 this.shareBtn ='share'
            //             }else{      //未输入次数
            //                 this.shareBtn ='0'
            //             }
            //         }else{
            //             this.shareBtn ='share'
            //             this.userInputNum_update ='0'
            //         }
            //     }
            // }
        }, _this.watch = {
            currentTab: function currentTab(newValue, oldValue) {
                if (newValue == 0) {
                    this.memberCostRecord();
                } else {
                    this.memberCostRecord(1);
                }
                // else if(newValue ==  2){
                //     this.sonCardLists()
                // }else if (newValue == 3){
                //     this.shareList();
                // }
            },
            userInputNum_update: function userInputNum_update() {
                try {
                    this.getData();
                } catch (err) {}
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //分享会员卡
    // getData(){
    //     const data = {
    //         num: this.userInputNum_update,
    //         merchant_id:this.info.merchant_id
    //     };
    //     wepy.request({
    //         url: api.apiMall+'api/daughter_cards',
    //         method: 'POST',
    //         data: data,
    //         header:{
    //             'Accept':'application/vnd.lingmo.v1+json',
    //             'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
    //             'Authorization':'Bearer ' + this.token.access_token
    //         },
    //     }).then((res)=>{
    //         this.cardShareNumber = res.data.message;
    //         this.$apply()
    //     });
    // }
    // onShareAppMessage (res) {
    //     return {
    //         title: '送你一张免费购买商品会员卡。',
    //         path: '/packageMembershipCard/membershipCard/cardShare?nums='+ this.cardShareNumber + '&shopId=' + this.info.merchant_id
    //     }
    // }


    _createClass(cardIndex, [{
        key: 'userInputNum',
        value: function userInputNum(e) {
            this.userInputNum_update = e.detail.value;
        }
    }, {
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            //获取商户id
            this.info = JSON.parse(options.info);
            this.amount = this.info.balance;
            this.$apply();
            this.memberCostRecord();
            wx.getSystemInfo({
                success: function success(res) {
                    _this2.MaskHeight = res.windowHeight;
                    _this2.$apply();
                }
            });
        }
    }, {
        key: 'onPullDownRefresh',

        //下拉刷新
        value: function onPullDownRefresh() {}
        //获取会员卡金额
        // getCardMoney(){
        //     wepy.request({
        //         url: api.apiMall+'api/user_card/'+ this.info.merchant_id,
        //         method: 'GET',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         }
        //     }).then((res)=>{
        //         res.data.message.money = Number(res.data.message.money/100).toFixed(2)
        //         this.amount = res.data.message.money;
        //         this.$apply()
        //     });
        // }
        // 获取用户充值记录
        // userRecharge(){
        //     wepy.request({
        //         url: api.apiMall+'api/recharge_records',
        //         method: 'GET',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         },
        //         data: {
        //             merchant_id:this.info.merchant_id
        //         }
        //     }).then((res)=>{
        //         console.log(res)
        //         wx.stopPullDownRefresh()
        //         res.data.message.forEach(element => {
        //             element.money = Number(element.money/100).toFixed(2)
        //         });
        //         this.rechargeRecord = res.data.message
        //         this.$apply()
        //     });
        // }
        //消费记录
        // consumption(){
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        //     wepy.request({
        //         url: api.apiMall+'api/get_expenses_record',
        //         method: 'GET',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         },
        //         data: {
        //             merchant_id:this.info.merchant_id
        //         }
        //     }).then((res)=>{
        //         wx.hideLoading()
        //         res.data.message.forEach(element => {
        //             element.money = Number(element.money/100).toFixed(2);
        //         });
        //         this.consumptionRecord = res.data.message;
        //         this.$apply()
        //     });
        // }
        // 获取充值消费记录

    }, {
        key: 'memberCostRecord',
        value: function memberCostRecord(type) {
            var _this3 = this;

            var url = _requestUrl2.default.memberCostRecord;
            var data = {
                p_id: _wepy2.default.$instance.globalData.p_id,
                m_id: this.info.m_id,
                meid: this.info.meid,
                type: type || 0 //0-充值记录 1-消费记录 2-全部
            };
            (0, _requestData.requestData)(url, "POST", data).then(function (res) {
                console.log(res.data.data.Recodes);
                if (!res.data.data.Recodes.length) {
                    _this3.noRechargeRecord = false;
                } else {
                    _this3.noRechargeRecord = true;
                }
                _this3.rechargeRecord = res.data.data.Recodes;
                _this3.$apply();
            });
        }
        // 获取用户子卡列表
        // sonCardLists(){
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        //     wepy.request({
        //         url: api.apiMall+'api/daughter_cards',
        //         method: 'GET',
        //         data: {
        //             type:1,      //type=1 是领取的子卡 type=2是别人分享的子卡
        //             merchant_id:this.info.merchant_id
        //         },
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         },
        //     }).then((res)=>{
        //         wx.hideLoading()
        //         res.data.message.forEach(element => {
        //             element.amount = Number(element.amount/100).toFixed(2)
        //         });
        //         this.Subcard = res.data.message
        //         this.$apply()
        //     });
        // }
        // 我的分享列表
        // shareList(){
        //     wx.showLoading({
        //         title: '加载中',
        //     })
        //     wepy.request({
        //         url: api.apiMall+'api/daughter_cards',
        //         method: 'GET',
        //         data: {
        //             type:2,
        //             merchant_id:this.info.merchant_id     
        //         },
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         }
        //     }).then((res)=>{
        //         console.log(res)
        //         wx.hideLoading()
        //         // console.log(res.data.data)
        //         res.data.message.forEach(element => {
        //             element.amount = Number(element.amount/100).toFixed()
        //         });
        //         this.shareCard = res.data.message;
        //         this.$apply()
        //     });
        // }
        // 撤回分享卡
        // revokeShare(subcardId){
        //     wepy.request({
        //         url: api.apiMall+'api/daughter_cards/' + subcardId,
        //         method: 'DELETE',
        //         header:{
        //             'Accept':'application/vnd.lingmo.v1+json',
        //             'Authorization':'Bearer ' + this.token.access_token
        //         },
        //     }).then((res)=>{
        //         if(res.data.status == 200){
        //             wx.showToast({
        //                 title: '撤卡成功',
        //                 icon: 'success',
        //             });
        //             setTimeout(() => {
        //                 this.shareList()
        //             }, 500);
        //         }
        //     });
        // }

    }]);

    return cardIndex;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(cardIndex , 'packageMembershipCard/membershipCard/cardIndex'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcmRJbmRleC5qcyJdLCJuYW1lcyI6WyJjYXJkSW5kZXgiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiZGF0YSIsIk1hc2siLCJjdXJyZW50VGFiIiwibmF2YmFyIiwicmVjaGFyZ2VSZWNvcmQiLCJNYXNrSGVpZ2h0IiwiU2VsZWN0SWNvbiIsImlkIiwiY29sb3IiLCJ0aXRsZSIsImlucHV0SGlkZGVuIiwiaWNvbldobyIsInVzZXJJbnB1dE51bV91cGRhdGUiLCJzaGFyZUJ0biIsImFtb3VudCIsIm5vUmVjaGFyZ2VSZWNvcmQiLCJpbmZvIiwiY2FyZFNoYXJlTnVtYmVyIiwibWV0aG9kcyIsIm5hdmJhclRhcCIsImUiLCJzZWxlY3RJY29uIiwiZm9yRWFjaCIsImVsZW1lbnQiLCIkYXBwbHkiLCJjYXJkUmVjaGFyZ2UiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJtZW1iZXJDb3N0UmVjb3JkIiwiZ2V0RGF0YSIsImVyciIsImRldGFpbCIsInZhbHVlIiwib3B0aW9ucyIsInBhcnNlIiwiYmFsYW5jZSIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwid2luZG93SGVpZ2h0IiwidHlwZSIsInJlcXVlc3RVcmwiLCJwX2lkIiwid2VweSIsIiRpbnN0YW5jZSIsImdsb2JhbERhdGEiLCJtX2lkIiwibWVpZCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiUmVjb2RlcyIsImxlbmd0aCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFDakJD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XG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSdcblxuaW1wb3J0IHJlcXVlc3RVcmwgZnJvbSAnLi4vLi4vYXBpL3JlcXVlc3RVcmwnXG5pbXBvcnQgeyByZXF1ZXN0RGF0YSB9IGZyb20gJy4uLy4uL2FwaS9yZXF1ZXN0RGF0YSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2FyZEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkvJrlkZjljaEnLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZDI3MCcsXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDp0cnVlLFxuICAgICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOidkYXJrJyxcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcblxuICAgIGRhdGEgPSB7XG4gICAgICAgIE1hc2s6dHJ1ZSxcbiAgICAgICAgY3VycmVudFRhYjogMCxcbiAgICAgICAgLy8gbmF2YmFyOiBbJ+WFheWAvOiusOW9lScsJ+a2iOi0ueiusOW9lScsJ+aIkeeahOWtkOWNoScsJ+aIkeeahOWIhuS6qyddLFxuICAgICAgICBuYXZiYXI6WyflhYXlgLzorrDlvZUnLCfmtojotLnorrDlvZUnXSxcbiAgICAgICAgLy8g5YWF5YC86K6w5b2VJua2iOi0ueiusOW9lVxuICAgICAgICByZWNoYXJnZVJlY29yZDpbXSxcbiAgICAgICAgLy8g5raI6LS56K6w5b2VXG4gICAgICAgIC8vIGNvbnN1bXB0aW9uUmVjb3JkOltdLFxuICAgICAgICAvLyDlrZDljaFcbiAgICAgICAgLy8gU3ViY2FyZDpbXSxcbiAgICAgICAgLy8g5oiR55qE5YiG5LqrXG4gICAgICAgIC8vIHNoYXJlQ2FyZDpbXSxcbiAgICAgICAgTWFza0hlaWdodDonJyxcbiAgICAgICAgU2VsZWN0SWNvbjpbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6MCxcbiAgICAgICAgICAgICAgICBjb2xvcjonI2ZmZDI3MCcsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+aciemZkCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6MSxcbiAgICAgICAgICAgICAgICBjb2xvcjonIzk2OTY5NicsXG4gICAgICAgICAgICAgICAgdGl0bGU6J+aXoOmZkCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGlucHV0SGlkZGVuOmZhbHNlLFxuICAgICAgICBpY29uV2hvOjAsXG4gICAgICAgIHVzZXJJbnB1dE51bV91cGRhdGU6Jy0xJyxcbiAgICAgICAgc2hhcmVCdG46JycsXG4gICAgICAgIGFtb3VudDonJyxcbiAgICAgICAgLy8gbm9TaGFyZUNhcmQ6dHJ1ZSxcbiAgICAgICAgbm9SZWNoYXJnZVJlY29yZDp0cnVlLFxuICAgICAgICAvLyBub0NvbnN1bXB0aW9uUmVjb3JkOnRydWUsXG4gICAgICAgIC8vIG5vU3ViY2FyZDp0cnVlLFxuICAgICAgICBpbmZvOm51bGwsXG4gICAgICAgIGNhcmRTaGFyZU51bWJlcjonJ1xuICAgIH07XG4gICAgLy/liIbkuqvkvJrlkZjljaFcbiAgICAvLyBnZXREYXRhKCl7XG4gICAgLy8gICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgLy8gICAgICAgICBudW06IHRoaXMudXNlcklucHV0TnVtX3VwZGF0ZSxcbiAgICAvLyAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuaW5mby5tZXJjaGFudF9pZFxuICAgIC8vICAgICB9O1xuICAgIC8vICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCsnYXBpL2RhdWdodGVyX2NhcmRzJyxcbiAgICAvLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIC8vICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JyxcbiAgICAvLyAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlbi5hY2Nlc3NfdG9rZW5cbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAvLyAgICAgICAgIHRoaXMuY2FyZFNoYXJlTnVtYmVyID0gcmVzLmRhdGEubWVzc2FnZTtcbiAgICAvLyAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIG9uU2hhcmVBcHBNZXNzYWdlIChyZXMpIHtcbiAgICAvLyAgICAgcmV0dXJuIHtcbiAgICAvLyAgICAgICAgIHRpdGxlOiAn6YCB5L2g5LiA5byg5YWN6LS56LSt5Lmw5ZWG5ZOB5Lya5ZGY5Y2h44CCJyxcbiAgICAvLyAgICAgICAgIHBhdGg6ICcvcGFja2FnZU1lbWJlcnNoaXBDYXJkL21lbWJlcnNoaXBDYXJkL2NhcmRTaGFyZT9udW1zPScrIHRoaXMuY2FyZFNoYXJlTnVtYmVyICsgJyZzaG9wSWQ9JyArIHRoaXMuaW5mby5tZXJjaGFudF9pZFxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIG5hdmJhclRhcChlKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhYiA9IGU7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIGJvdHRvbVNob3coKXtcbiAgICAgICAgLy8gICAgIHRoaXMuTWFzayA9ICF0aGlzLk1hc2tcbiAgICAgICAgLy8gfSxcbiAgICAgICAgc2VsZWN0SWNvbihlKXtcbiAgICAgICAgICAgIHRoaXMuU2VsZWN0SWNvbi5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGUgPT0gZWxlbWVudC5pZCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY29sb3IgPSAnI2ZmZDI3MCcgIFxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNvbG9yID0gJyM5Njk2OTYnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZighZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uV2hvID0gZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRIaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCkgIFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uV2hvID0gZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRIaWRkZW4gPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKSAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHNoYXJlQmVmb3JlKCl7XG4gICAgICAgIC8vICAgICB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuYW1vdW50ID09ICcwLjAwJyl7XG4gICAgICAgIC8vICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgdGl0bGU6ICfkvZnpop3kuI3otrMs6K+35YWF5YC8JyxcbiAgICAgICAgLy8gICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfWVsc2V7XG4gICAgICAgIC8vICAgICAgICAgLy8g5b2T6YCJ5oup4oCY5pyJ6ZmQ4oCZ5pe277yM55So5oi35piv5ZCm6L6T5YWl5qyh5pWwXG4gICAgICAgIC8vICAgICAgICAgaWYoIXRoaXMuaWNvbldobyl7ICAgICAgLy/pgInmi6nigJjmnInpmZDigJlcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoIXRoaXMudXNlcklucHV0TnVtX3VwZGF0ZSB8fCB0aGlzLnVzZXJJbnB1dE51bV91cGRhdGUgPD0gMCl7ICAgICAvL+acqui+k+WFpeasoeaVsFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeS8muWRmOWNoeS9v+eUqOasoeaVsCcsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgfWVsc2V7ICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnVzZXJJbnB1dE51bV91cGRhdGU9JzAnXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0sXG4gICAgICAgIGNhcmRSZWNoYXJnZSgpe1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiAnLi9jYXJkUmVjaGFyZ2U/aXRlbT0nICsgSlNPTi5zdHJpbmdpZnkodGhpcy5pbmZvKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIHJldm9rZVNoYXJlKGUpe1xuICAgICAgICAvLyAgICAgdGhpcy5yZXZva2VTaGFyZShlKVxuICAgICAgICAvLyB9LFxuICAgIH07XG4gICAgdXNlcklucHV0TnVtKGUpe1xuICAgICAgICB0aGlzLnVzZXJJbnB1dE51bV91cGRhdGUgPSBlLmRldGFpbC52YWx1ZVxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgICAgLy8gYWJsZWRTaGFyZSgpe1xuICAgICAgICAvLyAgICAgaWYodGhpcy5hbW91bnQgPT0gJzAuMDAnKXtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm5cbiAgICAgICAgLy8gICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgIGlmKCF0aGlzLmljb25XaG8peyAgICAgIC8v6YCJ5oup4oCY5pyJ6ZmQ4oCZXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKHRoaXMudXNlcklucHV0TnVtX3VwZGF0ZSAmJiB0aGlzLnVzZXJJbnB1dE51bV91cGRhdGUgPiAwKXsgICAgIC8v6L6T5YWl5qyh5pWwXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlQnRuID0nc2hhcmUnXG4gICAgICAgIC8vICAgICAgICAgICAgIH1lbHNleyAgICAgIC8v5pyq6L6T5YWl5qyh5pWwXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlQnRuID0nMCdcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNoYXJlQnRuID0nc2hhcmUnXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMudXNlcklucHV0TnVtX3VwZGF0ZSA9JzAnXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfTtcbiAgICB3YXRjaCA9IHtcbiAgICAgICAgY3VycmVudFRhYiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBpZihuZXdWYWx1ZSA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbWJlckNvc3RSZWNvcmQoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubWVtYmVyQ29zdFJlY29yZCgxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZSBpZihuZXdWYWx1ZSA9PSAgMil7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zb25DYXJkTGlzdHMoKVxuICAgICAgICAgICAgLy8gfWVsc2UgaWYgKG5ld1ZhbHVlID09IDMpe1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2hhcmVMaXN0KCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIHVzZXJJbnB1dE51bV91cGRhdGUoKXtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1jYXRjaChlcnIpe31cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgICAvL+iOt+WPluWVhuaIt2lkXG4gICAgICAgIHRoaXMuaW5mbyA9IEpTT04ucGFyc2Uob3B0aW9ucy5pbmZvKVxuICAgICAgICB0aGlzLmFtb3VudCA9IHRoaXMuaW5mby5iYWxhbmNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIHRoaXMubWVtYmVyQ29zdFJlY29yZCgpO1xuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuTWFza0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9O1xuICAgIC8v5LiL5ouJ5Yi35pawXG4gICAgb25QdWxsRG93blJlZnJlc2goKXt9XG4gICAgLy/ojrflj5bkvJrlkZjljaHph5Hpop1cbiAgICAvLyBnZXRDYXJkTW9uZXkoKXtcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS91c2VyX2NhcmQvJysgdGhpcy5pbmZvLm1lcmNoYW50X2lkLFxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAvLyAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UubW9uZXkgPSBOdW1iZXIocmVzLmRhdGEubWVzc2FnZS5tb25leS8xMDApLnRvRml4ZWQoMilcbiAgICAvLyAgICAgICAgIHRoaXMuYW1vdW50ID0gcmVzLmRhdGEubWVzc2FnZS5tb25leTtcbiAgICAvLyAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIOiOt+WPlueUqOaIt+WFheWAvOiusOW9lVxuICAgIC8vIHVzZXJSZWNoYXJnZSgpe1xuICAgIC8vICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgIC8vICAgICAgICAgdXJsOiBhcGkuYXBpTWFsbCsnYXBpL3JlY2hhcmdlX3JlY29yZHMnLFxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIG1lcmNoYW50X2lkOnRoaXMuaW5mby5tZXJjaGFudF9pZFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgLy8gICAgICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICAvLyAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAvLyAgICAgICAgICAgICBlbGVtZW50Lm1vbmV5ID0gTnVtYmVyKGVsZW1lbnQubW9uZXkvMTAwKS50b0ZpeGVkKDIpXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIHRoaXMucmVjaGFyZ2VSZWNvcmQgPSByZXMuZGF0YS5tZXNzYWdlXG4gICAgLy8gICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbiAgICAvL+a2iOi0ueiusOW9lVxuICAgIC8vIGNvbnN1bXB0aW9uKCl7XG4gICAgLy8gICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAvLyAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9nZXRfZXhwZW5zZXNfcmVjb3JkJyxcbiAgICAvLyAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgLy8gICAgICAgICBoZWFkZXI6e1xuICAgIC8vICAgICAgICAgICAgICdBY2NlcHQnOidhcHBsaWNhdGlvbi92bmQubGluZ21vLnYxK2pzb24nLFxuICAgIC8vICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzonQmVhcmVyICcgKyB0aGlzLnRva2VuLmFjY2Vzc190b2tlblxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIGRhdGE6IHtcbiAgICAvLyAgICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLmluZm8ubWVyY2hhbnRfaWRcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkudGhlbigocmVzKT0+e1xuICAgIC8vICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgIC8vICAgICAgICAgcmVzLmRhdGEubWVzc2FnZS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIC8vICAgICAgICAgICAgIGVsZW1lbnQubW9uZXkgPSBOdW1iZXIoZWxlbWVudC5tb25leS8xMDApLnRvRml4ZWQoMik7XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIHRoaXMuY29uc3VtcHRpb25SZWNvcmQgPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgIC8vICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgLy8g6I635Y+W5YWF5YC85raI6LS56K6w5b2VXG4gICAgbWVtYmVyQ29zdFJlY29yZCh0eXBlKXtcbiAgICAgICAgbGV0IHVybCA9IHJlcXVlc3RVcmwubWVtYmVyQ29zdFJlY29yZDtcbiAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICBwX2lkIDogd2VweS4kaW5zdGFuY2UuZ2xvYmFsRGF0YS5wX2lkLFxuICAgICAgICAgICAgbV9pZCA6IHRoaXMuaW5mby5tX2lkLFxuICAgICAgICAgICAgbWVpZCA6IHRoaXMuaW5mby5tZWlkLFxuICAgICAgICAgICAgdHlwZSA6IHR5cGUgfHwgMCAvLzAt5YWF5YC86K6w5b2VIDEt5raI6LS56K6w5b2VIDIt5YWo6YOoXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdERhdGEodXJsLFwiUE9TVFwiLGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhLlJlY29kZXMpXG4gICAgICAgICAgICBpZighcmVzLmRhdGEuZGF0YS5SZWNvZGVzLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgdGhpcy5ub1JlY2hhcmdlUmVjb3JkID0gZmFsc2VcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoaXMubm9SZWNoYXJnZVJlY29yZCA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VSZWNvcmQgPSByZXMuZGF0YS5kYXRhLlJlY29kZXNcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8g6I635Y+W55So5oi35a2Q5Y2h5YiX6KGoXG4gICAgLy8gc29uQ2FyZExpc3RzKCl7XG4gICAgLy8gICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAvLyAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9kYXVnaHRlcl9jYXJkcycsXG4gICAgLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIHR5cGU6MSwgICAgICAvL3R5cGU9MSDmmK/pooblj5bnmoTlrZDljaEgdHlwZT0y5piv5Yir5Lq65YiG5Lqr55qE5a2Q5Y2hXG4gICAgLy8gICAgICAgICAgICAgbWVyY2hhbnRfaWQ6dGhpcy5pbmZvLm1lcmNoYW50X2lkXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgICAgaGVhZGVyOntcbiAgICAvLyAgICAgICAgICAgICAnQWNjZXB0JzonYXBwbGljYXRpb24vdm5kLmxpbmdtby52MStqc29uJyxcbiAgICAvLyAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6J0JlYXJlciAnICsgdGhpcy50b2tlbi5hY2Nlc3NfdG9rZW5cbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAvLyAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAvLyAgICAgICAgIHJlcy5kYXRhLm1lc3NhZ2UuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAvLyAgICAgICAgICAgICBlbGVtZW50LmFtb3VudCA9IE51bWJlcihlbGVtZW50LmFtb3VudC8xMDApLnRvRml4ZWQoMilcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgdGhpcy5TdWJjYXJkID0gcmVzLmRhdGEubWVzc2FnZVxuICAgIC8vICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgLy8g5oiR55qE5YiG5Lqr5YiX6KGoXG4gICAgLy8gc2hhcmVMaXN0KCl7XG4gICAgLy8gICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAvLyAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9kYXVnaHRlcl9jYXJkcycsXG4gICAgLy8gICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIC8vICAgICAgICAgZGF0YToge1xuICAgIC8vICAgICAgICAgICAgIHR5cGU6MixcbiAgICAvLyAgICAgICAgICAgICBtZXJjaGFudF9pZDp0aGlzLmluZm8ubWVyY2hhbnRfaWQgICAgIFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAvLyAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy5kYXRhLmRhdGEpXG4gICAgLy8gICAgICAgICByZXMuZGF0YS5tZXNzYWdlLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgLy8gICAgICAgICAgICAgZWxlbWVudC5hbW91bnQgPSBOdW1iZXIoZWxlbWVudC5hbW91bnQvMTAwKS50b0ZpeGVkKClcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgdGhpcy5zaGFyZUNhcmQgPSByZXMuZGF0YS5tZXNzYWdlO1xuICAgIC8vICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgLy8g5pKk5Zue5YiG5Lqr5Y2hXG4gICAgLy8gcmV2b2tlU2hhcmUoc3ViY2FyZElkKXtcbiAgICAvLyAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAvLyAgICAgICAgIHVybDogYXBpLmFwaU1hbGwrJ2FwaS9kYXVnaHRlcl9jYXJkcy8nICsgc3ViY2FyZElkLFxuICAgIC8vICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAvLyAgICAgICAgIGhlYWRlcjp7XG4gICAgLy8gICAgICAgICAgICAgJ0FjY2VwdCc6J2FwcGxpY2F0aW9uL3ZuZC5saW5nbW8udjEranNvbicsXG4gICAgLy8gICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOidCZWFyZXIgJyArIHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuXG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgLy8gICAgICAgICBpZihyZXMuZGF0YS5zdGF0dXMgPT0gMjAwKXtcbiAgICAvLyAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgIC8vICAgICAgICAgICAgICAgICB0aXRsZTogJ+aSpOWNoeaIkOWKnycsXG4gICAgLy8gICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZUxpc3QoKVxuICAgIC8vICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbn1cbiJdfQ==