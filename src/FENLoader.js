import { Pawn } from "./pieces/Pawn.js";
import { Knight } from "./pieces/Knight.js";
import { Bishop } from "./pieces/Bishop.js";
import { Rook } from "./pieces/Rook.js";
import { Queen } from "./pieces/Queen.js";
import { King } from "./pieces/King.js";

export class FENLoader {
    constructor(fenString, board, scene) {
        this.fenString = fenString;
        this.board = board;
        this.scene = scene;
    }

    loadRank =  function (rank, rankNum) {
        let numerals = rank.match(/\d+((?=\D)|$)/g);
        if (numerals !== null) {
            numerals.forEach((numeral) => {
                rank = rank.replace(numeral, '_'.repeat(parseInt(numeral)))
            });
        }
        for(let i = 0; i < 11; i++) {
            switch(rank[i]) {
                case 'x':
                case '_':
                    continue;
                case 'p':
                    this.board.addPiece(new Pawn(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'b':
                    this.board.addPiece(new Bishop(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'n':
                    this.board.addPiece(new Knight(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'r':
                    this.board.addPiece(new Rook(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'q':
                    this.board.addPiece(new Queen(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'k':
                    this.board.addPiece(new King(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.scene));
                    break;
                case 'P':
                    this.board.addPiece(new Pawn(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                    break;
                case 'B':
                    this.board.addPiece(new Bishop(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                    break;
                case 'N':
                    this.board.addPiece(new Knight(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                    break;
                case 'R':
                    this.board.addPiece(new Rook(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                    break;
                case 'Q':
                    this.board.addPiece(new Queen(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                    break;
                case 'K':
                    this.board.addPiece(new King(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.scene));
                        break;
                default:
                    console.warn('Invalid FEN provided');
                    return;
            }
        }
    }

    loadBoardPositions = function (boardPositions) {
        this.board.clear();
        let ranks = boardPositions.split('/').reverse();
        ranks.forEach((rank, index) => {
            this.loadRank(rank, index);
        });
    }

    loadPlayerToMove = function (playerToMove) {
        this.board.colour = playerToMove == 'w' ? 'white' : 'black';
    }

    loadEnPassant = function (enPassant) {
        if (enPassant == '-') {
            this.board.hasEnPassant = false;
            this.board.enPassant = '';
        }
        else {
            this.board.hasEnPassant = true;
            this.board.enPassant = enPassant;
        }
    }

    loadHalfMoveClock = function (halfMoveClock) {
        this.board.halfMoveClock = halfMoveClock;
    }

    loadFullMoveClock = function (fullMoveClock) {
        this.board.fullMoveClock = fullMoveClock;
    }

    load = function (forcePerspective) {
        let fields = this.fenString.split(' ');
        this.loadBoardPositions(fields[0]);
        if (forcePerspective === undefined)
            this.loadPlayerToMove(fields[1]);
        else
            this.loadPlayerToMove(forcePerspective);
        this.loadEnPassant(fields[2]);
        this.loadHalfMoveClock(fields[3]);
        this.loadFullMoveClock(fields[4]);
    }
}