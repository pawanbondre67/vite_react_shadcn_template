
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
            <p className="text-md mt-2 text-gray-500">The page you are looking for doesn't exist.</p>
            <button
                onClick={goHome}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;
