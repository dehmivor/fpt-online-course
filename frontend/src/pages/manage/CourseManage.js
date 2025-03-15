import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Table from "../../components/Table";
import Form from "../../components/Form";
import Card from "../../components/Card";

function CourseMana() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3005/training")
      .then((res) => res.json())
      .then((data) => setCourses(data))
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
      <h1 className="mb-4 text-3xl font-bold">Quản lý khóa học</h1>

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
                  className="text-blue-500"
                >
                  Xem
                </button>
                <button
                  onClick={() => handleEditCourse(row)}
                  className="text-yellow-500"
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
