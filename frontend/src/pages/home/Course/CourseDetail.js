import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function CourseDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [course, setCourse] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3008/training?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) throw new Error("Course not found!");
        setCourse(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3008/feedbacks?courseId=${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetail();
    fetchFeedbacks();
  }, [id]);

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
                src={course.img}
                alt={course.name}
                className="object-contain w-full rounded-lg max-h-96"
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-center text-primary">
              {course.title}
            </h1>
            <p className="mb-6 text-lg text-center text-gray-700">
              {course.description}
            </p>
            <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-3">
              <p>
                <span className="font-semibold">{t("Category")}:</span>{" "}
                {course.categorie}
              </p>
              <p>
                <span className="font-semibold">{t("Sub-Category")}:</span>{" "}
                {course.sub_categorie}
              </p>
              <p>
                <span className="font-semibold">{t("Date")}:</span>{" "}
                {course.date}
              </p>
              <p>
                <span className="font-semibold">{t("Rating")}:</span> ⭐{" "}
                {course.trainer.rate} ({course.trainer.totalReview} reviews)
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 mb-6 bg-gray-100 rounded-lg">
              <img
                src={course.trainer.img}
                alt={course.trainer.name}
                className="object-cover w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold">{course.trainer.name}</p>
              </div>
            </div>
            <button
              className="w-full py-3 font-semibold text-white rounded-md bg-primary hover:bg-primary-dark"
              onClick={() => alert("Enrolled successfully!")}
            >
              {t("Enroll Now")}
            </button>
          </div>

          {/* Right Column: Feedback Section */}
          <div className="flex-1 p-8 overflow-y-auto border-l border-gray-200">
            <h2 className="mb-4 text-2xl font-bold">{t("Student Feedback")}</h2>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex gap-4 p-4 mb-4 rounded-lg bg-gray-50"
                >
                  <img
                    src={feedback.profile.img}
                    alt={feedback.profile.name}
                    className="object-cover w-12 h-12 rounded-full"
                    style={{ aspectRatio: "1 / 1" }} // Maintain aspect ratio
                  />
                  <div>
                    <p className="font-semibold">{feedback.profile.name}</p>
                    <p>⭐ {feedback.review}</p>
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No feedback available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseDetail;
