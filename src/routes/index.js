const { Router } = require('express')
const router = Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let currentUser = {}
let users = []
let requests = []
let devices = []
users = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))
requests = JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
devices = JSON.parse(fs.readFileSync('src/database/users.json', 'utf-8'))

/* MODULO GESTION DE USUARIOS --------------------------------------------------- */
router.get('/home', (req, res) =>{
  res.render('index')
})

router.post('/home', (req, res) => {
  req.body.id = uuidv4()
  currentUser = req.body
  console.log(currentUser)
  users.push(currentUser)
  fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
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
  console.log(req.body)
  const { user_name, password } = req.body
  const newLogin = { user_name, password, }
  users.forEach(user => {
    console.log(user.user_name == user_name)
    console.log(user.password == password)
    if (user.user_name == user_name && user.password == password) {
      res.redirect('/employees')
    } else {
      res.redirect('/home')
    }
  })
})

router.get('/employees', (req, res) => {
  res.render('employees.ejs')
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
  // req.body.id = uuidv4()
  console.log(req.body)
  // users.push(req.body)
  // fs.writeFileSync('src/database/users.json', JSON.stringify(users), 'utf-8')
  res.redirect('/customers')
})

/* MODULO GESTION DE EQUIPOS ---------------------------------------------------- */
/* MODULO GESTION DE REPORTES --------------------------------------------------- */

module.exports = router