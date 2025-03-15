import PropTypes from 'prop-types';

function Review({ stars, totalStars = 5, totalReview }) {
  const paths = Array(totalStars).fill("M10 16.0737L16.18 20L14.54 12.6L20 7.62105L12.81 6.96842L10 0L7.19 6.96842L0 7.62105L5.45 12.6L3.82 20L10 16.0737Z");

  return (
    <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="116"
        height="20"
        viewBox="0 0 116 20"
        fill="none"
        role="img"
        aria-label={`Rating: ${stars} out of ${totalStars}`}
        className="inline-block"
      >
        {paths.map((star, index) => (
          <path
            key={index}
            d={star}
            transform={`translate(${index * 24}, 0)`}
            className={index < stars ? "fill-primary" : "fill-accent-default"} 
          />
        ))}
      </svg>
      {totalReview && (
        <span className="text-accent-default text-base ml-2">
          ({totalReview})
        </span>
      )}
    </div>
  );
}

Review.propTypes = {
  stars: PropTypes.number.isRequired,
  totalStars: PropTypes.number,
  totalReview: PropTypes.number,
};

export default Review;
