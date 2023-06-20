import { Path } from "./Path";
import { GET_DATA} from './Fetch';

export const Api = {
    _TruckView: Path.API+'truck/view',
}

export const carViewApi = (params,token, handleData) => GET_DATA(Api._TruckView, res=>{
    handleData(res);
},{License_Plate: params !== null ? params : ""}, token)

