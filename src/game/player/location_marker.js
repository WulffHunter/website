export default class LocationMarker {
    constructor (baseSprite) {
        this.baseSprite = baseSprite

        // There is no initial point
        this.position = null

        this.timer = 0
    }

    step() {
        this.timer++
    }

    depth() {
        return !!this.position ? this.position.y : 0
    }

    onMessage(message) {
        if (message.subject == 'player_target_change') {
            this.position = message.data.targetPosition
        }
    }
    
    render(context) {
        const maxOpacity = 0.1 / (2)
        const pulseSpeed = 1 / 10
        // The `(1)` must be kept at all times to prevent opacity
        // from being < 0
        const minOpacity = 0.5 + (1);

        if (!!this.position) {
            this.baseSprite.render(
                context,
                this.position.x - (this.baseSprite.width / 2),
                this.position.y - (this.baseSprite.height / 2),
                0,
                false,
                0, 1, 1,
                maxOpacity * (Math.sin(this.timer * pulseSpeed) + minOpacity),
            )
        }
    }
}