
import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "../src/Utilities.js";
import { Board } from '../src/Board.js';
import { Pawn } from '../src/Piece.js';
import { tiles_data, coords_data, boundary_data } from "./test.data.js";

let expect = chai.expect;

let board = new Board(undefined, tiles_data, coords_data);

describe('Pawn Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('C2, white, cannot take should return [C3, C4]', () => {
            board.clear();
            let expected = ['C3', 'C4'];
            board.addPiece(new Pawn(board, 'C2', 'white'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, white, can take on D3 should return [C3, C4, D3]', () => {
            board.clear();
            let expected = ['C3', 'C4', 'D3'];
            board.addPiece(new Pawn(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'D3', 'black'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, white, can take on B2 should return [C3, C4, B2]', () => {
            board.clear();
            let expected = ['C3', 'C4', 'B2'];
            board.addPiece(new Pawn(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'B2', 'black'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, white, can take on D3 en passant should return [C3, C4, D3]', () => {
            board.clear();
            let expected = ['C3', 'C4', 'D3'];
            board.addPiece(new Pawn(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'D2', 'black'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C2, white, can take on B2 en passant should return [C3, C4, B2]', () => {
            board.clear();
            let expected = ['C3', 'C4', 'B2'];
            board.addPiece(new Pawn(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'B1', 'black'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C3, white, cannot take should return [C4]', () => {
            board.clear();
            let expected = ['C4'];
            board.addPiece(new Pawn(board, 'C3', 'white'));
            let pawn = board.getPieceFromCoord('C3');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C3, white, can take on D4 should return [C4, D4]', () => {
            board.clear();
            let expected = ['C4', 'D4'];
            board.addPiece(new Pawn(board, 'C3', 'white'));
            board.addPiece(new Pawn(board, 'D4', 'black'));
            let pawn = board.getPieceFromCoord('C3');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C3, white, can take on B3 should return [C4, B3]', () => {
            board.clear();
            let expected = ['C4', 'B3'];
            board.addPiece(new Pawn(board, 'C3', 'white'));
            board.addPiece(new Pawn(board, 'B3', 'black'));
            let pawn = board.getPieceFromCoord('C3');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C3, white, can take on D4 en passant should return [C4, D4]', () => {
            board.clear();
            let expected = ['C4', 'D4'];
            board.addPiece(new Pawn(board, 'C3', 'white'));
            board.addPiece(new Pawn(board, 'D3', 'black'));
            let pawn = board.getPieceFromCoord('C3');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C3, white, can take on B3 en passant should return [C4, B3]', () => {
            board.clear();
            let expected = ['C4', 'B3'];
            board.addPiece(new Pawn(board, 'C3', 'white'));
            board.addPiece(new Pawn(board, 'B2', 'black'));
            let pawn = board.getPieceFromCoord('C3');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });

        it('C7, black, cannot take should return [C6, C5]', () => {
            board.clear();
            let expected = ['C6', 'C5'];
            board.addPiece(new Pawn(board, 'C9', 'black'));
            let pawn = board.getPieceFromCoord('C9');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C7, black, can take on D7 should return [C6, C5, D7]', () => {
            board.clear();
            let expected = ['C6', 'C5', 'D7'];
            board.addPiece(new Pawn(board, 'C8', 'black'));
            board.addPiece(new Pawn(board, 'D7', 'white'));
            let pawn = board.getPieceFromCoord('C7');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C7, black, can take on B6 should return [C6, C5, B6]', () => {
            board.clear();
            let expected = ['C6', 'C5', 'B6'];
            board.addPiece(new Pawn(board, 'C7', 'black'));
            board.addPiece(new Pawn(board, 'B6', 'white'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C7, black, can take on D7 en passant should return [C6, C5, D7]', () => {
            board.clear();
            let expected = ['C6', 'C5', 'D7'];
            board.addPiece(new Pawn(board, 'C7', 'black'));
            board.addPiece(new Pawn(board, 'D8', 'white'));
            let pawn = board.getPieceFromCoord('C2');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C7, black, can take on B6 en passant should return [C6, C5, B6]', () => {
            board.clear();
            let expected = ['C6', 'C5', 'B6'];
            board.addPiece(new Pawn(board, 'C7', 'black'));
            board.addPiece(new Pawn(board, 'B7', 'white'));
            let pawn = board.getPieceFromCoord('C7');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C6, black, cannot take should return [C5]', () => {
            board.clear();
            let expected = ['C5'];
            board.addPiece(new Pawn(board, 'C6', 'black'));
            let pawn = board.getPieceFromCoord('C6');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C6, black, can take on D6 should return [C5, D6]', () => {
            board.clear();
            let expected = ['C5', 'D6'];
            board.addPiece(new Pawn(board, 'C6', 'black'));
            board.addPiece(new Pawn(board, 'D6', 'white'));
            let pawn = board.getPieceFromCoord('C6');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C6, black, can take on B5 should return [C5, B5]', () => {
            board.clear();
            let expected = ['C5', 'B5'];
            board.addPiece(new Pawn(board, 'C6', 'black'));
            board.addPiece(new Pawn(board, 'B5', 'white'));
            let pawn = board.getPieceFromCoord('C6');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C6, black, can take on D6 en passant should return [C5, D6]', () => {
            board.clear();
            let expected = ['C5', 'D6'];
            board.addPiece(new Pawn(board, 'C6', 'black'));
            board.addPiece(new Pawn(board, 'D7', 'white'));
            let pawn = board.getPieceFromCoord('C6');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
        it('C6, black, can take on B5 en passant should return [C5, B5]', () => {
            board.clear();
            let expected = ['C5', 'B5'];
            board.addPiece(new Pawn(board, 'C6', 'black'));
            board.addPiece(new Pawn(board, 'B6', 'white'));
            let pawn = board.getPieceFromCoord('C6');
            let result = pawn.getValidMoves(undefined, boundary_data);
            expect(result).deep.to.equal(expected);
        });
    });
});