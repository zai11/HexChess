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

    coordinates = [];
    tiles = [];
    selectedTile = undefined;
    validTiles = [];
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
            this.tiles.push(new Tile(this, Number(tile.x), Number(tile.y), Number(tile.colour), tile.coordinate, Number(tile.size), tile.pawnStartingTile, context));
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

    clearValidTiles = () => {
        this.tiles.forEach((tile) => {
            if (tile.valid === true)
                tile.setValid(false);
        });
        this.validTiles = [];
    }

    tileSelected = (tile, context) => {
        // Selected tile is not valid, no valid tiles, no piece: just set current tile to selected and clear valid tiles
        if (!this.validTiles.includes(tile) && !tile.hasPiece()) {
            tile.setSelected();
            this.selectedTile = tile;
            this.clearValidTiles();
        }

        // Selected tile is not valid, has piece: set current tile to selected, set valid tiles to piece's valid moves
        if (!this.validTiles.includes(tile) && tile.hasPiece()) {
            tile.setSelected();
            this.selectedTile = tile;
            let piece = tile.getPiece();
            this.clearValidTiles();
            let validMoves = piece.getValidMoves(context);
            validMoves.forEach((move) => {
                let t = this.getTileFromCoord(move);
                t.setValid();
                this.validTiles.push(t);
            });
        }

        // Tile selected is valid: move piece from previously selected tile to newly selected tile.
        if (this.validTiles.includes(tile)) {
            let prevTile = this.selectedTile;
            prevTile.setSelected(false);
            this.selectedTile = undefined;
            let piece = prevTile.getPiece();
            prevTile.removePiece();
            if (tile.hasPiece())
                tile.getPiece().take();
            piece.moveTo(tile.coordinate);
            tile.setPiece(piece);
            this.clearValidTiles();
        }
    }

    loadFromFEN = (fen) => {
        
    }

    init = (context) => {
        this.clear();
        this.addPiece(new Pawn(this, 'B1', 'white', context));
        this.addPiece(new Pawn(this, 'C2', 'white', context));
        this.addPiece(new Pawn(this, 'D3', 'white', context));
        this.addPiece(new Pawn(this, 'E4', 'white', context));
        this.addPiece(new Pawn(this, 'F5', 'white', context));
        this.addPiece(new Pawn(this, 'G5', 'white', context));
        this.addPiece(new Pawn(this, 'H5', 'white', context));
        this.addPiece(new Pawn(this, 'I5', 'white', context));
        this.addPiece(new Pawn(this, 'J5', 'white', context));

        this.addPiece(new Pawn(this, 'B7', 'black', context));
        this.addPiece(new Pawn(this, 'C7', 'black', context));
        this.addPiece(new Pawn(this, 'D7', 'black', context));
        this.addPiece(new Pawn(this, 'E7', 'black', context));
        this.addPiece(new Pawn(this, 'F7', 'black', context));
        this.addPiece(new Pawn(this, 'G8', 'black', context));
        this.addPiece(new Pawn(this, 'H9', 'black', context));
        this.addPiece(new Pawn(this, 'I10', 'black', context));
        this.addPiece(new Pawn(this, 'J11', 'black', context));

        this.addPiece(new Knight(this, 'D1', 'white', context));
        this.addPiece(new Knight(this, 'H3', 'white', context));
        this.addPiece(new Knight(this, 'D9', 'black', context));
        this.addPiece(new Knight(this, 'H11', 'black', context));

        this.addPiece(new Bishop(this, 'F1', 'white', context));
        this.addPiece(new Bishop(this, 'F2', 'white', context));
        this.addPiece(new Bishop(this, 'F3', 'white', context));
        this.addPiece(new Bishop(this, 'F9', 'black', context));
        this.addPiece(new Bishop(this, 'F10', 'black', context));
        this.addPiece(new Bishop(this, 'F11', 'black', context));

        this.addPiece(new Rook(this, 'C1', 'white', context));
        this.addPiece(new Rook(this, 'I4', 'white', context));
        this.addPiece(new Rook(this, 'C8', 'black', context));
        this.addPiece(new Rook(this, 'I11', 'black', context));

        this.addPiece(new Queen(this, 'E1', 'white', context));
        this.addPiece(new Queen(this, 'E10', 'black', context));

        this.addPiece(new King(this, 'G2', 'white', context));
        this.addPiece(new King(this, 'G11', 'black', context));
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
                //tile.render(context);
                tile.updated = false;
            }
        });

        this.pieces.forEach((piece) => {
            if (piece.updated) {
                piece.updated = false;
            }
        })
    }
}