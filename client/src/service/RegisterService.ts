import { IRegisterForm } from "../commons/interface";
import { api } from "../lib/axios";

const insertRegister = (register: IRegisterForm) => {
    return api.post('/registers', register);
}

const findAllByUser = () => {
    return api.get('/registers/userRegister');
}

const remove = (id: number) => {
    return api.delete(`/registers/${id}`);
}

const findOneById = (id: number) => {
    return api.get(`/registers/${id}`);
}

const RegisterService = {
    insertRegister,
    findAllByUser,
    remove,
    findOneById
}
export default RegisterService;