const { Router } = require('express')
const router = Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let datetime = ''
let currentUser = {}
let users = []
let requests = []

/* MODULO GESTION DE USUARIOS --------------------------------------------------- */
router.get('/home', (req, res) => {
  res.render('index.ejs')
})

router.post('/home', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  req.body.id = uuidv4()
  currentUser = req.body
  users.push(currentUser)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  fs.writeFileSync('src/database/currentUser.json', JSON.stringify(currentUser), 'utf-8')
  res.redirect('/customers')
})

router.get('/customers', (req, res) => {
  res.render('customers.ejs')
})

/* Endpoint de desarrollo, eliminar en producción */
router.get('/list-users', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  res.render('users.ejs', {
    users
  })
})

router.post('/login', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  const { user_name, password } = req.body
  const newLogin = { user_name, password, }
  users.forEach(user => {
    if (user.user_name == user_name && user.password == password) {
      res.redirect('/employees')
    } else {
      res.redirect('/home')
    }
  })
})

router.get('/employees', (req, res) => {
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  res.render('employees.ejs', {
    requests
  })
})

/* Endpoint de desarrollo, eliminar en producción */
router.get('/delete/:id', (req, res) => {
  users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
  users = users.filter(user => user.id != req.params.id)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  res.redirect('/list-users')
})

router.get('/download', (req, res) => {
  console.log('llamado a la ruta')
})

/* MODULO GESTION DE SOLICITUDES ------------------------------------------------ */
router.post('/devices', (req, res) => {
  datetime = new Date().toLocaleString()
  requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
  currentUser = JSON.parse(fs.readFileSync('src/database/currentUser.json', 'utf-8'))
  const newDevice = {
    serial: '',
    pieces: [
      {
        item: '',
        serial: ''
      },
      {
        item: '',
        serial: ''
      }
    ],
    brand: '',
    model: req.body.model,
    speces: '',
    owner: currentUser.name + ' ' + currentUser.last_name
  }
  const newRequest = {
    isActive: true,
    request_description: req.body.request_description,
    receiving_date: datetime,
    receiving_employee: "",
    delivery_employee: "",
    customer: currentUser.name + ' ' + currentUser.last_name,
    devices: newDevice,
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
  res.redirect('/home')
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
  res.redirect('/employees')
})

/* MODULO GESTION DE EQUIPOS ---------------------------------------------------- */
/* MODULO GESTION DE REPORTES --------------------------------------------------- */

module.exports = router