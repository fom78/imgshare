const mongoose = require("mongoose");

const { database } = require("../keys");

mongoose
  .connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('db Conectada! '+ database.DB_NAME))
  .catch((err) => console.log(err));