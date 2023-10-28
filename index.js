const express = require('express');

const app = express();

app.use(express.json());

app.listen(8090, 'localhost', () => {
  console.log('Server is running on port 8090');
});
