import clinicservices from '../services/clinicServices'
let createNewClinic=async(req,res)=>{
    try {
        let info=await clinicservices.getAllClinic(req.body)
        return res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })
        
    }

}
let getAllClinic=async(req,res)=>{
    try {
        let info=await clinicservices.getAllClinicSevice()
        return res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })
        
    }



}
let getDetailClinicById=async(req,res)=>{
    try {
        let info=await clinicservices.getDetailClinicById(req.query.id)
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
    createNewClinic:createNewClinic,
    getAllClinic:getAllClinic,
    getDetailClinicById:getDetailClinicById
}