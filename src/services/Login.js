import { Path } from "./Path";
import {POST_JSON, GET_DATA} from './Fetch';

export const Api = {
    _login: Path.API+'users/login',
    _logout: Path.API+'users/logout'
}

export const LoginApi = (data, handleData) => POST_JSON(Api._login, data, res=>{
    handleData(res);
})

export const LogoutApi = (params,handleData) => GET_DATA(Api._logout, res=>{
    handleData(res);
},{userID: params})