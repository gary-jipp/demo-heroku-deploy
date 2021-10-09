const { Pool } = require("pg");

let dbConfig = {};
if (process.env.DATABASE_URL) {
  dbConfig.connectionString = process.env.DATABASE_URL;
  dbConfig.ssl = { rejectUnauthorized: false };
} else {
  dbConfig = {
    user: process.env.DB_USER || "vagrant",
    password: process.env.DB_PASS || "123",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "loan-payment",
    port: process.env.DB_PORT || 5432,
    ssl: {
      rejectUnauthorized: false
    }
  };
}

console.log(dbConfig);
const pool = new Pool(dbConfig);

const paymentsQuery =
  "select p.id id, TO_CHAR(date,'YYYY-mm-dd') date, amount, rate, name \
  from payments p, accounts a \
  where p.account_id=a.id and a.uid=$1 \
  order by date, amount";

const getPayments = function (uid) {
  return pool.query(paymentsQuery, [uid]);
};

module.exports = { getPayments, pool };