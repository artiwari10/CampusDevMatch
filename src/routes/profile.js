const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validate } = require("../models/user");
const {validateLoginData}= require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
   if(!validateLoginData(req))  {
    throw new Error("Invalid Edit Field");
   }

   const user = req.user; 
   console.log("Before Update : "+user);
   
   Object.keys(req.body).forEach((key)=>(user[key] = req.body[key]));
   console.log("After Update : "+user);
   await user.save();
   res.send(user);
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
