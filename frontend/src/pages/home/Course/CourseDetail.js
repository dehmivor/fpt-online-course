import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [course, setCourse] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [review, setReview] = useState(5);
  const [isEnrolled, setIsEnrolled] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return (
        user.enrolled_courses?.some((course) => course.course_id === id) ||
        false
      );
    }
    return false;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile = JSON.parse(localStorage.getItem("user"));

    if (!profile) {
      return alert("Vui lòng đăng nhập trước khi gửi feedback!");
    }

    const newFeedback = {
      id: Math.floor(Math.random() * 1000),
      review: parseInt(review, 10), // Đảm bảo review là số
      feedback,
      profile: {
        name: profile.name,
        img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera_assets.s3.amazonaws.com/images/a7c5400e51272c78b710ce9b56fd3178.png?auto=format%2Ccompress&dpr=2&w=562&h=221&q=40&fit=crop",
      },
      status: "deactive",
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        "http://localhost:5003/api/feedbacks/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi gửi feedback!");
      }

      const data = await response.json();
      console.log("Feedback đã gửi:", data);
      toast.info("Feedback đã gửi và đang chờ quản trị viên duyệt!");

      // Cập nhật danh sách feedbacks (hãy đảm bảo setFeedbacks được dùng đúng)
      // Kiểm tra data có thuộc tính feedback không
      if (data && data.feedback) {
        // Nếu bạn muốn thêm mới feedback vào danh sách hiện có:
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, data.feedback]);
      }

      // Reset form
      setFeedback("");
      setReview(5);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const enrolled = user.enrolled_courses?.some(
        (course) => course.course_id === id
      );
      setIsEnrolled(enrolled);
    }
  }, [id]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5003/api/training/${id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setCourse(data.training);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5003/api/feedbacks?courseId=${id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const filteredFeedbacks = data.feedbacks.filter(
          (fb) => fb.status === "active"
        );

        setFeedbacks(filteredFeedbacks);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetail();
    fetchFeedbacks();

    // Kiểm tra nếu user đã đăng ký khóa học
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const enrolled = user.enrolled_courses?.some(
        (course) => course.course_id === id
      );
      setIsEnrolled(enrolled);
    }
  }, [id]);

  // Xử lý đăng ký khóa học
  const handleEnroll = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please log in to enroll.");
      // Lưu URL hiện tại trước khi chuyển hướng đến trang login
      localStorage.setItem("previousUrl", window.location.href);
      window.location.href = "/login"; // Điều hướng đến trang login
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    if (!user.id.startsWith("stu_")) {
      alert("Only students can enroll in this course.");
      return;
    }

    setEnrollLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5003/api/users/${user.id}/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: user.id,
            course_id: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Cập nhật localStorage với khóa học mới
      const updatedUser = {
        ...user,
        enrolled_courses: [...(user.enrolled_courses || []), { course_id: id }],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEnrolled(true);
      toast.success("Enrollment successful!");
    } catch (err) {
      toast.error("Already enrolled. Please try again later.");
    } finally {
      setEnrollLoading(false);
    }
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Something went wrong: {error}</p>
    );

  return (
    <section className="w-full min-h-screen p-8 bg-gray-100">
      <div className="h-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col h-full md:flex-row">
          {/* Left Column: Course Image and Details */}
          <div className="flex-1 p-8">
            <div className="flex justify-center mb-6">
              <img
                src={course?.img}
                alt={course?.title}
                className="object-contain w-full rounded-lg max-h-96"
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-center text-primary">
              {course?.title}
            </h1>
            <p className="mb-6 text-lg text-center text-gray-700">
              {course?.description}
            </p>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
              <p>
                <span className="font-semibold">{t("Category")}:</span>{" "}
                {course?.categorie}
              </p>
              <p>
                <span className="font-semibold">{t("Sub-Category")}:</span>{" "}
                {course?.sub_categorie}
              </p>
              <p>
                <span className="font-semibold">{t("Date")}:</span>{" "}
                {course?.date}
              </p>
              <p>
                <span className="font-semibold">{t("Rating")}:</span> ⭐{" "}
                {course?.trainer?.rate} ({course?.trainer?.totalReview} reviews)
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 mb-6 bg-gray-100 rounded-lg">
              <img
                src={course?.trainer?.img}
                alt={course?.trainer?.name}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold">{course?.trainer?.name}</p>
              </div>
            </div>
            <button
              className="w-full py-3 font-semibold text-white rounded-md bg-primary hover:bg-primary-dark"
              onClick={
                isEnrolled ? () => navigate("/course-module") : handleEnroll
              }
              disabled={enrollLoading}
            >
              {enrollLoading
                ? "Processing..."
                : isEnrolled
                ? t("Continue")
                : t("Enroll Now")}
            </button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto border-l border-gray-200">
            <h2 className="mb-4 text-2xl font-bold">{t("Student Feedback")}</h2>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="flex gap-4 p-4 mb-4 rounded-lg bg-gray-50"
                >
                  <img
                    src={feedback.profile.img}
                    alt={feedback.profile.name}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{feedback.profile.name}</p>
                    <p>⭐ {feedback.review}</p>
                    <p className="text-gray-700">{feedback.feedback}</p>
                    <p className="mt-2 italic text-blue-500 sm">
                      {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No feedback available.</p>
            )}

            <h2 className="mb-4 text-2xl font-bold">{t("Your Feedback")}</h2>
            <form
              onSubmit={handleSubmit}
              className="p-4 mt-6 bg-gray-100 rounded-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">
                Gửi phản hồi của bạn
              </h3>
              <select
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-2 mb-2 border rounded-lg"
              >
                <option value={5}>⭐️⭐️⭐️⭐️⭐️ (Tuyệt vời)</option>
                <option value={4}>⭐️⭐️⭐️⭐️ (Tốt)</option>
                <option value={3}>⭐️⭐️⭐️ (Trung bình)</option>
                <option value={2}>⭐️⭐️ (Không tốt)</option>
                <option value={1}>⭐️ (Tệ)</option>
              </select>
              <textarea
                placeholder="Nhập phản hồi của bạn..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 mb-2 border rounded-lg"
              ></textarea>
              <button
                className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
                type="submit"
              >
                Gửi Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;
