import { Raycaster } from "../Raycaster.js";

export class Piece {
    constructor(board, coordinate, colour, type, scene, scale = 0.07) {
        this.board = board;
        this.coordinate = coordinate;
        this.colour = colour;
        let positions = board.getPositionsFromCoord(coordinate);
        this.x = positions.x;
        this.y = positions.y;
        this.type = type;
        this.scale = scale;
        this.updated = true;
        this.scene = scene;
        this.sprite = this.scene.add.sprite(this.x, this.y, 'spr_piece_' + this.colour + '_' + this.type)
                .setScale(this.scale).setDepth(1);
    }

    moveTo = function (coordinate) {
        this.board.getTileFromCoord(coordinate).updated = true;
        this.coordinate = coordinate;
        let positions = this.board.getPositionsFromCoord(coordinate);
        this.sprite.x = positions.x;
        this.sprite.y = positions.y;
        this.x = positions.x;
        this.y = positions.y;
    }

    take = function () {
        this.sprite.destroy();
    }

    equals = function (piece) {
        return (piece.board === this.board) && (piece.coordinate === this.coordinate) && (piece.x === this.x) && 
            (piece.y === this.y) && (piece.sprite === this.sprite) && (piece.scale === this.scale);
    }

    getLegalMoves = function () {
        const legalMoves = [];
        const pseudolegalMoves = this.getPseudolegalMoves();
        pseudolegalMoves.forEach(move => {
            if (this.isValidMove(move))
                legalMoves.push(move);
        });
        return legalMoves;
    }

    isValidMove = function(coordinate) {
        const pseudolegalMoves = this.getPseudolegalMoves();

        if (!pseudolegalMoves.includes(coordinate))
            return false;

        if (this.type === 'pawn' || this.type === 'bishop' || this.type === 'rook' || this.type === 'queen') {
            const raycastHit = new Raycaster(this.board).cast(this.coordinate, coordinate)
            if (raycastHit !== undefined && raycastHit.colour === this.colour)
                return false;
            else if (raycastHit !== undefined && raycastHit.colour !== this.colour && raycastHit.coordinate !== coordinate)
                return false;
        }

        const destinationTile = this.board.getTileFromCoord(coordinate);
        const originTile = this.board.getTileFromCoord(this.coordinate);
        const pieceAtCoordinate = this.board.getPieceFromCoord(coordinate);
        this.moveTo(coordinate);
        destinationTile.setPiece(this);
        let resultsInCheck = false;
        if (this.colour === 'white' && this.board.isCheckWhite())
            resultsInCheck = true;
        else if (this.colour === 'black' && this.board.isCheckBlack())
            resultsInCheck = true;
        this.moveTo(originTile.coordinate);
        originTile.setPiece(this);
        if (pieceAtCoordinate !== undefined)
            destinationTile.setPiece(pieceAtCoordinate);
        else
            destinationTile.removePiece();

        if (resultsInCheck)
            return false;

        if (destinationTile.hasPiece() && destinationTile.getPiece().colour !== this.colour) {
            if (this.type !== 'pawn')
                return true;
            else if (this.coordinate[0] !== coordinate[0])
                return true;
            else
                return false;
        }
        else if (destinationTile.hasPiece() && destinationTile.getPiece().colour === this.colour)
            return false

        return true;
    }
}