// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (_req, _res) => {
  _res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {});
