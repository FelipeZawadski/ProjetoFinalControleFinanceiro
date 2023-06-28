import AuthService from '../../service/AuthService';
import { AuthenticatedRoutes } from '../AuthenticatedRoutes';
import { SignRoutes } from '../SignRoutes';

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { HomePage } from '../../pages/HomePage';
import { MoveListPage } from '../../pages/MoveListPage';
import { MoveFormPage } from '../../pages/MoveFormPage';
import { RegisterListPage } from '../../pages/RegisterListPage';
import { RegisterFormPage } from '../../pages/RegisterFormPage';


export function BaseRoutes() {
    
    const isAuthenticated = AuthService.isAuthenticated();

    return isAuthenticated ? <AuthenticatedRoutes /> : <SignRoutes />;

}