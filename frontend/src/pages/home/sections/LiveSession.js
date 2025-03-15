import { useTranslation } from "react-i18next";
import useFetchData from "../../../hooks/useFetchData";
import playIcon from "../../../assets/img/icons/play-Icon.svg";

const LiveSession = () => {
  const { t } = useTranslation();
  const [session, loading, error] = useFetchData("liveSession");

  if (loading) return <p className="text-center text-primary">Loading...</p>;

  if (error) {
    console.error("Error fetching training data:", error);
    return (
      <p className="text-center text-red-500">Something went wrong: {error}</p>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center py-12 xl:py-14 px-5 md:px-11 my-16 mx-auto
    lg:flex-row w-full lg:w-11/12 lg:mx-auto lg:rounded-2xl bg-primary-gradient">
      <div className="flex flex-col justify-center lg:h-full w-full space-y-11 lg:w-5/12">
        <h1 className="w-full text-white text-5xl font-bold capitalize">
          {t("live-session.live")}: {session.title}
        </h1>
        <p className="w-full text-white text-xs lg:mb-11 lg:mt-3">
          {session.description}
        </p>
        <button className="hidden lg:flex items-center justify-center text-primary bg-gray-light py-3 text-sm font-medium rounded w-1/2">
          {t("live-session.join-session")}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="#673AB7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="py-5 flex items-center justify-center w-full lg:w-5/12">
        <div
          className="w-full lg:w-5/6 h-3/5 my-5 flex flex-col rounded-md border-2 border-white bg-cover bg-no-repeat bg-center live-session-image min-h-80 relative"
          style={{ backgroundImage: `url(${session.img})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md z-0"></div>

          <div className="flex items-center justify-self-start self-end justify-end p-3 z-10">
            <span className="live-dot inline-block relative bg-red rounded-full z-10"></span>
            <p className="pl-2 capitalize text-xl text-red">
              {t("live-session.live")}
            </p>
          </div>

          <div className="flex items-center justify-center flex-grow pb-10 z-10">
            <img
              src={playIcon}
              className="cursor-pointer"
              alt="play icon in circle"
            />
          </div>
        </div>
      </div>
      <button className="flex lg:hidden items-center justify-center text-primary bg-gray-light py-3 text-sm font-medium rounded w-full">
        {t("live-session.join-session")}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="#673AB7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
};

export default LiveSession;
