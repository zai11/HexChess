import { Board } from "../Board.js";
import { Queen } from "../pieces/Queen.js";
import { Pawn } from '../pieces/Pawn.js';
import { tiles_data_white, coords_data_white, boundary_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);

describe('Queen Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('F7, not blocked should return [D6, B5, E7, D7, C7, B7, E8, D9, F8, F9, F10, F11, G9, H11, G8, H9, I10, J11, H8, J9, G7, H7, I7, J7, K7, G6, H5, I4, F6, F5, F4, F3, F2, F1, E5, D3, C1, E6, D5, C4, B3, A2]', () => {
            let expected = ['D6', 'B5', 'E7', 'D7', 'C7', 'B7', 'E8', 'D9', 'F8', 'F9', 'F10', 'F11', 'G9', 'H11', 'G8', 'H9',
                'I10', 'J11', 'H8', 'J9', 'G7', 'H7', 'I7', 'J7', 'K7', 'G6', 'H5', 'I4', 'F6', 'F5', 'F4', 'F3', 'F2', 
                'F1', 'E5', 'D3', 'C1', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Queen(board, 'F7', 'w'));
            let queen = board.getPieceFromCoord('F7');
            let result = queen.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by own piece on F6 should return [D6, B5, E7, D7, C7, B7, E8, D9, F8, F9, F10, F11, G9, H11, G8, H9, I10, J11, H8, J9, G7, H7, I7, J7, K7, G6, H5, I4, E5, D3, C1, E6, D5, C4, B3, A2]', () => {
            let expected = ['D6', 'B5', 'E7', 'D7', 'C7', 'B7', 'E8', 'D9', 'F8', 'F9', 'F10', 'F11', 'G9', 'H11', 'G8', 'H9',
                'I10', 'J11', 'H8', 'J9', 'G7', 'H7', 'I7', 'J7', 'K7', 'G6', 'H5', 'I4', 'E5', 'D3', 'C1', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Queen(board, 'F7', 'w'));
            board.addPiece(new Pawn(board, 'F6', 'w'));
            let queen = board.getPieceFromCoord('F7');
            let result = queen.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by enemy on F6 should return [D6, B5, E7, D7, C7, B7, E8, D9, F8, F9, F10, F11, G9, H11, G8, H9, I10, J11, H8, J9, G7, H7, I7, J7, K7, G6, H5, I4, F6, E5, D3, C1, E6, D5, C4, B3, A2]', () => {
            let expected = ['D6', 'B5', 'E7', 'D7', 'C7', 'B7', 'E8', 'D9', 'F8', 'F9', 'F10', 'F11', 'G9', 'H11', 'G8', 'H9',
                'I10', 'J11', 'H8', 'J9', 'G7', 'H7', 'I7', 'J7', 'K7', 'G6', 'H5', 'I4', 'F6', 'E5', 'D3', 'C1', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Queen(board, 'F7', 'w'));
            board.addPiece(new Pawn(board, 'F6', 'b'));
            let queen = board.getPieceFromCoord('F7');
            let result = queen.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
    });
});