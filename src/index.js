const app = require('./app')

app.listen(process.env.PORT || 3000, () =>
  console.log(`~Yellow mustard~ - oops - yellow ball players app listening on port ${process.env.PORT || 3000}!`),
);