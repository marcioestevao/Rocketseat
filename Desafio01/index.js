const express = require("express");

const server = express();

//plugin para que o express consiga ler o bocy via json
server.use(express.json());

const projects = [];
var requisicoes = 0;

//middleware global
server.use((req, res, next) => {
  next();

  requisicoes++;
  console.log(`Quantidade de requisições: ${requisicoes}`);
});

//middleware local
function checkProjectInArray(req, res, next) {
  if (!projects[req.params.index]) {
    return res.status(400).json({ error: "Project does not exists" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { project } = req.body;

  const novoItem = {
    id: project.id,
    title: project.title,
    tasks: []
  };

  projects.push(novoItem);

  return res.json(projects);
});

server.post("/projects/:index/tasks", checkProjectInArray, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const projeto = projects[index];

  projeto.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
