import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentCourse = () => {
  const [user, setUser] = useState(null); // Thông tin sinh viên
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch thông tin sinh viên
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Giả sử API này trả về thông tin sinh viên
        const response = await fetch("http://localhost:3008/users/stu_001");
        const data = await response.json();

        setUser(data); // Lưu thông tin sinh viên vào state
        setLoading(false); // Đã tải xong
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Điều hướng đến trang khóa học chi tiết
  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  // Nếu chưa có thông tin sinh viên hoặc đang tải, hiển thị thông báo
  if (loading) {
    return (
      <div className="py-10 text-center">
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (!user || user.enrolled_courses.length === 0) {
    return (
      <div className="py-10 text-center">
        <p>You are not enrolled in any courses at the moment.</p>
      </div>
    );
  }

  // Hàm để lấy màu thanh tiến độ dựa trên tiến độ
  const getProgressColor = (progress) => {
    if (progress <= 50) {
      return "bg-red-500"; // Màu đỏ nếu tiến độ <= 50%
    } else if (progress <= 80) {
      return "bg-yellow-500"; // Màu vàng nếu tiến độ <= 80%
    } else {
      return "bg-green-500"; // Màu xanh lá nếu tiến độ > 80%
    }
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
              <div className="flex items-center space-x-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCourse;
