import express from 'express';
import * as blogController from '../controller/blogController.js';

// Initialize a router
export const router = express.Router();


router.get("/create", blogController.createGet);


router.get("/", blogController.getAll);

// Add new Blog route
router.post("/", blogController.createBlog);


// Find blog by id route
router.get("/:blogId", blogController.findById);

// Delete blog
router.delete("/:blogId", blogController.deleteBlog);

