import { Piece } from './Piece.js';

export class Bishop extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'bishop', scene);
    }

    getFENChar = function () {
        return this.colour == 'white' ? 'B' : 'b';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);
        const directions = ["East", "NorthWest", "NorthEast", "SouthEast", "SouthWest", "West"];
        directions.forEach(direction => {
            let neighbourTile = currentTile["getNeighbourTileDiagonal" + direction]();
            while(neighbourTile !== undefined) {
                pseudolegalMoves.push(neighbourTile.coordinate);
                neighbourTile = neighbourTile["getNeighbourTileDiagonal" + direction]();
            }
        });
        return pseudolegalMoves;
    }
}