//import Phaser from '../lib/phaser.js'
import Board from '../Board.js'
import { fileLength, isValidCoord } from '../Utilities.js';

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
		super();
	}

	preload()
    {
        this.load.setBaseURL('/assets/');

        this.load.json('json_tile_data', './json/tile_data_white.json');
        this.load.json('json_coord_data', './json/coord_data_white.json');
        this.load.json('json_boundary_tiles', './json/boundary_tiles.json');

        this.load.image('spr_background', './sprites/background.png');

        this.load.image('spr_tile_black', './sprites/tiles/tile_black.png');
        this.load.image('spr_tile_black_selected', './sprites/tiles/tile_black_selected.png');
        this.load.image('spr_tile_black_valid', './sprites/tiles/tile_black_valid.png');
        this.load.image('spr_tile_grey', './sprites/tiles/tile_grey.png');
        this.load.image('spr_tile_grey_selected', './sprites/tiles/tile_grey_selected.png');
        this.load.image('spr_tile_grey_valid', './sprites/tiles/tile_grey_valid.png');
        this.load.image('spr_tile_white', './sprites/tiles/tile_white.png');
        this.load.image('spr_tile_white_selected', './sprites/tiles/tile_white_selected.png');
        this.load.image('spr_tile_white_valid', './sprites/tiles/tile_white_valid.png');

        this.load.image('spr_piece_black_pawn', './sprites/pieces/pawn_black.png');
        this.load.image('spr_piece_white_pawn', './sprites/pieces/pawn_white.png');
        this.load.image('spr_piece_black_knight', './sprites/pieces/knight_black.png');
        this.load.image('spr_piece_white_knight', './sprites/pieces/knight_white.png');
        this.load.image('spr_piece_black_bishop', './sprites/pieces/bishop_black.png');
        this.load.image('spr_piece_white_bishop', './sprites/pieces/bishop_white.png');
        this.load.image('spr_piece_black_rook', './sprites/pieces/rook_black.png');
        this.load.image('spr_piece_white_rook', './sprites/pieces/rook_white.png');
        this.load.image('spr_piece_black_queen', './sprites/pieces/queen_black.png');
        this.load.image('spr_piece_white_queen', './sprites/pieces/queen_white.png');
        this.load.image('spr_piece_black_king', './sprites/pieces/king_black.png');
        this.load.image('spr_piece_white_king', './sprites/pieces/king_white.png');
    }

    create()
    {
        this.add.image(0,0, 'spr_background').setScale(20);

        let board = new Board(this, undefined, undefined);

        //board.init(this);

        board.render(this);

        let tile = board.getTileFromCoord('H9');
        console.log('The forward-left tile from H9 is: ' + tile.getForwardLeft(this));

        //this.add.image(400, 300, 'spr_hex_black').setScale(0.25);
        //this.add.image(400+(128-32), 300-64, 'spr_hex_grey').setScale(0.25);
        //this.add.image(656, 300, 'spr_hex_white').setScale(0.25);

        //this.add.image(400+(128-32), 300-32, 'spr_hex_white').setScale(0.01);
    }
}