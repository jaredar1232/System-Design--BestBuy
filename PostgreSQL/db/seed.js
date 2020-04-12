const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const colors = require('colors');


let stream = fs.createReadStream('seedData.csv');
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        // remove the first line: header
        csvData.shift();
        console.log('running')
        // create a new connection to the database
        const pool = new Pool({
            host: "localhost",
            user: "postgres",
            database: "BB",
            password: "password",
            port: 5432
        });

        // try {
        //     pool.query('DROP TABLE IF EXISTS reviews;');
        //     console.log('DROPPED TABLE'.green)
        // } catch (e) {
        //     console.log(e, 'FAILLED DROPPING OF TABLE')
        // }





        const query =
            "INSERT INTO category (name, image, rating, id) VALUES ($1, $2, $3, $4)";

        pool.connect((err, client, done) => {
            if (err) throw err;

            try {
                csvData.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("inserted " + res.rowCount + " row:", row);
                        }
                    });
                });
            } finally {
                done();
            }
        });
    });