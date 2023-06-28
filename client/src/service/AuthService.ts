import { IRegisterForm, IUserLogin, IUserSignUp } from "../commons/interface";
import { api } from "../lib/axios";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
    }
    
    return token ? true : false;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const login = (user: IUserLogin) => {
    return api.post('/login', user);
}


const signup = (user: IUserSignUp) => {
    return api.post('/users', user);
}

const checkToken = () => {
    return api.get('/authentication');
}

const AuthService = {
    isAuthenticated,
    logout,
    login,
    signup,
    checkToken
}
export default AuthService;