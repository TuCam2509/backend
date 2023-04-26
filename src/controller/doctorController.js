import doctorService from '../services/doctorService'
let getTopDoctorHome=async(req,res)=>{
    let limit=req.query.limit
    if(!limit) limit=10
    try {
        let doctor=await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(doctor)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:"Error from sever..."
        })
        
    }

}
let getAllDoctor=async(req,res)=>{
    try {
        let doctors=await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })
        
    }

}
let postInforDoctor=async(req,res)=>{
    try {
        let response=await doctorService.postDetailInforService(req.body)
        return res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })
        
    }

}
let getDetailDoctorById=async(req,res)=>{
    try {
        let info=await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }

}
let bulkCreateSchedule=async(req,res)=>{
    try {
        let info=await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })


        
    }

}
let getScheduleDate=async(req,res)=>{
    try {
        let info=await doctorService.getScheduleDate(req.query.doctorId,req.query.date)
        return res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })


        
    }


}
let getDoctorInfoExtraById=async(req,res)=>{
    try {
        let info=await doctorService.getExtraInfoDoctor(req.query.doctorId)
        return res.status(200).json(info)
       
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })


        
    }


}
let getProfileDoctorId=async(req,res)=>{
    try {
        let info=await doctorService.getProfileDoctorId(req.query.doctorId)
        return res.status(200).json(info)
       

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }

}
let getListPatientForDoctor=async(req,res)=>{
    try {
        let info=await doctorService.getListPatientForDoctor(req.query.doctorId,req.query.date)
        return res.status(200).json(info)

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })
        
    }

}
let SendRemedy=async(req,res)=>{
    try {
        let info=await doctorService.SendRemedy(req.body)
        return res.status(200).json(info)

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }

}
module.exports={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctor:getAllDoctor,
    postInforDoctor:postInforDoctor,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleDate:getScheduleDate,
    getDoctorInfoExtraById:getDoctorInfoExtraById,
    getProfileDoctorId:getProfileDoctorId,
    getListPatientForDoctor:getListPatientForDoctor,
    SendRemedy:SendRemedy

}