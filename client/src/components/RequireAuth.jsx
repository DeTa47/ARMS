import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.data?.CustomerType) && auth?.data?.EmailVerified
            ? <Outlet />
            : allowedRoles?.includes(auth?.data?.CustomerType)
                ? <Navigate to="/verifyEmail" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;