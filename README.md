# RobDemGood - a React Native mock trading App

### Nick Charvat (FS), Sabrina Kuah (FS), Kulveer Brar (FE), Juhwan Moon (FE), Mandeep Dhillon (FE)

## Overview

RobDemGood is a mock trading app written in React Native using Expo. It uses Firebase for authentication, FinnHub.io for trading data, Express and MongoDB.  The app utilizes RESTful API routes to connect to the server.

#### Features: 
Users are able to: 
- login/register 
- search for a stock symbol
- view stock's history 
- buy or sell a stock
- add a stock to their watchlist
- monitor portofolio's market value and profits/losses
- platform-specific navigation: bottom tabs for iOS devices and drawer navigation for Android devices.

This project was completed remotely over five days. Our team simulated an Agile workflow by discussing milestones and holding daily standups. Tools we used for productivity include: Git, Kanban project board, Slack and Zoom.

## Prototype

We used Figma and a TradeStation template for UI inspiration.
[See Prototype](https://www.figma.com/file/oWG4Xe5xQUsB3ZkyS0pqDH/RobDemGood?node-id=0%3A1)

## Installation Instructions

Clone this repo and run `npm install`.  
Replace API keys within the .envSAMPLE. You will need to register for Firebase and Finnhub.io accounts.
Run the server.js file `node server.js`
Ensure you have Expo installed then run `npm start` in the command line

<img src="/screenshots/robdemgood-1.gif" alt="screenshot of robdemgood" width="200" align="left">
<img src="/screenshots/robdemgood-2.gif" alt="screenshot of robdemgood" width="200" align="left">
<img src="/screenshots/robdemgood-3.gif" alt="screenshot of robdemgood" width="200" align="left">
[figure 1.] User is able to see their portfolio statistics and view the items in their portfolio <br/>
[figure 2.] User is able to search for a stock symbol and add it to their watchlist <br/>
[figure 3.] User is able to login/logout
