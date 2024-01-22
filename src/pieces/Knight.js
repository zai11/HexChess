import { Piece } from "./Piece.js";

export class Knight extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'knight', scene);
    }

    getFENChar = function () {
        return this.colour === 'white' ? 'N' : 'n';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);
        const directions = [
            ["East", "East", "NorthEast", "NorthEast", "NorthWest", "NorthWest",
             "West", "West", "SouthWest", "SouthWest", "SouthEast", "SouthEast"],
            ["SouthEast", "NorthEast", "NorthEast", "North", "North", "NorthWest",
             "NorthWest", "SouthWest", "SouthWest", "South", "South", "SouthEast"]
        ];

        for (let i = 0; i < directions[0].length; i++) {
            const tempTile = currentTile["getNeighbourTileDiagonal" + directions[0][i]]();
            if (tempTile === undefined)
                continue;
            const neighbourTile = tempTile["getNeighbourTile" + directions[1][i]]();
            if (neighbourTile !== undefined)
                pseudolegalMoves.push(neighbourTile.coordinate);
        }
        return pseudolegalMoves;
    }
}