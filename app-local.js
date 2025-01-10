const dotenv = require("dotenv");
const app = require("./server/app");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Config .env
dotenv.config();

// Define a PORT
const PORT = process.env.APP_RUNNING_PORT || 5000;


// swagger
const swaggerDefinition = {
  info: {
    title: "System APIs",
    version: "1.0.0",
  },
  host: "https://janusha-api-bus.netlify.app",
  basePath: "/",
};

// Options for swagger documentations
const options = {
  swaggerDefinition,
  apis: ["./server/docs/**/*.yaml"],
};

// Initialize the swagger documentations
const swaggerSpec = swaggerJsDoc(options);

// Add Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));



// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});