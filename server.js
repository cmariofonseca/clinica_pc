const app = require('./src/app')
const redBlackTree = require('./src/controllers/redBlackTree')
const BinaryTree = require('./src/controllers/binaryTree')
const treeDao = require('./src/models/tree')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port: ${port}, open your browser on http://localhost:${port}/login`)
});
