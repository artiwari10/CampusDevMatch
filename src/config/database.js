const mongoose = require("mongoose");
<<<<<<< HEAD
connectDB=async() => {
    await mongoose.connect(
"mongodb+srv://artiwari10:Dfxecmg73MXIfvSj@nodejslearning.njduk.mongodb.net/?retryWrites=true&w=majority&appName=NodejsLearning"
)};

module.exports = connectDB;
=======

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://artiwari10:Dfxecmg73MXIfvSj@nodejslearning.njduk.mongodb.net/?retryWrites=true&w=majority&appName=NodejsLearning"
  );
};

module.exports = connectDB;
>>>>>>> d6eb91d (Backend Complete (Feed, COnnection))
