const bcrypt = require('bcrypt');
const UserModel = require('../models/auth');

const signUp = async (req, res) => {
    console.log(req.body);
    //tODO: Validate req body

    //To Hash Password
    const salt = bcrypt.genSaltSync(10);

    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    //adding to DB
    const newUser = new UserModel({...req.body, password: passwordHash});
    const newlyInsertedUser = await newUser.save();
    console.log(newlyInsertedUser._id);
    res.json({
        msg: "User created Successfully!. Please login again"
    })
}

const logIn = async (req, res) =>{
    const user = await UserModel.findOne({email: req.body.email});
    // console.log(user);

    //cheking if user peresent
    if(!user){
        res.json({
            message:  'User not found, Please Sign Up'
        })
    }
    

    //To check If passsword matches 

   const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

   if(isPasswordValid){
    return res.json({
        message:"Loggin Successful"
    })
   }
   res.json({
    message:"Loggin Failure"
   })
}

const authController = {
    signUp,
    logIn
}

module.exports = authController;