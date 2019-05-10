import api from '../api/api'
//找出餐饮单品总价最低的
function getLowPrice(orderGoods){
  let priceArray = [];
  orderGoods.forEach((item,index)=>{
    priceArray.push({
      id:item.id,
      money:(Number(item.foodNum)*(item.price))
    })
  })
  return priceArray;
  // return Math.min.apply(null, priceArray)
}
//找出电商单品总价最低的
function getELowPrice(orderGoods){
  let priceArray = [];
  orderGoods.forEach((item,index)=>{
    priceArray.push({
      id:item.good_id?item.good_id:item.id,
      money:(Number(item.quantity)*(item.price))
    })
  })
  return priceArray;
  // orderGoods.forEach((item,index)=>{
  //   priceArray.push((Number(item.quantity)*(item.price)).toFixed(2))
  // })
  // return Math.min.apply(null, priceArray)
}
/*获取当前页url*/
function getCurrentPageUrl(){
  let pages = getCurrentPages()               //获取加载的页面
  let currentPage = pages[pages.length-1]     //获取当前页面的对象
  let url = currentPage.route                 //当前页面url
  return url
}
//将时间戳转换成日期格式
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  // var h = date.getHours() + ':';
  // var m = date.getMinutes() + ':';
  // var s = date.getSeconds();
  // return Y+M+D+h+'00';
  return Y+M+D;
}
function formatDate(time) {
  var datetime = new Date(time); 
  var day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate(),
  hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours(),
  min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes(),
  sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
  return day + ':' + hour + ':' + min + ':' + sec;
}
//返回当前时间
function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  //keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  keep = h;
  return keep; //20160614134947
}
//待支付页面需要的时间
function waitToPayGetCurrentTime() {
  var keep = '';
  var date = new Date();
  console.log(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
  return keep; //20160614134947
}
// 生成随机数
function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start);
}
//字符串截取
function sliceStr(str){
  var strDone = str.slice(0,10);
  if(strDone.length < 16){
    strDone = strDone;
  }else{
    strDone = strDone + '...';
  }
  return strDone;
}
// 保留两位小数
function keepTwoDecimalFull(num) {
  var result = parseFloat(num);
  if (isNaN(result)) {
    return false;
  }
  result = Math.round(num * 100) / 100;
  var s_x = result.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + 2) {
    s_x += '0';
  }
  return s_x;
}

function objLength(input) {
  var type = toString(input);
  var length = 0;
  if (type != "[object Object]") {
    //throw "输入必须为对象{}！"
  } else {
    for (var key in input) {
      if (key != "number") {
        length++;
      }
    }
  }
  return length;
}
//验证是否是手机号码
function vailPhone(number) {
  let flag = false;
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (number.length != 11) {
    flag = flag;
  }else if (!myreg.test(number)) {
    flag = flag;
  }else{
    flag = true;
  }
  return flag;
}
//验证是否西班牙手机(6开头 9位数)
function ifSpanish(number) {
  let flag = false;
  let myreg = /^([6|7|9]{1}(\d+){8})$/;
  if (number.length != 9) {
    flag = flag;
  } else if (!myreg.test(number)) {
    flag = flag;
  } else {
    flag = true;
  }
  return flag;
}
//浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
//浮点型加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//浮点型乘法
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = "";
  for (var name in obj) {
    names += name + obj[name];
  }
  return names;
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
//去除所有:
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}
//转换星星分数
function convertStarArray(score) {
  //1 全星,0 空星,2半星
  var arr = []
  for (var i = 1; i <= 5; i++) {
    if (score >= i) {
      arr.push(1)
    } else if (score > i-1 && score < i + 1) {
      arr.push(2)
    } else {
      arr.push(0)
    }
  }
  return arr;
}
function timePoint(){
  var timestamp=new Date().getTime();
  return timestamp;
}
// 添加时效性缓存
// function putStorage(k, v, t) {
//   wx.setStorageSync(k, v)
//   var seconds = parseInt(t);
//   if (seconds > 0) {
//     var timestamp = Date.parse(new Date());
//     timestamp = timestamp / 1000 + seconds;
//     wx.setStorageSync(k + dtime, timestamp + "")
//   } else {
//     wx.removeStorageSync(k + dtime)
//   }
// }

//获取时效性缓存
// function getStorage(k, def) {
//   var deadtime = parseInt(wx.getStorageSync(k + dtime))
//   if (deadtime) {
//     if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
//       if (def) { return def; } else { return; }
//     }
//   }
//   var res = wx.getStorageSync(k);
//   if (res) {
//     return res;
//   } else {
//     return def;
//   }
// }
module.exports = {
  getCurrentTime: getCurrentTime,
  objLength: objLength,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  ifSpanish: ifSpanish,
  div: div,
  mul: mul,
  accAdd: accAdd,
  convertStarArray: convertStarArray,
  rnd:rnd,
  sliceStr:sliceStr,
  keepTwoDecimalFull:keepTwoDecimalFull,
  waitToPayGetCurrentTime:waitToPayGetCurrentTime,
  timePoint:timePoint,
  formatDate:formatDate,
  getCurrentPageUrl:getCurrentPageUrl,
  timestampToTime:timestampToTime,
  getLowPrice:getLowPrice,
  getELowPrice:getELowPrice
}
