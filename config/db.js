// mongodb+srv://reddyvaritejeshkumarreddy:tejareddy9133@cluster0.hjmfg2a.mongodb.net/
const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://reddyvaritejeshkumarreddy:tejareddy9133@cluster0.hjmfg2a.mongodb.net/"
);

module.exports = {
  connection,
};
