const requestsDao = require('../models/requests')
const usersDao = require('../models/users')
const redBlackTree = require('./redBlackTree')

const requestsCtrl = {}

/* MODULO GESTION DE SOLICITUDES ----------------------------------------------------- */
requestsCtrl.showViewRequests = (req, res) => {
  const requests = requestsDao.getAllRequests()
  const currentEmployee = usersDao.getCurrentEmployee()
  res.render('requests.ejs', {
    requests,
    currentEmployee
  })
}

requestsCtrl.requests = (req, res) => {
  const datetime = new Date().toLocaleString()
  const requests = requestsDao.getAllRequests()
  const {
    request_description,
    receiving_date,
    receiving_employee,
    delivery_employee,
    customer,
    devices,
    total_paid,
    total_spent,
    item,
    action,
    price,
    responsible_employee,
    id
  } = req.body
  const requestUpdated = {
    id: id,
    data: {
      isActive: false,
      request_description,
      receiving_date,
      receiving_employee,
      delivery_employee,
      customer,
      devices,
      total_paid,
      total_spent,
      total_net: Number(total_paid) - Number(total_spent),
      delivery_date: datetime,
      item,
      action,
      price,
      responsible_employee
    }
  }
  let position = undefined
  requests.forEach((request, index) => {
    if (request.id == requestUpdated.id) {
      position = index
    }
  })
  requests[position] = requestUpdated
  console.log(requestUpdated)
  console.log(requests[position])
  requestsDao.createRequest(requests)
  res.redirect('/requests')
}

module.exports = requestsCtrl
