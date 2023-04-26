import db from '../models/index'
import CRUDServices from '../services/CRUDServices'
let gethomeController= async (req,res)=>{
    try {
        let data=await db.User.findAll()
        console.log('---------------------------------')
        console.log(data)
        console.log('---------------------------------')

        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        });
        
    } catch (error) {
        console.log(error)
    }

}
let gethomeAboutr=(req,res)=>{
    return res.render('test/About.ejs');

}
let getCRUD=(req,res)=>{
    return res.render('crud.ejs')
}
let postCRUD= async(req,res)=>{
   let message= await CRUDServices.createNewUser(req.body)
   console.log(message)
    return res.send('form server')
}
let displayGetCRUD=async(req,res)=>{
    let data=await CRUDServices.getAllUser()
    return res.render('getCrud.ejs',{
        dataTable:data
    })

}
let getEditCRUD=async(req,res)=>{
    let userId= req.query.id
    console.log(userId)
    if(userId){
        let userData=await CRUDServices.getUserInfoById(userId)
        //check user data
        return res.render('editCRUD.ejs',{
            user:userData
        })

        
    }else{
        return res.send('User not found')

    }
}
let putEditCRUD=async(req,res)=>{
    let data=req.body
    let allUsers=await CRUDServices.updateUserData(data)
    return res.render('getCrud.ejs',{
        dataTable:allUsers
    })


}
let deleteCRUD=async(req,res)=>{
    let id=req.query.id
    if(id){
        await CRUDServices.deleteUserById(id)
        return res.send('Delete user success!')
    }else{
        return res.send('User not found')

    }
}


module.exports={
gethomeController:gethomeController,
gethomeAboutr:gethomeAboutr,
getCRUD:getCRUD,
postCRUD:postCRUD,
displayGetCRUD:displayGetCRUD,
getEditCRUD:getEditCRUD,
putEditCRUD:putEditCRUD,
deleteCRUD:deleteCRUD,
}
