# Recipe Blog with NodeJS & ExpressJS

## 📝 Description
This project is a basic server-side rendered (SSR) blog application built with NodeJS and ExpressJS. It is designed to demonstrate foundational back-end development concepts by recreating simple webpages based on recipe-style blog posts. The application connects to a MongoDB database to store and retrieve blog posts, allowing users to view, create, and manage content.

## 🚀 Features
*   **View All Blog Posts:** Displays a list of all recipe blog posts.
*   **Create New Blog Posts:** Allows users to add new blog posts with a title, snippet, and body.
*   **View Individual Blog Posts:** Shows the full content of a specific recipe post.
*   **Handle 404 Errors:** Gracefully manages requests for pages that do not exist.
*   **Database Integration:** Uses MongoDB for persistent storage of blog data.

## 🛠️ Technology Stack
*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for handling server-side logic and routing.
*   **EJS:** Embedded JavaScript templating engine for server-side rendering.
*   **Mongoose:** ODM (Object Data Modeling) library for interacting with MongoDB.
*   **MongoDB Atlas:** Cloud-based database service.

## 💻 Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   MongoDB Atlas account or a local MongoDB instance

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/alpha-geek-coder/Node.git
    cd your-repo
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    *   Create a `.env` file in the root directory.
    *   Add your MongoDB Atlas connection string.
        ```
        DB_URI="your_mongodb_connection_string"
        ```
4.  **Run the application:**
    ```bash
    npm start
    ```

## 📂 Project Structure
*   `/server`: Contains the main server-side logic, including `app.js`.
*   `/models`: Defines the Mongoose schemas for the database.
*   `/views`: Holds the EJS template files for rendering.
*   `/public`: Stores static assets like images.

## 👨‍💻 Author
*   Jadeed Jawahar - [GitHub Profile](https://github.com/alpha-geek-coder)


