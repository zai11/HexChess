import { Piece } from "./Piece.js";

export class Rook extends Piece {
    constructor(board, coordinate, colour) {
        let sprite = 'spr_piece_' + colour + '_rook';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, sprite);
    }
}