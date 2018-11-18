import express from 'express';
import bodyParser from 'body-parser';
import storeRoutes from './api-routes/storeRoutes';


const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());
app.use('/api/v1/products', storeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the root!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`SERVER RUNNING ON PORT ${port}`);
});

export default app;
