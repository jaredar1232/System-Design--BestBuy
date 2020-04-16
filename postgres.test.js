const db = require('./PostgreSQL/db/index.js');

describe('Postgres Query Performance', () => {

    test('query the last 10% of DB in under 2 milliseconds', async () => {
        let pickId = Math.floor((Math.random() * 1000000) + 9000000)
        let warmUpQuery = await db.query(`SELECT * FROM navbar WHERE id = '${pickId}';`)
        let data = await db.query(`EXPLAIN ANALYZE SELECT * FROM navbar WHERE id = '${pickId}';`)
        let formatData1 = Number(data.rows[3]['QUERY PLAN'].slice(15, 20))
        let formatData2 = Number(data.rows[2]['QUERY PLAN'].slice(16, 20))
        let totalTime = formatData1 + formatData2
        console.log(formatData1 + formatData2, 'miliseconds')
        expect(totalTime).toBeLessThan(2);
    })
})


