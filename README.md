# Airline Managment 

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.
Airline Managment System is designed for two roles -

- Airline Staff
- Admin

## Airline Staff
Airline Staff has 2 features - Check In services & In Flight services. 

### Check In Service
These features has folowing functionalities - 
- Selecting flight from the list. 
- Displaying passanger & check-in details in color coded seat map for each flight.
- Display passenger list with name, ancillary services, seat number based on passanger selection.
- Check-in or Undo Check-in, Changing or Swapping seat & Edit ancillary services by selecting respective seat.
- Displaying passanger & details in tabular view.

### In Flight Service
These features has folowing functionalities - 
- Selecting flight from the list. 
- Displaying passanger & in-flight details in color coded seat map for each flight.
- Display passenger list with name, ancillary services, seat number based on passanger selection.
- Changing Meal type & Edit ancillary services by selecting respective seat.
- Displaying passanger & details in tabular view.

## Admin
These features has folowing functionalities -
- Selecting flight from the list. 
- Displaying passanger & details in tabular view.
- Display passenger list with name, ancillary services, seat number based on passanger selection.
- Check-in or Undo Check-in, Changing or Swapping seat, Changing Meal type & Edit ancillary services by selecting respective seat.
- Adding new passangers to the flight.

## Non Functional
- Used SCSS for describing UI.
- Three break points are used - <600px(xs), <960px(md), >960(gt-sm).
- flex-layout MediaObservable is used in the app.
- State Managment NgRx is used to maintain transactional & static data.
- Followed w3c web standards with SEO of 90.
- Used Angular material components and created some customized components.
- Handled async API requests / responses with NgRx effects.
- Lazy loded the modules and lighthouse measured performance as 90.
- Followed best practices with 0 linting errrors and best lighthouse measured paractices as 100.
- Implemented unit tesing using Jasmine / Karma with the code coverage of 83.97%.
- Implemented google Oauth2 as authentication.

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `yarn build` to build the project with `--prod` flag to generate production build. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io). Run `yarn test:coverage` to generate coverage report for this project.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.