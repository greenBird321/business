import { Base } from '../../utils/base.js'

class Category extends Base {
  constructor(){
    super()
  }

  /**
   * 获取全部分类数据
   */
  getCategoryData(callBack){
    var params = {
      url: 'category/all',
      successCallBack: function(res){
        callBack&&callBack(res)
      }
    }
    this.request(params)
  }

  /**
   * 获取一个分类下的所有产品
   */
  getProductsByCategory(id, callBack){
    var params = {
      url: 'product/by_category?id=' + id,
      successCallBack: function(data){
        callBack&&callBack(data)
      }
    }
    this.request(params)
  }
}

export { Category }