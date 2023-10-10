const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require ('../models/loginsystem');

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
            const token = jwt.sign({userId: users.id, email:users.email},"3C0F2FAFD26C4FA5E8F362C92F96F86C",{expiresIn: "1hr"})
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
module.exports = {signup, LoginUser};
