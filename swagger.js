// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Service API",
      version: "1.0.0",
      description: "API That Tracks Staff Task and Service Rendered",
    },
    servers: [
      {
        // url: process.env.BACKEND_URL || "http://localhost:5000", // Replace with your server URL
        url: "http://localhost:5000", 
      
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const PORT = process.env.PORT || 5000;
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, client_url) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at ${client_url}/docs`);
}

module.exports = swaggerDocs;
