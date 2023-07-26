import { Board } from "../src/Board.js";
import { Pawn, Bishop } from '../src/Piece.js';

let expect = chai.expect;

let tiles_data = [
    {
        "coordinate": "A1",
        "x": 400,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "A2",
        "x": 400,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "A3",
        "x": 400,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "A4",
        "x": 400,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "A5",
        "x": 400,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "A6",
        "x": 400,
        "y": 230,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "B1",
        "x": 448,
        "y": 582,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "B2",
        "x": 448,
        "y": 518,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "B3",
        "x": 448,
        "y": 454,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "B4",
        "x": 448,
        "y": 390,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "B5",
        "x": 448,
        "y": 326,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "B6",
        "x": 448,
        "y": 262,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "B7",
        "x": 448,
        "y": 198,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "C1",
        "x": 496,
        "y": 614,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "C2",
        "x": 496,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "C3",
        "x": 496,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "C4",
        "x": 496,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "C5",
        "x": 496,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "C6",
        "x": 496,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "C7",
        "x": 496,
        "y": 230,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "C8",
        "x": 496,
        "y": 166,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "D1",
        "x": 544,
        "y": 646,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "D2",
        "x": 544,
        "y": 582,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "D3",
        "x": 544,
        "y": 518,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "D4",
        "x": 544,
        "y": 454,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "D5",
        "x": 544,
        "y": 390,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "D6",
        "x": 544,
        "y": 326,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "D7",
        "x": 544,
        "y": 262,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "D8",
        "x": 544,
        "y": 198,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "D9",
        "x": 544,
        "y": 134,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "E1",
        "x": 592,
        "y": 678,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "E2",
        "x": 592,
        "y": 614,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "E3",
        "x": 592,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "E4",
        "x": 592,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "E5",
        "x": 592,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "E6",
        "x": 592,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "E7",
        "x": 592,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "E8",
        "x": 592,
        "y": 230,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "E9",
        "x": 592,
        "y": 166,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "E10",
        "x": 592,
        "y": 102,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "F1",
        "x": 640,
        "y": 710,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "F2",
        "x": 640,
        "y": 646,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "F3",
        "x": 640,
        "y": 582,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "F4",
        "x": 640,
        "y": 518,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "F5",
        "x": 640,
        "y": 454,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "F6",
        "x": 640,
        "y": 390,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "F7",
        "x": 640,
        "y": 326,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "F8",
        "x": 640,
        "y": 262,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "F9",
        "x": 640,
        "y": 198,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "F10",
        "x": 640,
        "y": 134,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "F11",
        "x": 640,
        "y": 70,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "G2",
        "x": 688,
        "y": 678,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "G3",
        "x": 688,
        "y": 614,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "G4",
        "x": 688,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "G5",
        "x": 688,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "G6",
        "x": 688,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "G7",
        "x": 688,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "G8",
        "x": 688,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "G9",
        "x": 688,
        "y": 230,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "G10",
        "x": 688,
        "y": 166,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "G11",
        "x": 688,
        "y": 102,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "H3",
        "x": 736,
        "y": 646,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "H4",
        "x": 736,
        "y": 582,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "H5",
        "x": 736,
        "y": 518,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "H6",
        "x": 736,
        "y": 454,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "H7",
        "x": 736,
        "y": 390,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "H8",
        "x": 736,
        "y": 326,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "H9",
        "x": 736,
        "y": 262,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "H10",
        "x": 736,
        "y": 198,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "H11",
        "x": 736,
        "y": 134,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "I4",
        "x": 784,
        "y": 614,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "I5",
        "x": 784,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "I6",
        "x": 784,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "I7",
        "x": 784,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "I8",
        "x": 784,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "I9",
        "x": 784,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "I10",
        "x": 784,
        "y": 230,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "I11",
        "x": 784,
        "y": 166,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "J5",
        "x": 832,
        "y": 582,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "J6",
        "x": 832,
        "y": 518,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "J7",
        "x": 832,
        "y": 454,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "J8",
        "x": 832,
        "y": 390,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "J9",
        "x": 832,
        "y": 326,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "J10",
        "x": 832,
        "y": 262,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "J11",
        "x": 832,
        "y": 198,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "K6",
        "x": 880,
        "y": 550,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "K7",
        "x": 880,
        "y": 486,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "K8",
        "x": 880,
        "y": 422,
        "colour": 2,
        "size": 64
    },
    {
        "coordinate": "K9",
        "x": 880,
        "y": 358,
        "colour": 0,
        "size": 64
    },
    {
        "coordinate": "K10",
        "x": 880,
        "y": 294,
        "colour": 1,
        "size": 64
    },
    {
        "coordinate": "K11",
        "x": 880,
        "y": 230,
        "colour": 2,
        "size": 64
    }
];

