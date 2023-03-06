export class SkipList {
  private head: Node
  private tail: Node
  private maxLevel: number

  constructor() {
    this.head = new Node(-Infinity)
    this.tail = new Node(Infinity)
    this.head.right = this.tail
    this.tail.left = this.head
    this.maxLevel = 0
  }

  public insert(value: number): void {
    const node = new Node(value)
    let level = 0
    while (Math.random() < 0.5) {
      level++
    }
    while (level > this.maxLevel) {
      const head = new Node(-Infinity)
      const tail = new Node(Infinity)
      head.right = tail
      tail.left = head
      head.down = this.head
      tail.down = this.tail
      this.head.up = head
      this.tail.up = tail
      this.head = head
      this.tail = tail
      this.maxLevel++
    }
    let cur = this.head
    while (cur !== null) {
      while (cur.right!.value < value) {
        cur = cur.right!
      }
      if (level >= cur.level) {
        const newNode = new Node(value)
        newNode.right = cur.right
        newNode.left = cur
        cur.right!.left = newNode
        cur.right = newNode
        if (cur.down !== null) {
          cur = cur.down
          const downNode = new Node(value)
          downNode.right = cur.right
          downNode.left = cur
          cur.right!.left = downNode
          cur.right = downNode
          downNode.up = newNode
          newNode.down = downNode
        }
      }
      cur = cur.down
    }
  }

  public search(value: number): boolean {
    let cur = this.head
    while (cur !== null) {
      while (cur.right!.value <= value) {
        cur = cur.right!
      }
      if (cur.value === value) {
        return true
      }
      cur = cur.down
    }
    return false
  }

  public delete(value: number): boolean {
    let cur = this.head
    while (cur !== null) {
      while (cur.right!.value < value) {
        cur = cur.right!
      }
      if (cur.right!.value === value) {
        cur = cur.right!
        while (cur !== null) {
          cur.left!.right = cur.right
          cur.right!.left = cur.left
          cur = cur.down
        }
        return true
      }
      cur = cur.down
    }
    return false
  }

  public print(): void {
    let cur = this.head
    while (cur !== null) {
      let row = ''
      let node = cur
      while (node !== null) {
        row += `${node.value} -> `
        node = node.right
      }
      console.log(row)
      cur = cur.down
    }
  }
}

class Node {
  public value: number
  public level: number
  public right: Node | null
  public left: Node | null
  public up: Node | null
  public down: Node | null

  constructor(value: number) {
    this.value = value
    this.level = 0
    this.right = null
    this.left = null
    this.up = null
    this.down = null
  }
}
