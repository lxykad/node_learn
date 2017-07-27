/**
 * 微信消息发送模块
 */
var request = require('superagent');

class Wechat {

  /**
   * 发送文本消息
   * https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
   * @param token
   */
  static sendAll(token) {
    var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token='+token;

    request.post(url)
          .send({
            "filter": {
              "is_to_all": true
              //    "tag_id":100
            },
            "text": {
              "content": "liyipeng"
            },
            "msgtype": "text"
          }).end((err, data) => {
      if (err || !data.ok) {
        console.log('sendtext======err')
      } else {
        let text = data.res.text;
        let parse = JSON.parse(text);
        console.log('sendtext======suc:'+data.res.text)
      }
    })

  }

  /**
   * 获取已创建的标签
   * https://api.weixin.qq.com/cgi-bin/tags/get?access_token=ACCESS_TOKEN
   */
  static getTags(token) {
    var url = 'https://api.weixin.qq.com/cgi-bin/tags/get?access_token='+token;

    request.get(url)
          .end((err, data) => {
            if (err || !data.ok) {
              console.log('tags======err')
            } else {
              let text = data.res.text;
              let parse = JSON.parse(text);
              console.log('tags======suc:'+data.res.text)
            }
          })
  }

  /**
   * 发送模板消息
   * https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=ACCESS_TOKEN
   * @param token
   */
  static sendTemp(token) {
    var url = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token='+token;

    request.post(url)
          .send({
            "industry_id1": "1",
            "industry_id2": "4"
          }).end((err, data) => {
      if (err || !data.ok) {
        console.log('sendtext======err')
      } else {
        let text = data.res.text;
        let parse = JSON.parse(text);
        console.log('sendtext======suc:'+data.res.text)
      }
    })

  }


}
module.exports = Wechat;