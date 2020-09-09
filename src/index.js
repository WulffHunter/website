import { createMenu } from './website_functionality/menu'
import { smoothScrollToElement } from './website_functionality/scroll'
import { createGame } from './game/index.js'

require('./styles.css')

createMenu()

// Add the smooth-scroll function to the window so that
// elements can access it.
window.smoothScrollToElement = smoothScrollToElement

// Only render the game if it's on the front page
if (document.getElementById('game')) {
    createGame()
}
