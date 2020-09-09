import { getViewDimensions } from '../utils/utils'

export default class CentralText {
    constructor () {
        const dimensions = getViewDimensions()

        this.screenWidth = dimensions.width
        this.screenHeight = dimensions.height

        this.text = 'click anywhere.'
    }

    step(pageInfo) {
        this.screenWidth = pageInfo.width
        this.screenHeight = pageInfo.height
    }
    
    depth() {
        return -9999
    }

    render(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.25)'
        context.font = '30px Arial'
        context.textAlign = 'center'
        context.fillText(this.text, this.screenWidth / 2, this.screenHeight / 2)
    }
}