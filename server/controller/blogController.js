import { Blog } from '../models/blog.js';

export const createGet = (req, res) => {
    res.render("./blogs/create", { title: "Create a new blog" });
};

export const getAll = async (req, res, next) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 });
        res.render("./blogs/index", { title: "All Blogs", blogs: result });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const createBlog = async (req, res, next) => {
    const blog = new Blog(req.body);

    try {
        const result = await blog.save();
        res.redirect("/blogs");
    } catch (err) {
        console.error("Error saving blog", err);
        next(err);
    }
};

export const findById = async (req, res, next) => {
    const id = req.params.blogId;
    try {
        const result = await Blog.findById(id);
        res.render("./blogs/details", { title: "Details", blog: result });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.blogId;
  try {
    const result = await Blog.findByIdAndDelete(id);
    res.json({ redirect: "/blogs" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};



