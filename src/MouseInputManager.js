export class MouseInputManager {
    constructor(scene) {
        this.scene = scene;
        this.scene.input.on('pointerdown', this.click, this);
    }

    click (pointer) {
        let clickedTile = this.getClickedTile(pointer);
        this.scene.board.tileSelected(clickedTile);
    }

    getClickedTile (pointer) {
        let closestTile = {x: undefined, y: undefined};
        let closestTileDelta = Infinity;
        this.scene.board.tiles.forEach((tile) => {
            let delta = Math.pow(Math.abs(pointer.x - tile.x), 2) + Math.pow(Math.abs(pointer.y - tile.y), 2);
            if (delta < closestTileDelta) {
                closestTile = {x: tile.x, y: tile.y};
                closestTileDelta = delta;
            }
        });
        return this.scene.board.getTileFromPositions(closestTile.x, closestTile.y);
    }
}