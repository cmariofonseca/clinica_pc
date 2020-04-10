const fs = require('fs')
const jsonToTxt = require('json-to-txt')

const requestsDao = {}

requestsDao.createRequest = (requests) => {
  fs.writeFileSync('src/database/requests.json', JSON.stringify(requests), 'utf-8')
}

requestsDao.getAllRequests = () => {
  return JSON.parse(fs.readFileSync('src/database/requests.json', 'utf-8'))
}

requestsDao.saveReportRequests = () =>{
  const requestsTxt = jsonToTxt({ filePath: 'src/database/requests.json' })
  fs.writeFileSync('src/download/requests.txt', requestsTxt, 'utf-8')
}

requestsDao.getReportRequests = (report) => {
  report.download('src/download/requests.txt')
}

module.exports = requestsDao
