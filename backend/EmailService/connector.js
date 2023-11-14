const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env['EMAIL_USER'],
    pass: process.env['EMAIL_PASSWORD']
  }
});


const handleEmail = (user = {}, verificationKey=0) => {

    transporter.sendMail({
        from: 'nodejstest0@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: "Doğrulama İşlemi", // Subject line
        text: `Bizi tercih ettiğiniz için teşekkürler doğrulama kodunuz: ${verificationKey}`, // plain text body
    
      }, function(error) {
    
            // hata olrusa consola logla
            console.log("MAİL ATARKEN HATA:", error)
    
      })

}


module.exports = { handleEmail }