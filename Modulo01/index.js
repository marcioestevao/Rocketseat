const express = require("express");

const server = express();

//Query params
// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name":"Diego", "email":"email@email.com" }

//Como estamos utilizando o express, para a que ele consiga ler o body via "Post",
//devemos adicionar um plugin que já foi instalado com o express
//através da linha abaixo:
server.use(express.json());

//pegar os query params
server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  // return res.send("Hello Word 2"); //Envia um texto
  return res.json({ message: `Hello ${nome}` }); //Envia um json
});

//pegar os route params
// server.get("/users/:id", (req, res) => {
//   //dois modos de pegar o id
//   const { id } = req.params; //dentro da chaves tem que ter o mesmo nome do param
//   const id2 = req.params.id;

//   return res.json({ message: `Buscando o usuário id: ${id} id2: ${id2}` }); //Envia um json
// });

const users = ["Marcio", "Neida", "Larissa", "Milly"];

//Middleware => é praticamente uma função que recebe os parâmetros req e res (e
//pode ser qualquer outro parâmetro) e faz alguma coisa, manipula estes parâme-
//tros. Portanto todos as rotas cadastradas acima são um middleware
//Tipos de midleware:
//Global ()
//Tem que posicionar fisicamente antes das rotas que deseja que ele seja global
server.use((req, res, next) => {
  console.time("Request"); //início para contar o tempo
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  //Independente da rota que foi chamada, ele executa esta rota global
  //Se não colocar a linha abaixo, ele não executa a rota que foi chamada
  next();

  console.timeEnd("Request"); //Termino de contagem do tempo e exibição no log
});

//Middleware local
//Nesta function, se no body não possuir o parâmetro name, retorna err 400
//para utilizar este middleware localmente, só colocar o nome da function após
//a rota, nas middlewares que se deseja utilizar
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

//Este middleware verifica se o indice informado é um nome válido
function checkUserInArray(req, res, next) {
  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User does not exists" });
  }

  // O middleware pode também fazer alteração no parâmetro que vai refletir nos
  // demais middlewares (next)
  // Por exemplo: caso exista o index informado:

  const user = users[req.params.index];
  req.user = user; //Criou uma propriedade na req para passar o user

  return next();
}

//pegar os route params via index
server.get("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params; //dentro da chaves tem que ter o mesmo nome do param
  // return res.json({ message: `Buscando o usuário ${index} ${users[index]}` }); //Envia um json

  //Ao invés de buscar o nome no array utilizando o index. Utiliza-se o parâmetro
  //criado no middleware checkUserInArray
  return res.json({ message: `Buscando o usuário ${index} ${users[index]}` }); //Envia um json
});

//Criar rota para retorno de todos os usuários
server.get("/users", (req, res) => {
  return res.json(users); //Envia um json
});

//Criação de Usuários
//Recebendo por Request Body
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users); //Envia um json
});

//Edição de usuário (PUT)
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users); //Envia um json
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(3000);
