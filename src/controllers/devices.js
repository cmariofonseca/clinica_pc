const usersDao = require('../models/users')
const devicesDao = require('../models/devices')
const requestsDao = require('../models/requests')

const devicesCtrl = {}

/* GENERADOR DE ID ALEATORIO --------------------------------------------------------- */
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(100))
}


/* MODULO GESTION DE RECEPCION DE EQUIPOS -------------------------------------------- */
devicesCtrl.showViewReceptions = (req, res) => {
  const id = getRandomInt()
  const currentCustomer = usersDao.getCurrentCustomer()
  res.render('receptions.ejs', {
    currentCustomer,
    id
  })
}

devicesCtrl.receptions = (req, res) => {
  const datetime = new Date().toLocaleString()
  let devices = []
  devices = devicesDao.getAllDevices()
  let requests = []
  requests = requestsDao.getAllRequests()
  const currentCustomer = usersDao.getCurrentCustomer()
  const currentEmployee = usersDao.getCurrentEmployee()
  const newRequest = {
    id: req.body.id,
    data: {
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
      responsible_employee: ""
    }
  }
  const newDevice = {
    id: req.body.id,
    data: {
      request_description: req.body.request_description,
      serial: req.body.serial,
      brand: req.body.brand,
      model: req.body.model,
      processor: req.body.processor,
      ram: req.body.ram,
      disk: req.body.disk,
      os: req.body.os,
      office: req.body.office,
      owner: req.body.owner
    }
  }
  devices.push(newDevice)
  requests.push(newRequest)
  devicesDao.createDevice(devices)
  devicesDao.saveReportDevices()
  requestsDao.createRequest(requests)
  requestsDao.saveReportRequests()
  res.redirect('/registers')
}

module.exports = devicesCtrl
