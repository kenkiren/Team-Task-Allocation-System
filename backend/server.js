import express from "express";
import cors from "cors";

const app = express();

app.use(cors());// Allow requests from any origin, so basically, this is a middleware that allows cross-origin requests from any domain. This is useful when you have a frontend application running on a different domain or port than your backend API. By using this middleware, you can avoid issues related to the Same-Origin Policy, which restricts how resources on a web page can be requested from another domain.
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Hello from Express!"
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});