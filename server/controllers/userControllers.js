const asyncHandler= require('express-async-handler');
const userModel= require('../models/userModel');
const usersToken = require('../config/userToken');

// Handle Register New User //
const registerUser = asyncHandler(async(req, res)=>{
    const {name, mobile, password, photo}= req.body;

    if(!name || !mobile || !password){
        res.status(400);
        throw new Error("Any Field Can't be Empty");
    }

    const alreadyUser= await userModel.findOne({mobile})

    if(alreadyUser){
        res.status(409);
        throw new Error("User Already Exists");
    }

    /// Creating User in DB ////
    const user= await userModel.create({name, mobile, password, photo});
    console.log('New User Created Successfully');

    if(user){
        res.status(200).json({_id: user._id, name: user.name, mobile: user.mobile, photo: user.photo, token: usersToken(user._id)});
    }
    else{
        res.status(400);
        throw new Error('Failed to Create New User!!!')
    }
});

    // Handle Login Existed User //
    const loginUser= asyncHandler(async(req, res)=>{
        const {mobile, password}= req.body;

        /// Finding Existing User in DB ////
        const existedUser= await userModel.findOne({mobile});

        if(existedUser && await (existedUser.compareLoginPassword(password))){
            res.status(200).json({_id: existedUser._id, name: existedUser.name, mobile: existedUser.mobile, photo: existedUser.photo, token: usersToken(existedUser._id)});
        }
        else{
            res.status(401);
            throw new Error("Invalid Mobile or Password");
        }
    })

// Get All User by Search//
const allUser= asyncHandler(async(req, res)=>{
    let searchQuery;

    const {search}= req.query;
    if(search){
        searchQuery= {$or: [
            {name: { $regex:search, $options: "i" }},
            {mobile: { $regex:search, $options: "i" }}
        ]}
    }
    else{
        {};
    }

    const searchUser= await userModel.find(searchQuery).find({_id: {$ne: req.user._id}})

    res.status(200).send(searchUser);
})

// Get all User //
const getUsers= asyncHandler(async(req, res)=>{
    
    const allUsers= await userModel.find({});
    res.status(200).send(allUsers);
})

module.exports= {registerUser, loginUser, allUser, getUsers};