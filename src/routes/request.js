const express = require("express");
const requestRouter = express.Router();
const user = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionsRequest");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
 
try {
 
const fromUserId = req.user._id;
const toUserId = req.params.toUserId;
const status = req.params.status;
const allowedStatus = ["ignore","interested"];
if(allowedStatus.indexOf(status) === -1){
  return res.send("Invalid Status");
}



const isIdValid = await user.findById(toUserId);
if(!isIdValid) {
  return res.send("Invalid toUserId");
}



const existingRequest = await connectionRequest.findOne({
  $or: [ {fromUserId, toUserId},
    {fromUserId : toUserId, toUserId : fromUserId}]});
  if(existingRequest){
    console.log("Request already "+status);
    return res.send("Request already "+status);
  }

const connectionRequestData = new connectionRequest({ 
  fromUserId,
  toUserId,
  status,
});
console.log("Starting");
const data = await connectionRequestData.save();
res.status(200).json({
  message: req.user.firstName+" is "+status+" in "+isIdValid.firstName,
  data,
});
}
catch(err) {
  res.status(400).send("ERROR : "+err.message);
}
});

requestRouter.post("/request/review/:status/:fromUserId", userAuth, async (req, res) => {  
  try {
    const loggedInUserId = req.user._id;
    const status = req.params.status;
    const fromUserId = req.params.fromUserId;
    const allowedStatus = ["accepted","rejected"];
    console.log("fromUserId ",fromUserId); 
    if(allowedStatus.indexOf(req.params.status) === -1){
      return res.send("Invalid Status");
    } 
    const connectionRequestData = await connectionRequest.findOne({
      fromUserId : fromUserId,
      toUserId: loggedInUserId,
      status: "interested",
    });
    if(!connectionRequestData){
      return res.send("Connection Request not found");
    }
    connectionRequestData.status = status;
    const data = await connectionRequestData.save();
    res.send("Request "+status+"ed "+data);
    } catch (err) {
      res.status(400).send("ERROR : "+err.message);
    }
  }
);
module.exports = requestRouter;
