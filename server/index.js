const express = require('express');
const config = require('./config');
const { getHtmlByConfig } = require('./html');

const app = express();
const { port } = config.env;
const html = getHtmlByConfig(JSON.stringify(config));

app.get('/healthz', (_, res) => {
  res.send('OK');
});

app.use('/pherusa',express.static('build'));

app.get('/*', (_, res) => {
  res.send(html);
});

app.listen(port, () => console.log(`> Server is running on 127.0.0.1:${port}`));

// const express = require('express');
// const app = express();
// var history = require('connect-history-api-fallback');
// app.use(history())
// const port = 4000
// app.use('/',express.static('dist'))
// app.listen(port, () => console.log(`> Server is running on 127.0.0.1:${port}`));
