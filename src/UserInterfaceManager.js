import { PromotionPrompt } from "./PromotionPrompt.js";

export class UserInterfaceManager {

    DEVELOPMENT_BUILD = true;

    constructor(scene, DEBUG) {
        const style_white = {color: '#FFF', fontSize: 20};
        this.scene = scene;
        if (this.DEVELOPMENT_BUILD)
            this.fps = this.scene.add.text(10, 10, '60 FPS', style_white);
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
        if (this.DEVELOPMENT_BUILD)
            this.fps.setText(Math.round(this.scene.game.loop.actualFps) + ' FPS');
    }
}