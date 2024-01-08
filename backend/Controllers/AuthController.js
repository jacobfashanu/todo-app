const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const pageData = {
      pages:[{
        tasks: [{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true},{task:'', active: true}], // array of objects where each object represents a task. Each object stores the string of the task and whether the task is completed
        numOfTasks: 0,
        numOfActiveTasks: 0,
        numOfInActiveTasks: 0
      }],
      state: 'All',
      currentPage: 0,
      numOfPages: 1};
    const user = await User.create({ email, password, username, pageData, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
        //  secure: true
        // httpOnly: true,
        //  samesite: "none"
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }

  module.exports.userProfile = async (req, res) => {
    const user = await User.findById(req.userId);
    if (user) {
      return res.json({status: true, user: user.username, userData: user.pageData });
    }
    else {
      return res.json({ status: false, message: "Could not get userData" })
    }
  }

  module.exports.updateProfile = async (req, res) => {
    const newPageData = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    if (newPageData) {
      return res.json({ status: true });
    }
    else {
      return res.json({ status: false, message: "Could not update userData"})
    }
    
  }