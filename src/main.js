import GameScene from './scenes/GameScene.js'

const config = {
	type: Phaser.CANVAS,
	width: 1280,
	height: 810,
	antialias: true,
	roundPixels: true,
	scene: [GameScene],
	fps: {
		target: 60,
		forceSetTimeOut: true
	}
}

export default new Phaser.Game(config)