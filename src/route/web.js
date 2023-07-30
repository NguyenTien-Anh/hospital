import express from "express"
import { getHomePage, getCRUD } from "../controllers/homeControler"
import { handleLogin } from "../controllers/userController"

let router = express.Router()

let initWebRouter = (app) => {
    router.get('/', getHomePage)
    router.get('/crud', getCRUD)

    router.post('/api/login', handleLogin)
    return app.use('/', router)
}

module.exports = initWebRouter