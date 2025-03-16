import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";

function CourseMana() {
  const { t } = useTranslation();
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
    console.log("Selected course for edit:", course);
    setSelectedCourse(course);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  // Xử lý submit form (thêm/sửa khóa học)
  const handleFormSubmit = (values) => {
    console.log("Form submitted:", values);
    console.log("isEdit:", isEdit, "selectedCourse:", selectedCourse);

    if (!isEdit || !selectedCourse?.id) {
      console.error("Update failed: No course selected.");
      alert("Update failed: No course selected.");
      return;
    }

    const url = `http://localhost:5003/api/training/${selectedCourse._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update course");
        }
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data);
        alert("Course updated successfully: " + JSON.stringify(data));

        // Refresh courses after update
        return fetch("http://localhost:5003/api/training");
      })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.trainings) {
          setCourses(data.trainings);
        }
      })
      .catch((err) => {
        console.error("Error updating course:", err);
        alert("Error updating course: " + err.message);
      });

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

      {isModalOpen && (
        <FullscreenModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEdit(false); // Reset về chế độ xem chi tiết khi đóng modal
          }}
          title={isEdit ? t("Edit Course") : t("Course Details")}
        >
          {isEdit ? (
            // Chế độ chỉnh sửa: hiển thị form với dữ liệu khởi tạo và label
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-4 text-2xl font-bold text-center">
                {t("Edit Course")}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    {t("Title")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse?.title || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {t("Date")}
                  </label>
                  <input
                    type="date"
                    value={selectedCourse?.date || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {t("Description")}
                  </label>
                  <textarea
                    value={selectedCourse?.description || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {t("Category")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse?.categorie || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        categorie: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {t("Subcategory")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse?.sub_categorie || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        sub_categorie: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    {t("Image URL")}
                  </label>
                  <input
                    type="text"
                    value={selectedCourse?.img || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        img: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
                  >
                    {t("Update Course")}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            // Chế độ xem chi tiết: hiển thị dữ liệu cùng với nhãn cho từng thông tin
            <div className="max-w-4xl mx-auto">
              {selectedCourse && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Cột bên trái - Ảnh khóa học */}
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

                    {/* Cột bên phải - Thông tin khóa học */}
                    <div className="w-full md:w-2/3">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">{t("Title")}:</p>
                        <h2 className="text-2xl font-bold">
                          {selectedCourse.title}
                        </h2>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">{t("Date")}:</p>
                        <p className="text-gray-600">{selectedCourse.date}</p>
                      </div>
                      {/* Thông tin huấn luyện viên */}
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
                      {/* Danh mục */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-3 rounded-md bg-gray-50">
                          <p className="text-sm text-gray-500">
                            {t("Category")}
                          </p>
                          <p className="font-medium">
                            {selectedCourse.categorie}
                          </p>
                        </div>
                        <div className="p-3 rounded-md bg-gray-50">
                          <p className="text-sm text-gray-500">
                            {t("Subcategory")}
                          </p>
                          <p className="font-medium">
                            {selectedCourse.sub_categorie}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phần chi tiết khóa học */}
                  <div className="p-4 mt-6 rounded-lg bg-gray-50">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">{t("Course ID")}:</p>
                      <p className="mb-4 font-mono text-gray-700">
                        {selectedCourse._id}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        {t("Description")}:
                      </p>
                      <div className="p-4 bg-white rounded-md">
                        <p className="whitespace-pre-line">
                          {selectedCourse.description}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">{t("Image URL")}:</p>
                      <div className="p-4 font-mono text-sm break-all bg-white rounded-md">
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
                  </div>

                  {/* Nút chuyển sang chế độ chỉnh sửa */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsEdit(true)}
                      className="px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary-dark"
                    >
                      {t("Update")}
                    </button>
                  </div>
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
