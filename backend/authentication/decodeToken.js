const jwt = require('jsonwebtoken')

const getAccessToRoute = (request, response, next) => {

    try {

    // console.log("İstek yapıldı header:", request.headers)
    const tokenHeader = request.headers['authorization']
    // console.log("tokenheader:", tokenHeader)
    if (!tokenHeader) {
        response.status(403).json({ message: "Token bulunamadı lütfen geçerli bir token belirtin."})
        return;
    }

    const token = tokenHeader.split(' ')[1]
    const decoded_user = jwt.verify(token, process.env['TOKEN_KEY'])

    console.log("TOKEEEN:", token)
    request.user = decoded_user
    next()

    } catch(error) {

        // tokenin süresi bitmiştir veya token geçersizdir
        // console.log("errorrr token:", error)
        response.status(400).json({ message: "geçersiz token"})

    }
}



module.exports = {
    getAccessToRoute
}