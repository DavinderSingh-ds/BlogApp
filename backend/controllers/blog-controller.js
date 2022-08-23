import Blog from "../model/Blog";

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
    const blog = new Blog({
        title,
        description, 
        image, 
        user,
    });
    try {
       await blog.save();
    } catch (error) {
        return console.log(error);
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
        blog = await Blog.findByIdAndRemove(id)
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(400).json({message: "unable to Delete"});
    }
    return res.status(200).json({message: "Successfully Deleted"});
};