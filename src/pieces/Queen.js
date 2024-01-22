import { Piece } from "./Piece.js";

export class Queen extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'queen', scene);
    }

    getFENChar = function () {
        return this.colour == 'white' ? 'Q' : 'q';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);
        const directions = [ "North", "DiagonalNorthEast", "NorthEast", "DiagonalEast", "SouthEast", "DiagonalSouthEast",
                            "SouthEast", "South", "DiagonalSouthWest", "SouthWest", "DiagonalWest", "DiagonalNorthWest",
                            "NorthWest" ];
        
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