import { Piece } from "./Piece.js";

export class Pawn extends Piece {
    constructor(board, coordinate, colour, scene) {
        super(board, coordinate, colour, 'pawn', scene);
    }

    getFENChar = function () {
        return this.colour == 'white' ? 'P' : 'p';
    }

    getPseudolegalMoves = function () {
        const pseudolegalMoves = [];
        const currentTile = this.board.getTileFromCoord(this.coordinate);

        // Add one tile forward:
        const neighbourTileNorth = currentTile.getNeighbourTileNorth();
        if (neighbourTileNorth !== undefined)
            pseudolegalMoves.push(neighbourTileNorth.coordinate);

        // If on pawn starting tile - add two tiles forward:
        if (currentTile.isPawnStartingTile && neighbourTileNorth != undefined) {
            const neighbourTileTwoNorth = neighbourTileNorth.getNeighbourTileNorth();
            if (neighbourTileTwoNorth !== undefined)
                pseudolegalMoves.push(neighbourTileTwoNorth.coordinate);
        }

        // If enemy player on north east tile -  add north east tile:
        const neighbourTileNorthEast = currentTile.getNeighbourTileNorthEast();
        if (neighbourTileNorthEast !== undefined && neighbourTileNorthEast.hasPiece() && neighbourTileNorthEast.getPiece().colour !== this.colour)
            pseudolegalMoves.push(neighbourTileNorthEast.coordinate);

        // If enemy player on north west tile - add north west tile:
        const neighbourTileNorthWest = currentTile.getNeighbourTileNorthWest();
        if (neighbourTileNorthWest !== undefined && neighbourTileNorthWest.hasPiece() && neighbourTileNorthWest.getPiece().colour !== this.colour)
            pseudolegalMoves.push(neighbourTileNorthWest.coordinate);

        // If enemy player on south east tile and south east tile is valid en passant - add north east tile:
        const neighbourTileSouthEast = currentTile.getNeighbourTileSouthEast();
        if (neighbourTileSouthEast !== undefined && neighbourTileNorthEast !== undefined) {
            if (neighbourTileSouthEast.hasPiece() && neighbourTileSouthEast.getPiece().colour !== this.colour && this.board.hasEnPassant && this.board.enPassant === neighbourTileSouthEast.coordinate)
                pseudolegalMoves.push(neighbourTileNorthEast.coordinate);
        }

        // If enemey player on south west tile and south west tile is valid en passant - add north west tile:
        const neighbourTileSouthWest = currentTile.getNeighbourTileSouthWest();
        if (neighbourTileSouthWest !== undefined && neighbourTileNorthWest !== undefined) {
            if (neighbourTileSouthWest.hasPiece() && neighbourTileSouthWest.getPiece().colour !== this.colour && this.board.hasEnPassant && this.board.enPassant === neighbourTileSouthWest.coordinate)
                pseudolegalMoves.push(neighbourTileNorthWest.coordinate);
        }

        return pseudolegalMoves;
    }
}