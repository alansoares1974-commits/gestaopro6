const express = require('express');
const path = require('path');
const { Client } = require('pg');

const app = express();
const port = 9095; // Porta principal para a aplicação

app.use(express.json());

// Configuração do PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'meu_banco_sql',
    password: 'postgres',
    port: 5432,
});

// Conectar ao banco de dados e criar a tabela de usuários se não existir
async function initializeDatabase() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL.');

        // Criar tabela de usuários
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                role VARCHAR(20) NOT NULL
            );
        `;
        await client.query(createTableQuery);

        // Inserir usuário admin se não existir
        const checkAdminQuery = "SELECT * FROM users WHERE username = 'admin'";
        const res = await client.query(checkAdminQuery);

        if (res.rows.length === 0) {
            // A senha 'suporte@2' será armazenada em texto simples para fins de demonstração.
            const insertAdminQuery = "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)";
            await client.query(insertAdminQuery, ['admin', 'suporte@2', 'admin']);
            console.log('Usuário admin inserido com sucesso.');
        }
        console.log('Banco de dados inicializado com sucesso.');

    } catch (err) {
        console.error('Erro ao inicializar o banco de dados:', err);
    }
}

// Rotas de API de Exemplo (Dados simulados do SQL)
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Produto A', price: 150.00, stock: 50 },
        { id: 2, name: 'Produto B', price: 250.50, stock: 10 },
        { id: 3, name: 'Produto C', price: 99.90, stock: 200 },
    ];
    res.json(products);
});

app.get('/api/users', async (req, res) => {
    try {
        const result = await client.query("SELECT id, username, role FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json([]);
    }
});

app.get('/api/cash-management', (req, res) => {
    const cashData = {
        balance: 15000.75,
        transactions: [
            { id: 1, type: 'Entrada', description: 'Venda de Produto A', amount: 350.00, date: '2025-10-27' },
            { id: 2, type: 'Saída', description: 'Pagamento de Fornecedor', amount: 1200.00, date: '2025-10-26' },
            { id: 3, type: 'Entrada', description: 'Serviço Prestado', amount: 5000.00, date: '2025-10-25' },
        ]
    };
    res.json(cashData);
});

// Rotas de API adicionais para o Dashboard
app.get('/api/sales', (req, res) => {
    const sales = [
        { id: 1, product_name: 'Produto A', quantity: 5, total_revenue: 750.00, total_profit: 300.00, sale_date: '2025-10-27' },
        { id: 2, product_name: 'Produto B', quantity: 2, total_revenue: 501.00, total_profit: 200.00, sale_date: '2025-10-27' },
        { id: 3, product_name: 'Produto C', quantity: 10, total_revenue: 999.00, total_profit: 400.00, sale_date: '2025-10-20' },
    ];
    res.json(sales);
});

app.get('/api/services', (req, res) => {
    const services = [
        { id: 1, service_name: 'Instalação', total_value: 300.00, service_date: '2025-10-28' },
        { id: 2, service_name: 'Manutenção', total_value: 500.00, service_date: '2025-10-25' },
    ];
    res.json(services);
});

app.get('/api/expenses', (req, res) => {
    const expenses = [
        { id: 1, description: 'Aluguel', value: 1500.00, payment_date: '2025-10-01' },
        { id: 2, description: 'Energia', value: 300.00, payment_date: '2025-10-15' },
    ];
    res.json(expenses);
});

app.get('/api/materials', (req, res) => {
    const materials = [
        { id: 1, material_name: 'Cabo de Força', quantity: 50, minimum_quantity: 10 },
        { id: 2, material_name: 'Parafuso', quantity: 5, minimum_quantity: 20 }, // Estoque baixo
    ];
    res.json(materials);
});

// Servir o frontend (React) para todas as outras rotas (SPA)
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    } else {
        next();
    }
});

// Iniciar o servidor
initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
        // Log para o frontend (porta 9096)
        console.log(`Servidor rodando em http://localhost:9096 (para teste)`);
    });
});
