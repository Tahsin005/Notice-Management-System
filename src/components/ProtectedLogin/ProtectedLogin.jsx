import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../../utils/authCheck";

const ProtectedLogin = ({ children }) => {
    const user = isAuthenticated();
    return user ? <Navigate to="/" /> : children;
};
ProtectedLogin.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ProtectedLogin;
