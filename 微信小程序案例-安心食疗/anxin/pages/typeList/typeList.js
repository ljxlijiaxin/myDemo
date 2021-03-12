// pages/typeList/typeList.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],  //分类产品列表信息
  },

  /**
   * 点击商品列表项进入详情页
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + e.currentTarget.dataset.id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http({
      url:"api/foods/list/type",
      method:"get",
      data:{
        type:options.type
      },
      success: res => {
        if (res.status == 200) {
          this.setData({
            listData:res.data
          });
          wx.showToast({
            title: '数据加载完毕',
            duration:1000
          });
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