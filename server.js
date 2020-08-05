const express = require('express') 
const bodyParser = require('body-parser')
const mongodb = require("./database/index")
const constants = require('./constant/constant')
const UserController = require('./controller/UserController')
const jwt = require("express-jwt")
const cors =require('cors')
// console.log(mongodb)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json())

const port = 3333

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.use(jwt({secret:constants.jwtSecret, algorithms: ['HS256']}).unless({path:["/user/create",'/user/login']}))

app.post('/user/create', UserController.createControllerUser)
app.post('/user/login', UserController.loginControllerUser)
app.get('/user', UserController.getUserController)
app.post('/user/update', UserController.updateUserController)

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port} `)
    mongodb()
})