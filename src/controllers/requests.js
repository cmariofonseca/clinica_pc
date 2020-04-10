const requestsDao = require('../models/requests')
const usersDao = require('../models/users')

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
    code
  } = req.body
  const requestUpdated = {
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
    responsible_employee,
    code
  }
  let position = undefined
  requests.forEach((request, index) => {
    if (request.code == requestUpdated.code) {
      position = index
    }
  })
  requests[position] = requestUpdated
  requestsDao.createRequest(requests)
  res.redirect('/requests')
}

module.exports = requestsCtrl
