import Point from '../utils/point'

import { getViewDimensions } from '../utils/utils'

// `gameSizeFn` is a function that takes the screen width and height
// and returns the desired size as an object `{ width, height }`
export default class GameArea {
	constructor(canvasId, gameSizeFn) {
		this.eventQueue = []

		this.pageInfo = {
			width: undefined,
			height: undefined,
		}
	
		if (!canvasId) {
			this.createCanvas(gameSizeFn)
		} else {
			this.getDOMCanvasById(canvasId)
		}

		// The function run when the canvas is resized (ensures 
		// information is passed into the game)
		const resizeFn = (() => {
			const dimensions = getViewDimensions()

			// We use an intermediate object rather than `dimensions`
			// so we can modify this one accordingly.
			const canvasDimensions = gameSizeFn(
				dimensions.width,
				dimensions.height
			)

			this.canvas.width = canvasDimensions.width
			this.canvas.height = canvasDimensions.height

			// Change the known page info
			this.pageInfo = {
				...canvasDimensions,
			}

		}).bind(this)

		// Ensure the canvas is at the correct size (counters CSS scaling errors)
		resizeFn()

		// If the window is resized, resize the canvas as well
		window.addEventListener('resize', resizeFn)
	}

	getDOMCanvasById(canvasId) {
		this.canvas = document.getElementById(canvasId)

		this.context = this.canvas.getContext('2d')
		
		this.pageInfo = {
			width: this.canvas.width,
			height: this.canvas.height,
		}
	}

	createCanvas(gameSizeFn) {
		this.canvas = document.createElement('canvas')

		const viewDimensions = getViewDimensions()
		const dimensions = gameSizeFn(
			viewDimensions.width,
			viewDimensions.height
		)

		this.canvas.width = dimensions.width
		this.canvas.height = dimensions.height

		this.pageInfo = {
			...dimensions,
		}

		this.context = this.canvas.getContext('2d')

		document.body.insertBefore(this.canvas, document.body.childNodes[2])
	}

	start(game) {
		this.interval = setInterval(() => this.update(game), 20)
		
		this.canvas.addEventListener('mouseup', ((e) => {
			this.pushEvent(new Point(e.offsetX, e.offsetY))
		}).bind(this))
	}

	update(game) {
		this.clear()
		game.update(this.context, this.pageInfo, this.getEvent())
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	stop() {
		clearInterval(this.interval)
	}

	getContext() {
		return this.context
	}

	getCanvas() {
		return this.canvas
	}

	pushEvent(event) {
		if (!!event) {
			this.eventQueue.push(event)
		}
	}

	getEvent() {
		return this.eventQueue.shift()
	}
}