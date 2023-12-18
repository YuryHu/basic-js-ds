const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }
  root() {
    return this.rootNode
  }

  add(data) {
    this.rootNode = addToNode(this.rootNode, data)
    function addToNode(node, value) {
      if (!node) {
        return new Node(value)
      }
      if (node.data === value) {
        return node
      }
      if (value < node.data) {
        node.left = addToNode(node.left, value)
        return node
      }
      node.right = addToNode(node.right, value)
      return node
    }
  }

  has(data) {
    let node = this.rootNode
    while (node) {
      if (data === node.data) {
        return true
      }
      if (data < node.data) {
        node = node.left
      } else {
        node = node.right
      }
    }
    return false
  }

  find(data) {
    return findByData(this.rootNode, data)
    function findByData(node, value) {
      if (!node) {
        return null
      }
      if (value === node.data) {
        return node
      }
      if (value < node.data) {
        return findByData(node.left, value)
      }
      return findByData(node.right, value)
    }
  }

  remove(data) {
    if (this.has(data)) {
      //remove rootNode
      if (data === this.rootNode.data) {
        this.rootNode = this.removeNode(this.rootNode)
        return
      }
      //remove not rootNode
      this.removeNotRoot(data)
    }
  }
  removeNotRoot(data) {
    const parentOfRemoved = this.getParent(data)
    if (parentOfRemoved.right && parentOfRemoved.right.data === data) {
      parentOfRemoved.right = this.removeNode(parentOfRemoved.right)
      return
    }
    parentOfRemoved.left = this.removeNode(parentOfRemoved.left)
  }
  min() {
    if (this.rootNode) {
      return minX(this.rootNode)
    }
    function minX(node) {
      return node.left ? minX(node.left) : node.data
    }
  }

  max() {
    if (this.rootNode) {
      return this.maxNodeOfSubtree(this.rootNode).data
    }
  }
  maxNodeOfSubtree(node) {
    if (node) {
      while (node.right) {
        node = node.right
      }
    }
    return node
  }
  removeNode(node) {
    if (!node.left && !node.right) {//removed node has no children
      return null
    }
    //has one child
    if (node.left && !node.right) {
      return node.left
    }
    if (node.right && !node.left) {
      return node.right
    }
    //has 2 children
    const maxOfLeft = this.maxNodeOfSubtree(node.left)
    const maxOfLeftData = maxOfLeft.data
    this.removeNotRoot(maxOfLeftData)
    node.data = maxOfLeftData
    return node
  }
  getParent(data) {
    return getParentRecursive(this.rootNode, data)
    function getParentRecursive(node, data) {
      if (data > node.data) {
        return node.right.data === data ? node : getParentRecursive(node.right, data)
      }
      return node.left.data === data ? node : getParentRecursive(node.left, data)
    }
  }
}

module.exports = {
  BinarySearchTree
};