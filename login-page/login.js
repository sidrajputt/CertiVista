function validateLogin() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username === 'admin' && password === '1234') {
                // sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = '../index.html';
        }
        else{
                document.getElementById('error').textContent = 'Invalid username or password';
        }
}
