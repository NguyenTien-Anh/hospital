import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit
    if (limit === 'undefined') limit = 10
    try {
        let data = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server ..."
        })
    }
}

module.exports = {
    getTopDoctorHome,
}