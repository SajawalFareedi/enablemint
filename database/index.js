const connection = require("./DBConnection");
const fs = require('fs');


const createRequiredTables = () => {
    fs.readFile('./database/database.sql', 'utf8', function (err, data) {
        if (err) throw err;
        let queries = data.split('\r\n');

        for (let query in queries) {
            connection.query(queries[query], function (err, result) {
                if (err) throw err;
            });
        };

        console.log("Database tables are created!");
    });
}


module.exports = { createRequiredTables };