const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `DB connection Success : ${data.connection.name} & ${data.connection.host}`
        .bgGreen.white
    );
  } catch (error) {
    console.log(`DB connection Failed : ${error.message}`.bgRed);
  }
};

module.exports = { connectDB };
