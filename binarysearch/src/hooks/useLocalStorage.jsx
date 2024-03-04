import { useToast } from './useToast';

export const useLocalStorage = (key) => {
    const { showToast } = useToast();

    const setItem = (value) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            showToast('local storage set error', 'error');
            console.log('Local storage set error: ', error);
        }
    };

    const getItem = () => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            showToast('local storage get error', 'error');
            console.log('Local storage get error: ', error);
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            showToast('local storage remove error', 'error');
            console.log('Local storage remove error: ', error);
        }
    };

    return { setItem, getItem, removeItem };
};
