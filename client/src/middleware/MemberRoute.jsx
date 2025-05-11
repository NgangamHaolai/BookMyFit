import {Navigate} from 'react-router-dom';

const MemberRoute = ({children})=>
{
    const token = localStorage.getItem('userToken');
    // return token ? children : <Navigate to="/admin"></Navigate>;
    if(!token)
    {
        alert("Token not found! Redirecting..")
        return <Navigate to='/login'></Navigate>
    }
    return children;
};
    
export default MemberRoute;