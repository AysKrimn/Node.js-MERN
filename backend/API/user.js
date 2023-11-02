const express = require('express')
// router oluştur
const rotuer = express.Router()

// hash library
const bcrpyt = require('bcrypt')
// token
const jwt = require('jsonwebtoken')
// UserSchema
const UserSchema = require('../database/Models/UserModel')

// profileAvatarConfig 
const { useProfileAvatarConfig, handleImageValidation } = require('../ImageService/handle_images')

// yetkilendirme işlevi
const { getAccessToRoute } = require('../authentication/decodeToken')

// bu router tokeni çözer ve user bilgilerini cliente geri gönderir
rotuer.get("/decode", async (request, response) => {

      try {

        const { token } = request.query

        if (token) {

        // tokeni çöz
        const user = jwt.verify(token, process.env['TOKEN_KEY'])

        return response.status(200).json({ data: user })

        } else {

         // token yoksa
         return response.status(400).json({ data: "Token belirtilmedi."})
        }
        
      } catch (error) {

        let statusCode = 500;

        console.log("[/decode/token] error:", error)

        if (error.name === "JsonWebTokenError") {

             statusCode = 400
        }
      
        response.status(statusCode).json({ message: error})
      }

})


/**
 * İlgili userin detay sayfasını döndürür.
 * @param {userName} name ilgili userin kullanıcı ismini temsil eder.
 */

rotuer.get('/users/:userName', async (request, response) => {

        try {

           const user = await UserSchema.findOne({ username: request.params.userName})

           // user yoksa
           if (user === null) {

                return response.status(404).json({ message: "Böyle bir kullanıcı bulunamadı."})
           }


           response.status(200).json({ data: user})
                
        } catch (error) {
                
                response.status(500).json({ message: "Bir hata oluştu lütfen daha sonra tekrar deneyiniz."})
        }
})

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
                        // passaportla
                        const passport = {

                          user_id: user._id,
                          username: user.username,
                          roles: user.roles,
                          email: user.email
                            
                        }
                        // gecis izni ver
                        const token = jwt.sign(passport, process.env['TOKEN_KEY'])
                        return response.status(200).json({ message: "Başarılı", data: token})

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



// AVATAR DEĞİŞTİRME 
rotuer.post('/user/set/avatar', getAccessToRoute, useProfileAvatarConfig.single('avatar'), 
async (request, response) => {

        try {
        
        console.log("Dosya:", request.file)

        if (!request.file) {

                return response.status(400).json({ message: "Lütfen resim gönderin."})
        }


        const validFile = handleImageValidation(request.file)

        if (!validFile) {

                return response.status(400).json({ message: "Lütfen jpg, jpeg, png veya gif uzantılı dosya gönderin."})
        }
        
        // useri bul ve kaydet
        const user = await UserSchema.findOne({ _id: request.user.user_id})
        user.avatar = request.file.path
        // veritabanına kayıt et.
        await user.save()

        response.status(201).json({ message: "Avatar Changed"})

        } catch (error) {

        
        console.log("Error at change avatar:", error)
        response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                
        }

})


// USER ROLE API  (RTÜBE YÜKSELTME)
rotuer.post("/users/:userId/roles/promote", async (request, response) => {

        try {
            // userin gönderdiği rolü al
            const { role } = request.body
            const user = await UserSchema.findById({ _id: request.params.userId })

            // eğer eklenmek istenen rol zaten usserde varsa
           if (user.roles.includes(role)) {

                return response.status(400).json({ message: "Bu user zaten o role sahip."})
           }
                
           // yoksa
           user.roles.push(role)
           // veritabanına kaydet
           await user.save()

           response.status(201).json({ data: user })
        } catch (error) {


           response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                
        }

})


// RÜTBE DÜŞÜRME
rotuer.post("/users/:userId/roles/demote", async (request, response) => {



        try {
                // userin gönderdiği rolü al
                const { role } = request.body
                const user = await UserSchema.findById({ _id: request.params.userId })
    
                // eğer çıkarılmak istenen rol zaten usserde yoksa
               if (!user.roles.includes(role)) {
    
                    return response.status(400).json({ message: "Bu user zaten o role sahip değil."})
               }
                    
               // varsa
               user.roles.pull(role)
               // veritabanına kaydet
               await user.save()
    
               response.status(201).json({ data: user })
            } catch (error) {
    
    
               response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                    
            }


})

module.exports = rotuer