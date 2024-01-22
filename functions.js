const buttons = ['play', 'puzzles', 'learn', 'social']

buttons.forEach((button) => {

    $('#' + button + '-button').hover(() => {
        $('#' + button + '-sub-menu').css('visibility', 'visible');
        $('#' + button + '-button').css('background-color', 'var(--primary-colour)');
    }, () => {
        $('#' + button + '-sub-menu').css('visibility', 'hidden');
        $('#' + button + '-button').css('background-color', 'var(--secondary-colour)');
    });
    
    $('#' + button + '-sub-menu').hover(() => {
        $('#' + button + '-sub-menu').css('visibility', 'visible');
        $('#' + button + '-button').css('background-color', 'var(--primary-colour)');
    }, () => {
        $('#' + button + '-sub-menu').css('visibility', 'hidden');
        $('#' + button + '-button').css('background-color', 'var(--secondary-colour)');
    });
});

$('#login-button').click(() => {
    $('#login-container').css('visibility', 'visible');
    $('#register-container').css('visibility', 'hidden');
});

$('#register-button').click(() => {
    $('#login-container').css('visibility', 'hidden');
    $('#register-container').css('visibility', 'visible');
});

$('.modal-close').click(() => {
    $('#login-container').css('visibility', 'hidden');
    $('#register-container').css('visibility', 'hidden');
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
    /*$.post("http://localhost:5501/AddUser", { username: username, email: email, password: password }, (data, status) => {
        data = JSON.parse(data);
        if (data.success) {
            localStorage.setItem('id', data.user.id);
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('elo', data.user.elo);
            localStorage.setItem('loggedIn', data.user.loggedIn);
            localStorage.setItem('uat', data.user.uat);
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
    });*/
});

$('#logout-button').click(async function () {
    await fetch("https://localhost:5501/LogOut/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'userID': localStorage.getItem('id'), 'userAccessToken': localStorage.getItem('uat')})
    });
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('elo');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('uat');
    $('#not-logged-in').css('display', 'block');
    $('#logged-in').css('display', 'none');
    $('#success-alert').css('visibility', 'visible');
    $('#success-alert').text('Successfully logged out');
    setTimeout(() => {
        $('#success-alert').css('visibility', 'hidden');
        $('#success-alert').text('This shouldn\'t be visible');
    }, 3000);
});

let displayError = (errorMessage) => {
    alert(errorMessage);
}