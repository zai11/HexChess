export class Piece {
    constructor(board, coordinate, colour, x, y, sprite, scale = 0.05) {
        this.board = board;
        this.coordinate = coordinate;
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scale = scale;
        this.updated = true;
    }

    render = (context) => {
        context.add.image(this.x, this.y, this.sprite).setScale(this.scale).setDepth(1);
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