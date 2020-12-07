// pages/shopCar/shopCar.js
var http = require("../../utils/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],  //购物车的商品列表
    allSelected:false,  //是否全选
    canBuy:false, //能否进行结算（是否有选中的商品）
    index:0,  //手指滑动商品的下标
    startX:0, //手指开始滑动时所处位置的X坐标
    num:0,  //选中商品项的个数
    sum:"0.00",  //选中的商品总价
  },

  /**
   * 获取购物车数据
   */
  getCarData: function () {
    http({
      url:"api/cart/list",
      method:"get",
      success:res => {
        if (res.status == 200) {
          var num = 0,
            canBuy = this.data.canBuy,
            list = res.data.result;
          if (this.data.allSelected) {
            for (let i = 0; i < list.length; i++) {
              list[i].selected = true;
            }
          }
          for (let j = 0; j < list.length; j++) {
            if (list[j].selected) {
              num++;
            }
          }
          if (num > 0) {
            canBuy = true;
          }else{
            canBuy = false;
          }
          this.setData({
            list: list,
            num:num,
            canBuy:canBuy
          });
          this.getSum();
        }
      },
      fail:res => {
        console.log(res);
      }
    });
  },

  /**
   * 手指开始滑动事件-获取开始滑动时的位置
   */
  touchstart:function (e) {
    this.setData({
      index:e.currentTarget.dataset.index,
      startX:e.changedTouches[0].clientX
    });
  },

  /**
   * 手指滑动事件-获取手指滑动的实时位置
   */
  touchmove:function (e) {
    var index = this.data.index,
      list = this.data.list,
      startX = this.data.startX,
      moveX = e.changedTouches[0].clientX;
    if (moveX < startX) {
      // 手指左滑-显示删除按钮（同时隐藏其他商品项的删除按钮）
      for (let i = 0; i < list.length; i++) {
        list[i].showDel = false;
      }
      list[index].showDel = true;
    }else{
      // 手指右滑-隐藏删除按钮
      list[index].showDel = false;
    }
    this.setData({
      list:list
    });
  },

  /**
   * 计算选中的商品总价
   */
  getSum: function () {
    var list = this.data.list,
      sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected) {
        sum += list[i].price * list[i].num;
      }
    }
    this.setData({
      sum:sum.toFixed(2)
    });
  },

  /**
   * 选择或取消选择某项商品
   */
  selected:function (e) {
    var list = this.data.list,
      num = this.data.num,
      canBuy = this.data.canBuy,
      allSelected = this.data.allSelected,
      index = e.currentTarget.dataset.index;
    if (list[index].selected) {
      list[index].selected = false;
      num--;
    }else{
      list[index].selected = true;
      num++;
    }
    if (num > 0) {
      canBuy = true;
    }else{
      canBuy = false;
    }
    if (num == list.length) {
      allSelected = true;
    }else{
      allSelected = false;
    }
    this.setData({
      list:list,
      canBuy:canBuy,
      num:num,
      allSelected:allSelected
    });
    this.getSum();
  },

  /**
   * 修改购物车中的商品数量
   */
  numUpdate:function (e) {
    var list = this.data.list,
      index = e.currentTarget.dataset.index,
      change = e.currentTarget.dataset.change;
    var n = list[index].num + change;
    if (n < 1) {
      wx.showToast({
        title: '该商品不能再减少了',
        icon:'none'
      });
    }else{
      // 修改商品数量
      list[index].num = n;
      this.setData({
        list:list
      });
      this.getSum();
      http({
        method:"get",
        url:"api/cart/update",
        data:{
          id:e.currentTarget.dataset.id,
          num:n
        },
        msg:"修改中……",
        success:res => {},
        fail:res => {
          console.log(res);
        }
      });
    }
  },

  /**
   * 删除购物车中的商品
   */
  delete:function (e) {
    wx.showModal({
      title:"提示",
      content:"是否确定将此商品从购物车中移除？",
      confirmColor:"#ff0000",
      success:res => {
        if (res.confirm) {
          // 用户点击“确定”按钮，确认删除商品
          http({
            method:"get",
            url:"api/cart/delete",
            data:{
              id:e.currentTarget.dataset.id
            },
            msg:"正在删除…",
            success:res => {
              if (res.status == 200) {
                this.getCarData();
                wx.showToast({
                  title: '删除成功！',
                  icon:"none"
                });
              }
            },
            fail:res => {
              console.log(res);
            }
          });
        }
      }
    });
    
  },

  /**
   * 底部全选按钮点击事件
   */
  selectedAll:function () {
    var allSelected = !this.data.allSelected,
      list = this.data.list,
      num = this.data.num,
      canBuy = this.data.canBuy;
    if (allSelected) {
      num = list.length;
      canBuy = true;
      for (let i = 0; i < list.length; i++) {
        list[i].selected = true;
      }
    }else{
      num = 0;
      canBuy = false;
      for (let i = 0; i < list.length; i++) {
        list[i].selected = false;
      }
    }
    this.setData({
      num:num,
      canBuy:canBuy,
      list:list,
      allSelected
    });
    this.getSum();
  },

  /**
   * 底部结算按钮点击事件
   */
  goPay:function () {
    if (this.data.canBuy) {
      wx.showToast({
        title: '该功能尚在开发中，敬请期待！',
        icon:"none"
      });
    }
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
    this.getCarData();
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