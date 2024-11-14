import mongoose from 'mongoose';
import userSchema from '../Schema/userSchema.js';
const User = mongoose.model('User', userSchema);
import { signupSchema, signinSchema } from '../Schema/authSchema.js'
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try{
        const { username, email, password, cpassword } = signupSchema.parse(req.body);
        if(password != cpassword){
            return res.status(400).json({msg : "Passwords do not match."})
        }
        const user = await User.findOne({email : email})
        if(user){
            return res.status(409).json({msg : "User already exists."});
        }
        const newUser = await User.create({
            username,
            email,
            password
        });
        const token = jwt.sign({userId : newUser._id}, process.env.JWT_SECRET);
        res.cookie('authToken', token, {httpOnly : true});
        return res.status(201).json({
            msg : "User created successfully.",
        });
    } catch(err){
        console.log(err);
        return res.status(400).json({
            msg : "Internal Server Error."
        })
    }
}

export const signin = async (req, res) => {
    try{
        const { email, password } = signinSchema.parse(req.body);
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(400).json({
                msg : 'User not found'
            })
        }
        if(!(user.password == password)){
            return res.status(400).json({
                msg : "Invalid password"
            })
        }
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET);
        res.cookie('authToken', token, {httpOnly : true});
        return res.status(201).json({msg : "Signin successful."});
    } catch(err){
        console.log(err);
        return res.status(400).json({
            msg : "Internal Server Error."
        })
    }
}