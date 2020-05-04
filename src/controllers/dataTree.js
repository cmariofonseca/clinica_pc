const requestsDao = require('../models/requests')
const usersDao = require('../models/users')
const devicesDao = require('../models/devices')
const BinaryTree = require('./binaryTree')

const binaryTree = new BinaryTree()
const dataTreeCtrl = {}

/* MODULO MOSTRAR DATOS EN ARBOL BINARIO --------------------------------------------- */

binaryTree.addRecursive()
binaryTree.findRecursive()
dataTreeCtrl.showViewDataTree = (req, res) => {
  const customers = usersDao.getAllCustomers()
  const requests = requestsDao.getAllRequests()
  const devices = devicesDao.getAllDevices()
  const customersTree = false
  const requestsTree = false
  const devicesTree = false
  res.render('dataTRee.ejs', {
    customers,
    requests,
    devices,
    customersTree,
    requestsTree,
    devicesTree
  })
}

module.exports = dataTreeCtrl
