export class Piece {
    constructor(board, coordinate, colour, x, y, spriteLoc, context, scale = 0.07) {
        this.board = board;
        this.coordinate = coordinate;
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.spriteLoc = spriteLoc;
        this.scale = scale;
        this.updated = true;
        if (context !== undefined)
            this.sprite = context.add.sprite(this.x, this.y, this.spriteLoc).setScale(this.scale).setDepth(1);
    }

    moveTo (coordinate) {
        this.board.getTileFromCoord(coordinate).updated = true;
        this.coordinate = coordinate;
        let positions = this.board.getPositionsFromCoord(coordinate);
        this.sprite.x = positions.x;
        this.sprite.y = positions.y;
        this.x = positions.x;
        this.y = positions.y;
    }

    take = () => {
        this.sprite.destroy();
    }

    equals = (piece) => {
        return (piece.board === this.board) && (piece.coordinate === this.coordinate) && (piece.x === this.x) && 
            (piece.y === this.y) && (piece.sprite === this.sprite) && (piece.scale === this.scale);
    }

    getValidMoves = () => {
        return undefined;
    }

    getAttacks = (context, boundary_data) => {
        return this.getValidMoves(context, boundary_data);
    }
}