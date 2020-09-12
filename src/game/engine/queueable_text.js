import { smoothStep } from "../utils/utils"

const pause = (duration) => ({
    action: 'pause',
    duration,
})

const fadeInAction = (duration) => ({
    action: 'fadeIn',
    duration,
})

const fadeOutAction = (duration) => ({
    action: 'fadeOut',
    duration,
})

const changeTextAction = (text, duration) => ({
    action: 'changeText',
    duration,
    data: { text },
})

export default class QueueableText {
    constructor (defaultText) {
        this.text = defaultText

        this.actionCurrentTime = 0
        this.currentAction = null

        this.actionQueue = []

        // Controls how much alpha there can be.
        // Used for fading a default alpha.
        this.fadeAlphaPercent = 1
    }

    queueIsEmpty() {
        return this.actionQueue.length == 0
    }

    enqueueAction(action) {
        this.actionQueue.push(action)
    }

    dequeueAction() {
        return this.actionQueue.shift()
    }

    queueTransitionedTextChange(text, duration) {
        this.enqueueAction(pause(duration * 0.3))
        this.enqueueAction(fadeOutAction(duration * 0.3))
        this.enqueueAction(changeTextAction(text, duration * 0.1))
        this.enqueueAction(fadeInAction(duration * 0.3))
    }

    // `pause` waits a duration for the next action,
    pause() {}

    fadeOut() {
        if (
            !!this.currentAction &&
            typeof this.currentAction.duration == 'number'
        ) {
            this.fadeAlphaPercent = 1 - smoothStep(
                this.actionCurrentTime / this.currentAction.duration
            )
        }
    }

    fadeIn() {
        if (
            !!this.currentAction &&
            typeof this.currentAction.duration == 'number'
        ) {
            this.fadeAlphaPercent = smoothStep(
                this.actionCurrentTime / this.currentAction.duration
            )
        }
    }

    changeText() {
        if (
            !!this.currentAction &&
            this.currentAction.action == 'changeText' &&
            !!this.currentAction.data &&
            typeof this.currentAction.data.text == 'string'
        ) {
            this.text = this.currentAction.data.text
        }
    }

    step() {
        this.actionCurrentTime++

        // Test if we're ready for the next action in the queue:
        // If there's a next action in the queue and the current action doesn't
        // exist or we've already finished the duration of the current action
        if (
            !this.queueIsEmpty() &&
            (
                !this.currentAction || (
                    !!this.currentAction.duration &&
                    this.actionCurrentTime > this.currentAction.duration
                )
            )
        ) {
            this.currentAction = this.dequeueAction()

            // Reset the action clock
            this.actionCurrentTime = 0
        } else {
            // Else, if we're not ready to change the current action,
            // continue running it.
            //
            // Check if the current action has a name, that name is
            // a function name, and if that's all true, call the function.
            // This may be kinda hacky, but it's efficient for writing
            // new actions.
            if (
                !!this.currentAction &&
                !!this.currentAction.action &&
                !!this[this.currentAction.action]
            ) {
                this[this.currentAction.action]()
            }
        }
    }

    render(
        context,
        defaultAlpha,
        font,
        textAlign,
        locationPoint,
    ) {
        if (!!this.text) {
            context.fillStyle = `rgba(0, 0, 0, ${
                defaultAlpha * this.fadeAlphaPercent
            })`
            context.font = font
            context.textAlign = textAlign
            context.fillText(this.text, locationPoint.x, locationPoint.y)
        }
    }
}