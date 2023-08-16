import { PromotionPrompt } from "./PromotionPrompt.js";

export class UserInterfaceManager {
    constructor(context) {
        const style_white = {color: '#FFF', fontSize: 20};
        this.context = context;
        this.fps = this.context.add.text(10, 10, '60 FPS', style_white)
        this.playerToMove = this.context.add.text(1270, 10, 'Player To Move: White', style_white).setOrigin(1,0);
        this.halfMoveClock = this.context.add.text(1270, 40, 'Half Move Clock: 0', style_white).setOrigin(1, 0);
        this.fullMoveClock = this.context.add.text(1270, 70, 'Full Move Clock: 0', style_white).setOrigin(1, 0);
    }

    createPromotionPrompt = (piece) => {
        if (this.promotionPrompt !== undefined)
            this.destroyPromotionPrompt();
        this.promotionPrompt = new PromotionPrompt(this.context, piece);
    }

    destroyPromotionPrompt = () => {
        this.promotionPrompt.destroy();
        this.promotionPrompt = undefined;
        this.context.board.awaitingPromotion = false;
    }

    update = () => {
        this.fps.setText(Math.round(this.context.game.loop.actualFps) + ' FPS');
        this.playerToMove.setText('Player To Move: ' + (this.context.board.colour === 'w' ? 'White' : 'Black'));
        this.halfMoveClock.setText('Half Move Clock: ' + this.context.board.halfMoveClock);
        this.fullMoveClock.setText('Full Move Clock: ' + this.context.board.fullMoveClock);
    }
}