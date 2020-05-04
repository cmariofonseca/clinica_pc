const fs = require('fs')

const treeDao = {}

treeDao.saveTree = (tree) => {
  fs.writeFileSync('src/database/tree.json', JSON.stringify(tree), 'utf-8')
}

treeDao.getTree = () => {
  return JSON.parse(fs.readFileSync('src/database/tree.json', 'utf-8'))
}

module.exports = treeDao
