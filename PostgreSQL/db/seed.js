const fs = require('fs');
const path = require('path');
const copyFrom = require('pg-copy-streams').from;
const colors = require('colors')
const db = require('./index.js')

// define setup db function
let setupDB = async () => {
    try {
        await db.query('DROP TABLE IF EXISTS navbar;');
        console.log('TABLE: Dropped!'.yellow);

        await db.query(`CREATE TABLE IF NOT EXISTS navbar(
            id INT PRIMARY KEY,
            name VARCHAR(50),
            image VARCHAR(100),
            console VARCHAR(20),
            rating NUMERIC
        );`);
        console.log(`TABLE: Created!\n`.green);
    } catch (err) {
        console.error(err)
    }
};
///////////////////////////////////////
// start timer
const start = process.hrtime.bigint();
const location = path.join(__dirname, '../../seedData.csv');
// connect to pool and import data
let seedDB = async () => {
    db.connect(async (err, client, done) => {
        if (err) {
            console.error(err)
        } else {
            try {
                console.log('TABLE: Importing...'.yellow)
                var stream = client.query(copyFrom(`COPY navbar (id, name, image, console, rating) FROM STDIN ( FORMAT CSV, DELIMITER(',') , HEADER);`));
                var fileStream = fs.createReadStream(location);
                fileStream.on('error', done);
                stream.on('error', done);
                stream.on('end', () => {
                    // Stop timer
                    const end = process.hrtime.bigint();
                    console.log('TABLE: Imported!'.green)
                    console.log(`TABLE IMPORTATION: ${(parseInt(end - start, 10) / 1e9).toFixed(0)} sec`.cyan);
                });
                stream.on('end', () => {
                    try {
                        console.log('indexing db')
                        client.query(`CREATE INDEX navbar_id_index ON navbar (id);`)
                    } catch (err) {
                        console.error(err)
                    } finally {
                        console.log('index complete')
                    }
                });
                stream.on('end', done);
                fileStream.pipe(stream);
            } catch (err) {
                console.error(err.name, err.message)
            }
        }
    });
}

let seed = async () => {
    await setupDB()
    await seedDB()
}
seed()



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE BELOW METHOD CREATES ITS OWN CONNECTIONS, ABOVE IS REVISED TO USE THE INDEX FILE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// const fs = require('fs');
// const path = require('path');
// const { Pool, Client } = require('pg');
// const copyFrom = require('pg-copy-streams').from;
// const colors = require('colors')

// // define client
// const client = new Client({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// });

// // define setup db function
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
//         console.log(`CONNECTION: Closed!\n`.white);
//     }
// };
// // invoke db setup
// // setupDB()

// //////////////////////////////////////////////////////////////////////////////////////////

// // start timer
// const start = process.hrtime.bigint();
// const location = path.join(__dirname, '../../seedData.csv');

// // define pool connection
// const pool = new Pool({
//     user: 'postgres',
//     password: 'password',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// });

// // connect to pool and import data
// let seedDB = async () => {
//     pool.connect(async (err, client, done) => {
//         if (err) {
//             console.error(err)
//         } else {
//             try {
//                 console.log('TABLE: Importing...'.yellow)
//                 var stream = client.query(copyFrom(`COPY navbar (id, name, image, console, rating) FROM STDIN ( FORMAT CSV, DELIMITER(',') , HEADER);`));
//                 var fileStream = fs.createReadStream(location);
//                 fileStream.on('error', done);
//                 stream.on('error', done);
//                 stream.on('end', () => {
//                     // Stop timer
//                     const end = process.hrtime.bigint();
//                     console.log('TABLE: Imported!'.green)
//                     console.log(`TABLE IMPORTATION: ${(parseInt(end - start, 10) / 1e9).toFixed(0)} sec`.cyan);
//                 });
//                 stream.on('end', () => {
//                     try {
//                         console.log('indexing db')
//                         client.query(`CREATE INDEX navbar_id_index ON navbar (id);`)
//                     } catch (err) {
//                         console.error(err)
//                     } finally {
//                         console.log('index complete')
//                     }
//                 });
//                 stream.on('end', done);
//                 fileStream.pipe(stream);
//             } catch (err) {
//                 console.error(err.name, err.message)
//             }
//         }
//     });
// }

// let seed = async () => {
//     await setupDB()
//     await seedDB()
// }

// seed()