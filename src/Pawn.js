import { isValidCoord } from "./Utilities.js";
import { Piece } from "./Piece.js";
import { boundary_data } from "./tests/test.data.js";

export class Pawn extends Piece {

    doubleMove = false;
    doubleMoveClock = Infinity;

    constructor(board, coordinate, colour, context) {
        let spriteLoc = 'spr_piece_' + colour + '_pawn';
        let positions = board.getPositionsFromCoord(coordinate)
        super(board, coordinate, colour, positions.x, positions.y, spriteLoc, context);
    }

    getValidMoves = (context, boundary_data) => {
        let validMoves = [];
        let currentTile = this.board.getTileFromPositions(this.x, this.y);

        // Move 1 square forward if not blocked
        let square1Forward = this.board.getTileFromCoord(currentTile.getForward(this.colour, context, boundary_data));
        if (square1Forward !== undefined && isValidCoord(square1Forward.coordinate) && !square1Forward.hasPiece())
            validMoves.push(square1Forward.coordinate);

        // If on starting square, move 2 squares forward if not blocked
        if (square1Forward !== undefined) {
        let square2Forward = this.board.getTileFromCoord(square1Forward.getForward(this.colour, context, boundary_data));

        if (square2Forward !== undefined && isValidCoord(square2Forward.coordinate) && !square1Forward.hasPiece() && 
            !square2Forward.hasPiece() && currentTile.isPawnStartingTile(this.colour))
            validMoves.push(square2Forward.coordinate);
        }

        // If enemy on forwardLeft or forwardRight, move to that square
        let squareForwardLeft = this.board.getTileFromCoord(currentTile.getForwardLeft(this.colour, context, boundary_data));

        if (squareForwardLeft !== undefined && isValidCoord(squareForwardLeft.coordinate) && squareForwardLeft.hasPiece()) {
            if (squareForwardLeft.getPiece().colour !== this.colour)
                validMoves.push(squareForwardLeft.coordinate);
        }

        let squareForwardRight = this.board.getTileFromCoord(currentTile.getForwardRight(this.colour, context, boundary_data));

        if (squareForwardRight !== undefined && isValidCoord(squareForwardRight.coordinate) && squareForwardRight.hasPiece()) {
            if (squareForwardRight.getPiece().colour !== this.colour)
                validMoves.push(squareForwardRight.coordinate);
        }

        // If enemy on backwardLeft or backwardRight, take en-passant (move 1 square forward of the respective square)
        let squareBackwardLeft = this.board.getTileFromCoord(currentTile.getBackwardLeft(this.colour, context, boundary_data));


        if (squareForwardLeft !== undefined && squareBackwardLeft !== undefined && isValidCoord(squareBackwardLeft.coordinate) && 
            isValidCoord(squareForwardLeft.coordinate) && squareBackwardLeft.hasPiece() && squareBackwardLeft.getPiece().doubleMove) {
            if (squareBackwardLeft.getPiece().colour !== this.colour)
                validMoves.push(squareForwardLeft.coordinate);
        }

        let squareBackwardRight = this.board.getTileFromCoord(currentTile.getBackwardRight(this.colour, context, boundary_data));

        if (squareForwardRight !== undefined && squareBackwardRight !== undefined && isValidCoord(squareBackwardRight.coordinate) && 
            isValidCoord(squareForwardRight.coordinate) && squareBackwardRight.hasPiece() && squareBackwardRight.getPiece().doubleMove) {
            if (squareBackwardRight.getPiece().colour !== this.colour)
                validMoves.push(squareForwardRight.coordinate);
        }

        return validMoves;
    }

    getAttacks = (context, boundary_data) => {
        let currentTile = this.board.getTileFromPositions(this.x, this.y);
        let squareForwardLeft = this.board.getTileFromCoord(currentTile.getForwardLeft(this.colour, context, boundary_data));
        let squareForwardRight = this.board.getTileFromCoord(currentTile.getForwardRight(this.colour, context, boundary_data));

        return [squareForwardLeft.coordinate, squareForwardRight.coordinate];
    }

    moveTo (coordinate) {
        if (this.doubleMoveClock < this.board.halfMoveClock) {
            this.doubleMove = false;
            this.doubleMoveClock = Infinity;
        }
        super.moveTo(coordinate);
    }
}