const fs = require('fs');
const db = require('./PostgreSQL/db/index.js');

describe('Postgres Query Performance', () => {



    test('query the last 10% of DB in under 10 milliseconds', async () => {
        let pickId = Math.floor((Math.random() * 1000000) + 9000000)
        let queryTimeObj = await db.query(`EXPLAIN ANALYZE
        SELECT * FROM navbar WHERE id = '${pickId}';`)
        await db.end();
        // const data = await readTimeData();
        let queryTime = Number(queryTimeObj.rows[3]['QUERY PLAN'].slice(16, 21))
        console.log(queryTime)
        console.log(queryTimeObj.rows[3]['QUERY PLAN'])
        expect(Number(queryTime)).toBeLessThan(1);
    })


})


