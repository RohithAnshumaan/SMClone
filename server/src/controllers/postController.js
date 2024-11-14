import mongoose from 'mongoose';
import postSchema from "../Schema/postSchema.js";
import userSchema from "../Schema/userSchema.js";
const Post = mongoose.model('Post', postSchema)
const User = mongoose.model('User', userSchema);

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json({
            msg : 'Fetching successful.',
            posts
        })
    } catch (err){
        console.log(err);
        res.status(400).json({
            msg : 'Bad request'
        })
    }
}

export const uploadPost = async (req, res) => {
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({msg: "Please login."})
        }
        const username = user.username;
        const {url, caption, likes, comments} = req.body;
        const newPost = await Post.create({
            username : username,
            url : url,
            caption : caption,
            likes : likes,
            comments : comments
        })
        res.status(201).json({
            msg : 'Uploaded successfully.',
            newPost
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            msg : "Bad request."
        })
    }
}