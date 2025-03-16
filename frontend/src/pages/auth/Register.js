import { useTranslation } from "react-i18next";
import { useState } from "react";
import RegisterImage from "../../assets/img/images/main-hero5.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [gpa, setGpa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra xem username có hợp lệ không
    if (!username || username.trim() === "") {
      toast.error(t("Username is required"));
      return;
    }

    // Kiểm tra xem password có khớp không
    if (password !== confirmPassword) {
      alert(t("Passwords do not match!"));
      return;
    }

    // Prepare the data to send in the body
    const requestData = {
      username: username.trim(), // Loại bỏ khoảng trắng
      name: name.trim(), // Loại bỏ khoảng trắng
      email: email.trim(), // Loại bỏ khoảng trắng
      password: password,
      role: role,
      profile: {
        age: age,
        gender: gender,
        university: university.trim(), // Loại bỏ khoảng trắng
        major: major.trim(), // Loại bỏ khoảng trắng
        year: year,
        gpa: gpa.trim(), // Loại bỏ khoảng trắng
      },
    };

    // Make the API call
    fetch("http://localhost:5003/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json(); // Lấy dữ liệu lỗi từ API
          throw new Error(errorData.error || "Registration failed"); // Lấy thông báo lỗi từ API nếu có
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);
        toast.success(t("Registration successful!"));
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        toast.error(
          t(error.message || "An error occurred. Please try again later.")
        );
      });
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
            {/* Full Name and Username in one row */}
            <div className="flex mb-4 space-x-4">
              <input
                type="text"
                placeholder={t("Full Name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder={t("Username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Email and Password in one row */}
            <div className="flex mb-4 space-x-4">
              <input
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
              <input
                type="password"
                placeholder={t("Password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Confirm Password and Age in one row */}
            <div className="flex mb-4 space-x-4">
              <input
                type="password"
                placeholder={t("Confirm Password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
              <input
                type="number"
                placeholder={t("Age")}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Gender and University in one row */}
            <div className="flex mb-4 space-x-4">
              <input
                type="text"
                placeholder={t("Gender")}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
              <input
                type="text"
                placeholder={t("University")}
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Major and Year in one row */}
            <div className="flex mb-4 space-x-4">
              <input
                type="text"
                placeholder={t("Major")}
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
              <input
                type="number"
                placeholder={t("Year")}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="block w-1/2 p-3 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

            {/* GPA in one row */}
            <div className="mb-4">
              <input
                type="text"
                placeholder={t("GPA")}
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                required
                className="block w-full p-3 mb-4 border rounded-md shadow-sm focus:ring focus:ring-primary focus:outline-none"
              />
            </div>

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
