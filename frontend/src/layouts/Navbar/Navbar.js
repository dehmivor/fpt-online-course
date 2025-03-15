import { useTranslation } from "react-i18next";

import Logo from "../../assets/img/logo/Logo.png";
import MiniLogo from "../../assets/img/logo/mini-logo.png";
import Search from "../../assets/img/icons/Search.svg";
import Language from "../../assets/img/icons/language.svg";
import PhoneMenu from "../../assets/img/icons/phone-menu.svg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const showNavbar = useSelector((state) => state.ui.showNavbar);
  if (!showNavbar) return null;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-md sticky z-20 top-0 h-16 ">
      <div className="w-11/12 h-full mx-auto flex items-center justify-between">
        <div className="w-1/12 md:w-2/12 flex items-center">
          <img
            className="h-full w-auto object-contain hidden xl:block"
            src={Logo}
            alt="Logo"
          />
          <img
            className="h-full object-contain block xl:hidden"
            src={MiniLogo}
            alt="Logo"
          />
        </div>

        <div className="w-2/12 items-center hidden xl:flex">
          <span className="text-secondary text-center w-full font-semibold">
            {t("navbar.become_one_of_us")}
          </span>
        </div>

        <div className="w-9/12 xl:w-6/12 flex items-center justify-center">
          <div className="w-full h-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={Search} alt="search icon" />
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-3 py-2 rounded-md leading-6 bg-gray-light text-black placeholder-gray"
                placeholder={t("navbar.search_placeholder")}
                type="search"
              />
            </div>
          </div>
        </div>

        <div className="hidden xl:flex items-center justify-end lg:space-x-1 xl:space-x-2 w-2/12">
          <button className="text-white bg-primary hover:text-gray-light max-w-1/2 px-4 xl:px-6 py-3 rounded-md text-sm font-medium">
            {t("navbar.login")}
          </button>
          <button className="bg-transparent border border-primary  text-primary max-w-1/2 px-4 xl:px-5 py-3 rounded-md text-sm font-medium">
            {t("navbar.signup")}
          </button>
        </div>

        <div className="w-1/12 hidden xl:flex justify-end relative">
          <img src={Language} alt="language icon" />
          <select
            className="bg-transparent font-bold text-secondary border-none appearance-none"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option className="text-secondary font-bold" value="en">
              EN
            </option>
            <option className="text-secondary font-bold" value="fr">
              FR
            </option>
          </select>
        </div>
        <div className="w-1/12 flex xl:hidden justify-end relative">
          <img src={PhoneMenu} alt="Menu" className="max-h-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
