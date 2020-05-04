class Node {
  constructor(newNode) {
    this.id = newNode.id
    this.data = newNode.data
    this.right = null
    this.left = null
  }
}

class BinaryTree {

  addRecursive(newNode, node = this.root) {
    if (!node) {
      this.root = new Node(newNode)
      return
    }

    if (newNode.id < node.id) {
      if (node.left) {
        return this.addRecursive(newNode, node.left)
      }
      node.left = new Node(newNode)
      return
    } else {
      if (node.right) {
        return this.addRecursive(newNode, node.right)
      }
      node.right = new Node(newNode)
      return
    }
  }

  findRecursive(id, node = this.root) {
    if (node.id === id) {
      return node
    }
    if (node.id < id) {
      return this.findRecursive(id, node.right)
    } else if (node.id > id) {
      return this.findRecursive(id, node.left)
    }
  }

}

module.exports = BinaryTree
