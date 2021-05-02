# Airline Management 

[![Package Manager](https://img.shields.io/badge/npm-6.13.4-red?style=flat-square)](https://docs.npmjs.com/cli/v6) ![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square) [![Deploy](https://img.shields.io/badge/deploy-netlify-blue?style=flat-square)](https://ng-airline-mgmt.netlify.app/) [![Coverage](https://img.shields.io/badge/coverage-86.91%-green?style=flat-square)](https://ng-airline-mgmt.netlify.app/) 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0. and hosted in Neflify. Back-end is written using express.js and hosted in Heroku.

Airline Management System App's URL is [https://ng-airline-mgmt.netlify.app/](https://ng-airline-mgmt.netlify.app/)
Based on the development and production environment backend URL will be chosen by app.

Airline Management System is designed for two roles -

- Airline Staff
- Admin


## Airline Staff
Airline Staff has 2 features - Check-In services & In-Flight services. 

### Check-In Service
These features have following  functionalities - 
- Selecting flight from the list. 
- Displaying passengers & check-in details in color coded seat map for each flight.
- Display passengers list with name, ancillary services, seat number based on passenger selection.
- Check-in or Undo Check-in, Changing or Swapping seat & Edit ancillary services by selecting respective seat.
- Displaying passenger & details in tabular view.

### In-Flight Service
These features have following  functionalities - 
- Selecting flight from the list. 
- Displaying passengers & in-flight details in color coded seat map for each flight.
- Display passengers list with name, ancillary services, seat number based on passenger selection.
- Changing Meal type & Edit ancillary services by selecting respective seat.
- Displaying passenger & details in tabular view.

## Admin
These features have following  functionalities -
- Selecting flight from the list. 
- Displaying passengers & details in tabular view.
- Display passenger list with name, ancillary services, seat number based on passenger selection.
- Check-in or Undo Check-in, Changing or Swapping seat, Changing Meal type & Edit ancillary services by selecting respective seat.
- Adding new passengers to the flight.

## Non Functional
- Used SCSS for describing UI.
- Three break points are used - <600px(xs), <960px(md), >960(gt-sm).
- flex-layout Media Observable is used in the app.
- State Management NgRx is used to maintain transactional & static data.
- Followed w3c web standards with SEO of 90.
- Used Angular material components and created some customized components.
- Handled async API requests / responses with NgRx effects.
- Lazy loaded the modules and lighthouse measured performance as 90.
- Followed best practices with 0 linting errors and best lighthouse measured practices as 100.
- Implemented unit testing using Jasmine / Karma with the code coverage of 87.13%.
- Implemented google Oauth2 as authentication.

## Installing dependencies

NPM package manager is used in this project. If npm is not installed in the machine refer this link [npm](https://docs.npmjs.com/cli/v6/configuring-npm/install).
Run `npm i` or `npm install` to install all dependencies for this project. 

## Development server

Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project with `--prod` flag to generate production build. The build artifacts will be stored in the `dist/` directory.

To host dis folder locally using a third party library [http-server](https://www.npmjs.com/package/http-server), follow these steps - 
- In `src\environments\environment.prod.ts` change backendAPI to https://ex-airline-mgmt-loc-prod.herokuapp.com
- Run `npm run build` and  install http-server globally by running `npm i -g http-serve`. 
- Navigate to `dist\ng-airline-mgmt` folder from command line and run `http-server -a=127.0.0.1 -p=8080`.
- Open `http://127.0.0.1:8080` in the browser to access the served build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). Run `npm run test:coverage` to generate coverage report for this project. The test artifacts will be stored in `coverage/`directory. 

### Repositories

- https://github.com/kar-21/ng-airline-mgmt
- https://github.com/kar-21/ex-airline-mgmt
