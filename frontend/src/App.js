import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./styles/main.scss";
import Notfound from "./pages/errors/Notfound";
import Layout from "./layouts/Layout";
import { Helmet } from "react-helmet";

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
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
