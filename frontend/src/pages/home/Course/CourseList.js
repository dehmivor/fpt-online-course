import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Card from "../../../components/Card";
import "../Home.scss";

function CourseList() {
  const { t } = useTranslation();
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [trainer, setTrainer] = useState("");
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3008/training");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourseList(data);
        setFilteredCourses(data); // Hiển thị tất cả khóa học ngay từ đầu
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (!searchTerm && !category && !trainer && !subCategory) {
      setFilteredCourses(courseList); // Không có bộ lọc -> hiển thị toàn bộ
      return;
    }

    let filtered = courseList.filter((course) =>
      course.name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter((course) => course.category === category);
    }
    if (trainer) {
      filtered = filtered.filter((course) => course.trainer === trainer);
    }
    if (subCategory) {
      filtered = filtered.filter(
        (course) => course.subCategory === subCategory
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, category, trainer, subCategory, courseList]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error) {
    console.error("Error fetching courses data:", error);
    return (
      <p className="text-center text-red-500">Something went wrong: {error}</p>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center w-11/12 mx-auto my-12 lg:my-16">
      <h1 className="mb-6 text-5xl font-bold text-center text-primary">
        {t("Course")}
      </h1>

      <div className="flex flex-col w-full gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select Category</option>
          {/* Add dynamic category options here */}
        </select>
        <select
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select Trainer</option>
          {/* Add dynamic trainer options here */}
        </select>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select Sub-Category</option>
          {/* Add dynamic sub-category options here */}
        </select>
      </div>

      <div className="hidden w-full grid-cols-4 xl:grid gap-7 place-items-center place-content-between">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((item) => <Card data={item} key={item.id} />)
        ) : (
          <p className="text-center text-gray-500">No courses available.</p>
        )}
      </div>
      <div className="flex items-center justify-center w-full xl:hidden">
        <Slider {...carouselSettings} className="w-full sm:w-2/3 lg:w-1/2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => <Card data={item} key={item.id} />)
          ) : (
            <p className="text-center text-gray-500">No courses available.</p>
          )}
        </Slider>
      </div>
    </section>
  );
}

export default CourseList;
