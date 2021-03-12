/**
 * 网络请求封装方法：
 *    参数：params（object） 网络请求的参数
 *      params:{
 *        method:string 请求的方法 默认为get,
 *        url:string [必填] 请求的url地址 已设置统一域名 提供端口地址即可,
 *        data:object 请求时携带的参数,
 *        success:function 请求成功的回调函数,
 *        fail:function 请求失败的回调函数,
 *        msg:string 提示“数据正在加载中”的弹框内容 默认为“数据正在加载中”
 *      }
 */

function http(params) {
  var msg = params.msg || "数据正在加载中";
  wx.showLoading({
    title: msg,
  });
  wx.request({
    url: "http://iwenwiki.com:3002/" + params.url,
    method: params.method || "GET",
    data: params.data,
    success: res => {
      params.success(res.data);
    },
    fail: res => {
      params.fail(res.data);
    },
    complete: res => {
      wx.hideLoading();
    }
  })
}

module.exports = http;