const UserService = require('../service/UserService')
const jwt = require("../middleware/getToken")

const createControllerUser = async (req,res) =>{
    try{
        console.log(req.body)
        const createService = await UserService.createUser(req.body.name,  req.body.email, req.body.password, req.body.cpf)
        res.send({data:createService.data, message:createService.message}).status(createService.status)
    
    }catch(error){
        res.status(400).send(error.error)
    }
}
const loginControllerUser = async(req,res)=>{
    try{
        const loginService = await UserService.loginUser(req.body.email, req.body.password)
        res.send({data:loginService.data, message:loginService.message}).status(loginService.status)
    }catch(error){
        res.status(400).send(error.error)
    }
}

const getUserController = async (req,res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)
        // console.log(token)
        const user = await UserService.getUserService(token._id)
        // console.log(user)
        res.send({user: user.data})
    }catch(error){
        console.log("ERROR")
        res.status(400).send(error.error)
    }
}


const updateUserController = async (req,res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)
        const updateUser = await UserService.updateUserService(req.body.name, req.body.cpf, req.body.email ,token._id)
        res.send({data:updateUser.data}).status(updateUser.status)
    }catch(error){
        console.log("ERROR")
        res.status(400).send(error.error)
    }
}


module.exports = {
    getUserController,
    updateUserController,
    loginControllerUser,
    createControllerUser
}