/////////////////////////////////////////////////////////////////////////////////////
// MONGOOSE DATABASE
/////////////////////////////////////////////////////////////////////////////////////
// const mongoose = require('mongoose');
// const Schema = require('./schema.js');

// mongoose.connect('mongodb://localhost/bestbuysearch', {
//     useNewUrlParser: true
//     // useUnifiedTopology: true,
// });

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("Connected to MongoDB database");
// });


// let model = mongoose.model('navbarItems', Schema)


// module.exports = { model, db };


/////////////////////////////////////////////////////////////////////////////////////
// MONGO DATABASE
/////////////////////////////////////////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const exec = require('child_process').exec;
const fs = require('fs');
const colors = require('colors');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'BB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

const insertDocuments = function (db, callback) {
    console.log('COLLECTION: Importing...'.yellow)
    const start = process.hrtime.bigint();

    const cmd = 'mongoimport -d BB -c navbar --type csv --file seedData.csv --headerline --ignoreBlanks';

    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            console.log(error)
        } else {
            const end = process.hrtime.bigint();
            const rawTime = Number((parseInt(end - start, 10) / 60000000000).toFixed(3));
            const minutes = Math.floor(rawTime);
            const seconds = Math.floor((rawTime - minutes) * 60);
            const elapsedTime = minutes + Number((seconds / 100).toFixed(2));
            console.log('COLLECTION: Imported!'.green);
            console.log(`COLLECTION IMPORTATION: ${minutes} min, ${seconds} sec`.cyan);
            try {
                fs.writeFileSync('TimingData/importTiming.txt', `${elapsedTime}`);
            } catch (err) {
                console.log(err);
            }
        }
    });
}


// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected To Server".green);

    const db = client.db(dbName);

    // drops previous database before building new one
    db.collection("navbar").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log(" COLLECTION: Cleared ".bgWhite.black);

        // inserts CSV into database
        insertDocuments(db, function () {
            client.close();
        });
    });
});