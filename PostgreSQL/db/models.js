const db = require('./index.js')

module.exports = {
    searchId: (id) => {
        return db.query(`SELECT * FROM navbar WHERE id = '${id}' LIMIT 1;`)
    },
    searchString: (str) => {
        return db.query(`SELECT * FROM navbar WHERE name LIKE '${str}%' LIMIT 1;`)
    },
    searchRelated: (str) => {
        return db.query(`SELECT * FROM navbar WHERE name LIKE '${str}%' LIMIT 5;`)
    },
    getAllItems: () => {
        return db.query(`SELECT * FROM navbar LIMIT 20;`)
    },
    testQuery: (id) => {
        return db.query(`EXPLAIN ANALYZE SELECT * FROM navbar WHERE id = '${id}' LIMIT 1;`)
    }
}

