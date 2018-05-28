
import { Base } from '../../utils/base.js'

// 使用ES6 的语法 定义类
class Home extends Base{
  // 构造函数
  constructor(){
    // 调用父类的构造函数 父类构造函数中有父类属性操作 
    super()
  }

  getBannerData(id, callBack){
    var params = {
        url: 'banner/' + id,
        successCallBack: function(res){
          callBack&&callBack(res.items)
        }
    }
    // 调用父类的request 方法
    this.request(params)
  }

  /**
   *  主题接口调用 可传数组也可传递单个数字
   */
  getThemeData(id, callBack){
    var baseUrl = 'theme'
    if(id instanceof Array){
      baseUrl += '?ids=' + id
    }else{
      baseUrl += '/' + id
    }

    var params = {
      url: baseUrl,
      successCallBack: function (data) {
        callBack&&callBack(data)
      }
    }
    this.request(params)
  }

  /**
   * 首页获取 最近新品的接口
   */
  getRecentData(callBack){
    var params = {
      url: 'product/recent',
      successCallBack: function (data) {
        callBack&&callBack(data)
      }
    }
    this.request(params)
  }
}
// es6 语法规定 如果要import某个类， 必须要先export 此类
export { Home }