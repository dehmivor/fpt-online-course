import { useTranslation } from "react-i18next";
import Logo from "../../assets/img/logo/Logo.png";
import SearchIcon from "../../assets/img/icons/Search.svg";
import LanguageIcon from "../../assets/img/icons/language.svg";
import PhoneMenuIcon from "../../assets/img/icons/phone-menu.svg";
import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null); // Reference for the search area
  const resultsRef = useRef(null); // Reference for the results dropdown

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(
            `http://localhost:3008/training?search=${searchTerm}`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setResults([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelect = (id) => {
    console.log("Selected course with id:", id);
    navigate(`/course/${id}`);
  };

  // Function to handle click outside of search area
  const handleClickOutside = (e) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target) &&
      resultsRef.current &&
      !resultsRef.current.contains(e.target)
    ) {
      setResults([]); // Hide the search results
    }
  };

  useEffect(() => {
    // Add event listener to detect click outside
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const showNavbar = useSelector((state) => state.ui.showNavbar);
  if (!showNavbar) return null;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="sticky top-0 z-20 h-16 bg-white shadow-md">
      <div className="flex items-center justify-between w-11/12 h-full mx-auto">
        <div className="flex items-center w-1/12 md:w-2/12">
          <img
            className="hidden object-contain w-auto h-full cursor-pointer xl:block"
            onClick={() => (window.location.href = "http://localhost:3007/")}
            src={Logo}
            alt="Logo"
          />
        </div>

        <div
          className="items-center hidden w-2/12 cursor-pointer xl:flex"
          onClick={() =>
            (window.location.href = "http://localhost:3007/course")
          }
        >
          <span className="w-full font-semibold text-center text-secondary">
            {t("navbar.become_one_of_us")}
          </span>
        </div>

        {/* Search Bar Section */}
        <div
          className="flex items-center justify-center w-9/12 xl:w-6/12"
          ref={searchRef}
        >
          <div className="w-full h-full">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img src={SearchIcon} alt="search icon" />
              </div>
              <input
                id="search"
                className="block w-full py-2 pl-10 pr-3 leading-6 text-black rounded-md bg-gray-light placeholder-gray"
                placeholder="Tìm kiếm khóa học..."
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {results.length > 0 && (
                <ul
                  className="absolute z-10 w-full bg-white border border-gray-300 rounded-md"
                  ref={resultsRef}
                >
                  {results.map((item) => (
                    <li
                      key={item.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSelect(item.id)}
                    >
                      <div className="flex items-center">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-10 h-10 mr-2 rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="items-center justify-end hidden w-2/12 xl:flex lg:space-x-1 xl:space-x-2">
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3007/login")
            }
            className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
          >
            {t("navbar.login")}
          </button>
          <button
            onClick={() =>
              (window.location.href = "http://localhost:3007/register")
            }
            className="px-4 py-3 text-sm font-medium bg-transparent border rounded-md border-primary text-primary max-w-1/2 xl:px-5"
          >
            {t("navbar.signup")}
          </button>
        </div>

        {/* Language Selector */}
        <div className="relative justify-end hidden w-1/12 xl:flex">
          <img src={LanguageIcon} alt="language icon" />
          <select
            className="font-bold bg-transparent border-none appearance-none text-secondary"
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option className="font-bold text-secondary" value="en">
              EN
            </option>
            <option className="font-bold text-secondary" value="fr">
              FR
            </option>
          </select>
        </div>

        {/* Mobile Menu Icon */}
        <div className="relative flex justify-end w-1/12 xl:hidden">
          <img src={PhoneMenuIcon} alt="Menu" className="max-h-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
