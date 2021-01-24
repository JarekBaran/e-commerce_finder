const mongoose = require("mongoose");

const Domain = mongoose.model("Domain", {
  host: String,
  tech: String,
  word: String,
});

module.export = Domain;