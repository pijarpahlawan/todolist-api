const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 3030;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
