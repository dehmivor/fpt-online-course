import Hero from "./sections/Hero";
import ExclusiveTraining from "./sections/ExclusiveTraining";
import LiveSession from "./sections/LiveSession";
import TrainingCategories from "./sections/TrainingCategories";
import ClientsFeedback from "./sections/ClientsFeedback";
import NewsLetter from "../../components/Newsletter";

import "./Home.scss";

function Home() {
  return (
    <>
      <Hero />
      <ExclusiveTraining />
      <LiveSession />
      <TrainingCategories />
      <NewsLetter />
      <ClientsFeedback />
    </>
  );
}

export default Home;
