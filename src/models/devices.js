const fs = require('fs')
const jsonToTxt = require('json-to-txt')

const devicesDao = {}

devicesDao.createDevice = (devices) => {
  fs.writeFileSync('src/database/devices.json', JSON.stringify(devices), 'utf-8')
}

devicesDao.getAllDevices = () => {
  return JSON.parse(fs.readFileSync('src/database/devices.json', 'utf-8'))
}

devicesDao.saveReportDevices = () => {
  const devicesTxt = jsonToTxt({ filePath: 'src/database/devices.json' })
  fs.writeFileSync('src/download/devices.txt', devicesTxt, 'utf-8')
}

devicesDao.getReportDevices = (report) => {
  report.download('src/download/devices.txt')
}

module.exports = devicesDao
