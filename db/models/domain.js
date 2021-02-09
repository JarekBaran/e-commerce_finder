const mongoose = require("mongoose");

const Domain = mongoose.model("Domain", {
  domain: String,
  stack: String,
  word: String,
});

module.export = Domain;