import { Board } from "../Board.js";
import { Tile } from "../Tile.js";
import { boundary_data, tiles_data_white, coords_data_white, tiles_data_black, coords_data_black } from './test.data.js'

let expect = chai.expect;

describe('Tile Class Tests:', () => {
    describe('equals(tile:Tile)', () => {
        it('Tiles with exactly the same properties should return true', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(true);
        });
        it('Tiles with different x values should return false', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 0, 518, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different y values should return false', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 0, 2, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different colour values should return false', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 1, 'B2', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different coordinate values should return false', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'H7', 64);
            expect(tile1.equals(tile2)).to.equal(false);
        });
        it('Tiles with different size values should return false', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let tile1 = new Tile(board, 448, 518, 2, 'B2', 64);
            let tile2 = new Tile(board, 448, 518, 2, 'B2', 16);
            expect(tile1.equals(tile2)).to.equal(false);
        })
    });

    describe('getForwardLeft()', () => {
        it('B2 as white should return A2', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('F8 as white should return E8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F8').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('H7 as white should return G7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G10 as white should return F10', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('F10');
        });
        it('K10 as white should return J10', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('J10');
        });
        it('A3 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C8').getForwardLeft('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return C2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('F8 as black should return G8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F8').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('H7 as black should return I7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('G10 as black should return H10', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('H10');
        });
        it('A3 as black should return B3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('C8 as black should return D8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('K10 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getForwardLeft('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardRight()', () => {
        it('A3 as white should return B4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('B2 as white should return C3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('C7 as white should return D8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('D7 as white should return E8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('E7 as white should return F8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('F7 as white should return G8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('G10 as white should return H11', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('H11');
        });
        it('H7 as white should return I8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('I7 as white should return J8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('J8');
        });
        it('J7 as white should return K8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal('K8');
        });
        it('K10 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('H11 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H11').getForwardRight('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return A1', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('C7 as black should return B6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('B6');
        });
        it('D7 as black should return C6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E7 as black should return D6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('D6');
        });
        it('F7 as black should return E6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('E6');
        });
        it('G10 as black should return F9', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('F9');
        });
        it('H7 as black should return G6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('I7 as black should return H6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('J7 as black should return I6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('I6');
        });
        it('K10 as black should return J9', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('J9');
        });
        it('H11 as black should return G10', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H11').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('A3 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForwardRight('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardLeft()', () => {
        it('B2 as white should return A1', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('C7 as white should return B6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('B6');
        });
        it('D7 as white should return C6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E7 as white should return D6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('D6');
        });
        it('F7 as white should return E6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('E6');
        });
        it('G7 as white should return F6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('H7 as white should return G6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('I7 as white should return H6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('J7 as white should return I6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('I6');
        });
        it('K7 as white should return J6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K7').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal('J6');
        });
        it('A3 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C1').getBackwardLeft('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return C3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('C7 as black should return D8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('D7 as black should return E8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('E7 as black should return F8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('F7 as black should return G8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('G7 as black should return H8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('H7 as black should return I8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('I7 as black should return J8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('J8');
        });
        it('J7 as black should return K8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('K8');
        });
        it('A3 as black should return B4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('C1 as black should return D2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal('D2');
        });
        it('K7 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K7').getBackwardLeft('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardRight()', () => {
        it('A3 as white should return B3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('B2 as white should return C2', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('C7 as white should return D7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('D7 as white should return E7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('E7 as white should return F7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('F7 as white should return G7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G7 as white should return H7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('H7 as white should return I7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('I7 as white should return J7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('J7');
        });
        it('J7 as white should return K7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal('K7');
        });
        it('K10 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('G2 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G2').getBackwardRight('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return A2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('C7 as black should return B7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('B7');
        });
        it('D7 as black should return C7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('C7');
        });
        it('E7 as black should return D7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('F7 as black should return E7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G7 as black should return F7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('H7 as black should return G7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('I7 as black should return H7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('J7 as black should return I7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('K10 as black should return J10', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('J10');
        });
        it('G2 as black should return F2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G2').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal('F2');
        });
        it('A3 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackwardRight('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForward()', () => {
        it('B2 as white should return B3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForward('w', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('H7 as white should return H8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForward('w', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('A3 as white should return A4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForward('w', undefined, boundary_data);
            expect(result).to.equal('A4');
        });
        it('K11 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K11').getForward('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C8').getForward('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return B1', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForward('b', undefined, boundary_data);
            expect(result).to.equal('B1');
        });
        it('H7 as black should return H6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForward('b', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('A3 as black should return A2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForward('b', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('K11 as black should return K10', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K11').getForward('b', undefined, boundary_data);
            expect(result).to.equal('K10');
        });
        it('C8 as black should return C7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getForward('b', undefined, boundary_data);
            expect(result).to.equal('C7');
        });
        it('K6 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K6').getForward('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getForward('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackward()', () => {
        it('B2 as white should return B1', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackward('w', undefined, boundary_data);
            expect(result).to.equal('B1');
        });
        it('H7 as white should return H6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackward('w', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('A3 as white should return A2', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackward('w', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('K6 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K6').getBackward('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C1').getBackward('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return B3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackward('b', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('H7 as black should return H8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackward('b', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('A3 as black should return A4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackward('b', undefined, boundary_data);
            expect(result).to.equal('A4');
        });
        it('K6 as black should return K7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K6').getBackward('b', undefined, boundary_data);
            expect(result).to.equal('K7');
        });
        it('C1 as black should return C2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getBackward('b', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('K11 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K11').getBackward('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getBackward('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardLeftDiagonal()', () => {
        it('D5 as white should return C6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getForwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('G10 as white should return F11', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G3 as white should return F4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getForwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E2 as white should return D3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getForwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('D3');
        });
        it('E9 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getForwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return E4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getForwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('E4');
        });
        it('G10 as black should return H9', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('H9');
        });
        it('E2 as black should return F1', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getForwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as black should return F8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getForwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G3 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getForwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardRightDiagonal()', () => {
        it('D5 as white should return E7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getForwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G3 as white should return H5', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getForwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('H5');
        });
        it('E2 as white should return F4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getForwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E9 as white should return F11', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getForwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G10 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return C3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getForwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('G3 as black should return F1', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getForwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as black should return D7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getForwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('G10 as black should return F8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('E2 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getForwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardLeftDiagonal()', () => {
        it('D5 as white should return C3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getBackwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('G10 as white should return F8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getBackwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G3 as white should return F1', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getBackwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as white should return D7', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getBackwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('E2 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getBackwardLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return E7', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getBackwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G3 as black should return H5', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getBackwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('H5');
        });
        it('E9 as black should return F11', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getBackwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('E2 as black should return F4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getBackwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('G10 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getBackwardLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardRightDiagonal()', () => {
        it('D5 as white should return E4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getBackwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('E4');
        });
        it('E2 as white should return F1', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getBackwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as white should return F8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getBackwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G10 as white should return H9', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getBackwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('H9');
        });
        it('G3 as white should return undefined', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getBackwardRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return C6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getBackwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E2 as black should return D3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getBackwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('D3');
        });
        it('G10 as black should return F11', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getBackwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G3 as black should return F4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getBackwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E9 as black should return undefined', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getBackwardRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getLeftDiagonal()', () => {
        it('D5 as white should return B4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('G10 as white should return E9', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('E9');
        });
        it('G3 as white should return E2', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('E2');
        });
        it('E9 as white should return C8', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('C8');
        });
        it('E2 as white should return C1', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getLeftDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('C1');
        });
        it('D5 as black should return F6', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('G10 as black should return I11', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('I11');
        });
        it('G3 as black should return I4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('I4');
        });
        it('E9 as black should return G10', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('E2 as black should return G3', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getLeftDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('G3');
        });
    });

    describe('getRightDiagonal()', () => {
        it('D5 as white should return F6', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('E2 as white should return G3', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('G3');
        });
        it('E9 as white should return G10', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('G10 as white should return I11', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('I11');
        });
        it('G3 as white should return I4', () => {
            let board = new Board(undefined, 'w', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getRightDiagonal('w', undefined, boundary_data);
            expect(result).to.equal('I4');
        });
        it('D5 as black should return B4', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('E2 as black should return C1', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('C1');
        });
        it('E9 as black should return C8', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('C8');
        });
        it('G10 as black should return E9', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('E9');
        });
        it('G3 as black should return E2', () => {
            let board = new Board(undefined, 'b', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getRightDiagonal('b', undefined, boundary_data);
            expect(result).to.equal('E2');
        });
    });
});