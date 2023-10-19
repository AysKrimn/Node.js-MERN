const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({

    // mongodb _id

    author: {
        // object relationships
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },

    // reverse relationship
    post: {

        type: mongoose.Schema.ObjectId,
        ref: "Tweets",
        required: true
    },

    message: {

        type: String,
        required: true
    }


},

// createdAt: TARİH
// updatedAt: Tarhi
// POSTUN OLUŞTURULDUĞU VEYA GÜNCELLENECEĞİ TARİHLERİ OTOMATİK OLARAK OLUŞTUR
{ timestamps: true})



const comment_model = mongoose.model("Comments", CommentSchema)

// Modül olarak dışarı çıkart.
module.exports = comment_model