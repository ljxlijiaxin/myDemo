// pages/about/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBtn:true, //是否显示登陆按钮
    userinfo:{},  //用户信息
  },

  /**
   * 点击按钮，通过回调函数获取用户信息
   */
  getUserInfo:function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      showBtn:false,
      userinfo:e.detail.userInfo
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        showBtn:false,
        userinfo:app.globalData.userInfo
      });
    }else{
      app.userInfoReadyCallback = res => {
        this.setData({
          showBtn:false,
          userinfo:res.userInfo
        });
      };
    }
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