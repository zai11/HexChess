import { Board, Tile } from "../src/Board.js";

let should = chai.should();
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

let boundary_data = [
    0, 1, 2, 3, 4, 5, 6, 13, 21, 30, 40, 51, 63, 73, 83, 92, 100, 107, 108, 109, 110, 111, 112, 113, 114
];

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
            let result = board.getTileFromCoord('C8').getBackwardRight(undefined, boundary_data);
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
            let result = board.getTileFromCoord('K10').getForward(undefined, boundary_data);
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