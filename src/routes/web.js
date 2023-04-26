import express from 'express';
import homeController from '../controller/homeController';
import useController from '../controller/useController';
import doctorController from '../controller/doctorController';
import patientController from '../controller/patientController';
import specialtyController from '../controller/SpecialtyController'
import clinicController from '../controller/clinicController'

let router=express.Router()

let initRouters=(app)=>{
    router.get('/',homeController.gethomeController)
    router.get('/test',homeController.gethomeAboutr)
    router.get('/crud',homeController.getCRUD)
    router.post('/post_crud',homeController.postCRUD)
    router.get('/get_crud',homeController.displayGetCRUD)
    router.get('/edit_crud',homeController.getEditCRUD)
    router.post('/put_crud',homeController.putEditCRUD)
    router.get('/delete_crud',homeController.deleteCRUD)
    router.post('/api/login',useController.handleLogin)
    router.get('/api/get_all_user',useController.handleGetAllUser)
    router.post('/api/create_new_user',useController.handleCreateNewUser)
    router.put('/api/edit_new_user',useController.handleEditNewUser)
    router.delete('/api/delete_new_user',useController.handleDeleteNewUser)
    router.get('/api/allcode',useController.getAllCode)
    router.get('/api/get-top-doctor',doctorController.getTopDoctorHome)
    router.get('/api/get-all-doctor',doctorController.getAllDoctor)
    router.post('/api/get-infor-doctor',doctorController.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id',doctorController.getDetailDoctorById)
    router.post('/api/bulk-create-schedule',doctorController.bulkCreateSchedule)
    router.get('/api/get-schedulebydate',doctorController.getScheduleDate)
    router.get('/api/get-detail-extra-doctor-by-id',doctorController.getDoctorInfoExtraById)
    router.get('/api/get-profile-doctor-by-id',doctorController.getProfileDoctorId)
    router.get('/api/get-list-patient-for-doctor',doctorController.getListPatientForDoctor)
    router.post('/api/patient-appoiment',patientController.postBookingAppoiment)
    router.post('/api/verify-patient-appoiment',patientController.postVerifyAppoiment)
    router.post('/api/create-specialty',specialtyController.createSpecialty)
    router.get('/api/get-specialty',specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id',specialtyController.getDetailSpecialtyById)
    router.post('/api/create-clinic',clinicController.createNewClinic)
    router.get('/api/get-clinic',clinicController.getAllClinic)
    router.get('/api/get-detail-clinic-by-id',clinicController.getDetailClinicById)
    router.post('/api/post-send',doctorController.SendRemedy)

     










    router.get('/fullstack',(req,res)=>{
        return res.send("Hello word fullstack")
    })


    return app.use('/',router)


}
module.exports=initRouters