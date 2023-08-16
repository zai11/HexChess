import { Knight } from "./pieces/Knight.js";
import { Bishop } from "./pieces/Bishop.js";
import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";

export class PromotionPrompt {
    constructor(context, piece) {
        this.piece = piece;
        console.log(this.piece);
        this.context = context;
        const style_black = {color: '#000', fontSize: 15};
        this.background = context.add.sprite(0, 810, 'spr_promotion_prompt').setOrigin(0,1);
        this.title = context.add.text(100, 440, 'Pawn Promotion:', style_black).setOrigin(0.5,0);
        this.promotionKnight = context.add.sprite(100, 490, 'spr_piece_' + piece.colour + '_knight').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionKnight.on('pointerdown', this.knightSelected, this);
        this.promotionBishop = context.add.sprite(100, 560, 'spr_piece_' + piece.colour + '_bishop').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionBishop.on('pointerdown', this.bishopSelected, this);
        this.promotionRook = context.add.sprite(100, 630, 'spr_piece_' + piece.colour + '_rook').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionRook.on('pointerdown', this.rookSelected, this);
        this.promotionQueen = context.add.sprite(100, 700, 'spr_piece_' + piece.colour + '_queen').setOrigin(0.5, 0).setScale(0.08).setInteractive();
        this.promotionQueen.on('pointerdown', this.queenSelected, this);
    }

    destroy() {
        this.background.destroy();
        this.title.destroy();
        this.promotionKnight.destroy();
        this.promotionBishop.destroy();
        this.promotionRook.destroy();
        this.promotionQueen.destroy();
    }

    knightSelected() {
        this.piece.take();
        this.piece = this.context.board.addPiece(new Knight(this.piece.board, this.piece.coordinate, this.piece.colour, this.context));
        this.context.ui.destroyPromotionPrompt();
    }

    bishopSelected() {
        this.piece.take();
        this.piece = this.context.board.addPiece(new Bishop(this.piece.board, this.piece.coordinate, this.piece.colour, this.context));
        this.context.ui.destroyPromotionPrompt();
    }

    rookSelected() {
        this.piece.take();
        this.piece = this.context.board.addPiece(new Rook(this.piece.board, this.piece.coordinate, this.piece.colour, this.context));
        this.context.ui.destroyPromotionPrompt();
    }

    queenSelected() {
        this.piece.take();
        this.piece = this.context.board.addPiece(new Queen(this.piece.board, this.piece.coordinate, this.piece.colour, this.context));
        this.context.ui.destroyPromotionPrompt();
    }
}