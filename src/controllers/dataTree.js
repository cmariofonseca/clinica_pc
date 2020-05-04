const requestsDao = require('../models/requests')
const usersDao = require('../models/users')
const devicesDao = require('../models/devices')
const BinaryTree = require('./binaryTree')

const dataTreeCtrl = {}

/* MODULO MOSTRAR DATOS EN ARBOL BINARIO --------------------------------------------- */
dataTreeCtrl.showViewDataTreeCustomers = (req, res) => {
  const binaryTree = new BinaryTree()
  const customers = usersDao.getAllCustomers()
  for (let index = 0; index < customers.length; index++) {
    const customer = customers[index]
    console.log(customer.id)
    binaryTree.addRecursive(customer)
  }
  const customersTree = binaryTree.findRecursive(35)
  console.log('customersTree ************************************************')
  console.log(customersTree)
  res.render('dataTReeCustomers.ejs', {
    customersTree
  })
}

dataTreeCtrl.showViewDataTreeRequests = (req, res) => {
  const binaryTree = new BinaryTree()
  const requests = requestsDao.getAllRequests()
  for (let index = 0; index < requests.length; index++) {
    const request = requests[index]
    console.log(request.id)
    binaryTree.addRecursive(request)
  }
  const requestsTree = binaryTree.findRecursive(30)
  console.log('requestsTree *************************************************')
  console.log(requestsTree)
  res.render('dataTReeRequests.ejs', {
    requestsTree
  })
}

dataTreeCtrl.showViewDataTreeDevices = (req, res) => {
  const binaryTree = new BinaryTree()
  const devices = devicesDao.getAllDevices()
  for (let index = 0; index < devices.length; index++) {
    const device = devices[index]
    console.log(device.id)
    binaryTree.addRecursive(device)
  }
  const devicesTree = binaryTree.findRecursive(30)
  console.log('devicesTree **************************************************')
  console.log(devicesTree)
  res.render('dataTReeDevices.ejs', {
    devicesTree
  })
}

module.exports = dataTreeCtrl
