import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function AxiosInterceptor() {
    axios.interceptors.request.use(function (config) {

        return config;
    
      }, function (error) {
        return Promise.reject(error);
      });
    
    // Add a response interceptor
    axios.interceptors.response.use(function (response: AxiosResponse<any, any>) {
        
        return response.data;
      
    }, function (error: AxiosError) {


        toast(error.message,  {
            onClose: () => alert('Called when I close'),
        });
    
        return Promise.reject(error);
      }); 
}
