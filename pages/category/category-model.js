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
}

export { Category }