import { Piece } from "./Piece.js";

export class Rook extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'rook', scene);
    }

    getFENChar = function () {
        return this.colour == 'white' ? 'R' : 'r';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);
        const directions = ["North", "NorthEast", "SouthEast", "South", "SouthWest", "NorthWest"];
        directions.forEach(direction => {
            let neighbourTile = currentTile["getNeighbourTile" + direction]();
            while(neighbourTile !== undefined) {
                pseudolegalMoves.push(neighbourTile.coordinate);
                neighbourTile = neighbourTile["getNeighbourTile" + direction]();
            }
        });
        return pseudolegalMoves;
    }
}