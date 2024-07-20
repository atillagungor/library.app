
import { createSlice } from '@reduxjs/toolkit';
import { DecodedTokenModel } from '../../core/models/decodedTokenModel';
import { UserGetResponseModel } from '../../models/responses/User/UserGetResponseModel';
import tokenService from '../../core/services/tokenService';
import { TokenModel } from '../../models/responses/Token/TokenModel';
import { jwtDecode } from 'jwt-decode';

const initialState: PlatformModel = {
    token: {} as DecodedTokenModel,
    user: {} as UserGetResponseModel,
};
export interface PlatformModel {
    token: DecodedTokenModel;
    user: UserGetResponseModel;
}

const platformSlice = createSlice({
    name: 'platform',
    initialState: initialState,
    reducers: {
        decodeToken: (state) => {
            const storageToken = tokenService.getToken();
            const token: TokenModel = JSON.parse(storageToken ? storageToken : '');
            const decodedToken: DecodedTokenModel = jwtDecode(token.token);
            state.token = decodedToken;
        },
        getUser: (state) => {
            const fullName =
                state.token[
                    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
                ].split(' ');
            const id =
                state.token[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
                ];
            state.user = {
                id: id,
                email: state.token.email,
                userName: fullName[0],
            };
        },
        removePlatform: (state) => {
            state.token = initialState.token;
            state.user = initialState.user;
        }
    },
});

export const platformReducer = platformSlice.reducer;
export const platformActions = platformSlice.actions;