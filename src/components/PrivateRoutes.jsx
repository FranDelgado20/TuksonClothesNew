import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children, role }) => {
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const roleSSt = JSON.parse(sessionStorage.getItem("role"));

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: "No tienes permisos para acceder a esta sección",
        showConfirmButton: false,
        timer: 3000,
      });

      navigate("/");
    } else if (role !== roleSSt) {
      if (roleSSt === "admin") {
        navigate("/administrador");
      } else {
        navigate("/");
      }
    }
  }, [navigate, token, role, roleSSt]);

  if (role === roleSSt) return children;

  return null;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default PrivateRoutes;
