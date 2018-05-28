import { Base } from '../../utils/base.js'

class Theme extends Base{

    /**
     * 构造函数
     */
    constructor(){
      // 只要继承必须调用父类的构造函数 父类构造函数中有父类属性操作 
      super()
    }

    /**
     * 获取专题详细
     */
    getThemeData(id, callBack){
      var params = {
        url: 'theme/' + id,
        successCallBack: function (data){
            callBack&&callBack(data)
        }
      }
      
      this.request(params)
    }
}

export { Theme }