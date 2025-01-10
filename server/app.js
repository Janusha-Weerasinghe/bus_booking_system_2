const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet =require ('helmet');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');
const serverless = require("serverless-http");

dotenv.config(); // Load environment variables



const app = express();
// const PORT = process.env.APP_RUNNING_PORT || 5000;


// //Add Routes
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });
//const adminRoutes = require("./routes/adminRoutes");
const busRoutes = require("./routes/busRoutes");
//const commuterRoutes = require("./routes/commuterRoutes");
const authRouter = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes= require("./routes/userRoutes");

//Add Middleware Path
//const logger = require("./middlewares/logger");

// // swagger
// const swaggerDefinition = {
//   info: {
//     title: "System APIs",
//     version: "1.0.0",
//   },
//   host: "localhost:8088",
//   basePath: "/",
// };

// // Options for swagger documentations
// const options = {
//   swaggerDefinition,
//   apis: ["./docs/**/*.yaml"],
// };

// // Initialize the swagger documentations
// const swaggerSpec = swaggerJsDoc(options);

// // Add Swagger
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use(cors());
app.use(express.json());
//app.use(logger);
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/api/bus",busRoutes);
app.use("/api/auth",authRouter);
app.use("/api/booking",bookingRoutes);
app.use("/api/user", userRoutes);


// // Check runing port
// app.listen(PORT, () => {
//   console.log(`Successfully runing on Port : ${PORT}`);
// });



// // Create a server object
// const server = http.createServer((req, res) => {
//   // Set the response header
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   // Write some text to the response
//   res.end('Welcome to my simple Node.js app!');
// });

// // Start the server
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });




// Mongo DB Connections
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));

// // MongoDB Connections
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGO_DB_CONNECTION_URL)
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((err) => console.error(`Error occurred: ${err}`));

module.exports = app;
module.exports.handler = serverless(app);  


  

