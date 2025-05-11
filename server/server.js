import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import login from './routes/loginRoute.js';
import register from './routes/registerRoute.js';
import adminLogin from "./routes/adminRoute.js";
import addNewAdmin from "./routes/adminRoute.js";
import resetAdminPassword from "./routes/adminPasswordResetRoute.js"
import logout from './routes/logoutRoute.js';
import booking from './routes/bookingRoute.js';
import timeSlot from "./routes/slotManagementRoute.js";
import adminDashboard from './routes/adminDashboardRoute.js';
import userDashboardRoute from './routes/userDashboardRoute.js';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
connectDB();

// app.use(express.static("public"));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: [process.env.BOOKMYFIT_URL, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
}));

app.use("/api", login);
app.use('/api', register);
app.use('/api', addNewAdmin);
app.use('/api', adminLogin);
app.use("/api", resetAdminPassword);
app.use("/api", logout);
app.use("/api", booking);
app.use("/api", timeSlot);
app.use('/api', adminDashboard);
app.use('/api', userDashboardRoute);

app.listen(port, ()=>
{
   console.log('Server started on http://localhost:'+port);
});