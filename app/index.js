import express from 'express';
// const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the root!');
});

app.listen(3000, () => {
  console.log('SERVER RUNNING ON PORT 3000');
});
