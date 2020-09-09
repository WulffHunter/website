import Sprite from './engine/sprite'
import Player from './player/player'
import LocationMarker from './player/location_marker'
import EnemyFactory from './enemy/enemy_factory'

import CentralText from './gui/central_text'
import TopText from './gui/top_text'

import WulffWalk from './images/WulffWalk.png'
import LykotikBlade from './images/LykotikBlade.png'

import FiendRise from './images/Fiend/FiendRise.png'
import FiendHover from './images/Fiend/FiendHover.png'
import FiendAttack from './images/Fiend/FiendAttack.png'
import FiendHurt from './images/Fiend/FiendHurt.png'
import FiendDeath from './images/Fiend/FiendDeath.png'
import FiendDead from './images/Fiend/FiendDead.png'

import PlayerBase from './images/PlayerBase.png'
import MonsterBase from './images/Width64pxMonsterBase.png'
import LocationMarkerBase from './images/Width64pxLocationMarkerBase.png'

export const demoGameGenerator = (world) => {
    const WulffWalkSprite = new Sprite(32, 32, WulffWalk, { frameRate: 200, frameCount: 2 })
    const LykotikBladeSprite = new Sprite(32, 32, LykotikBlade, {})

    // A function to generate a list of Fiend sprites.
    // It's a function rather than an object so that animations of objects
    // with the same sprite don't conflict.
    const FiendSpritesGenerator = () => ({
        rise: new Sprite(64, 64, FiendRise, { frameRate: 200, frameCount: 10 }),
        hover: new Sprite(64, 64, FiendHover, { frameRate: 200, frameCount: 6 }),
        attack: new Sprite(64, 64, FiendAttack, { frameRate: 300, frameCount: 18 }),
        hurt: new Sprite(64, 64, FiendHurt, { frameRate: 300, frameCount: 6 }),
        death: new Sprite(64, 64, FiendDeath, { frameRate: 350, frameCount: 13 }),
        dead: new Sprite(64, 64, FiendDead, {}),
    })

    const PlayerBaseSprite = new Sprite(32, 32, PlayerBase, {})
    const MonsterBaseSprite = new Sprite(65, 33, MonsterBase, {})
    const LocationMarkerSprite = new Sprite(65, 33, LocationMarkerBase, {})

    const player = new Player(WulffWalkSprite, LykotikBladeSprite, PlayerBaseSprite)
    world.push(player)

    const locationMarker = new LocationMarker(LocationMarkerSprite)
    world.push(locationMarker)

    const centralText = new CentralText()
    world.push(centralText)

    const topText = new TopText()
    world.push(topText)

    // Any enemy factory for Fiends. Generates new Fiends every 500 steps.
    const enemyFactory = new EnemyFactory(
        FiendSpritesGenerator,
        MonsterBaseSprite,
        500,
        64,
        64,
    )
    world.push(enemyFactory)
}