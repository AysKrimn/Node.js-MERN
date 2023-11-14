const express = require('express')
// router oluştur
const rotuer = express.Router()

// hash library
const bcrpyt = require('bcrypt')
// token
const jwt = require('jsonwebtoken')
// UserSchema
const UserSchema = require('../database/Models/UserModel')
// tweetSchema
const TweetSchema = require('../database/Models/TweetModel')

// veriyschema
const VerifySchema = require('../database/Models/verification')

// profileAvatarConfig 
const { useProfileAvatarConfig, handleImageValidation } = require('../ImageService/handle_images')

// yetkilendirme işlevi
const { getAccessToRoute } = require('../authentication/decodeToken')

// email servis
const { handleEmail } = require('../EmailService/connector')

// update token
const updateToken = (user = {}) => {

        const passport = {

                user_id: user._id,
                user_avatar: user.avatar,
                username: user.username,
                roles: user.roles,
                email: user.email
                  
              }
              // tokeni güncelle
              const token = jwt.sign(passport, process.env['TOKEN_KEY'])
              return token
}

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

 
           // tweetleri döndür
           const tweets = await TweetSchema.find({ author: user._id }).populate('author')



           response.status(200).json({ data: { user, tweets }})
                
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
                        // user hesabını doğrılamış mı?
                        let verified = false;

                        const isVerified = await VerifySchema.findOne({ user: user._id})

                        if (isVerified) {
                                
                            verified = true;
                        }

                        const passport = {

                          user_id: user._id,
                          user_avatar: user.avatar,
                          username: user.username,
                          roles: user.roles,
                          email: user.email,
                          verified: verified
                            
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


                        // usere email at
                        const verifyKey = Math.floor(Math.random() * 9000)

                        // onaylama kodu oluştur
                        await VerifySchema.create({ user: user._id, code: verifyKey})
                        
                        handleEmail(user, verifyKey)
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


// USER HESABI SİL
rotuer.post('/user/account/delete', getAccessToRoute, async (request, response) => {

        try {

            // hesabı sil.
            const { user_id } = request.body
        
            // tüm tweetleri sil
            const user_tweets = await TweetSchema.find({ author: user_id })

            for await (const tweet of user_tweets) {
                
                await tweet.deleteOne()
            }

            await UserSchema.findByIdAndDelete({ _id: user_id })

            response.status(201).json({ data: request.token})
                
        } catch (error) {
                
            response.status(500).json({ message: "Hesabı silerken bir hata meydana geldi lütfen daha sonra tekrar deneyiniz."})
        }

})

// AVATAR DEĞİŞTİRME 
rotuer.post('/user/set/avatar', getAccessToRoute, useProfileAvatarConfig.single('avatar'), 
async (request, response) => {

        try {
        
        const { user_id } = request.body;

        console.log("Dosya:", request.file)

        if (!request.file) {

                return response.status(400).json({ message: "Lütfen resim gönderin."})
        }


        const validFile = handleImageValidation(request.file)

        if (!validFile) {

                return response.status(400).json({ message: "Lütfen jpg, jpeg, png veya gif uzantılı dosya gönderin."})
        }
        
        // useri bul ve kaydet
        const user = await UserSchema.findOne({ _id: user_id})
        user.avatar = request.file.path
        // veritabanına kayıt et.
        await user.save()
        // tokeni güncelle 
        const updatedToken = updateToken(user)

        response.status(201).json({ data: updatedToken })

        } catch (error) {

        
        console.log("Error at change avatar:", error)
        response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                
        }

})


// USER ROLE API  (RTÜBE YÜKSELTME)
rotuer.post("/users/:userId/roles/promote", getAccessToRoute, async (request, response) => {

        try {
            // userin gönderdiği rolü al
            const { role } = request.body
            const user = await UserSchema.findById({ _id: request.params.userId })

                // isteği yapan kişi admin mi?
            if (!request.user.roles.includes("Admin")) {

                return response.status(403).json({ message: "Bunu Yapmaya Yetkiniz Yok."})
            }
            // eğer eklenmek istenen rol zaten usserde varsa
           if (user.roles.includes(role)) {

                return response.status(400).json({ message: "Bu user zaten o role sahip."})
           }
                
           // yoksa
           user.roles.push(role)
           // veritabanına kaydet
           await user.save()

           // tokenide güncelle
           const updatedToken = updateToken(user)

           response.status(201).json({ data: updatedToken })
        } catch (error) {


           response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                
        }

})


// RÜTBE DÜŞÜRME
rotuer.post("/users/:userId/roles/demote", getAccessToRoute, async (request, response) => {



        try {
                // userin gönderdiği rolü al
                const { role } = request.body
                const user = await UserSchema.findById({ _id: request.params.userId })
    
                // isteği yapan kişi admin mi?
                if (!request.user.roles.includes("Admin")) {

                     return response.status(403).json({ message: "Bunu Yapmaya Yetkiniz Yok."})
                }
                // eğer çıkarılmak istenen rol zaten usserde yoksa
               if (!user.roles.includes(role)) {
    
                    return response.status(400).json({ message: "Bu user zaten o role sahip değil."})
               }
                    
               // varsa
               user.roles.pull(role)
               // veritabanına kaydet
               await user.save()
    
               // tokenide güncelle
               const updatedToken = updateToken(user)

               response.status(201).json({ data: updatedToken })

            } catch (error) {
    
               console.log("DEMOTE ENDPONT:", error)
               response.status(500).json({ message: "Bir hata meydana geldi daha sonra tekrar deneyiniz."})
                    
            }


})

module.exports = rotuer