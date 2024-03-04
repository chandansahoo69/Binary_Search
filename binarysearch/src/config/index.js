const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    publicUrl: process.env.REACT_APP_PUBLIC_API_URL,
    tokenName: 'accesstoken',
    refreshTokenName: 'refreshtoken',
    currentUser: 'currentUser',
    roles: {
        Admin: 'Admin',
        HR: 'HR',
        Employee: 'Employee',
        Manager: 'Manager',
        BDM: 'BDM',
    },
    paging: {
        perPage: 25,
    },
    gender: {
        male: 'MALE',
        female: 'FEMALE',
        other: 'OTHER',
    },
};

export default config;
