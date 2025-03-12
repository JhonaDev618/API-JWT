import express from "express";
import publicRoutes from './routes/public.js'

const app = express();
const port = 3000;
app.use(express.json()); // defien que o express vai utilizar json 

// Rotas públicas do arquivo routes
app.use('/', publicRoutes);

/*
Você deve criar uma API que permita gerenciar usuários, 
seguindo os requisitos abaixo:
Criar um servidor Node.js utilizando o Express. OK
Implementar as seguintes rotas:GET /users → Retorna a lista de usuários cadastrados. ok
POST /users → Adiciona um novo usuário (enviar nome e e-mail no corpo da requisição). ok
PUT /users/:id → Atualiza os dados de um usuário pelo ID.
DELETE /users/:id → Remove um usuário pelo ID.
Os dados devem ser armazenados em uma lista na memória.
Retornar os dados no formato JSON.
*/

app.listen(port, () => console.log(`Servidor rodando na porta http:\\localhost:${port} 🚀`));

