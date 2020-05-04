class redBlackTree {

  insertRBTree(node, newValue) {
    const nullChild = {
      value: null,
      colour: 'black',
      left: null,
      right: null
    }
    const newNode = {
      value: newValue,
      colour: 'red',
      left: nullChild,
      right: nullChild
    }
    console.log('node')
    console.log(node)
    if (!node) {
      node = newNode
    }
    if (node.value == null) {
      return newNode
    } else {
      if (newValue > node.value) {
        node.right = this.insertRBTree(node.right, newValue)
        console.log(node.right)
        if (node.colour == 'red') {
          return node
        } else if (node.right.colour == 'red') {
          if (this.hasRedChild(node.right)) {
            return this.correctedRBRight(node, newValue)
          } else {
            return node
          }
        } else {
          return node
        }
      }
      if (newValue < node.value) {
        node.left = this.insertRBTree(node.left, newValue)
        if (node.colour == 'red') {
          return node
        } else if (node.left.colour == 'red') {
          if (this.hasRedChild(node.left)) {
            return this.correctedRBLeft(node, newValue)
          } else {
            return node
          }
        } else {
          return node
        }
      }
    }
  }

  hasRedChild(node) {
    if (node.colour == 'red') {
      return true
    } else {
      return false
    }
  }

  correctedRBRight(node, num) {
    const parent = node.right
    const uncle = node.left
    if (uncle.colour == 'red') {
      node.colour = 'red'
      uncle.colour = 'black'
      parent.colour = 'black'
      return node
    } else {
      if (num > child.value) {
        node.right = parent.left
        parent.left = node
        parent.colour = 'black'
        node.colour = 'red'
        return parent
      }
      if (num < child.value) {
        const addedNode = parent.left
        parent.left = addedNode.right
        addedNode.right = parent
        addedChild.left = node
        addedNode.colour = 'black'
        node.colour = 'red'
        return addedNode
      }
    }
  }

  correctedRBLeft(node, num) {
    const parent = node.left
    const uncle = node.right
    if (uncle.colour == 'red') {
      node.colour = 'red'
      uncle.colour = 'black'
      parent.colour = 'black'
      return node
    } else {
      if (num > child.value) {
        node.left = parent.right
        parent.right = node
        parent.colour = 'black'
        node.colour = 'red'
        return parent
      }
      if (num < child.value) {
        const addedNode = parent.right
        parent.right = addedNode.left
        addedNode.left = parent
        addedChild.right = node
        addedNode.colour = 'black'
        node.colour = 'red'
        return addedNode
      }
    }
  }

  insertRBTreeWrapper(tree, num) {
    console.log(tree)
    console.log(num)
    tree = this.insertRBTree(tree, num)
    tree.colour = 'black'
    return tree
  }

}

module.exports = redBlackTree
