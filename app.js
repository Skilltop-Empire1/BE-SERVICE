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
const serviceRoute = require("./routes/serviceRoutes");
const taskRoute = require("./routes/taskRoutes");
const clientRoute = require("./routes/clientRoutes");
const reportRoute = require("./routes/reportRoutes");
const financeRoute = require("./routes/financeRoutes");
const inventoryRoute = require("./routes/inventoryRoutes");
const messageRoute = require("./routes/messageRoutes")



app.use("/api/IMS/user", userRoute);
app.use("/api/IMS/service", serviceRoute);
app.use("/api/IMS/TASK", taskRoute);
app.use("/api/IMS/client", clientRoute);
app.use("/api/IMS/report", reportRoute);
app.use("/api/IMS/finance", financeRoute);
app.use("/api/IMS/inventory", inventoryRoute);
app.use("/api/IMS/message", messageRoute);



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







  // //************user signin  ***********/

  // login = async (req, res) => {
  //   const { email, password } = req.body;

  //   //validate user login
  //   const { error } = userschema.validateLogin.validate(req.body);
  //   if (error) {
  //     return res.status(404).json(error.details[0].message);
  //   }

  //   //************check for user ************ */
  //   const user = await userModel.User.findOne({ where: { email } }); 
  //   const staff = await userModel.Staff.findOne({ where: { email } });
  //   if (!user && !staff) {
  //     return res.status(400).send("Email is not registered");
  //   }

  //   const account = user || staff


  //   const isMatch = await bcrypt.compare(password, account.password);
  //   try {
  //     if (!isMatch) {
  //       return res.status(404).json({ msg: "Incorrect login details" });
  //     } else {

  //        // ******************Create JWT token ***********************
  //       let id;
  //       if(user){
  //         id=user.userId
  //       }else{
  //         id=staff.staffId
  //       }
  //       let permission
  //       if (staff) {
  //         permission=staff.permissions
  //       };
  //       console.log( "authpermission", permission);
  //       console.log( "email", account.email);
  //       const token = jwt.sign({id, username: account.username|| account.userName, email: account.email, role: account.role, permission}, process.env.SECRET_KEY, { expiresIn: '1h' })
  //       res.json({token, id: id, username: account.username|| account.userName, email: account.email, role:account.role });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
