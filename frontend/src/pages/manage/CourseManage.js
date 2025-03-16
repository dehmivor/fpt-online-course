import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";

function CourseMana() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5003/api/training")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.trainings) {
          setCourses(data.trainings);
          console.log("Courses loaded:", data.trainings);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Xử lý mở modal xem chi tiết
  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsEdit(false);
  };

  // Xử lý mở modal để chỉnh sửa khóa học
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  // Xử lý submit form (thêm/sửa khóa học)
  const handleFormSubmit = (values) => {
    console.log("Form submitted:", values);

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5003/api/training/${selectedCourse._id}`
      : "http://localhost:5003/api/training";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        // Refresh courses after update
        fetch("http://localhost:5003/api/training")
          .then((res) => res.json())
          .then((data) => {
            if (data && data.trainings) {
              setCourses(data.trainings);
            }
          });
      })
      .catch((err) => console.error("Error submitting form:", err));

    setIsModalOpen(false);
  };

  // Xử lý xóa khóa học
  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      fetch(`http://localhost:5003/api/training/${courseId}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Delete response:", data);
          // Remove course from state
          setCourses(courses.filter((course) => course._id !== courseId));
        })
        .catch((err) => console.error("Error deleting course:", err));
    }
  };

  // Custom fullscreen modal component
  const FullscreenModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    // Handle click outside to close
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      >
        <div className="flex flex-col w-full h-full max-w-6xl overflow-hidden bg-white rounded-lg md:w-11/12 md:h-5/6">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary ">
        {t("Course management")}
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            navigate("/create-course"); // Điều hướng đến trang CourseForm
          }}
          className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
        >
          {t("Create New Course")}
        </button>
      </div>

      {/* Bảng hiển thị danh sách khóa học */}
      <Table
        columns={[
          { key: "title", label: t("Title") },
          { key: "date", label: t("Date") },
          {
            key: "trainer",
            label: t("Trainer"),
            renderCell: (val) => val?.name || t("Unknown"),
          },
          { key: "categorie", label: t("Category") },
          { key: "sub_categorie", label: t("Subcategory") },
          {
            key: "actions",
            label: t("Actions"),
            renderCell: (_, row) => (
              <div className="space-x-2">
                <button
                  onClick={() => handleViewDetails(row)}
                  className="px-3 py-2 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light"
                >
                  {t("View")}
                </button>
                <button
                  onClick={() => handleDeleteCourse(row._id)}
                  className="px-3 py-2 text-sm font-medium bg-transparent border rounded-md border-primary text-primary"
                >
                  {t("Delete")}
                </button>
              </div>
            ),
          },
        ]}
        data={courses}
      />

      {/* Modal chi tiết hoặc chỉnh sửa */}
      {isModalOpen && (
        <FullscreenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEdit ? t("Edit Course") : t("Course Details")}
        >
          {isEdit ? (
            <Form
              initialValues={selectedCourse}
              fields={[
                { name: "title", label: t("Title"), required: true },
                { name: "date", label: t("Date"), required: true },
                {
                  name: "description",
                  label: t("Description"),
                  required: true,
                  type: "textarea",
                },
                { name: "categorie", label: t("Category"), required: true },
                {
                  name: "sub_categorie",
                  label: t("Subcategory"),
                  required: true,
                },
                {
                  name: "img",
                  label: t("Image URL"),
                  required: true,
                },
              ]}
              onSubmit={handleFormSubmit}
              submitLabel={isEdit ? t("Update Course") : t("Create Course")}
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              {selectedCourse && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Left column - Course image */}
                    <div className="w-full mb-4 md:w-1/3 md:mb-0">
                      {selectedCourse.img && (
                        <div className="h-64 overflow-hidden rounded-lg">
                          <img
                            src={selectedCourse.img}
                            alt={selectedCourse.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Right column - Course info */}
                    <div className="w-full md:w-2/3">
                      <h2 className="mb-2 text-2xl font-bold">
                        {selectedCourse.title}
                      </h2>
                      <p className="mb-4 text-gray-600">
                        {selectedCourse.date}
                      </p>

                      {/* Trainer info */}
                      <div className="flex items-center p-4 mb-4 space-x-4 rounded-lg bg-gray-50">
                        {selectedCourse.trainer?.img && (
                          <img
                            src={selectedCourse.trainer.img}
                            alt={selectedCourse.trainer.name}
                            className="object-cover w-16 h-16 rounded-full"
                          />
                        )}
                        <div>
                          <p className="text-lg font-medium">
                            {selectedCourse.trainer?.name}
                          </p>
                          {selectedCourse.trainer?.rate && (
                            <div className="flex items-center mt-1">
                              <span className="flex items-center">
                                {Array(Math.round(selectedCourse.trainer.rate))
                                  .fill("⭐")
                                  .join("")}
                                <span className="ml-1 text-gray-700">
                                  ({selectedCourse.trainer.rate}/5)
                                </span>
                              </span>
                              <span className="ml-3 text-sm text-gray-500">
                                {selectedCourse.trainer.totalReview}{" "}
                                {t("reviews")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-md bg-gray-50">
                          <p className="mb-1 text-sm text-gray-500">
                            {t("Category")}
                          </p>
                          <p className="font-medium">
                            {selectedCourse.categorie}
                          </p>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50">
                          <p className="mb-1 text-sm text-gray-500">
                            {t("Subcategory")}
                          </p>
                          <p className="font-medium">
                            {selectedCourse.sub_categorie}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course details section */}
                  <div className="p-4 mt-6 rounded-lg bg-gray-50">
                    <h3 className="mb-2 text-lg font-medium">
                      {t("Course ID")}
                    </h3>
                    <p className="mb-4 font-mono text-gray-700">
                      {selectedCourse._id}
                    </p>

                    <h3 className="mb-2 text-lg font-medium">
                      {t("Description")}
                    </h3>
                    <div className="p-4 mb-4 bg-white rounded-md">
                      <p className="whitespace-pre-line">
                        {selectedCourse.description}
                      </p>
                    </div>

                    <h3 className="mb-2 text-lg font-medium">
                      {t("Image URL")}
                    </h3>
                    <div className="p-4 mb-4 font-mono text-sm break-all bg-white rounded-md">
                      <a
                        href={selectedCourse.img}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {selectedCourse.img}
                      </a>
                    </div>
                  </div>

                  {/* Videos section */}
                  {selectedCourse.videos &&
                    selectedCourse.videos.length > 0 && (
                      <div className="p-4 rounded-lg bg-gray-50">
                        <h3 className="mb-3 text-lg font-medium">
                          {t("Videos")}
                        </h3>
                        <div className="space-y-3">
                          {selectedCourse.videos.map((video) => (
                            <div
                              key={video._id}
                              className="p-4 bg-white rounded-md"
                            >
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">
                                  {video.title}
                                </span>
                                <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
                                  {video.duration}
                                </span>
                              </div>
                              <p className="mb-2 text-sm text-gray-500">
                                {t("Video ID")}:{" "}
                                <span className="font-mono">{video.id}</span>
                              </p>
                              <div className="mt-2 break-all">
                                <p className="mb-1 text-sm text-gray-500">
                                  {t("Video URL")}:
                                </p>
                                <a
                                  href={video.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-mono text-sm text-blue-500 hover:underline"
                                >
                                  {video.url}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Trainer detailed info */}
                  {selectedCourse.trainer && (
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h3 className="mb-3 text-lg font-medium">
                        {t("Trainer Details")}
                      </h3>
                      <div className="p-4 bg-white rounded-md">
                        <p className="mb-1 text-sm text-gray-500">
                          {t("Trainer ID")}
                        </p>
                        <p className="mb-3 font-mono">
                          {selectedCourse.trainer._id}
                        </p>

                        <p className="mb-1 text-sm text-gray-500">
                          {t("Trainer Image URL")}
                        </p>
                        <a
                          href={selectedCourse.trainer.img}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-sm text-blue-500 break-all hover:underline"
                        >
                          {selectedCourse.trainer.img}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </FullscreenModal>
      )}
    </div>
  );
}

export default CourseMana;
