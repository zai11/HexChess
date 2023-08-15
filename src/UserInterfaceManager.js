export class UserInterfaceManager {
    constructor(context) {
        const style = {color: '#FFF', fontSize: 20};
        this.context = context;
        this.fps = this.context.add.text(10, 10, '60 FPS', style)
        this.playerToMove = this.context.add.text(1270, 10, 'Player To Move: White', style).setOrigin(1,0);
        this.halfMoveClock = this.context.add.text(1270, 40, 'Half Move Clock: 0', style).setOrigin(1, 0);
        this.fullMoveClock = this.context.add.text(1270, 70, 'Full Move Clock: 0', style).setOrigin(1, 0);

    }

    update = () => {
        this.fps.setText(Math.round(this.context.game.loop.actualFps) + ' FPS');
        this.playerToMove.setText('Player To Move: ' + (this.context.board.playerToMove === 'w' ? 'White' : 'Black'));
        this.halfMoveClock.setText('Half Move Clock: ' + this.context.board.halfMoveClock);
        this.fullMoveClock.setText('Full Move Clock: ' + this.context.board.fullMoveClock);
    }
}