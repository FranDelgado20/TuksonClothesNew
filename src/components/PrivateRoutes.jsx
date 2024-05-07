const PrivateRoutes = ({ children, role }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const roleSSt = JSON.parse(sessionStorage.getItem("role"));

  if (token) {
    if (role === roleSSt) return children;

    if (roleSSt === "admin") {
      location.href = "/administrador";
      return;
    }
    location.href = "/";
  } else location.href = "/login";
};

export default PrivateRoutes;
