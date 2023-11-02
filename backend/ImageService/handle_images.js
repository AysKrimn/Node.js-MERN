const multer = require('multer')
const fs = require('fs')



  // image validation
  // resim boyutu, uzantısı vb. doğrulamalarının yapıldığı yer.
  const handleImageValidation = (fileObject = {}) => {
    // kabul ettiğimiz uzantılar
    // .jpg, .jpeg, .png, .gif
    const extension = fileObject.originalname.split('.')[1]
    const validExtension = ["jpg", "jpeg", "png", "gif"].includes(extension)
    
    // true veya false dönecek
    return validExtension

}



const generateDate = () => {

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate()

    return `${year}-${month}-${day}`
}



const storage = multer.diskStorage({
    // resimlerin barınacağı yer
    destination: `./uploads/attachments/${generateDate()}/`,

    filename: function (req, file, cb) {
      const currentDate = Date.now();
      const uniqeFileName = `${currentDate}-${file.originalname}`

      cb(null, uniqeFileName)
    }
  })
  
  const upload = multer({ storage: storage })




  // User Avatarları İçin Uygulanacak olan sterateji


const profile_avatar_storage = multer.diskStorage({
    // resimlerin barınacağı yer
    destination: function (req, file, cb) {
      
        const dir = `./uploads/avatars/${req.user.user_id}/`
      
        const validImage = handleImageValidation(file)

        // false gelirse dosya oluşturma
        if (!validImage) {
          return;
        }
        // eğer request.user için backendde bir dosya yoksa
        // eğer user için bir dosya yoksa onun için oluştur
        if (!fs.existsSync(dir)) {

            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, dir)

    },

    filename: function (req, file, cb) {
      const currentDate = Date.now();
      const uniqeFileName = `${currentDate}-${file.originalname}`

      cb(null, uniqeFileName)
    }
  })
  

  
const profile_avatar_config = multer({ storage: profile_avatar_storage })


  // modul olarak çıkart
  module.exports = { 
        useImageConfig: upload,
        useProfileAvatarConfig: profile_avatar_config,
        handleImageValidation

}