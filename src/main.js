import Phaser from './lib/phaser.js'

import GameScene from './scenes/GameScene.js'

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 810,
	antialias: true,
	roundPixels: true,
	scene: [GameScene]
}

export default new Phaser.Game(config)