import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../utils/authCheck";

export default function PrivateRoute({ children }) {
  const user = isAuthenticated();
  return user ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
