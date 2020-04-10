const { v4: uuidv4 } = require('uuid')
const usersDao = require('../models/users')
const devicesDao = require('../models/devices')
const requestsDao = require('../models/requests')

const devicesCtrl = {}

/* MODULO GESTION DE RECEPCION DE EQUIPOS -------------------------------------------- */
devicesCtrl.showViewReceptions = (req, res) => {
  const code = uuidv4()
  const currentCustomer = usersDao.getCurrentCustomer()
  res.render('receptions.ejs', {
    currentCustomer,
    code
  })
}

devicesCtrl.receptions = (req, res) => {
  const datetime = new Date().toLocaleString()
  let devices = []
  devices = devicesDao.getAllDevices()
  console.log('11111111111111111111111111111111111111111111111111111')
  console.log(devices)
  let requests = []
  requests = requestsDao.getAllRequests()
  console.log('22222222222222222222222222222222222222222222222222222')
  console.log(requests)
  const currentCustomer = usersDao.getCurrentCustomer()
  const currentEmployee = usersDao.getCurrentEmployee()
  const newRequest = {
    isActive: true,
    request_description: req.body.request_description,
    receiving_date: datetime,
    receiving_employee: currentEmployee.name + ' ' + currentEmployee.last_name,
    delivery_employee: "",
    customer: currentCustomer.name + ' ' + currentCustomer.last_name,
    total_paid: "",
    total_spent: "",
    total_net: "",
    delivery_date: "",
    item: "",
    action: "",
    price: "",
    responsible_employee: "",
    code: req.body.code
  }
  devices.push(req.body)
  requests.push(newRequest)
  devicesDao.createDevice(devices)
  devicesDao.saveReportDevices()
  requestsDao.createRequest(requests)
  requestsDao.saveReportRequests()
  res.redirect('/registers')
}

module.exports = devicesCtrl
