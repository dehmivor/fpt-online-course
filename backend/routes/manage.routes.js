const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  // Assuming you have authentication middleware that adds user info to req
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

// Apply admin verification to all routes
router.use(verifyAdmin);

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new user
router.post("/create", async (req, res) => {
  const { id, name, username, email, password, role, profile } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create new user
    const newUser = new User({
      id,
      name,
      username,
      email,
      password, // Note: In production, password should be hashed before saving
      role,
      profile,
      enrolled_courses: [],
      certificates: [],
      activity_log: [],
    });

    await newUser.save();

    // Return user without password
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Remove password from updates if it exists (should use a dedicated endpoint for password changes)
    if (updates.password) {
      delete updates.password;
    }

    // If updating username or email, check for duplicates
    if (updates.username || updates.email) {
      const duplicateCheck = await User.findOne({
        $and: [{ id: { $ne: userId } }, { $or: [] }],
      });

      if (updates.username) {
        duplicateCheck.$and[1].$or.push({ username: updates.username });
      }

      if (updates.email) {
        duplicateCheck.$and[1].$or.push({ email: updates.email });
      }

      if (duplicateCheck) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ id: req.params.id });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add course to user
router.post("/:id/courses", async (req, res) => {
  try {
    const { course_id, progress = 0, completed = false } = req.body;

    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if course already exists in user's enrolled courses
    const courseExists = user.enrolled_courses.some(
      (course) => course.course_id === course_id
    );

    if (courseExists) {
      return res
        .status(400)
        .json({ message: "User already enrolled in this course" });
    }

    // Add course to user's enrolled courses
    user.enrolled_courses.push({
      course_id,
      progress,
      completed,
    });

    // Add activity log entry
    user.activity_log.push({
      timestamp: new Date().toISOString(),
      action: "course_enrollment",
      course_id,
    });

    await user.save();

    res.status(200).json({
      message: "Course added to user successfully",
      enrolled_courses: user.enrolled_courses,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user course progress
router.put("/:id/courses/:courseId", async (req, res) => {
  try {
    const { progress, completed } = req.body;
    const userId = req.params.id;
    const courseId = req.params.courseId;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find course index
    const courseIndex = user.enrolled_courses.findIndex(
      (course) => course.course_id === courseId
    );

    if (courseIndex === -1) {
      return res
        .status(404)
        .json({ message: "Course not found in user's enrolled courses" });
    }

    // Update course progress
    if (progress !== undefined) {
      user.enrolled_courses[courseIndex].progress = progress;
    }

    if (completed !== undefined) {
      user.enrolled_courses[courseIndex].completed = completed;
    }

    // Add activity log entry
    user.activity_log.push({
      timestamp: new Date().toISOString(),
      action: "progress_update",
      course_id: courseId,
    });

    await user.save();

    res.status(200).json({
      message: "Course progress updated successfully",
      course: user.enrolled_courses[courseIndex],
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove course from user
router.delete("/:id/courses/:courseId", async (req, res) => {
  try {
    const userId = req.params.id;
    const courseId = req.params.courseId;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find course index
    const courseIndex = user.enrolled_courses.findIndex(
      (course) => course.course_id === courseId
    );

    if (courseIndex === -1) {
      return res
        .status(404)
        .json({ message: "Course not found in user's enrolled courses" });
    }

    // Remove course
    user.enrolled_courses.splice(courseIndex, 1);

    // Add activity log entry
    user.activity_log.push({
      timestamp: new Date().toISOString(),
      action: "course_unenrollment",
      course_id: courseId,
    });

    await user.save();

    res.status(200).json({
      message: "Course removed from user successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add certificate to user
router.post("/:id/certificates", async (req, res) => {
  try {
    const { certificate_id, course_id, issued_date } = req.body;

    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if certificate already exists
    const certificateExists = user.certificates.some(
      (cert) => cert.certificate_id === certificate_id
    );

    if (certificateExists) {
      return res
        .status(400)
        .json({ message: "Certificate already exists for this user" });
    }

    // Add certificate
    user.certificates.push({
      certificate_id,
      course_id,
      issued_date,
    });

    // Add activity log entry
    user.activity_log.push({
      timestamp: new Date().toISOString(),
      action: "certificate_issued",
      course_id,
    });

    await user.save();

    res.status(200).json({
      message: "Certificate added to user successfully",
      certificates: user.certificates,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user activity log
router.get("/:id/activity", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).select(
      "activity_log"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      activity_log: user.activity_log,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put("/:id/profile", async (req, res) => {
  try {
    const userId = req.params.id;
    const profileUpdates = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $set: { profile: profileUpdates } },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile updated successfully",
      profile: updatedUser.profile,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
