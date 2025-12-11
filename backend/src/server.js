import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello Worldd!");
  
})
