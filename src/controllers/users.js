const usersDao = require('../models/users')

const usersCtrl = {}

/* GENERADOR DE ID ALEATORIO --------------------------------------------------------- */
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(100))
}


/* LOGIN EMPLEADOS ------------------------------------------------------------------- */
usersCtrl.showViewLogin = (req, res) => {
  res.render('login.ejs')
}

usersCtrl.login = (req, res) => {
  const employees = usersDao.getAllEmployees()
  let employee
  let isLogin = false
  for (let index = 0; index < employees.length; index++) {
    employee = employees[index];
    if (
      employee.user_name == req.body.user_name &&
      employee.password == req.body.password
    ) {
      isLogin = true
      break
    } else {
      isLogin = false
    }
  }
  if (isLogin) {
    usersDao.createCurrentEmployee(employee)
    res.redirect('/registers')
  } else {
    res.redirect('/login')
  }
}


/* REGISGTRO DE CLIENTES ------------------------------------------------------------- */
usersCtrl.showViewRegisters = (req, res) => {
  res.render('registers.ejs')
}

usersCtrl.registers = (req, res) => {
  let users = []
  users = usersDao.getAllCustomers()
  const newUser = {
    id: getRandomInt(),
    data: req.body
  }
  users.push(newUser)
  usersDao.createCustomer(users)
  usersDao.createCurrentCustomer(req.body)
  usersDao.saveReport()
  res.redirect('/receptions')
}

module.exports = usersCtrl
