import { response } from "express";
import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req,res,next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }
    if(!blogs) {
        return res.status(404).json({ message: "No Blogs Found"});
    }
    return res.status(200).json({blogs});
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return response.status(400).json({message: "Unable to find User By This Id"});
    }
    const blog = new Blog({
        title,
        description, 
        image, 
        user,
    });
    try {

       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session});
       await session.commitTransaction();

    } catch (error) {
        console.log(error);
        return response.status(500).json({message: err});
    }
    return res.status(200).json({blog});
};

export const updateBlog = async (req, res, next) => {
    // title and description we want to update
    const { title, decription } = req.body;
    const { blogId } = req.params.id;
    let blog;
    try {     
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            decription
        })
    } catch (error) {
        return console.log(error);
    }
    if(!blog) {
        return res.status(500).json({ message: "Unable to Update the Blog"});
    }
    return res.status(200).json({ blog });
};

export const  getById = async (req,res,next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({ blog });
};

export const deleteBlog = async (req,res,next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(400).json({message: "unable to Delete"});
    }
    return res.status(200).json({message: "Successfully Deleted"});
};

export const getBlogsByUserId = async (req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blog");
    } catch (error) {
        return console.log(error);
    }
    if(!userBlogs){
        return res.status(404).json({message: "No Blogs found"});
    }
    return response.status(200).json({blogs:userBlogs});
}