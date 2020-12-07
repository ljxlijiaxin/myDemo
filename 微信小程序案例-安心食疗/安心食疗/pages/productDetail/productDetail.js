// pages/productDetail/productDetail.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productData:{}, //商品详情展示数据
  },

  /**
   * 底部按钮跳转购物车
   */
  goShopCar:function () {
    wx.switchTab({
      url: '../shopCar/shopCar'
    });
  },

  /**
   * 底部按钮-加入购物车-点击事件
   */
  addShopCar:function () {
    var productData = this.data.productData;
    http({
      method:"get",
      url:"api/cart/add",
      data:{
        name: productData.name,
        pic: productData.pic,
        num: 1,
        info: productData.description,
        price: productData.price
      },
      msg:'正在添加商品…',
      success:res => {
        if (res.status == 200) {
          wx.showToast({
            title: '添加成功！在购物车等您哟！',
            icon:"none",
            duration: 2000
          });
        }
      },
      fail:res => {
        console.log(res);
      }
    })
  },

  /**
   * 底部按钮-立即购买-点击事件
   */
  goPay:function () {
    wx.showToast({
      title: '该功能尚在开发中，敬请期待！',
      icon:"none"
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http({
      method:"get",
      url:"api/foods/list/detail",
      data:{
        id:options.id
      },
      success: res => {
        if (res.status == 200) {
          this.setData({
            productData: res.data[0]
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