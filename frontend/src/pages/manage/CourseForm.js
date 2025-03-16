import React, { useState } from "react";

const CourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    courseEmail: "",
    courseImg: "",
    courseDate: "",
    courseTime: "",
    courseCategory: "",
    courseVideoFile: null,
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation can be added here
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="container p-6 mx-auto max-w-7xl">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary">
        Create New Course
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Course Description
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Course Email</label>
            <input
              type="email"
              name="courseEmail"
              value={formData.courseEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Course Image URL
            </label>
            <input
              type="url"
              name="courseImg"
              value={formData.courseImg}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Course Date</label>
            <input
              type="date"
              name="courseDate"
              value={formData.courseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Course Time</label>
            <input
              type="time"
              name="courseTime"
              value={formData.courseTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Course Category</label>
            <select
              name="courseCategory"
              value={formData.courseCategory}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Upload Video</label>
            <input
              type="file"
              name="courseVideoFile"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Is Active?</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
          </div>
        </div>

        <button
          type="submit"
          className="col-span-2 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
