import GameArea from './engine/gamearea.js'
import Game from './engine/game.js'
import { demoGameGenerator } from './demo_game'

export const createGame = () => {
    const game = new Game(demoGameGenerator)
    const gameArea = new GameArea('game', (viewWidth, viewHeight) => ({
        width: viewWidth,
        height: viewHeight - 70,
    }))

    gameArea.start(game, undefined)
}