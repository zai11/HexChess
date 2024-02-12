const buttons = ['play', 'puzzles', 'learn', 'social']
let activeGamesModalOpen = false;
localStorage.setItem('localGame', 'true');

buttons.forEach((button) => {

    $('#' + button + '-button').hover(() => {
        $('#' + button + '-sub-menu').css('visibility', 'visible');
        $('#' + button + '-button').css('background-color', 'rgba(0, 0, 0, 0.5)');
    }, () => {
        $('#' + button + '-sub-menu').css('visibility', 'hidden');
        $('#' + button + '-button').css('background-color', 'rgba(0, 0, 0, 0.5)');
    });
    
    $('#' + button + '-sub-menu').hover(() => {
        $('#' + button + '-sub-menu').css('visibility', 'visible');
        $('#' + button + '-button').css('background-color', 'rgba(0, 0, 0, 0.5)');
    }, () => {
        $('#' + button + '-sub-menu').css('visibility', 'hidden');
        $('#' + button + '-button').css('background-color', 'rgba(0, 0, 0, 0.5)');
    });
});

$('#login-button').click(() => {
    clearModals();
    $('#login-container').css('visibility', 'visible');
});

$('#register-button').click(() => {
    clearModals();
    $('#register-container').css('visibility', 'visible');
});

$('.modal-close').click(() => {
    clearModals();
});

if (localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null && localStorage.getItem('username') !== '') {
    $('#not-logged-in').css('display', 'none');
    $('#logged-in').css('display', 'flex');
    $('#logged-in p').text('Logged in as ' + localStorage.getItem('username'));
}

