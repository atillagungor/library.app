import { AxiosResponse } from 'axios';
import { LoginRequestModel } from '../models/requests/Auth/LoginRequestModel';
import { RegisterRequestModel } from '../models/requests/Auth/RegisterRequestModel';
import { TokenModel } from '../models/responses/Token/TokenModel';
import axiosInstance from '../core/interceptors/axiosInterceptor';
import { ChangePasswordModel } from '../models/requests/Auth/ChangePasswordRequestModel';

const login = 'Auths/login';
const register = 'Auths/register';
const changepassword = 'Auths/changepassword';

class AuthService {
    login(loginRequest: LoginRequestModel): Promise<AxiosResponse<TokenModel, any>> {
        return axiosInstance.post(login, loginRequest);
    }

    register(
        registerRequest: RegisterRequestModel
    ): Promise<AxiosResponse<TokenModel, any>> {
        return axiosInstance.post(register, registerRequest);
    }
    changePassword(
        changePasswordRequest: ChangePasswordModel): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.post(changepassword, changePasswordRequest);
    }
}

export default new AuthService();