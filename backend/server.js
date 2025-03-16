const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints"); // Import thư viện liệt kê endpoints

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

app.get("/", (req, res) => {
  res.send("Hello World");
});
// Routes
// Các route riêng biệt sẽ được import từ các file khác nhau.
app.use("/api/auth", require("./routes/auth.routes")); // Route cho authentication
app.use("/api/feedbacks", require("./routes/feedback.routes")); // Route cho feedback
app.use("/api/categories", require("./routes/categorie.routes")); // Route cho category
app.use("/api/live-sessions", require("./routes/livesession.routes")); // Route cho live session
app.use("/api/training", require("./routes/training.routes")); // Route cho training
app.use("/api/users", require("./routes/manage.routes")); // Route cho user

// Middleware xử lý lỗi 404 (Nếu route không tồn tại)
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Middleware xử lý lỗi toàn cục
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
});

// Liệt kê các endpoint đã đăng ký trước khi server bắt đầu lắng nghe
console.log("Danh sách API endpoints:");
console.log(listEndpoints(app));

// Lắng nghe yêu cầu trên cổng
const PORT = process.env.PORT || 5003; // Nếu không có PORT trong file .env, sẽ dùng 5003
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
