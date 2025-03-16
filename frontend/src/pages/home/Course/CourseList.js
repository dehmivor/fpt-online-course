import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import Card from "../../../components/Card";

import "../Home.scss";

function CourseList() {
  const { t } = useTranslation();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3008/training");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCourseList(data.map((item) => <Card data={item} key={item.id} />));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
    <section className="flex flex-col items-center justify-center w-11/12 mx-auto">
      <h1 className="my-12 text-5xl font-bold text-center text-primary lg:my-16">
        {t("Course")}
      </h1>
      <div className="hidden w-full grid-cols-4 xl:grid gap-7 place-items-center place-content-between">
        {courseList.length > 0 ? (
          courseList
        ) : (
          <p className="text-center text-gray-500">No courses available.</p>
        )}
      </div>
      <div className="flex items-center justify-center w-full xl:hidden">
        <Slider {...carouselSettings} className="w-full sm:w-2/3 lg:1/2">
          {courseList.length > 0 ? (
            courseList
          ) : (
            <p className="text-center text-gray-500">No courses available.</p>
          )}
        </Slider>
      </div>
    </section>
  );
}

export default CourseList;
