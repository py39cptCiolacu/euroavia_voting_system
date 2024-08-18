import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

function AdminLogout({setIsAuthenticated, setUsername}) {
    const navigate = useNavigate();

    useEffect( () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUsername('');
        navigate('/admin_login');
    }, [navigate, setIsAuthenticated, setUsername]);

    return (
        <div>
            <h2>Logging out ...</h2>
        </div>
    )

}

export default AdminLogout;