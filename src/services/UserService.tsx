import { PageRequestModel } from './../models/requests/pageRequestModel';
import { AxiosResponse } from "axios";
import { Paginate } from "../core/models/paginate";
import axiosInstance from "../core/interceptors/axiosInterceptor";
import { UserGetListResponseModel } from '../models/responses/User/UserGetListResponseModel';
import { UserUpdateRequestModel } from '../models/requests/User/UserUpdateRequestModel';
import { UserUpdateResponseModel } from '../models/responses/User/UserUpdateResponseModel';
import { UserDeleteRequestModel } from '../models/requests/User/UserDeleteRequestModel';
import { UserGetResponseModel } from '../models/responses/User/UserGetResponseModel';

const apiUrl = "Users"
class UserService {
    getAll(pageRequest: PageRequestModel): Promise<AxiosResponse<Paginate<UserGetListResponseModel>, any>> {
        return axiosInstance.get<Paginate<UserGetListResponseModel>>(apiUrl + "/GetAll", { params: { ...pageRequest } });
    }

    getById(id: string): Promise<AxiosResponse<UserGetResponseModel, any>> {
        return axiosInstance.get<UserGetResponseModel>(apiUrl + "/Get", { params: { Id: id } });
    }

    update(request: UserUpdateRequestModel,): Promise<AxiosResponse<UserUpdateResponseModel, any>> {
        return axiosInstance.put<UserUpdateResponseModel>(apiUrl, request);
    }

    delete(deleteRequest: UserDeleteRequestModel) {
        return axiosInstance.delete(apiUrl, { data: { deleteRequest } });
    }
    getByMail(email: string): Promise<AxiosResponse<UserGetResponseModel, any>> {
        return axiosInstance.get<UserGetResponseModel>(apiUrl + "/GetByMail", { params: { mail: email } });
    }
    activate(email: string): Promise<AxiosResponse<boolean, any>> {
        return axiosInstance.get<boolean>(apiUrl + "/Activate", { params: { email: email } });
    }
}
export default new UserService();