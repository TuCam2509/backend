require('dotenv').config()
import nodemailer from 'nodemailer'

let sendEmail=async(dataSend)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.EMAILPASSWORD, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Cam Tu 👻" <tu092501@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line,
        html:getBodyHTMLEmail(dataSend)
      });
    


}
let getBodyHTMLEmail=(dataSend)=>{
  let result=''
  if(dataSend.language==='en'){
    result=`<h3>Dear ${dataSend.patientName}</h3>
    <p>You received an email because you booked a medical appointment on Booking Doctor</p>
    <p>Information to book a medical appointment</p>
    <div><b>Time:${dataSend.time}</b></div>
    <div><b>Doctor:${dataSend.doctorName}</b></div>
    <p>If the above information is true, please click on the link below to complete</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Sincerely thank!</div>
`

  }
  if(dataSend.language==='vi'){
    result=`<h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email do đã đặt lịch khám bệnh trên Booking Doctor</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian:${dataSend.time}</b></div>
    <div><b>Bác sĩ:${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thực,vui lòng click vào đường link bên dưới để hoàn tất</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Bấm vào đây</a>
    </div>
    <div>Xin chân thành cảm ơn!</div>
`

  }
  return result

}
let getBodyHTMLEmailRemedy=(dataSend)=>{
  let result=''
  if(dataSend.language==='en'){
    result=`<h3>Dear ${dataSend.patientName}</h3>
    <p>You received an email due to a successful medical examination at Booking Doctor</p>
    <p>Prescription/invoice information is attached in the file</p>
    <div>Sincerely thank!</div>
`

  }
  if(dataSend.language==='vi'){
    result=`<h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email do đã khám bệnh thành công tại Booking Doctor</p>
    <p>Thông tin đơn thuốc/hóa đơn được đính kèm trong file</p>
    <div>Xin chân thành cảm ơn!</div>
`

  }
  return result


}
let Attechment=async(dataSend)=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAILPASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Cam Tu 👻" <tu092501@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line,
    html:getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {   // encoded string as an attachment
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imageBase64.split("base64,")[1],
        encoding:'base64'
    },
    ],
  });


}

module.exports={
    sendEmail:sendEmail,
    Attechment:Attechment
}