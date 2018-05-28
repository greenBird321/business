// pages/product/product.js
import { Product } from 'product-model.js'

var productModel = new Product

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: null,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    tabsData: ['商品详情', '产品参数', '售后保障'],
    currentTabsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id
      var name = options.name
      
      this.data.id = id
      this.data.name = name

      this._LoadData()
  },

  /**
   *  页面初次渲染完成
   */
  onReady: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
  },

  /**
   * 这样的方法代表的是 设置对象方法
   *  _LoadData: function(){
   * 
   * }
   * 这样的方式代表定义函数
   * _LoadData(){
   * 
   * }
   */
  _LoadData: function(){
    productModel.getProductData(this.data.id, (res) => {
      console.log(res)
        this.setData({
          'product': res
        })
    })
  },

  /**
   * 获取用户当前选择的个数
   */
  bindPickerChange: function(event){
    var index = event.detail.value
    this.setData({
      'productCount': this.data.countsArray[index]
    })
  },

  /**
   * 点击 tabs 触发函数
   */
  onTabsItemTap: function(event){
    this.setData({
      'currentTabsIndex': productModel.getDataSet(event, 'index')
    })
  }
})