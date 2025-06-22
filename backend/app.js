const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/userRoutes.js');
const imageRouter = require('./routes/imageRoutes.js');
require("dotenv").config()
require("./config/db.js")

const port = process.env.PORT || 3200;

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/user", authRouter);
app.use("/api/image", imageRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});