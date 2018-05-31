// pages/product/product.js
import { Product } from 'product-model.js'
import { Cart } from '../../pages/cart/cart-model.js'

var productModel = new Product
var cartModel = new Cart

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: null,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCount:1,
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
        this.setData({
          'cartTotalCounts': cartModel.getCartTotalCounts(),
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
  },

  /**
   * 添加购物车方法
   */
  onAddingToCartTap: function(event){
    this.addToCart()
    this.setData({
      'cartTotalCounts': cartModel.getCartTotalCounts()
    })
  },
  

  addToCart:function(){
      var tempObj = {}
      var keys = ['id', 'name', 'main_img_url', 'price']
      // for(var key in xxxxx) 这个key 相当于 for(i=0;i<array.length; i++)中的i
      for (var key in this.data.product){
        // indexOf 在数组中查找某个元素
        if (keys.indexOf(key) >= 0){
          tempObj[key] = this.data.product[key]
        }
      }
      cartModel.add(tempObj, this.data.productCount)
  }
})