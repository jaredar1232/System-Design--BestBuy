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



client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected To Server".green);

    const db = client.db(dbName);

    db.dropDatabase(() => {
        console.log(' COLLECTION: Cleared '.bgWhite.black)
        console.log('COLLECTION: Importing...'.yellow)

        // start timer
        const start = process.hrtime.bigint();

        // define csv import command 
        const cmd = 'mongoimport -d BB -c navbar --type csv --file seedData.csv --headerline --ignoreBlanks';

        // execute csv import
        exec(cmd, function (error, stdout, stderr) {

            ////////////// delete old timing file //////////////
            try {
                fs.unlinkSync('TimingData/importTiming.txt');
            } catch (err) {
                console.log(err)
            }
            try {
                if (error) {
                    console.log(error)
                } else {
                    client.close();
                    // end and record timer
                    const end = process.hrtime.bigint();
                    const rawTime = Number((parseInt(end - start) / 60000000000).toFixed(3));
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
            } catch (err) {
                console.log(err)
            }
        });
    });
});


