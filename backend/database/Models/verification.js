const mongoose = require('mongoose')

// user modelinin temelini at
const VerifySchema = new mongoose.Schema({

    // fields = keys
    user: {
        // object relationships
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true
    },

    code: {

        type: String,
        required: true
    }

})


// Şemayı oluştur
const verify_model = mongoose.model("Verification", VerifySchema)

// Modül olarak dışarı çıkart.
module.exports = verify_model