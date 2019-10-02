const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const port = process.env.PORT || 3000;

app.get('/api/pages', async () => {

});

app.get('/api/pages/:id/children', async () => {
  
});

app.get('/api/pages/:id/siblings', async () => {
  
});