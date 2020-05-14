# System-Design--BestBuy


> Production level scaling of a bestbuy mockup (navbar/database)


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#InstallingDependencies)

## Usage

> This is a progject to practice scaling a legacy codebase to production levels 10,000,000 data points (up from 100). For this project I compared speeds between MongoDB, MongooseORM, and PostgreSQL. I then opimized it with NginX loadbalancer on 5 EC2 instances.

## Requirements

- MongoDB
- PostgreSQL


### Installing Dependencies

From within the root directory:

1. run "npm install"

2A. run "npm seedP" to generate 10mil data points, seed the postgres database, and index the database

2B. run "npm seedM" to generate 10mil data points, seed the mongo database, and index the database
- to use the mongoDB routes, Lines 10 & Lines 70-78 must be uncommented in the server/index.js file
- also, comment out Line 11 & Lines 27-63
- I suggest just using postgreSQL as it was the most optimized database

3. run "npm start"

TESTING
After doing the install and running the seeding script:

run "npm test" to test the data seeding and speed of the postgres database

- to test for mongoDB, remove the "x"'s on the describe blocks in mongoDB.test.js

