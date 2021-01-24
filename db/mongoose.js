const mongoose = require("mongoose");

const Domain = require("./models/domain");

mongoose.connect("mongodb://", {
  useNewUrlparser: true,
  useUnifiedTopology: true,
});

const addDomain = new Domain({
  host: "test.com",
  tech: "testowy",
  word: "testowe",
});

addDomain.save().then(() => console.log("Domain saved"));
