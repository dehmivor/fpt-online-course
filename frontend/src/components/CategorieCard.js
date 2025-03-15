import { useTranslation } from "react-i18next"; 
import PropTypes from "prop-types";

import "./style/CategorieCard.scss";

function CategorieCard({ id, label, img, seeMore = true, className }) {
  
  const { t } = useTranslation();
  
  return (
    <div
      key={id}
      className={`flex flex-col p-8 justify-center shadow-xl min-h-full rounded-3xl categorie ${className}`}
      style={{ backgroundImage: `url(${img})` }}
    >
      {seeMore ? (
        <>
          <h5 className="text-white font-semibold">{label}</h5>
          <span className="text-white flex items-center">
            <small>{ t('training-categorie.see-more') }</small>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </>
      ) : (
        <div className="text-white flex justify-center items-center">
          <h5 className="font-semibold text-xl">
            {label}
          </h5>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </div>
      )}
    </div>
  );
}

CategorieCard.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  seeMore: PropTypes.bool,
};

export default CategorieCard;
