
// // Timer Start
// const start = process.hrtime.bigint();

// const fs = require("fs");
// const { Pool, Client } = require("pg");
// const fastcsv = require("fast-csv");
// const colors = require('colors');
// const path = require('path')
// const copyFrom = require('pg-copy-streams').from;

// const pool = new Pool({
//     host: "localhost",
//     user: "postgres",
//     database: "bb",
//     password: "password",
//     port: 5432
// });

// // const query = "INSERT INTO category (id, name, image, console, rating) VALUES ($1, $2, $3, $4, $5)";

// const location = path.join(__dirname, '../../seedData.csv');

// pool.connect(function (err, client, done) {
//     if (err) {
//         console.error(err);
//         throw err;
//     } else {
//         var stream = client.query(copyFrom('COPY data (data) FROM STDIN;'));
//         var fileStream = fs.createReadStream(location);
//         fileStream.on('error', done);
//         stream.on('error', done);
//         stream.on('end', () => {
//             // Timer End
//             const end = process.hrtime.bigint();

//             //prettier-ignore
//             console.log(`Base set of data created in: ${(parseInt(end - start, 10) / 1e9).toFixed(2)} seconds!`);
//         });
//         stream.on('end', done);
//         fileStream.pipe(stream);
//     }
// });

// Timer Start
// const start = process.hrtime.bigint();

// const fs = require('fs');
// const path = require('path');

// const { Pool, Client } = require('pg');
// const copyFrom = require('pg-copy-streams').from;

// const pool = new Pool({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'bb'
// });

// const location = path.join(__dirname, '../../seedData.csv');

// pool.connect(function (err, client, done) {
//     if (err) {
//         console.error(err);
//         throw err;
//     } else {
//         var stream = client.query(copyFrom('COPY data (data) FROM STDIN;'));
//         var fileStream = fs.createReadStream(location);
//         fileStream.on('error', done);
//         stream.on('error', done);
//         stream.on('end', () => {
//             // Timer End
//             const end = process.hrtime.bigint();

//             //prettier-ignore
//             console.log(`Base set of data created in: ${(parseInt(end - start, 10) / 1e9).toFixed(2)} seconds!`);
//         });
//         stream.on('end', done);
//         fileStream.pipe(stream);
//     }
// });

var fs = require('fs');
var { Pool } = require('pg');
var copyFrom = require('pg-copy-streams').from;

const pool = new Pool({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'bb'
});

pool.connect(function (err, client, done) {
    var stream = client.query(copyFrom('COPY my_table FROM STDIN'));
    var fileStream = fs.createReadStream('../../seedData.csv')
    fileStream.on('error', done);
    stream.on('error', done);
    stream.on('end', done);
    fileStream.pipe(stream);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////// IMPORT AND DEFINE GLOBAL VARIABLES

// // Import required modules
// const fs = require('fs')
// const path = require('path')
// const { Pool, Client } = require('pg')
// const copyFrom = require('pg-copy-streams').from
// const config = require('./config.json')

// // inputfile & target table
// var inputFile = path.join(__dirname, '/data/customer.csv')
// var table = 'usermanaged.customers'

// // Getting connectin parameters from config.json
// const host = config.host
// const user = config.user
// const pw = config.pw
// const db = config.db
// const port = config.port
// const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

// //////////////////////////////////////////////////// LOAD TABLE

// // Connecting to Database
// const client = new Client({
//     connectionString: conString,
// })
// client.connect()
// // Execute Copy Function
// var stream = client.query(copyFrom(`COPY ${targetTable} FROM CSV HEADER STDIN`))
// var fileStream = fs.createReadStream(inputFile)

// fileStream.on('error', (error) => {
//     console.log(`Error in reading file: ${error}`)
// })
// stream.on('error', (error) => {
//     console.log(`Error in copy command: ${error}`)
// })
// stream.on('end', () => {
//     console.log(`Completed loading data into ${targetTable}`)
//     client.end()
// })
// fileStream.pipe(stream);

// //////////////////////////////////////////////////// TRUCATE TABLE

// // Connecting to Database
// const client = new Client({
//     connectionString: conString,
// })
// client.connect()

// // Execute Truncate Table
// client.query(`Truncate ${targetTable}`, (err) => {
//     if (err) {
//         client.end()
//         // return console.log(err.stack)
//         return console.log(`Error in truncate table ${err}`)
//         process.exit(1)
//     } else {
//         console.log(`Truncated ${targetTable}`)
//     }
// })


// ////////////////////////////////////////////////////  TRUNCATE AND <LOAD></LOAD>

// // Connecting to Database
// const client = new Client({
//     connectionString: conString,
// })

// client.connect()

// const executeQuery = (targetTable) => {
//     const execute = (target, callback) => {
//         client.query(`Truncate ${target}`, (err) => {
//             if (err) {
//                 client.end()
//                 callback(err)
//                 // return console.log(err.stack)
//             } else {
//                 console.log(`Truncated ${target}`)
//                 callback(null, target)
//             }
//         })
//     }
//     execute(targetTable, (err) => {
//         if (err) return console.log(`Error in Truncate Table: ${err}`)
//         var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN`))
//         var fileStream = fs.createReadStream(inputFile)

//         fileStream.on('error', (error) => {
//             console.log(`Error in creating read stream ${error}`)
//         })
//         stream.on('error', (error) => {
//             console.log(`Error in creating stream ${error}`)
//         })
//         stream.on('end', () => {
//             console.log(`Completed loading data into ${targetTable}`)
//             client.end()
//         })
//         fileStream.pipe(stream);
//     })
// }
// // Execute the function
// executeQuery(table)