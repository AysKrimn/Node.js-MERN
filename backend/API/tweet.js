const express = require('express')
const router = express.Router()


// Schemas
const TweetSchema = require('../database/Models/TweetModel')

// resim depolama stretajisi
const { useImageConfig, handleImageValidation } = require('../ImageService/handle_images')

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


// tweet-detay-sayfası
router.get('/tweets/:tweetId', async (request, response) => {


        try {

            const tweet = await TweetSchema.findById(request.params.tweetId).populate('author')
            .populate({
                path: "comments",
                populate: { path: "author"}
            })
            console.log("TWEET:", tweet)
            return response.status(200).json({ data: tweet})
            
        } catch (error) {
            
          

            let statusCode = 500;

            if (error.kind && error.kind === 'ObjectId') {
                statusCode = 404;
                response.status(statusCode).json({ message: "Böyle bir tweet bulunamadı."})

            } else {
                console.log("Error: /tweets/tweetId", error)
                // sunucu yavas veya cöktü veya herahngi bir sebepten ötürü istegi işleyemedi
                response.status(statusCode).json({ message: "Lütfen daha sonra tekrar deneyiniz."})
            }

         
        }

})


// güvenlik mekanizmasını aşağıdaki tüm endpointler için devreye sok
router.use(getAccessToRoute)
router.post('/tweets/create', useImageConfig.single('attachment'), async (request, response) => {

    console.log("tweet oluşturma endpointinde user:", request.user)
    // veritabanı bağlantısı kur ve mevcut olan tüm tweetleri al
    try {
        
        const { content } = request.body
      

        if (!content) {

            response.status(400).json({ message: "Tweet içeriği zorunludur."})
        }

        // tweet oluştur ancak henüz veritabanına kayıt etme
        const tweet = new TweetSchema({ author: request.user.user_id, content: content })

        // eğer resim varsa
        if (request.file) {
            
        // resim validasyondan geçiyor mu?
        const validImage = handleImageValidation(request.file)

        if (validImage) {

            tweet.attachment = request.file.path

        } else {

            return response.status(400).json({ message: "Lütfen geçerli bir resim uzantısı giriniz."})
        }

        }


        // oluşturulan tweeti artık kaydet
        await tweet.save()
        
        response.status(200).json({ data: tweet})

    } catch (error) {
        
        console.log(`[/tweets] (tweet.js):`, error)
        response.status(500).json({ message: "Bir hata meydana geldi lütfen daha sonra tekrar deneyiniz."})
    }

})

module.exports = router