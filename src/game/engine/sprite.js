const drawImageWithMirror = (
	context,
	image,
	// The source x and y of the image (from a spritesheet)
	sx, sy,
	swidth, sheight,
	// The destination on the canvas to place the image at
	dx, dy,
	// The final size that the image will be on the canvas
	dwidth, dheight,
	// Whether the image should be mirrored horizontally
	mirror,
	// The angle the image should be drawn at (defaults to 0)
	angle,
	// The x and y scale of the image
	xScale, yScale,
	// The opacity of the image
	opacity,
) => {
	context.save()

	if (opacity != undefined) {
		context.globalAlpha = opacity
	}

	context.translate(dx + dwidth / 2, dy + dheight / 2)
    context.rotate((angle || 0) * Math.PI / 180)
    context.scale((xScale || 1) * (mirror ? -1 : 1), (yScale || 1))
    context.translate(-dwidth / 2, -dheight / 2)

    context.drawImage(image, sx, sy, swidth, sheight, 0, 0, dwidth, dheight)

    context.restore()
}

export default class Sprite {
	// `options` is an object as follows:
	// {
	// 	frameCount: the number of frames in the spritesheet
	// 	framerate: the framerate of the sprite
	// }
    constructor(width, height, image, options) {
		this.frameIndex = 0
		this.tickCount = 0

        this.width = width
		this.height = height
		this.image = new Image()
		this.image.src = image

		this.frameCount = options.frameCount || 1
		this.ticksPerFrame = (1000 / options.frameRate) || 500

		this.animationFinished = false
    }

	setFrameRate(framerate) {
		this.ticksPerFrame = (1000 / framerate) || 500
	}

	setFrameIndex(frameIndex) {
		this.frameIndex = frameIndex
	}

	render(context, x, y, frame, mirror, angle, xScale, yScale, opacity) {
		context.clearRect(0, 0, this.width, this.height)
		if (frame < 0) {
			drawImageWithMirror(
				context,
				this.image,
				this.frameIndex * this.width,
				0,
				this.width,
				this.height,
				x,
				y,
				this.width,
				this.height,
				mirror,
				angle,
				xScale, yScale,
				opacity,
			)
		} else {
			drawImageWithMirror(
				context,
				this.image,
				frame * this.width,
				0,
				this.width,
				this.height,
				x,
				y,
				this.width,
				this.height,
				mirror,
				angle,
				xScale, yScale,
				opacity,
			)
		}

		// The sprite is responsible for updating itself
		this.update(frame)
	}

	update(frame) {
		this.tickCount++
		this.animationFinished = false

		if (this.tickCount >= this.ticksPerFrame) {

			this.tickCount = 0

			// If looping is currently on
			if (frame < 0) {
				if (this.frameIndex < this.frameCount - 1) {
					this.frameIndex++
				} else {
					this.frameIndex = 0

					this.animationFinished = true
				}
			} else {
				// Set the current frame in the loop to the current frame
				// we're on.
				this.frameIndex = frame
			}
		}
	}

	getCurrentFrame() {
		return this.frameIndex
	}

	getMaxFrame() {
		return this.frameCount
	}

	animationComplete() {
		return this.animationFinished
	}
}