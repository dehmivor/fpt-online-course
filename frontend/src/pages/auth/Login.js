import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MainHero from "../../assets/img/images/main-hero1.PNG";

function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);

    try {
      const response = await fetch(`http://localhost:5003/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login error:", data.message || data.error);
        if (response.status === 401) {
          toast.error("Invalid username or password");
        } else if (response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(
            data.message ||
              data.error ||
              "An error occurred. Please try again later."
          );
        }
        return;
      }

      // Lưu token vào localStorage
      localStorage.setItem("token", data.token);

      // Lưu thông tin người dùng
      localStorage.setItem("user", JSON.stringify(data.user));

      // Kiểm tra role và điều hướng phù hợp
      const userRole = data.user.role;

      // Hiển thị toast thành công
      toast.success("Login successful!");
      console.log("Login success:", data);

      // Điều hướng dựa trên role
      if (userRole === "admin") {
        navigate("/admin-page");
      } else if (userRole === "student") {
        navigate("/recent");
      } else {
        // Điều hướng mặc định nếu có role khác
        navigate("/recent");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Connection error. Please try again later.");
    }
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
