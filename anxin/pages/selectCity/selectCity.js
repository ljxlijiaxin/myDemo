// pages/selectCity/selectCity.js
var http = require("../../utils/http.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity:[], //热门城市列表
    longitude: 113.324520,  //经度
    latitude: 23.099994,    //纬度
  },

  /**
   * 获取当前所在地定位
   */
  getLocation: function () {
    wx.getLocation({
      success: res => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        // api/lbs/location
        http({
          url:"api/lbs/location",
          method:"get",
          data:{
            longitude: res.longitude,
            latitude: res.latitude
          },
          success: res => {
            if (res.result.ad_info) {
              var city = res.result.ad_info.city.slice(0,2);
              app.globalData.city = city;
              wx.setStorageSync("city",city);
              wx.navigateBack({});
            }
          },
          fail: res => {
            console.log(res);
          }
        })
      },
      fail: res => {
        console.log(res);
      }
    });
  },

  /**
   * 定位到所选择的热门城市
   */
  getHotCity: function (e) {
    app.globalData.city = e.currentTarget.dataset.city;
    wx.setStorageSync("city",e.currentTarget.dataset.city);
    wx.navigateBack({});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http({
      method:"GET",
      url:"api/hot/city",
      success: res => {
        if (res.status == 200) {
          this.setData({
            hotCity:res.data
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})