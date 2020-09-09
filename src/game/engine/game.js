import World from './world.js'

export default class Game {
	constructor(worldGeneratorFunction) {
		this.world = new World()

		if (!!worldGeneratorFunction) {
			worldGeneratorFunction(this.world)
		}
	}

	update(context, pageInfo, eventInfo) {
		if (!!eventInfo) {
			this.world.input(pageInfo, eventInfo)
		}
		this.world.step(pageInfo)
		this.world.distributeMessages()
		this.world.render(context)
	}
}