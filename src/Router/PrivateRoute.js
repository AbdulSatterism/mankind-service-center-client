import React, { useContext } from 'react';
import { AuthContext } from '../components/Context/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div><p>loading......</p></div>
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;

};

export default PrivateRoute;