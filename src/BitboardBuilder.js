import { Raycaster } from "./Raycaster.js";

export default class BitboardBuilder {
    constructor(board, piece, type="movement") {
        this.board = board;
        this.board.colour = piece.colour
        this.board.buildTiles();
        //this.board.buildCoordinates();
        this.piece = piece;
        this.type = type;
    }

    getBitboard = function () {
        let pseudolegalMoves = [];
        if (this.type === "movement")
            pseudolegalMoves = [...new Set(this.piece.getPseudolegalMoves())];
        else if (this.type === "attacks")
            pseudolegalMoves = [...new Set(this.piece.getAttacks())];
        else if (this.type === "rays")
            return this.constructRaycastBitboards();
        else if (this.type === "enpassant-conditional")
            return this.constructEnPassantConditionalBitboards();
        else if (this.type === "enpassant-movement")
            return this.constructEnPassantMovementBitboards();
        return this.constructBitboard(pseudolegalMoves);
    }

    constructBitboard = function (coordinates) {
        let bitboard = '0'.repeat(37);
        let linearIDs = [];
        coordinates.forEach((coord) => linearIDs.push(this.coordinateToLinearID(coord)));
        linearIDs.sort((a, b) => (a - b));
        linearIDs.forEach((linearID) => {
            bitboard += '0'.repeat(linearID - (bitboard.length - 37));
            bitboard += 1;
        })
        if (bitboard.length < 128) {
            bitboard += '0'.repeat(128 - bitboard.length);
        }
        return bitboard;
    }

    constructRaycastBitboards = function () {
        const raycasts = this.getRaycasts();
        let bitboards = [];
        raycasts.forEach((ray) => {
            bitboards.push(this.constructBitboard(ray));
        });
        return bitboards;
    }

    constructEnPassantConditionalBitboards = function () {
        let coords = [];
        const currentTile = this.board.getTileFromCoord(this.piece.coordinate);
        const leftTile = currentTile.getNeighbourTileSouthWest();
        if (leftTile !== undefined)
            coords.push(leftTile.coordinate)
        const rightTile = currentTile.getNeighbourTileSouthEast();
        if (rightTile !== undefined)
            coords.push(rightTile.coordinate);
        return this.constructBitboard(coords);
    }

    constructEnPassantMovementBitboards = function () {
        let coords = [];
        const currentTile = this.board.getTileFromCoord(this.piece.coordinate);
        const leftTile = currentTile.getNeighbourTileNorthWest();
        if (leftTile !== undefined)
            coords.push(leftTile.coordinate)
        const rightTile = currentTile.getNeighbourTileNorthEast();
        if (rightTile !== undefined)
            coords.push(rightTile.coordinate);
        return this.constructBitboard(coords);
    }

    getRaycasts = function () {
        const raycaster = new Raycaster(this.board);
        return [
            raycaster.getRayNorth(this.piece.coordinate),
            raycaster.getRayDiagonalNorthEast(this.piece.coordinate),
            raycaster.getRayNorthEast(this.piece.coordinate),
            raycaster.getRayDiagonalEast(this.piece.coordinate),
            raycaster.getRaySouthEast(this.piece.coordinate),
            raycaster.getRayDiagonalSouthEast(this.piece.coordinate),
            raycaster.getRaySouth(this.piece.coordinate),
            raycaster.getRayDiagonalSouthWest(this.piece.coordinate),
            raycaster.getRaySouthWest(this.piece.coordinate),
            raycaster.getRayDiagonalWest(this.piece.coordinate),
            raycaster.getRayNorthWest(this.piece.coordinate),
            raycaster.getRayDiagonalNorthWest(this.piece.coordinate)
        ];
    }

    coordinateToLinearID = function (coordinate) {
        const numberPart = parseInt(coordinate.slice(1));
        return this.findIDOfCentreOfRow(numberPart) + this.findCharacterOffsetFromF(coordinate[0]);
    }

    findIDOfCentreOfRow = function (rowNumber) {
        const x = 11 - rowNumber;
        return Math.round((Math.pow(x, 9) / 72576) - (5 * Math.pow(x, 8) / 8064) +
                               (701 * Math.pow(x, 7) / 60480) - (67 * Math.pow(x, 6) / 576) +
                               (2341 * Math.pow(x, 5) / 3456) - (2675 * Math.pow(x, 4) / 1152) +
                               (102859 * Math.pow(x, 3) / 22680) - (2393 * Math.pow(x, 2) / 672) +
                               (1399 * x / 504));
    }

    findCharacterOffsetFromF = function (char) {
        return char.charCodeAt(0) - 'F'.charCodeAt(0);
    }
}