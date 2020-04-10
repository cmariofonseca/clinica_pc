const { v4: uuidv4 } = require('uuid')
const usersDao = require('../models/users')

const usersCtrl = {}

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
  console.log('33333333333333333333333333333333333333333333333333333333333333333333333333')
  console.log(users)
  req.body.id = uuidv4()
  users.push(req.body)
  usersDao.createCustomer(users)
  usersDao.createCurrentCustomer(req.body)
  usersDao.saveReport()
  res.redirect('/receptions')
}

module.exports = usersCtrl
