var { Pool, Client } = require("pg");

colors = require("colors");

var db = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

db.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("DATABASE: Connected!".green);
  }
});

module.exports = db;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// MIGRATED THIS SETUP TO SEED ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const { Client } = require('pg');
// const colors = require('colors')

// const client = new Client({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// });

// let setupDB = async () => {
//     try {
//         await client.connect();
//         console.log('CONNECTION: Open! \n'.white);

//         await client.query('DROP TABLE IF EXISTS navbar;');
//         console.log('TABLE: Dropped!'.yellow);

//         await client.query(`CREATE TABLE IF NOT EXISTS navbar(
//             id INT PRIMARY KEY,
//             name VARCHAR(50),
//             image VARCHAR(100),
//             console VARCHAR(20),
//             rating NUMERIC
//         );`);
//         console.log(`TABLE: Created!\n`.green);
//     } catch (err) {
//         await client.end();
//         console.error(err)
//     } finally {
//         await client.end();
//         console.log('CONNECTION: Closed!'.white);
//     }
// };
// setupDB()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// CODE PLAYING AROUND WITH FULL DATABASE DROPS ////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const { Client } = require('pg')
// const colors = require('colors')

// ///////////////////////////////////////////////////////////////////////
// // drop old database if exists
// ///////////////////////////////////////////////////////////////////////

// // define generic database client
// const setupClient = new Client({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// })
// // connect to generic client
// setupClient.connect()

// // define drop database function
// let dropDB = async () => {
//     try {
//         await setupClient.query(`UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'bb';`)
//         await setupClient.query(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'bb';`)
//         await setupClient.query(`DROP DATABASE IF EXISTS bb;`)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         console.log(' DATABASE: Dropped '.bgWhite.black)
//     }
// }

// ///////////////////////////////////////////////////////////////////////
// // setup new database and table
// ///////////////////////////////////////////////////////////////////////

// // define new bestbuy(bb) database client
// const client = new Client({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'bb'
// })

// // create database and table function
// let setUpDB = async () => {
//     // create database while connected to general DB
//     try {
//         // connect to general database
//         await setupClient.query('CREATE DATABASE bb;')
//         console.log('DATABASE: Created!'.green)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         // close connection to general DB
//         setupClient.end()
//     }

//     // create table in new bestbuy(bb) database
//     try {
//         // connect to new bestbuy(bb) database
//         client.connect();
//         await client.query(`CREATE TABLE IF NOT EXISTS navbar(
//             table_key SERIAL PRIMARY KEY,
//             id INT,
//             name VARCHAR(50),
//             image VARCHAR(100),
//             console VARCHAR(20),
//             rating NUMeric
//         );`)
//         console.log('TABLE: Created!'.green)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         // close connection to new bestbuy(bb) database
//         await client.end()
//     }
// }

// ///////////////////////////////////////////////////////////////////////
// // Run the drop database and setupDB functions
// ///////////////////////////////////////////////////////////////////////
// let dropAndBuildDatabase = async () => {
//     await dropDB()
//     await setUpDB()
// }

// dropAndBuildDatabase()
