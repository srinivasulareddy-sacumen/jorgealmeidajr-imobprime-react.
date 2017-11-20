
# iMobPrime - React Frontend for a Real Estate Management App

This is a **React** project created with the [Create React App](https://github.com/facebookincubator/create-react-app) utility and contains only the `frontend` of a prototype for a `Real Estate Management Application`.

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Missing Features to implement](#missing-features-to-implement)

## Introduction

This project was created to be used by `Real Estate Agents or Brokers` that have to manage many `Properties` for their `Clients`. Those `Real Estate Agents or Brokers` are associated and work with `Real Estates`. For this application there are `Clients` and their data are managed by `Real Estate Agents or Brokers`. There are `Clients or Owners` that have properties to sell or rent and `Clients Interested` in a `Property` to buy or rent.

This project is going to focus in the `Real Estate Agents or Brokers` necessities, they are going to be the main actor for this project. This application will provide an easy and fast way for `Clients Interested` in a `Property` to search properties to sell or rent.

## Folder Structure

The folder structure of the project looks like this:

```
imobprime-react/
  README.md
  package.json
  public/
  src/
    api/        -> Classes for REST API integration
    components/ -> Stateless React Components
    App.js
    index.js
```

## Available Scripts

In the root project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Features

### Home Page

The image below is the initial page of the application. You can click in the search button in the left to filter properties by some parameters. You can search properties available to sell or rent in the input text typing the city name or district name. At the right there are two buttons that change the way to see the result of search, you can choose the map format default that uses Google Maps or the grid.

![home-page](https://user-images.githubusercontent.com/6424524/32994027-a0fe05b6-cd48-11e7-8cde-60b15eff4a08.png)

### Real Estates Page

The image below is a printscreen of the `Real Estates` page that has CRUD functionalities. Here you can list all real estates, filter real estates by some parameters, create a new real estate, update or delete a real estate.

![real-estates-page](https://user-images.githubusercontent.com/6424524/32994098-c67492fa-cd49-11e7-9366-cec7347bd36f.png)

### Real Estate Agents or Brokers Page

The image below is a printscreen of the `Real Estates Agents or Brokers` page that has CRUD functionalities. Here you can list all real estate agents, filter real estates agents by some parameters, create a new real estate agent, update or delete a real estate agent.

![corretores](https://user-images.githubusercontent.com/6424524/33036857-d5dc0c32-ce16-11e7-9a8c-f458f7b6880c.png)

### Clients Page

The image below is a printscreen of the `Clients` page that has CRUD functionalities. Here you can list all clients, filter clients by some parameters, create a new client, update or delete a client.

![clients](https://user-images.githubusercontent.com/6424524/33036872-e6fcd29e-ce16-11e7-89ab-b1006ce4d8d6.png)

### Properties Page

The image below is a printscreen of the `Properties` page that has CRUD functionalities. Here you can list all properties, filter properties by some parameters, create a new property, update or delete a property.

![properties](https://user-images.githubusercontent.com/6424524/33036889-f303a52c-ce16-11e7-8eac-d67b07fd6566.png)

## Missing Features to implement

* Security with JWT or other library;
* Authorization and access control with login and profile(admin and estate agent);
* Create a backend project with REST API;
* Create the database(there is one version made in mysql) and apply indexing;
* Internationalization(change the locales between english or brazilian portuguese);
* Add pagination and sorting capabilities in all data tables;
* Add mask in input fields that values need to be formatted;
* Inplace row editing in data tables(use this feature in simple fields like strings, not for combo boxes),
* Install redux for state management.
