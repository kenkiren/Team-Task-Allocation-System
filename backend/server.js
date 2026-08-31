import express from "express";
import cors from "cors";
import dotenv from "dotenv";  //its necessary to import dotenv to use .env variables
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Task from "./models/Task.js";
import mongoose from "mongoose";
import authMiddleware from "./middleware/authMiddleware.js"; 
import roleMiddleware from "./middleware/roleMiddleware.js";


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
  email: String,
  password: String,
  role:{
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee'
  }
});

const User = mongoose.model("User", userSchema);
app.use(cors());// Allow requests from any origin, so basically, this is a middleware that allows cross-origin requests from any domain. This is useful when you have a frontend application running on a different domain or port than your backend API. By using this middleware, you can avoid issues related to the Same-Origin Policy, which restricts how resources on a web page can be requested from another domain.


app.use(express.json());


// this is the get request to check if the backend is working
app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.get("/api/tasks", authMiddleware, roleMiddleware("manager"),
 async (req, res) => {
 try {
      const tasks = await Task.find()
        .populate("assignedTo", "name email");

      res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// this is the get request to get the tasks assigned to the user
app.get(
  "/api/tasks/my",
  authMiddleware,
  roleMiddleware("employee"),
  async (req, res) => {
    try {
      const tasks = await Task.find({
        assignedTo: req.user.userId
      }).populate("assignedTo", "name email");

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);


// this is the post request to create a new user in the database
app.post("/api/users", async (req, res ,next ) => {
  console.log(req.body);
    try {
      const user =await User.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        role : req.body.role  
      });
      res.status(201).json("User created successfully");
    } catch (error) {
      next(error);
      }
  });

  // this is the post request to register a new user

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});



// this is the post request to login a user
app.post("/api/login", async (req, res) => {
  
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
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

app.post("/api/tasks",authMiddleware, roleMiddleware("manager"), async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
});


app.put("/api/users/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

app.put("/api/tasks/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("assignedTo", "name email"
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
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