require('dotenv').config();
const express = require('express');
const cors = require('cors');
// PORT
const PORT = process.env['PORT']
// app isntance
const app = express()
// gelen JSON isteklerini parçala ve body'e atama yap
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// veritabanı bağlantısı kur
require('./database/connect')()

// third party middlewares
app.use(cors())

// APIS
const BASE_API_URL = "/api/v1/"
const userAPI = require('./API/user')
const tweetAPI = require('./API/tweet')
const commentAPI = require('./API/comment')

// anasayfaya istek geldiğinde
app.get('/', (request, response) => {

        response.send("Sa")
})


// api route middlewares
app.use(BASE_API_URL, userAPI) // /api/v1/all
app.use(BASE_API_URL, tweetAPI) // /api/v1/tweets
app.use(BASE_API_URL, commentAPI) // api/v1/tweets/tweetid/create

// run
app.listen(PORT, () => {

    console.log(`http://localhost:${PORT}/ portunda çalışıyorum.`)
})