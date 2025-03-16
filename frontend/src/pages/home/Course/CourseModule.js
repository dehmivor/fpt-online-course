import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseModule = () => {
  const { courseId } = useParams(); // Lấy khóa học ID từ URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch thông tin khóa học và các video bài giảng
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:3008/training?id=1`);
        const data = await response.json();

        console.log(data); // Kiểm tra dữ liệu trả về từ API

        if (data && data.length > 0) {
          setCourse(data[0]); // Lấy phần tử đầu tiên nếu API trả về mảng
        }
        setLoading(false); // Đã tải xong
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (loading) {
    return <div>Loading course content...</div>;
  }

  if (!course) {
    return <div>No course found.</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-semibold">{course.title}</h2>
      <div className="space-y-4">
        {course.videos?.map((video) => (
          <div key={video.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-500">Duration: {video.duration}</p>
            <video controls className="w-full h-64 mt-2">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseModule;
