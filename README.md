# Accrue Annuity Web App

### Overview
This app is a proof of concept fixed-income product using js React & Redux. The MVP for this product will be simple, sending money from Bob's wallet to a time-locked contract that will unlock at a time specified by Bob. Bob will be able to interact with the contract by expanding his interest-bearing position at the buy-in period and receiving fixed-income payments when the contract unlocks during the pay-out period.

The dashboard displays are pertinent information relating to Bob's investment including accrue target and goal, current reward % offered, next payout amount & date, how much total payout is remaining, etc.  The user will find the app easy to use, have all information needed while only providing a few focused areas to engage the contract. This idea was an inspiration from various blockchain products that have been offering "staking" or vesting periods.

### Features
User Login: Users will create an account and log in to the application. Each user will have a unique, private account page.

Goal Setting: Users will be able to set a number value as a goal to save up to and give a name to that goal.

Specify Contract Specs: User will be able to specify how much is to be vested and for how long. User will specify payout date and amount. Reward is calculated from length of investment.

Lock-in Money: The user will have the ability to send money to be vested for a user-specified time period.

Recieve Money: The user will recieve their payout routinely until funds are exhausted from the contract.


Dependencies

yarn add
xios@0.19.2
bootstrap@4.4.1
history@4.10.1
jwt-decode@2.2.0
lodash@4.17.15
moment@2.25.3
node-sass@5.0.0
react-bootstrap@1.0.1
react-redux@7.2.0
react-router-dom@5.1.2
redux@4.0.5
redux-thunk@2.3.0

Server Dependencies

yarn add 
axios@0.19.2 
bcryptjs@2.4.3 
cors@2.8.5 
dotenv@8.2.0 
express@4.17.1 
jsonwebtoken@8.5.1 
moment@2.25.3 
pg@8.0.3 
nodemon@2.0.4

On Windows - fsevents

Since fsevent is an optional dependency, the workaround is to run npm install with no-optional flag.

npm install --no-optional
