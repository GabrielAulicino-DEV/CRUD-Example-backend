const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const constant = require('../constant/constant')
const passwordMiddleware = require('../middleware/passwordMiddleware')

const createUser = async (name, email, password, cpf)=>{
    try{
        if(!name || !email || !password || !cpf ){
            return Promise.reject({error:"Name, Password or Email is required",status:400})
        }
        const hash = await passwordMiddleware.genHash(password)

        const user= await User.create({email:email,name:name, cpf:cpf ,password:hash})
        return Promise.resolve({data:{name:user.name, email:user.email, password:user.password, cpf:user.cpf, id:user._id},message:"Sucess to Create User",status:200})
    }catch(error){
        return Promise.reject({error:error.toString(),status:400})
    }
}

const loginUser = async(email, password)=>{
    try{
        if(!email || !password){
            return Promisse.reject({error: "Email and Password is required"})
        }
        const user = await User.findOne({
            email:email
        })
        const compare = await passwordMiddleware.compareHash(password, user.password)
        if(compare == false){
            return Promise.reject({error:"Invalid Password", status:401})
        }
        const token = jwt.sign({name:user.name, email:user.email, _id:user._id}, constant.jwtSecret)
        // console.log(token)
        return Promise.resolve({data:{token:token, message:"Sucess To Login"}, status:200})
    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}
const getUserService = async (id) => {
    try{
        const getUser = await User.findOne({_id: id}, {password: 0})
        return Promise.resolve({data:getUser, message:"Usuário Encontrado"})
    }
    catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}

const updateUserService = async (name, cpf, email, id) => {
    try {
        const user = await User.updateOne({ _id: id}, { name: name, cpf: cpf, email: email })
        return Promise.resolve({ data: user, status: 200 })
    }
    catch (error) {
        return Promise.reject({ error: error.toString(), status: 400 })
    }
}

module.exports = {
    updateUserService,
    getUserService,
    loginUser,
    createUser,
}