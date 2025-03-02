const express = require("express");
const connectDB = require("./config/database");
connectDB().then(()=>{
  console.log("Connection Successful");
  app.listen(8888, () => {
    console.log("Server is running on port 8888");
  });
}).catch((err)=>{
  console.log("Connection Failed");
});

const app = express();
app.use("/home",(req,res)=>{
  res.send("welcome to the homepage");
});

app.get("/user",(req,res,next)=>{
  //This is a route handler
// res.send("Sending from respond");
  res.send("This is it");
  });

app.use("/login",(req,res)=>{
    res.send("Enter your username and password");
  });
  app.use("/signup",(req,res)=>{
    res.send("Create your account");
  });
  app.use("/feed",(req,res)=>{
    res.send("Swipe Left and Right");
  });
