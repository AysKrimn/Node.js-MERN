const jwt = require('jsonwebtoken')

const getAccessToRoute = (request, response, next) => {

    try {

    console.log("İstek yapıldı header:", request.headers)
    const tokenHeader = request.headers['authorization']
    if (!tokenHeader) {
        response.status(403).json({ message: "Token bulunamadı lütfen geçerli bir token belirtin."})
        return;
    }

    const token = tokenHeader.split(' ')[1]
    const decoded_user = jwt.verify(token, process.env['TOKEN_KEY'])

    request.user = decoded_user
    next()

    } catch(error) {

        // tokenin süresi bitmiştir veya token geçersizdir
        response.status(400).json({ message: "geçersiz token"})

    }
}



module.exports = {
    getAccessToRoute
}