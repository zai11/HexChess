export class MouseInputManager {
    constructor(context) {
        this.context = context;
        this.context.input.on('pointerdown', this.click);
    }

    click = (pointer) => {
        let clickedTile = this.getClickedTile(pointer);
        this.context.board.tileSelected(clickedTile, this.context);
    }

    getClickedTile = (pointer) => {
        let closestTile = {x: undefined, y: undefined};
        let closestTileDelta = Infinity;
        this.context.board.tiles.forEach((tile) => {
            let delta = Math.pow(Math.abs(pointer.x - tile.x), 2) + Math.pow(Math.abs(pointer.y - tile.y), 2);
            if (delta < closestTileDelta) {
                closestTile = {x: tile.x, y: tile.y};
                closestTileDelta = delta;
            }
        });
        return this.context.board.getTileFromPositions(closestTile.x, closestTile.y);
    }
}