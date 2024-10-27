const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Estrutura para armazenar produtos em memória (simulando um banco de dados)
let produtos = []; // Certifique-se de que isso está no escopo global

// Rotas
app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/create', (req, res) => {
    const { produto, preco, quantidade, marca, categoria } = req.body;
    const id = produtos.length + 1; // Simula um ID incremental
    const valorTotal = parseFloat(preco) * parseInt(quantidade);

    const novoProduto = { id, produto, preco, quantidade, marca, categoria, valorTotal };
    produtos.push(novoProduto);

    res.redirect('/table');
});

app.get('/table', (req, res) => {
    res.render('table', { produtos }); // Certifique-se de que 'produtos' está acessível aqui
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { produto, preco, quantidade, marca, categoria } = req.body;
    const produtoIndex = produtos.findIndex((p) => p.id == id);

    if (produtoIndex !== -1) {
        const valorTotal = parseFloat(preco) * parseInt(quantidade);
        produtos[produtoIndex] = { id: parseInt(id), produto, preco, quantidade, marca, categoria, valorTotal };
    }

    res.redirect('/table');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    produtos = produtos.filter((p) => p.id != id);

    res.redirect('/table');
});

// Página inicial
app.get('/', (req, res) => {
    res.redirect('/form');
});

// Iniciar servidor
app.listen(3005, () => {
    console.log('Servidor rodando na porta 3005');
});
