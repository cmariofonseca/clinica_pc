const reportsCtrl = {}
const usersDao = require('../models/users')
const devicesDao = require('../models/devices')
const requestsDao = require('../models/requests')

reportsCtrl.showViewReports = (req, res) => {
  res.render('reports.ejs')
}

reportsCtrl.devices = (req, res) => {
  devicesDao.getReportDevices(res)
}

reportsCtrl.requests = (req, res) => {
  requestsDao.getReportRequests(res)
}

reportsCtrl.users = (req, res) => {
  usersDao.getReportUsers(res)
}

module.exports = reportsCtrl
