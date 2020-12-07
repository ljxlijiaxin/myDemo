// pages/eat/eat.js
var typeData = require("../../utils/foodTypeData.js");
var http = require("../../utils/http.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"北京",  //用户所在城市
    typeData: typeData,  //产品类型数据
    list:[],  //产品列表数据
    page:1,   //产品列表数据页码
    noMore:false, //显示“没有更多数据”提示
  },

  /**
   * 点击产品类型进入对应分类的产品列表页
   */
  goType: function (e) {
    wx.navigateTo({
      url: '../typeList/typeList?type=' + e.currentTarget.dataset.type,
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
    var city = wx.getStorageSync('city') || app.globalData.city || "北京";
    this.setData({
      city: city,
      page: 1,
      list: [],
      noMore:false
    });
    http({
      method:"get",
      url:"api/foods/list",
      data:{
        city:this.data.city,
        page:this.data.page
      },
      success: res => {
        if (res.status == 200) {
          this.setData({
            list:res.data.result
          });
          wx.showToast({
            title: '数据加载完毕',
            duration:1000
          })
        }
      },
      fail: res => {
        console.log(res);
      }
    });
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
    // 上拉触底加载更多数据
    if (!this.data.noMore) {
      this.data.page++;
      http({
        method:"get",
        url:"api/foods/list",
        data:{
          city:"北京",
          page:this.data.page
        },
        success: res => {
          if (res.status == 200) {
            this.setData({
              list:this.data.list.concat(res.data.result)
            });
            wx.showToast({
              title: '数据加载完毕',
              duration:1000
            })
          }else{
            this.setData({
              noMore:true
            });
          }
        },
        fail: res => {
          console.log(res);
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})