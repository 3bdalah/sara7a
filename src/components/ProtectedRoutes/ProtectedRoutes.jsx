import { Navigate } from "react-router-dom";
const ProtectedRoutes = (props) => {
  if (localStorage.getItem("userToken")) {
    // eslint-disable-next-line react/prop-types
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoutes;
