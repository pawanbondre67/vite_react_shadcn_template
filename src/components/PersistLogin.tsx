import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";

const PersistLogin = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                // After successful refresh, maintain current location
                if (location.pathname !== "/") {
                    navigate(location.pathname, { replace: true });
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
                // Redirect to login only if not already there
                if (location.pathname !== "/login") {
                    navigate("/login", { state: { from: location }, replace: true });
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (!user?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, []);
    
    return isLoading ? (
        <div className="flex justify-center items-center h-screen">
            <p>Loading...</p>
        </div>
    ) : (
        <Outlet />
    );
};

export default PersistLogin;