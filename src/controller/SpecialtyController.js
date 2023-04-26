import specialtyServices from '../services/specialtyServices'
let createSpecialty=async(req,res)=>{
    try {
        let info=await specialtyServices.createSpecialty(req.body)
        return res.status(200).json(info)
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }



}
let getAllSpecialty=async(req,res)=>{
    try {
        let info=await specialtyServices.getAllSpecialty()
        return res.status(200).json(info)

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }

}
let getDetailSpecialtyById=async(req,res)=>{
    try {
        let info=await specialtyServices.getDetailSpecialtyById(req.query.id,req.query.location)
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
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty,
    getDetailSpecialtyById:getDetailSpecialtyById

}