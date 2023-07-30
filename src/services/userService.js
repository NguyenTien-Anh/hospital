import db from '../models/index'

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleID'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = password === user.password
                    if (check) {
                        userData.errCode = 0
                        userData.message = `OK`
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.message = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMesage = `User isn't found`
                }
            } else {
                userData.errCode = 1
                userData.message = "Your email isn't exist in system. Plz try other one."
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin
}