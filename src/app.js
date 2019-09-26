const express = require('express');
const fetch   = require('node-fetch');

const app = express();

const sortDataByContentId = data => data.sort((a, b) => (a.id - b.id));

const getHeadToHeadFile = async () => {
  const response = await fetch('https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json');

  return response.json();
};

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/players', async (req, res) => {
  const headToHeadJSON = await getHeadToHeadFile();

  return res.json(sortDataByContentId(headToHeadJSON.players))
});

app.get('/players/:id', async (req, res) => {
  const headToHeadJSON = await getHeadToHeadFile();

  const playerId = parseInt(req.params.id, 10); // better cast this one ;)
  const player   = headToHeadJSON.players.filter(player => player.id === playerId);

  if (player.length === 0) {
    return res.sendStatus(404);
  }

  return res.send(player.shift());
});

module.exports = app;