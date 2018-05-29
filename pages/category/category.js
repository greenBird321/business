// pages/category/category.js
import { Category } from 'category-model.js'

var categoryModel = new Category

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'currentMenuIndex': 0,
    'categoryArray': {},
    'categoryProduct': {},
    'loadedData': {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData()
  },

  onReady: function(){

  },

  /**
   * 页面隐藏时候调用 重置数据
   */
  onHide: function() {
    this.setData({
      'loadedData': {}
    })
  },

  _loadData: function(){
    categoryModel.getCategoryData((categoryData) => {
      this.setData({
        'categoryArray': categoryData
      })

      // 一定要在回调中在进行分类详情方法的调用， 保证所有分类数据肯定能拿到 
      // TODO 由于小程序获取回调是异步，所以要这么做
      categoryModel.getProductsByCategory(this.data.categoryArray[this.data.currentMenuIndex].id, (categoryProductData) => {
        // 数据组装成对象
        var productData = {
          'title': this.data.categoryArray[this.data.currentMenuIndex].name,
          'head_img': this.data.categoryArray[this.data.currentMenuIndex].img.url,
          'time': new Date().getTime(),
          'products': categoryProductData,
        }
        // setData() 对 data 下的 对象赋值 需要把 赋值的 属性用变量包起来 在使用的使用 写在 [] 中 
        // 直接赋值并不会 进行脏数据检查，而且还不会立刻同步数据
        var data = "loadedData[0]"

        this.setData({
          'categoryProduct': productData,
          [data]: productData
        })
      })
    })
  },

  /**
   * 切换左侧 侧边栏
   */
  changeCategory: function(event){
    // 获取categoryid
    var categoryid = categoryModel.getDataSet(event, 'id')

    // 点击了那个Item
    var index = categoryModel.getDataSet(event, 'index')

    this.setData({
      'currentMenuIndex': index
    })

    //获取分类下的产品信息 检测时间
    if (!this.isLoadedData(index)){
      categoryModel.getProductsByCategory(categoryid, (productData) => {
        var productInfo = {
          'title': this.data.categoryArray[index].name,
          'head_img': this.data.categoryArray[index].img.url,
          'time': new Date().getTime(),
          'products': productData
        }
        var tamp = "loadedData["+index+"]"

        this.setData({
          'categoryProduct': productInfo,
          [tamp]: productInfo
        })

      })
    } else {
      // 如果 查到 数据 
      this.setData({
        'categoryProduct': this.data.loadedData[index]
      })
    }
  },

  /**
   * 点击分类下的商品触发方法
   */
  onProductsItemTap:function(event){
    var id = categoryModel.getDataSet(event, 'id')
    var name = categoryModel.getDataSet(event, 'name')
    wx.navigateTo({
      url: '../product/product?id=' + id + "&name=" + name,
    })
  },

  /**
   * 判断当前分类商品数据是否已经加载过
   */
  isLoadedData: function(index){
    if (this.data.loadedData[index]){
      return true
    }
    return false
  }
})