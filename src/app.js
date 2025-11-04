// Load environment variables first
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Origin", "*");
  res.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );
  res.set("Access-Control-Expose-Headers", "Set-Cookie");
  res.set("Access-Control-Max-Age", "86400"); // 24 hours
  next();
});

//middleware to use for convert your upcoming json data to js object
app.use(express.json());
app.use(cookieParser());

// CORS Configuration for both development and production
const allowedOrigins = [
  "http://localhost:5173",
  "https://dev-tinder-frontend-react.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    maxAge: 86400, // 24 hours
  })
);

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "DevTinder API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

app.use("/", authRouter, profileRouter, requestRouter, userRouter);

// Get User from emailId
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const userData = await User.findOne({ emailId: userEmail });
    if (!userData) {
      res.status(404).json({
        msg: "User Not found",
      });
    }
    res.status(200).json({
      user: userData,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
});

// Get Feed Data from database All the data
app.get("/feed", async (req, res) => {
  try {
    const UsersData = await User.find({});
    res.status(200).json({
      users: UsersData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
});

// update the user by id
app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;

    console.log(data);

    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "lastName",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
});

// // update the user by email
// app.patch("/useremailid", async (req, res) => {
//   try {
//     const userEmail = req.body.emailId;
//     const data = req.body;

//     const updatedUser = await User.findOneAndUpdate(
//       { emailId: userEmail },
//       data,
//       { returnDocument: "after", runValidators: true }
//     );
//     if (!updatedUser) {
//       return res.status(400).json({
//         msg: "User not found",
//       });
//     }
//     res.status(200).json({
//       msg: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     // Handle MongoDB duplicate key error
//     if (error.code === 11000) {
//       return res.status(400).json({
//         msg: "Email already exists",
//         err: "Duplicate email address",
//       });
//     }
//     res.status(400).json({
//       msg: "Something went wrong",
//       err: error.message,
//     });
//   }
// });

// Delete the user by id
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
});

// This is correct way to start the application first connect to the database and start the server.
const PORT = process.env.PORT || 3030;

connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database not connected..!");
  });
