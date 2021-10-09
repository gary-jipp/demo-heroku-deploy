const moment = require("moment");

const getHistory = function(rows) {
  if (!rows.length) {
    return [];
  }

  let balance = 0;
  let prev = null;
  let lastRate = 0;
  let start = null;

  records = rows.map(row => {
    let paid = 0, loan = 0;
    if (row.amount > 0) {
      loan = row.amount;
    }
    else {
      paid = row.amount;
    }

    if (!prev) {
      prev = row.date;
    }
    const months = moment(row.date).diff(moment(prev), 'months', true);
    const interest = Math.round(balance * row.rate / 100 * months);

    const record = { id: row.id, date: row.date, prev, open: balance, name: row.name };
    balance += loan + interest + paid;

    if (!start || balance <= 0) {
      start = row.date;
    }

    prev = row.date;
    lastRate = row.rate;
    return { ...record, months, interest, loan, paid, balance, start };
  });

  // calculate interest and balance due today
  {
    const id = 999998;
    const now = moment().startOf('day');
    const date = now.format('YYYY-MM-DD');
    const months = now.diff(moment(prev), 'months', true);
    const interest = Math.round(balance * lastRate / 100 * months);
    const record = { id, date: "Today", prev, months, open: balance, interest, balance: balance + interest };
    records.push(record);
  }

  // Calculate interest and balance due on next due date
  {
    const id = 999999;
    const next = moment().startOf('day');
    const today = parseInt(next.format('DD'));
    const day = parseInt(moment(start).format('DD'));

    next.set('date', day);
    if (today > day) {
      next.add(1, "M");
    }

    const date = next.format('YYYY-MM-DD');
    const months = next.diff(moment(prev), 'months', true);
    const interest = Math.round(balance * lastRate / 100 * months);
    const record = { id, date: date, prev, months, open: balance, interest, balance: balance + interest };
    records.push(record);
  }

  return records;
};

module.exports = getHistory;