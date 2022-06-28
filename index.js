const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

app.use('/talker', routes.routerTalker);
app.use('/login', routes.routerLogin);