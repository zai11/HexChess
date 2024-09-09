export class LocalClock {
    constructor(board, playerTurn = 'white') {
        this.board = board;
        this.playerTurn = playerTurn;
        this.whiteTime = 180;
        this.blackTime = 180;
        this.whiteClock = this.formatClock(this.whiteTime);
        this.blackClock = this.formatClock(this.blackTime);
    }

    formatClock = function (time) {
        const seconds = time / 1000;
        const minutes = time / 60000;
        const hours = time / 3600000;
        const days = time / 86400000;
        if (days >= 1)
            return round(days) + " days";
        else if (hours >= 1)
            return Math.floor(hours) + ":" + (Math.floor(minutes) - Math.floor(hours) * 60).toLocaleString('en-US', 
            {
                minimumIntegerDigits: 2,
                useGrouping: false
            }) + ":" + (Math.floor(seconds) - Math.floor(hours) * 60 - Math.floor(minuts) * 3600).toLocaleString('en-US', 
            {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        else if (minutes >= 1)
            return Math.floor(minutes) + ":" + (Math.floor(seconds) - Math.floor(minutes) * 60).toLocaleString('en-US', 
            {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
        else
            return "" + seconds;
    }

    tick = function () {
        if (this.board.gameRunning === true) {
            if (this.playerTurn === 'white')
                this.whiteTime -= 1000;
            else
                this.blackTime -= 1000;
            this.whiteClock = this.formatClock(this.whiteTime);
            this.blackClock = this.formatClock(this.blackTime);
            this.updateUI();
            if (this.whiteTime <= 0) {
                this.whiteTime = 0;
                this.board.handleGameOver(-1);
            }
            if (this.blackTime <= 0) {
                this.blackTime = 0;
                this.board.handleGameOver(1);
            }
        }
    }

    updateUI = function () {
        $('#white-clock').text(this.whiteClock);
        $('#black-clock').text(this.blackClock);
    }

    togglePlayer = function () {
        if (this.playerTurn === 'white')
            this.playerTurn = 'black';
        else
            this.playerTurn = 'white';
    }
}

export class OnlineClock extends LocalClock {
    constructor(board, playerTurn) {
        super(board, playerTurn);
        this.setup();
    }

    setup = async function () {
        await this.syncTimes();
        this.whiteClock = this.formatClock(this.whiteTime);
        this.blackClock = this.formatClock(this.blackTime);
        this.updateUI();
    }

    fetchTimes = async function () {
        const gameID = JSON.parse(localStorage.getItem('game')).id;
        const whiteID = JSON.parse(localStorage.getItem('game')).whitePlayer.id;
        const blackID = JSON.parse(localStorage.getItem('game')).blackPlayer.id;
        if (gameID === null || whiteID === null || blackID === null)
            return;
        let response = await fetch('https://localhost:5501/FetchClockTimeLeft/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'gameID': gameID, 'userID': whiteID})
        });
        let json = await response.json();
        const timeWhite = parseInt(json.clockTimeLeft);
        response = await fetch('https://localhost:5501/FetchClockTimeLeft/', {
            headers: {
                'Accepts': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'gameID': gameID, 'userID': blackID})
        });
        json = await response.json();
        const timeBlack = parseInt(json.clockTimeLeft);
        return [timeWhite, timeBlack];
    }

    syncTimes = async function () {
        [this.whiteTime, this.blackTime] = await this.fetchTimes();
    }

    tick = function () {
        if (this.playerTurn === 'white')
            this.whiteTime -= 1000;
        else
            this.blackTime -= 1000;
        this.whiteClock = this.formatClock(this.whiteTime);
        this.blackClock = this.formatClock(this.blackTime);
        this.updateUI();
        this.board.checkGameOver();
    }
}