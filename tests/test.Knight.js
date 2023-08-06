import { Board } from "../src/Board.js";
import { Pawn } from '../src/Pawn.js';
import { Knight } from "../src/Knight.js";
import { tiles_data_white, coords_data_white, boundary_data} from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);

describe('Knight Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('F7, not blocked should return [C5, C6, D8, E9, G10, H10, I9, I8, H6, G5, E4, D4]', () => {
            let expected = ['C5', 'C6', 'D8', 'E9', 'G10', 'H10', 'I9', 'I8', 'H6', 'G5', 'E4', 'D4'];
            board.addPiece(new Knight(board, 'F7', 'white'));
            let knight = board.getPieceFromCoord('F7');
            let result = knight.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by own piece on G10 should return [C5, C6, D8, E9, H10, I9, I8, H6, G5, E4, D4]', () => {
            let expected = ['C5', 'C6', 'D8', 'E9', 'H10', 'I9', 'I8', 'H6', 'G5', 'E4', 'D4'];
            board.addPiece(new Knight(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'G10', 'white'));
            let knight = board.getPieceFromCoord('F7');
            let result = knight.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('F7, blocked by enemy on G10 should return [C5, C6, D8, E9, G10, H10, I9, I8, H6, G5, E4, D4]', () => {
            let expected = ['C5', 'C6', 'D8', 'E9', 'G10', 'H10', 'I9', 'I8', 'H6', 'G5', 'E4', 'D4'];
            board.addPiece(new Knight(board, 'F7', 'white'));
            board.addPiece(new Pawn(board, 'G10', 'black'));
            let knight = board.getPieceFromCoord('F7');
            let result = knight.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('I7, not blocked should return [F5, F6, G8, H9, J10, K10, K6, J5, H4, G4]', () => {
            let expected = ['F5', 'F6', 'G8', 'H9', 'J10', 'K10', 'K6', 'J5', 'H4', 'G4'];
            board.addPiece(new Knight(board, 'I7', 'white'));
            let knight = board.getPieceFromCoord('I7');
            let result = knight.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('I7, blocked by own piece on G4 should return [F5, F6, G8, H9, J10, K10, K6, J5, H4]', () => {
            let expected = ['F5', 'F6', 'G8', 'H9', 'J10', 'K10', 'K6', 'J5', 'H4'];
            board.addPiece(new Knight(board, 'I7', 'white'));
            board.addPiece(new Pawn(board, 'G4', 'white'));
            let knight = board.getPieceFromCoord('I7');
            let result = knight.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('I7, blocked by enemy on G4 should return [F5, F6, G8, H9, J10, K10, K6, J5, H4, G4]', () => {
            let expected = ['F5', 'F6', 'G8', 'H9', 'J10', 'K10', 'K6', 'J5', 'H4', 'G4'];
            board.addPiece(new Knight(board, 'I7', 'white'));
            board.addPiece(new Pawn(board, 'G4', 'black'));
            let knight = board.getPieceFromCoord('I7');
            let result = knight.getValidMoves(undefined, boundary_data);
            console.log(expected)
            console.log(result);
            expect(result).deep.to.equal(expected);
        });
    });
});