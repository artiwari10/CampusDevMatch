const express = require("express"); 
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionsRequest");
const User = require("../models/user");

userRouter.get("/user/requests", userAuth, async (req,res) => {
    try {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    const ConnectionRequest = await connectionRequest.find({
    toUserId : loggedInUser._id,
    status : "interested",

    }).populate("fromUserId",["firstName","lastName"]); 
    const data = ConnectionRequest.map((row) => row.fromUserId);
    
        res.json({message : "success",
            data : data,
        });
}
    catch (err) {
        res.send("ERROR: " + err.message);
    }
}); 
userRouter.get("/user/connection", userAuth, async (req,res) => {
    try {
    const loggedInUser = req.user;
    const connectionAccepted = await connectionRequest.find({
       $or : [ { toUserId : loggedInUser._id,
        status : "accepted", },
        {fromUserId : loggedInUser._id,
        status : "accepted",
    }],
    }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
    const data = connectionAccepted.map((row) => {
       if(row.fromUserId._id.equals(loggedInUser._id)) { 
        return row.toUserId;
       }
       return row.fromUserId;
    });
    res.json({message : "success",
        data : data,
    });
}
catch(err) {
    res.send("Message: " + err.message);    
}


});

userRouter.get("/user/feed", userAuth, async (req,res) => { 
try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page-1) * limit;

    const ConnectionRequests =  await connectionRequest.find({
        $or : [
            { toUserId : loggedInUser._id,},
            { fromUserId : loggedInUser._id,}
        ],
    })
    .select(["fromUserId","toUserId"]);
    const userAlreadySeen = new Set();
ConnectionRequests.forEach(req  => {
    userAlreadySeen.add(req.fromUserId.toString());
    userAlreadySeen.add(req.toUserId.toString()); 
    
});
console.log("userAlreadySeen",userAlreadySeen);
const user = await User.find({
    _id : {
        $nin : [...userAlreadySeen,loggedInUser._id]
    }
}).select(["firstName","lastName",
    "photoUrl",
    "skills",
    "about"]).limit(limit).skip(skip);
res.send(user);
}
catch(err) {
    res.send("ERROR: " + err.message);
}
});
module.exports = userRouter;