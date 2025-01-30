const express = require("express")
require("dotenv").config()
const app = express()
const morgan = require("morgan")
const cors =require("cors")
const http = require("http")
const axios = require("axios")
const cron = require("node-cron")
const {initializeSocket} = require("./config/socket")
const server = http.createServer(app)
const io =initializeSocket(server)
const swaggerDocs = require("./swagger");

require("./models")


const whiteList = [process.env.CLIENT_URL, process.env.CLIENT2_URL,'http://localhost:5173']

const corsOptions = {
    origin:function (origin,callback){
      if(whiteList.indexOf(origin) !==-1 || !origin){
        callback(null,true)
      }else{
        callback(new Error("Not allowed by CORS"))
      }
    } ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  };

const port = process.env.PORT || 5000
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan("tiny"));

const userRoute = require("./routes/userRoutes");
const employeeRoute = require("./routes/employeeRoutes");
const serviceRoute = require("./routes/serviceRoutes");
const taskRoute = require("./routes/taskRoutes");
const clientRoute = require("./routes/clientRoutes");
const reportRoute = require("./routes/reportRoutes");
const financeRoute = require("./routes/financeRoutes");
const inventoryRoute = require("./routes/inventoryRoutes");
const chatRoute = require("./routes/chatRoutes")
const messageRoute = require("./routes/messageRoutes")
const paymentRoute = require("./routes/paymentRoutes")


app.use("/user", userRoute);
app.use("/employee", employeeRoute);
app.use("/service", serviceRoute);
app.use("/TASK", taskRoute);
app.use("/client", clientRoute);
app.use("/report", reportRoute);
app.use("/finance", financeRoute);
app.use("/inventory", inventoryRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
app.use("/payment", paymentRoute)


const client_url = process.env.CLIENT_URL || "http://localhost:5000";
swaggerDocs(app, client_url);


cron.schedule('*/30 * * * *', async ()=> {
  try {
    const response = await axios.get(process.env.CLIENT_URL)
    console.log("update successful", response.status)
  } catch (error) {
    console.error("failed to update tasks", error.message)
  }
})


app.set("io",io)

const startServer = async () => {
    try {
      server.listen(port, () => {
        console.log(`App is listening on port ${port}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error.message);
    }
  };
  
  
  startServer();
