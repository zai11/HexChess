import { Pawn } from "./Pawn.js";
import { Knight } from "./Knight.js";
import { Bishop } from "./Bishop.js";
import { Rook } from "./Rook.js";
import { Queen } from "./Queen.js";
import { King } from "./King.js";

export class FENLoader {
    constructor(fenString, board, context) {
        this.fenString = fenString;
        this.board = board;
        this.context = context;
    }

    loadRank = (rank, rankNum) => {
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
                    this.board.addPiece(new Pawn(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'b':
                    this.board.addPiece(new Bishop(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'n':
                    this.board.addPiece(new Knight(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'r':
                    this.board.addPiece(new Rook(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'q':
                    this.board.addPiece(new Queen(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'k':
                    this.board.addPiece(new King(this.board, String.fromCharCode(i+65) + (rankNum+1), 'black', this.context));
                    break;
                case 'P':
                    this.board.addPiece(new Pawn(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                    break;
                case 'B':
                    this.board.addPiece(new Bishop(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                    break;
                case 'N':
                    this.board.addPiece(new Knight(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                    break;
                case 'R':
                    this.board.addPiece(new Rook(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                    break;
                case 'Q':
                    this.board.addPiece(new Queen(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                    break;
                case 'K':
                    this.board.addPiece(new King(this.board, String.fromCharCode(i+65) + (rankNum+1), 'white', this.context));
                        break;
                default:
                    console.warn('Invalid FEN provided');
                    return;
            }
        }
    }

    loadBoardPositions = (boardPositions) => {
        let ranks = boardPositions.split('/').reverse();
        ranks.forEach((rank, index) => {
            this.loadRank(rank, index);
        });
    }

    loadPlayerToMove = (playerToMove) => {
        switch(playerToMove) {
            case 'w':
            case 'b':
                this.board.playerToMove = playerToMove;
                break;
            default:
                console.warn('Invalid FEN provided');
                return;
        }
    }

    loadHalfMoveClock = (halfMoveClock) => {
        this.board.halfMoveClock = halfMoveClock;
    }

    loadFullMoveClock = (fullMoveClock) => {
        this.board.fullMoveClock = fullMoveClock;
    }

    load = () => {
        let fields = this.fenString.split(' ');
        this.loadBoardPositions(fields[0]);
        this.loadPlayerToMove(fields[1]);
        this.loadHalfMoveClock(fields[2]);
        this.loadFullMoveClock(fields[3]);
    }
}