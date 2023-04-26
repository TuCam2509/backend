import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let handleUserLogin=(email,password)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let userData={}
            let isExits=await checkEmail(email)
            if(isExits){
                let user=await db.User.findOne({
                    attributes:['id','email','roleId','password','firstName','lastName'],
                    where:{email:email},
                    raw:true
                   
                })
                if(user){
                  let check=await bcrypt.compareSync(password, user.password);
                  if(check){
                    userData.errCode=0;
                    userData.errMessage='ok';
                    delete user.password;
                    userData.user=user;
                  }else{
                    userData.errCode=3;
                    userData.errMessage='Wrong password';

                  }
                }else{
                    userData.errCode=2;
                    userData.errMessage=`Urser's not found`

                }

            }else{
                userData.errCode=1;
                userData.errMessage=`Your's email is not exits in your system.Please try other email`
                
            }
            resolve(userData)
            
        } catch (error) {
            reject(error)
            
        }
    })

}

let checkEmail=(userEmail)=>{
    return new Promise (async(resolve,reject)=>{
        try {
            let user=await db.User.findOne({
                where:{email:userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
            
        } catch (error) {
            reject(error)
            
        }
    })
}
let getAllUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users='';
            if(userId==='ALL'){
                users=await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }

                })

            }if(userId && userId !=='ALL'){
                users=await db.User.findOne({
                    where:{id:userId},
                    attributes:{
                        exclude:['password']
                    }

                })

            }
            resolve(users)
            
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
let createNewUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let check=await checkEmail(data.email)
            if(check===true){
                resolve({
                    errCode:1,
                    errMessage:'Your email is exits,Please try another email',
                })
            }else{
                let hashpasswordForm=await hashPasswordUser(data.password)
                await db.User.create({
                    email:data.email,
                    password:hashpasswordForm,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    address:data.address,
                    phoneNumber:data.phoneNumber,
                    gender:data.gender,
                    roleId:data.roleId,
                    positionId:data.positionId,
                    image:data.avatar

                })
                resolve({
                    errCode:0,
                    message:'ok'
                })

            }
            
        } catch (error) {
        reject(error)
            
        }
    })
}
let deleteNewUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        let user=await db.User.findOne({
            where:{id:userId}
        })
        if(!user){
            resolve({
                errCode:2,
                errMessage:`The user isn't exist`
            })
        }
        //if(user){

            //await user.destroy();
        //}
        await db.User.destroy({
            where:{id:userId}
        })
        resolve({
                errCode:0,
                errMessage:`The user is deleted`

        })

    })

}
let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender){
                resolve({
                    errCode:2,
                    message:'Mising requied parament'
                })
            }
            let user=await db.User.findOne({
                where:{id:data.id},
                raw:false,
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address
                user.roleId=data.roleId
                user.positionId=data.positionId
                user.gender=data.gender
                user.phoneNumber=data.phoneNumber
                if(data.avatar){
                    user.image=data.avatar

                }
                

                await user.save()
                resolve({
                    errCode:0,
                    message:'Update user success!'
                })
            }else{
                resolve({
                    errCode:1,
                    message:'User not found'
                })
            }
            
        } catch (error) {
            reject(error)
            
        }
    })

}
let getAllCodeService=(inputType)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!inputType){
                resolve({
                    errCode:1,
                    errMessage:'Mising requied parment'
                })

            }else{
                let res={}
                let addcode=await db.Allcode.findAll({
                where:{type:inputType}
                });
                res.errCode=0;
                res.data=addcode;
                resolve(res)

            }
            
        } catch (error) {
            reject(error)
            
        }
    })
}
module.exports={
    handleUserLogin:handleUserLogin,
    getAllUser:getAllUser,
    createNewUser:createNewUser,
    deleteNewUser:deleteNewUser,
    updateUserData:updateUserData,
    getAllCodeService:getAllCodeService,
}