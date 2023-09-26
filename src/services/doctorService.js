import db from '../models/index'

let getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let postInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentHtml || !data.contentMarkdown ||
                !data.action) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing input parameter!`
                })
            } else {
                if (data.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHtml: data.contentHtml,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId,
                    })
                } else if (data.action === 'EDIT') {
                    let markdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId },
                        raw: false,
                    })

                    // console.log('check markdown: ', markdown)

                    if (markdown) {
                        markdown.contentHtml = data.contentHtml
                        markdown.contentMarkdown = data.contentMarkdown
                        markdown.description = data.description

                        await markdown.save()
                    }
                }

            }
            resolve({
                errCode: 0,
                errMessage: 'Save info doctor succedd!'
            })
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter!'
                })
            } else {
                let detailDoctor = await db.User.findOne({
                    where: { id },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown',
                                'description',
                            ]
                        },
                        {
                            model: db.Allcode,
                            as: 'positionData',
                            attributes: ['valueEn', 'valueVi']
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (detailDoctor && detailDoctor.image) {
                    detailDoctor.image = new Buffer(detailDoctor.image, 'base64').toString('binary')
                }

                if (!detailDoctor) data = {}

                resolve({
                    errCode: 0,
                    data: detailDoctor
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let getDetailDoctorMarkdown = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter!'
                })
            } else {
                let detailDoctorMarkdown = await db.Markdown.findOne({
                    where: { doctorId: id },
                    attributes: ['contentHtml', 'contentMarkdown', 'description'],
                })

                // if (!detailDoctorMarkdown) detailDoctorMarkdown = {}

                resolve({
                    errCode: 0,
                    data: detailDoctorMarkdown
                })
            }
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHome, getAllDoctor, postInfoDoctor, getDetailDoctorById,
    getDetailDoctorMarkdown
}