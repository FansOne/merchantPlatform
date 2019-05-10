import wepy from 'wepy';

// 数据请求
const requestData = (url,method = 'GET',data = {})=>{
    return wepy.request({
        url: url,
        method: method,
        data: data
      }).catch(()=>{
        wx.showToast({
          title: '请求服务器数据异常',
          icon: 'none',
          duration: 1500,
          success: ()=>{
            setTimeout(() => {
              wx.navigateBack({
                delta: -1
              });
            }, 1500);
          }
        });
      });
}

module.exports = {
    requestData
}