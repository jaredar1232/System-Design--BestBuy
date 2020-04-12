const fs = require('fs');
const faker = require('faker');
const colors = require('colors');

let generator = () => {

    ////////////// delete old seed file //////////////
    try {
        fs.unlinkSync('seedData.csv');
        fs.unlinkSync('TimingData/generateTiming.txt');
        console.log(' DATA: Cleared '.bgWhite.black);
    } catch (err) {
        console.log(' No Timing OR Seed Data To Clear '.bgWhite.black)
    }

    ////////////// start timer //////////////
    console.log('DATA: Generating...'.yellow)
    const start = process.hrtime.bigint();

    ////////////// build header line //////////////
    let fields = 'id,name,image,console,rating,\n'

    ////////////// write header line //////////////
    try {
        fs.appendFileSync("seedData.csv", `${fields}`);
    } catch (err) {
        console.log(err)
    }

    for (let i = 0; i < 10000000; i++) {
        ////////////// build fake data //////////////
        let console = "Xbox One";
        const num = (i / 3) % 3;
        if (num === 0) {
            console = "Xbox One";
        } else if (num === 1) {
            console = "PlayStation 4";
        } else if (num === 2) {
            console = "Nintendo Switch";
        }
        const rating = (Math.random() * (4 - 3 + 1)) + 3;
        const randomImg = Math.floor(Math.random() * 10);
        const name = faker.name.findName()

        ////////////// build data object //////////////
        let enter = i < 9999999 ? ',\n' : ''
        let gamesObj = `${i + 1},${name},https://origin-master.s3-us-west-1.amazonaws.com/game_images/${randomImg}.jpg ,${console},${rating.toFixed(1)}${enter}`

        ////////////// write data object //////////////
        try {
            fs.appendFileSync("seedData.csv", `${gamesObj}`);
        } catch (err) {
            console.log(err)
        }
    }
    ////////////// stop and record timer //////////////
    const end = process.hrtime.bigint();
    const rawTime = Number((parseInt(end - start) / 60000000000).toFixed(3));
    const minutes = Math.floor(rawTime);
    const seconds = Math.floor((rawTime - minutes) * 60);
    const elapsedTime = minutes + Number((seconds / 100).toFixed(2));
    console.log('DATA: Generated!'.green);
    console.log(`DATA GENERATION: ${minutes} min, ${seconds} sec`.cyan);
    try {
        fs.writeFileSync('TimingData/generateTiming.txt', `${elapsedTime}`);
    } catch (err) {
        console.log(err);
    }
}

// invoke generator
generator()

// fs.appendFileSync("seedData.csv", `${fields}`, function (err) {
//     if (err) throw err;
//     // console.log('IS WRITTEN')
// });

// fs.appendFileSync("seedData.csv", `${gamesObj}`, function (err) {
//     if (err) throw err;
// });




// const gamesArrayRaw = data.toString().split(',;,');
// var gamesArray = [];





// if (gamesArrayRaw[x] !== '') {
//     gamesArray.push({
//         console,
//         rating: rating.toFixed(1),
//         name: faker.company.companyName(),
//         image: `https://origin-master.s3-us-west-1.amazonaws.com/game_images/${randomImg}.jpg`,
//     });
// }
//             }
// resolve(gamesArray);
//         }
//     }))
// }

// let writeFakeNames = () => {
//     let arrayOfNames = []
//     for (let i = 0; i < 10000; i++) {
//         arrayOfNames.push()
//         arrayOfNames.push(';')
//     }
//     fs.writeFileSync('NamesData.csv', `${arrayOfNames}`);
// }
// fs.readFile("NamesData.csv", (err, data) => {
// write a function that records time data to a file
// let readTimeData = () => fs.readFile("seedTiming.txt", (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//         return data
//     }
// })


// async function seed() {
//     for (let i = 1; i <= upperLimit; i++) {
//         const set = await generator();

//         await db
//             .collection('navbarItems')
//             .insertMany(set)
//             .then((success) => {
//                 if (i === upperLimit) {
//                     const end = process.hrtime.bigint();
//                     const elapsedTime = parseInt(end - start, 10) / 60000000000;
//                     console.log(`-------------- Finish --------------`);
//                     console.log(`${elapsedTime} minutes`);
//                     fs.writeFileSync('seedTiming.txt', `${elapsedTime}`);
//                 }
//             })
//             .catch((err) => { });
//     }
// }

// const start = process.hrtime.bigint();
// writeFakeNames()

// seed();

// module.exports = readTimeData