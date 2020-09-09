export default class HitBox {
    constructor(x, y, width, height) {
        this.set(x, y, width, height)

        this.activated = true
    }

    set(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    collides(hitbox) {
        return this.activated && hitbox.isActivated() && (
            this.x < hitbox.x + hitbox.width &&
            this.x + this.width > hitbox.x &&
            this.y < hitbox.y + hitbox.height &&
            this.y + this.height > hitbox.y
        )
    }

    contains(point) {
        return this.activated && (
            point.x >= this.x &&
            point.x <= this.x + this.width &&
            point.y >= this.y &&
            point.y <= this.y + this.height
        )
    }

    render(context) {
        context.beginPath()
        context.rect(
            this.x,
            this.y,
            this.width,
            this.height
        )
        context.stroke()
    }

    toString() {
        return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`
    }

    activate() {
        this.activated = true
    }

    deactivate() {
        this.activated = false
    }

    isActivated() {
        return this.activated
    }
}