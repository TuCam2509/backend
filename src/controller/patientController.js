import patientSevices from '../services/patientSevices'
let postBookingAppoiment=async(req,res)=>{
    try {
        let info=await patientSevices.postBookingAppoiment(req.body)
        return res.status(200).json(info)
       

        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form the sever'
        })

        
    }


}
let postVerifyAppoiment=async(req,res)=>{
    try {
        let info=await patientSevices.postVerifyAppoiment(req.body)
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
    postBookingAppoiment:postBookingAppoiment,
    postVerifyAppoiment:postVerifyAppoiment

}