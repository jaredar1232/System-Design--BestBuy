const MongoClient = require('mongodb').MongoClient;
const exec = require('child_process').exec;
const fs = require('fs');
const colors = require('colors'); // not shown to be used, BUT BEING USED

// Create a new MongoClient
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

client.connect(function (err) {
    console.log("CONNECTION: Open\n".white);
    const db = client.db('BB');

    // drop database and then import new data on callback
    db.dropDatabase(() => {
        console.log(' COLLECTION: Cleared '.bgWhite.black)
        console.log('COLLECTION: Importing...'.yellow)

        // start timer
        const start = process.hrtime.bigint();

        // define csv import command 
        const cmd = 'mongoimport -d BB -c navbar --type csv --file seedData.csv --headerline --ignoreBlanks --maintainInsertionOrder';

        // execute csv import
        exec(cmd, function (error, stdout, stderr) {

            ////////////// delete old timing file //////////////
            try {
                fs.unlinkSync('TimingData/importTiming.txt');
            } catch (err) {
                console.log(' No Timing Data To Clear '.bgWhite.black)
            }

            try {
                if (error) {
                    console.log(error)
                } else {
                    // end and record timer
                    const end = process.hrtime.bigint();
                    const rawTime = Number((parseInt(end - start) / 60000000000).toFixed(3));
                    const minutes = Math.floor(rawTime);
                    const seconds = Math.floor((rawTime - minutes) * 60);
                    const elapsedTime = minutes + Number((seconds / 100).toFixed(2));
                    console.log('COLLECTION: Imported!'.green);
                    console.log(`COLLECTION IMPORTATION: ${minutes} min, ${seconds} sec\n`.cyan);

                    // write a file with timing data to be used in later testing
                    try {
                        fs.writeFileSync('TimingData/importTiming.txt', `${elapsedTime}`);
                    } catch (err) {
                        console.log(err);
                    }
                }

            } catch (err) {
                console.log(err)
            } finally {
                // index database
                console.log('COLLECTION: Indexing...'.yellow)
                db.collection('navbar').createIndex({ id: -1 })
            }

            try {
                // close connection and console long data
                console.log('COLLECTION: Indexing Complete'.green)
                client.close();
                console.log('\nCONNECTION: Closed'.white)
            } catch (err) {
                console.log(err)
            }

        });
    });
});