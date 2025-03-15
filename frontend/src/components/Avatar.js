import PropTypes from "prop-types";

function Avatar({ img, name, direction = "vertical" }) {
  return (
    <div
      className={`flex items-center ${
        direction === "horizontal" && "flex-col justify-center"
      }`}
    >
      <img
        src={img}
        className="border-2 border-accent-light object-cover rounded-full w-12 h-12"
        alt={`avatar of ${name}`}
      />
      <p>{name}</p>
    </div>
  );
}

Avatar.prototype = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
};

export default Avatar;
