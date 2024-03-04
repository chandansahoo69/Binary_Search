import React from 'react';
import { useTheme } from '@mui/material';
import NewUserBox from './NewUserBox';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from 'components/molecules';

const NewUsers = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const users = [
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'demo@gmail.com',
            status: 'active',
        },
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'demo@gmail.com',
            status: 'active',
        },
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'demo@gmail.com',
            status: 'active',
        },
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'demo@gmail.com',
            status: 'active',
        },
        {
            id: 1,
            username: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            email: 'demo@gmail.com',
            status: 'active',
        },
    ];

    const seeAllUsers = () => {
        navigate(`${process.env.REACT_APP_CONTEXT_PATH}/peoples`);
    };

    return (
        <>
            <div className="new-user-container">
                <div className="new-user-container-heading">
                    <h1
                        style={{
                            fontSize: theme.typography.h5.fontSize,
                            fontWeight: theme.typography.h6.fontWeight,
                        }}
                    >
                        New Users
                    </h1>
                    <CustomButton text="See All" type="text" onClick={seeAllUsers} />
                </div>
                <div className="new-user-container-main">
                    {users.map((user, index) => (
                        <NewUserBox key={index} user={user} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default NewUsers;
