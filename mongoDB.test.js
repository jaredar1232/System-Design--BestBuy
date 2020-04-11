const fs = require('fs');
const db = require('./MongoDB/db/index.js');

describe('Generator and Seed Performance', () => {
    test('generator timing has been recorded', async () => {
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/generateTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(data).toBeTruthy();
    })

    test('import timing has been recorded', async () => {
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/importTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(data).toBeTruthy();
    })
})

describe('MongoDB Query Performance', () => {

    test('query returns a value', async () => {
        const data = await db.searchString('Vada')
        expect(data).toBeTruthy();
    })

    test('query in under 10 miliseconds', async () => {
        await db.searchString('Vada') // appears that above 8 million I break something, need to index
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/searchStringTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(Number(data)).toBeLessThan(10);
    })

    test('query the last 10% of DB in under 10 milliseconds', async () => {
        let randomNum = Math.floor((Math.random() * 1000000) + 9000000)
        await db.searchId(randomNum) // appears that above 8 million I break something, need to index
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/searchIdTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(Number(data)).toBeLessThan(10);
    })

    test('query the last 10% of DB in under 5 milliseconds', async () => {
        let randomNum = Math.floor((Math.random() * 1000000) + 9000000)
        await db.searchId(randomNum) // appears that above 8 million I break something, need to index
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/searchIdTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(Number(data)).toBeLessThan(5);
    })

    test('query the last 10% of DB in under 1 millisecond', async () => {
        let randomNum = Math.floor((Math.random() * 1000000) + 9000000)
        await db.searchId(randomNum) // appears that above 8 million I break something, need to index
        const readTimeData = () => {
            return new Promise((resolve, reject) => fs.readFile('TimingData/searchIdTiming.txt', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            }))
        }
        const data = await readTimeData();
        expect(Number(data)).toBeLessThan(1);
    })
})


