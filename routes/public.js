import express from "express";
import usuariosControler from "../controller/usuariosControler.js";

// Importando apenas o router do express
const router = express.Router();

router.get("/users", (req, res) => {
  res.status(200).json(usuariosControler.listarUsuarios());
});

router.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const retorno = usuariosControler.buscarUsuarioID(id);
  if (retorno == 0) {
    return res.status(400).json({ error: "ID inválido." });
  }
  res.status(200).json(retorno);
});

router.post("/users", (req, res) => {
  const novoUsuario = req.body; //recebendo os dados do usuario enviados no POST para a api
  if (!novoUsuario.nome || !novoUsuario.email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }
  usuariosControler.adicionarUsuario(novoUsuario);
  res.status(201).json(novoUsuario);
});

router.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioAtualizado = req.body;
  const a = usuariosControler.atualizarUsuario({
    ...usuarioAtualizado,
    id: id,
  });
  res.status(200).json(a);
});

router.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  usuariosControler.removerUsuario(id);
  res.status(204).send();
});

// Exportando o router para poder usar em outros lugares
export default router; // para poder pegar as todas as rotas no arquivo app.js
