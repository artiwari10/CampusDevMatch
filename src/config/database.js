const mongoose = require("mongoose");
connectDB=async() => {
    await mongoose.connect(
"mongodb+srv://artiwari10:Dfxecmg73MXIfvSj@nodejslearning.njduk.mongodb.net/?retryWrites=true&w=majority&appName=NodejsLearning"
)};

module.exports = connectDB;