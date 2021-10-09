require('dotenv').config();
const express = require("express");

const { getPayments } = require("./db.js");
const getHistory = require("./history.js");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// serve static files in ../build
const public = path.join(__dirname, '..', 'public');
console.log(public);
app.use(express.static(public));

app.get("/api/payments/:uid", (req, res) => {
  getPayments(req.params.uid)
    .then(r => {
      res.json(getHistory(r.rows));
    })
    .catch(e => console.log(e));
});

app.get("/api/status", (req, res) => {
  res.json({ version: "1.01" });
});

app.use(function(req, res) {
  res.status(404);
});


app.listen(PORT, () => {
  console.log(`Payment API started on port ${PORT}!`);
});