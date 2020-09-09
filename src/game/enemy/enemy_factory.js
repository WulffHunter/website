import Point from '../utils/point'
import { randomRange } from '../utils/utils'
import Enemy from './enemy'

export default class EnemyFactory {
    constructor (
        spriteSetGeneratorFn,
        baseSprite,
        timeBetweenEnemies,
        widthPadding,
        heightPadding,
    ) {
        this.spriteSetGeneratorFn = spriteSetGeneratorFn
        this.baseSprite = baseSprite

        this.padding = {
            width: widthPadding,
            height: heightPadding,
        }

        this.timeBetweenEnemies = timeBetweenEnemies
        // Wait 100 steps before generating the first enemy
        this.currentTime = timeBetweenEnemies - 100

        this.enemiesCreated = 0

        this.screenWasClicked = false

        // Records the amount of monsters that are currently alive
        this.activeMonsters = 0
        // The maximum amount of monsters allowed to be alive at
        // a time
        this.maxMonsters = 10
    }

    input() {
        this.screenWasClicked = true
    }

    onMessage(message) {
        // If any monsters were killed, delete it from the list
        // of active monsters
        if (message.subject == 'monster_killed') {
            this.activeMonsters--
        }
    }

    step(pageInfo, world) {
        // Only create monsters if the screen was clicked
        if (!this.screenWasClicked) {
            return
        }

        this.currentTime++

        if (this.currentTime >= this.timeBetweenEnemies) {
            this.currentTime = 0

            if (this.activeMonsters < this.maxMonsters) {
                world.push(new Enemy(
                    this.spriteSetGeneratorFn(),
                    this.baseSprite,
                    // Ensure that they're generated within the boundaries
                    new Point(
                        Math.round(randomRange(
                            this.padding.width,
                            pageInfo.width - this.padding.width,
                        )),
                        Math.round(randomRange(
                            this.padding.height,
                            pageInfo.height - this.padding.height,
                        )),
                    )  
                ))

                this.enemiesCreated++
                this.activeMonsters++
            }
        }
    }
}