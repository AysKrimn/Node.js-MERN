const mongoose = require('mongoose')
const CONNECTION_URI = process.env['URI']
// async function
const make_connection = async () => {


    try {

        await mongoose.connect(CONNECTION_URI)

        console.log("Veritabanına başarılı bir şekilde bağlantı sağlandı.")
        
    } catch (error) {
        
        // uygulamayı durdur
        throw new Error(`Veritabanına bağlanırken bir hata meydana geldi. Hata: ${error}`);
    }

}



// modul olarak dışarı çıakrt
module.exports = make_connection