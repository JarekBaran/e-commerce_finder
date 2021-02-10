const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const Domain = mongoose.model("Domain", {
  host: String,
  stack: [String],
  word: String,
});

const getDomains = async () => {

  try {

    const domains = await Domain.find({});

    console.table(domains);

  } catch (error) {

      console.error(error);

    return;

  }
}

const addDomain = async (data) => {

  try {

    const domain = new Domain(data);

    await domain.save();

    console.log(`Dodano: ${domain.host} - ${domain.stack}`)

  } catch (error) {

      console.error(error);

    return;

  }
}

module.exports = addDomain;
