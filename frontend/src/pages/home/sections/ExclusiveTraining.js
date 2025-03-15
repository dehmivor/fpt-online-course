import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import useFetchData from '../../../hooks/useFetchData';
import Card from "../../../components/Card";

import "../Home.scss";


function ExclusiveTraining() {
  const { t } = useTranslation();

  const [trainingList, loading, error] = useFetchData('training?_limit=4',
    item =>{
      const training = {
        ...item,
        id: Number(item.id),
        trainer: {
          ...item.trainer,
          rate: Number(item.trainer.rate),
          totalReview: Number(item.trainer.totalReview)
        }
      };
      return <Card data={training} key={training.id} />
    }
  );

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error) {
    console.error("Error fetching training data:", error);
    return <p className="text-center text-red-500">Something went wrong: {error}</p>;
  }

  return (
    <section className="flex flex-col justify-center items-center w-11/12 mx-auto">
      <h1 className="text-primary text-5xl text-center font-bold my-12 lg:my-16">
        {t("exclusive_training.title")}
      </h1>
      <div className="w-full hidden xl:grid grid-cols-4 gap-7 place-items-center place-content-between">
        {trainingList.length > 0 ? trainingList : (
          <p className="text-center text-gray-500">No training data available.</p>
        )}
      </div>
      <div className="w-full flex justify-center items-center xl:hidden">
      <Slider {...carouselSettings} className="w-full sm:w-2/3 lg:1/2">
      {trainingList.length > 0 ? trainingList : (
          <p className="text-center text-gray-500">No training data available.</p>
        )}
      </Slider>
      </div>
    </section>
  );
}

export default ExclusiveTraining;
