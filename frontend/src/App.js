import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./styles/main.scss";
import Notfound from "./pages/errors/Notfound";
import Layout from "./layouts/Layout";
import { Helmet } from "react-helmet";
import CourseMana from "./pages/manage/CourseManage";
import UserManage from "./pages/manage/UserManage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CourseList from "./pages/home/Course/CourseList";
import CourseDetail from "./pages/home/Course/CourseDetail";
import RecentCourse from "./pages/home/Course/RecentCourse";
import CourseModule from "./pages/home/Course/CourseModule";
import CourseForm from "./pages/manage/CourseForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/manage/AdminPage";
import FeedbackManage from "./pages/manage/FeedbackManage";

function App() {
  return (
    <>
      <Helmet>
        <title>RiseMaster - Open Source E-Learning Platform</title>
        <meta
          name="description"
          content="RiseMaster is an open-source template for e-learning platforms offering modern designs and flexible features to enhance online learning experiences."
        />
        <meta
          name="keywords"
          content="e-learning, online courses, educational website, React, open-source, learning platform, modern design, online learning"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Iheb Mejri" />
        <meta name="copyright" content="RiseMaster" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://risemaster.ihebmejri.com" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://risemaster.ihebmejri.com" />
        <meta
          property="og:title"
          content="RiseMaster - Open Source E-Learning Platform"
        />
        <meta
          property="og:description"
          content="RiseMaster is an open-source template for e-learning platforms offering modern designs and flexible features to enhance online learning experiences."
        />
        <meta
          property="og:image"
          content="https://risemaster.ihebmejri.com/preview-image.webp"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="RiseMaster - Open Source E-Learning Platform"
        />
        <meta
          name="twitter:description"
          content="RiseMaster is an open-source template for e-learning platforms offering modern designs and flexible features to enhance online learning experiences."
        />
        <meta
          name="twitter:image"
          content="https://risemaster.ihebmejri.com/preview-image.webp"
        />
      </Helmet>
      <BrowserRouter>
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/course-mana" element={<CourseMana />} />
            <Route path="/user-mana" element={<UserManage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/recent" element={<RecentCourse />} />
            <Route path="/course-module" element={<CourseModule />} />
            <Route path="/create-course" element={<CourseForm />} />
            <Route path="/feedbacks-mana" element={<FeedbackManage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
