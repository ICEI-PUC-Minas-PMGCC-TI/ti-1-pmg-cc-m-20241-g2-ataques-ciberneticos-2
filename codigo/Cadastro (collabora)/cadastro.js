document.getElementById('Cadastrar').addEventListener('click', function(event) {
    event.preventDefault();

    const nick = document.getElementById('Nick').value.trim();
    const name = document.getElementById('Name').value.trim();
    const email = document.getElementById('Email').value.trim();
    const cpf = document.getElementById('CPF').value.trim();
    const password = document.getElementById('Senha').value.trim();

    const errorMessage = validateForm(nick, name, email, cpf, password);

    if (errorMessage) {
        alert(errorMessage);
    } else {
        const user = {
            nick: nick,
            name: name,
            email: email,
            cpf: cpf,
            password: password
        };

        // Simular o armazenamento no banco de dados baseado em JSON
        saveUser(user);
        alert('Cadastro realizado com sucesso!');
        document.getElementById('signinForm').reset();
    }
});

function validateForm(nick, name, email, cpf, password) {
    if (!/^[a-zA-Z0-9]+$/.test(nick)) {
        return 'O apelido deve conter apenas letras e números, sem espaços.';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return 'O nome deve conter apenas letras e espaços.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'Por favor, insira um endereço de email válido.';
    }
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        return 'O CPF deve seguir o formato XXX.XXX.XXX-XX.';
    }
    if (!/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}/.test(password)) {
        return 'A senha deve conter pelo menos 6 caracteres, incluindo um número e um caractere especial.';
    }
    return null;
}

function saveUser(user) {
    let users = localStorage.getItem('users');
    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Mostrar modal de login
document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginModal').style.display = "block";
});

// Fechar modal de login
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('loginModal').style.display = "none";
});

// Fechar modal ao clicar fora dele
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = "none";
    }
});

// Lidar com o login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginSenha').value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        document.getElementById('loginModal').style.display = "none";
        document.getElementById('loginForm').reset();
    } else {
        alert('Email ou senha incorretos.');
    }
});
