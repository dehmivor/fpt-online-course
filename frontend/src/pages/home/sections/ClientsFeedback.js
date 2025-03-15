import { useTranslation } from "react-i18next";

import useFetchData from '../../../hooks/useFetchData';

import FeedbackCard from "../../../components/FeedbackCard";
import Slider from "react-slick";

function ClientsFeedback() {
    const { t } = useTranslation();

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    const [feedbackList, loading, error] = useFetchData('feedbacks?_limit=3',
        item => {
            const feedback = {
                ...item,
                id: Number(item.id),
                review: Number(item.review),
            };
            return (
                <FeedbackCard
                    key={feedback.id}
                    review={feedback.review}
                    feedback={feedback.feedback}
                    profile={feedback.profile}
                    className="p-8 w-full lg:p-16 lg:w-1/4"
                />
            );
        });

    if (loading) return <p className="text-center text-primary">Loading...</p>;

    if (error) {
        console.error("Error fetching training data:", error);
        return <p className="text-center text-red-500">Something went wrong: {error}</p>;
    }

    return (
        <section className="flex flex-col justify-center items-center mx-auto my-12 lg:my-16">
            <h1 className="text-primary text-5xl font-bold capitalize my-16">
                {t("feedback.title")}
            </h1>
            <div className="w-full hidden lg:flex items-start justify-between">
                {feedbackList}
            </div>
            <Slider {...carouselSettings} className="w-full lg:hidden sm:w-2/3 lg:1/2">
            {feedbackList}
            </Slider>
        </section>
    )
}

export default ClientsFeedback;