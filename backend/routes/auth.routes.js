const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, name, email, password, role, profile } = req.body;

    // Kiểm tra bắt buộc
    if (!username || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Username, email, password, and name are required" });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    const lastUser = await User.findOne().sort({ id: -1 }); // Lấy user có id lớn nhất

    // Lấy phần số từ id (nếu có), nếu không có thì bắt đầu từ 1
    let newNumber = 1;
    if (lastUser) {
      const lastId = lastUser.id; // Ví dụ: "stu_001"
      const match = lastId.match(/\d+/); // Tìm số trong chuỗi
      if (match) {
        newNumber = parseInt(match[0], 10) + 1; // Chuyển sang số và cộng thêm 1
      }
    }

    const newId = `stu_${newNumber.toString().padStart(3, "0")}`; // Định dạng thành "stu_XXX"

    // Tạo User mới
    const newUser = new User({
      id: newId,
      username, // Không đặt `id: username`, vì Mongoose sẽ tự tạo `_id`
      name,
      email,
      password: hashedPassword,
      role,
      profile: {
        age: profile?.age || null,
        gender: profile?.gender || null,
        university: profile?.university || null,
        major: profile?.major || null,
        year: profile?.year || null,
        gpa: profile?.gpa || null,
      },
      enrolled_courses: [],
      certificates: [],
      activity_log: [],
    });

    // Lưu vào database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username (id)
    const user = await User.findOne({ id: username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token with user id and role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with the token and user details
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
