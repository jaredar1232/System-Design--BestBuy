/////////////////////////////////////////////////////////////////////////////////////
// ORIGINAL MONGOOSE LEGACY DATABASE
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
const fs = require('fs');
const colors = require('colors');

let db

// Create a new MongoClient
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true })
// Connect mongo client
client.connect((err, client) => {
    if (err) { console.error(err) }
    db = client.db('BB') // once connected, assign the connection to the global variable 
});

// query database for a name
let searchString = async (str) => {
    ////////////// delete old timing file //////////////
    try {
        fs.unlinkSync('TimingData/searchStringTiming.txt');
    } catch (err) {
        console.log(err)
    }

    // Use connect method to connect to the Server
    try {
        const start = process.hrtime.bigint();
        let data = await db.collection('navbar').find({ name: { "$regex": '^' + str, "$options": "i" } }).limit(1).toArray()
        // let anObject = data
        const end = process.hrtime.bigint();
        const rawTime = Number((parseInt(end - start) / 6000000).toFixed(2));
        // console.log(`${rawTime} milliseconds`.cyan);

        // write a timing file to be used for tests
        try {
            fs.writeFileSync('TimingData/searchStringTiming.txt', `${rawTime}`);
        } catch (err) {
            console.log(err);
        }

        return data

    } catch (err) {
        console.log(err)
    }
}

// query database for an id
let searchId = async (num) => {
    ////////////// delete old timing file //////////////
    try {
        fs.unlinkSync('TimingData/searchIdTiming.txt');
    } catch (err) {
        console.log('No Timing Data To Clear')
    }

    // Use connect method to connect to the Server
    try {
        const start = process.hrtime.bigint();
        let data = await db.collection('navbar').find({ id: num }).limit(1).toArray()
        // let anObject = data
        const end = process.hrtime.bigint();
        const rawTime = Number((parseInt(end - start) / 6000000).toFixed(2));
        // console.log(`${rawTime} milliseconds`.cyan);

        // write a timing file to be used for tests
        try {
            fs.writeFileSync('TimingData/searchIdTiming.txt', `${rawTime}`);
        } catch (err) {
            console.log(err);
        }

        return data

    } catch (err) {
        console.log(err)
    }
}

module.exports = { searchString, searchId };