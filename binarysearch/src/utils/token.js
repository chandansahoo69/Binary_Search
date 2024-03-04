export const getToken = (args) => {
    try {
        return localStorage.getItem(args.name);
    } catch (err) {
        return null;
    }
};

export const setToken = (args) => {
    localStorage.setItem(args.name, args.value);
};

export const removeToken = (args) => {
    localStorage.removeItem(args.name);
};
