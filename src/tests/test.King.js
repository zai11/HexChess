import { Board } from "../Board.js";
import { Pawn } from '../pieces/Pawn.js';
import { Knight } from "../pieces/Knight.js";
import { King } from "../pieces/King.js";
import { tiles_data_white, coords_data_white, boundary_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);

describe('King Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('F7, not blocked should return [D6, E7, E8, F8, G9, G8, H8, G7, G6, F6, E5, E6]', () => {
            board.clear();
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'G8', 'H8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'w'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by own piece on G8 should return [D6, E7, E8, F8, G9, H8, G7, G6, F6, E5, E6]', () => {
            board.clear();
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'H8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'w'));
            board.addPiece(new Pawn(board, 'G8', 'w'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by enemy on G8 should return [D6, E7, E8, F8, G9, G8, G7, G6, F6, E5, E6]', () => {
            board.clear();
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'G8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'w'));
            board.addPiece(new Pawn(board, 'G8', 'b'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('J10, not blocked should return [H9, I10, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            board.clear();
            let expected = ['H9', 'I10', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'w'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('J10, blocked by own piece on I10 should return [H9, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            board.clear();
            let expected = ['H9', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'w'));
            board.addPiece(new Pawn(board, 'I10', 'w'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('J10, blocked by enemy on I10 should return [H9, I10, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            board.clear();
            let expected = ['I10', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'w'));
            board.addPiece(new Pawn(board, 'I10', 'b'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        
        it('J10, blocked by check on I10 should return [H9, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            board.clear();
            let expected = ['H9', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8'];
            board.addPiece(new King(board, 'J10', 'w'));
            board.addPiece(new Knight(board, 'F8', 'b'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
    });
});