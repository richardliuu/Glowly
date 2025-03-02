import {Outlet, Navigate} from 'react-router-dom'

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken')

    return(

        token ? <Outlet/> : <Navigate to="/" />
    )

}

export default ProtectedRoute