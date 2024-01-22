import { Knight } from "./pieces/Knight.js";
import { Bishop } from "./pieces/Bishop.js";
import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";

export class PromotionPrompt {
    constructor(scene, piece) {
        this.piece = piece;
        this.scene = scene;
        const style_black = {color: '#000', fontSize: 15};
        this.background = this.scene.add.sprite(0, 810, 'spr_promotion_prompt').setOrigin(0,1);
        this.title = this.scene.add.text(100, 440, 'Pawn Promotion:', style_black).setOrigin(0.5,0);
        this.promotionKnight = this.scene.add.sprite(100, 490, 'spr_piece_' + piece.colour + '_knight').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionKnight.on('pointerdown', this.knightSelected, this);
        this.promotionBishop = this.scene.add.sprite(100, 560, 'spr_piece_' + piece.colour + '_bishop').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionBishop.on('pointerdown', this.bishopSelected, this);
        this.promotionRook = this.scene.add.sprite(100, 630, 'spr_piece_' + piece.colour + '_rook').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionRook.on('pointerdown', this.rookSelected, this);
        this.promotionQueen = this.scene.add.sprite(100, 700, 'spr_piece_' + piece.colour + '_queen').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionQueen.on('pointerdown', this.queenSelected, this);
    }

    destroy = function () {
        this.background.destroy();
        this.title.destroy();
        this.promotionKnight.destroy();
        this.promotionBishop.destroy();
        this.promotionRook.destroy();
        this.promotionQueen.destroy();
    }

    knightSelected = function () {
        this.piece.take();
        this.piece = this.scene.board.addPiece(new Knight(this.piece.board, this.piece.coordinate, this.piece.colour, this.scene));
        this.scene.ui.destroyPromotionPrompt();
    }

    bishopSelected = function () {
        this.piece.take();
        this.piece = this.scene.board.addPiece(new Bishop(this.piece.board, this.piece.coordinate, this.piece.colour, this.scene));
        this.scene.ui.destroyPromotionPrompt();
    }

    rookSelected = function () {
        this.piece.take();
        this.piece = this.scene.board.addPiece(new Rook(this.piece.board, this.piece.coordinate, this.piece.colour, this.scene));
        this.scene.ui.destroyPromotionPrompt();
    }

    queenSelected = function () {
        this.piece.take();
        this.piece = this.scene.board.addPiece(new Queen(this.piece.board, this.piece.coordinate, this.piece.colour, this.scene));
        this.scene.ui.destroyPromotionPrompt();
    }
}