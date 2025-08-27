import mongoose from 'mongoose'

// Get Schema from mongoose
const Schema = mongoose.Schema;

// Initialize Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create model
// A singular model such as Blog is converted to blogs collection (pluralized)
export const Blog = mongoose.model('Blog', blogSchema);