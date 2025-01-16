import { Tile } from "../Tile.js";
import { Coordinate } from "../Coordinate.js";
import { FENLoader } from "../FENLoader.js";
import { Pawn } from "../pieces/Pawn.js";
import { Knight } from "../pieces/Knight.js";
import { Bishop } from "../pieces/Bishop.js";
import { Rook } from "../pieces/Rook.js";
import { Queen } from "../pieces/Queen.js";
import { King } from "../pieces/King.js";

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
    gameRunning = true;
    drawOffer = undefined;
    firstMove = true;

    
    constructor (scene, colour, tiles_data, coords_data) {
        this.colour = colour;
        this.scene = scene;
        this.intervalManager = this.scene.intervalManager;

        if (this.scene === undefined && (tiles_data === undefined || coords_data === undefined)) {
            console.warn('The scene and either the tile or coordinate data need to be provided to board constructor.');
            return undefined;
        }

        this.clock = null;

        this.buildTiles();

        this.buildCoordinates();

        this.init();
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

    tempRemovePiece = function (piece) {
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
        this.pieces.forEach(piece => piece.take());
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

    destroy = function () {
        this.clear();
        this.tiles.forEach(tile => {
            tile.destroy();
        });
        this.coordinates.forEach(coordinate => {
            coordinate.destroy();
        });
        this.tiles = null;
        this.coordinates = null;
    }

    findKing = function (colour) {
        for (let i = 0; i < this.pieces.length; i++) {
            const piece = this.pieces[i];
            if (piece.type === 'king' && piece.colour === colour)
                return piece;
        }
        return undefined;
    }

    tileSelected = function (tile) {
        if (this.drawOffer !== undefined)
            return;
        if (!this.gameRunning)
            return;
        if (this.awaitingPromotion)
            return;

        this.handleTileSelectedParent(tile);
    }

    logMove = function (prevTile, tile, colourMoved, taking, enPassant, enPassantTile, isMate, promotion) {
        const prevMoveCount = $('#moves').children().length + 1;
        const algebraicNotation = this.getAlgebraicNotation(prevTile, tile, taking, enPassant, enPassantTile, isMate, promotion);
        switch (colourMoved) {
            case 'white':
                $('#moves').append(`<div class='move' id='${prevMoveCount}'><div class='number'><p>${prevMoveCount}</p></div><div class='white'><p>${algebraicNotation}</p></div><div class='black'><p>-</p></div></div>`)
                break;
            case 'black':
                $('#moves').children().last().children('.black').children().last().text(algebraicNotation);
                break;
        }
    }

    getAlgebraicNotation = function (prevTile, tile, taking, enPassant, enPassantTile, isMate, promotion) {
        let notation = '';
        const attacking = taking || enPassant;
        let movingPiece = tile.getPiece();
        if (movingPiece.type !== 'pawn' && !promotion)
            notation += movingPiece.getFENChar().toUpperCase();

        if (attacking && (movingPiece.type === 'pawn' || promotion))
            notation += prevTile.coordinate.toLowerCase()[0] + 'x';
        else if (attacking && movingPiece.type !== 'pawn')
            notation += 'x';

        notation += tile.coordinate.toLowerCase();

        switch (movingPiece.colour) {
            case 'white':
                if (this.resultsInMateBlack(movingPiece, tile.coordinate))
                    notation += '#';
                else if (this.resultsInCheckBlack(movingPiece, tile.coordinate))
                    notation += '+';
                break;
            case 'black':
                if (this.resultsInMateWhite(movingPiece, tile.coordinate))
                    notation += '#';
                else if (this.resultsInCheckWhite(movingPiece, tile.coordinate))
                    notation += '+';
        }

        if (promotion !== undefined)
            notation += `=${promotion}`

        return notation;
    }

    handleGameOver = function (winner) {
        if (!this.gameRunning)
            return;
        this.gameRunning = false;
        const gameOverText = winner === 1 ? 'White Won!' : winner === -1 ? 'Black Won!' : 'Draw';
        $('#game-end-container').css('visibility', 'visible');
        $('#game-end-container').children('p').first().text(gameOverText);
        this.intervalManager.removeInterval('clockTick');
        this.clock = null;
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

    loadFEN = function (fen, perspective) {
        let loader = new FENLoader(fen, this, this.scene);
        loader.load(perspective);
    }

    populateNotationTray = function (pgn) {
        $('#tray #moves').empty();
        const turns = pgn.match(/[1-9][0-9]*\. [a-zA-Z0-9 ]+/g);
        if (turns == null)
            return;
        turns.forEach(turn => {
            const splitTurn = turn.trim().split(' ');
            if (splitTurn.length === 2)
                $('#tray #moves').append(`<div class='move' id='${splitTurn[0]}'><div class='number'><p>${splitTurn[0]}</p></div><div class='white'><p>${splitTurn[1]}</p></div><div class='black'><p>-</p></div></div>`);
            else if (splitTurn.length === 3)
                $('#tray #moves').append(`<div class='move' id='${splitTurn[0]}'><div class='number'><p>${splitTurn[0]}</p></div><div class='white'><p>${splitTurn[1]}</p></div><div class='black'><p>${splitTurn[2]}</p></div></div>`);
        });
    }

    checkDrawOffer = function (drawOffer) {
        if (drawOffer !== undefined && drawOffer !== null) {
            $('#resign-button').css('display', 'none');
            $('#offer-draw-button').css('display', 'none');
            $('#accept-draw-button').css('display', 'block');
            $('#decline-draw-button').css('display', 'block');
        }
    }

    handleTileSelectedParent = function (tile) {
        // Selected tile is not valid, no piece: just set current tile to selected and clear valid tiles
        if (!this.validTiles.includes(tile.coordinate) && !tile.hasPiece()) {
            tile.setSelected();
            this.selectedTile = tile;
            this.clearValidTiles();
        }

        // Selected tile is not valid, has piece: set current tile to selected, set valid tiles to piece's valid moves
        else if (!this.validTiles.includes(tile.coordinate) && tile.hasPiece()) {
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
        else if (this.validTiles.includes(tile.coordinate)) {
            this.handlePieceMove(tile);
        }
    }
}