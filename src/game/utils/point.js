export default class Point {
    constructor (x, y) {
        this.x = x
        this.y = y
    }

    equals(x, y) {
        return this.x == x && this.y == y
    }

    equals(point) {
        return this.x == point.x && this.y == point.y
    }

    isZero() {
        return this.x == this.y == 0
    }
    
    set(x, y) {
        this.x = x
        this.y = y
        
        return this
    }

    distance(point) {
        return Math.sqrt(Math.pow((this.x - point.x), 2) + Math.pow((this.y - point.y), 2))
    }

    angle(point) {
        return Math.atan2(point.y - this.y, point.x - this.x) * 180 / Math.PI
    }

    toString() {
        return `[${this.x}, ${this.y}]`
    }
}