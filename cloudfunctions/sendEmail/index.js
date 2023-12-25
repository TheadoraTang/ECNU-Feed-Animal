const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event) => {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", //SMTP服务器地址
    port: 25, //端口号，通常为465，587，25，不同的邮件客户端端口号可能不一样，网易是25
    secure: false, //如果端口是465，就为true;如果是587、25，就填false
    auth: {
      user: "973068733@qq.com", 
      pass: "idiyotfbzchsbdgi" //授权码，不是QQ邮箱的密码
    }
  });

  let postMsg = {
    from: event.from, //发件邮箱
    to:event.to, //收件人
    subject: event.subject,
    text: event.text,
    html: event.html 
  };

  let res = await transporter.sendMail(postMsg);
  return res;
}