//import Phaser from '../lib/phaser.js'
import { Board } from '../Board.js'
import { MouseInputManager } from '../MouseInputManager.js';
import { UserInterfaceManager } from '../UserInterfaceManager.js';

export default class GameScene extends Phaser.Scene
{
	constructor()
	{
		super();
	}

	preload()
    {
        this.load.setBaseURL('/assets/');

        this.load.text('fen_initial_layout', './fen/initial_layout.fen');

        this.load.json('json_tile_data_white', './json/tile_data_white.json');
        this.load.json('json_coord_data_white', './json/coord_data_white.json');
        this.load.json('json_tile_data_black', './json/tile_data_black.json');
        this.load.json('json_coord_data_black', './json/coord_data_black.json');
        this.load.json('json_boundary_tiles', './json/boundary_tiles.json');

        this.load.image('spr_background', './sprites/background.png');

        this.load.image('spr_tile_black', './sprites/tiles/tile_black_var_1.png');
        this.load.image('spr_tile_black_selected', './sprites/tiles/tile_black_var_1_selected.png');
        this.load.image('spr_tile_black_valid', './sprites/tiles/tile_black_var_1_valid.png');
        this.load.image('spr_tile_grey', './sprites/tiles/tile_grey_var_1.png');
        this.load.image('spr_tile_grey_selected', './sprites/tiles/tile_grey_var_1_selected.png');
        this.load.image('spr_tile_grey_valid', './sprites/tiles/tile_grey_var_1_valid.png');
        this.load.image('spr_tile_white', './sprites/tiles/tile_white_var_1.png');
        this.load.image('spr_tile_white_selected', './sprites/tiles/tile_white_var_1_selected.png');
        this.load.image('spr_tile_white_valid', './sprites/tiles/tile_white_var_1_valid.png');

        this.load.image('spr_piece_b_pawn', './sprites/pieces/pawn_black.png');
        this.load.image('spr_piece_w_pawn', './sprites/pieces/pawn_white.png');
        this.load.image('spr_piece_b_knight', './sprites/pieces/knight_black.png');
        this.load.image('spr_piece_w_knight', './sprites/pieces/knight_white.png');
        this.load.image('spr_piece_b_bishop', './sprites/pieces/bishop_black.png');
        this.load.image('spr_piece_w_bishop', './sprites/pieces/bishop_white.png');
        this.load.image('spr_piece_b_rook', './sprites/pieces/rook_black.png');
        this.load.image('spr_piece_w_rook', './sprites/pieces/rook_white.png');
        this.load.image('spr_piece_b_queen', './sprites/pieces/queen_black.png');
        this.load.image('spr_piece_w_queen', './sprites/pieces/queen_white.png');
        this.load.image('spr_piece_b_king', './sprites/pieces/king_black.png');
        this.load.image('spr_piece_w_king', './sprites/pieces/king_white.png');

        this.load.image('spr_promotion_prompt', './sprites/promotion_prompt.png');
    }

    create()
    {

        //this.add.image(0,0, 'spr_background').setOrigin(0,0);

        this.board = new Board(this, 'white', undefined, undefined);

        this.mouseInputManager = new MouseInputManager(this);

        this.board.init(this);

        this.ui = new UserInterfaceManager(this);

        //this.add.image(400, 300, 'spr_hex_black').setScale(0.25);
        //this.add.image(400+(128-32), 300-64, 'spr_hex_grey').setScale(0.25);
        //this.add.image(656, 300, 'spr_hex_white').setScale(0.25);

        //this.add.image(50, 560, 'spr_tile_black').setScale(0.05);
    }

    update() {
        this.ui.update();
    }
}