import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "./Utilities.js";

export default class Piece {
    constructor(board, coordinate, colour, x, y, sprite, scale = 0.05) {
        this.board = board;
        this.coordinate = coordinate;
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.scale = scale;
    }

    render = (context) => {
        context.add.image(this.x, this.y, this.sprite).setScale(this.scale);
    }

    equals = (piece) => {
        return (piece.board === this.board) && (piece.coordinate === this.coordinate) && (piece.x === this.x) && 
            (piece.y === this.y) && (piece.sprite === this.sprite) && (piece.scale === this.scale);
    }
}

export class Pawn extends Piece {
    constructor(board, coordinate, colour) {
        let sprite = 'spr_piece_' + colour + '_pawn';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, sprite);
    }

    getValidMovesWhite = (context, boundary_data) => {
        let validMoves = [];
        let currentTile = this.board.getTileFromPositions(this.x, this.y);
        // 

        // Move 1 square forward if not blocked
        let square1Forward = this.board.getTileFromCoord(currentTile.getForward(context, boundary_data));
        if (isValidCoord(square1Forward.coordinate) && !square1Forward.hasPiece())
            validMoves.push(square1Forward.coordinate);

        // If on starting square, move 2 squares forward if not blocked
        let square2Forward = this.board.getTileFromCoord(square1Forward.getForward(context, boundary_data));
        if (isValidCoord(square2Forward.coordinate) && !square1Forward.hasPiece() && !square2Forward.hasPiece() && currentTile.isPawnStartingTile())
            validMoves.push(square2Forward.coordinate);

        // If enemy on forwardLeft or forwardRight, move to that square
        let squareForwardLeft = this.board.getTileFromCoord(currentTile.getForwardLeft(context, boundary_data));

        if (isValidCoord(squareForwardLeft.coordinate) && squareForwardLeft.hasPiece()) {
            if (squareForwardLeft.getPiece().colour !== this.colour)
                validMoves.push(squareForwardLeft.coordinate);
        }

        let squareForwardRight = this.board.getTileFromCoord(currentTile.getForwardRight(context, boundary_data));

        if (isValidCoord(squareForwardRight.coordinate) && squareForwardRight.hasPiece()) {
            if (squareForwardRight.getPiece().colour !== this.colour)
                validMoves.push(squareForwardRight.coordinate);
        }

        // If enemy on backwardLeft or backwardRight, take en-passant (move 1 square forward of the respective square)
        let squareBackwardLeft = this.board.getTileFromCoord(currentTile.getBackwardLeft(context, boundary_data));

        console.log(squareBackwardLeft.hasPiece())

        if (isValidCoord(squareBackwardLeft.coordinate) && isValidCoord(squareForwardLeft.coordinate) && squareBackwardLeft.hasPiece()) {
            if (squareBackwardLeft.getPiece().colour !== this.colour)
                validMoves.push(squareForwardLeft.coordinate);
        }

        let squareBackwardRight = this.board.getTileFromCoord(currentTile.getBackwardRight(context, boundary_data));

        if (isValidCoord(squareBackwardRight.coordinate) && isValidCoord(squareForwardRight.coordinate) && squareBackwardRight.hasPiece()) {
            if (squareBackwardRight.getPiece().colour !== this.colour)
                validMoves.push(squareForwardRight.coordinate);
        }

        return validMoves;
    }

    getValidMovesBlack = (context = undefined, boundary_data = undefined) => {

    }

    getValidMoves = (context = undefined, boundary_data = undefined) => {
        if (this.colour === 'white')
            return this.getValidMovesWhite(context, boundary_data);
        return this.getValidMovesBlack(context, boundary_data);
    }
}

export class Knight extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_knight"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Bishop extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_bishop"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Rook extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_rook"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class Queen extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_queen"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}

export class King extends Piece {
    constructor(context, x, y, colour) {
        let sprite;
        Object.keys(context.textures.list).slice(3).forEach((name) => {
            if (name.match("spr_piece_"+colour+"_king"))
                sprite = name;
        });
        super(x, y, sprite);
    }
}