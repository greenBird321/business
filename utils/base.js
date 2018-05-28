import { Config } from 'config.js'

class Base{

  /**
   *  Base的初始化函数
   */
  constructor(){
    this.baseRequestUrl = Config.baseUrl
  }

  /**
   *  发送请求的二次封装
   */
  request(params){
    var url = this.baseRequestUrl + params.url
    
    if (!params.type){
      params.type = 'GET'
    }

    wx.request({
      url: url,
      data: url.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        // 同步获取storage中的token数据
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        // 如果参数中的成功回调的方法存在的 在执行回调
        // if (params.successCallBack){
        //   params.successCallBack(res)
        // }
        params.successCallBack&&params.successCallBack(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }

  /** 
    * 获取页面中传递的值 
    */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key]
  }
}

export { Base }