const express = require('express')
const router = express.Router()

// CommentSchema
const CommentSchema = require('../database/Models/CommentModel')
const TweetSchema = require('../database/Models/TweetModel')
// tweetlere yorum yapılırsa
router.post("/tweets/:tweetId/make/comment", async (request, response) => {

    // 652c3b08717e48c413502b5d
    try {

        console.log("YORUMU YAPAN USER:", request.user)
        
        const { message } = request.body

        // messaj paramaetresi gelmemişse
        if (!message)
            return response.status(400).json({ message: "Lütfen bir mesaj giriniz."})

        const tweet = await TweetSchema.findOne({ _id: request.params.tweetId})


        if (tweet === null) 
            return response.status(404).json({ message: "Böyle bir tweet bulunamadı."})

        // yorumu oluştur
        const new_comment = await CommentSchema.create({

            author: request.user.user_id,
            post: tweet._id,
            message: message
        })


        // posta bu yorumu ata
        tweet.comments.push(new_comment)
        // veritabanına kaydet
        await tweet.save()
        
       // yorumu döndür
       response.status(200).json({ data: "Yorum Oluşturuldu"})


    } catch (error) {
        
        console.log("[/create/comment] error:", error)
        response.status(500).json({ message: "Lütfen daha sonra tekrar deneyiniz."})
    }
})


// yorum silme isteği gelirse
router.post("/tweets/:tweetId/comments/:commentId/delete/comment", async (request, response) => {


    try {

        const tweet = await TweetSchema.findOne({ _id: request.params.tweetId})


        if (tweet === null) 
            return response.status(404).json({ message: "Böyle bir tweet bulunamadı."})

        // böyle bir yorum var mi?
        const comment = await CommentSchema.findOne({ _id: request.params.commentId})

        if (comment === null) 
            return response.status(404).json({ message: "Böyle bir yorum bulunamadı."})

        // yorum şemasından silme işlemi
        await comment.deleteOne()

        // eşleşen tweet gönderisinin yorumlarından sil
        tweet.comments.pull({ _id: request.params.commentId })
        // tweet şemasını kaydet
        await tweet.save()
        
        response.status(200).json({ data: "Yorum silindi."})
        
    } catch (error) {

        console.log("[/delete/comment] error:", error)
        response.status(500).json({ message: error})
        
    }


})



module.exports = router