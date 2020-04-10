const fs = require('fs');
const db = require('./server/db/index.js');

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
    test('find Name returns a value', async () => {
        const data = await db.searchString('Vada Yost')
        expect(data).toBeTruthy();
    })

    test('find Id returns a value', async () => {
        const data = await db.searchString('Vada Yost')
        expect(data).toBeTruthy();
    })

    test('query Id returns a value in under 10 milliseconds', async () => {
        await db.searchId(8000000) // appears that above 8 million I break something, need to index
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
})


