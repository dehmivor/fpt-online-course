import PropTypes from "prop-types";

import Review from "./Review";
import Avatar from "./Avatar";


function Card({data}) {
  return (
    <div
      className="bg-white shadow-xl min-h-full rounded-3xl"
    >
      <div className="h-60 bg-cover bg-center rounded-t-3xl backdrop-sepia-[.25]" style={{ backgroundImage: `url(${data.img})`}}>

      </div>
      <div className="h-auto flex flex-col p-5">
        <div className="flex items-center">
          <Avatar img={data.trainer.img} />
          <div className="flex flex-col pl-2">
            <h2 className="text-gray text-base">{data.trainer.name}</h2>
            <Review stars={data.trainer.rate} totalReview={data.trainer.totalReview} />
          </div>
        </div>
        <h1 className="text-secondary font-medium text-2xl" >{data.title}</h1>
        <p>{data.date}</p>
        <p className="line-clamp-3 text-gray-default font-light text-sm">{data.description}</p>
        <p>
          {data.categorie} . {data.sub_categorie}
        </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    trainer: PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
      totalReview: PropTypes.number.isRequired,
    }).isRequired,
    categorie: PropTypes.string.isRequired,
    sub_categorie: PropTypes.string.isRequired,
    free: PropTypes.bool,
  }),
};

export default Card;
