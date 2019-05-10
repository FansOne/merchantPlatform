import wepy from 'wepy'
import api from '../api/api'
import util from '../utils/util'
//判断登录
function is_login(){
    let that = this;
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    let user = wx.getStorageSync('access_token');
    if(user.expires_in>timestamp){
        return;
    }else{
        that.login();
    } 
}

//单点登录
function login() {
    wx.getStorage({
        key:'userInfoLogin',
        success:res=>{
            let user = res.data;
            wx.login({
                //获取code
                success:res=>{
                    wx.request({
                        url: 'https://sso.qumatou.com.cn/' +'api/mini_login',
                        method:'POST',
                        dataType:'json',
                        data: {
                            code:res.code,
                            app_id:'wx6231963e0a53c6dd',
                            iv:user.iv,
                            encryptData:user.encryptedData,
                            grant_type:'client_plat_credentials'
                        },
                        header: {                                                                                                                                                                       
                            'Accept': 'application/vnd.sso.v1+json',
                            // 'SandBox' : true
                        },
                        success: function(res) {
                            let status_code=res.statusCode;
                            if(status_code!=200){
                                wx.showToast({title: '登录失败', icon: 'none', duration: 2000});
                                wx.removeStorageSync('access_token');
                            }else{
                                let timestamp = Date.parse(new Date());
                                timestamp = timestamp / 1000 + res.data.expires_in;
                                let access_token = {'access_token':res.data.access_token,'expires_in':timestamp};
                                wx.showToast({title: '登录成功', icon: 'success', duration: 2000});
                                wx.setStorage({
                                    key:'access_token', 
                                    data:access_token,
                                });
                                wx.setStorage({
                                    key:'userId', 
                                    data:res.data.message,
                                });
                            }
                        }
                    });
                }
            })
        },
        fail:res=>{}
    })    
}
//判断该页面是否需要跳转登录
function is_skip(skipUrl){
    wx.getStorage({
        key:'pagesUrl',
        success:res=>{
            res.data.forEach((item,index)=>{
                if(item.url == util.getCurrentPageUrl()){
                    wx.getStorage({
                        key:'access_token',
                        success:res=>{},
                        fail:res=>{
                            //缓存里面没有access_token,跳转登录页面
                            wx.navigateTo({
                                url:skipUrl
                            })
                        }
                    })
                }
            })
        }
    })
}
//公共方法将商户添加到最近使用
function is_renctly_use(id){
    //判断是否通过扫码进来的
    if(id){
        let token = wx.getStorageSync('access_token').access_token;
        //id存在[通过扫码进来的]
        wepy.request({
            url: api.apiMall + 'api/store_use',
            method: 'POST',
            header:{
                'Accept':'application/vnd.lingmo.v1+json',
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                'Authorization':'Bearer ' + token
            },
            data: {
                m_id:id
            },
        }).then(res=>{})
    }
}

module.exports = {
    is_login:is_login,
    login:login,
    is_skip:is_skip,
    is_renctly_use:is_renctly_use
}