const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data.json');

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({
    experts: [],
    bookings: []
  }));
}

const getDb = () => {
  return JSON.parse(fs.readFileSync(dbPath));
};

const saveDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { getDb, saveDb };