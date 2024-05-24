import axios from "axios";

//Env variable
const OriginBaseURL="http://118.33.212.138:8000"
export const BaseURL = "http://118.33.212.138:5000"//"http://118.33.212.138:8000"

// Created an axios instance adding our api BaseURL
 const axiosInstance = axios.create({
  baseURL: BaseURL,
});
export const originAxiosInstance = axios.create({
  baseURL: OriginBaseURL,
});
axios.defaults.withCredentials = true;
export const jsonConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
export const sendCaptureReq=async()=>{

    const {data} = await axiosInstance.get('/capture')
    return data;
}
// export const 