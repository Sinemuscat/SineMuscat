import React from 'react';
import { useLocation } from 'react-router-dom';

const UserDetailPage = () => {
    const location = useLocation();
    const address = location.state;

    return (
        <>
            {address}
        </>
    );
};

export default UserDetailPage;