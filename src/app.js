const express = require("express");
const connectDB = require("./config/database");
const app = express();
<<<<<<< HEAD
const User = require("./models/user");
app.use(express.json());
app.delete("/feed", async (req, res) => {
  const userDetail = req.body.email;
  try{
  const  userData = await User.deleteOne({email : userDetail});
  if(userData.length === 0) {
    res.status(400).send("Email Not Found");
  }
    res.send(userData);
}
catch(err){
  res.status(400).send("Email Not Found");
}
});
app.post("/signup", async (req, res) => {
 // console.log(req.body);
  const user = new User(req.body);
    
    console.log("Attempting to save user:", user);
    try {
    const savedUser = await user.save();
    console.log("User saved successfully:", savedUser);
    res.send({ message: "Data Entered Successfully", user: savedUser });
    }
    catch (err) {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user");
    }
});
app.get("/feed", async (req, res) => {
  const userDetail = req.body.email;
  try{
  const  userData = await User.find( {});
  if(userData.length === 0) {
    res.status(400).send("Email Not Found");
  }
    res.send(userData);
}
  catch(err){
    res.status(400).send("Email Not Found");
  }
});







connectDB().then(()=>{
  console.log("Connection Successful");
  app.listen(8888, () => {
    console.log("Server is running on port 8888");
  });
}).catch((err)=>{
  console.log("Connection Failed");
});


=======
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(8888, () => {
      console.log("Server is successfully listening on port 8888");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
>>>>>>> d6eb91d (Backend Complete (Feed, COnnection))
