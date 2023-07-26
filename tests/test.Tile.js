import { Board, Tile } from "../src/Board.js";
import { boundary_data, tiles_data, coords_data } from './test.data.js'

let expect = chai.expect;

let board = new Board(undefined, tiles_data, coords_data);

describe('Tile Class Tests:', () => {
    describe('equals(tile:Tile)', () => {
        it('Tiles with exactly the same properties should return true', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(true);
        });
        it('Tiles with different x values should return false', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 0, 518, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different y values should return false', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 0, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different colour values should return false', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 1, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different coordinate values should return false', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'H7', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different size values should return false', () => {
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'B2', 16);
            expect(tile1.equals(tile2)).to.equal(false);
        })
    });
    describe('getForwardLeft(coordinate:String)', () => {
        it('B2 should return A2', () => {
            let result = board.getTileFromCoord('B2').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('H7 should return G7', () => {
            let result = board.getTileFromCoord('H7').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('K10 should return J10', () => {
            let result = board.getTileFromCoord('K10').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('J10');
        });
        it('A3 should return undefined', () => {
            let result = board.getTileFromCoord('A3').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 should return undefined', () => {
            let result = board.getTileFromCoord('C8').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('getForwardRight(coordinate:String)', () => {
        it('B2 should return C3', () => {
            let result = board.getTileFromCoord('B2').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('H7 should return I8', () => {
            let result = board.getTileFromCoord('H7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('A3 should return B4', () => {
            let result = board.getTileFromCoord('A3').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('K10 should return undefined', () => {
            let result = board.getTileFromCoord('K10').getForwardRight(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('H11 should return undefined', () => {
            let result = board.getTileFromCoord('H11').getForwardRight(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('getBackwardLeft(coordinate:String)', () => {
        it('B2 should return A1', () => {
            let result = board.getTileFromCoord('B2').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('H7 should return G6', () => {
            let result = board.getTileFromCoord('H7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('K10 should return J9', () => {
            let result = board.getTileFromCoord('K10').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('J9');
        });
        it('A3 should return undefined', () => {
            let result = board.getTileFromCoord('A3').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 should return undefined', () => {
            let result = board.getTileFromCoord('C1').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('getBackwardRight(coordinate:String)', () => {
        it('B2 should return C2', () => {
            let result = board.getTileFromCoord('B2').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('H7 should return I7', () => {
            let result = board.getTileFromCoord('H7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('A3 should return B3', () => {
            let result = board.getTileFromCoord('A3').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('K10 should return undefined', () => {
            let result = board.getTileFromCoord('K10').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('G2 should return undefined', () => {
            let result = board.getTileFromCoord('G2').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('getForward(coordinate:String)', () => {
        it('B2 should return B3', () => {
            let result = board.getTileFromCoord('B2').getForward(undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('H7 should return H8', () => {
            let result = board.getTileFromCoord('H7').getForward(undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('A3 should return A4', () => {
            let result = board.getTileFromCoord('A3').getForward(undefined, boundary_data);
            expect(result).to.equal('A4');
        });
        it('K11 should return undefined', () => {
            let result = board.getTileFromCoord('K11').getForward(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 should return undefined', () => {
            let result = board.getTileFromCoord('C8').getForward(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('getBackward(coordinate:String)', () => {
        it('B2 should return B1', () => {
            let result = board.getTileFromCoord('B2').getBackward(undefined, boundary_data);
            expect(result).to.equal('B1');
        });
        it('H7 should return H6', () => {
            let result = board.getTileFromCoord('H7').getBackward(undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('A3 should return A2', () => {
            let result = board.getTileFromCoord('A3').getBackward(undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('K6 should return undefined', () => {
            let result = board.getTileFromCoord('K6').getBackward(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 should return undefined', () => {
            let result = board.getTileFromCoord('C1').getBackward(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
});