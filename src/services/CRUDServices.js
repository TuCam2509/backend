import bcrypt from 'bcryptjs';
import db from '../models/index'
const salt = bcrypt.genSaltSync(10);
let createNewUser=(data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let hashpasswordForm=await hashPasswordUser(data.password)
            await db.User.create({
                email:data.email,
                password:hashpasswordForm,
                firstName:data.firstName,
                lastName:data.lastName,
                address:data.address,
                phoneNumber:data.phoneNumber,
                gender:data.gender==='1'? true: false,
                roleId:data.roleId,
            })
            resolve('ok!')
            
        } catch (error) {
            reject(error)
            
        }
        
    })
}
let hashPasswordUser=(password)=>{
    return new Promise(async(resolve,reject)=>{
        try {
        var hashPassword =await bcrypt.hashSync(password, salt);
        resolve(hashPassword)
            
        } catch (error) {
            reject(error)
            
        }
    })
}
let getAllUser=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users=db.User.findAll({
                raw:true,
            })//nhận tất cả bảng ghi có trong db
            resolve(users)

            
        } catch (error) {
            reject(error)
            
        }
    })

}
let getUserInfoById=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where:{id:userId},raw:true
            })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
            
        } catch (error) {
            reject(error)
            
        }
    })

}
let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where:{id:data.id},
                raw:false
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address
                user.phoneNumber=data.phoneNumber
                
                await user.save()
                let allUsers=await db.User.findAll()
                resolve(allUsers)
            }else{
                resolve()
            }
           

            
        } catch (error) {
            reject(error)
            
        }
    })

}
let deleteUserById=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where:{id:userId},
                raw:false,

            })
            if(user){
                await user.destroy();
            }
            resolve()
            
        } catch (error) {
            reject(error)
        }
    })

}

module.exports={
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById
        

}
