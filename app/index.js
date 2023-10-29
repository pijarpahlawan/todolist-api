const express = require('express');

const app = express();
const PORT = 3030;
const HOST = '0.0.0.0';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
