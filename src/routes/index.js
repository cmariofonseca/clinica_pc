const { Router } = require('express')
const router = Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const jsonToTxt = require('json-to-txt')

let datetime = ''
let currentUser = {}
let devices = []
let requests = []
let users = []
let devicesTxt = ''
let requestsTxt = ''
let usersTxt  = ''


/* LOGIN EMPLEADOS ------------------------------------------------------------------- */
router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.post('/login', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  let isLogin = false
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.user_name == req.body.user_name && user.password == req.body.password) {
      isLogin = true
      break
    } else {
      isLogin = false
    }
  }
  if (isLogin) {
    res.redirect('/registers')
  } else {
    res.redirect('/login')
  }
})


/* REGISGTRO DE CLIENTES ------------------------------------------------------------- */
router.get('/registers', (req, res) => {
  res.render('registers.ejs')
})

router.post('/registers', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  req.body.id = uuidv4()
  req.body.user_name = ''
  req.body.password = ''
  currentUser = req.body
  users.push(currentUser)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  usersTxt = jsonToTxt({ filePath: 'src/database/users.json' });
  fs.writeFileSync('src/download/users.txt', usersTxt, 'utf-8')
  fs.writeFileSync('src/database/currentUser.json', JSON.stringify(currentUser), 'utf-8')
  res.redirect('/receptions')
})


/* MODULO GESTION DE RECEPCION DE EQUIPOS -------------------------------------------- */
router.get('/receptions', (req, res) => {
  const code = uuidv4()
  currentUser = JSON.parse(fs.readFileSync('src/database/currentUser.json', 'utf-8'))
  res.render('receptions.ejs', {
    currentUser,
    code
  })
})

router.post('/receptions', (req, res) => {
  datetime = new Date().toLocaleString()
  devices = JSON.parse(fs.readFileSync('src/database/devices.json', 'utf-8'))
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  currentUser = JSON.parse(fs.readFileSync('src/database/currentUser.json', 'utf-8'))
  const newRequest = {
    isActive: true,
    request_description: req.body.request_description,
    receiving_date: datetime,
    receiving_employee: "",
    delivery_employee: "",
    customer: currentUser.name + ' ' + currentUser.last_name,
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
  fs.writeFileSync('src/database/devices.json', JSON.stringify(devices), 'utf-8')
  devicesTxt = jsonToTxt({ filePath: 'src/database/devices.json' })
  fs.writeFileSync('src/download/devices.txt', devicesTxt, 'utf-8')
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
  requestsTxt = jsonToTxt({ filePath: 'src/database/requests.json' })
  fs.writeFileSync('src/download/requests.txt', requestsTxt, 'utf-8')
  res.redirect('/registers')
})


/* MODULO GESTION DE SOLICITUDES ----------------------------------------------------- */
router.get('/requests', (req, res) => {
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  res.render('requests.ejs', {
    requests
  })
})

router.post('/request', (req, res) => {
  datetime = new Date().toLocaleString()
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
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
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
  res.redirect('/requests')
})


/* MODULO GESTION DE REPORTES -------------------------------------------------------- */
router.get('/reports', (req, res) => {
  res.render('reports.ejs')
})

router.get('/reports-devices', (req, res) => {
  res.download('src/download/devices.txt')
})

router.get('/reports-requests', (req, res) => {
  res.download('src/download/requests.txt')
})

router.get('/reports-users', (req, res) => {
  res.download('src/download/users.txt')
})

module.exports = router
