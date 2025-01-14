import { Board } from '../boards/Board.js'
import { Knight } from "../pieces/Knight.js";
import { Bishop } from "../pieces/Bishop.js";
import { Rook } from "../pieces/Rook.js";
import { Queen } from "../pieces/Queen.js";
import { Raycaster } from "../Raycaster.js";
import { LocalClock } from "../Clock.js";

export default class LocalMultiplayerBoard extends Board {

    previousBoards = [];

    constructor(scene, colour, tiles_data, coords_data) {
        super(scene, colour, tiles_data, coords_data);
        this.clear();
        this.load();

        this.previousBoards.push(this.toFEN().split(' ')[0]);
    }

    resultsInMateWhite = function (piece, coordinate) {
        const destinationTile = this.getTileFromCoord(coordinate);
        const originTile = this.getTileFromCoord(piece.coordinate);
        const pieceAtCoordinate = this.getPieceFromCoord(coordinate);
        piece.moveTo(coordinate);
        destinationTile.setPiece(piece);

        const resultsInMate = this.isMateWhite();

        piece.moveTo(originTile.coordinate);
        originTile.setPiece(piece);
        if (pieceAtCoordinate !== undefined)
            destinationTile.setPiece(pieceAtCoordinate);
        else
            destinationTile.removePiece();
        return resultsInMate;
    }

    resultsInMateBlack = function (piece, coordinate) {
        const destinationTile = this.getTileFromCoord(coordinate);
        const originTile = this.getTileFromCoord(piece.coordinate);
        const pieceAtCoordinate = this.getPieceFromCoord(coordinate);
        piece.moveTo(coordinate);
        destinationTile.setPiece(piece);

        const resultsInMate = this.isMateBlack();

        piece.moveTo(originTile.coordinate);
        originTile.setPiece(piece);
        if (pieceAtCoordinate !== undefined)
            destinationTile.setPiece(pieceAtCoordinate);
        else
            destinationTile.removePiece();
        return resultsInMate;
    }

    isMateWhite = function () {
        const king = this.findKing('white');
        const legalMoves = king.getLegalMoves();
        return this.isCheckWhite() && legalMoves.length === 0
    }

    isMateBlack = function () {
        const king = this.findKing('black');
        const legalMoves = king.getLegalMoves();
        return this.isCheckBlack() && legalMoves.length === 0
    }

    resultsInCheckWhite = function (piece, coordinate) {
        const destinationTile = this.getTileFromCoord(coordinate);
        const originTile = this.getTileFromCoord(piece.coordinate);
        const pieceAtCoordinate = this.getPieceFromCoord(coordinate);
        piece.moveTo(coordinate);
        destinationTile.setPiece(piece);
        originTile.removePiece();
        let resultsInCheck = false;
        if (this.isCheckWhite())
            resultsInCheck = true;
        piece.moveTo(originTile.coordinate);
        originTile.setPiece(piece);
        if (pieceAtCoordinate !== undefined)
            destinationTile.setPiece(pieceAtCoordinate);
        else
            destinationTile.removePiece();
        return resultsInCheck;
    }

