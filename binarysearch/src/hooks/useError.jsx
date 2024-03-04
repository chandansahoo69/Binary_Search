import { useEffect, useState } from 'react';

export const useError = ({ type = '', message = '', clearTime = 3000 }) => {
    const [error, setError] = useState({ type: type, message: message });

    // remove error after 3 seconds
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError({ type: '', message: '' });
        }, clearTime);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [error, clearTime]);

    return { error, setError };
};
