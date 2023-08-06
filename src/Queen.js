import { Piece } from "./Piece.js";

export class Queen extends Piece {
    constructor(board, coordinate, colour) {
        let sprite = 'spr_piece_' + colour + '_queen';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, sprite);
    }

    getValidMoves = (context, boundary_data) => {
        let validMoves = [];
        let currentTile = this.board.getTileFromPositions(this.x, this.y);

        let directions = ['LeftDiagonal', 'ForwardLeft', 'ForwardLeftDiagonal', 'Forward', 'ForwardRightDiagonal', 
            'ForwardRight', 'RightDiagonal', 'BackwardRight', 'BackwardRightDiagonal', 'Backward', 'BackwardLeftDiagonal',
            'BackwardLeft'];

        directions.forEach((direction) => {
            let nextTile = eval('this.board.getTileFromCoord(currentTile.get' + direction + '(context, boundary_data))');
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
    
                nextTile = eval('this.board.getTileFromCoord(nextTile.get' + direction + '(context, boundary_data))');
            }
        });

        return validMoves;
    }
}