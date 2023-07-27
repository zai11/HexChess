import { Board } from "../src/Board.js";
import { Pawn, Knight, King } from '../src/Piece.js';
import { tiles_data, coords_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, tiles_data, coords_data);

describe('King Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('F7, not blocked should return [D6, E7, E8, F8, G9, G8, H8, G7, G6, F6, E5, E6]', () => {
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'G8', 'H8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'white'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('F7, blocked by own piece on G8 should return [D6, E7, E8, F8, G9, H8, G7, G6, F6, E5, E6]', () => {
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'H8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'G8', 'white'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('F7, blocked by enemy on G8 should return [D6, E7, E8, F8, G9, G8, H8, G7, G6, F6, E5, E6]', () => {
            let expected = ['D6', 'E7', 'E8', 'F8', 'G9', 'G8', 'H8', 'G7', 'G6', 'F6', 'E5', 'E6'];
            board.addPiece(new King(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'G8', 'black'));
            let king = board.getPieceFromCoord('F7');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });

        it('J10, not blocked should return [H9, I10, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            let expected = ['H9', 'I10', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'white'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('J10, blocked by own piece on I10 should return [H9, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            let expected = ['H9', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'white'));
            board.addPiece(new Pawn(board, 'I10', 'white'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('J10, blocked by enemy on I10 should return [H9, I10, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            let expected = ['H9', 'I10', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'white'));
            board.addPiece(new Pawn(board, 'I10', 'black'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
        
        it('J10, blocked by check on I10 should return [H9, I11, J11, K11, K10, K9, J9, I8, I9]', () => {
            let expected = ['H9', 'I11', 'J11', 'K11', 'K10', 'K9', 'J9', 'I8', 'I9'];
            board.addPiece(new King(board, 'J10', 'white'));
            board.addPiece(new Knight(board, 'F8', 'black'));
            let king = board.getPieceFromCoord('J10');
            let result = king.getValidMoves();
            expect(result).to.equal(expected);
        });
    });
});