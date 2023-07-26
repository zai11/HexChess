
import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "../src/Utilities.js";
import { boundary_data } from './test.data.js'

let expect = chai.expect;

describe('Utility Class Tests:', () => {
    describe('linearToCoordinate(linearValue:Integer)', () => {
        it('11 should return A5', () => {
            let result = linearToCoordinate(11, undefined, boundary_data);
            expect(result).to.equal('A5');
        });
        it('68 should return G7', () => {
            let result = linearToCoordinate(68, undefined, boundary_data);
            expect(result).to.equal('G7');
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
        it('G7 should return 68', () => {
            let result = coordinateToLinear('G7');
            expect(result).to.equal(68);
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
