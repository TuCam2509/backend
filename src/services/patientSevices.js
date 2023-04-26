import { reject } from 'lodash';
import db from '../models/index'
require('dotenv').config()
import emailService from './emailServices'
import { v4 as uuidv4 } from 'uuid';

let buildEmailUrl=(doctorId,token)=>{
     let result=`${process.env.URLREACT}/verify-booking?token=${token}&doctorId=${doctorId}`


    return result
}

let postBookingAppoiment=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.email || !data.doctorId || !data.timeType 
                || !data.date || !data.fullName || !data.selectedGernders || !data.address || !data.reason){
                resolve({
                    errCode:-1,
                    errMessage:"Mising parameter"
                })
            }else{
                let token=uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                await emailService.sendEmail({
                    receiverEmail:data.email,
                    patientName:data.fullName,
                    time:data.timeString,
                    doctorName:data.doctorName,
                    language:data.language,
                    redirectLink:buildEmailUrl(data.doctorId,token)

                })
                //hàm nếu không tìm thấy sẽ tự động create và trả ra instrace (class) là obj của sequelize không phải js
                let user=await db.User.findOrCreate({
                    where: { email:data.email },
                    defaults: {
                      email:data.email,
                      roleId:'R3',
                      gender:data.selectedGernders,
                      address:data.address,
                      reason:data.reason,
                      firstName:data.fullName
                    }
                  })
                  //create booking record
                  if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where:{
                            patientId:user[0].id
                        },
                        defaults:{
                            statusId:'S1',
                            doctorId:data.doctorId,
                            patientId:user[0].id,
                            date:data.date,
                            timeType:data.timeType,
                            token:token
                            
                        }

                    })
                  }

                  resolve({
                    errCode:0,
                    errMessage:'Save info doctor success!'
                  })
            }
            
        } catch (error) {
            reject(error)
            
        }
    })

}
let postVerifyAppoiment=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.doctorId || !data.token){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter'
                })
            }else{
                let appoiment=await db.Booking.findOne({
                    where:{
                        doctorId:data.doctorId,
                        token:data.token,
                        statusId:'S1'
                    },
                    raw:false
                })
                if(appoiment){
                    appoiment.statusId='S2'
                    await appoiment.save()
                    resolve({
                        errCode:0,
                        errMessage:"Update appoiment success!"
                    })
                }else{
                    resolve({
                        errCode:2,
                        errMessage:"Appointment has been activated"
                    })
                }
            }
            
        } catch (error) {
            reject(error)
            
        }
    })
}



module.exports={
    postBookingAppoiment,
    postVerifyAppoiment
}