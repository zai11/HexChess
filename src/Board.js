import { isValidCoord } from "./Utilities.js";
import { Tile } from "./Tile.js";
import { Coordinate } from "./Coordinate.js";
import { FENLoader } from "./FENLoader.js";
import { King } from "./pieces/King.js";
import { Pawn } from "./pieces/Pawn.js";

export class Board 
{

    coordinates = [];
    tiles = [];
    selectedTile = undefined;
    validTiles = [];
    pieces = [];
    halfMoveClock = 0;
    fullMoveClock = 1;
    awaitingPromotion = false;

    constructor (context, colour, tiles_data, coords_data) {
        this.colour = colour;

        if (context === undefined && (tiles_data === undefined || coords_data === undefined)) {
            console.warn('The context and either the tile or coordinate data is not provided to board constructor.');
            return undefined;
        }

        if (tiles_data === undefined)
            tiles_data = context.cache.json.get('json_tile_data_' + colour);

        tiles_data.forEach((tile) => {
            this.tiles.push(new Tile(this, Number(tile.x), Number(tile.y), Number(tile.colour), tile.coordinate, Number(tile.size), tile.pawn_starting_tile, context));
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
        return piece;
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
            if (!(piece instanceof King)) {
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
        if (this.awaitingPromotion)
            return;
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
            if (tile.getPiece().colour === this.colour) {
                let validMoves = piece.getValidMoves(context);
                validMoves.forEach((move) => {
                    let t = this.getTileFromCoord(move);
                    t.setValid();
                    this.validTiles.push(t);
                });
            }
        }

        // Tile selected is valid: move piece from previously selected tile to newly selected tile.
        if (this.validTiles.includes(tile)) {
            this.halfMoveClock++;
            let prevTile = this.selectedTile;
            prevTile.setSelected(false);
            this.selectedTile = undefined;
            let piece = prevTile.getPiece();
            prevTile.removePiece();
            if (tile.hasPiece())
                tile.getPiece().take();

            // Check pawn double move:
            if (piece instanceof Pawn) {
                let forward1 = this.getTileFromCoord(prevTile.getForward(piece.colour, context));
                if (forward1 !== undefined) {
                    let forward2 = this.getTileFromCoord(forward1.getForward(piece.colour, context));
                    if (forward2 !== undefined && forward2.equals(tile)) {
                        piece.doubleMove = true;
                        piece.doubleMoveClock = this.halfMoveClock;
                    }
                }
            }

            // Check en passant:
            if (piece instanceof Pawn) {
                let forwardRight = this.getTileFromCoord(prevTile.getForwardRight(piece.colour, context));
                let forwardLeft = this.getTileFromCoord(prevTile.getForwardLeft(piece.colour, context));
                if (forwardRight !== undefined && forwardRight.equals(tile) && !forwardRight.hasPiece()) {
                    let backwardRight = this.getTileFromCoord(prevTile.getBackwardRight(piece.colour, context));
                    if (backwardRight.hasPiece())
                        backwardRight.getPiece().take();
                }
                else if (forwardLeft !== undefined && forwardLeft.equals(tile) && !forwardLeft.hasPiece()) {
                    let backwardLeft = this.getTileFromCoord(prevTile.getBackwardLeft(piece.colour, context));
                    if (backwardLeft.hasPiece())
                        backwardLeft.getPiece().take();
                }
            }

            // Check promotion:
            if (piece instanceof Pawn) {
                let forward = tile.getForward(piece.colour, context);
                if (forward === undefined) {
                    this.awaitingPromotion = true;
                    context.ui.createPromotionPrompt(piece);
                }
            }

            piece.moveTo(tile.coordinate);
            tile.setPiece(piece);
            this.clearValidTiles();
            this.togglePlayer();
        }
    }

    togglePlayer = () => {
        if (this.colour === 'w')
            this.colour = 'b';
        else
            this.colour = 'w';
    }

    init = (context) => {
        let fen = context.cache.text.get('fen_initial_layout');

        let loader = new FENLoader(fen, this, context);
        loader.load();
    }

    initialRender = (context) => {
        const style = {color: '#FFF', fontSize: 20};
        this.coordinates.forEach((coordinate) => {
            context.add.text(coordinate.x, coordinate.y, coordinate.content, style).setOrigin(0.5,0.5);
        });
    }
}