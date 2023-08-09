import { Piece } from "./Piece.js";

export class King extends Piece {
    constructor(board, coordinate, colour) {
        let sprite = 'spr_piece_' + colour + '_king';
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
            let nextTile = eval('this.board.getTileFromCoord(currentTile.get' + direction + '(this.colour, context, boundary_data))');

            // if there is no nextTile
            if (nextTile === undefined)
                return;

            // if it's blocked by an enemy piece
            if (nextTile.hasPiece() && nextTile.getPiece().colour !== this.colour)
                validMoves.push(nextTile.coordinate);

            // if it's blocked by a friendly piece
            if (nextTile.hasPiece() && nextTile.getPiece().colour === this.colour)
                return;

            // if it's blocked by check
            if (this.board.isCheck(nextTile.coordinate, context, boundary_data))
                return;

            // if it's not blocked
            if (!nextTile.hasPiece())
                validMoves.push(nextTile.coordinate);
        });

        return validMoves;
    }
}