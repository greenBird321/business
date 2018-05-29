// pages/theme/theme.js
import { Theme } from '../theme/theme-model.js'

var themeModel = new Theme

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var themeid = options.themeid
    var themeName = options.themename

    this.data.id = themeid
    this.data.name = themeName

    this._loadData()
   
  },

  /**
   *  设置导航栏的标题，需要设置在onReady 函数中
   *  监听页面初次渲染完成
   */
  onReady: function (){
    // 动态修改navigationBar的标题 
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  },

  /**
   * 监听页面显示
   */
  onShow: function(){

  },

  _loadData: function (){
    themeModel.getThemeData(this.data.id, (res) => {
      this.setData({
        'themesArray': res
      })
    })
  },

  /**
   * 点击商品触发
   */
  onProductsItemTap: function(event){
    var id = themeModel.getDataSet(event, 'id')
    var name = themeModel.getDataSet(event, 'name')

    wx.navigateTo({
      url: '../product/product?id=' + id + '&name=' + name,
    })
  }
})