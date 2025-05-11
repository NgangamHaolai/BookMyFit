import {Navigate} from 'react-router-dom';

const AdminRoute = ({children})=>
{
    const token = localStorage.getItem('adminToken');
    // return token ? children : <Navigate to="/admin"></Navigate>;
    if(!token)
    {
        alert("Token not found! Redirecting..")
        return <Navigate to='/admin'></Navigate>
    }
    return children;
};
    
export default AdminRoute;