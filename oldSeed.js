// NOT CURRENTLY USING THESE METHODS. SEE GENERATEDATA.JS FOR CURRENT METHOD

const fs = require('fs');
const { db } = require('./server/db/index.js')
const faker = require('faker')

/////////////////////////////////////////////////////////////////////////////////////////////
// Generate a dataset then query it in over and over again to 10mil. takes around 2 min. 
/////////////////////////////////////////////////////////////////////////////////////////////
const upperLimit = 1000;

let generator = () => {
    return new Promise((resolve, reject) => fs.readFile("NamesData.txt", (err, data) => {
        if (err) {
            reject(err);
        } else {
            const gamesArrayRaw = data.toString().split(',1789,');
            var gamesArray = [];

            for (let x = 0; x < gamesArrayRaw.length; x++) {
                let console = "Xbox One";
                const num = (x / 3) % 3;
                const rating = (Math.random() * (4 - 3 + 1)) + 3;
                const randomImg = Math.floor(Math.random() * 10);

                if (num === 0) {
                    console = "Xbox One";
                } else if (num === 1) {
                    console = "PlayStation 4";
                } else if (num === 2) {
                    console = "Nintendo Switch";
                }

                if (gamesArrayRaw[x] !== '') {
                    gamesArray.push({
                        console,
                        rating: rating.toFixed(1),
                        name: gamesArrayRaw[x],
                        image: `https://origin-master.s3-us-west-1.amazonaws.com/game_images/${randomImg}.jpg`,
                    });
                }
            }

            resolve(gamesArray);
        }
    }))
}

let writeFakeNames = () => {
    let arrayOfNames = []
    for (let i = 0; i < 10000; i++) {
        arrayOfNames.push(faker.company.companyName())
        arrayOfNames.push(1789)
    }
    fs.writeFileSync('NamesData.txt', `${arrayOfNames}`);
}

// writeFakeNames()

// write a function that records time data to a file
let readTimeData = () => fs.readFile("seedTiming.txt", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
        return data
    }
})


async function seed() {
    for (let i = 1; i <= upperLimit; i++) {
        const set = await generator();

        await db
            .collection('navbarItems')
            .insertMany(set)
            .then((success) => {
                if (i === upperLimit) {
                    const end = process.hrtime.bigint();
                    const elapsedTime = parseInt(end - start, 10) / 60000000000;
                    console.log(`-------------- Finish --------------`);
                    console.log(`${elapsedTime} minutes`);
                    fs.writeFileSync('seedTiming.txt', `${elapsedTime}`);
                }
            })
            .catch((err) => { });
    }
}

const start = process.hrtime.bigint();
writeFakeNames()
seed();


module.exports = readTimeData


// /////////////////////////////////////////////////////////////////////////////////////////////
// // Generate data as I go method. slow. 4min per mil
// /////////////////////////////////////////////////////////////////////////////////////////////
// let consoleArray = ['Xbox One', 'Playstation 4', 'Nintendo Switch', 'GameCube', 'GameBoy']

// const fakeDataFunc = () => {
//     return new Promise((resolve) =>
//         setTimeout(() => {
//             resolve({
//                 console: consoleArray[Math.round(Math.random() * 4)],
//                 rating: (Math.round(Math.random * 5)),
//                 name: faker.company.companyName(),
//                 image: faker.image.cats()
//             })
//         }, 0)
//     )
// }

// async function seed() {
//     for (let i = 1; i <= upperLimit; i++) {
//         // const set = await generator();
//         const set = await Promise.all([
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc(),
//             fakeDataFunc()
//         ])


//         // let flatSet = set.flat()
//         // console.log(set)
//         await db
//             .collection('navbarItems')
//             .insertMany(set)
//             .then((success) => {
//                 if (i === upperLimit) {
//                     const end = process.hrtime.bigint();
//                     const elapsedTime = parseInt(end - start, 10) / 60000000000;
//                     console.log(`-------------- Finish --------------`);
//                     console.log(`${elapsedTime} minutes`);
//                 }
//             })
//             .catch((err) => { });
//     }
// }

// const start = process.hrtime.bigint();
// seed();