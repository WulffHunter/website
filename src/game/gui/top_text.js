import { getViewDimensions } from '../utils/utils'

export default class TopText {
    constructor () {
        const dimensions = getViewDimensions()

        this.screenWidth = dimensions.width
        this.screenHeight = dimensions.height

        this.text = 'all art, design, and coding by me.'

        this.topMargin = 30
    }

    step(pageInfo) {
        this.screenWidth = pageInfo.width
        this.screenHeight = pageInfo.height
    }
    
    depth() {
        return -9999
    }

    render(context) {
        const headerBar = document.getElementById('header')

        const headerHeight = !!headerBar ? headerBar.offsetHeight : 0

        context.fillStyle = 'rgba(0, 0, 0, 0.25)'
        context.font = '20px Arial'
        context.textAlign = 'center'
        context.fillText(
            this.text,
            this.screenWidth / 2,
            headerHeight + this.topMargin
        )
    }
}