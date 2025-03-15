import { useTranslation } from "react-i18next";
import MainHero from "../../../assets/img/images/main-hero.png";
import "../Home.scss";

function Hero() {
  const { t } = useTranslation();

  return (
    <header className="max-w-screen bg-light-gradient pt-16">
        <div className="mx-auto w-11/12 h-full flex items-center justify-center">
        <div className="h-full flex flex-col justify-center items-start space-y-6 w-full md:w-1/2">
          <h1 className="flex flex-col font-bold text-5xl lg:text-6xl text-black">
            <span>{t("hero.heading1")}</span>
            <span>{t("hero.heading2")}</span>
            <span className="text-primary">{t("hero.heading3")}</span>
          </h1>
          <p className="w-full font-light text-base text-black">
            {t("hero.description")}
          </p>
          <div className="w-full">
            <button className="text-white bg-primary hover:text-gray-light px-auto w-full md:w-2/3 lg:w-1/3 py-3 rounded-md text-sm font-medium">
              {t("hero.button")}
            </button>
          </div>
        </div>
        <div className="h-full hidden md:flex justify-center items-center px-1 md:w-1/2">
          <img
            src={MainHero}
            className="w-full lg:w-3/4 max:h-11/12"
            alt="student holding books"
          />
        </div>
        </div>
    </header>
  );
}

export default Hero;
