const { Client } = require('pg')
const colors = require('colors')

///////////////////////////////////////////////////////////////////////
// drop old database if exists
///////////////////////////////////////////////////////////////////////

// define template database client
const client = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'template1'
})
// connect to template client
client.connect()

// define drop database function
let dropDB = async () => {
    try {
        await client.query(`UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'bb';`)
        await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'bb';`)
        await client.query(`DROP DATABASE IF EXISTS bb;`)
    } catch (err) {
        console.log(err)
    } finally {
        console.log(' DATABASE: Dropped '.bgWhite.black)
        client.end()
    }
}

///////////////////////////////////////////////////////////////////////
// setup new database and table
///////////////////////////////////////////////////////////////////////

// define general database client
const client1 = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: ''
})

// define new bestbuy(bb) database client
const client2 = new Client({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'bb'
})

// create database and table function
let setUpDB = async () => {
    // create database while connected to general DB
    try {
        // connect to general database
        client1.connect();
        await client1.query('CREATE DATABASE bb;')
        console.log('DATABASE: Created!'.green)
    } catch (err) {
        console.log(err)
    } finally {
        // close connection to general DB
        client1.end()
    }

    // create table in new bestbuy(bb) database
    try {
        // connect to new bestbuy(bb) database
        client2.connect();
        await client2.query(`CREATE TABLE IF NOT EXISTS navbar(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    image VARCHAR(100),
    console VARCHAR(20),
    rating INT        
);`)
        console.log('TABLE: Created!'.green)
    } catch (err) {
        console.log(err)
    } finally {
        // close connection to new bestbuy(bb) database
        await client2.end()
    }
}

///////////////////////////////////////////////////////////////////////
// Run the drop database and setupDB functions
///////////////////////////////////////////////////////////////////////
let dropAndBuildDatabase = async () => {
    await dropDB()
    await setUpDB()
}

dropAndBuildDatabase()
