import { Board } from "../Board.js";
import { Rook } from "../pieces/Rook.js";
import { Pawn } from '../pieces/Pawn.js';
import { tiles_data_white, coords_data_white, boundary_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);

describe('Rook Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('F7, not blocked should return [E7, D7, C7, B7, F8, F9, F10, F11, G8, H9, I10, J11, G7, H7, I7, J7, K7, F6, F5, F4, F3, F2, F1, E6, D5, C4, B3, A2]', () => {
            let expected = ['E7', 'D7', 'C7', 'B7', 'F8', 'F9', 'F10', 'F11', 'G8', 'H9', 'I10', 'J11', 'G7', 'H7',
                'I7', 'J7', 'K7', 'F6', 'F5', 'F4', 'F3', 'F2', 'F1', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Rook(board, 'F7', 'white'));
            let rook = board.getPieceFromCoord('F7');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by own piece on F3 should return [E7, D7, C7, B7, F8, F9, F10, F11, G8, H9, I10, J11, G7, H7, I7, J7, K7, F6, F5, F4, E6, D5, C4, B3, A2]', () => {
            let expected = ['E7', 'D7', 'C7', 'B7', 'F8', 'F9', 'F10', 'F11', 'G8', 'H9', 'I10', 'J11', 'G7', 'H7',
                'I7', 'J7', 'K7', 'F6', 'F5', 'F4', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Rook(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'F3', 'white'));
            let rook = board.getPieceFromCoord('F7');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by enemy on F3 should return [E7, D7, C7, B7, F8, F9, F10, F11, G8, H9, I10, J11, G7, H7, I7, J7, K7, F6, F5, F4, F3, E6, D5, C4, B3, A2]', () => {
            let expected = ['E7', 'D7', 'C7', 'B7', 'F8', 'F9', 'F10', 'F11', 'G8', 'H9', 'I10', 'J11', 'G7', 'H7',
                'I7', 'J7', 'K7', 'F6', 'F5', 'F4', 'F3', 'E6', 'D5', 'C4', 'B3', 'A2'];
            board.addPiece(new Rook(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'F3', 'black'));
            let rook = board.getPieceFromCoord('F7');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('C5, not blocked should return [B5, A5, C6, C7, C8, D6, E7, F8, G9, H10, I11, D5, E5, F5, G5, H5, I5, J5, C4, C3, C2, C1, B4, A3]', () => {
            let expected = ['B5', 'A5', 'C6', 'C7', 'C8', 'D6', 'E7', 'F8', 'G9', 'H10', 'I11', 'D5', 'E5', 'F5', 'G5',
                'H5', 'I5', 'J5', 'C4', 'C3', 'C2', 'C1', 'B4', 'A3'];
            board.addPiece(new Rook(board, 'C5', 'white'));
            let rook = board.getPieceFromCoord('C5');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C5, blocked by own piece on E5 should return [B5, A5, C6, C7, C8, D6, E7, F8, G9, H10, I11, D5, C4, C3, C2, C1, B4, A3]', () => {
            let expected = ['B5', 'A5', 'C6', 'C7', 'C8', 'D6', 'E7', 'F8', 'G9', 'H10', 'I11', 'D5', 'C4', 'C3', 'C2',
                'C1', 'B4', 'A3'];
            board.addPiece(new Rook(board, 'C5', 'white'));
            board.addPiece(new Pawn(board, 'E5', 'white'));
            let rook = board.getPieceFromCoord('C5');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C5, blocked by enemy on E5 should return [B5, A5, C6, C7, C8, D6, E7, F8, G9, H10, I11, D5, E5, C4, C3, C2, C1, B4, A3]', () => {
            let expected = ['B5', 'A5', 'C6', 'C7', 'C8', 'D6', 'E7', 'F8', 'G9', 'H10', 'I11', 'D5', 'E5', 'C4', 'C3', 'C2', 'C1', 'B4', 'A3'];
            board.addPiece(new Rook(board, 'C5', 'white'));
            board.addPiece(new Pawn(board, 'E5', 'black'));
            let rook = board.getPieceFromCoord('C5');
            let result = rook.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
    });
});