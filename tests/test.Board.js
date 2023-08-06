import { Board, Tile } from "../src/Board.js";
import { Pawn, King } from '../src/Piece.js';
import { tiles_data_white, coords_data_white } from "./test.data.js";

let expect = chai.expect;

describe('Board Class Tests:', () => {
    describe('getTileFromCoord(coordinate:String)', () => {
        it('B2 should return correct B2 Tile Object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Tile(board, 448, 528, 2, "B2", 64);
            let result = board.getTileFromCoord('B2');
            expect(result.equals(expected)).to.equal(true);
        });
        it('H7 should return correct H7 Tile Object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Tile(board, 736, 400, 1, "H7", 64);
            let result = board.getTileFromCoord('H7');
            expect(result.equals(expected)).to.equal(true);
        });
        it('A-1 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A-1');
            expect(result).to.equal(undefined);
        });
        it('A7 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A7');
            expect(result).to.equal(undefined);
        });
        it('K2 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K2');
            expect(result).to.equal(undefined);
        });
        it('K12 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K12');
            expect(result).to.equal(undefined);
        });
    });

    // TODO: Add in unit tests for black perspective
    describe('getPositionsFromCoord(coordinate:String)', () => {
        it('B2 should return { x: \'448\', y: \'528\' }', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('B2');
            expect(result.x).to.equal(448);
            expect(result.y).to.equal(528);
        });
        it('H7 should return { x: \'736\', y: \'400\' }', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('H7');
            expect(result.x).to.equal(736);
            expect(result.y).to.equal(400);
        });
        it('A-1 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('A-1');
            expect(result).to.equal(undefined);
        });
        it('A7 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('A7');
            expect(result).to.equal(undefined);
        });
        it('K2 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('K2');
            expect(result).to.equal(undefined);
        });
        it('K12 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPositionsFromCoord('K12');
            expect(result).to.equal(undefined);
        });
    });

    // TODO: Add in unit tests for black perspective
    describe('getTileFromPositions(x:Integer, y:Integer)', () => {
        it('x: 448, y: 528 should return correct B2 Tile object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Tile(board, 448, 528, 2, "B2", 64);
            let result = board.getTileFromPositions(448, 528);
            expect(result.equals(expected)).to.equal(true);
        });
        it('x: 736, y: 400 should return correct H7 Tile Object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Tile(board, 736, 400, 1, "H7", 64);
            let result = board.getTileFromPositions(736, 400);
            expect(result.equals(expected)).to.equal(true);
        });
        it('x: 0, y: 0 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromPositions(0, 0);
            expect(result).to.equal(undefined);
        });
        it('x: Infinity, y: Infinity should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromPositions(Infinity, Infinity);
            expect(result).to.equal(undefined);
        });
        it('x: -500, y: 500 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromPositions(-500, 500);
            expect(result).to.equal(undefined);
        });
    });

    // TODO: Add in unit tests for black perspective
    describe('getCoordFromPositions(x:Integer, y:Integer)', () => {
        it('x: 448, y: 528 should return B2', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getCoordFromPositions(448, 528);
            expect(result).to.equal('B2');
        });
        it('x: 736, y: 400 should return H7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getCoordFromPositions(736, 400);
            expect(result).to.equal('H7');
        });
        it('x: 0, y: 0 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getCoordFromPositions(0, 0);
            expect(result).to.equal(undefined);
        });
        it('x: Infinity, y: Infinity should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getCoordFromPositions(Infinity, Infinity);
            expect(result).to.equal(undefined);
        });
        it('x: -500, y: 500 should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getCoordFromPositions(-500, 500);
            expect(result).to.equal(undefined);
        });
    });

    describe('getPieceFromCoord(coordinate:String)', () => {
        it('B2 should return correct Pawn object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Pawn(board, 'B2', 'white')
            board.addPiece(expected);
            let result = board.getPieceFromCoord('B2');
            expect(result.equals(expected)).to.equal(true);
        });
        it('F7 should return correct Pawn object', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let expected = new Pawn(board, 'F7', 'black')
            board.addPiece(expected);
            let result = board.getPieceFromCoord('F7');
            expect(result.equals(expected)).to.equal(true);
        });
        it('Empty tile coordinate should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getPieceFromCoord('A5');
            expect(result).to.equal(undefined);
        });
    });
});