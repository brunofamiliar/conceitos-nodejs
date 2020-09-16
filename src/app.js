const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {id: uuid(), title, url, techs, likes: 0}
  
  repositories.push(repo)

  return response.json(repo)

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body
  
  const index = repositories.findIndex(item => {
    if( item.id === id)
      return true;
  })

  if(index > -1){
    repositories[index].title = title
    repositories[index].url = url
    repositories[index].techs = techs

    return response.json(repositories[index])
  }

  return response.status(400).json({ error: 'Repository does not exists.' });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
 
  const index = repositories.findIndex(item => {
      return item.id === id;
  })

  if(index > -1){
    repositories.splice(index, 1)

    return response.status(204).send()
  }

  return response.status(400).json({ error: 'Repository does not exists.' });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(item => {
    if( item.id === id)
      return true;
  })

  if(index > -1){
    repositories[index].likes += 1

    return response.json(repositories[index])
  }

  return response.status(400).json({ error: 'Repository does not exists.' });

});

module.exports = app;
