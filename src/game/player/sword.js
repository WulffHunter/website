import Point from '../utils/point'
import { getLengthDirX, getLengthDirY } from '../utils/utils'
import HitBox from '../utils/hitbox'
import World from '../engine/world'

export default class Sword {
    constructor (sprite) {
        this.sprite = sprite

        this.attacking = false

        this.position = new Point(0, 0)
        this.facingLeft = true

        this.angle = 0
        this.degreesPerStep = 5
        this.swingEndAngle = 100

        this.hitHeight = 5
        this.hitbox = new HitBox(this.position.x, this.position.y, 0, 0)
        this.hitbox.deactivate()
    }

    attack() {
        this.attacking = true
        this.hitbox.activate()
    }

    onMessage(_message) {}

    step(world, playerPosition, facingLeft) {
        this.position = playerPosition
        this.facingLeft = facingLeft

        if (this.attacking) {
            if (this.angle < this.swingEndAngle) {
                this.angle += this.degreesPerStep
            } else {
                this.angle = 0
                this.attacking = false
                this.hitbox.deactivate()
            }
        }

        const leftModifier = (this.facingLeft ? -1 : 1)
        const angle = this.angle * leftModifier
        const armLength = this.sprite.height / 2
        this.hitbox.set(
            this.position.x + ((this.sprite.width / 2) * leftModifier),
            this.position.y - (this.hitHeight / 2),
            getLengthDirX(90 + angle, -armLength),
            this.hitHeight
        )

        world.postMessage('sword_hitbox', {
            hitbox: this.hitbox,
        })
    }

    render(context) {
        if (this.attacking) {
            const angle = this.angle * (this.facingLeft ? -1 : 1)
            const armLength = this.sprite.height / 2

            // this.hitbox.render(context)

            this.sprite.render(
                context,
                (
                    this.position.x - (
                        this.sprite.width / 2
                    ) + getLengthDirX(90 + angle, -armLength)
                ),
                (
                    this.position.y - (
                        (3 * this.sprite.height) / 4
                    ) + getLengthDirY(90 + angle, -armLength)
                ),
                -1,
                !this.facingLeft,
                angle,
            )
        }
    }

    getHitbox() {
        return this.hitbox
    }
}