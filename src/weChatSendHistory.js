const request = require('superagent');

class MessageManager {

  /**
   *发送模板消息
   */
  static sendMessage(req, token) {
    const {
      templateid = 'wETAINAHcK5_cFziGzqV4uLII0k9kIOvqVidU7_nKBM',
      sendTime = 0,
      url = 'http://www.baidu.com',
      // publicName,
      touser,
      // activityName,
      data

    } = req.body;

    const path = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`;

    request.post(path)
          .send({
            templateid,
            sendTime,
            url,
            touser,
            data
          })
          .end((err, result) => {
            if (err) {
              console.log('sendtext======err');
            } else {
              console.log(`sendtext======suc:${result.res.text}`);
            }
          });
  }
}

module.exports = MessageManager;
