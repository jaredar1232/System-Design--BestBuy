const fs = require('fs');

describe('test time records', () => {
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


