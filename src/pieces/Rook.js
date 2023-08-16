import { Piece } from "./Piece.js";

export class Rook extends Piece {
    constructor(board, coordinate, colour, context) {
        let spriteLoc = 'spr_piece_' + colour + '_rook';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, spriteLoc, context);
    }

    getValidMoves = (context, boundary_data) => {
        let validMoves = [];
        let currentTile = this.board.getTileFromPositions(this.x, this.y);

        let directions = ['ForwardLeft', 'Forward', 'ForwardRight', 'BackwardRight', 'Backward', 'BackwardLeft']

        // While there is a leftDiagonal
        directions.forEach((direction) => {
            let nextTile = eval('this.board.getTileFromCoord(currentTile.get' + direction + '(this.colour, context, boundary_data))');
            while (nextTile !== undefined) {
                // if it's blocked by an enemy piece
                if (nextTile.hasPiece() && nextTile.getPiece().colour !== this.colour) {
                    validMoves.push(nextTile.coordinate);
                    break;
                }
    
                // if it's blocked by a friendly piece
                if (nextTile.hasPiece() && nextTile.getPiece().colour === this.colour) {
                    break;
                }
    
                // if it's not blocked
                if (!nextTile.hasPiece())
                    validMoves.push(nextTile.coordinate);
    
                nextTile = eval('this.board.getTileFromCoord(nextTile.get' + direction + '(this.colour, context, boundary_data))');
            }
        });

        return validMoves;
    }
}