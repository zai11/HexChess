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

$('#login-submit').click(() => {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    $.post("http://localhost:5001/login", { username: username, password: password }, (data, status) => {
        data = JSON.parse(data);
        if (data.success) {
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('elo', data.user.elo);
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
            $('#error-alert').text(data.err);
            setTimeout(() => {
                $('#error-alert').css('visibility', 'hidden');
                $('#error-alert').text('This shouldn\'t be visible');
            }, 3000);
        }
    })
});

$('#register-submit').click(() => {
    let username = $('#register-username').val();
    let email = $('#register-email').val();
    let password = $('#register-password').val();

    $.post("http://localhost:5001/users", { username: username, email: email, password: password }, (data, status) => {
        data = JSON.parse(data);
        if (data.success) {
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('elo', data.user.elo);
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
            $('#error-alert').text(data.err);
            setTimeout(() => {
                $('#error-alert').css('visibility', 'hidden');
                $('#error-alert').text('This shouldn\'t be visible');
            }, 3000);
        }
    });
});

$('#logout-button').click(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('elo');
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