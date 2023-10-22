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
import { postBookAppointment } from '../controllers/patientControler'

let router = express.Router()

let initWebRouter = (app) => {
    router.get('/', getHomePage)
    router.get('/crud', getCRUD)

    router.post('/api/login', handleLogin)
    router.get('/api/get-all-users', handleGetAllUsers)
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/edit-user', handleEditUser)
    router.delete('/api/delete-user', handleDeleteUser)
    router.get('/api/allcode', getALLCode)

    router.get('/api/top-doctor-home', getTopDoctorHome)
    router.get('/api/get-all-doctor', getAllDoctor)
    router.post('/api/save-info-doctor', postInfoDoctor)

    router.get('/api/get-detail-doctor-by-id', getDetailDoctorById)
    router.post('/api/bulk-create-schedule', bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', getScheduleDoctorByDate)
    router.get('/api/get-extra-info-doctor-by-id', getExtraInfoDoctorById)
    router.get('/api/get-profile-doctor-by-id', getProfileDoctorById)

    // patientControler
    router.post('/api/patient-book-appointment', postBookAppointment)

    return app.use('/', router)
}

module.exports = initWebRouter