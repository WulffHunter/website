import Point from '../utils/point'
import HitBox from '../utils/hitbox'

const enemyState = {
    RISE: 'rise',
    HOVER: 'hover',
    ATTACK: 'attack',
    HURT: 'hurt',
    DEATH: 'death',
    DEAD: 'dead',
}

export default class Enemy {
    constructor (spriteSet, baseSprite, position, health) {
        this.spriteSet = spriteSet
        this.baseSprite = baseSprite

        this.position = position
        this.playerPosition = new Point(0, 0)

        // Facing direction is random
        this.facingLeft = Math.random() >= 0.5

        this.attackRadius = 32

        this.state = enemyState.RISE

        this.health = health
        this.timeSinceKilled = 0

        this.maxTimeDead = 100

        const hitboxWidth = 64
        const hitboxHeight = 32
        this.hitbox = new HitBox(
            position.x - (hitboxWidth / 2),
            position.y - (hitboxHeight / 2),
            hitboxWidth,
            hitboxHeight,
        )

        this.clickBox = new HitBox(
            position.x - (hitboxWidth / 2),
            position.y - (hitboxHeight / 2),
            hitboxWidth,
            hitboxHeight,
        )
    }

    onPush(id, _world) {
        this.id = id
    }

    step(_pageInfo, world) {
        // Start by setting the clickbox every frame
        const sprite = this.spriteSet[this.state]
        this.clickBox.set(
            this.position.x - (sprite.width / 2),
            this.position.y - sprite.height,
            sprite.width,
            sprite.height,
        )

        if (this.state == enemyState.DEAD) {
            if (this.timeSinceKilled == this.maxTimeDead) {
                world.remove(this.id)
            } else {
                this.timeSinceKilled++
            }

            // Exit the step function because it's dead
            return
        }

        // Certain states revert to other states once their animation
        // is complete
        if (this.spriteSet[this.state].animationComplete()) {

            switch (this.state) {
                case enemyState.RISE:
                    this.state = enemyState.HOVER
                    break

                case enemyState.ATTACK:
                    this.state = enemyState.HOVER
                    break

                case enemyState.HURT:
                    this.state = enemyState.HOVER
                    break

                case enemyState.DEATH:
                    this.state = enemyState.DEAD
                    break
            }
        }

        // If the player is within attacking distance...
        if (this.position.distance(this.playerPosition) <= this.attackRadius) {
            // ...Face the player...
            this.facingLeft = this.playerPosition.x < this.position.x

            // ...Attack if in the hovering position
            if (this.state == enemyState.HOVER) {
                this.state = enemyState.ATTACK
            }
        }
        
        // If the sword currently collides with the enemy and it's
        // hovering or attacking
        if (
            // Because of an unusual error, we have to ensure
            // both hitboxes exist
            !!this.hitbox && !!this.swordHitbox &&
            this.hitbox.collides(this.swordHitbox) &&
            (this.state == enemyState.HOVER || this.state == enemyState.ATTACK)
        ) {
            this.health -= 1
            if (this.health > 0) {
                this.state = enemyState.HURT
            } else {
                this.state = enemyState.DEATH

                // Tell the world that this monster has been killed
                world.postMessage('monster_killed', {
                    id: this.id,
                })
            }
        }
    }

    depth() {
        return this.position.y
    }

    onMessage(message) {
        if (message.subject == 'player_position') {
            this.playerPosition = message.data.playerPosition
        }

        if (message.subject == 'sword_hitbox') {
            this.swordHitbox = message.data.hitbox
        }
    }

    input(_pageInfo, eventInfo, world) {
        // If the monster was clicked...
        if (this.clickBox.contains(eventInfo)) {

            // ...Set up a message to move the player to it
            world.postMessage('monster_clicked', {
                monster_position: this.position,
            })
        }
    }
    
    render(context) {
        const numElseZero = (num) => num > 0 ? num : 0
        
        const deathFadeOpacity = numElseZero(1 - (this.timeSinceKilled * 0.025))

        this.baseSprite.render(
            context,
            this.position.x - (this.baseSprite.width / 2),
            this.position.y - (this.baseSprite.height / 2),
            0,
            false,
            0, 1, 1,
            deathFadeOpacity * 0.1,
        )

        const sprite = this.spriteSet[this.state]
        sprite.render(
            context,
            this.position.x - (sprite.width / 2),
            this.position.y - sprite.height,
            -1,
            !this.facingLeft,
            0, 1, 1,
            deathFadeOpacity,
        )

        // this.hitbox.render(context)
        // this.clickBox.render(context)
    }
}