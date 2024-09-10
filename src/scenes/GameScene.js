
import { MouseInputManager } from '../MouseInputManager.js';
import { UserInterfaceManager } from '../UserInterfaceManager.js';
import { IntervalManager } from '../IntervalManager.js';
import { Pawn } from '../pieces/Pawn.js';
import { Knight } from '../pieces/Knight.js';
import { Bishop } from '../pieces/Bishop.js';
import { Rook } from '../pieces/Rook.js';
import { Queen } from '../pieces/Queen.js';
import { King } from '../pieces/King.js';
import BitboardBuilder from '../BitboardBuilder.js';
import LocalMultiplayerBoard from '../boards/LocalMultiplayerBoard.js';
import OnlineBoard from '../boards/OnlineBoard.js'
import LocalAIBoard from '../boards/LocalAIBoard.js';

export default class GameScene extends Phaser.Scene
{
	constructor() {
		super();
	}

	preload = function() {
        this.load.setBaseURL('/assets/');

        this.load.text('fen_initial_layout', './fen/initial_layout.fen');

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
        this.intervalManager = new IntervalManager(this);
        this.board = this.createLocalMultiplayerBoard();

        //let piece = new Pawn(this.board, "K6", "black", this);

        //let bitboardBuilder = new BitboardBuilder(this.board, piece, "enpassant-movement");
        //console.log(bitboardBuilder.getBitboard());

        this.mouseInputManager = new MouseInputManager(this);

        this.board.init();

        this.ui = new UserInterfaceManager(this);
    }

    createOnlineBoard = function () {
        if (this.board !== undefined)
            this.board.destroy();
        this.board = new OnlineBoard(this, 'white', undefined, undefined);
        return this.board;
    }

    createLocalMultiplayerBoard = function () {
        if (this.board !== undefined)
            this.board.destroy();
        this.board = new LocalMultiplayerBoard(this, 'white', undefined, undefined);
        return this.board;
    }

    createLocalAIBoard = function () {
        if (this.board !== undefined)
            this.board.destroy();
        this.board = new LocalAIBoard(this, 'white', undefined, undefined);
        return this.board;
    }

    update = function () {
        this.ui.update();
    }
}