const mongoose = require('mongoose')


const TweetSchema = new mongoose.Schema({

    // mongodb _id

    author: {
        // object relationships
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },

    content: {

        type: String,
        required: true
    },

    attachment: {

        type: String
    },
    // relationship level database
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comments"
    }]


},

// createdAt: TARİH
// updatedAt: Tarhi
// POSTUN OLUŞTURULDUĞU VEYA GÜNCELLENECEĞİ TARİHLERİ OTOMATİK OLARAK OLUŞTUR
{ timestamps: true})



const tweet_model = mongoose.model("Tweets", TweetSchema)

// Modül olarak dışarı çıkart.
module.exports = tweet_model