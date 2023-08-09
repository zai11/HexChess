import { coordinateToLinear, fileLength, isValidCoord, linearToCoordinate } from "./Utilities.js";

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
        this.updated = true;
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
        this.updated = true;
    }

    removePiece = () => {
        this.piece = undefined;
        this.updated = true;
    }

    isPawnStartingTile = () => {
        return this.pawnStartingTile;
    }

    select = () => {
        this.board.tiles.forEach((tile) => {
            if (tile.selected === true) {
                tile.selected = false;
                tile.updated = true;
            }
        });
        this.selected = true;
        this.updated = true;
    }

    getForwardLeftWhite = (context, boundary_tiles) => {
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

    getForwardLeftBlack = (context, boundary_tiles) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles'));

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 4)
            forwardLeftLinear = coordinateToLinear(this.coordinate) + fileLength(file)+1;
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) + fileLength(file);

        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getForwardLeft = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getForwardLeftWhite(context, boundary_tiles);
        return this.getForwardLeftBlack(context, boundary_tiles);
    }

    getForwardRightWhite = (context, boundary_tiles) => {
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

    getForwardRightBlack = (context, boundary_tiles) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = context.cache.json.get('json_boundary_tiles');

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

    getForwardRight = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getForwardRightWhite(context, boundary_tiles);
        return this.getForwardRightBlack(context, boundary_tiles);
    }

    getBackwardLeftWhite = (context, boundary_tiles) => {
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

    getBackwardLeftBlack = (context, boundary_tiles) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles').boundaries);

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 4)
            forwardLeftLinear = coordinateToLinear(this.coordinate) + (fileLength(file)+2);
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) + (fileLength(file)+1);
            
        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getBackwardLeft = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getBackwardLeftWhite(context, boundary_tiles);
        return this.getBackwardLeftBlack(context, boundary_tiles);
    }

    getBackwardRightWhite = (context, boundary_tiles) => {
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

    getBackwardRightBlack = (context, boundary_tiles) => {
        let file = this.coordinate[0];

        if (boundary_tiles === undefined)
            boundary_tiles = Object.values(context.cache.json.get('json_boundary_tiles').boundaries);

        let forwardLeftLinear;

        if (file.charCodeAt(0) - 65 <= 5)
            forwardLeftLinear = coordinateToLinear(this.coordinate) - fileLength(file);
        else
            forwardLeftLinear = coordinateToLinear(this.coordinate) - (fileLength(file) + 1);
            
        let forwardLeftCoord = linearToCoordinate(forwardLeftLinear, context, boundary_tiles);

        if (!boundary_tiles.includes(forwardLeftLinear) && isValidCoord(forwardLeftCoord))
            return forwardLeftCoord;

        console.warn('There is no tile in the forward left direction from: ' + this.coordinate);
        return undefined;
    }

    getBackwardRight = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getBackwardRightWhite(context, boundary_tiles);
        return this.getBackwardRightBlack(context, boundary_tiles);
    }

    getForwardWhite = (context, boundary_tiles) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) + 1, context, boundary_tiles);
    }

    getForwardBlack = (context, boundary_tiles) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) - 1, context, boundary_tiles);
    }

    getForward = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getForwardWhite(context, boundary_tiles);
        return this.getForwardBlack(context, boundary_tiles);
    }

    getBackwardWhite = (context, boundary_tiles) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) - 1, context, boundary_tiles);
    }

    getBackwardBlack = (context, boundary_tiles) => {
        return linearToCoordinate(coordinateToLinear(this.coordinate) + 1, context, boundary_tiles);
    }

    getBackward = (piece_colour, context, boundary_tiles) => {
        if (piece_colour === 'white')
            return this.getBackwardWhite(context, boundary_tiles);
        return this.getBackwardBlack(context, boundary_tiles);
    }

    getForwardLeftDiagonal = (piece_colour, context, boundary_tiles) => {
        let forwardLeft = this.getForwardLeft(piece_colour, context, boundary_tiles);

        if (forwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardLeft).getForward(piece_colour, context, boundary_tiles);
    }

    getForwardRightDiagonal = (piece_colour, context, boundary_tiles) => {
        let forwardRight = this.getForwardRight(piece_colour, context, boundary_tiles);

        if (forwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardRight).getForward(piece_colour, context, boundary_tiles);
    }

    getBackwardLeftDiagonal = (piece_colour, context, boundary_tiles) => {
        let backwardLeft = this.getBackwardLeft(piece_colour, context, boundary_tiles);

        if (backwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(backwardLeft).getBackward(piece_colour, context, boundary_tiles);
    }

    getBackwardRightDiagonal = (piece_colour, context, boundary_tiles) => {
        let backwardRight = this.getBackwardRight(piece_colour, context, boundary_tiles);

        if (backwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(backwardRight).getBackward(piece_colour, context, boundary_tiles);
    }

    getLeftDiagonal = (piece_colour, context, boundary_tiles) => {
        let forwardLeft = this.getForwardLeft(piece_colour, context, boundary_tiles);

        if (forwardLeft === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardLeft).getBackwardLeft(piece_colour, context, boundary_tiles);
    }

    getRightDiagonal = (piece_colour, context, boundary_tiles) => {
        let forwardRight = this.getForwardRight(piece_colour, context, boundary_tiles);

        if (forwardRight === undefined)
            return undefined;

        return this.board.getTileFromCoord(forwardRight).getBackwardRight(piece_colour, context, boundary_tiles);
    }

    render = (context) => {
        let style = {color: '#FFF', fontSize: 20};
            if (this.colour === 'white')
                style.color = '#000';
            let sprite = context.add.sprite(this.x, this.y, 'spr_tile_' + this.colour + (this.selected ? '_selected' : '') + (this.valid ? '_valid' : ''))
                .setScale(this.scale).setInteractive();
    }

    renderDebug = (context) => {
        let style = {color: '#FFF', fontSize: 20};
            if (this.colour === 'white')
                style.color = '#000';
            let sprite = context.add.sprite(this.x, this.y, 'spr_tile_' + this.colour + (this.selected ? '_selected' : '') + (this.valid ? '_valid' : ''))
                .setScale(this.scale).setInteractive();
            context.add.text(this.x, this.y, /*coordinateToLinear(*/this.coordinate/*)*/, style).setOrigin(0.5, 0.5);
    }
}