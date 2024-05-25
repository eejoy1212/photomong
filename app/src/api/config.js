import axios from "axios";

//Env variable
// //Django
// const OriginBaseURL="http://118.33.212.138:8000"
// //Flask
// export const BaseURL = "http://118.33.212.138:5000"//"http://118.33.212.138:8000"


//Django
const OriginBaseURL="http://127.0.0.1:8000"
//Flask
export const BaseURL = "http://127.0.0.1:5000"//"http://118.33.212.138:8000"

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
export const sendDongNum = async (dongNum, checkCoupon) => {
  try {
    console.log("in send axios", dongNum);
    const { data } = await axiosInstance.get('/get_print_amount', {
      params: {
        printAmount: dongNum,
        checkCoupon:checkCoupon
      }
    });
    return data;
  } catch (error) {
    // 요청이 실패하면 에러를 콘솔에 기록합니다.
    console.error('Error sending dong number:', error);
    // 에러를 처리하거나 사용자에게 알릴 수 있는 다른 방법을 선택할 수 있습니다.
    throw error; // 에러를 호출자에게 다시 던집니다.
  }
};
export const getPhotos=async()=>{
  const { data } = await originAxiosInstance.get('/get_photo/')
  return data
}
// export const 