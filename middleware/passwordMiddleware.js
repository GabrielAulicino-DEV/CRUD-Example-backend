const bcrypt = require('bcrypt')

const genHash = async(password)=>{
    const salt = await genSalt()
    // console.log(salt)
    const hash = new Promise((resolve,reject)=>{
        bcrypt.hash(password, salt, (error,data)=>{
            if(error){
                return reject(error)
            }
            return resolve(data)
        })
    })
    return hash
}

const genSalt = async()=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(5, (error,data)=>{
            if(error){
                return reject(error)
            }
            return resolve(data)
        })
    })
}

const compareHash = (password, hash) =>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash,(error, data)=>{
            if(error){
                return reject(error)
            }
            return resolve(data)
        })
    })
}

module.exports={
    genHash,
    compareHash,
}