require('dotenv/config');
const pg = require('pg');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const fetch = require('node-fetch');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/discover', (req, res, next) => {
  let token;
  let tokenType;
  let expires;
  let doggoHref;
  let orgHref;
  if (!expires || expires - new Date().getTime() < 1) {
    getOAuth()
      .then(() => {
        getHref()
          .then(() => {
            Promise
              .all([getDoggo(), getOrg()])
              .then(data => res.json(data))
              .catch(err => next(err));
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    getHref()
      .catch(err => next(err));
  }

  function getOAuth() {
    return fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + process.env.PETFINDER_API_KEY + '&client_secret=' + process.env.PETFINDER_API_SECRET,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(data => {
        token = data.access_token;
        tokenType = data.token_type;
        expires = new Date().getTime() + (data.expires_in * 1000);
      });
  }

  function getHref() {
    return fetch('https://api.petfinder.com/v2/animals?type=dog&limit=1', {
      headers: {
        Authorization: tokenType + ' ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        doggoHref = data.animals[0]._links.self.href;
        orgHref = data.animals[0]._links.organization.href;
      });
  }

  function getDoggo() {
    return fetch('https://api.petfinder.com' + doggoHref, {
      headers: {
        Authorization: tokenType + ' ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }

  function getOrg() {
    return fetch('https://api.petfinder.com' + orgHref, {
      headers: {
        Authorization: tokenType + ' ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }
});

app.post('/api/love', (req, res, next) => {
  const { address1, address2, age, breed, characteristics, description, distance, doggoId, email, gender, health, home, location, name, org, orgId, phone, photos, size, url, userId, isLiked } = req.body;
  const sql = `
    WITH "insertOrg" AS (
      INSERT INTO "organizations" ("petfinderOrgId", "organization", "address1", "address2", "email", "phone")
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
    ),
    "insertDoggo" AS (
      INSERT INTO "dogs" ("petfinderDogId", "photoUrls", "name", "breed", "location", "age", "gender", "size", "distance", "description", "characteristics", "health", "home", "url", "petfinderOrgId")
      VALUES ($7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $1)
      ON CONFLICT DO NOTHING
    )
    INSERT INTO "swipes" ("userId", "petfinderDogId", "isLiked")
    VALUES ($21, $7, $22)
    RETURNING *
  `;
  const params = [orgId, org, address1, address2, email, phone, doggoId, photos, name, breed, location, age, gender, size, distance, description, characteristics, health, home, url, userId, isLiked];
  db.query(sql, params)
    .then(result => res.sendStatus(201))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
