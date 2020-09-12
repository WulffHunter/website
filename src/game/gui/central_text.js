import QueueableText from '../engine/queueable_text'
import Point from '../utils/point'

const initialText = 'click anywhere.'
const attackText = 'click the monster to attack it.'

export default class CentralText {
    constructor () {
        // This empty point will be overwritten
        this.drawLocation = new Point(0, 0)

        this.screenWasClicked = false

        this.queueableText = new QueueableText(initialText)

        this.killCount = 0
    }

    step(pageInfo) {
        this.drawLocation.set(
            pageInfo.width / 2,
            pageInfo.height / 2,
        )

        this.queueableText.step()
    }
    
    depth() {
        return -9999
    }

    input() {
        if (!this.screenWasClicked) {
            this.screenWasClicked = true

            this.queueableText.queueTransitionedTextChange(
                attackText, 130
            )
        }
    }

    onMessage(message) {
        if (message.subject == 'monster_killed') {
            this.queueableText.queueTransitionedTextChange(
                `monsters defeated: ${++this.killCount}`, 120
            )
        }
    }

    render(context) {
        this.queueableText.render(
            context,
            0.25,
            '24px Arial',
            'center',
            this.drawLocation,
        )
    }
}