$('#login-submit').click(async function () {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    const response = await fetch("https://localhost:5501/LogIn/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'username': username, 'password': password})
    });
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('elo', data.user.elo);
        localStorage.setItem('loggedIn', data.user.loggedIn);
        localStorage.setItem('uat', data.user.userAccessToken);
        $('#login-container').css('visibility', 'hidden');
        $('#not-logged-in').css('display', 'none');
        $('#logged-in').css('display', 'flex');
        $('#logged-in p').text('Logged in as ' + localStorage.getItem('username'));
        $('#success-alert').css('visibility', 'visible');
        $('#success-alert').text('Successfully logged in');
        setTimeout(() => {
            $('#success-alert').css('visibility', 'hidden');
            $('#success-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
    else {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text(data.errorMessage);
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
});

$('#register-submit').click(async function () {
    let username = $('#register-username').val();
    let email = $('#register-email').val();
    let password = $('#register-password').val();
    const response = await fetch("https://localhost:5501/AddUser/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'username': username, 'email': email, 'password': password})
    });
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('id', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('elo', data.user.elo);
        localStorage.setItem('loggedIn', data.user.loggedIn);
        localStorage.setItem('uat', data.user.userAccessToken);
        $('#register-container').css('visibility', 'hidden');
        $('#not-logged-in').css('display', 'none');
        $('#logged-in').css('display', 'flex');
        $('#logged-in p').text('Logged in as ' + localStorage.getItem('username'));$('#success-alert').css('visibility', 'visible');
        $('#success-alert').text('Registration successful');
        setTimeout(() => {
            $('#success-alert').css('visibility', 'hidden');
            $('#success-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
    else {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text(data.errorMessage);
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
});

$('#logout-button').click(async function () {
    await fetch("https://localhost:5501/LogOut/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({'userID': localStorage.getItem('id'), 'userAccessToken': localStorage.getItem('uat')})
    });
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('elo');
    localStorage.removeItem('uat');
    localStorage.setItem('loggedIn', false);
    $('#not-logged-in').css('display', 'block');
    $('#logged-in').css('display', 'none');
    $('#success-alert').css('visibility', 'visible');
    $('#success-alert').text('Successfully logged out');
    setTimeout(() => {
        $('#success-alert').css('visibility', 'hidden');
        $('#success-alert').text('This shouldn\'t be visible');
    }, 3000);
});

$('#active-games-button').click(async function () {
    clearModals();
    if (localStorage.getItem('loggedIn') === 'false') {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text('You must be logged in to view your active games.');
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    } 
    else {
        $('#active-games-container').css('visibility', 'visible');
        activeGamesModalOpen = true;
        updateActiveGames();
    }
});

async function updateActiveGames() {
    let response = await fetch('https://localhost:5501/FetchActiveGames/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({'userID': localStorage.getItem('id')})
    });
    const gamesJSON = await response.json();
    $('.games-container').empty();
    let games = gamesJSON.activeGames;
    games.forEach(async function (game) {
        const turn = game.playerTurn == localStorage.getItem('id') ? 'my-turn' : 'opponent-turn';
        const opponent = game.whitePlayer.id == localStorage.getItem('id') ? game.blackPlayer : game.whitePlayer;
        const [clock, unit] = getClockAndUnit(game);
        $('.games-container').append(`<div class='game' value='${game.id}'><p class='game-detail ${turn}' id='opponent'>${opponent.username} (${opponent.elo})</p><p class='game-detail ${turn}' id='time-left'>~${clock} ${unit} Left</p></div>`);
    });

    handleActiveGameSelection();

    setTimeout(async function () {
        if (activeGamesModalOpen)
            updateActiveGames();
    }, 10000);
}

function handleActiveGameSelection() {
    $('div.game').click(async function (eventData) {
        const gameID = eventData.currentTarget.attributes['value'].value;
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
        const board = window.game.scene.scenes[0].board;
        board.loadOnline();
        $('#active-games-container').css('visibility', 'hidden');
    });
}

function getClockAndUnit(game) {
    let clock = game.playerTurn == game.playerWhite ? game.clockWhite : game.clockBlack;
    let unit = clock === 1 ? 'Second' : 'Seconds';
    if (clock >= 60 && clock < 3600) {
        clock = Math.round(clock / 60);
        unit = clock === 1 ? 'Minute' : 'Minutes';
    }
    if (clock >= 3600 && clock < 86400) {
        clock = Math.round(clock/3600);
        unit = clock === 1 ? 'Hour' : 'Hours';
    }
    if (clock >= 86400) {
        clock = Math.round(clock/86400);
        unit = clock === 1 ? 'Day' : 'Days';
    }
    return [clock, unit];
}

$('#create-game-button').click(() => {
    clearModals();
    if (localStorage.getItem('loggedIn') === 'false') {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text('You must be logged in to create a game.');
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    } 
    else
        $('#create-game-container').css('visibility', 'visible');
});

$('#create-game-modal-button').click(async function () {
    clearModals();
    if (localStorage.getItem('loggedIn') === 'false') {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text('You must be logged in to create a game.');
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
    const id = localStorage.getItem('id');
    const uat = localStorage.getItem('uat');
    const timeControl = $('#time-control-select').val();
    const response = await fetch("https://localhost:5501/CreateGameRequest/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'playerID': id, 'timeControl': timeControl, 'userAccessToken': uat})
    });
    const data = await response.json();
    if (data.success) {
        $('#success-alert').text('Game request created successfully. You will be able to play once someone else joins the game.');
        setTimeout(() => {
            $('#success-alert').css('visibility', 'hidden');
            $('#success-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
    else {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text(data.errorMessage);
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    }
});

$('#local-multiplayer-button').click(() => {
    clearModals();
    const board = window.game.scene.scenes[0].board;
    board.loadLocal();
});

$('#completed-games-button').click(async function () {
    clearModals();
    if (localStorage.getItem('loggedIn') === 'false') {
        $('#error-alert').css('visibility', 'visible');
        $('#error-alert').text('You must be logged in to view your active games.');
        setTimeout(() => {
            $('#error-alert').css('visibility', 'hidden');
            $('#error-alert').text('This shouldn\'t be visible');
        }, 3000);
    } 
    else {
        $('#completed-games-container').css('visibility', 'visible');
        let response = await fetch('https://localhost:5501/FetchCompletedGames/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({'userID': localStorage.getItem('id')})
        });
        const gamesJSON = await response.json();
        $('.games-container').empty();
        let games = gamesJSON.completedGames;
        games.forEach(async function (game) {
            const opponent = game.whitePlayer.id == localStorage.getItem('id') ? game.blackPlayer : game.whitePlayer;
            const result = game.result === 1 ? 'White Won' : game.result === -1 ? 'Black Won' : 'Draw';
            $('.games-container').append(`<div class='game' value='${game.id}'><p class='game-detail' id='opponent'>${opponent.username} (${opponent.elo})</p><p class='game-detail' id='time-left'>${result}</p></div>`);
        });
    }
});

$('#resign-button').click(() => {
    const board = window.game.scene.scenes[0].board;
    const winner = board.colour === 'white' ? -1 : 1;
    board.handleGameOver(winner);
});

$('#offer-draw-button').click(() => {
    const board = window.game.scene.scenes[0].board;
    board.handleDrawOfferLocal();
});

$('#accept-draw-button').click(() => {
    const board = window.game.scene.scenes[0].board;
    board.handleDrawAcceptLocal();
});

$('#decline-draw-button').click(() => {
    const board = window.game.scene.scenes[0].board;
    board.handleDrawDeclineLocal();
});

clearModals = function () {
    $('#login-container').css('visibility', 'hidden');
    $('#register-container').css('visibility', 'hidden');
    $('#active-games-container').css('visibility', 'hidden');
    $('#completed-games-container').css('visibility', 'hidden');
    $('#create-game-container').css('visibility', 'hidden');
    $('#game-end-container').css('visibility', 'hidden');
    activeGamesModalOpen = false;
}