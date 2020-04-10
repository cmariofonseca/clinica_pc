const { Router } = require('express')
const router = Router()

const usersCtrl = require('../controllers/users')
const devicesCtrl = require('../controllers/devices')
const requestsCtrl = require('../controllers/requests')
const reportsCtrl = require('../controllers/reports')


/* LOGIN EMPLEADOS ------------------------------------------------------------------- */
router.get('/login', usersCtrl.showViewLogin)

router.post('/login', usersCtrl.login)


/* REGISGTRO DE CLIENTES ------------------------------------------------------------- */
router.get('/registers', usersCtrl.showViewRegisters)

router.post('/registers', usersCtrl.registers)


/* MODULO GESTION DE RECEPCION DE EQUIPOS -------------------------------------------- */
router.get('/receptions', devicesCtrl.showViewReceptions)

router.post('/receptions', devicesCtrl.receptions)


/* MODULO GESTION DE SOLICITUDES ----------------------------------------------------- */
router.get('/requests', requestsCtrl.showViewRequests)

router.post('/request', requestsCtrl.requests)


/* MODULO GESTION DE REPORTES -------------------------------------------------------- */
router.get('/reports', reportsCtrl.showViewReports)

router.get('/reports-devices', reportsCtrl.devices)

router.get('/reports-requests', reportsCtrl.requests)

router.get('/reports-users', reportsCtrl.users)

module.exports = router
