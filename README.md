# Curio Lane — Frontend

Angular frontend of Curio Lane, a small online shop of design objects
and curiosities.

**Live shop:** https://curiolane.giuseppecorso.it

**Backend (Spring Boot REST API):** https://github.com/giuseppecorso/ecommerce-backend

**Demo account:** username `user`, password `curio2026`

## Tech Stack

- Angular 22 (standalone components)
- Angular Material
- RxJS
- Vitest
- Docker (Node build stage + Nginx)

## Features

- Product catalog and product detail page
- Login with JWT: the token is stored in the browser and attached to
  every API request by an HTTP interceptor
- "My orders" page for the logged-in user
- Product creation form (ADMIN only)

## API base URL

The API address comes from `src/environments`:

- development: `http://localhost:8080`, the backend running locally
- production: an empty string, so requests go to `/api` on the same
  domain that serves the app. Nginx forwards them to the backend, and
  since app and API share the same origin, no CORS is involved.

## Running locally

    npm install
    npm start

The app runs on http://localhost:4200 and expects the backend on
http://localhost:8080.

## Build

    npm run build

## Docker

    docker build -t curiolane-frontend .

The image is built in two stages: a Node stage compiles the app, and an
Nginx stage serves the static files. `nginx.conf` sends every unknown
path back to `index.html`, so client-side routes like `/my-orders` work
on a page reload too.

In production the image is started together with the backend by the
`docker-compose.prod.yml` file in the backend repository.

## CI/CD

A GitHub Actions workflow builds the app on every push and pull request
to `main`. When a push to `main` builds correctly, a second job connects
to the server over SSH and runs the deploy script kept in the backend
repository, which rebuilds the containers.
