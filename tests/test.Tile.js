import { Board } from "../src/Board.js";

let should = chai.should();
let expect = chai.expect;

let board = new Board();

describe('Tile Class Tests:', () => {
    describe('getForwardLeft', () => {
        it('B2 should return A2', () => {
            let result = board.getTileFromCoord('B2').getForwardLeft(11, undefined, boundary_data);
            expect(result).to.equal('A2');
        });
    });
});