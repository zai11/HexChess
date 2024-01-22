import { PromotionPrompt } from "./PromotionPrompt.js";

export class UserInterfaceManager {
    constructor(scene) {
        const style_white = {color: '#FFF', fontSize: 20};
        this.scene = scene;
        this.fps = this.scene.add.text(10, 10, '60 FPS', style_white)
        this.playerToMove = this.scene.add.text(1270, 10, 'Player To Move: White', style_white).setOrigin(1,0);
        this.halfMoveClock = this.scene.add.text(1270, 40, 'Half Move Clock: 0', style_white).setOrigin(1, 0);
        this.fullMoveClock = this.scene.add.text(1270, 70, 'Full Move Clock: 0', style_white).setOrigin(1, 0);
    }

    createPromotionPrompt = function (piece) {
        if (this.promotionPrompt !== undefined)
            this.destroyPromotionPrompt();
        this.promotionPrompt = new PromotionPrompt(this.scene, piece);
    }

    destroyPromotionPrompt = function () {
        this.promotionPrompt.destroy();
        this.promotionPrompt = undefined;
        this.scene.board.awaitingPromotion = false;
    }

    update = function () {
        this.fps.setText(Math.round(this.scene.game.loop.actualFps) + ' FPS');
        this.playerToMove.setText('Player To Move: ' + (this.scene.board.colour === 'w' ? 'White' : 'Black'));
        this.halfMoveClock.setText('Half Move Clock: ' + this.scene.board.halfMoveClock);
        this.fullMoveClock.setText('Full Move Clock: ' + this.scene.board.fullMoveClock);
    }
}