import express from "express";
import cors from "cors";
import dotenv from "dotenv";  //its necessary to import dotenv to use .env variables
dotenv.config();

import mongoose from "mongoose";


const app = express();// in simple words this line creates an instance of the Express application, which is used to define routes, middleware, and other server configurations. It serves as the main entry point for handling incoming HTTP requests and sending responses back to clients. then app.use(express.json())- this line is used to parse incoming JSON data in the request body.


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model("User", userSchema);
app.use(cors());// Allow requests from any origin, so basically, this is a middleware that allows cross-origin requests from any domain. This is useful when you have a frontend application running on a different domain or port than your backend API. By using this middleware, you can avoid issues related to the Same-Origin Policy, which restricts how resources on a web page can be requested from another domain.


app.use(express.json());


// this is the get request to check if the backend is working
app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// this is the post request to create a new user in the database
app.post("/api/users", async (req, res ,next ) => {
    try {
      const user =await User.create({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
      }
  });


// this is the get request to fetch all users from the database
app.get("/api/users",async (req, res, next ) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
//   console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


//now we will connect to the database


app.listen(5000, () => {
  console.log("Server running on port 5000");
});