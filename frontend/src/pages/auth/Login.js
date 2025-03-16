import { useTranslation } from "react-i18next";
import { useState } from "react";
import MainHero from "../../assets/img/images/main-hero1.PNG";

function Login() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    // Xử lý đăng nhập
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-2 max-w-screen bg-light-gradient">
      <div className="flex flex-col items-center justify-center w-11/12 h-full mx-auto md:flex-row">
        {/* Cột bên trái: Tiêu đề và Form đăng nhập */}
        <div className="flex flex-col items-start justify-center w-full h-full space-y-6 md:w-1/2">
          <h1 className="flex flex-col text-5xl font-bold text-black lg:text-6xl">
            <span>Welcome to</span>
            <span className="text-primary">{t("e-learning course")}</span>
          </h1>
          <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
            <input
              type="username"
              placeholder={t("username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-md bg-primary hover:bg-primary-dark"
            >
              {t("submit")}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {t("You have no account ?")}{" "}
              <a
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                {t("signup")}
              </a>
            </span>
          </div>
          <div className="flex justify-center mt-4">
            <select
              className="font-bold bg-transparent border-none appearance-none cursor-pointer text-secondary"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>

        {/* Cột bên phải: Hình ảnh */}
        <div className="items-center justify-center hidden px-1 md:flex md:w-1/2">
          <img
            src={MainHero}
            className="w-full lg:w-3/4 max-h-11/12"
            alt="student holding books"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
