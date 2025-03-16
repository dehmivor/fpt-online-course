const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Đọc biến môi trường từ file .env

// Khởi tạo app
const app = express();

// Middleware
app.use(express.json()); // Dùng để phân tích cú pháp JSON trong request body
app.use(cors()); // Cho phép truy cập từ các domain khác

// Kết nối với MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
// Các route riêng biệt sẽ được import từ các file khác nhau.
app.use("/api/auth", require("./routes/auth.routes")); // Route cho authentication
app.use("/api/trainers", require("./routes/trainerRoutes")); // Route cho trainer
app.use("/api/courses", require("./routes/courseRoutes")); // Route cho course
app.use("/api/users", require("./routes/userRoutes")); // Route cho user
app.use("/api/feedbacks", require("./routes/feedbackRoutes")); // Route cho feedback
app.use("/api/categories", require("./routes/categoryRoutes")); // Route cho category
app.use("/api/live-sessions", require("./routes/liveSessionRoutes")); // Route cho live session

// Middleware xử lý lỗi 404 (Nếu route không tồn tại)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Middleware xử lý lỗi toàn cục (có thể thêm nhiều logic ở đây)
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
});

// Lắng nghe yêu cầu trên cổng
const PORT = process.env.PORT || 5003; // Nếu không có PORT trong file .env, sẽ dùng 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
