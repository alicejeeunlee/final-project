# woofles

A full stack web application for dog lovers looking to adopt their next furry friend!

### Why I Built This

This solo project was built with React, Node.js, PostgreSQL, and Bootstrap to get a good foundation on full stack web development.

Inspired by modern dating apps, I wanted to showcase adoptable dogs (which are 1000% better than humans in my humble opinion) and try my hand on swipe functionality and aminations. As I was working on this project, Tinder announced that they implemented this idea of [showcasing adoptable dogs in celebration of National Dog Week 2022](https://techcrunch.com/2022/09/20/tinder-finds-a-better-use-by-adding-adoptable-dogs-to-its-app-in-celebration-of-national-dog-week/amp/)!

### Live Demo

Try the application live at [Woofles](https://woofles.alicejeeunlee.dev/)

## Technologies Used

* React
* Express
* Node.js
* Fetch
* PostgreSQL
* JavaScript
* HTML5
* CSS3
* Bootstrap 5
* Argon 2
* JSON Web Token
* Webpack
* Babel
* Dotenv
* Dokku
* [Petfinder API](https://www.petfinder.com/developers/v2/docs/)

## Preview

## Features

* User


## Stretch Features

## Development
### System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- Postgresql 14.3

### Getting Started
1. Clone the repository.

```
git clone https://github.com/alicejeeunlee/woofles.git
cd woofles
```

2. Install all dependencies with NPM.

```
npm install
```

3. Create a .env file from .env.example template.

```
cp .env.example .env
```

4. In the .env file, update the TOKEN_SECRET with any value and acquire a PETFINDER_API_KEY and PETFINDER_API_SECRET by following the instructions in the [Petfinder API docs](https://www.petfinder.com/developers/v2/docs/).

5. Start PostgreSQL and create the database.

```
sudo service postgresql start
createdb nameOfDatabase
pgweb --db=nameOfDatabase
```

6. In the .env file, update the DATABASE_URL to point to your PostgreSQL database.

```
DATABASE_URL=postgres://dev:dev@localhost/nameOfDatabase?sslmode=disable
```

7. Initialize the database.

```
npm run db:import
```

8. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

```
npm run dev
```
