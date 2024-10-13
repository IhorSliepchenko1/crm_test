import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
     const { token } = useSelector((state) => state.auth);

     const isTokenValid = () => {

          if (!token) return false;

          try {
               const decodedToken = jwtDecode(token);
               const currentTime = Date.now() / 1000;
               return decodedToken.exp > currentTime;

          } catch (error) {
               console.error(error);
               return false
          }
     };

     return isTokenValid() ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
