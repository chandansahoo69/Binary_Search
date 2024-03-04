import { useTheme } from '@mui/material';
import { Calendar, NewUsers, Welcome } from 'components/organism';
import React from 'react';

const Dashboard = () => {
    const theme = useTheme();

    return (
        <>
            <div className="container-main">
                <div className="left">
                    <div
                        className="left-top"
                        style={{ backgroundColor: theme.palette.container.background }}
                    >
                        <Welcome />
                    </div>
                    <div
                        className="left-bottom"
                        style={{ backgroundColor: theme.palette.container.background }}
                    ></div>
                </div>
                <div className="right">
                    <div
                        className="right-top"
                        style={{ backgroundColor: theme.palette.container.background }}
                    >
                        <Calendar />
                    </div>
                    <div
                        className="right-bottom"
                        style={{ backgroundColor: theme.palette.container.background }}
                    >
                        <NewUsers />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
