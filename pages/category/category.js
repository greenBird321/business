// pages/category/category.js
import { Category } from 'category-model.js'

var categoryModel = new Category

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
    this._loadData()
  },

  _loadData: function(){
    categoryModel.getCategoryData((data) => {
      this.setData({
        'categoryArray': data
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

    // 如果首次进入此页面
    if(this.isLoadeData(index)){
      console.log(this)
    }
  },

  /**
   * 判断是否加载了currentMenuIndex属性
   */
  isLoadeData:function(index){

  }
})