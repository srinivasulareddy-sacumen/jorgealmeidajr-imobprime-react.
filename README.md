
# iMobPrime - React Frontend for a Real Estate Management App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and contains only the frontend of a prototype for a real estate management application made with React.

## Table of Contents

- [Introduction](#introduction)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Missing Features to implement](#missing-features-to-implement)

## Introduction

This project will be used for estate agents that have to manage properties for their clients. Those estate agents are associated with real estates. There are clients associated with estate agents that have properties to sell or rent.

This application will focus in estate agents necessities and it will provide an easy and fast way for clients to search properties to sell or rent.

## Folder Structure

The folder structure of the project looks like this:

```
imobprime-react/
  README.md
  node_modules/
  package.json
  public/
  src/
    App.css
    App.js
    index.css
    index.js
    logo.svg
```

## Available Scripts

In the project directory, you can run:

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

![001](https://user-images.githubusercontent.com/6424524/32994027-a0fe05b6-cd48-11e7-8cde-60b15eff4a08.png)

### Real Estates Page

### Estate Agents Page

### Clients Page

### Properties Page

## Missing Features to implement

* Security with JWT or other library;
* Authorization and access control;
* Create a backend project with REST API;
* Create the database(there is one version made in mysql);
* Inplace row editing in data tables(use this feature in simple fields like strings, not for combo boxes),
* Install redux for state management.
