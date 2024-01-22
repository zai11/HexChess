import { Tile } from "./Tile.js";
import { Coordinate } from "./Coordinate.js";
import { FENLoader } from "./FENLoader.js";
import { Pawn } from "./pieces/Pawn.js";
import { Knight } from "./pieces/Knight.js";
import { Bishop } from "./pieces/Bishop.js";
import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";
import { King } from "./pieces/King.js";
import { Raycaster } from "./Raycaster.js";

export class Board 
{

    coordinates = [];
    tiles = [];
    validTiles = [];
    selectedTile = undefined;
    pieces = [];
    halfMoveClock = 0;
    fullMoveClock = 1;
    awaitingPromotion = false;
    hasEnPassant = false;
    enPassant = '';
    localGame = true;
    

    constructor (scene, colour, tiles_data, coords_data) {
        this.colour = colour;
        this.scene = scene;

        if (this.scene === undefined && (tiles_data === undefined || coords_data === undefined)) {
            console.warn('The scene and either the tile or coordinate data is not provided to board constructor.');
            return undefined;
        }

        this.buildTiles();

        this.buildCoordinates();
    }

    buildTiles = function () {
        if (this.tiles.length > 0) {
            this.tiles.forEach(tile => {
                tile.destroy();
            });
        }
        this.tiles = [];
        const tiles_data = this.scene.cache.json.get('json_tile_data_' + this.colour);

        tiles_data.forEach((tile) => {
            this.tiles.push(new Tile(this, Number(tile.x), Number(tile.y), tile.colour, tile.coordinate, tile.isPawnStartingTile, this.scene));
        }, this);

        let temp_pieces = this.pieces;
        this.pieces = [];
        temp_pieces.forEach(piece => {
            piece.take();
            switch (piece.type) {
                case 'pawn':
                    this.addPiece(new Pawn(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
                case 'knight':
                    this.addPiece(new Knight(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
                case 'bishop':
                    this.addPiece(new Bishop(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
                case 'rook':
                    this.addPiece(new Rook(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
                case 'queen':
                    this.addPiece(new Queen(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
                case 'king':
                    this.addPiece(new King(piece.board, piece.coordinate, piece.colour, piece.scene));
                    break;
            }
        });
    }

    buildCoordinates = function (colour) {
        if (this.coordinates.length > 0) {
            this.coordinates.forEach(coord => {
                coord.destroy();
            });
        }
        this.coordinates = [];
        const coords_data = this.scene.cache.json.get('json_coord_data_' + this.colour);

        coords_data.forEach((coord) => {
            this.coordinates.push(new Coordinate(coord.x, coord.y, coord.content, this.scene));
        }); 
    }

    getTileFromCoord = function (coord) {
        let result;
        this.tiles.forEach((tile) => {
            if (tile.coordinate === coord)
                result = tile;
        });
        return result;
    }

    getPositionsFromCoord = function (coord) {
        return {
            x: this.getTileFromCoord(coord).x,
            y: this.getTileFromCoord(coord).y
        };
    }

    getTileFromPositions = function (x, y) {
        let result;
        this.tiles.forEach((tile) => {
            if (tile.x === x && tile.y === y)
                result = tile;
        });
        return result;
    }

    getCoordFromPositions = function (x, y) {
        let tile = this.getTileFromPositions(x, y);
        if (tile === undefined)
            return undefined;
        return tile.coordinate;
    }

    addPiece = function (piece) {
        this.pieces.push(piece);
        this.getTileFromCoord(piece.coordinate).setPiece(piece);
    }

    removePiece = function (piece) {
        piece.take();
        const indexOfPiece = this.pieces.indexOf(piece);
        this.pieces.splice(indexOfPiece, 1);
        this.getTileFromCoord(piece.coordinate).removePiece();
    }

    getPieceFromCoord = function (coordinate) {
        let result = undefined;
        this.pieces.forEach((piece) => {
            if (piece.coordinate === coordinate)
                result = piece;
        });
        
        return result;
    }

    clear = function () {
        this.pieces = [];
        this.tiles.forEach((tile) => {
            tile.removePiece();
        });
    }

    clearValidTiles = function () {
        this.tiles.forEach((tile) => {
            if (tile.valid === true)
                tile.setValid(false);
        });
        this.validTiles = [];
    }

    findKing = function (colour) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.type === 'king' && piece.colour === colour)
                return piece;
        }
        return undefined;
    }

    isCheck = function () {
        return this.isCheckWhite() || this.isCheckBlack();
    }

    isCheckWhite = function () {
        const king = this.findKing('white');
        if (king === undefined)
            return false;
        return this.isCheckPawn(king) || this.isCheckKnight(king) || this.isCheckBishop(king) ||
            this.isCheckRook(king) || this.isCheckQueen(king);
    }

    isCheckBlack = function () {
        const king = this.findKing('black');
        if (king === undefined)
            return false;
        return this.isCheckPawn(king) || this.isCheckKnight(king) || this.isCheckBishop(king) ||
        this.isCheckRook(king) || this.isCheckQueen(king);
    }

    isCheckPawn = function (king) {
        const currentTile = this.getTileFromCoord(king.coordinate);
        const neighbourTileNorthEast = currentTile.getNeighbourTileNorthEast();
        if (neighbourTileNorthEast !== undefined && neighbourTileNorthEast.hasPiece() && neighbourTileNorthEast.getPiece().type === 'pawn' && neighbourTileNorthEast.getPiece().colour !== king.colour)
            return true;
        const neighbourTileNorthWest = currentTile.getNeighbourTileNorthWest();
        if (neighbourTileNorthWest !== undefined && neighbourTileNorthWest.hasPiece() && neighbourTileNorthWest.getPiece().type === 'pawn' && neighbourTileNorthWest.getPiece().colour !== king.colour)
            return true;
        return false;
    }

    isCheckKnight = function (king) {
        let isCheck = false;
        const knight = new Knight(this, king.coordinate, king.colour === 'white' ? 'black' : 'white', this.scene);
        this.addPiece(knight);
        const pseudolegalMoves = knight.getPseudolegalMoves();
        this.removePiece(knight);
        pseudolegalMoves.forEach(move => {
            const piece = this.getPieceFromCoord(move);
            if (piece !== undefined && piece.type === 'knight' && piece.colour !== king.colour)
                isCheck = true;
        });
        return isCheck;
    }

    isCheckBishop = function (king) {
        let isCheck = false;
        const bishop = new Bishop(this, king.coordinate, king.colour === 'white' ? 'black' : 'white', this.scene);
        this.addPiece(bishop);
        const pseudolegalMoves = bishop.getPseudolegalMoves();
        this.removePiece(bishop);
        pseudolegalMoves.forEach(move => {
            const piece = this.getPieceFromCoord(move);
            if (piece === undefined)
                return;
            const raycastHit = new Raycaster(this).cast(piece.coordinate, king.coordinate);
            if (raycastHit !== undefined && raycastHit.coordinate !== piece.coordinate && raycastHit.coordinate !== king.coordinate)
                return;
            if (piece !== undefined && piece.type === 'bishop' && piece.colour !== king.colour)
                isCheck = true;
        });
        return isCheck;
    }

    isCheckRook = function (king) {
        let isCheck = false;
        const rook = new Rook(this, king.coordinate, king.colour === 'white' ? 'black' : 'white', this.scene);
        this.addPiece(rook);
        const pseudolegalMoves = rook.getPseudolegalMoves();
        this.removePiece(rook);
        pseudolegalMoves.forEach(move => {
            const piece = this.getPieceFromCoord(move);
            if (piece === undefined)
                return;
            if (new Raycaster(this).cast(piece.coordinate, king.coordinate))
                return;
            if (piece !== undefined && piece.type === 'rook' && piece.colour !== king.colour)
                isCheck = true;
        });
        return isCheck;
    }

    isCheckQueen = function (king) {
        let isCheck = false;
        const queen = new Queen(this, king.coordinate, king.colour === 'white' ? 'black' : 'white', this.scene);
        this.addPiece(queen);
        const pseudolegalMoves = queen.getPseudolegalMoves();
        this.removePiece(queen);
        pseudolegalMoves.forEach(move => {
            const piece = this.getPieceFromCoord(move);
            if (piece === undefined)
                return;
            if (new Raycaster(this).cast(piece.coordinate, king.coordinate))
                return;
            if (piece !== undefined && piece.type === 'queen' && piece.colour !== king.colour)
                isCheck = true;
        });
        return isCheck;
    }

    tileSelected = async function (tile) {
        if (this.awaitingPromotion)
            return;
        // Selected tile is not valid, no piece: just set current tile to selected and clear valid tiles
        if (!this.validTiles.includes(tile.coordinate) && !tile.hasPiece()) {
            tile.setSelected();
            this.selectedTile = tile;
            this.clearValidTiles();
        }

        // Selected tile is not valid, has piece: set current tile to selected, set valid tiles to piece's valid moves
        if (!this.validTiles.includes(tile.coordinate) && tile.hasPiece()) {
            tile.setSelected();
            this.selectedTile = tile;
            let piece = tile.getPiece();
            this.clearValidTiles();
            if (piece.colour === this.colour) {
                this.validTiles = piece.getLegalMoves();
                this.validTiles.forEach(move => {
                    let t = this.getTileFromCoord(move);
                    t.setValid();
                });
            }
        }

        // Tile selected is valid: move piece from previously selected tile to newly selected tile.
        if (this.validTiles.includes(tile.coordinate)) {
            if (this.localGame)
                this.handlePieceMoveLocal(tile);
            else
                this.handlePieceMoveOnline(tile);
        }
    }

    handlePieceMoveLocal = function (tile) {
        this.halfMoveClock++;
        let prevTile = this.selectedTile;
        prevTile.setSelected(false);
        this.selectedTile = undefined;
        let piece = prevTile.getPiece();
        prevTile.removePiece();
        if (tile.hasPiece()) {
            this.removePiece(this.getPieceFromCoord(tile.coordinate));
        }

        // Check promotion:
        if (piece.type === 'pawn') {
            let neighbourTileNorth = tile.getNeighbourTileNorth(piece.colour);
            if (neighbourTileNorth === undefined) {
                this.awaitingPromotion = true;
                this.scene.ui.createPromotionPrompt(piece);
            }
        }

        // Check pawn double move:
        if (piece.type === 'pawn') {
            if (tile.coordinate[0] === prevTile.coordinate[0]) {
                if (this.colour === 'white' && Number(tile.coordinate.slice(1, tile.coordinate.length) - Number(prevTile.coordinate.slice(1, prevTile.coordinate.length) === 2))) {
                    this.hasEnPassant = true;
                    this.enPassant = tile.coordinate;
                }
                else if (this.colour === 'black' && Number(tile.coordinate.slice(1, tile.coordinate.length) - Number(prevTile.coordinate.slice(1, prevTile.coordinate.length) === -2))) {
                    this.hasEnPassant = true;
                    this.enPassant = tile.coordinate;
                }
                else {
                    this.hasEnPassant = false;
                    this.enPassant = undefined;
                }
            }
        }

        // Check en passant:
        if (piece.type === 'pawn') {
            switch (piece.colour) {
                case 'white':
                    if (tile.coordinate.charCodeAt(0) < prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthWest();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                    } 
                    else if (tile.coordinate.charCodeAt(0) > prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthEast();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                    }
                    break;
                case 'black':
                    if (tile.coordinate.charCodeAt(0) < prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthEast();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                    } 
                    else if (tile.coordinate.charCodeAt(0) > prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthWest();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                    }
                    break;
            }
        }

        piece.moveTo(tile.coordinate);
        tile.setPiece(piece);
        this.clearValidTiles();
        this.togglePlayer();
        this.buildTiles();
        this.buildCoordinates();
    }

    handlePieceMoveOnline = function () {

    }

    togglePlayer = function () {
        this.colour = this.colour === 'white' ? 'black' : 'white';
    }

    toFEN = function () {
        let FEN = '';
        for (let i = 11; i >= 1; i--) {
            let row = this.getRow(i);
            row.sort((tile1, tile2) => {
                let letter1 = tile1.coordinate.match('^[A-K]')[0];
                let letter2 = tile2.coordinate.match('^[A-K]')[0];
                return letter1.localeCompare(letter2);
            });
            let xCount = 11 - row.length;
            FEN += 'x'.repeat(xCount/2);

            let emptyTileCount = 0;

            row.forEach((tile) => {
                let piece = this.getPieceFromCoord(tile.coordinate);
                if (piece == null) {
                    emptyTileCount++;
                    return;
                }

                if (emptyTileCount > 0) {
                    FEN += emptyTileCount;
                    emptyTileCount = 0;
                }

                FEN += piece.getFENChar();
            });

            if (emptyTileCount > 0) {
                FEN += emptyTileCount;
                emptyTileCount = 0;
            }

            FEN += 'x'.repeat(xCount/2);
            FEN += '/';
        }

        FEN = FEN.substring(0, FEN.length-1);
        FEN += ' ' + this.colour[0];

        if (this.hasEnPassant)
            FEN += ' ' + this.enPassant.toLowerCase();
        else
            FEN += ' -';

        FEN += ' ' + this.halfMoveClock;
        FEN += ' ' + this.fullMoveClock;

        return FEN;
    }

    getRow = function (rowNumber) {
        let row = [];
        this.tiles.forEach((tile) => {
            if (new RegExp('^[A-K]' + rowNumber + '$').test(tile.coordinate))
                row.push(tile);
        });
        return row;
    }

    init = function () {
        let fen = this.scene.cache.text.get('fen_initial_layout');
        let loader = new FENLoader(fen, this, this.scene);
        loader.load();
    }
}