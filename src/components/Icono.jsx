import PropTypes from "prop-types";

const Icono = ({ icon }) => {
  return <img src={`${icon}.png`} alt={`${icon}`} />;
};

export default Icono;

Icono.propTypes = {
  icon: PropTypes.string.isRequired
}