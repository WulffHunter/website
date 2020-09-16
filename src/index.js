import { createMenu } from './website_functionality/menu'
import { smoothScrollToElement } from './website_functionality/scroll'
import { clickableImages } from './website_functionality/clickable_images'
import { botproofMail } from './website_functionality/botproof_mail'
import { createGame } from './game/index.js'

require('./styles.css')

createMenu()
clickableImages()

// Add the smooth-scroll and botproof mail functions 
// to the window so that elements can access it.
window.smoothScrollToElement = smoothScrollToElement
window.botproofMail = botproofMail

// Only render the game if it's on the front page
if (document.getElementById('game')) {
    createGame()
}
