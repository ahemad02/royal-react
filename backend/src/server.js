import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT || 8800;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connected and Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

app.get("/", (req, res) => {
  res.send("Hello Worldd!");
  
})
