import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Card from "../../../components/Card";
import "../Home.scss";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categorie, setCategorie] = useState("");
  const [trainer, setTrainer] = useState("");
  const [subCategorie, setSubCategorie] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/training");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Extract trainings array from the response
        const trainings = data.trainings || [];
        setCourseList(trainings);
        setFilteredCourses(trainings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courseList];

    if (searchTerm) {
      filtered = filtered.filter((course) =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categorie) {
      filtered = filtered.filter(
        (course) => course.categorie?.toLowerCase() === categorie.toLowerCase()
      );
    }
    if (trainer) {
      filtered = filtered.filter(
        (course) =>
          course.trainer?.name?.toLowerCase() === trainer.toLowerCase()
      );
    }
    if (subCategorie) {
      filtered = filtered.filter(
        (course) =>
          course.sub_categorie?.toLowerCase() === subCategorie.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  }, [searchTerm, categorie, trainer, subCategorie, courseList]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategorie("");
    setTrainer("");
    setSubCategorie("");
    setFilteredCourses([...courseList]); // Ensure immediate update with all courses
  };

  // Generate unique categories from the data
  const uniqueCategories = [
    ...new Set(courseList.map((course) => course.categorie)),
  ].filter(Boolean);

  // Generate unique trainers from the data
  const uniqueTrainers = [
    ...new Set(courseList.map((course) => course.trainer?.name)),
  ].filter(Boolean);

  // Generate unique sub-categories from the data
  const uniqueSubCategories = [
    ...new Set(courseList.map((course) => course.sub_categorie)),
  ].filter(Boolean);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error) {
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
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select categorie</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select Trainer</option>
          {uniqueTrainers.map((trainer) => (
            <option key={trainer} value={trainer}>
              {trainer}
            </option>
          ))}
        </select>
        <select
          value={subCategorie}
          onChange={(e) => setSubCategorie(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md md:w-1/4"
        >
          <option value="">Select Sub-categorie</option>
          {uniqueSubCategories.map((subCat) => (
            <option key={subCat} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>
        <button
          onClick={handleResetFilters}
          className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
        >
          Clear Filters
        </button>
      </div>

      <div className="hidden w-full grid-cols-4 xl:grid gap-7 place-items-center place-content-between">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/course/${item.id}`)}
              className="cursor-pointer"
            >
              <Card data={item} />
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No courses available.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center w-full xl:hidden">
        <Slider {...carouselSettings} className="w-full sm:w-2/3 lg:w-1/2">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/course/${item.id}`)}
                className="cursor-pointer"
              >
                <Card data={item} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No courses available.</p>
          )}
        </Slider>
      </div>
    </section>
  );
}

export default CourseList;
