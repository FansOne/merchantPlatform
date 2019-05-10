import wepy from 'wepy';

// 单条数据请求
const requestData = (url,method = 'GET',data = {})=>{
    return wepy.request({
        url: `${url}`,
        method: method,
        data: data
    });
}

module.exports = {
    requestData
}