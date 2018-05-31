import { Base } from '../../utils/base.js'

class Cart extends Base {
    constructor(){
      super()
      // 指定缓存中的key
      this._storageKeyName = 'cart'
    }

    /**
     * 添加购物车 本地添加 并不上传到服务器
     */
    add(item, counts){
      var cartData = this.getCartDataFromLocal()
      var isHasInfo = this._isHasThatOne(item.id, cartData)
      // 表示在缓存中没有此商品信息 添加商品
      if (isHasInfo.index == -1){
        // 为商品组装数据
        item.counts = counts
        // 商品的默认选择状态，添加到购物车中就是选中的
        item.selectStatus = true
        cartData.push(item)
      }else {
        cartData[isHasInfo.index].counts += counts
      }
      // 更新缓存
      wx.setStorageSync(this._storageKeyName, cartData)
    }
    
    /**
     * 读取购物车中产品的数量
     * flag true 考虑商品选择状态
     * flag flase 全部商品
     */
    getCartTotalCounts(flag = false){
      var cartProducts = this.getCartDataFromLocal()
      var productCounts = 0
      for (var i = 0; i < cartProducts.length; i++){
        if (flag){
          if (cartProducts.selectStatus){
            productCounts += cartProducts[i].counts 
          }else{
            productCounts += cartProducts[i].counts 
          }
        }
      }
      return productCounts
    }
    /**
     *  检测本地是否有 购物车缓存
     */
    getCartDataFromLocal(){
      var result = wx.getStorageSync(this._storageKeyName)
      if (!result){
        result = []
      } 
      return result
    }

    /**
     * 检测缓存中是否存在同样的商品
     */
    _isHasThatOne(productid, arr){
      var item,
        result = {index: -1}
      for(var i=0; i< arr.length; i++){
          if (arr[i].id == productid){
            result = {
              index: i,
              data: arr[i]
            }
            break
          }
      }
      return result
    }
}

export { Cart }