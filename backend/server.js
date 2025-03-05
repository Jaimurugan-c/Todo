const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes properly
const todoRoutes = require("./routes/todoRoutes");  // ✅ Make sure you're importing the correct file
app.use("/todos", todoRoutes);  // ✅ Pass `todoRoutes` directly

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
