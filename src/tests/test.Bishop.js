import { Board } from "../Board.js";
import { Pawn } from '../Pawn.js';
import { Bishop } from '../Bishop.js';
import { tiles_data_white, coords_data_white, boundary_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);

describe('Bishop Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('C2, not blocked should return [A1, B3, A4, D4, E6, F8, G10, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E6', 'F8', 'G10', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, blocked by own piece on E6 should return [A1, B3, A4, D4, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'E6', 'white'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, blocked by enemy piece on E6 should return [A1, B3, A4, D4, E6, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E6', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'E6', 'black'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('E7, not blocked should return [C6, A5, D8, F9, G11, G8, I9, K10, F6, G5, H4, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'F6', 'G5', 'H4', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('E7, blocked by own piece on F6 should return [C6, A5, D8, F9, G11, G8, I9, K10, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            board.addPiece(new Pawn(board, 'F6', 'white'));
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('E7, blocked by enemy piece on F6 should return [C6, A5, D8, F9, G11, G8, I9, K10, F6, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'F6', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            board.addPiece(new Pawn(board, 'F6', 'black'));
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('G6, not blocked should return [E5, C4, A3, F7, E8, D9, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'E8', 'D9', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('G6, blocked by own piece on E8 should return [E5, C4, A3, F7, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            board.addPiece(new Pawn(board, 'E8', 'white'));
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('G6, blocked by enemy piece on E8 should return [E5, C4, A3, F7, E8, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'E8', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            board.addPiece(new Pawn(board, 'E8', 'black'));
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
    });
});