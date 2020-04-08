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
const colors = require('colors');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'BB';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });


let searchString = async (str) => {
    // Use connect method to connect to the Server
    try {
        await client.connect();
        // assert.equal(null, err);
        console.log("CONNECTION: Opened".yellow);

        const db = client.db(dbName);

        const start = process.hrtime.bigint();
        let data = await db.collection('navbar').find({ name: { "$regex": '^' + str, "$options": "i" } }).limit(1).toArray()
        let anObject = data[0]
        const end = process.hrtime.bigint();
        const rawTime = Number((parseInt(end - start) / 6000000).toFixed(2));
        console.log(`${rawTime} milliseconds`.cyan);

        return anObject
    } catch (err) {
        console.log(err)
    } finally {
        // await client.close();
        console.log('CONNECTION: Closed'.green)
    }
}

module.exports = { searchString };



// const searchString = str => model.find({ name: { "$regex": '^'+str, "$options": "i" } })
// const searchRelated = str => model.find({ name: { "$regex": str, "$options": "i" } }).limit(5)
// const getAllItems = () => model.find();

// module.exports = {
//     searchString,
//     getAllItems,
//     searchRelated
// }

// module.exports = client;