const multer = require('multer')



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

  // modul olarak çıkart
  module.exports = { 
        useImageConfig: upload,
        handleImageValidation

}