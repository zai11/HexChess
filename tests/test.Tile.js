import { Board } from "../src/Board.js";
import { Tile } from "../src/Tile.js";
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
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('F8 as white should return E8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F8').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('H7 as white should return G7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G10 as white should return F10', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('F10');
        });
        it('K10 as white should return J10', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('J10');
        });
        it('A3 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C8').getForwardLeft('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return C2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('F8 as black should return G8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F8').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('H7 as black should return I7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('G10 as black should return H10', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('H10');
        });
        it('A3 as black should return B3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('C8 as black should return D8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('K10 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getForwardLeft('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardRight()', () => {
        it('A3 as white should return B4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('B2 as white should return C3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('C7 as white should return D8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('D7 as white should return E8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('E7 as white should return F8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('F7 as white should return G8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('G10 as white should return H11', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('H11');
        });
        it('H7 as white should return I8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('I7 as white should return J8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('J8');
        });
        it('J7 as white should return K8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal('K8');
        });
        it('K10 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('H11 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H11').getForwardRight('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return A1', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('C7 as black should return B6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('B6');
        });
        it('D7 as black should return C6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E7 as black should return D6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('D6');
        });
        it('F7 as black should return E6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('E6');
        });
        it('G10 as black should return F9', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('F9');
        });
        it('H7 as black should return G6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('I7 as black should return H6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('J7 as black should return I6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('I6');
        });
        it('K10 as black should return J9', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('J9');
        });
        it('H11 as black should return G10', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H11').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('A3 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForwardRight('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardLeft()', () => {
        it('B2 as white should return A1', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('A1');
        });
        it('C7 as white should return B6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('B6');
        });
        it('D7 as white should return C6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E7 as white should return D6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('D6');
        });
        it('F7 as white should return E6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('E6');
        });
        it('G7 as white should return F6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('H7 as white should return G6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('G6');
        });
        it('I7 as white should return H6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('J7 as white should return I6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('I6');
        });
        it('K7 as white should return J6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K7').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal('J6');
        });
        it('A3 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C1').getBackwardLeft('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return C3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('C7 as black should return D8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('D8');
        });
        it('D7 as black should return E8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('E8');
        });
        it('E7 as black should return F8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('F7 as black should return G8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('G8');
        });
        it('G7 as black should return H8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('H7 as black should return I8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('I8');
        });
        it('I7 as black should return J8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('J8');
        });
        it('J7 as black should return K8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('K8');
        });
        it('A3 as black should return B4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('C1 as black should return D2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal('D2');
        });
        it('K7 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K7').getBackwardLeft('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardRight()', () => {
        it('A3 as white should return B3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('B2 as white should return C2', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('C7 as white should return D7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('D7 as white should return E7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('E7 as white should return F7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('F7 as white should return G7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('F7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('G7 as white should return H7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('H7 as white should return I7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('I7 as white should return J7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('I7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('J7');
        });
        it('J7 as white should return K7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('J7').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal('K7');
        });
        it('K10 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K10').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('G2 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G2').getBackwardRight('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return A2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('C7 as black should return B7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('B7');
        });
        it('D7 as black should return C7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('C7');
        });
        it('E7 as black should return D7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('F7 as black should return E7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('F7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G7 as black should return F7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('H7 as black should return G7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('I7 as black should return H7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('I7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('J7 as black should return I7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('J7').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('K10 as black should return J10', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K10').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('J10');
        });
        it('G2 as black should return F2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G2').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal('F2');
        });
        it('A3 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackwardRight('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForward()', () => {
        it('B2 as white should return B3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getForward('white', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('H7 as white should return H8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getForward('white', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('A3 as white should return A4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getForward('white', undefined, boundary_data);
            expect(result).to.equal('A4');
        });
        it('K11 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K11').getForward('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C8').getForward('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return B1', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getForward('black', undefined, boundary_data);
            expect(result).to.equal('B1');
        });
        it('H7 as black should return H6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getForward('black', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('A3 as black should return A2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getForward('black', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('K11 as black should return K10', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K11').getForward('black', undefined, boundary_data);
            expect(result).to.equal('K10');
        });
        it('C8 as black should return C7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getForward('black', undefined, boundary_data);
            expect(result).to.equal('C7');
        });
        it('K6 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K6').getForward('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getForward('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackward()', () => {
        it('B2 as white should return B1', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('B2').getBackward('white', undefined, boundary_data);
            expect(result).to.equal('B1');
        });
        it('H7 as white should return H6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('H7').getBackward('white', undefined, boundary_data);
            expect(result).to.equal('H6');
        });
        it('A3 as white should return A2', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('A3').getBackward('white', undefined, boundary_data);
            expect(result).to.equal('A2');
        });
        it('K6 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('K6').getBackward('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C1 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('C1').getBackward('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('B2 as black should return B3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('B2').getBackward('black', undefined, boundary_data);
            expect(result).to.equal('B3');
        });
        it('H7 as black should return H8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('H7').getBackward('black', undefined, boundary_data);
            expect(result).to.equal('H8');
        });
        it('A3 as black should return A4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('A3').getBackward('black', undefined, boundary_data);
            expect(result).to.equal('A4');
        });
        it('K6 as black should return K7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K6').getBackward('black', undefined, boundary_data);
            expect(result).to.equal('K7');
        });
        it('C1 as black should return C2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C1').getBackward('black', undefined, boundary_data);
            expect(result).to.equal('C2');
        });
        it('K11 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('K11').getBackward('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('C8 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('C8').getBackward('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardLeftDiagonal()', () => {
        it('D5 as white should return C6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getForwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('G10 as white should return F11', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G3 as white should return F4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getForwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E2 as white should return D3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getForwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('D3');
        });
        it('E9 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getForwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return E4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getForwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('E4');
        });
        it('G10 as black should return H9', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('H9');
        });
        it('E2 as black should return F1', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getForwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as black should return F8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getForwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G3 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getForwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getForwardRightDiagonal()', () => {
        it('D5 as white should return E7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getForwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G3 as white should return H5', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getForwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('H5');
        });
        it('E2 as white should return F4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getForwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E9 as white should return F11', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getForwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G10 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getForwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return C3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getForwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('G3 as black should return F1', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getForwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as black should return D7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getForwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('G10 as black should return F8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getForwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('E2 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getForwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardLeftDiagonal()', () => {
        it('D5 as white should return C3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getBackwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('C3');
        });
        it('G10 as white should return F8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getBackwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G3 as white should return F1', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getBackwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as white should return D7', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getBackwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('E2 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getBackwardLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return E7', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getBackwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('G3 as black should return H5', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getBackwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('H5');
        });
        it('E9 as black should return F11', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getBackwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('E2 as black should return F4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getBackwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('G10 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getBackwardLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getBackwardRightDiagonal()', () => {
        it('D5 as white should return E4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getBackwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('E4');
        });
        it('E2 as white should return F1', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getBackwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F1');
        });
        it('E9 as white should return F8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getBackwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F8');
        });
        it('G10 as white should return H9', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getBackwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('H9');
        });
        it('G3 as white should return undefined', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getBackwardRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('D5 as black should return C6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getBackwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('C6');
        });
        it('E2 as black should return D3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getBackwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('D3');
        });
        it('G10 as black should return F11', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getBackwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F11');
        });
        it('G3 as black should return F4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getBackwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F4');
        });
        it('E9 as black should return undefined', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getBackwardRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });

    describe('getLeftDiagonal()', () => {
        it('D5 as white should return B4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('G10 as white should return E9', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('E9');
        });
        it('G3 as white should return E2', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('E2');
        });
        it('E9 as white should return C8', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('C8');
        });
        it('E2 as white should return C1', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getLeftDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('C1');
        });
        it('D5 as black should return F6', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('G10 as black should return I11', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('I11');
        });
        it('G3 as black should return I4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('I4');
        });
        it('E9 as black should return G10', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('E2 as black should return G3', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getLeftDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('G3');
        });
    });

    describe('getRightDiagonal()', () => {
        it('D5 as white should return F6', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('D5').getRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('F6');
        });
        it('E2 as white should return G3', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E2').getRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('G3');
        });
        it('E9 as white should return G10', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('E9').getRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('G10');
        });
        it('G10 as white should return I11', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G10').getRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('I11');
        });
        it('G3 as white should return I4', () => {
            let board = new Board(undefined, 'white', tiles_data_white, coords_data_white);
            let result = board.getTileFromCoord('G3').getRightDiagonal('white', undefined, boundary_data);
            expect(result).to.equal('I4');
        });
        it('D5 as black should return B4', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('D5').getRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('B4');
        });
        it('E2 as black should return C1', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E2').getRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('C1');
        });
        it('E9 as black should return C8', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('E9').getRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('C8');
        });
        it('G10 as black should return E9', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G10').getRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('E9');
        });
        it('G3 as black should return E2', () => {
            let board = new Board(undefined, 'black', tiles_data_black, coords_data_black);
            let result = board.getTileFromCoord('G3').getRightDiagonal('black', undefined, boundary_data);
            expect(result).to.equal('E2');
        });
    });
});