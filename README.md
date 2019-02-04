
# iMobPrime - React Frontend for a Real Estate Management App

This is a **React** project created initially with the [Create React App](https://github.com/facebookincubator/create-react-app) utility and contains the frontend of a prototype application for Real Estate Management.

This project is a web application that does not have responsive capabilities and is not designed to run in a mobile screen. 

This frontend project is using Rest API endpoints provided by project [imobprime-spring-boot](https://github.com/jorgealmeidajr/imobprime-spring-boot).


## Table of Contents

- [Introduction](#introduction)
- [Basic Usage](#basic-usage)
- [What was learned or used in this project](#what-was-learned-or-used-in-this-project)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Missing Features to implement](#missing-features-to-implement)


## Introduction

This project was created to be a proof of concept for a prototype application. The purpose of this application is to manage real estates.

This project was created to be used by `Real Estate Agents or Brokers` that have to manage many properties for their clients. Those `Real Estate Agents or Brokers` are associated and work with a `Real Estates Agency`. The last mentioned relationship is optional.

For this application there are `Clients` and their data are managed by `Real Estate Agents or Brokers`. There are potential clients and clients who own properties managed by an agent. Those properties are available to sell or rent, and there are clients interested in a `Property` to buy or rent.

This project is focusing in the `Real Estate Agents or Brokers` necessities, they are going to be the main actor for this project. This application will provide an easy and fast way for clients interested in searching properties available for sale or rent.


## Basic Usage

First, run the command at the prompt: `$ npm install` to install the dependencies.

Before starting this frontend application, the backend project must be running. The database also needs to be prepared before running the backend. To check the requirements, simply access the backend project [imobprime-spring-boot](https://github.com/jorgealmeidajr/imobprime-spring-boot).

If all the requirements have been set properly, to run this frontend application just run the command at the prompt: `$ npm start`.


## What was learned or used in this project

- React v16 features.
- Javascript ES6+ features.
- React state managed without Redux.
- [Axios](https://github.com/axios/axios) was used for the REST API calls.
- Access of Google Maps JavaScript API.
- [React Google Maps](https://github.com/tomchentw/react-google-maps) component used for integration with Google Maps. This dependency will be kept as an example. In the future this functionality will be removed.
- [Semantic-UI-React](https://react.semantic-ui.com/) provided visual components ready for use and integration with Semantic-UI.


## Folder Structure

The folder structure of the project looks like this:

```
imobprime-react/
  src/
    api/        -> Classes for REST API integration
    components/ -> React Components
```


## Features

### Home Page

The home page is going to be public and accessed by anyone. This feature do not require authentication by the user. 

The home page is accessed by urls(routes) **'/'** or **'/home'**. The class that represents the main component of this page is **src/components/Home.js**.

Google has changed the way Google Maps API is charged, the features that use this API are not working and support for this API will be removed. Only grid mode works at the moment.

- You can click in the search button in the left to filter properties by some parameters. 
- You can search properties available to sell or rent in the input text typing the city name or district name. 
- At the right there are two buttons that change the way to see the results of searching, you can choose the map format that uses Google Maps or the grid mode. 


### Real Estates Page

This page is going to be accessed only by the `Administrator` of the application. This page requires authentication of a user with an administrator role. 

The real estates page is accessed by url(route) **'/imobiliarias'**. The class that represents the main component of this page is **src/components/Imobiliarias.js**.

- This page has CRUD functionalities. Here you can list all real estates, filter real estates by some parameters, create a new real estate, update or delete a real estate. 


### Real Estate Agents or Brokers Page

This page is going to be accessed only by the `Administrator` of the application. This page requires authentication of a user with an administrator role. 

The agents page is accessed by url(route) **'/corretores'**. The class that represents the main component of this page is **src/components/Agents.js**.

- This page has CRUD functionalities. Here you can list all real estate agents, filter real estates agents by some parameters, create a new real estate agent, update or delete a real estate agent. 
- The administrator can activate or deactivate an `Real Estate Agent or Broker` account.


### Clients Page

This page is going to be accessed by the `Administrator` and the `Real Estate Agent or Broker`. This page requires authentication of a user with an administrator or 'corretor'(agent) role. 

The clients page is accessed by url(route) **'/clientes'**. The class that represents the main component of this page is **src/components/Clients.js**.

- This page has CRUD functionalities. Here you can list all clients, filter clients by some parameters, create a new client, update or delete a client.


### Properties Page

This page is going to be accessed by the `Administrator` and the `Real Estate Agent or Broker`. This page requires authentication of a user with an administrator or 'corretor'(agent) role. 

The properties page is accessed by url(route) **'/imoveis'**. The class that represents the main component of this page is **src/components/Properties.js**.

- This page has CRUD functionalities. Here you can list all properties, filter properties by some parameters, create a new property, update or delete a property.


## Missing Features to implement

* Authentication with JWT (or other library);
* Authorization and access control with login and profiles (admin and real estate agent);
* Internationalization (change the locales between english or brazilian portuguese);
* Add pagination and sorting capabilities in all data tables;
* Add mask in input fields that values need to be formatted;
* Row editing in data tables (use this feature in simple fields like strings, not for combo boxes?),
* Use Redux for state management (maybe).
