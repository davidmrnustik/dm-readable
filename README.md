# Readable Project

This is final assessment project for Udacity's React Redux course. The repository consists of two parts: `api-server` and `frontend`. Every part has its own README file with further instructions.

## Install / Run

#### API Server
* `cd api-server`
* to install all api-server dependencies, run `npm run install`
* start the development server with `node server`

#### Frontend Server
* `cd frontend`
* to install all frontend dependencies, run `npm run install`
* start the development server with `npm run start`
* open in browser http://localhost:3000

## App

Readable project consists of categories, posts and comments. Users are able to post content to predefined categories, comment on their post and vote on posts and comments. Users are also able to edit and delete posts and comments.

## Project improvements beyond a basic version

* Validating forms with redux-form
* Server-side validation on new post and comment
* Simulating delay on API Server and handle it in frontend
* Some UX tweaks - toast alert when upating/removing, loading indicator when fetching/updating forms
* Basic design with Bootstrap components
* Custom build configuration for development and production
* Using express server instead of webpack-dev-server