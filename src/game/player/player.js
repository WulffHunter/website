import Point from '../utils/point'
import Sword from './sword'

import {
    getLengthDirX,
    getLengthDirY,
} from '../utils/utils'

export default class Player {
    
    constructor (walkSprite, swordSprite, baseSprite) {
        this.sprite = walkSprite
        this.facingLeft = true
        this.baseSprite = baseSprite

        // Create a new click and nullify it
        this.clickTarget = new Point(0, 0).null()

        this.position = new Point(0, 0)
        this.target = new Point(0, 0)
        this.velocity = 0

        this.maxSpeed = 4
        // this.maxSpeed = 2.5

        this.attackRadius = 20

        this.sword = new Sword(swordSprite)
    }

    setMaxSpeed(maxSpeed) {
        this.maxSpeed = maxSpeed
    }

    step(_pageInfo, world) {
        // If the target changed, post a message to the world so that the
        // location marker can update its position
        if (this.targetChanged) {
            

            if (this.position.distance(this.targetChanged) < this.attackRadius) {
                
            }
        }

        if (!this.clickTarget.isNull()) {
            // If the last click was in the attack radius
            if (this.clickTarget.distance(this.position) < this.attackRadius) {
                this.sword.attack()
            } else {
                this.target.set(this.clickTarget.x, this.clickTarget.y)

                world.postMessage('player_target_change', {
                    targetPosition: this.target,
                })
            }

            // Nullify the click target since we've handled the click
            this.clickTarget.null()
        }

        if (this.position.distance(this.target) > this.maxSpeed) {
            // Every walking step, set the image flip based on which
            // direction the player is walking in
            this.facingLeft = this.target.x <= this.position.x

            // Increment the velocity until you reach the max speed
            // for smoother movement
            if (this.velocity < this.maxSpeed) {
                this.velocity += 0.5
            }

            // Get the angle to the target point
            const angle = this.position.angle(this.target)

            // Move in the direction of the target point
            this.position.set(
                this.position.x + getLengthDirX(angle, this.velocity),
                this.position.y + getLengthDirY(angle, this.velocity)
            )

            world.postMessage('player_position', {
                playerPosition: this.position,
            })
        } else {
            this.velocity = 0
        }

        // Update the sword
        this.sword.step(world, this.position, this.facingLeft)
    }

    input(_pageInfo, eventInfo, _world) {
        this.clickTarget = eventInfo
    }

    depth() {
        return this.position.y
    }

    onMessage(message) {
        if (message.subject == 'monster_clicked') {
            const monsterPos = message.data.monster_position

            // Add a little bit of distance between the player and the monster
            // depending on the way the player is facing
            this.clickTarget.set(
                monsterPos.x + (10 * (this.position.x > monsterPos.x ? 1 : -1)),
                monsterPos.y + (5 * (this.position.y > monsterPos.y ? 1 : -1))
            )
        }
    }
    
    render(context) {
        this.baseSprite.render(
            context,
            this.position.x - (this.baseSprite.width / 2),
            this.position.y - this.baseSprite.height,
            0,
            false,
            0, 1, 1,
            0.1,
        )

        this.sprite.render(
            context,
            this.position.x - (this.sprite.width / 2),
            this.position.y - this.sprite.height,
            this.velocity == 0 ? 0 : -1,
            !this.facingLeft,
        )

        this.sword.render(context)
    }
}