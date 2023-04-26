
import db from '../models/index'
let getAllClinic=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.name || !data.prevImgUrl || !data.descriptionHTML || !data.descriptionMarkdown || !data.address){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter!'
                })
            }else{
              await db.Clinic.create({
                name:data.name,
                address:data.address,
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
let getAllClinicSevice=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let data=await db.Clinic.findAll({
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
let getDetailClinicById=(inputId)=>{
    return new Promise(async(resolve,reject)=>{
        if(!inputId){
            resolve({
                errCode:-1,
                errMessage:'Mising parementer!'
            })
        }else{
                 let data=await db.Clinic.findOne({
                    where:{
                        id:inputId
                    },
                    attributes:['name','address','descriptionHTML','descriptionMarkdown']
                })

                if(data){
                    let doctorClinicId=[]
                  
                        doctorClinicId=await db.Doctor_info.findAll({
                           where:{
                               clinicId:inputId
                           },
                           attributes:['doctorId','provienceId']

                       })
                    data.doctorClinicId=doctorClinicId

                }else{
                    data={}
                }
                resolve({
                    errCode:0,
                    errMessage:'ok',
                    data
                })
        }

    })
}
module.exports={
    getAllClinic,
    getAllClinicSevice,
    getDetailClinicById
}