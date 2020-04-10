const fs = require('fs')
const jsonToTxt = require('json-to-txt')

const usersDao = {}

usersDao.createCustomer = (users) => {
  fs.writeFileSync('src/database/customers.json', JSON.stringify(users), 'utf-8')
}

usersDao.getAllCustomers = () => {
  return JSON.parse(fs.readFileSync('src/database/customers.json', 'utf-8'))
}

usersDao.getAllEmployees = () => {
  return JSON.parse(fs.readFileSync('src/database/employees.json', 'utf-8'))
}

usersDao.createCurrentCustomer = (currentCustomer) => {
  fs.writeFileSync('src/database/currentCustomer.json', JSON.stringify(currentCustomer), 'utf-8')
}

usersDao.getCurrentCustomer = () => {
  return JSON.parse(fs.readFileSync('src/database/currentCustomer.json', 'utf-8'))
}

usersDao.createCurrentEmployee = (currentEmployee) => {
  fs.writeFileSync('src/database/currentEmployee.json', JSON.stringify(currentEmployee), 'utf-8')
}

usersDao.getCurrentEmployee = () => {
  return JSON.parse(fs.readFileSync('src/database/currentEmployee.json', 'utf-8'))
}

usersDao.saveReport = () => {
  const usersTxt = jsonToTxt({ filePath: 'src/database/customers.json' })
  fs.writeFileSync('src/download/users.txt', usersTxt, 'utf-8')
}

usersDao.getReportUsers = (report) => {
  report.download('src/download/users.txt')
}

module.exports = usersDao
