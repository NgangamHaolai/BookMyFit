import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logoWhite from "../../images/logo/l5.png";
import logoBlack from "../../images/logo/l4.png";

function Logo({ size = "w-48", height = "h-auto", type = "white" }) {
  return (
    <Link to="/" className="focus inline-block">
      <img
        src={type === "black" ? logoBlack : logoWhite}
        alt="bookmyfit logo"
        className={`${height} ${size} block`} // Added 'block' to prevent inline spacing
      />
    </Link>
  );
}

// Adding PropTypes for better type checking
Logo.propTypes = {
  size: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.oneOf(["white", "black"]),
};

// Default props
Logo.defaultProps = {
  size: "w-32",
  height: "h-auto",
  type: "white",
};

export default Logo;
