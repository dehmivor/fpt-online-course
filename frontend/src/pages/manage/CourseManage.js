import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Form from "../../components/Form";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";

function CourseMana() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3008/training")
      .then((res) => res.json())
      .then((data) => setCourses(data) && console.log(data))
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
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary ">
        {t("Course management")}
      </h1>

      {/* Bảng hiển thị danh sách khóa học */}
      <Table
        columns={[
          { key: "title", label: "Tiêu đề" },
          { key: "date", label: "Ngày" },
          {
            key: "trainer",
            label: "Giảng viên",
            renderCell: (val) => val.name,
          },
          { key: "categorie", label: "Danh mục" },
          {
            key: "actions",
            label: "Hành động",
            renderCell: (_, row) => (
              <div className="space-x-2">
                <button
                  onClick={() => handleViewDetails(row)}
                  className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
                >
                  Xem
                </button>
                <button
                  onClick={() => handleEditCourse(row)}
                  className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
                >
                  Sửa
                </button>
              </div>
            ),
          },
        ]}
        data={courses}
      />

      {/* Modal chi tiết hoặc chỉnh sửa */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={isEdit ? "Chỉnh sửa khóa học" : "Chi tiết khóa học"}
        >
          {isEdit ? (
            <Form
              fields={[
                { name: "title", placeholder: "Tiêu đề", required: true },
                { name: "date", placeholder: "Ngày", required: true },
                { name: "description", placeholder: "Mô tả", required: true },
                { name: "categorie", placeholder: "Danh mục", required: true },
                {
                  name: "sub_categorie",
                  placeholder: "Danh mục con",
                  required: true,
                },
              ]}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <Card data={selectedCourse} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default CourseMana;
