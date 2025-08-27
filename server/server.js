import http from "node:http";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import _ from 'lodash';

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
    // lodash
    const num = _.random(0, 20);
    console.log(num);
  try {
    let filePath = "../views/";
    let contentType;
    switch (req.url) {
        case "/":
        // Redirecting
        res.statusCode = 301;
        res.setHeader("Location", "/index.html");
        res.end();
        return;
      case "/index.html":
        filePath += "index.html";
        contentType = "text/html";
        break;
      case "/recipes/lasagna.html":
        filePath += "recipes/lasagna.html";
        contentType = "text/html";
        break;
      case "/recipes/pizza.html":
        filePath += "recipes/pizza.html";
        contentType = "text/html";
        break;
      case "/images/lasagna.jpg":
        filePath += "images/lasagna.jpg";
        contentType = "image/jpeg";
        break;
      case "/images/pizza.jpg":
        filePath += "images/lasagna.jpg";
        contentType = "image/jpeg";
        break;
      default:
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 - Page Not Found</h1>");
        return;
    }
    // Step 1: set response headers
    console.log(contentType, filePath);
    res.setHeader("Content-Type", contentType);
    // Step 2: set body
    // res.write('<p>Hello World!<p>');
    const readStream = fs.createReadStream(filePath);
    await pipeline(readStream, res);
    console.log("File streamed successfully");
    res.end();
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port 3000");
});
