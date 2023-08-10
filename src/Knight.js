import { Piece } from "./Piece.js";

export class Knight extends Piece {
    constructor(board, coordinate, colour, context) {
        let spriteLoc = 'spr_piece_' + colour + '_knight';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, spriteLoc, context);
    }

    getValidMoves = (context, boundary_data) => {
        let validMoves = [];
        let currentTile = this.board.getTileFromPositions(this.x, this.y);

        let directions = [[  'Left', 'Left', 
                             'ForwardLeft', 'ForwardLeft',
                             'ForwardRight', 'ForwardRight',
                             'Right', 'Right',
                             'BackwardRight', 'BackwardRight',
                             'BackwardLeft', 'BackwardLeft'], 
                          [  'BackwardLeft', 'ForwardLeft',
                             'ForwardLeft', 'Forward',
                             'Forward', 'ForwardRight',
                             'ForwardRight', 'BackwardRight',
                             'BackwardRight', 'Backward',
                             'Backward', 'BackwardLeft']]

        for (let i = 0; i < directions[0].length; i++) {
            let tempTile = eval('this.board.getTileFromCoord(currentTile.get' + directions[0][i] + 'Diagonal(this.colour, context, boundary_data))');
            
            if (tempTile === undefined)
                continue;
            
            let nextTile = eval('this.board.getTileFromCoord(tempTile.get' + directions[1][i] + '(this.colour, context, boundary_data))');

            // If there is no nextTile
            if (nextTile === undefined)
                continue;

            // If the nextTile is blocked by enemy piece
            if (nextTile.hasPiece() && nextTile.getPiece().colour !== this.colour)
                validMoves.push(nextTile.coordinate);

            // If the nextTile is blocked by friendly piece
            if (nextTile.hasPiece() && nextTile.getPiece().colour !== this.colour)
                continue;

            // If the nextTile is not blocked
            if (!nextTile.hasPiece())
                validMoves.push(nextTile.coordinate);

        }

        return validMoves;
    }
}