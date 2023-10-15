const express = require('express')
const router = express.Router()


// Schemas
const TweetSchema = require('../database/Models/TweetModel')



// protection
const { getAccessToRoute } = require('../authentication/decodeToken')

router.get('/tweets', async (request, response) => {

    // veritabanı bağlantısı kur ve mevcut olan tüm tweetleri al
    try {

       // find boş bırakılırsa bütün verileri döndürür
       const tweets = await TweetSchema.find({}).populate("author")
       response.status(200).json({ data: tweets })

    } catch (error) {
        
        console.log(`[/tweets] (tweet.js):`, error)
        response.status(500).json({ message: "Bir hata meydana geldi lütfen daha sonra tekrar deneyiniz."})
    }

})


// güvenlik mekanizmasını aşağıdaki tüm endpointler için devreye sok
router.use(getAccessToRoute)
router.post('/tweets/create', async (request, response) => {

    console.log("tweet oluşturma endpointinde user:", request.user)
    // veritabanı bağlantısı kur ve mevcut olan tüm tweetleri al
    try {
        
        const { content } = request.body

        if (!content) {

            response.status(400).json({ message: "Tweet içeriği zorunludur."})
        }

        // tweet oluştur
        const tweet = await TweetSchema.create({ author: request.user.user_id, content: content })

        response.status(200).json({ data: tweet})

    } catch (error) {
        
        console.log(`[/tweets] (tweet.js):`, error)
        response.status(500).json({ message: "Bir hata meydana geldi lütfen daha sonra tekrar deneyiniz."})
    }

})

module.exports = router