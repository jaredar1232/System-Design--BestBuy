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
        console.log(`${rawTime} milliseconds`.cyan);

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
        console.log(`${rawTime} milliseconds`.cyan);

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

// let seedData = async () => {

//     try {
//         db.dropDatabase(() => {
//             console.log(' COLLECTION: Cleared '.bgWhite.black)
//             console.log('COLLECTION: Importing...'.yellow)

//             // start timer
//             const start = process.hrtime.bigint();

//             // define csv import command 
//             const cmd = 'mongoimport -d BB -c navbar --type csv --file seedData.csv --headerline --ignoreBlanks';

//             // execute csv import
//             exec(cmd, function (error, stdout, stderr) {

//                 ////////////// delete old timing file //////////////
//                 try {
//                     fs.unlinkSync('TimingData/importTiming.txt');
//                 } catch (err) {
//                     console.log(err)
//                 }
//                 try {
//                     if (error) {
//                         console.log(error)
//                     } else {
//                         client.close();
//                         // end and record timer
//                         const end = process.hrtime.bigint();
//                         const rawTime = Number((parseInt(end - start) / 60000000000).toFixed(3));
//                         const minutes = Math.floor(rawTime);
//                         const seconds = Math.floor((rawTime - minutes) * 60);
//                         const elapsedTime = minutes + Number((seconds / 100).toFixed(2));
//                         console.log('COLLECTION: Imported!'.green);
//                         console.log(`COLLECTION IMPORTATION: ${minutes} min, ${seconds} sec`.cyan);
//                         try {
//                             fs.writeFileSync('TimingData/importTiming.txt', `${elapsedTime}`);
//                         } catch (err) {
//                             console.log(err);
//                         }
//                     }
//                 } catch (err) {
//                     console.log(err)
//                 }
//             });
//         });
//     } catch (err) {
//         console.log(err)
//     }

// }


module.exports = { searchString, searchId };



// const searchString = str => model.find({ name: { "$regex": '^'+str, "$options": "i" } })
// const searchRelated = str => model.find({ name: { "$regex": str, "$options": "i" } }).limit(5)
// const getAllItems = () => model.find();

// module.exports = {
//     searchString,
//     getAllItems,
//     searchRelated
// }

// module.exports = client;