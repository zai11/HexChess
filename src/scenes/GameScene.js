import { Board } from '../Board.js'
import { MouseInputManager } from '../MouseInputManager.js';
import { Raycaster } from '../Raycaster.js';
import { UserInterfaceManager } from '../UserInterfaceManager.js';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super();
	}

	preload = function() {
        this.load.setBaseURL('/assets/');

        this.load.text('fen_initial_layout', './fen/test.fen');

        this.load.json('json_tile_data_white', './json/tile_data_white.json');
        this.load.json('json_tile_data_black', './json/tile_data_black.json');
        this.load.json('json_coord_data_white', './json/coord_data_white.json');
        this.load.json('json_coord_data_black', './json/coord_data_black.json');

        this.load.image('spr_tile_black', './sprites/tiles/tile_black_var_1.png');
        this.load.image('spr_tile_black_selected', './sprites/tiles/tile_black_var_1_selected.png');
        this.load.image('spr_tile_black_valid', './sprites/tiles/tile_black_var_1_valid.png');
        this.load.image('spr_tile_grey', './sprites/tiles/tile_grey_var_1.png');
        this.load.image('spr_tile_grey_selected', './sprites/tiles/tile_grey_var_1_selected.png');
        this.load.image('spr_tile_grey_valid', './sprites/tiles/tile_grey_var_1_valid.png');
        this.load.image('spr_tile_white', './sprites/tiles/tile_white_var_1.png');
        this.load.image('spr_tile_white_selected', './sprites/tiles/tile_white_var_1_selected.png');
        this.load.image('spr_tile_white_valid', './sprites/tiles/tile_white_var_1_valid.png');

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

        this.load.image('spr_promotion_prompt', './sprites/promotion_prompt.png');
    }

    create = function () {
        this.board = new Board(this, 'white', undefined, undefined);

        this.mouseInputManager = new MouseInputManager(this);

        this.board.init(this);

        this.ui = new UserInterfaceManager(this);
    }

    update = function () {
        this.ui.update();
    }
}