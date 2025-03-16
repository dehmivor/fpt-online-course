import { useTranslation } from "react-i18next";
import MainHero from "../../../assets/img/images/main-hero.png";
import "../Home.scss";
import { useEffect, useState } from "react";

function Hero() {
  const { t } = useTranslation();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setRole(parsedUser.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <header className="pt-16 max-w-screen bg-light-gradient">
      <div className="flex items-center justify-center w-11/12 h-full mx-auto">
        <div className="flex flex-col items-start justify-center w-full h-full space-y-6 md:w-1/2">
          <h1 className="flex flex-col text-5xl font-bold text-black lg:text-6xl">
            <span>{t("hero.heading1")}</span>
            <span>{t("hero.heading2")}</span>
            <span className="text-primary">{t("hero.heading3")}</span>
          </h1>
          <p className="w-full text-base font-light text-black">
            {t("hero.description")}
          </p>
          <div className="w-full">
            {role === "student" ? (
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3007/recent";
                }}
                type="button"
                className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light"
              >
                {t("View recent course")}
              </button>
            ) : role === "admin" ? (
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3007/admin-page";
                }}
                type="button"
                className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light"
              >
                {t("Admin dashboard")}
              </button>
            ) : null}
          </div>
        </div>
        <div className="items-center justify-center hidden h-full px-1 md:flex md:w-1/2">
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
