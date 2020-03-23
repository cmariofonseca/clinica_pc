const { Router } = require('express')
const router = Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const jsonToTxt = require('json-to-txt')

let datetime = ''
let currentUser = {}
let users = []
let usersTxt = ''
let requests = []

/* LOGIN EMPLEADOS */
router.get('/login', (req, res) => {
  res.render('login.ejs')
})

router.post('/login', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  const { user_name, password } = req.body
  const newLogin = { user_name, password, }
  users.forEach(user => {
    if (user.user_name == user_name && user.password == password) {
      res.redirect('/registers')
    } else {
      res.redirect('/login')
    }
  })
})


/* REGISGTRO DE CLIENTES */
router.get('/registers', (req, res) => {
  res.render('registers.ejs')
})

router.post('/registers', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  req.body.id = uuidv4()
  currentUser = req.body
  users.push(currentUser)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  usersTxt = jsonToTxt({ filePath: 'src/database/users.json' });
  fs.writeFileSync('src/database/users.txt', usersTxt, 'utf-8')
  fs.writeFileSync('src/database/currentUser.json', JSON.stringify(currentUser), 'utf-8')
  res.redirect('/receptions')
})


/* MODULO GESTION DE USUARIOS --------------------------------------------------- */
router.get('/receptions', (req, res) => {
  res.render('receptions.ejs')
})

router.post('/receptions', (req, res) => {
  datetime = new Date().toLocaleString()
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  currentUser = JSON.parse(fs.readFileSync('src/database/currentUser.json', 'utf-8'))
  const newRequest = {
    isActive: true,
    isDevice: true,
    request_description: req.body.request_description,
    receiving_date: datetime,
    receiving_employee: "",
    delivery_employee: "",
    customer: currentUser.name + ' ' + currentUser.last_name,
    devices: {
      model: req.body.model,
      owner: currentUser.name + ' ' + currentUser.last_name,
    },
    total_paid: "",
    total_spent: "",
    total_net: "",
    delivery_date: "",
    delevery_description: {
      item: "",
      action: "",
      price: ""
    },
    responsible_employee: "",
    code: uuidv4()
  }
  requests.push(newRequest)
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
  res.redirect('/users')
})


/* MODULO GESTION DE EQUIPOS ---------------------------------------------------- */


/* MODULO GESTION DE SOLICITUDES ------------------------------------------------ */
router.get('/requests', (req, res) => {
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  console.log(requests)
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
    delevery_description: {
      item,
      action,
      price,
    },
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

/* MODULO GESTION DE REPORTES --------------------------------------------------- */
router.get('/reports/users', (req, res) => {
  res.download('src/download/users.txt')
})

router.post('/reports', (req, res) => {
  res.redirect('/reports')
})

module.exports = router
