require('dotenv/config');
const pg = require('pg');
const express = require('express');
const fetch = require('node-fetch');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(express.json());

const credentials = null;

app.post('/api/auth/sign-up', (req, res, next) => {
  const { email, name, password, location } = req.body;
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("email", "name", "hashedPassword", "location")
        VALUES ($1, $2, $3, $4)
        RETURNING "userId", "email", "location"
      `;
      const params = [email, name, hashedPassword, location];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  const sql = `
    SELECT "userId",
           "hashedPassword",
           "name",
           "location"
    FROM "users"
    WHERE "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, name, hashedPassword, location } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, name, location };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.get('/api/discover', (req, res, next) => {
  const { userId } = req.user;
  discoverDoggo()
    .then(results => res.json(results))
    .catch(err => next(err));

  function discoverDoggo() {
    return getOAuth()
      .then(getHrefs)
      .then(([credentials, hrefs]) => {
        return Promise
          .all([getDoggo(credentials, hrefs.doggoHref), getOrg(credentials, hrefs.orgHref)]);
      })
      .then(([doggo, org]) => {
        return isSwipedByUser(userId, doggo.animal.id)
          .then(isSwiped => {
            if (isSwiped) {
              return discoverDoggo();
            } else {
              return [doggo, org];
            }
          });
      });
  }

  function getOAuth() {
    if (credentials !== null && credentials.expires - new Date().getTime() < 100) {
      return credentials;
    }
    return fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=' + process.env.PETFINDER_API_KEY + '&client_secret=' + process.env.PETFINDER_API_SECRET,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => res.json())
      .then(data => {
        return {
          token: data.access_token,
          tokenType: data.token_type,
          expires: new Date().getTime() + (data.expires_in * 1000)
        };
      });
  }

  function getHrefs(credentials) {
    const params = new URLSearchParams({
      type: 'dog',
      limit: '1'
    }).toString();
    return fetch(`https://api.petfinder.com/v2/animals?${params}`, {
      headers: {
        Authorization: credentials.tokenType + ' ' + credentials.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        return [
          credentials,
          {
            doggoHref: data.animals[0]._links.self.href,
            orgHref: data.animals[0]._links.organization.href
          }
        ];
      });
  }

  function getDoggo(credentials, doggoHref) {
    return fetch('https://api.petfinder.com' + doggoHref, {
      headers: {
        Authorization: credentials.tokenType + ' ' + credentials.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }

  function getOrg(credentials, orgHref) {
    return fetch('https://api.petfinder.com' + orgHref, {
      headers: {
        Authorization: credentials.tokenType + ' ' + credentials.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  }

  function isSwipedByUser(userId, doggoId) {
    const sql = `
          SELECT "petfinderDogId"
          FROM "swipes"
          WHERE "userId" = $1
          AND "petfinderDogId" = $2
        `;
    const params = [userId, doggoId];
    return db.query(sql, params)
      .then(result => {
        return result.rows.length !== 0;
      });
  }
});

app.post('/api/swipe', (req, res, next) => {
  const { userId } = req.user;
  const { address1, address2, age, breed, characteristics, description, distance, doggoId, email, gender, health, home, location, name, org, orgId, phone, photos, size, url, isLiked } = req.body;
  const JSONphotos = JSON.stringify(photos);
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
  const params = [orgId, org, address1, address2, email, phone, doggoId, JSONphotos, name, breed, location, age, gender, size, distance, description, characteristics, health, home, url, userId, isLiked];
  db.query(sql, params)
    .then(result => res.sendStatus(201))
    .catch(err => next(err));
});

app.get('/api/favorites', (req, res, next) => {
  const { userId } = req.user;
  const isLiked = true;
  const sql = `
    SELECT "petfinderDogId", "photoUrls", "name", "location"
    FROM "dogs"
    JOIN "swipes" USING ("petfinderDogId")
    WHERE "userId" = $1 AND "isLiked" = $2
  `;
  const params = [userId, isLiked];
  db.query(sql, params)
    .then(result => {
      const likedDogs = result.rows;
      res.status(200).json(likedDogs);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
