import { Piece } from "./Piece.js";

export class King extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'king', scene);
    }

    getFENChar = function () {
        return this.colour == 'white' ? 'K' : 'k';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);
        const directions = [ "North", "DiagonalNorthEast", "NorthEast", "DiagonalEast", "SouthEast", "DiagonalSouthEast",
                            "SouthEast", "South", "DiagonalSouthWest", "SouthWest", "DiagonalWest", "DiagonalNorthWest",
                            "NorthWest" ];
        directions.forEach(direction => {
            const neighbourTile = currentTile["getNeighbourTile" + direction]();
            if (neighbourTile !== undefined)
                pseudolegalMoves.push(neighbourTile.coordinate);
        });
        return pseudolegalMoves;
    }
}