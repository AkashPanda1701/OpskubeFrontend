import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Private({children}) {
    const authState = useSelector((state) => state.auth);

    if(authState.token) {
        return children;
    } else {
        return <Navigate to="/login" />
    }

    
}

export default Private
