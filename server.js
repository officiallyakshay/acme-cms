const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const { Page } = require('./db');
const port = process.env.PORT || 3000;

app.get('/api/pages', async ( req, res, next ) => {
  try {
    res.send(await Page.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/pages/:id/children', async () => {
  
});

app.get('/api/pages/:id/siblings', async () => {
  
});

db.syncAndSeed()
  .then(() => {
  app.listen(port, () => console.log(`listening on port ${port}`));
})