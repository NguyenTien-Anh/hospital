import express from "express"
import { getHomePage, getCRUD } from "../controllers/homeControler"
import {
    handleLogin, handleGetAllUsers,
    handleCreateNewUser, handleEditUser,
    handleDeleteUser, getALLCode
} from "../controllers/userController"
import {
    getTopDoctorHome, getAllDoctor, postInfoDoctor,
    getDetailDoctorById, bulkCreateSchedule,
    getScheduleDoctorByDate, getExtraInfoDoctorById,
    getProfileDoctorById
} from "../controllers/doctorControler"
import { postBookAppointment, postVerifyBookAppointment } from '../controllers/patientControler'
import { createNewSpecialty, getAllSpecialty } from '../controllers/specialtyController'

let router = express.Router()

let initWebRouter = (app) => {
    // homeController
    router.get('/', getHomePage)
    router.get('/crud', getCRUD)

    // userController
    router.post('/api/login', handleLogin)
    router.get('/api/get-all-users', handleGetAllUsers)
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/edit-user', handleEditUser)
    router.delete('/api/delete-user', handleDeleteUser)
    router.get('/api/allcode', getALLCode)

    // doctorController
    router.get('/api/top-doctor-home', getTopDoctorHome)
    router.get('/api/get-all-doctor', getAllDoctor)
    router.post('/api/save-info-doctor', postInfoDoctor)

    // doctorController
    router.get('/api/get-detail-doctor-by-id', getDetailDoctorById)
    router.post('/api/bulk-create-schedule', bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', getScheduleDoctorByDate)
    router.get('/api/get-extra-info-doctor-by-id', getExtraInfoDoctorById)
    router.get('/api/get-profile-doctor-by-id', getProfileDoctorById)

    // patientController
    router.post('/api/patient-book-appointment', postBookAppointment)
    router.post('/api/verify-book-appointment', postVerifyBookAppointment)

    // specialtyController
    router.post('/api/create-new-specialty', createNewSpecialty)
    router.get('/api/get-all-specialty', getAllSpecialty)

    return app.use('/', router)
}

module.exports = initWebRouter