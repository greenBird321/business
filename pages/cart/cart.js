// pages/cart/cart.js
import { Cart } from 'cart-model.js' 

var cartModel = new Cart

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载 只会执行1次 在切换tab栏的时候 不会触发
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示 可能会执行多次，在切换tab栏的时候 会触发
   */
  onShow: function () {
    var cartData = cartModel.getCartDataFromLocal()
    //var countInfo = cartModel.getCartTotalCounts(true)
    var selectedProducts = this._calcTotalAccountAndCounts(cartData)
    this.setData({
      'selectedCounts': selectedProducts.selectedCounts,
      'account': selectedProducts.selectedTotalPrice,
      'selectTypeCounts': selectedProducts.selectTypeCounts, 
      'cartData': cartData
    })
    
  },

  _calcTotalAccountAndCounts: function (cartData){
    // 选择商品的总价格
    var selectedTotalPrice = 0
    // 选择商品的总个数
    var selectedCounts = 0
    //TODO 选择商品的种类 (目前不知道做啥的) 
    var selectTypeCounts = 0

    // 常量 为了避免js 浮点数运算的 误差
    let multiple = 100
    for(var i = 0; i < cartData.length; i++){
      if (cartData[i].selectStatus){
        selectedTotalPrice += Number(cartData[i].price) * multiple * cartData[i].counts * multiple
        selectedCounts += cartData[i].counts
        selectedCounts++ 
      }
    }
    return {
      'selectedCounts': selectedCounts,
      'selectedTotalPrice': selectedTotalPrice / (multiple * multiple),
      'selectTypeCounts': selectTypeCounts
    }
  }
})