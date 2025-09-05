import {v2 as cloudinary} from 'cloudinary';

import { ClOUDINARY_API_KEY, ClOUDINARY_NAME, ClOUDINARY_SECRET_KEY } from '../constants';

const connectCloudinary = async()=>{
    cloudinary.config({
        cloud_name:ClOUDINARY_NAME,
        api_key:ClOUDINARY_API_KEY,
        api_secret:ClOUDINARY_SECRET_KEY
    })
}
export default connectCloudinary ;