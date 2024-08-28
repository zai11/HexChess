import { OnlineClock } from "../Clock.js";
import LocalMultiplayerBoard from './LocalMultiplayerBoard.js';

export default class OnlineBoard extends LocalMultiplayerBoard {
    
    constructor(scene, colour, tiles_data, coords_data) {
        super(scene, colour, tiles_data, coords_data);
        this.load();
    }

    handleTileSelected = function (tile) {
        const game = JSON.parse(localStorage.getItem('game'));

        if (game.playerTurn == localStorage.getItem('id')) {
            this.handleTileSelectedParent(tile);
        } else {
            this.clearValidTiles();
            tile.setSelected();
            this.selectedTile = tile;
        }
    }

    handlePieceMove = async function (tile) {
        console.time("PieceMove");
        const prevTile = this.selectedTile;
        const piece = prevTile.getPiece();
        const game = JSON.parse(localStorage.getItem('game'));
        const uat = localStorage.getItem('uat');

        if (!this.checkPromotion(game, piece, tile, uat)) {
            const json = await this.sendMovementRequest(game, piece, tile, uat);
        
            if (json.success === false)
                this.scene.ui.displayError(json.errorMessage);
        }

        this.clock.syncTimes();

        this.clearValidTiles();
        tile.setSelected(false);
        this.selectedTile = undefined;

        this.reload();
        this.checkGameOver();
        console.timeEnd("PieceMove");
    }

    checkPromotion = function (game, piece, tile, uat) {
        if (piece === undefined)
            return false;
        if (piece.type === 'pawn') {
            let neighbourTileNorth = tile.getNeighbourTileNorth(piece.colour);
            if (neighbourTileNorth === undefined) {
                this.awaitingPromotion = true;
                this.scene.ui.createPromotionPrompt(piece, async function (promotionPiece) {
                    const json = this.sendMovementRequest(game, piece, tile, uat, promotionPiece);
                    
                    if (json.success === false)
                        this.scene.ui.displayError(json.errorMessage);
                });
                this.removePiece(piece);
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }

    sendMovementRequest = async function (game, piece, tile, uat, promotionPiece = undefined) {
        const response = await fetch("https://localhost:5501/Movement/", {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'gameID': game.id,
                'piece': {
                    'colour': piece.colour,
                    'coordinate': piece.coordinate,
                    'type': piece.type
                },
                'destination': tile.coordinate,
                'promotionPiece': promotionPiece,
                'userAccessToken': uat
            })
        });
        const json = await response.json();
        return json;
    }

    handleResignation = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const playerID = localStorage.getItem('id');
        const uat = localStorage.getItem('uat');
        const response = await fetch ('https://localhost:5501/Resignation/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                'gameID': gameID ,
                'playerID': playerID,
                'userAccessToken': uat
            })
        });
        const json = await response.json();
        if (!json.success)
            this.scene.ui.displayError(json.errorMessage);
        this.checkGameOver();
    }

    handleDrawOffer = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const playerID = localStorage.getItem('id');
        const uat = localStorage.getItem('uat');
        const response = await fetch ('https://localhost:5501/DrawOffer/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                'gameID': gameID ,
                'playerID': playerID,
                'userAccessToken': uat
            })
        });
        const json = await response.json();
        if (!json.success)
            this.scene.ui.displayError(json.errorMessage);
        this.checkGameOver();
    }

    handleDrawAccept = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const playerID = localStorage.getItem('id');
        const uat = localStorage.getItem('uat');
        const response = await fetch ('https://localhost:5501/DrawOfferResponse/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                'gameID': gameID ,
                'playerID': playerID,
                'userAccessToken': uat,
                'drawResponse': true
            })
        });
        const json = await response.json();
        if (!json.success)
            this.scene.ui.displayError(json.errorMessage);
        this.checkGameOver();
    }

    handleDrawDecline = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const playerID = localStorage.getItem('id');
        const uat = localStorage.getItem('uat');
        const response = await fetch ('https://localhost:5501/DrawOfferResponse/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 
                'gameID': gameID ,
                'playerID': playerID,
                'userAccessToken': uat,
                'drawResponse': false
            })
        });
        const json = await response.json();
        if (!json.success)
            this.scene.ui.displayError(json.errorMessage);
        this.checkGameOver();
    }

    checkGameOver = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const response = await fetch ('https://localhost:5501/FetchGameResult/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 'gameID': gameID })
        });
        const json = await response.json();
        if (!json.success)
            this.scene.ui.displayError(json.errorMessage);
        if (!json.completed)
            return;
        switch (json.gameResult) {
            case 'WHITE_WON':
                this.handleGameOver(1);
                break;
            case 'BLACK_WON':
                this.handleGameOver(-1);
                break;
            case 'DRAW':
                this.handleGameOver(0);
        }
    }

    load = function () {
        $('#tray #moves').empty();
        if (localStorage.getItem('localGame') === 'true')
            localStorage.setItem('localGame', 'false');
        const playerID = localStorage.getItem('id');
        const game = JSON.parse(localStorage.getItem('game'));
        const perspective = game.whitePlayer.id == playerID ? 'w' : 'b';
        this.gameRunning = true;
        this.drawOffer = undefined;
        this.loadFEN(game.fen, perspective);
        this.buildTiles();
        this.buildCoordinates();
        this.populateNotationTray(game.pgn);
        this.checkDrawOffer(game.drawOffer);
        this.intervalManager.removeInterval('clockTick');
        this.intervalManager.removeInterval('updateTick');
        const playerTurnColour = game.playerTurn  === game.whitePlayer.id ? 'white' : 'black';
        this.clock = new OnlineClock(this, playerTurnColour);
        this.intervalManager.addInterval('clockTick', setInterval(() => this.clock.tick(), 1000));
        this.intervalManager.addInterval('updateTick', setInterval(() => this.checkBoardUpdate(), 500));
    }

    reload = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        if (gameID === null)
            return;
        const response = await fetch('https://localhost:5501/FetchGame/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'gameID': gameID})
        });
        const json = await response.json();
        const game = json.game;
        localStorage.setItem('game', JSON.stringify(game));
        this.load();
    }

    checkBoardUpdate = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const response = await fetch('https://localhost:5501/FetchGame/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'gameID': gameID})
        });
        const json = await response.json();
        const updatedGame = json.game;
        const currentGame = JSON.parse(localStorage.getItem('game'));
        if (currentGame.playerTurn !== updatedGame.playerTurn)
            this.reload();
    }
}