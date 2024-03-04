export const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
    if (password.length < 8) {
        return 'Your password must be at least 8 characters';
    }
    if (password.search(/[a-z]/i) < 0) {
        return 'Your password must contain at least one letter.';
    }
    if (password.search(/[A-Z]/) < 0) {
        return 'Your password must contain at least one capital letter.';
    }
    if (password.search(/[0-9]/) < 0) {
        return 'Your password must contain at least one digit.';
    }
    if (password.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0) {
        return 'Your password must contain at w one digit.';
    }

    return true;
};

export const randomColorGenerator = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
