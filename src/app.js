const express = require("express");
const app = express();
app.use("/home",(req,res)=>{
  res.send("welcome to the homepage");
});

app.get("/user",(req,res,next)=>{
  //This is a route handler
  next();
// res.send("Sending from respond");

  },
  (req,res,next)=>{
   // res.send("Sending from respond 2nd rout handler");
    next();
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