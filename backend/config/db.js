const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Full Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;