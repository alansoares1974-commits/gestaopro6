const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
// Configuração de CORS para permitir acesso do frontend (porta 9091)
app.use(cors({
  origin: 'http://72.60.246.250:9091',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

// O DATA_DIR deve ser o local onde os arquivos JSON são salvos
// Vou assumir que você quer salvar em /root/gestaopro6/data
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Rota POST dinâmica para salvar dados (ex: /bancoexterno/products, /bancoexterno/cash_mov)
app.post('/bancoexterno/:entityName', (req, res) => {
  try {
    const entityName = req.params.entityName;
    const data = req.body;
    
    // O frontend envia o array de objetos no corpo da requisição
    const filePath = path.join(DATA_DIR, `${entityName}.json`);
    
    // Salva o array de dados no arquivo JSON
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`Dados de ${entityName} salvos com sucesso.`);
    // Retorna os dados salvos
    res.json(data);
  } catch (error) {
    console.error(`Erro ao salvar ${req.params.entityName}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Rota GET dinâmica para buscar todos os dados (ex: /bancoexterno/products, /bancoexterno/cash_mov)
app.get('/bancoexterno/:entityName', (req, res) => {
  try {
    const entityName = req.params.entityName;
    const filePath = path.join(DATA_DIR, `${entityName}.json`);
    
    // Se o arquivo não existe, retorna um array vazio (404 era incorreto)
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }
    
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(`Erro ao ler ${req.params.entityName}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Rota GET para buscar um item específico (ex: /bancoexterno/products/123)
app.get('/bancoexterno/:entityName/:id', (req, res) => {
  // Esta rota não é usada pelo frontend atual, mas é uma boa prática
  res.status(501).json({ error: 'Not Implemented' });
});

// Rota PUT/DELETE (ex: /bancoexterno/products/123)
app.put('/bancoexterno/:entityName/:id', (req, res) => {
  res.status(501).json({ error: 'Not Implemented' });
});
app.delete('/bancoexterno/:entityName/:id', (req, res) => {
  res.status(501).json({ error: 'Not Implemented' });
});


// O servidor deve rodar na porta 8087, conforme a arquitetura do frontend
const PORT = 8087;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor banco externo rodando na porta ${PORT}`);
});
