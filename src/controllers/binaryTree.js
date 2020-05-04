class Node {
  constructor(value) {
    this.value = value
    this.right = null
    this.left = null
  }
}

class BinaryTree {

  addRecursive(value, node = this.root) {
    if (!node) {
      this.root = new Node(value)
      return
    }

    if (value < node.value) {
      if (node.left) {
        return this.addRecursive(value, node.left)
      }
      node.left = new Node(value)
      return
    } else {
      if (node.right) {
        return this.addRecursive(value, node.right)
      }
      node.right = new Node(value)
      return
    }
  }

  findRecursive(value, node = this.root) {
    if (node.value === value) {
      return node
    }

    if (node.value < value) {
      return this.findRecursive(value, node.right)
    } else if (node.value > value) {
      return this.findRecursive(value, node.left)
    }
  }

}

module.exports = BinaryTree
