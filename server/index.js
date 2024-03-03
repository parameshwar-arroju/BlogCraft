import express from "express";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import blogRoute from "./routes/blogRoutes.js";
import userRoute from "./routes/userRoutes.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.json());
app.use(cors({}));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use("/blogs", blogRoute);
app.use("/users", userRoute);

app.listen(3000, (req, res) => {
  console.log("Server running on port : 3000");
});


app.all('*', (req, res) => {
  res.status(404).json({message: "Route Not Found"});
});