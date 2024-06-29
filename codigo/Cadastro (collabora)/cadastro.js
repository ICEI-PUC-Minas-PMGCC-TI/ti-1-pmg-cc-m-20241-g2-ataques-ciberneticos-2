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
