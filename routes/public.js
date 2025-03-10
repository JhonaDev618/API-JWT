import express from "express";
import usuariosControler from "../controller/usuariosControler.js";
import jwt from "jsonwebtoken";
import verifyJwt from "../routes/private.js";
import "dotenv/config";

// Importando apenas o router do express
const router = express.Router();

const SECRET = process.env.SECRET;

router.post("/login", (req, res) => {
  const login = req.body.login;
  const senha = parseInt(req.body.senha);

  // Não está buscando no banco de dados, definido um login e senha fixo para teste
  try {
    if (login === "admin" && senha === 123) {
      // id foi definido pois não está buscando no banco de dados
      const token = jwt.sign({ id: 1 }, SECRET, { expiresIn: "1h" });
      return res.status(200).json({ auth: true, token: token });
    }
    return res
      .status(401)
      .json({ Menssage: "Login ou senha inválidos".login, senha });
  } catch (err) {
    return res
      .status(401)
      .json({ Menssage: "Erro ao realizar login no sistema" });
  }
   
});

router.get("/users", verifyJwt, (req, res) => {
  res.status(200).json(usuariosControler.listarUsuarios());
});

router.get("/users/:id", verifyJwt, (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = usuariosControler.buscarUsuarioID(id);
  if (retorno == 0) {
    return res.status(400).json({ error: "ID inválido." });
  }
  res.status(200).json(retorno);
});

router.post("/users", verifyJwt, (req, res) => {
  const novoUsuario = req.body; //recebendo os dados do usuario enviados no POST para a api
  if (!novoUsuario.nome || !novoUsuario.email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }
  usuariosControler.adicionarUsuario(novoUsuario);
  res.status(201).json(novoUsuario);
});

router.put("/users/:id", verifyJwt, (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioAtualizado = req.body;
  const a = usuariosControler.atualizarUsuario({
    ...usuarioAtualizado,
    id: id,
  });
  res.status(200).json(a);
});

router.delete("/users/:id", verifyJwt, (req, res) => {
  const id = parseInt(req.params.id);
  usuariosControler.removerUsuario(id);
  res.status(204).send();
});

// Exportando o router para poder usar em outros lugares
export default router; // para poder pegar as todas as rotas no arquivo app.js
