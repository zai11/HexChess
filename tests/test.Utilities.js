
import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "../src/Utilities.js";
import { boundary_data } from './test.data.js'

let expect = chai.expect;

describe('Utility Class Tests:', () => {
    describe('linearToCoordinate(linearValue:Integer)', () => {
        it('11 should return A5', () => {
            let result = linearToCoordinate(11, undefined, boundary_data);
            expect(result).to.equal('A5');
        });
        it('20 should return B7', () => {
            let result = linearToCoordinate(20, undefined, boundary_data);
            expect(result).to.equal('B7');
        });
        it('28 should return C7', () => {
            let result = linearToCoordinate(28, undefined, boundary_data);
            expect(result).to.equal('C7');
        });
        it('37 should return D7', () => {
            let result = linearToCoordinate(37, undefined, boundary_data);
            expect(result).to.equal('D7');
        });
        it('47 should return E7', () => {
            let result = linearToCoordinate(47, undefined, boundary_data);
            expect(result).to.equal('E7');
        });
        it('58 should return F7', () => {
            let result = linearToCoordinate(58, undefined, boundary_data);
            expect(result).to.equal('F7');
        });
        it('69 should return G7', () => {
            let result = linearToCoordinate(69, undefined, boundary_data);
            expect(result).to.equal('G7');
        });
        it('79 should return H7', () => {
            let result = linearToCoordinate(79, undefined, boundary_data);
            expect(result).to.equal('H7');
        });
        it('88 should return I7', () => {
            let result = linearToCoordinate(88, undefined, boundary_data);
            expect(result).to.equal('I7');
        });
        it('96 should return J7', () => {
            let result = linearToCoordinate(96, undefined, boundary_data);
            expect(result).to.equal('J7');
        });
        it('103 should return K7', () => {
            let result = linearToCoordinate(103, undefined, boundary_data);
            expect(result).to.equal('K7');
        });
        it('3 should return undefined', () => {
            let result = linearToCoordinate(3, undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('30 should return undefined', () => {
            let result = linearToCoordinate(30, undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
        it('111 should return undefined', () => {
            let result = linearToCoordinate(111, undefined, boundary_data);
            expect(result).to.equal(undefined);
        });
    });
    describe('coordinateToLinear(coordinate:String)', () => {
        it('A5 should return 11', () => {
            let result = coordinateToLinear('A5');
            expect(result).to.equal(11);
        });
        it('G7 should return 69', () => {
            let result = coordinateToLinear('G7');
            expect(result).to.equal(69);
        });
        it('A-1 should return undefined', () => {
            let result = coordinateToLinear('A-1');
            expect(result).to.equal(undefined);
        });
        it('A12 should return undefined', () => {
            let result = coordinateToLinear('A12');
            expect(result).to.equal(undefined);
        });
        it('Z4 should return undefined', () => {
            let result = coordinateToLinear('Z4');
            expect(result).to.equal(undefined);
        });
    });
    describe('fileLength(file:String)', () => {
        it('A should return 6', () => {
            let result = fileLength('A');
            expect(result).to.equal(6);
        });
        it('B should return 7', () => {
            let result = fileLength('B');
            expect(result).to.equal(7);
        });
        it('C should return 8', () => {
            let result = fileLength('C');
            expect(result).to.equal(8);
        });
        it('D should return 9', () => {
            let result = fileLength('D');
            expect(result).to.equal(9);
        });
        it('E should return 10', () => {
            let result = fileLength('E');
            expect(result).to.equal(10);
        });
        it('F should return 11', () => {
            let result = fileLength('F');
            expect(result).to.equal(11);
        });
        it('G should return 10', () => {
            let result = fileLength('G');
            expect(result).to.equal(10);
        });
        it('H should return 9', () => {
            let result = fileLength('H');
            expect(result).to.equal(9);
        });
        it('I should return 8', () => {
            let result = fileLength('I');
            expect(result).to.equal(8);
        });
        it('J should return 7', () => {
            let result = fileLength('J');
            expect(result).to.equal(7);
        });
        it('K should return 6', () => {
            let result = fileLength('K');
            expect(result).to.equal(6);
        });
    });
    describe('isValidCoord(coordinate:String)', () => {
        it('A1 should return true', () => {
            let result = isValidCoord('A1');
            expect(result).to.equal(true);
        });
        it('E6 should return true', () => {
            let result = isValidCoord('E6');
            expect(result).to.equal(true);
        });
        it('H11 should return true', () => {
            let result = isValidCoord('H11');
            expect(result).to.equal(true);
        });
        it('A-1 should return false', () => {
            let result = isValidCoord('A-1');
            expect(result).to.equal(false);
        });
        it('A7 should return false', () => {
            let result = isValidCoord('A7');
            expect(result).to.equal(false);
        });
        it('K12 should return false', () => {
            let result = isValidCoord('K12');
            expect(result).to.equal(false);
        });
        it('K2 should return false', () => {
            let result = isValidCoord('K2');
            expect(result).to.equal(false);
        });
        it('Z11 should return false', () => {
            let result = isValidCoord('Z11');
            expect(result).to.equal(false);
        });
    });
});
