const { default: mongoose } = require("mongoose");

const URI = process.env.DATABASE_URI;

const connectDB = async () => {
  try {
    mongoose.connect(URI);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDB };
