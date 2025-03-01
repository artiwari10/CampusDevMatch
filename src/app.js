const express = require("express");
const app = express();
app.use("/home",(req,res)=>{
  res.send("welcome to the homepage");
});
app.use("/",(req,res)=>{
    console.log("Welcome to dashmode");
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
app.listen(8888, () => {
  console.log("Server is running on port 8888");
});
