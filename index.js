const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do body-parser para análise de dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do mecanismo de visualização para EJS
app.set('view engine', 'ejs');

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para lidar com as inscrições
app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  // Aqui você pode adicionar a lógica para salvar o e-mail no banco de dados ou enviá-lo para um serviço de e-mail marketing
  // Por enquanto, apenas respondemos com uma mensagem simples
  res.send(`Obrigado por se inscrever, ${email}!`);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
