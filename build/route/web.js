"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeControler = require("../controllers/homeControler");
var _userController = require("../controllers/userController");
var _doctorControler = require("../controllers/doctorControler");
var _patientControler = require("../controllers/patientControler");
var _specialtyController = require("../controllers/specialtyController");
var _clinicControler = require("../controllers/clinicControler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initWebRouter = function initWebRouter(app) {
  // homeController
  router.get('/', _homeControler.getHomePage);
  router.get('/crud', _homeControler.getCRUD);

  // userController
  router.post('/api/login', _userController.handleLogin);
  router.get('/api/get-all-users', _userController.handleGetAllUsers);
  router.post('/api/create-new-user', _userController.handleCreateNewUser);
  router.put('/api/edit-user', _userController.handleEditUser);
  router["delete"]('/api/delete-user', _userController.handleDeleteUser);
  router.get('/api/allcode', _userController.getALLCode);

  // doctorController
  router.get('/api/top-doctor-home', _doctorControler.getTopDoctorHome);
  router.get('/api/get-all-doctor', _doctorControler.getAllDoctor);
  router.post('/api/save-info-doctor', _doctorControler.postInfoDoctor);

  // doctorController
  router.get('/api/get-detail-doctor-by-id', _doctorControler.getDetailDoctorById);
  router.post('/api/bulk-create-schedule', _doctorControler.bulkCreateSchedule);
  router.get('/api/get-schedule-doctor-by-date', _doctorControler.getScheduleDoctorByDate);
  router.get('/api/get-extra-info-doctor-by-id', _doctorControler.getExtraInfoDoctorById);
  router.get('/api/get-profile-doctor-by-id', _doctorControler.getProfileDoctorById);
  router.post('/api/send-remedy', _doctorControler.sendRemedy);
  router.get('/api/get-list-patient-for-doctor', _doctorControler.getListPatientForDoctor);

  // patientController
  router.post('/api/patient-book-appointment', _patientControler.postBookAppointment);
  router.post('/api/verify-book-appointment', _patientControler.postVerifyBookAppointment);

  // specialtyController
  router.post('/api/create-new-specialty', _specialtyController.createNewSpecialty);
  router.get('/api/get-all-specialty', _specialtyController.getAllSpecialty);
  router.get('/api/get-detail-specialty-by-id', _specialtyController.getDetailSpecialtyById);

  // clinicController
  router.post('/api/create-new-clinic', _clinicControler.createNewClinic);
  router.get('/api/get-all-clinic', _clinicControler.getAllClinic);
  router.get('/api/get-detail-clinic-by-id', _clinicControler.getDetailClinicById);
  return app.use('/', router);
};
module.exports = initWebRouter;