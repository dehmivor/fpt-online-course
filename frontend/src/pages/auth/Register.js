import { useTranslation } from "react-i18next";
import { useState } from "react";
import RegisterImage from "../../assets/img/images/main-hero5.png";

function Register() {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t("Passwords do not match!"));
      return;
    }
    console.log("Name:", name, "Email:", email, "Password:", password);
    // Xử lý đăng ký
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-gradient">
      <div className="flex flex-col-reverse items-center w-11/12 h-full mx-auto md:flex-row">
        {/* Cột bên trái: Hình ảnh */}
        <div className="items-center justify-center hidden w-1/2 md:flex">
          <img
            src={RegisterImage}
            className="w-full lg:w-2/4 max-h-11/12"
            alt="register illustration"
          />
        </div>

        {/* Cột bên phải: Form đăng ký */}
        <div className="flex flex-col items-start justify-center w-full space-y-6 md:w-1/2">
          <h1 className="text-5xl font-bold text-black lg:text-6xl">
            {t("Join Us Today")}
          </h1>
          <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={t("Full Name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder={t("Email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder={t("Password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder={t("Confirm Password")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white rounded-md bg-primary hover:bg-primary-dark"
            >
              {t("Register")}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {t("Already have an account?")}{" "}
              <a
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                {t("Login")}
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
      </div>
    </div>
  );
}

export default Register;
