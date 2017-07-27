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
            },
            "text": {
              "content": "本公共号下半年的目标是做一个小白全栈"
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

}
module.exports = Wechat;