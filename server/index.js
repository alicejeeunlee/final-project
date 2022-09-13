require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const fetch = require('node-fetch');

const app = express();

app.use(staticMiddleware);

app.get('/api/discover', (req, res) => {
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + process.env.PETFINDER_API_KEY + '&client_secret=' + process.env.PETFINDER_API_SECRET,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(res => res.json())
    .then(data => {
      return fetch('https://api.petfinder.com/v2/animals?type=dog&limit=1', {
        headers: {
          Authorization: data.token_type + ' ' + data.access_token,
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => res.json(data))
        .catch(err => console.error('Fetch failed at getDoggo', err));
    })
    .catch(err => console.error('Fetch failed at getOAuth', err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