    resultsInCheckBlack = function (piece, coordinate) {
        const destinationTile = this.getTileFromCoord(coordinate);
        const originTile = this.getTileFromCoord(piece.coordinate);
        const pieceAtCoordinate = this.getPieceFromCoord(coordinate);
        piece.moveTo(coordinate);
        destinationTile.setPiece(piece);
        originTile.removePiece();
        let resultsInCheck = false;
        if (this.isCheckBlack())
            resultsInCheck = true;
        piece.moveTo(originTile.coordinate);
        originTile.setPiece(piece);
        if (pieceAtCoordinate !== undefined)
            destinationTile.setPiece(pieceAtCoordinate);
        else
            destinationTile.removePiece();
        return resultsInCheck;
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
        this.tempRemovePiece(king);
        this.addPiece(knight);
        const pseudolegalMoves = knight.getPseudolegalMoves();
        this.removePiece(knight);
        this.addPiece(king);
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
        this.tempRemovePiece(king);
        this.addPiece(bishop);
        const pseudolegalMoves = bishop.getPseudolegalMoves();
        this.removePiece(bishop);
        this.addPiece(king);
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
        this.tempRemovePiece(king);
        this.addPiece(rook);
        const pseudolegalMoves = rook.getPseudolegalMoves();
        this.removePiece(rook);
        this.addPiece(king);
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
        this.tempRemovePiece(king);
        this.addPiece(queen);
        const pseudolegalMoves = queen.getPseudolegalMoves();
        this.removePiece(queen);
        this.addPiece(king);
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

    handleTileSeleted = function (tile) {
        this.handleTileSelectedParent(tile);
    }

    handlePieceMove = function (tile) {
        if (this.firstMove) {
            this.clock = new LocalClock(this);
            this.intervalManager.addInterval('clockTick', setInterval(() => this.clock.tick(), 1000));
            this.firstMove = false;
        }
        this.halfMoveClock++;
        let prevTile = this.selectedTile;
        prevTile.setSelected(false);
        this.selectedTile = undefined;
        let piece = prevTile.getPiece();
        this.hasEnPassant = false;
        this.enPassant = undefined;

        let taking = tile.hasPiece();
        let colourMoved = this.colour;

        // Check pawn double move:
        this.checkDoublePawnMove(piece, tile, prevTile);

        // Check en passant:
        const [tookEnPassant, takenTile] = this.checkEnPassant(piece, tile, prevTile);

        // Check half move clock reset:
        if (piece.type === 'pawn' || tile.hasPiece() || tookEnPassant)
            this.halfMoveClock = 0;

        const isPromotion = this.checkPromotion(piece, tile);

        if (!isPromotion) {
            this.togglePlayer();
            this.clock.togglePlayer();

            if (tile.hasPiece(taking))
                this.removePiece(tile.getPiece());

            piece.moveTo(tile.coordinate);
            tile.setPiece(piece);
            
            this.clearValidTiles();
    
            this.buildTiles();
            this.buildCoordinates();
            this.handleStalemate();
            let isMate = this.handleMate();
            this.handleRepetition();
            this.handle50Move();
            this.handleDeadPosition();

            this.logMove(prevTile, tile, colourMoved, taking, tookEnPassant, takenTile, isMate);
        }
        else {

            if (taking)
                this.removePiece(tile.getPiece());

            this.handlePromotion(piece, prevTile, tile, colourMoved, taking, tookEnPassant, takenTile);
        }
    }

    checkDoublePawnMove = function (piece, tile, prevTile) {
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
    }

    checkEnPassant = function (piece, tile, prevTile) {
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
                        return [true, takenTile];
                    } 
                    else if (tile.coordinate.charCodeAt(0) > prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthEast();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                        return [true, takenTile];
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
                        return [true, takenTile];
                    } 
                    else if (tile.coordinate.charCodeAt(0) > prevTile.coordinate.charCodeAt(0) && !tile.hasPiece()) {
                        this.hasEnPassant = false;
                        this.enPassant = undefined;
                        const takenTile = prevTile.getNeighbourTileSouthWest();
                        const takenPiece = takenTile.getPiece();
                        if (takenPiece !== undefined && takenPiece.colour !== piece.colour) {
                            this.removePiece(takenPiece);
                        }
                        return [true, takenTile];
                    }
                    break;
                default: 
                    break;
            }
        }
        return [false, undefined];
    }

    checkPromotion = function (piece, tile) {
        if (piece.type === 'pawn') {
            let neighbourTileNorth = tile.getNeighbourTileNorth(piece.colour);
            if (neighbourTileNorth === undefined) {
                return true;
            }
        }
        return false;
    }

    handlePromotion = function (piece, prevTile, tile, colourMoved, taking, tookEnPassant, takenTile, isMate) {
        this.awaitingPromotion = true;
        this.clearValidTiles();
        this.scene.ui.createPromotionPrompt(piece, tile, (piece) => {
            this.buildTiles();
            this.buildCoordinates();
            this.handleStalemate();
            let isMate = this.handleMate();
            this.handleRepetition();
            this.handle50Move();
            this.handleDeadPosition();
            this.logMove(prevTile, tile, colourMoved, taking, tookEnPassant, takenTile, isMate, piece[0]);
        });
        return true;
    }

    handleMate = function () {
        if (this.isMateWhite()) {
            this.handleGameOver(1);
            return true;
        }
        else if (this.isMateBlack()) {
            this.handleGameOver(-1);
            return true;
        }
        return false;
    }

    handleResignation = function () {
        const winner = this.colour === 'white' ? -1 : 1;
        this.handleGameOver(winner);
    }

    handleDrawOffer = function () {
        if (!this.gameRunning)
            return;
        this.drawOffer = this.colour;
        this.togglePlayer();
        this.clearValidTiles();
        this.buildTiles();
        this.buildCoordinates();
        $('#resign-button').css('display', 'none');
        $('#offer-draw-button').css('display', 'none');
        $('#accept-draw-button').css('display', 'block');
        $('#decline-draw-button').css('display', 'block');
    }

    handleDrawAccept = function () {
        this.handleGameOver(0);
        $('#resign-button').css('display', 'block');
        $('#offer-draw-button').css('display', 'block');
        $('#accept-draw-button').css('display', 'none');
        $('#decline-draw-button').css('display', 'none');
    }

    handleDrawDecline = function () {
        this.drawOffer = undefined;
        this.togglePlayer();
        this.buildTiles();
        this.buildCoordinates();
        $('#resign-button').css('display', 'block');
        $('#offer-draw-button').css('display', 'block');
        $('#accept-draw-button').css('display', 'none');
        $('#decline-draw-button').css('display', 'none');
    }

    handleRepetition = function () {
        const currentFEN = this.toFEN().split(' ')[0];
        this.previousBoards.push(currentFEN);
        let count = 0;
        this.previousBoards.forEach(fen => {
            if (fen === currentFEN)
                count++;
        });

        if (count >= 3) {
            this.handleGameOver(0);
        }
    }

    handle50Move = function () {
        if (this.halfMoveClock >= 100) {
            this.handleGameOver(0);
        }
    }

    handleStalemate = function () {
        let legalMovesExist = false;
        this.pieces.forEach(piece => {
            if (piece.colour === this.colour) {
                const legalMoves = piece.getLegalMoves();

                if (legalMoves.length > 0)
                    legalMovesExist = true;
            }
        });

        if (!legalMovesExist && ((this.colour === 'white' && !this.isCheckWhite()) || (this.colour === 'black' && !this.isCheckBlack()))) {
            this.handleGameOver(0);
        }
    }

    handleDeadPosition = function () {
        if (this.pieces.length == 2) {
            if (this.pieces[0].type === 'king' && this.pieces[1].type === 'king') {
                this.handleGameOver(0);
            }
        }
    }

    togglePlayer = function () {
        this.colour = this.colour === 'white' ? 'black' : 'white';
    }

    load = function () {
        $('#tray #moves').empty();
        if (localStorage.getItem('localGame') === 'false')
            localStorage.setItem('localGame', 'true');
        this.gameRunning = true;
        this.drawOffer = undefined;
        this.init();
        this.buildTiles();
        this.buildCoordinates();
        this.clock = new LocalClock(this);
        this.intervalManager.removeInterval('clockTick');
        this.intervalManager.removeInterval('updateTick');
    }
}