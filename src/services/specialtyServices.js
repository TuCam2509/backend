
import { reject } from 'lodash'
import db from '../models/index'
let createSpecialty=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.name || !data.prevImgUrl || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter!'
                })
            }else{
              await db.specialies.create({
                name:data.name,
                image:data.prevImgUrl,
                descriptionHTML:data.descriptionHTML,
                descriptionMarkdown:data.descriptionMarkdown

               })
                
                resolve({
                  
                    errCode:0,
                    errMessage:'Ok'
                })
            }
            
        } catch (error) {
            reject(error)
            
        }
    })


}
let getAllSpecialty=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data=await db.specialies.findAll({
            })
            if(data && data.length>0){
                {data.map(item=>{
                    item.image= Buffer.from(item.image,'base64').toString('binary')//ép kiểu từ dạng thập phân sang string để có thể hiển thị ra màn hình
                    return item
                })}
            }
            resolve({
                errCode:0,
                errMessage:'ok',
                data
            })
            
        } catch (error) {
            reject(error)
            
        }
    })
   

}
let getDetailSpecialtyById=(inputId,location)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!inputId || !location){
                resolve({
                    errCode:-1,
                    errMessage:'Mising parementer!'
                })
            }else{
                     let data=await db.specialies.findOne({
                        where:{
                            id:inputId
                        },
                        attributes:['descriptionHTML','descriptionMarkdown']
                    })

                    if(data){
                        let doctorspecialtyId=[]
                        if(location==='ALL'){
                            doctorspecialtyId=await db.Doctor_info.findAll({
                               where:{
                                   specialtyId:inputId
                               },
                               attributes:['doctorId','provienceId']
   
                           })
                        }else{
                            doctorspecialtyId=await db.Doctor_info.findAll({
                                where:{
                                    specialtyId:inputId,
                                    provienceId:location
                                },
                                attributes:['doctorId','provienceId']
    
                            })

                        }
                        data.doctorspecialtyId=doctorspecialtyId
    
                    }else{
                        data={}
                    }
                    resolve({
                        errCode:0,
                        errMessage:'ok',
                        data
                    })
            }
            
        } catch (error) {
            reject(error)
            
        }
    })
}
module.exports={
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty,
    getDetailSpecialtyById:getDetailSpecialtyById,
}