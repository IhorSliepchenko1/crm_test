import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hook";

const ProtectedRoute = ({ children }: React.PropsWithChildren<unknown>) => {
     const { token } = useAppSelector((state) => state.token);

     if (token !== null) {
          console.log(token);
          return <Navigate to="/auth" />;
     }

     return children
};

export default ProtectedRoute;