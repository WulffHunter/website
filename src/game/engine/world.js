export default class World {
    constructor() {
        this.entities = []

        this.messageQueue = []
    }
    
    push(entity) {
        let id = -1

        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i] === null) {
                this.entities[i] = entity
                id = i
                break
            }
        }

        if (id == -1) {
            this.entities.push(entity)
            id = this.entities.length - 1
        }
        
        !!entity && !!entity.onPush && entity.onPush(id, this)
    }

    remove(id) {
        this.entities[id] = null
    }

    input(pageInfo, eventInfo) {
        this.entities.forEach((e) => {
            !!e && !!e.input && e.input(pageInfo, eventInfo)
        })
    }

    step(pageInfo) {
        this.entities.forEach((e) => {
            // Using this, entities can push other entities,
            // or distribute messages
            !!e && !!e.step && e.step(pageInfo, this)
        })
    }

    // This is how entities communicate with one another
    distributeMessages() {
        // Empty out the message queue
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift()

            !!message && this.entities.forEach((e) => {
                !!e && !!e.onMessage && e.onMessage(message)
            })
        }
    }

    postMessage(subject, data) {
        this.messageQueue.push({
            subject,
            data,
        })
    }

    render(context) {
        this.entities
            .filter(e => !!e && !!e.depth && !!e.render)
            .sort((a, b) => a.depth() - b.depth())
            .forEach((e) => {
                e.render(context)
            })
    }
}
