require("dotenv").config()
const express = require('express')
const app = express()
const cors = require('cors')
const errHandler = require('./middlewares/errHandler')
const router = require('./routes/index')
const port = 3000

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use('/', router)
app.use(errHandler)
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})