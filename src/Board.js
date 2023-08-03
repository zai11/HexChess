import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "./Utilities.js";
import { Pawn, Knight, Bishop, Rook, Queen, King } from './Piece.js';

export class Tile {
    // Colours:
    // 0 = Black,
    // 1 = Grey,
    // 2 = White
    constructor(board, x, y, colour, coordinate, size, pawnStartingTile) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.colour = colour == 0 ? 'black' : colour == 1 ? 'grey' : 'white';
        this.coordinate = coordinate;
        this.size = size;
        this.scale = size/512;
        this.pawnStartingTile = pawnStartingTile;
        this.selected = false;
        this.valid = false;
    }

    equals = (tile) => {
        return (this.board == tile.board) && (this.x == tile.x) && (this.y == tile.y) && (this.colour == tile.colour) && (this.coordinate == tile.coordinate) &&
            (this.size == tile.size) && (this.scale == tile.scale) && (this.selected == tile.selected) && (this.valid == tile.valid)
    }

    hasPiece = () => {
        return !(this.piece === undefined);
    }

    getPiece = () => {
        return this.piece;
    }

    setPiece = (piece) => {
        this.piece = piece;
    }

    removePiece = () => {
        this.piece = undefined;
    }

    isPawnStartingTile = () => {
        return this.pawnStartingTile;
    }

    getForwardLeft = (context = undefined, boundary_tiles = undefined) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles').boundaries);

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 5)
            forwardLeftLinear = coordinateToLinear(this.coordinate) - fileLength(file);
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) - (fileLength(file)+1);

        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getForwardRight = (context = undefined, boundary_tiles = undefined) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = context.cache.json.get('json_boundary_tiles');

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 4)
            forwardLeftLinear = coordinateToLinear(this.coordinate) + fileLength(file) + 2;
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) + (fileLength(file)+1);
            
        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getBackwardLeft = (context = undefined, boundary_tiles = undefined) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles').boundaries);

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 5)
            forwardLeftLinear = coordinateToLinear(this.coordinate) - (fileLength(file)+1);
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) - (fileLength(file)+2);
            
        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getBackwardRight = (context = undefined, boundary_tiles = undefined) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles').boundaries);

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 4)
            forwardLeftLinear = coordinateToLinear(this.coordinate) + (fileLength(file)+1);
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) + (fileLength(file));
            
        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getForward = (context = undefined, boundary_tiles = undefined) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) + 1, context, boundary_tiles);
    }

    getBackward = (context = undefined, boundary_tiles = undefined) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) - 1, context, boundary_tiles);
    }

    getForwardLeftDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let forwardLeft = this.getForwardLeft(context, boundary_tiles);

        if (forwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardLeft).getForward(context, boundary_tiles);
    }

    getForwardRightDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let forwardRight = this.getForwardRight(context, boundary_tiles);

        if (forwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardRight).getForward(context, boundary_tiles);
    }

    getBackwardLeftDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let backwardLeft = this.getBackwardLeft(context, boundary_tiles);

        if (backwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(backwardLeft).getBackward(context, boundary_tiles);
    }

    getBackwardRightDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let backwardRight = this.getBackwardRight(context, boundary_tiles);

        if (backwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(backwardRight).getBackward(context, boundary_tiles);
    }

    getLeftDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let forwardLeft = this.getForwardLeft(context, boundary_tiles);

        if (forwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardLeft).getBackwardLeft(context, boundary_tiles);
    }

    getRightDiagonal = (context = undefined, boundary_tiles = undefined) => {
        let forwardRight = this.getForwardRight(context, boundary_tiles);

        if (forwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardRight).getBackwardRight(context, boundary_tiles);
    }
}

export class Coordinate {
    constructor(x, y, content) {
        this.x = x;
        this.y = y;
        this.content = content;
    }
}

export class Board 
{

    tiles = [];
    coordinates = [];
    pieces = [];

    constructor (context, colour, tiles_data = undefined, coords_data = undefined) {
        if (context === undefined && (tiles_data === undefined || coords_data === undefined)) {
            console.warn('The context and either the tile or coordinate data is not provided to board constructor.');
            return undefined;
        }

        if (tiles_data === undefined)
            tiles_data = context.cache.json.get('json_tile_data_' + colour);

        tiles_data.forEach((tile) => {
            this.tiles.push(new Tile(this, Number(tile.x), Number(tile.y), Number(tile.colour), tile.coordinate, Number(tile.size), tile.pawnStartingTile));
        }, this);

        if (coords_data === undefined)
            coords_data = context.cache.json.get('json_coord_data_' + colour);

        coords_data.forEach((coord) => {
            this.coordinates.push(new Coordinate(coord.x, coord.y, coord.content));
        }); 
    }

    getTileFromCoord = (coord) => {
        let result = undefined;
        this.tiles.forEach((tile) => {
            if (tile.coordinate == coord)
                result = tile;
        });
        if (result === undefined)
            console.warn("Couldn't find the tile with coordinate: " + coord);
        return result;
    }

