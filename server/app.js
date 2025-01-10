const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet =require ('helmet');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path');
const serverless = require("serverless-http");
const swaggerDoc = require("./docs/swagger.json")

dotenv.config(); // Load environment variables



const app = express();
// const PORT = process.env.APP_RUNNING_PORT || 5000;
app.set('trust proxy', true);

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

// // Swagger definition
// const swaggerDefinition = {
//   openapi: "3.0.0", // Use OpenAPI 3.0
//   info: {
//     title: "System APIs",
//     version: "1.0.0",
//     description: "API documentation for the System",
//   },
//   servers: [
//     {
//       url: "https://locallhost:8088", // Deployed URL
//       description: "Deployed server",
//     },
//   ],
// };

// // Swagger options
// const options = {
//   swaggerDefinition,
//   apis: ["./docs/**/*.yaml"], // Define your API documentation files
// };

// Generate Swagger documentation
//const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));


app.use(cors());
app.use(express.json());
//app.use(logger);
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api/bus",busRoutes);
app.use("/api/auth",authRouter);
app.use("/api/booking",bookingRoutes);
//app.use("/api/user", userRoutes);


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

const uri = "mongodb+srv://janushachamaliapps:sNrsumfNCeVFWn5XJCW@cluster0.e9gay.mongodb.net/bus_booking_system";

if (!uri) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));


// // Mongo DB Connections
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGO_DB_CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Successfully connected to mongodb !"))
//   .catch((err) => console.log(`Error has occured: ${err}`));
// // MongoDB Connections
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.MONGO_DB_CONNECTION_URL)
//   .then(() => console.log("Successfully connected to MongoDB!"))
//   .catch((err) => console.error(`Error occurred: ${err}`));

module.exports = app;
module.exports.handler = serverless(app);  


  

