const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const Domain = require("./models/domain");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const addDomain = new Domain({
  host: "test.com",
  tech: "testowy",
  word: "testowe",
});

addDomain.save().then(() => console.log("Domain saved"));