    getPositionsFromCoord = (coord) => {
        if (!isValidCoord(coord)) {
            console.warn('Invalid coord provided to getPositionsFromCoord function: ' + coord);
            return undefined;
        }
        return {
            x: this.getTileFromCoord(coord).x,
            y: this.getTileFromCoord(coord).y
        };
    }

    getTileFromPositions = (x, y) => {
        let result;
        this.tiles.forEach((tile) => {
            if (tile.x === x && tile.y === y)
                result = tile;
        });
        if (result === undefined)
            console.warn('Unable to find tile at x: ' + x + ", y: " + y);
        return result;
    }

    getCoordFromPositions = (x, y) => {
        let tile = this.getTileFromPositions(x, y);
        if (tile === undefined)
            return undefined;
        return tile.coordinate;
    }

    addPiece = (piece) => {
        this.pieces.push(piece);
        console.log(piece.coordinate);
        this.getTileFromCoord(piece.coordinate).setPiece(piece);
    }

    getPieceFromCoord = (coordinate) => {
        if (!isValidCoord(coordinate)) {
            console.warn('Invalid coordinate provided to getPieceFromCoord function: ' + coordinate);
            return undefined;
        }
        let result = undefined;
        this.pieces.forEach((piece) => {
            if (piece.coordinate === coordinate)
                result = piece;
        });

        if (result === undefined)
            console.warn('Unable to find piece at coordinate: ' + coordinate);
        
        return result;
    }

    clear = () => {
        this.pieces = [];
        this.tiles.forEach((tile) => {
            tile.removePiece();
        });
    }

    loadFromFEN = (fen) => {
        
    }

    init = (context) => {
        this.clear();
        this.addPiece(new Pawn(this, 'B1', 'white'));
        this.addPiece(new Pawn(this, 'C2', 'white'));
        this.addPiece(new Pawn(this, 'D3', 'white'));
        this.addPiece(new Pawn(this, 'E4', 'white'));
        this.addPiece(new Pawn(this, 'F5', 'white'));
        this.addPiece(new Pawn(this, 'G5', 'white'));
        this.addPiece(new Pawn(this, 'H5', 'white'));
        this.addPiece(new Pawn(this, 'I5', 'white'));
        this.addPiece(new Pawn(this, 'J5', 'white'));

        this.addPiece(new Pawn(this, 'B7', 'black'));
        this.addPiece(new Pawn(this, 'C7', 'black'));
        this.addPiece(new Pawn(this, 'D7', 'black'));
        this.addPiece(new Pawn(this, 'E7', 'black'));
        this.addPiece(new Pawn(this, 'F7', 'black'));
        this.addPiece(new Pawn(this, 'G8', 'black'));
        this.addPiece(new Pawn(this, 'H9', 'black'));
        this.addPiece(new Pawn(this, 'I10', 'black'));
        this.addPiece(new Pawn(this, 'J11', 'black'));

        this.addPiece(new Knight(this, 'D1', 'white'));
        this.addPiece(new Knight(this, 'H3', 'white'));
        this.addPiece(new Knight(this, 'D9', 'black'));
        this.addPiece(new Knight(this, 'H11', 'black'));

        this.addPiece(new Bishop(this, 'F1', 'white'));
        this.addPiece(new Bishop(this, 'F2', 'white'));
        this.addPiece(new Bishop(this, 'F3', 'white'));
        this.addPiece(new Bishop(this, 'F9', 'black'));
        this.addPiece(new Bishop(this, 'F10', 'black'));
        this.addPiece(new Bishop(this, 'F11', 'black'));

        this.addPiece(new Rook(this, 'C1', 'white'));
        this.addPiece(new Rook(this, 'I4', 'white'));
        this.addPiece(new Rook(this, 'C8', 'black'));
        this.addPiece(new Rook(this, 'I11', 'black'));

        this.addPiece(new Queen(this, 'E1', 'white'));
        this.addPiece(new Queen(this, 'E10', 'black'));

        this.addPiece(new King(this, 'G2', 'white'));
        this.addPiece(new King(this, 'G11', 'black'));
    }

    render = (context) => {
        this.tiles.forEach((tile) => {
            let style = {color: '#FFF', fontSize: 20};
            if (tile.colour === 'white')
                style.color = '#000';
            context.add.image(tile.x, tile.y, 'spr_tile_' + tile.colour + (tile.selected ? '_selected' : '') + (tile.valid ? '_valid' : '')).setScale(tile.scale);
            //context.add.text(tile.x, tile.y, coordinateToLinear(tile.coordinate), style).setOrigin(0.5, 0.5);
        });

        this.coordinates.forEach((coordinate) => {
            const style = {color: '#FFF', fontSize: 20};
            context.add.text(coordinate.x, coordinate.y, coordinate.content, style).setOrigin(0.5,0.5);
        });

        this.pieces.forEach((piece) => {
            piece.render(context);
        })
    }
}