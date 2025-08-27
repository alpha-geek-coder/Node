import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { router } from './routes/blogRoutes.js';
import dotenv from 'dotenv'

// const express = require('express');
// const path = require('path');

// Step 1 : Initialize app
dotenv.config({debug: true}); // load env vars 
const app = express();

// connect to mongodb
const dbURI = process.env.MONGO_DB_URI;

const dbConnection = async () => {
    try {
      await mongoose.connect(dbURI);
        console.log("Connected to MongoDB!");
        
      // Step 2 : Listen to port only when connected to db
        app.listen(3000);
        
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err);
    }
}

dbConnection();

const basePath = path.dirname(process.cwd()); // For ES Modules
const viewPath = path.join(basePath, 'views');
console.log(basePath, viewPath);

// register view engine
app.set('view engine', 'ejs');
app.set('views', viewPath);

//  register static files for public access
app.use(express.static('../public'));

// register MIME type of HTML form to be parse into http request body
app.use(express.urlencoded({ extended: true }));

// Step 3 : Define middlewares and routes

// Logger middle ware, executed for each request, at top-level.
app.use((req, res, next) => {
    console.log('new message received');
    console.log('host:', req.hostname);
    console.log('method:', req.method);
    console.log('path', req.path);
    next(); // continue to next middleware function
})
// Using 3rd party middleware function morgan for logging as opposed to previous
// middleware function
app.use(morgan('dev'));

// Dummy middleware function
app.use((req, res, next) => {
  console.log("in the next middleware function");
  next(); // continue to next middleware function
})


// app.get("/home", (req, res) => {
//     //   res.sendFile(path.join(viewPath, "index.html"));
//     const blogs = [
//       { title: "Title 1", snippet: "Snippet 1" },
//       { title: "Title 2", snippet: "Snippet 2" },
//       { title: "Title 3", snippet: "Snippet 3" },
//     ];
//     res.render('index', {title: 'Home', blogs});
// });

// Middleware function, executed for all request in chain except /home 
// as previous middleware function app.get('/home', ...) has served the request
app.use((req, res, next) => {
  console.log("before serving any child page");
  next(); // continue to next middleware function
})
app.get('/recipes/lasagna', (req, res) => {
    // res.sendFile(path.join(viewPath, 'recipes', 'lasagna.html'));
    res.render("recipes/lasagna", { title: "Lasagna" });
})

app.get("/recipes/pizza", (req, res) => {
    // res.sendFile(path.join(viewPath, "recipes", "pizza.html"));
    res.render("recipes/pizza", { title: "Pizza" });
});

// app.get("/images/lasagna.jpg", (req, res) => {
//     res.sendFile(path.join(viewPath, "images", "lasagna.jpg"));
// });

// app.get("/images/pizza.jpg", (req, res) => {
//     res.sendFile(path.join(viewPath, "images", "pizza.jpg"));
// });

//  Blog routes
// Default context is blogs, all routes are under /blogs/...
app.use('/blogs', router);



// Step 4 : Redirects

app.get("/index.html", (req, res) => {
  res.redirect("/blogs");
});

app.get("/home", (req, res) => {
  res.redirect("/blogs");
});

// Step 5 : Catch all path, must ALWAYS be declared at the last

app.use((req, res, next) => {
    // console.error(err.stack);
    // res.status(404);
    // res.send('<h1>Page not found</h1>');
    res.status(404).render("404", { title: "404" });
})

// Global error handler middleware function

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace
    res.status(404).render("404", { title: "404", error: err });
});
