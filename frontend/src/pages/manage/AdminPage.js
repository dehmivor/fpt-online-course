import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
        <button
          className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
          onClick={() => navigate("/user-mana")}
        >
          <h2 className="text-xl font-semibold text-center text-gray-700">
            User Management
          </h2>
        </button>
        <button
          className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
          onClick={() => navigate("/course-mana")}
        >
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Course Management
          </h2>
        </button>
        <button
          className="px-4 py-3 text-sm font-medium text-white rounded-md bg-primary hover:text-gray-light max-w-1/2 xl:px-6"
          onClick={() => navigate("/feedbacks-mana")}
        >
          <h2 className="text-xl font-semibold text-center text-gray-700">
            Feedback Management
          </h2>
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
