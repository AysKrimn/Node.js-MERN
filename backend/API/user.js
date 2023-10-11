const express = require('express')
// router oluştur
const rotuer = express.Router()

// hash library
const bcrpyt = require('bcrypt')

// UserSchema
const UserSchema = require('../database/Models/UserModel')


// BU router userleri giriş yaptırmak ile görevlidir.
rotuer.post("/login", async (request, response) => {

        try {

          const {username, password} = request.body

          if (username && password) {

                const user = await UserSchema.findOne({ username })
                console.log("DÖNEN USER:", user)
                
                if (user) {

                // şifreler uyuşuyor mu?
                const correctPassword = await bcrpyt.compare(password, user.password)

                if (correctPassword) {

                        // useri login et
                        return response.status(200).json({ message: "Başarılı", data: user})

                } else {

                    return response.status(400).json({ message: "Username veya şifre hatalı"})
                }
                
                } else {

                     return response.status(404).json({ message: "Böyle bir user bulunamadı"})
                }

          } else {

                return response.status(400).json({ message: "Gerekli Alanları Lütfen Doldurunuz"})
          }
                
        } catch (error) {
                console.log("[/login] SV ERROR:", error)
                return response.status(500).json({ message: "10 dk sonra tekrar deneyiniz."})

        }


})

// BU router userleri kayıt etmekle görevlidir.
rotuer.post("/register", async (request, response) => {

        try {
                console.log("TETİK YEDİM.")
                // body'den gelen verileri al
                const { email,userName,password,password2} = request.body

                if (email && userName && password && password2) {

                     // şifreler uyuşuyor mu?
                     if (password === password2) {

                        // şifreyi kriptola
                      const cryptPassword = await bcrpyt.hash(password, 10)
                        // user oluştur
                      const user = await UserSchema.create({
                                
                                email,
                                username: userName,
                                password: cryptPassword
                        })

                        
                        // user oluştu frontende haber ver
                        return response.status(200).json({ message: "Hesap Oluştu", data: user })

                     } else {

                        response.status(400).json({ message: "Şifreler uyuşmuyor."})
                     }


                } else {

                     response.status(400).json({ message: "Lütfen gerekli olan tüm inputları doldurunuz."})
                }
        
        
        } catch (error) {
                
                response.status(500).json({ message: "Şuanda bu işlemi yapamıyoruz maalesef"})
        }
})




module.exports = rotuer