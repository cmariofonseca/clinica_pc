const { Router } = require('express')
const router = Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let datetime = ''
let currentUser = {}
let users = []
let requests = []
users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))

/* MODULO GESTION DE USUARIOS --------------------------------------------------- */
router.get('/home', (req, res) =>{
  res.render('index.ejs')
})

router.post('/home', (req, res) => {
  req.body.id = uuidv4()
  currentUser = req.body
  users.push(currentUser)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  fs.writeFileSync('src/database/currentUser.json', JSON.stringify(currentUser), 'utf-8')
  res.redirect('/customers')
})

router.get('/customers', (req, res) => {
  res.render('customers.ejs', {
    users
  })
})

/* Endpoint de desarrollo, eliminar en producción */
router.get('/list-users', (req, res) => {
  res.render('users.ejs', {
    users
  })
})

router.post('/login', (req, res) => {
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
  res.render('employees.ejs', {
    requests
  })
})

router.get('/delete/:id', (req, res) => {
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
    delevery_description: [
      {
        item: "",
        action: "",
        price: ""
      }
    ],
    responsible_employee: "",
    code: uuidv4()
  }
  requests.push(newRequest)
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
  res.redirect('/home')
})

/* MODULO GESTION DE EQUIPOS ---------------------------------------------------- */
/* MODULO GESTION DE REPORTES --------------------------------------------------- */

module.exports = router