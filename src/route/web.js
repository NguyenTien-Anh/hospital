import express from "express"
import { getHomePage, getCRUD } from "../controllers/homeControler"
import {
    handleLogin, handleGetAllUsers,
    handleCreateNewUser, handleEditUser,
    handleDeleteUser, getALLCode
} from "../controllers/userController"
import {
    getTopDoctorHome, getAllDoctor, postInfoDoctor,
    getDetailDoctorById
} from "../controllers/doctorControler"

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
    return app.use('/', router)
}

module.exports = initWebRouter