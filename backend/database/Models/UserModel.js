const mongoose = require('mongoose')

// user modelinin temelini at
const UserSchema = new mongoose.Schema({

    // fields = keys
    username: {
        
        type: String,
        required: true
    },

    email: {

        type: String,
        required: true
    },


    password: {

        type: String,
        required: true
    },

    roles: {

        type: [],
        default: ["User"]
        // ["User", "Admin"]
        // her usere varsayılan olarak bir rol ver

    }

})


// Şemayı oluştur
const user_model = mongoose.model("Users", UserSchema)

// Modül olarak dışarı çıkart.
module.exports = user_model