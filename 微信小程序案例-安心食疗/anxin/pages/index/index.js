// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],  //顶部banner轮播图数据
    currentIndex:0, //顶部banner轮播图当前index
    listData:[],  //底部推荐内容数据
  },

  /**
   * 顶部banner轮播图currentIndex改变事件
   */
  currentChange:function (e) {
    this.setData({
      currentIndex:e.detail.current
    })
  },

  /**
   * goDetail方法：点击推荐列表跳转到对应的详情页
   */
  goDetail: function (e) {
    wx.navigateTo({
      url: '../indexDetail/indexDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 提示“数据正在加载”
    wx.showLoading({
      title: '数据拼命加载中',
    })
    // 获取顶部banner轮播图数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/banner',
      success: res => {
        wx.hideLoading();
        wx.showToast({
          title: '数据加载完毕',
          duration: 1000,
        });
        if (res.data.status == 200) {
          this.setData({
            bannerList:res.data.data
          });
        }
      }
    })
    //获取底部推荐内容数据
    wx.request({
      url: 'http://iwenwiki.com:3002/api/indexlist',
      success: res => {
        if (res.data.status == 200) {
          this.setData({
            listData:res.data.data
          })
        }
      }
    })
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