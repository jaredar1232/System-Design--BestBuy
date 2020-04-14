
// var { Pool, Client } = require('pg');
// const routerPG = require('express').Router();

// var client = new Client({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// });

// // review_index_0
// client.connect()

// try {
//     client.query(`CREATE INDEX navbar_id_index ON navbar (id);`)
//     console.log('INDEXING THE DB WORKED!')
// } catch (e) {
//     console.log(e)
//     console.log('SOMETHING WENT WRONG WITH TRYING TO INDEX THE DB')
// }