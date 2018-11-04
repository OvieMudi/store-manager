import express from 'express';

const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the root!');
});

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

export default app;
