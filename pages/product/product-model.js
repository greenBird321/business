import { Base } from '../../utils/base.js'

class Product extends Base {
  constructor(){
    super()
  }

  /**
   * 获取商品详情的方法
   */
  getProductData(productId, callBack){
      var params = {
        url: 'product/' + productId,
        successCallBack: function (data) {
          callBack&&callBack(data)
        }
      }
      this.request(params)
  }
}

export { Product }