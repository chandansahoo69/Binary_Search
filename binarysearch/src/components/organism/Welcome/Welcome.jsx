import React from 'react';

import { useTheme } from '@mui/material';
import { ReactIcon } from 'components/molecules';

import maleBannerImage from 'assets/images/dashoboard-banner-image-male.png';
import moment from 'moment';
import { useResponsive } from 'hooks';

const Welcome = () => {
    const theme = useTheme();
    const date = new Date();
    const isMobile = useResponsive('down', 'sm', '', '');
    const isTablet = useResponsive('down', 'md', '', '');

    return (
        <div className="welcome-container" style={{ backgroundColor: theme.palette.primary.main }}>
            <div className="welcome-heading">
                <h1
                    style={{
                        fontSize: theme.typography.h4.fontSize,
                        fontWeight: theme.typography.h6.fontWeight,
                        color: theme.palette.common.white,
                    }}
                >
                    Welcome, John Doe
                </h1>
                <h1
                    className="welcome-heading-overlay"
                    style={{
                        fontSize: isMobile
                            ? theme.typography.h5.fontSize
                            : isTablet
                            ? theme.typography.h3.fontSize
                            : theme.typography.h2.fontSize,
                        color: theme.palette.common.white,
                    }}
                >
                    {moment(date).format('dddd, MMMM YYYY')}
                </h1>
                <div className="welcome-banner-info" style={{ color: theme.palette.common.white }}>
                    You have 3 new applications. It is a lot of work for today! so lets start.{' '}
                    <ReactIcon
                        icon={`ic:outline-emoji-emotions`}
                        color={theme.palette.common.white}
                        sx={{ marginTop: '10px' }}
                        height={22}
                        width={22}
                    />
                </div>
            </div>
            <img alt="banner_image" className="banner_image" src={maleBannerImage} />
        </div>
    );
};

export default Welcome;
