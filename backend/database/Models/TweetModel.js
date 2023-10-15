const mongoose = require('mongoose')


const TweetSchema = new mongoose.Schema({


    author: {
        // object relationships
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },

    content: {

        type: String,
        required: true
    }


},

// createdAt: TARİH
// updatedAt: Tarhi
// POSTUN OLUŞTURULDUĞU VEYA GÜNCELLENECEĞİ TARİHLERİ OTOMATİK OLARAK OLUŞTUR
{ timestamps: true})



const tweet_model = mongoose.model("Tweets", TweetSchema)

// Modül olarak dışarı çıkart.
module.exports = tweet_model