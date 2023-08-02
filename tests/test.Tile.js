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

    describe('getForwardLeft()', () => {
        it('B2 should return A2', () => {
            let result = board.getTileFromCoord('B2').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('H7 should return G7', () => {
            let result = board.getTileFromCoord('H7').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G10 should return F10', () => {
            let result = board.getTileFromCoord('G10').getForwardLeft(undefined, boundary_data);
            expect(result).to.equal('F10');
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

    describe('getForwardRight()', () => {
        it('A3 should return B4', () => {
            let result = board.getTileFromCoord('A3').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('B2 should return C3', () => {
            let result = board.getTileFromCoord('B2').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('C7 should return D8', () => {
            let result = board.getTileFromCoord('C7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('D7 should return E8', () => {
            let result = board.getTileFromCoord('D7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('E7 should return F8', () => {
            let result = board.getTileFromCoord('E7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('F7 should return G8', () => {
            let result = board.getTileFromCoord('F7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('G10 should return H11', () => {
            let result = board.getTileFromCoord('G10').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('H11');
        });
        it('H7 should return I8', () => {
            let result = board.getTileFromCoord('H7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('I7 should return J8', () => {
            let result = board.getTileFromCoord('I7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('J8');
        });
        it('J7 should return K8', () => {
            let result = board.getTileFromCoord('J7').getForwardRight(undefined, boundary_data);
            expect(result).to.equal('K8');
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

    describe('getBackwardLeft()', () => {
        it('B2 should return A1', () => {
            let result = board.getTileFromCoord('B2').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('C7 should return B6', () => {
            let result = board.getTileFromCoord('C7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('B6');
        });
        it('D7 should return C6', () => {
            let result = board.getTileFromCoord('D7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E7 should return D6', () => {
            let result = board.getTileFromCoord('E7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('D6');
        });
        it('F7 should return E6', () => {
            let result = board.getTileFromCoord('F7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('E6');
        });
        it('G7 should return F6', () => {
            let result = board.getTileFromCoord('G7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('H7 should return G6', () => {
            let result = board.getTileFromCoord('H7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('I7 should return H6', () => {
            let result = board.getTileFromCoord('I7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('J7 should return I6', () => {
            let result = board.getTileFromCoord('J7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('I6');
        });
        it('K7 should return J6', () => {
            let result = board.getTileFromCoord('K7').getBackwardLeft(undefined, boundary_data);
            expect(result).to.equal('J6');
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

    describe('getBackwardRight()', () => {
        it('A3 should return B3', () => {
            let result = board.getTileFromCoord('A3').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('B2 should return C2', () => {
            let result = board.getTileFromCoord('B2').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('C7 should return D7', () => {
            let result = board.getTileFromCoord('C7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('D7 should return E7', () => {
            let result = board.getTileFromCoord('D7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('E7 should return F7', () => {
            let result = board.getTileFromCoord('E7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('F7 should return G7', () => {
            let result = board.getTileFromCoord('F7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G7 should return H7', () => {
            let result = board.getTileFromCoord('G7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('H7 should return I7', () => {
            let result = board.getTileFromCoord('H7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('I7 should return J7', () => {
            let result = board.getTileFromCoord('I7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('J7');
        });
        it('J7 should return K7', () => {
            let result = board.getTileFromCoord('J7').getBackwardRight(undefined, boundary_data);
            expect(result).to.equal('K7');
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

    describe('getForward()', () => {
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

    describe('getBackward()', () => {
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

    describe('getForwardLeftDiagonal()', () => {
        it('D5 should return C6', () => {
            let result = board.getTileFromCoord('D5').getForwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('G10 should return F11', () => {
            let result = board.getTileFromCoord('G10').getForwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G3 should return F4', () => {
            let result = board.getTileFromCoord('G3').getForwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E2 should return D3', () => {
            let result = board.getTileFromCoord('E2').getForwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('D3');
        });
        it('E9 should return undefined', () => {
            let result = board.getTileFromCoord('E9').getForwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardRightDiagonal()', () => {
        it('D5 should return E7', () => {
            let result = board.getTileFromCoord('D5').getForwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G3 should return H5', () => {
            let result = board.getTileFromCoord('G3').getForwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('H5');
        });
        it('E2 should return F4', () => {
            let result = board.getTileFromCoord('E2').getForwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E9 should return F11', () => {
            let result = board.getTileFromCoord('E9').getForwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G10 should return undefined', () => {
            let result = board.getTileFromCoord('G10').getForwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardLeftDiagonal()', () => {
        it('D5 should return C3', () => {
            let result = board.getTileFromCoord('D5').getBackwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('G10 should return F8', () => {
            let result = board.getTileFromCoord('G10').getBackwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G3 should return F1', () => {
            let result = board.getTileFromCoord('G3').getBackwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 should return D7', () => {
            let result = board.getTileFromCoord('E9').getBackwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('E2 should return undefined', () => {
            let result = board.getTileFromCoord('E2').getBackwardLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardRightDiagonal()', () => {
        it('D5 should return E4', () => {
            let result = board.getTileFromCoord('D5').getBackwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('E4');
        });
        it('E2 should return F1', () => {
            let result = board.getTileFromCoord('E2').getBackwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 should return F8', () => {
            let result = board.getTileFromCoord('E9').getBackwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G10 should return H9', () => {
            let result = board.getTileFromCoord('G10').getBackwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('H9');
        });
        it('G3 should return undefined', () => {
            let result = board.getTileFromCoord('G3').getBackwardRightDiagonal(undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getLeftDiagonal()', () => {
        it('D5 should return B4', () => {
            let result = board.getTileFromCoord('D5').getLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('G10 should return E9', () => {
            let result = board.getTileFromCoord('G10').getLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('E9');
        });
        it('G3 should return E2', () => {
            let result = board.getTileFromCoord('G3').getLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('E2');
        });
        it('E9 should return C8', () => {
            let result = board.getTileFromCoord('E9').getLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('C8');
        });
        it('E2 should return C1', () => {
            let result = board.getTileFromCoord('E2').getLeftDiagonal(undefined, boundary_data);
            expect(result).to.equal('C1');
        });
    });

    describe('getRightDiagonal()', () => {
        it('D5 should return F6', () => {
            let result = board.getTileFromCoord('D5').getRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('E2 should return G3', () => {
            let result = board.getTileFromCoord('E2').getRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('G3');
        });
        it('E9 should return G10', () => {
            let result = board.getTileFromCoord('E9').getRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('G10 should return I11', () => {
            let result = board.getTileFromCoord('G10').getRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('I11');
        });
        it('G3 should return I4', () => {
            let result = board.getTileFromCoord('G3').getRightDiagonal(undefined, boundary_data);
            expect(result).to.equal('I4');
        });
    });
});