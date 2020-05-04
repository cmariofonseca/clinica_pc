const app = require('./src/app')
const redBlackTree = require('./src/controllers/redBlackTree')
const BinaryTree = require('./src/controllers/binaryTree')
const treeDao = require('./src/models/tree')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port: ${port}, open your browser on http://localhost:${port}/login`)

  /* Construcción de arbol negro-rojo */
  /* const redBlackTree = new redBlackTree()
  const value = Math.floor(Math.random() * Math.floor(100))
  console.log(value)
  let tree = treeDao.getTree()
  const newTree = redBlackTree.insertRBTreeWrapper(tree, value)
  console.log(newTree)
  treeDao.saveTree(newTree) */

  /* Construcción de arbol binario */
  /* const binaryTree = new BinaryTree()
  const arr = [5, 2, 3, -4, 12, 9, 21, 19, 25]
  for (let i = 0; i < arr.length; i++) {
    binaryTree.addRecursive(arr[i])
  }
  const newTree = binaryTree.findRecursive(5)
  console.log(newTree)
  treeDao.saveTree(newTree) */

});