let coords_data = [
    {
        "content": "A",
        "x": 400,
        "y": 614
    },
    {
        "content": "B",
        "x": 448,
        "y": 646
    },
    {
        "content": "C",
        "x": 496,
        "y": 678
    },
    {
        "content": "D",
        "x": 544,
        "y": 710
    },
    {
        "content": "E",
        "x": 592,
        "y": 742
    },
    {
        "content": "F",
        "x": 640,
        "y": 774
    },
    {
        "content": "G",
        "x": 688,
        "y": 742
    },
    {
        "content": "H",
        "x": 736,
        "y": 710
    },
    {
        "content": "I",
        "x": 784,
        "y": 678
    },
    {
        "content": "J",
        "x": 832,
        "y": 646
    },
    {
        "content": "K",
        "x": 880,
        "y": 614
    },
    {
        "content": "1",
        "x": 352,
        "y": 518
    },
    {
        "content": "2",
        "x": 352,
        "y": 454
    },
    {
        "content": "3",
        "x": 352,
        "y": 390
    },
    {
        "content": "4",
        "x": 352,
        "y": 326
    },
    {
        "content": "5",
        "x": 352,
        "y": 262
    },
    {
        "content": "6",
        "x": 352,
        "y": 198
    },
    {
        "content": "7",
        "x": 400,
        "y": 166
    },
    {
        "content": "8",
        "x": 448,
        "y": 134
    },
    {
        "content": "9",
        "x": 496,
        "y": 102
    },
    {
        "content": "10",
        "x": 544,
        "y": 70
    },
    {
        "content": "11",
        "x": 592,
        "y": 38
    }
];

let board = new Board(undefined, tiles_data, coords_data);

describe('Bishop Class Tests:', () => {
    describe('getValidMoves()', () => {
        it('C2, not blocked should return [A1, B3, A4, D4, E6, F8, G10, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E6', 'F8', 'G10', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('C2, blocked by own piece on E6 should return [A1, B3, A4, D4, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'E6', 'white'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('C2, blocked by enemy piece on E6 should return [A1, B3, A4, D4, E6, E3, G4, I5, K6, D1]', () => {
            let expected = ['A1', 'B3', 'A4', 'D4', 'E6', 'E3', 'G4', 'I5', 'K6', 'D1'];
            board.addPiece(new Bishop(board, 'C2', 'white'));
            board.addPiece(new Pawn(board, 'E6', 'black'));
            let bishop = board.getPieceFromCoord('C2');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });

        it('E7, not blocked should return [C6, A5, D8, F9, G11, G8, I9, K10, F6, G5, H4, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'F6', 'G5', 'H4', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('E7, blocked by own piece on F6 should return [C6, A5, D8, F9, G11, G8, I9, K10, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            board.addPiece(new Pawn(board, 'F6'), 'white');
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('E7, blocked by enemy piece on F6 should return [C6, A5, D8, F9, G11, G8, I9, K10, F6, D5, C3, B1]', () => {
            let expected = ['C6', 'A5', 'D8', 'F9', 'G11', 'G8', 'I9', 'K10', 'F6', 'D5', 'C3', 'B1'];
            board.addPiece(new Bishop(board, 'E7', 'white'));
            board.addPiece(new Pawn(board, 'F6', 'black'));
            let bishop = board.getPieceFromCoord('E7');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });

        it('G6, not blocked should return [E5, C4, A3, F7, E8, D9, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'E8', 'D9', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('G6, blocked by own piece on E8 should return [E5, C4, A3, F7, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            board.addPiece(new Pawn(board, 'E8'), 'white');
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
        it('G6, blocked by enemy piece on E8 should return [E5, C4, A3, F7, E8, H8, I10, I7, K8, H5, I4, F4, E2]', () => {
            let expected = ['E5', 'C4', 'A3', 'F7', 'E8', 'H8', 'I10', 'I7', 'K8', 'H5', 'I4', 'F4', 'E2'];
            board.addPiece(new Bishop(board, 'G6', 'white'));
            board.addPiece(new Pawn(board, 'E8', 'black'));
            let bishop = board.getPieceFromCoord('G6');
            let result = bishop.getValidMoves();
            expect(result).to.equal(expected);
        });
    });
});