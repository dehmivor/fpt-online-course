import { useTranslation } from "react-i18next";
import { isMobile } from 'react-device-detect';
import useFetchData from "../../../hooks/useFetchData";
import CategorieCard from "../../../components/CategorieCard";
import "../Home.scss";

function TrainingCategories() {
  const { t } = useTranslation();

  const limit = isMobile ? 4 : 7;

  const renderCategorieCard = (item) => {
    return (
      <CategorieCard 
        key={item.id} 
        id={Number(item.id)} 
        label={item.label} 
        img={item.img} 
        className="w-full" 
      />
    );
  }

  const [categories, loading, error] = useFetchData(`categorie?_limit=${limit}`, renderCategorieCard);

  if (loading) {
    return <p className="text-center text-primary">Loading training categories...</p>;
  }

  if (error) {
    console.error("Error fetching training data:", error);
    return (
      <p className="text-center text-red-500">
        Something went wrong while fetching categories. Please try again later.
      </p>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center mx-auto w-11/12 my-12 lg:my-16">
      <h1 className="text-primary text-center text-5xl font-bold mb-16">
        {t("training-categorie.title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {categories}
        <CategorieCard
          id={-1}
          img="https://img.freepik.com/free-photo/3d-rendering-geometric-shapes_23-2150979656.jpg?t=st=1730033619~exp=1730037219~hmac=06a5db4842e9158023250d84359594b8135845093303a0ca208fdb221f21fa57&w=1380"
          className="w-full"
          label={t("training-categorie.browse-all")}
          seeMore={false}
        />
      </div>
    </section>
  );
}

export default TrainingCategories;
