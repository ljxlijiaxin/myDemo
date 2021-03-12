// pages/search/search.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],  //搜索到的数据
  },

  /**
   * 搜索栏中进行输入时，同步将搜索到的结果以列表的形式展示在下方
   */
  goSearch: function(e) {
    http({
      method:"get",
      url:"api/foods/select",
      data:{
        name: e.detail.value,
        city: wx.getStorageSync('city') || "北京"
      },
      success: res => {
        if (res.status == 200) {
          this.setData({
            data: res.data
          });
        }else{
          this.setData({
            data: []
          });
        }
      },
      fail: res => {
        console.log(res);
      }
    });
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