import { isValidCoord } from "./Utilities.js";
import { Tile } from "./Tile.js";
import { Coordinate } from "./Coordinate.js";
import { Pawn } from "./Pawn.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Rook } from "./Rook.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";
import { boundary_data } from "./tests/test.data.js";

export class Board 
{

    tiles = [];
    coordinates = [];
    pieces = [];

    constructor (context, colour, tiles_data, coords_data) {
        this.colour = colour;

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
        let result;
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

    isCheck = (coordinate, context, boundary_data) => {
        let result = false;
        let enemyPieces = [];

        this.pieces.forEach((piece) => {
            if (piece.colour !== this.colour)
                enemyPieces.push(piece);
        });

        enemyPieces.forEach((piece) => {
            if (!piece instanceof King) {
                let attacks = piece.getAttacks(context, boundary_data);
                attacks.forEach((attack) => {
                    if (attack == coordinate)
                        result = true;
                });
            }
        });

        return result;
    }

    clear = () => {
        this.pieces = [];
        this.tiles.forEach((tile) => {
            tile.removePiece();
        });
    }

    tileSelected = (tile, context) => {
        tile.select();

        this.tiles.forEach((tile) => {
            tile.setValid(false);
        });

        if (tile.hasPiece()) {
            let piece = tile.getPiece();
            let validMoves = piece.getValidMoves(context);
            validMoves.forEach((move) => {
                this.getTileFromCoord(move).setValid(true);
            });
        }
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

    initialRender = (context) => {
        const style = {color: '#FFF', fontSize: 20};
        this.coordinates.forEach((coordinate) => {
            context.add.text(coordinate.x, coordinate.y, coordinate.content, style).setOrigin(0.5,0.5);
        });
    }

    render = (context) => {

        this.tiles.forEach((tile) => {
            if (tile.updated) {
                tile.render(context);
                tile.updated = false;
            }
        });

        this.pieces.forEach((piece) => {
            piece.render(context);
        })
    }
}