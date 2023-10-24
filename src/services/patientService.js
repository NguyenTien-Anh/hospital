import { identity } from 'lodash'
import db from '../models/index'
import emailService from './mailService'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Nguyễn Tiến Anh',
                    time: '9:00 - 10:00 - Thứ 2 - 24/10/2023',
                    doctorName: 'Nguyễn Tiến Anh',
                    redirectLink: 'https://github.com/NguyenTien-Anh'
                })

                // upsert
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                console.log('check user: ', user[0])
                // create booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.id,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }


                resolve({
                    errCode: 0,
                    errMessage: 'Save info patient succeed!'
                })
            }
        }
        catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment
}