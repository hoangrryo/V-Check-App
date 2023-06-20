// let DOMAIN = 'http://localhost:/';
let DOMAIN = 'https://cpvdev.cp.com.vn/api_vcheck/';
let DOMAIN_IMAGE = DOMAIN+'upload/';
let API = DOMAIN+'api/';
let IMAGE = DOMAIN + 'upload/';
let IMAGE_DRIVER = DOMAIN_IMAGE+'driver/';
let IMAGE_TRUCK = DOMAIN_IMAGE+'car/';
let IMAGE_FARM = DOMAIN_IMAGE+'farm/';
let IMAGE_LOCATION = DOMAIN_IMAGE+'location/';
let File_TempLate = DOMAIN_IMAGE+'template/';

export const Path = {
    API,
    IMAGE,
    Logo: IMAGE + 'logo/',
    ImageDriver: IMAGE_DRIVER,
    ImageTruck: IMAGE_TRUCK,
    ImageFarm: IMAGE_FARM,
    ImageLocation: IMAGE_LOCATION,
    FileTempLate: File_TempLate
};