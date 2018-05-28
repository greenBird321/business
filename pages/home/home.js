// pages/home/home.js
import { Home } from 'home-model.js'

var home = new Home()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function() {
    this._loadData()
  },

  _loadData: function() {
    var id = 1
    // ES6 为了简化 异步的回调函数，增加 => 箭头函数，此函数可以不定义 回调函数 便可直接使用
    home.getBannerData(id, (res) => {
        // 数据绑定
        this.setData({
          'bannerArray': res
        })
    })

    var ids = [1,2,3,4,5,6]
    home.getThemeData(ids, (res) => {
      this.setData({
        'themeArray': res
      })
    })

    home.getRecentData((res) => {
      this.setData({
        'productsArray': res
      })
    })
  },

  /**
   * 点击商品跳转到商品详情页面
   */
  onProductsItemTap:function(event) {
    // 获取点击传递过来的banner所对应的产品id
    var id = home.getDataSet(event,'id')
    var name = home.getDataSet(event, 'name')

    // 页面跳转 跳转的是相对路径 目录/wxml名称
    wx.navigateTo({
      url: '../product/product?id=' + id + '&name=' + name,
    })
  },

  /**
   * 点击专题跳转到专题页面
   */
  onThemesItemTap:function(event){
    var themeid = home.getDataSet(event, 'themeid')
    var themeName = home.getDataSet(event, 'themename')

      wx.navigateTo({
        url: '../theme/theme?themeid=' + themeid + '&themename=' + themeName,
      })
  }
  /**
   *  异步回调 不能用 var data = 这种方式获取， 只能通过异步回调的方法获取结果
   */
  // callBack: function (res) {
  //   console.log(res)
  // }
})