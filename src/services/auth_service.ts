import { api, helpers } from '@/utils';

const login = async (formData: { email: string, password: string }) => {
    const response = await api().post('/auth/login', formData);
    try {
        if (response) {
            helpers.setSavedUser(response.data);
            helpers.redirectBasedOnRole(response.data.user.roles[0].name);
            return response;
        }
    } catch (error) {
        return Promise.reject(error);

    }
};

const logout = async () => {
    try {
        const response = await api().post('/auth/logout');
        localStorage.clear();
        return response.status;
    } catch (error) {
        return Promise.reject(error);
    }
};

const forgetPassword = async (email: string) => {
    try {
        const response = await api().post('/auth/forget-password', { email });
        console.log(response.status);
        if (response.status === 200) {
            return response;
        } else {
            return response.status;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};

const refreshToken = async () => {
    try {
        const response = await api().post('/auth/refresh-token');
        return response.data.token;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    login,
    logout,
    refreshToken,
    forgetPassword
};