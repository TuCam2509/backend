import userService from '../services/useService'
let handleLogin=async(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:'Mising inputs parments'
        })

    }
    let userData=await userService.handleUserLogin(email,password);


    return res.status(200).json({
        errCode:userData.errCode,
        message:userData.errMessage,
        user:userData.user ? userData.user :{}
    })

}
let handleGetAllUser=async(req,res)=>{
    let id=req.query.id
    if(!id){
        return res.status(200).json({
            errCode:1,
            errMessage:'Mising requied paraments',
            user:[]
        })

    }
    let user=await userService.getAllUser(id)
    return res.status(200).json({
        errCode:0,
        errMessage:'OK',
        user
    })

}
let handleCreateNewUser=async(req,res)=>{
    let message=await userService.createNewUser(req.body)
    return res.status(200).json(message)
}
let handleEditNewUser=async(req,res)=>{
    let data=req.body
    let message=await userService.updateUserData(data)
    return res.status(200).json(message)
    

}
let handleDeleteNewUser=async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:'Missing requid parament',
        })

    }
    let message=await userService.deleteNewUser(req.body.id)
    return res.status(200).json(message)


}
let getAllCode=async(req,res)=>{
    try {
      
            let data=await userService.getAllCodeService(req.query.type);
            return res.status(200).json(data)
      
    } catch (e) {
        console.log('Get all code error',e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from sever'
        })
        
    }

}

module.exports={
    handleLogin:handleLogin,
    handleGetAllUser:handleGetAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleEditNewUser:handleEditNewUser,
    handleDeleteNewUser:handleDeleteNewUser,
    getAllCode:getAllCode,

}