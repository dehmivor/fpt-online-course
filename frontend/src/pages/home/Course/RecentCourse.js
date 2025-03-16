import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecentCourse = () => {
  const [user, setUser] = useState(null); // Thông tin sinh viên
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Chuyển JSON string thành object
    }
    setLoading(false); // Đã tải xong
  }, []);

  // Điều hướng đến trang khóa học chi tiết
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Nếu đang tải, hiển thị thông báo loading
  if (loading) {
    return (
      <div className="py-10 text-center">
        <p>Loading your courses...</p>
      </div>
    );
  }

  // Nếu không có dữ liệu hoặc không có khóa học nào
  if (!user || !user.enrolled_courses || user.enrolled_courses.length === 0) {
    return (
      <div className="py-10 text-center">
        <p>You are not enrolled in any courses at the moment.</p>
      </div>
    );
  }

  // Hàm lấy màu thanh tiến độ dựa trên % hoàn thành
  const getProgressColor = (progress) => {
    if (progress <= 50) return "bg-red-500"; // Đỏ nếu tiến độ <= 50%
    if (progress <= 80) return "bg-yellow-500"; // Vàng nếu tiến độ <= 80%
    return "bg-green-500"; // Xanh nếu tiến độ > 80%
  };

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">Recent Courses</h2>
      <div className="space-y-4">
        {user.enrolled_courses.map((course) => (
          <div
            key={course.course_id}
            className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleCourseClick(course.course_id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Course ID: {course.course_id}
                </h3>
                <p className="text-sm text-gray-500">
                  Progress: {course.progress}%
                </p>
                <p className="text-sm text-gray-500">
                  Status: {course.completed ? "Completed" : "In Progress"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Progress</p>
                <div className="relative w-32 h-3 bg-gray-200 rounded-full">
                  <div
                    className={`absolute top-0 left-0 h-3 ${getProgressColor(
                      course.progress
                    )} rounded-full`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{course.progress}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCourse;
