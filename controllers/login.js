const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer =require('nodemailer');
const user = require ('../models/loginsystem');
const Token = require('../models/token');

//sign up api

const signup = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const loginUser = new user({username,email, password: hashpassword})
        await loginUser.save();
        res.status(201).json({message: "User created Successfully "})
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

const LoginUser =async(req,res) =>{
    try{
        const {email,password} = req.body;
        const users =await user.findOne({email}) //const user has the whole object containing email and password
        if(users && await bcrypt.compare(password,users.password))
        {
            const token = jwt.sign({userId: users.id, email:users.email},process.env.PRIVATE_KEY ,{expiresIn: "1hr"})
            res.status(200).json({token})
        }
        else
        {
            res.status(401).json({error: "Invalid credentials"})
        }
    }
    catch(error)
    {
        res.status(500).json({error: error.message})
}
}

// send user passwrod reset mail
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

const userPasswordReset = async (req, res) => {
    try {
    const { email } = req.body;
    const user = await user.findOne({ email });
    if (!user){
        res.status(404);
        res.json({message: "The email provided not found"})
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
        token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }
        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);
        res.send("password reset link sent to your email account");
}catch(error){
    res.send("An error occured");
    console.log(error)
}
};

const saveResetPassword = async (req, res) => {
    try {
        const { password } = req.body;
    
        if (!password) {
          return res.status(400).send("Password is required.");
        }
    
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(400).send("Invalid link or expired.");
        }
    
        const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
        });
        if (!token) {
          return res.status(400).send("Invalid link or expired.");
        }
    
        user.password = password;
        await user.save();
        await token.delete();
    
        res.send("Password reset successfully.");
      } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
      }
};

module.exports = {signup, LoginUser, userPasswordReset, saveResetPassword};
