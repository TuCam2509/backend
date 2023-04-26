
import { raw } from 'body-parser'
import db from '../models/index'
require('dotenv').config()
import _, { reject, replace } from 'lodash'
import emailService from '../services/emailServices'
const MAX_NUMBER_SCHDULE=process.env.MAXNUMBERSCHEDULE
let getTopDoctorHome=(limitInput)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let users=await db.User.findAll({
                limit:limitInput,
                where:{roleId:'R2'},
                order:[['createdAt','DESC']],
                attributes:{
                    exclude:['password']
                },
                include:[
                    {model:db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                    {model:db.Allcode,as:'genderData',attributes:['valueEn','valueVi']},

                ],
                raw:true,
                nest:true
            })
            resolve({
                errCode:0,
                data:users
            })

  
        } catch (error) {
            reject(error)
        }

    })
}
let getAllDoctor=()=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let doctors=await db.User.findAll({
                where:{roleId:'R2'},
                attributes:{
                    exclude:['password','image']
                }
            })
            resolve({
                errCode:0,
                data:doctors
            })
        } catch (error) {
            reject(error)
            
        }
    })

}
let checkRequiedFileds=(inputData)=>{
    let arr=['doctorId','contentMarkDown','contentHTML','action',
    'selectePrice','selectesPay','selectedProvider','nameClinic','addressClinic',
    'specialtyId'
]
let isVail=true
let element=''
for(let i=0;i<arr.length>0;i++){
    if(!inputData[arr[i]]){
        isVail=false
        element=arr[i]
        break;

    }
}
return {
    isVail:isVail,
    element:element,
}
}
let postDetailInforService=(inputData)=>{
    return new Promise(async(resolve,reject)=>{
        try {

            let obj=checkRequiedFileds(inputData)
            if(obj.isVail===false){
                resolve({
                    errCode:1,
                    errMessage:`Mising parament: ${obj.element}`
                })
            }else{
                if(inputData.action==='CREATE'){
                    await db.Markdown.create({
                        contentHTML:inputData.contentHTML,
                        contentMarkDown:inputData.contentMarkDown,
                        description	:inputData.description,
                        doctorId:inputData.doctorId,

                })
            }else if(inputData.action==='EDIT'){
                let doctorMarkdown=await db.Markdown.findOne({
                    where:{doctorId:inputData.doctorId},
                    raw:false

                })
                if(doctorMarkdown){
                    doctorMarkdown.contentHTML=inputData.contentHTML;
                    doctorMarkdown.contentMarkDown=inputData.contentMarkDown;
                    doctorMarkdown.description	=inputData.description;
                    await doctorMarkdown.save()

                }
            }
            //upsert doctor info
            let doctorInfo=await db.Doctor_info.findOne({
                where:{
                    doctorId:inputData.doctorId,
                },
                raw:false
            })
            if(doctorInfo){
                //update
                doctorInfo.priceId=inputData.selectePrice;
                doctorInfo.paymentId=inputData.selectesPay;
                doctorInfo.provienceId=inputData.selectedProvider;
                doctorInfo.nameClinic=inputData.nameClinic;
                doctorInfo.addressClinic=inputData.addressClinic;
                doctorInfo.note=inputData.note;
                doctorInfo.specialtyId=inputData.specialtyId
                doctorInfo.clinicId=inputData.clinicId

                await doctorInfo.save()
            }else{
                await db.Doctor_info.create({
                    doctorId:inputData.doctorId,
                    priceId:inputData.selectePrice,
                    paymentId:inputData.selectesPay,
                    provienceId:inputData.selectedProvider,
                    nameClinic:inputData.nameClinic,
                    addressClinic:inputData.addressClinic,
                    specialtyId:inputData.specialtyId,
                    clinicId:inputData.clinicId
                    
                    
            })

            }
                resolve({
                    errCode:0,
                    errMessage:'Save infor doctor success'
                })
            }

            
        } catch (error) {
            reject(error)
            
        }
    })
}
let  getDetailDoctorById=(inputId)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!inputId){
                resolve({
                    errCode:1,
                    errMessage:'Mising paramenter'
                })
               
            }else{
                let data=await db.User.findOne({
                    where:{id:inputId},
                    attributes:{
                        exclude:['password']
                    },
                    include:[
                        {
                            model:db.Markdown,
                            attributes:['description','contentHTML','contentMarkDown']
                        },
                        {model:db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                        {
                            model:db.Doctor_info,
                            //attributes:['description','contentHTML','contentMarkDown']
                            attributes:{
                                exclude:['id','doctorId']
                            },
                            include:[
                                {model:db.Allcode,as:'priceTypeData',attributes:['valueEn','valueVi']},
                                {model:db.Allcode,as:'payTypeData',attributes:['valueEn','valueVi']},
                                {model:db.Allcode,as:'proTypeData',attributes:['valueEn','valueVi']},

                            ]

                        },
                        

                    ],
                    raw:false,
                    nest:true
                   
                    
                })
                //if(data && data.image){
                    
                  // data.image= new Buffer(data.image,'base64'.toString('binary'))


                   
                //}
                
                resolve({
                    errCode:0,
                    data:data
                })
            }

            
        } catch (error) {
            reject(error)
            
        }
    })

}
let bulkCreateSchedule=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.arrSchedule || !data.doctorId || !data.formatDate){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter!'
                })
            }else{
                let schedule=data.arrSchedule
                if(schedule && schedule.length>0){
                    schedule=schedule.map(item=>{
                        item.maxNumber=MAX_NUMBER_SCHDULE
                        return item;
                    })
                }
                let existing=await db.Schedule.findAll(
                    {
                    where:{doctorId:data.doctorId,date:data.formatDate},
                    attributes:['timeType','date','doctorId','maxNumber'],
                    raw:true
                }
                )
                let toCreate=_.differenceWith(schedule,existing,(a,b)=>{
                    return a.timeType===b.timeType && +a.date=== +b.date;
                })
                 if(toCreate && toCreate.length>0){
                     await db.Schedule.bulkCreate(toCreate)
                 }
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
let getScheduleDate=(doctorId,date)=>{
    return new  Promise(async(resolve,reject)=>{
        try {
            if(!doctorId || !date){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter'
                })
            }else{
                let dataSchedule=await db.Schedule.findAll({
                    where:{
                        doctorId:doctorId,
                        date:date
                    },
                    include:[

                        {model:db.Allcode,as:'timeTypeData',attributes:['valueEn','valueVi']},
                        {model:db.User,as:'doctorData',attributes:['firstName','lastName']},

                    ],
                    raw:false,
                    nest:true,
                })
                if(!dataSchedule) dataSchedule=[]

                resolve({
                    errCode:0,
                    data:dataSchedule
                })
            }
            
        } catch (error) {
            reject(error)
            
        }


    })
}
let getExtraInfoDoctor=(idInput)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!idInput){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter'
                })
            }else{
                let data=await db.Doctor_info.findOne({
                   where:{
                       doctorId:idInput
                   },
                   attributes:{
                    exclude:['id','doctorId']
                },
                include:[
                    {model:db.Allcode,as:'priceTypeData',attributes:['valueEn','valueVi']},
                    {model:db.Allcode,as:'payTypeData',attributes:['valueEn','valueVi']},
                    {model:db.Allcode,as:'proTypeData',attributes:['valueEn','valueVi']},

                ],
                raw:false,
                nest:true

                })
                if(!data) data={}

                resolve({
                    errCode:0,
                    data:data
                })
            }

            
        } catch (error) {
            reject(error)
            
        }
    })

}
let  getProfileDoctorId=(idInput)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!idInput){
                resolve({
                    errCode:-1,
                    errMessage:'Mising paramenter!'
                })
            }else{
                let data=await db.User.findOne({
                    where:{id:idInput},
                    attributes:{
                        exclude:['password']
                    },
                    include:[
                         {
                            model:db.Markdown,
                            attributes:['description','contentHTML','contentMarkDown']
                        },
                        {model:db.Allcode,as:'positionData',attributes:['valueEn','valueVi']},
                        {
                            model:db.Doctor_info,
                            //attributes:['description','contentHTML','contentMarkDown']
                            attributes:{
                                exclude:['id','doctorId']
                            },
                            include:[
                                {model:db.Allcode,as:'priceTypeData',attributes:['valueEn','valueVi']},
                                {model:db.Allcode,as:'payTypeData',attributes:['valueEn','valueVi']},
                                {model:db.Allcode,as:'proTypeData',attributes:['valueEn','valueVi']},

                            ]

                        },

                    ],
                    raw:false,
                    nest:true
                   
                    
                })
                 if(data && data.image){
                    
                   data.image= Buffer.from(data.image,'base64').toString('binary')
                }
                resolve({
                   errCode:0,
                   data:data
               })
             }
               


            
        } catch (error) {
            reject(error)
            
        }
    })

}
let getListPatientForDoctor=(doctorId,date)=>{
         return new Promise(async(resolve,reject)=>{
            try {
                if(!doctorId || !date){
                    resolve({
                        errCode:-1,
                        errMessage:'Mising paramenter!'
                    })
                }else{
                    let data=await db.Booking.findAll({
                        where:{
                            statusId:'S2',
                            doctorId:doctorId,
                            date:date
                        },
                        include:[
                            {
                               model:db.User,as:'patientData',
                               attributes:['email','firstName','address','gender','reason'],
                               include:[
                                {model:db.Allcode,as:'genderData',attributes:['valueEn','valueVi']},
                               ]
                           },
                           {
                            model:db.Allcode,as:'timeTypeDataPatient',attributes:['valueEn','valueVi']
                           }
                        ],
                        raw:false,
                        nest:true
                    })
                    resolve({
                        errCode:0,
                        data:data
                    })
                }
                
            } catch (error) {
                reject(error)
                
            }
         })
}
let SendRemedy=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(!data.email || !data.doctorId || !data.patientId || !data.timeType){
                resolve({
                    errCode:-1,
                    errMessage:"Mising paramenter"
                })
            }else{
                let appoiment=await db.Booking.findOne({
                    where:{
                        doctorId:data.doctorId,
                        patientId:data.patientId,
                        timeType:data.timeType,
                        statusId:'S2'
                    },
                    raw:false
                })
                if(appoiment){
                   appoiment.statusId='S3'
                    await appoiment.save()

                }
                await emailService.Attechment(data)
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
module.exports={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctor:getAllDoctor,
    postDetailInforService:postDetailInforService,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleDate:getScheduleDate,
    getExtraInfoDoctor:getExtraInfoDoctor,
    getProfileDoctorId:getProfileDoctorId,
    getListPatientForDoctor:getListPatientForDoctor,
    SendRemedy:SendRemedy
}