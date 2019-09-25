const express        = require('express');
const headToHeadJSON = require('./data/headtohead');

const app = express();

const sortDataByContentId = data => data.sort((a, b) => (a.id - b.id));

app.get('/players', (req, res) => res.json(sortDataByContentId(headToHeadJSON.players)));

app.get('/players/:id', (req, res) => {
  const playerId = parseInt(req.params.id, 10); // better cast this one ;)

  const player = headToHeadJSON.players.filter(player => player.id === playerId);

  if (player.length === 0) {
    return res.sendStatus(404);
  }

  return res.send(player.shift());
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Yellow ~mustard~ - oops - ball players app listening on port ${process.env.PORT || 3000}!`),
);