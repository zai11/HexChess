export class Tile {

    SIZE = 64;

    // Colours:
    // 0 = Black,
    // 1 = Grey,
    // 2 = White
    constructor(board, x, y, colour, coordinate, isPawnStartingTile, scene, size=64) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.coordinate = coordinate;
        this.isPawnStartingTile = isPawnStartingTile;
        this.size = size;
        this.scale = size/512;
        this.selected = false;
        this.valid = false;
        this.scene = scene;
        this.sprite = this.scene.add.image(this.x, this.y, 'spr_tile_' + this.colour)
                .setScale(this.scale).setDepth(0);
    }

    equals = function (tile) {
        return (this.board == tile.board) && (this.x == tile.x) && (this.y == tile.y) && (this.colour == tile.colour) && (this.coordinate == tile.coordinate) &&
            (this.size == tile.size) && (this.scale == tile.scale) && (this.selected == tile.selected) && (this.valid == tile.valid)
    }

    hasPiece = function () {
        return this.piece !== undefined;
    }

    getPiece = function () {
        return this.piece;
    }

    setPiece = function (piece) {
        this.piece = piece;
    }

    removePiece = function () {
        this.piece = undefined;
    }

    destroy = function () {
        this.sprite.destroy();
    }

    setSelected = function (value=true) {
        this.board.tiles.forEach((tile) => {
            if (tile.selected === true) {
                tile.selected = false;
                tile.sprite.setTexture('spr_tile_' + tile.colour);
            }
        });
        this.selected = value;
        this.sprite.setTexture('spr_tile_' + this.colour + (this.selected ? '_selected' : ''));
    }

    setValid = function (value=true) {
        this.valid = value;
        this.sprite.setTexture('spr_tile_' + this.colour + (this.valid ? '_valid' : ''));
    }

    getNeighbourTileNorth = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;

        switch (this.board.colour) {
            case "white":
                newCoord = letterPart + String(numberPart + 1);
                break;
            case "black":
                newCoord = letterPart + String(numberPart - 1);
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileNorthEast = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;
        switch (this.board.colour) {
            case "white":
                numberPart = letterPart >= 'F' ? numberPart : numberPart + 1;
                letterPart = String.fromCharCode(letterPart.charCodeAt() + 1);
                newCoord = letterPart + numberPart;
                break;
            case "black":
                numberPart = letterPart <= 'F' ? numberPart - 1 : numberPart;
                letterPart = String.fromCharCode(letterPart.charCodeAt() - 1);
                newCoord = letterPart + numberPart;
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileSouthEast = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;
        switch (this.board.colour) {
            case "white":
                numberPart = letterPart >= 'F' ? numberPart - 1 : numberPart;
                letterPart = String.fromCharCode(letterPart.charCodeAt() + 1);
                newCoord = letterPart + numberPart;
                break;
            case "black":
                numberPart = letterPart <= 'F' ? numberPart : numberPart + 1;
                letterPart = String.fromCharCode(letterPart.charCodeAt() - 1);
                newCoord = letterPart + numberPart;
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileSouth = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;
        switch (this.board.colour) {
            case "white":
                newCoord = letterPart + (numberPart - 1);
                break;
            case "black":
                newCoord = letterPart + (numberPart + 1);
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileSouthWest = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;
        switch (this.board.colour) {
            case "white":
                numberPart = letterPart <= 'F' ? numberPart - 1 : numberPart;
                letterPart = String.fromCharCode(letterPart.charCodeAt() - 1);
                newCoord = letterPart + numberPart;
                break;
            case "black":
                numberPart = letterPart >= 'F' ? numberPart : numberPart + 1;
                letterPart = String.fromCharCode(letterPart.charCodeAt() + 1);
                newCoord = letterPart + numberPart;
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileNorthWest = function () {
        let letterPart = this.coordinate[0];
        let numberPart = Number(this.coordinate.slice(1, this.coordinate.length));

        let newCoord;
        switch (this.board.colour) {
            case "white":
                numberPart = letterPart <= 'F' ? numberPart : numberPart + 1;
                letterPart = String.fromCharCode(letterPart.charCodeAt() - 1);
                newCoord = letterPart + numberPart;
                break;
            case "black":
                numberPart = letterPart >= 'F' ? numberPart - 1 : numberPart;
                letterPart = String.fromCharCode(letterPart.charCodeAt() + 1);
                newCoord = letterPart + numberPart;
                break;
            default:
                break;
        }

        return this.board.getTileFromCoord(newCoord);
    }

    getNeighbourTileDiagonalNorthEast = function () {
        const neighbourTileNorthEast = this.getNeighbourTileNorthEast();
        if (neighbourTileNorthEast !== undefined)
            return neighbourTileNorthEast.getNeighbourTileNorth();
    }

    getNeighbourTileDiagonalEast = function () {
        const neighbourTileNorthEast = this.getNeighbourTileNorthEast();
        if (neighbourTileNorthEast !== undefined)
            return neighbourTileNorthEast.getNeighbourTileSouthEast();
    }

    getNeighbourTileDiagonalSouthEast = function () {
        const neighbourTileSouthEast = this.getNeighbourTileSouthEast();
        if (neighbourTileSouthEast !== undefined)
            return neighbourTileSouthEast.getNeighbourTileSouth();
    }

    getNeighbourTileDiagonalSouthWest = function () {
        const neighbourTileSouthWest = this.getNeighbourTileSouthWest();
        if (neighbourTileSouthWest !== undefined)
            return neighbourTileSouthWest.getNeighbourTileSouth();
    }

    getNeighbourTileDiagonalWest = function () {
        const neighbourTileNorthWest = this.getNeighbourTileNorthWest();
        if (neighbourTileNorthWest !== undefined)
            return neighbourTileNorthWest.getNeighbourTileSouthWest();
    }

    getNeighbourTileDiagonalNorthWest = function () {
        const neighbourTileNorthWest = this.getNeighbourTileNorthWest();
        if (neighbourTileNorthWest !== undefined) 
            return neighbourTileNorthWest.getNeighbourTileNorth();
    }
}