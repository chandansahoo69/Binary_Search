import React from 'react';

export const Loader = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '100px 0',
            }}
        >
            <span class="loader"></span>
        </div>
    );
};
