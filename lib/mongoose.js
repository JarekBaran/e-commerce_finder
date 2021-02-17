const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const domainSchema = new mongoose.Schema({
  host: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  stack: {
    type: [String]
  },
  word: {
    type: String,
    required: true,
    lowercase: true
  }
});

const Domain = mongoose.model("Domain", domainSchema);

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
