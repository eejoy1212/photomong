// // // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // import i18n from '../../translations/i18n';
// // // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // // import "../../css/Photo.css";
// // // // // // // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // // // // // // import frame from '../../assets/Photo/Snap/frame.png';

// // // // // // // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';


// // // // // // // // // // // // function Photo() {
// // // // // // // // // // // //      const { t } = useTranslation();
// // // // // // // // // // // //      const webcamRef = useRef(null);
// // // // // // // // // // // //      const navigate = useNavigate();
// // // // // // // // // // // //      const [hoveredImage, setHoveredImage] = useState(null);
// // // // // // // // // // // //      const [countdown, setCountdown] = useState(8);
// // // // // // // // // // // //      const [photoCount, setPhotoCount] = useState(0);
// // // // // // // // // // // //      const [intervalId, setIntervalId] = useState(null);
// // // // // // // // // // // //      const [photos, setPhotos] = useState([]);
// // // // // // // // // // // //      const [flash, setFlash] = useState(false);
     
// // // // // // // // // // // //      const [clickedButton, setClickedButton] = useState(false);

// // // // // // // // // // // //      const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // // // // // // // // // //      const rightCornerDivValue = (photoCount + 1) * (1 / 8);

// // // // // // // // // // // //      const takeSnapshot = async() => {
// // // // // // // // // // // //           setFlash(true);
// // // // // // // // // // // //           const imageSrc = webcamRef.current.getScreenshot();
// // // // // // // // // // // //           const newPhotoArray = [...photos, imageSrc];
// // // // // // // // // // // //           setPhotos(newPhotoArray);
// // // // // // // // // // // //           setPhotoCount((prevCount) => prevCount + 1);

// // // // // // // // // // // //           // setTimeout(() => {
// // // // // // // // // // // //           //      setFlash(false);
// // // // // // // // // // // //           // }, 100);
// // // // // // // // // // // // //1장 찍을 때마다 사진 찍어라

 
// // // // // // // // // // // // setTimeout(async () => {      
// // // // // // // // // // // //       const response=await sendCaptureReq()     
// // // // // // // // // // // //  console.log("response result>>>",response)  
// // // // // // // // // // // //      setFlash(false);
// // // // // // // // // // // // }, 5000);
// // // // // // // // // // // //           if (photoCount == 7) {
// // // // // // // // // // // //                const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // // // // // // // // // //                     id: index,
// // // // // // // // // // // //                     url: photo
// // // // // // // // // // // //                }));

// // // // // // // // // // // //                const photos=await getPhotos()
// // // // // // // // // // // //                console.log("axios photos",photos)
// // // // // // // // // // // //                const formattedImages = photos.images.map(img => {
// // // // // // // // // // // //                     // const newImages=p.images.map(img=>{return {...img,url:img.url.replace(/\\/g, '\\') }})
// // // // // // // // // // // //                     // return { status:p.status, images:newImages};
// // // // // // // // // // // //                     return {...img,url:img.url.replace(/\\/g, '/')             }
                    
// // // // // // // // // // // //                   });
// // // // // // // // // // // //                   console.log("포맷",formattedImages)
// // // // // // // // // // // //                   const newObj={status:photos.status,images:formattedImages}
// // // // // // // // // // // //                   sessionStorage.setItem('photos', JSON.stringify(formattedImages));
               
// // // // // // // // // // // //                //3~5초
// // // // // // // // // // // //                navigate('/photo-choose')
// // // // // // // // // // // //           } else {
// // // // // // // // // // // //                setCountdown(8);
// // // // // // // // // // // //           }
// // // // // // // // // // // //      };

// // // // // // // // // // // //      useEffect(() => {
// // // // // // // // // // // //           const timer = setInterval(() => {
// // // // // // // // // // // //                if (countdown > 0) {
// // // // // // // // // // // //                     setCountdown(countdown - 1);
// // // // // // // // // // // //                } else {
// // // // // // // // // // // //                     takeSnapshot();
// // // // // // // // // // // //                }
// // // // // // // // // // // //           }, 1000);

// // // // // // // // // // // //           return () => clearInterval(timer); // Cleanup timer on unmount
// // // // // // // // // // // //      }, [countdown]);

// // // // // // // // // // // //      useEffect(() => {
// // // // // // // // // // // //           const language = sessionStorage.getItem('language');
// // // // // // // // // // // //           if (language === 'en') {
// // // // // // // // // // // //                setBackgroundImage(background_en);
// // // // // // // // // // // //           } else if (language === 'ko') {
// // // // // // // // // // // //                setBackgroundImage(background_kr);
// // // // // // // // // // // //           } else if (language === 'vi') {
// // // // // // // // // // // //                setBackgroundImage(background_vn);
// // // // // // // // // // // //           }
// // // // // // // // // // // //      }, [])

// // // // // // // // // // // //      const handleMouseEnter = (image) => {
// // // // // // // // // // // //           setHoveredImage(image);
// // // // // // // // // // // //      }

// // // // // // // // // // // //      const handleMouseLeave = () => {
// // // // // // // // // // // //           setHoveredImage(null);
// // // // // // // // // // // //      }

// // // // // // // // // // // //      return (
// // // // // // // // // // // //           <div className={`photo-container ${flash ? ' animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // // // // // // //                <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // // // // // // //                     <div className="photo-countdown">{countdown}</div>
// // // // // // // // // // // //                </div>
// // // // // // // // // // // //                <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // // // // // // //                     <div className="photo-count">{photoCount}/8</div>
// // // // // // // // // // // //                </div>
// // // // // // // // // // // //                <div className="middle-photo-div">
// // // // // // // // // // // //                     <Webcam
// // // // // // // // // // // //                          audio={false}
// // // // // // // // // // // //                          ref={webcamRef}
// // // // // // // // // // // //                          forceScreenshotSourceSize={true}
// // // // // // // // // // // //                          videoConstraints={{
// // // // // // // // // // // //                               height: 720,
// // // // // // // // // // // //                               width: 1280
// // // // // // // // // // // //                          }}
// // // // // // // // // // // //                          screenshotFormat='image/jpeg'
// // // // // // // // // // // //                          className='photo-webcam'
// // // // // // // // // // // //                     />
// // // // // // // // // // // //                </div>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //      );
// // // // // // // // // // // // }

// // // // // // // // // // // // export default Photo;


// // // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // import i18n from '../../translations/i18n';
// // // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // // import "../../css/Photo.css";
// // // // // // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // // // // // import frame from '../../assets/Photo/Snap/frame.png';

// // // // // // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';


// // // // // // // // // // // function Photo() {
// // // // // // // // // // //      const { t } = useTranslation();
// // // // // // // // // // //      const webcamRef = useRef(null);
// // // // // // // // // // //      const navigate = useNavigate();
// // // // // // // // // // //      const [hoveredImage, setHoveredImage] = useState(null);
// // // // // // // // // // //      const [countdown, setCountdown] = useState(8);
// // // // // // // // // // //      const [photoCount, setPhotoCount] = useState(0);
// // // // // // // // // // //      const [intervalId, setIntervalId] = useState(null);
// // // // // // // // // // //      const [photos, setPhotos] = useState([]);
// // // // // // // // // // //      const [flash, setFlash] = useState(false);
     
// // // // // // // // // // //      const [clickedButton, setClickedButton] = useState(false);

// // // // // // // // // // //      const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // // // // // // // // //      const rightCornerDivValue = (photoCount + 1) * (1 / 8);

// // // // // // // // // // //      const takeSnapshot = async() => {
// // // // // // // // // // //           setFlash(true);
// // // // // // // // // // //           const imageSrc = webcamRef.current.getScreenshot();
// // // // // // // // // // //           const newPhotoArray = [...photos, imageSrc];
// // // // // // // // // // //           setPhotos(newPhotoArray);
// // // // // // // // // // //           setPhotoCount((prevCount) => prevCount + 1);

// // // // // // // // // // //           // setTimeout(() => {
// // // // // // // // // // //           //      setFlash(false);
// // // // // // // // // // //           // }, 100);
// // // // // // // // // // // //1장 찍을 때마다 사진 찍어라

 
// // // // // // // // // // // setTimeout(async () => {      
// // // // // // // // // // //       const response=await sendCaptureReq()     
// // // // // // // // // // //  console.log("response result>>>",response)  
// // // // // // // // // // //      setFlash(false);
// // // // // // // // // // // }, 5000);
// // // // // // // // // // //           if (photoCount == 7) {
// // // // // // // // // // //                const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // // // // // // // // //                     id: index,
// // // // // // // // // // //                     url: photo
// // // // // // // // // // //                }));

// // // // // // // // // // //                const photos=await getPhotos()
// // // // // // // // // // //                console.log("axios photos",photos)
// // // // // // // // // // //                const formattedImages = photos.images.map(img => {
// // // // // // // // // // //                     // const newImages=p.images.map(img=>{return {...img,url:img.url.replace(/\\/g, '\\') }})
// // // // // // // // // // //                     // return { status:p.status, images:newImages};
// // // // // // // // // // //                     return {...img,url:img.url.replace(/\\/g, '/')             }
                    
// // // // // // // // // // //                   });
// // // // // // // // // // //                   console.log("포맷",formattedImages)
// // // // // // // // // // //                   const newObj={status:photos.status,images:formattedImages}
// // // // // // // // // // //                   sessionStorage.setItem('photos', JSON.stringify(formattedImages));
               
// // // // // // // // // // //                //3~5초
// // // // // // // // // // //                navigate('/photo-choose')
// // // // // // // // // // //           } else {
// // // // // // // // // // //                setCountdown(8);
// // // // // // // // // // //           }
// // // // // // // // // // //      };

// // // // // // // // // // //      useEffect(() => {
// // // // // // // // // // //           const timer = setInterval(() => {
// // // // // // // // // // //                if (countdown > 0) {
// // // // // // // // // // //                     setCountdown(countdown - 1);
// // // // // // // // // // //                } else {
// // // // // // // // // // //                     takeSnapshot();
// // // // // // // // // // //                }
// // // // // // // // // // //           }, 1000);

// // // // // // // // // // //           return () => clearInterval(timer); // Cleanup timer on unmount
// // // // // // // // // // //      }, [countdown]);

// // // // // // // // // // //      useEffect(() => {
// // // // // // // // // // //           const language = sessionStorage.getItem('language');
// // // // // // // // // // //           if (language === 'en') {
// // // // // // // // // // //                setBackgroundImage(background_en);
// // // // // // // // // // //           } else if (language === 'ko') {
// // // // // // // // // // //                setBackgroundImage(background_kr);
// // // // // // // // // // //           } else if (language === 'vi') {
// // // // // // // // // // //                setBackgroundImage(background_vn);
// // // // // // // // // // //           }
// // // // // // // // // // //      }, [])

// // // // // // // // // // //      const handleMouseEnter = (image) => {
// // // // // // // // // // //           setHoveredImage(image);
// // // // // // // // // // //      }

// // // // // // // // // // //      const handleMouseLeave = () => {
// // // // // // // // // // //           setHoveredImage(null);
// // // // // // // // // // //      }

// // // // // // // // // // //      return (
// // // // // // // // // // //           <div className={`photo-container ${flash ? ' animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // // // // // //                <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // // // // // //                     <div className="photo-countdown">{countdown}</div>
// // // // // // // // // // //                </div>
// // // // // // // // // // //                <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // // // // // //                     <div className="photo-count">{photoCount}/8</div>
// // // // // // // // // // //                </div>
// // // // // // // // // // //                <div className="middle-photo-div">
// // // // // // // // // // //                     <Webcam
// // // // // // // // // // //                          audio={false}
// // // // // // // // // // //                          ref={webcamRef}
// // // // // // // // // // //                          forceScreenshotSourceSize={true}
// // // // // // // // // // //                          videoConstraints={{
// // // // // // // // // // //                               height: 720,
// // // // // // // // // // //                               width: 1280
// // // // // // // // // // //                          }}
// // // // // // // // // // //                          screenshotFormat='image/jpeg'
// // // // // // // // // // //                          className='photo-webcam'
// // // // // // // // // // //                     />
// // // // // // // // // // //                </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //      );
// // // // // // // // // // // }

// // // // // // // // // // // export default Photo;


// // // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // import i18n from '../../translations/i18n';
// // // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // // import "../../css/Photo.css";
// // // // // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // // // // import frame from '../../assets/Photo/Snap/frame.png';
// // // // // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // function Photo() {
// // // // // // // // // //      const { t } = useTranslation();
// // // // // // // // // //      const webcamRef = useRef(null);
// // // // // // // // // //      const navigate = useNavigate();
// // // // // // // // // //      const [hoveredImage, setHoveredImage] = useState(null);
// // // // // // // // // //      const [countdown, setCountdown] = useState(8);
// // // // // // // // // //      const [photoCount, setPhotoCount] = useState(0);
// // // // // // // // // //      const [photos, setPhotos] = useState([]);
// // // // // // // // // //      const [flash, setFlash] = useState(false);
// // // // // // // // // //      const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // // // // // // // //      const takeSnapshot = async() => {
// // // // // // // // // //           setFlash(true);
// // // // // // // // // //           const imageSrc = webcamRef.current.getScreenshot();
// // // // // // // // // //           const newPhotoArray = [...photos, imageSrc];
// // // // // // // // // //           setPhotos(newPhotoArray);
// // // // // // // // // //           setPhotoCount((prevCount) => prevCount + 1);

// // // // // // // // // //           setTimeout(async () => {      
// // // // // // // // // //                const response = await axios.post('/capture');
// // // // // // // // // //                console.log("response result>>>", response);
// // // // // // // // // //                setFlash(false);
// // // // // // // // // //           }, 5000);

// // // // // // // // // //           if (photoCount === 7) {
// // // // // // // // // //                const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // // // // // // // //                     id: index,
// // // // // // // // // //                     url: photo
// // // // // // // // // //                }));

// // // // // // // // // //                const response = await axios.get('/photos');
// // // // // // // // // //                console.log("axios photos", response.data);
// // // // // // // // // //                const formattedImages = response.data.images.map(img => {
// // // // // // // // // //                     return { ...img, url: img.url.replace(/\\/g, '/') };                 
// // // // // // // // // //                });
// // // // // // // // // //                console.log("포맷", formattedImages);
// // // // // // // // // //                sessionStorage.setItem('photos', JSON.stringify(formattedImages));
               
// // // // // // // // // //                navigate('/photo-choose');
// // // // // // // // // //           } else {
// // // // // // // // // //                setCountdown(8);
// // // // // // // // // //           }
// // // // // // // // // //      };

// // // // // // // // // //      useEffect(() => {
// // // // // // // // // //           const timer = setInterval(() => {
// // // // // // // // // //                if (countdown > 0) {
// // // // // // // // // //                     setCountdown(countdown - 1);
// // // // // // // // // //                } else {
// // // // // // // // // //                     takeSnapshot();
// // // // // // // // // //                }
// // // // // // // // // //           }, 1000);

// // // // // // // // // //           return () => clearInterval(timer);
// // // // // // // // // //      }, [countdown]);

// // // // // // // // // //      useEffect(() => {
// // // // // // // // // //           const language = sessionStorage.getItem('language');
// // // // // // // // // //           if (language === 'en') {
// // // // // // // // // //                setBackgroundImage(background_en);
// // // // // // // // // //           } else if (language === 'ko') {
// // // // // // // // // //                setBackgroundImage(background_kr);
// // // // // // // // // //           } else if (language === 'vi') {
// // // // // // // // // //                setBackgroundImage(background_vn);
// // // // // // // // // //           }
// // // // // // // // // //      }, []);

// // // // // // // // // //      const handleMouseEnter = (image) => {
// // // // // // // // // //           setHoveredImage(image);
// // // // // // // // // //      }

// // // // // // // // // //      const handleMouseLeave = () => {
// // // // // // // // // //           setHoveredImage(null);
// // // // // // // // // //      }

// // // // // // // // // //      return (
// // // // // // // // // //           <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // // // // //                <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // // // // //                     <div className="photo-countdown">{countdown}</div>
// // // // // // // // // //                </div>
// // // // // // // // // //                <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // // // // //                     <div className="photo-count">{photoCount}/8</div>
// // // // // // // // // //                </div>
// // // // // // // // // //                <div className="middle-photo-div">
// // // // // // // // // //                     <Webcam
// // // // // // // // // //                          audio={false}
// // // // // // // // // //                          ref={webcamRef}
// // // // // // // // // //                          forceScreenshotSourceSize={true}
// // // // // // // // // //                          videoConstraints={{
// // // // // // // // // //                               height: 720,
// // // // // // // // // //                               width: 1280
// // // // // // // // // //                          }}
// // // // // // // // // //                          screenshotFormat='image/jpeg'
// // // // // // // // // //                          className='photo-webcam'
// // // // // // // // // //                     />
// // // // // // // // // //                </div>
// // // // // // // // // //           </div>
// // // // // // // // // //      );
// // // // // // // // // // }

// // // // // // // // // // export default Photo;

// // // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // // import { useTranslation } from 'react-i18next';
// // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // // import "../../css/Photo.css";
// // // // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // // // import axios from 'axios';

// // // // // // // // // function Photo() {
// // // // // // // // //     const { t } = useTranslation();
// // // // // // // // //     const webcamRef = useRef(null);
// // // // // // // // //     const navigate = useNavigate();
// // // // // // // // //     const [countdown, setCountdown] = useState(10);
// // // // // // // // //     const [photoCount, setPhotoCount] = useState(0);
// // // // // // // // //     const [photos, setPhotos] = useState([]);
// // // // // // // // //     const [flash, setFlash] = useState(false);
// // // // // // // // //     const [backgroundImage, setBackgroundImage] = useState(background_en);
// // // // // // // // //     const intervalId = useRef(null);

// // // // // // // // //     const startLiveView = async () => {
// // // // // // // // //         try {
// // // // // // // // //             await axios.post('http://127.0.0.1:5000/start_live_view');
// // // // // // // // //         } catch (error) {
// // // // // // // // //             console.error('Error starting live view:', error);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const stopLiveView = async () => {
// // // // // // // // //         try {
// // // // // // // // //             await axios.post('http://127.0.0.1:5000/stop_live_view');
// // // // // // // // //         } catch (error) {
// // // // // // // // //             console.error('Error stopping live view:', error);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const captureImage = async () => {
// // // // // // // // //         try {
// // // // // // // // //             await axios.post('http://127.0.0.1:5000/capture');
// // // // // // // // //         } catch (error) {
// // // // // // // // //             console.error('Error capturing image:', error);
// // // // // // // // //         }
// // // // // // // // //     };

// // // // // // // // //     const takeSnapshot = async () => {
// // // // // // // // //         setFlash(true);
// // // // // // // // //         if (webcamRef.current) {
// // // // // // // // //             const imageSrc = webcamRef.current.getScreenshot();
// // // // // // // // //             const newPhotoArray = [...photos, imageSrc];
// // // // // // // // //             setPhotos(newPhotoArray);
// // // // // // // // //             setPhotoCount((prevCount) => prevCount + 1);
// // // // // // // // //         }
// // // // // // // // //         await stopLiveView();
// // // // // // // // //         await captureImage();
// // // // // // // // //         await startLiveView();
// // // // // // // // //         setTimeout(() => {
// // // // // // // // //             setFlash(false);
// // // // // // // // //         }, 100);
// // // // // // // // //     };

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         intervalId.current = setInterval(async () => {
// // // // // // // // //             setCountdown(prevCountdown => {
// // // // // // // // //                 if (prevCountdown > 1) {
// // // // // // // // //                     return prevCountdown - 1;
// // // // // // // // //                 } else {
                    
// // // // // // // // //                     if (photoCount < 8) {
// // // // // // // // //                          takeSnapshot();
// // // // // // // // //                     }
// // // // // // // // //                     if (photoCount == 8) {
// // // // // // // // //                         clearInterval(intervalId.current); // 타이머 중지
// // // // // // // // //                         const getPhotos = async () => {
// // // // // // // // //                             try {
// // // // // // // // //                                 const response = await axios.get('http://127.0.0.1:5000/photos');
// // // // // // // // //                                 const formattedImages = response.data.images.map(img => {
// // // // // // // // //                                     return { ...img, url: img.url.replace(/\\/g, '/') };
// // // // // // // // //                                 });
// // // // // // // // //                                 sessionStorage.setItem('photos', JSON.stringify(formattedImages));
// // // // // // // // //                                 navigate('/photo-choose');
// // // // // // // // //                             } catch (error) {
// // // // // // // // //                                 console.error('Error fetching photos:', error);
// // // // // // // // //                             }
// // // // // // // // //                         };
// // // // // // // // //                         getPhotos();
// // // // // // // // //                     }
// // // // // // // // //                     return 10; // Reset countdown
// // // // // // // // //                 }
// // // // // // // // //             });
// // // // // // // // //         }, 1000);

// // // // // // // // //         return () => clearInterval(intervalId.current);
// // // // // // // // //     }, [photoCount, photos]);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const language = sessionStorage.getItem('language');
// // // // // // // // //         if (language === 'en') {
// // // // // // // // //             setBackgroundImage(background_en);
// // // // // // // // //         } else if (language === 'ko') {
// // // // // // // // //             setBackgroundImage(background_kr);
// // // // // // // // //         } else if (language === 'vi') {
// // // // // // // // //             setBackgroundImage(background_vn);
// // // // // // // // //         }
// // // // // // // // //     }, []);

// // // // // // // // //     useEffect(() => {
// // // // // // // // //         const initializeLiveView = async () => {
// // // // // // // // //             await startLiveView();
// // // // // // // // //         };
// // // // // // // // //         initializeLiveView();
// // // // // // // // //         return () => {
// // // // // // // // //             const cleanupLiveView = async () => {
// // // // // // // // //                 await stopLiveView();
// // // // // // // // //             };
// // // // // // // // //             cleanupLiveView();
// // // // // // // // //         };
// // // // // // // // //     }, []);

// // // // // // // // //     return (
// // // // // // // // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // // // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // // // //                 <div className="photo-countdown">{countdown}</div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // // // //                 <div className="photo-count">{photoCount}/8</div>
// // // // // // // // //             </div>
// // // // // // // // //             <div className="middle-photo-div">
// // // // // // // // //                 <img src="http://127.0.0.1:5000/video_feed" alt="Live View" className="photo-webcam" />
// // // // // // // // //                 <Webcam
// // // // // // // // //                     audio={false}
// // // // // // // // //                     ref={webcamRef}
// // // // // // // // //                     forceScreenshotSourceSize={true}
// // // // // // // // //                     videoConstraints={{
// // // // // // // // //                         height: 720,
// // // // // // // // //                         width: 1280
// // // // // // // // //                     }}
// // // // // // // // //                     screenshotFormat='image/jpeg'
// // // // // // // // //                     className='photo-webcam'
// // // // // // // // //                 />
// // // // // // // // //             </div>
// // // // // // // // //         </div>
// // // // // // // // //     );
// // // // // // // // // }

// // // // // // // // // export default Photo;


// // // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // import Webcam from 'react-webcam';
// // // // // // // // import "../../css/Photo.css";
// // // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // // import axios from 'axios';

// // // // // // // // function Photo() {
// // // // // // // //     const webcamRef = useRef(null);
// // // // // // // //     const navigate = useNavigate();
// // // // // // // //     const [countdown, setCountdown] = useState(10);
// // // // // // // //     const [photoCount, setPhotoCount] = useState(0);
// // // // // // // //     const [photos, setPhotos] = useState([]);
// // // // // // // //     const [flash, setFlash] = useState(false);
// // // // // // // //     const [backgroundImage, setBackgroundImage] = useState(background_en);
// // // // // // // //     const intervalId = useRef(null);

// // // // // // // //     const startLiveView = async () => {
// // // // // // // //         try {
// // // // // // // //             await axios.post('http://127.0.0.1:5000/start_live_view');
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error starting live view:', error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const stopLiveView = async () => {
// // // // // // // //         try {
// // // // // // // //             await axios.post('http://127.0.0.1:5000/stop_live_view');
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error stopping live view:', error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const captureImage = async () => {
// // // // // // // //         try {
// // // // // // // //             await axios.get('http://127.0.0.1:5000/capture'); // GET 메서드 사용
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error capturing image:', error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const takeSnapshot = async () => {
// // // // // // // //         setFlash(true);
// // // // // // // //         if (webcamRef.current) {
// // // // // // // //             const imageSrc = webcamRef.current.getScreenshot();
// // // // // // // //             const newPhotoArray = [...photos, imageSrc];
// // // // // // // //             setPhotos(newPhotoArray);
// // // // // // // //             setPhotoCount((prevCount) => prevCount + 1);
// // // // // // // //         }
// // // // // // // //         await stopLiveView();
// // // // // // // //         await captureImage();
// // // // // // // //         await startLiveView();
// // // // // // // //         setTimeout(() => {
// // // // // // // //             setFlash(false);
// // // // // // // //         }, 100);
// // // // // // // //     };

// // // // // // // //     useEffect(() => {
// // // // // // // //         intervalId.current = setInterval(async () => {
// // // // // // // //             setCountdown(prevCountdown => {
// // // // // // // //                 if (prevCountdown > 1) {
// // // // // // // //                     return prevCountdown - 1;
// // // // // // // //                 } else {
// // // // // // // //                     if (photoCount < 8) {
// // // // // // // //                         takeSnapshot();
// // // // // // // //                     }
// // // // // // // //                     if (photoCount + 1 === 8) {
// // // // // // // //                         clearInterval(intervalId.current); // 타이머 중지
// // // // // // // //                         const getPhotos = async () => {
// // // // // // // //                             try {
// // // // // // // //                                 const response = await axios.get('http://127.0.0.1:5000/photos');
// // // // // // // //                                 const formattedImages = response.data.images.map(img => {
// // // // // // // //                                     return { ...img, url: img.url.replace(/\\/g, '/') };
// // // // // // // //                                 });
// // // // // // // //                                 sessionStorage.setItem('photos', JSON.stringify(formattedImages));
// // // // // // // //                                 navigate('/photo-choose');
// // // // // // // //                             } catch (error) {
// // // // // // // //                                 console.error('Error fetching photos:', error);
// // // // // // // //                             }
// // // // // // // //                         };
// // // // // // // //                         getPhotos();
// // // // // // // //                     }
// // // // // // // //                     return 10; // Reset countdown
// // // // // // // //                 }
// // // // // // // //             });
// // // // // // // //         }, 1000);

// // // // // // // //         return () => clearInterval(intervalId.current);
// // // // // // // //     }, [photoCount, photos, navigate, takeSnapshot]);

// // // // // // // //     useEffect(() => {
// // // // // // // //         const language = sessionStorage.getItem('language');
// // // // // // // //         if (language === 'en') {
// // // // // // // //             setBackgroundImage(background_en);
// // // // // // // //         } else if (language === 'ko') {
// // // // // // // //             setBackgroundImage(background_kr);
// // // // // // // //         } else if (language === 'vi') {
// // // // // // // //             setBackgroundImage(background_vn);
// // // // // // // //         }
// // // // // // // //     }, []);

// // // // // // // //     useEffect(() => {
// // // // // // // //         const initializeLiveView = async () => {
// // // // // // // //             await startLiveView();
// // // // // // // //         };
// // // // // // // //         initializeLiveView();
// // // // // // // //         return () => {
// // // // // // // //             const cleanupLiveView = async () => {
// // // // // // // //                 await stopLiveView();
// // // // // // // //             };
// // // // // // // //             cleanupLiveView();
// // // // // // // //         };
// // // // // // // //     }, []);

// // // // // // // //     return (
// // // // // // // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // // //                 <div className="photo-countdown">{countdown}</div>
// // // // // // // //             </div>
// // // // // // // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // // //                 <div className="photo-count">{photoCount}/8</div>
// // // // // // // //             </div>
// // // // // // // //             <div className="middle-photo-div">
// // // // // // // //                 <img src="http://127.0.0.1:5000/video_feed" alt="Live View" className="photo-webcam" onError={(e) => console.error('Error loading live view stream', e)} />
// // // // // // // //                 <Webcam
// // // // // // // //                     audio={false}
// // // // // // // //                     ref={webcamRef}
// // // // // // // //                     forceScreenshotSourceSize={true}
// // // // // // // //                     videoConstraints={{
// // // // // // // //                         height: 720,
// // // // // // // //                         width: 1280
// // // // // // // //                     }}
// // // // // // // //                     screenshotFormat='image/jpeg'
// // // // // // // //                     className='photo-webcam'
// // // // // // // //                 />
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // }

// // // // // // // // export default Photo;

// // // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // import Webcam from 'react-webcam';
// // // // // // // import "../../css/Photo.css";
// // // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // // import axios from 'axios';

// // // // // // // function Photo() {
// // // // // // //     const webcamRef = useRef(null);
// // // // // // //     const navigate = useNavigate();
// // // // // // //     const [countdown, setCountdown] = useState(10);
// // // // // // //     const [photoCount, setPhotoCount] = useState(0);
// // // // // // //     const [photos, setPhotos] = useState([]);
// // // // // // //     const [flash, setFlash] = useState(false);
// // // // // // //     const [backgroundImage, setBackgroundImage] = useState(background_en);
// // // // // // //     const intervalId = useRef(null);

// // // // // // //     const startLiveView = async () => {
// // // // // // //         try {
// // // // // // //             await axios.post('http://127.0.0.1:5004/start_live_view');
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error starting live view:', error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const stopLiveView = async () => {
// // // // // // //         try {
// // // // // // //             await axios.post('http://127.0.0.1:5004/stop_live_view');
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error stopping live view:', error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const captureImage = async () => {
// // // // // // //         try {
// // // // // // //             await axios.get('http://127.0.0.1:5000/capture/'); // GET 메서드 사용
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error capturing image:', error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const takeSnapshot = async () => {
// // // // // // //         setFlash(true);
// // // // // // //         if (webcamRef.current) {
// // // // // // //             const imageSrc = webcamRef.current.getScreenshot();
// // // // // // //             const newPhotoArray = [...photos, imageSrc];
// // // // // // //             setPhotos(newPhotoArray);
// // // // // // //             setPhotoCount((prevCount) => prevCount + 1);
// // // // // // //         }
// // // // // // //         await stopLiveView();
// // // // // // //         await captureImage();
// // // // // // //         await startLiveView();
// // // // // // //         setTimeout(() => {
// // // // // // //             setFlash(false);
// // // // // // //         }, 100);
// // // // // // //     };

// // // // // // //     useEffect(() => {
// // // // // // //         intervalId.current = setInterval(async () => {
// // // // // // //             setCountdown(prevCountdown => {
// // // // // // //                console.log(photoCount);
// // // // // // //                 if (prevCountdown > 1) {
// // // // // // //                     return prevCountdown - 1;
// // // // // // //                 } else {
// // // // // // //                     if (photoCount < 8) {
// // // // // // //                         takeSnapshot();
// // // // // // //                     }
// // // // // // //                     else {
// // // // // // //                         clearInterval(intervalId.current); // 타이머 중지
// // // // // // //                         const getPhotos = async () => {
// // // // // // //                             try {
// // // // // // //                                 const response = await axios.get('http://127.0.0.1:5000/photos');
// // // // // // //                                 const formattedImages = response.data.images.map(img => {
// // // // // // //                                     return { ...img, url: img.url.replace(/\\/g, '/') };
// // // // // // //                                 });
// // // // // // //                                 sessionStorage.setItem('photos', JSON.stringify(formattedImages));
// // // // // // //                                 navigate('/photo-choose');
// // // // // // //                             } catch (error) {
// // // // // // //                                 console.error('Error fetching photos:', error);
// // // // // // //                             }
// // // // // // //                         };
// // // // // // //                         getPhotos();
// // // // // // //                     }
// // // // // // //                     return 10; // Reset countdown
// // // // // // //                 }
// // // // // // //             });
// // // // // // //         }, 1000);

// // // // // // //         return () => clearInterval(intervalId.current);
// // // // // // //     }, [photoCount, photos, navigate, takeSnapshot]);

// // // // // // //     useEffect(() => {
// // // // // // //         const language = sessionStorage.getItem('language');
// // // // // // //         if (language === 'en') {
// // // // // // //             setBackgroundImage(background_en);
// // // // // // //         } else if (language === 'ko') {
// // // // // // //             setBackgroundImage(background_kr);
// // // // // // //         } else if (language === 'vi') {
// // // // // // //             setBackgroundImage(background_vn);
// // // // // // //         }
// // // // // // //     }, []);

// // // // // // //     useEffect(() => {
// // // // // // //         const initializeLiveView = async () => {
// // // // // // //             await startLiveView();
// // // // // // //         };
// // // // // // //         initializeLiveView();
// // // // // // //         return () => {
// // // // // // //             const cleanupLiveView = async () => {
// // // // // // //                 await stopLiveView();
// // // // // // //             };
// // // // // // //             cleanupLiveView();
// // // // // // //         };
// // // // // // //     }, []);

// // // // // // //     return (
// // // // // // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // // //                 <div className="photo-countdown">{countdown}</div>
// // // // // // //             </div>
// // // // // // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // // //                 <div className="photo-count">{photoCount}/8</div>
// // // // // // //             </div>
// // // // // // //             <div className="middle-photo-div">
// // // // // // //                 <img src="http://127.0.0.1:5004/video_feed" alt="Live View" className="photo-webcam" onError={(e) => console.error('Error loading live view stream', e)} />
// // // // // // //                 <Webcam
// // // // // // //                     audio={false}
// // // // // // //                     ref={webcamRef}
// // // // // // //                     forceScreenshotSourceSize={true}
// // // // // // //                     videoConstraints={{
// // // // // // //                         height: 720,
// // // // // // //                         width: 1280
// // // // // // //                     }}
// // // // // // //                     screenshotFormat='image/jpeg'
// // // // // // //                     className='photo-webcam'
// // // // // // //                 />
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // }

// // // // // // // export default Photo;



// // // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // // import { useTranslation } from 'react-i18next';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import i18n from '../../translations/i18n';
// // // // // // import Webcam from 'react-webcam';
// // // // // // import "../../css/Photo.css";
// // // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // // import frame from '../../assets/Photo/Snap/frame.png';

// // // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // // import axios from 'axios';
// // // // // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';


// // // // // // function Photo() {
// // // // // //      const { t } = useTranslation();
// // // // // //      const webcamRef = useRef(null);
// // // // // //      const navigate = useNavigate();
// // // // // //      const [hoveredImage, setHoveredImage] = useState(null);
// // // // // //      const [countdown, setCountdown] = useState(8);
// // // // // //      const [photoCount, setPhotoCount] = useState(0);
// // // // // //      const [intervalId, setIntervalId] = useState(null);
// // // // // //      const [photos, setPhotos] = useState([]);
// // // // // //      const [flash, setFlash] = useState(false);
     
// // // // // //      const [clickedButton, setClickedButton] = useState(false);

// // // // // //      const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // // // //      const rightCornerDivValue = (photoCount + 1) * (1 / 8);

// // // // // //      const takeSnapshot = async() => {
// // // // // //           setFlash(true);
// // // // // //           const imageSrc = webcamRef.current.getScreenshot();
// // // // // //           const newPhotoArray = [...photos, imageSrc];
// // // // // //           setPhotos(newPhotoArray);
// // // // // //           setPhotoCount((prevCount) => prevCount + 1);

// // // // // //           // setTimeout(() => {
// // // // // //           //      setFlash(false);
// // // // // //           // }, 100);
// // // // // // //1장 찍을 때마다 사진 찍어라

 
// // // // // // setTimeout(async () => {      
// // // // // //       const response=await sendCaptureReq()     
// // // // // //  console.log("response result>>>",response)  
// // // // // //      setFlash(false);
// // // // // // }, 5000);
// // // // // //           if (photoCount == 7) {
// // // // // //                const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // // // //                     id: index,
// // // // // //                     url: photo
// // // // // //                }));

// // // // // //                const photos=await getPhotos()
// // // // // //                console.log("axios photos",photos)
// // // // // //                const formattedImages = photos.images.map(img => {
// // // // // //                     // const newImages=p.images.map(img=>{return {...img,url:img.url.replace(/\\/g, '\\') }})
// // // // // //                     // return { status:p.status, images:newImages};
// // // // // //                     return {...img,url:img.url.replace(/\\/g, '/')             }
                    
// // // // // //                   });
// // // // // //                   console.log("포맷",formattedImages)
// // // // // //                   const newObj={status:photos.status,images:formattedImages}
// // // // // //                   sessionStorage.setItem('photos', JSON.stringify(formattedImages));
               
// // // // // //                //3~5초
// // // // // //                navigate('/photo-choose')
// // // // // //           } else {
// // // // // //                setCountdown(8);
// // // // // //           }
// // // // // //      };

// // // // // //      useEffect(() => {
// // // // // //           const timer = setInterval(() => {
// // // // // //                if (countdown > 0) {
// // // // // //                     setCountdown(countdown - 1);
// // // // // //                } else {
// // // // // //                     takeSnapshot();
// // // // // //                }
// // // // // //           }, 1000);

// // // // // //           return () => clearInterval(timer); // Cleanup timer on unmount
// // // // // //      }, [countdown]);

// // // // // //      useEffect(() => {
// // // // // //           const language = sessionStorage.getItem('language');
// // // // // //           if (language === 'en') {
// // // // // //                setBackgroundImage(background_en);
// // // // // //           } else if (language === 'ko') {
// // // // // //                setBackgroundImage(background_kr);
// // // // // //           } else if (language === 'vi') {
// // // // // //                setBackgroundImage(background_vn);
// // // // // //           }
// // // // // //      }, [])

// // // // // //      const handleMouseEnter = (image) => {
// // // // // //           setHoveredImage(image);
// // // // // //      }

// // // // // //      const handleMouseLeave = () => {
// // // // // //           setHoveredImage(null);
// // // // // //      }

// // // // // //      return (
// // // // // //           <div className={`photo-container ${flash ? ' animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // // //                <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // // //                     <div className="photo-countdown">{countdown}</div>
// // // // // //                </div>
// // // // // //                <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // // //                     <div className="photo-count">{photoCount}/8</div>
// // // // // //                </div>
// // // // // //                <div className="middle-photo-div">
// // // // // //                     <Webcam
// // // // // //                          audio={false}
// // // // // //                          ref={webcamRef}
// // // // // //                          forceScreenshotSourceSize={true}
// // // // // //                          videoConstraints={{
// // // // // //                               height: 720,
// // // // // //                               width: 1280
// // // // // //                          }}
// // // // // //                          screenshotFormat='image/jpeg'
// // // // // //                          className='photo-webcam'
// // // // // //                     />
// // // // // //                </div>
// // // // // //           </div>
// // // // // //      );
// // // // // // }

// // // // // // export default Photo;

// // // // // import React, { useEffect, useState, useRef } from 'react';
// // // // // import { useTranslation } from 'react-i18next';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import i18n from '../../translations/i18n';
// // // // // import Webcam from 'react-webcam';
// // // // // import "../../css/Photo.css";
// // // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // // import frame from '../../assets/Photo/Snap/frame.png';
// // // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // // import axios from 'axios';
// // // // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';

// // // // // const LiveView = () => {
// // // // //     return (
// // // // //         <div className="live-view">
// // // // //             <img src="http://localhost:5000/video_feed" alt="Live View" />
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // function Photo() {
// // // // //     const { t } = useTranslation();
// // // // //     const webcamRef = useRef(null);
// // // // //     const navigate = useNavigate();
// // // // //     const [hoveredImage, setHoveredImage] = useState(null);
// // // // //     const [countdown, setCountdown] = useState(8);
// // // // //     const [photoCount, setPhotoCount] = useState(0);
// // // // //     const [intervalId, setIntervalId] = useState(null);
// // // // //     const [photos, setPhotos] = useState([]);
// // // // //     const [flash, setFlash] = useState(false);
// // // // //     const [clickedButton, setClickedButton] = useState(false);
// // // // //     const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // // //     const startLiveView = async () => {
// // // // //         await axios.post('http://localhost:5000/start_live_view', {}, { withCredentials: true });
// // // // //     };

// // // // //     const stopLiveView = async () => {
// // // // //         await axios.post('http://localhost:5000/stop_live_view', {}, { withCredentials: true });
// // // // //     };

// // // // //     const takeSnapshot = async () => {
// // // // //         setFlash(true);
// // // // //         const imageSrc = webcamRef.current.getScreenshot();
// // // // //         const newPhotoArray = [...photos, imageSrc];
// // // // //         setPhotos(newPhotoArray);
// // // // //         setPhotoCount((prevCount) => prevCount + 1);

// // // // //         setTimeout(async () => {
// // // // //             const response = await sendCaptureReq();
// // // // //             console.log("response result>>>", response);
// // // // //             setFlash(false);
// // // // //         }, 5000);

// // // // //         if (photoCount === 7) {
// // // // //             const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // // //                 id: index,
// // // // //                 url: photo
// // // // //             }));

// // // // //             const photos = await getPhotos();
// // // // //             console.log("axios photos", photos);
// // // // //             const formattedImages = photos.images.map(img => {
// // // // //                 return { ...img, url: img.url.replace(/\\/g, '/') };
// // // // //             });
// // // // //             console.log("포맷", formattedImages);
// // // // //             sessionStorage.setItem('photos', JSON.stringify(formattedImages));

// // // // //             navigate('/photo-choose');
// // // // //         } else {
// // // // //             setCountdown(8);
// // // // //         }
// // // // //     };

// // // // //     useEffect(() => {
// // // // //         const timer = setInterval(() => {
// // // // //             if (countdown > 0) {
// // // // //                 setCountdown(countdown - 1);
// // // // //             } else {
// // // // //                 takeSnapshot();
// // // // //             }
// // // // //         }, 1000);

// // // // //         return () => clearInterval(timer);
// // // // //     }, [countdown]);

// // // // //     useEffect(() => {
// // // // //         const language = sessionStorage.getItem('language');
// // // // //         if (language === 'en') {
// // // // //             setBackgroundImage(background_en);
// // // // //         } else if (language === 'ko') {
// // // // //             setBackgroundImage(background_kr);
// // // // //         } else if (language === 'vi') {
// // // // //             setBackgroundImage(background_vn);
// // // // //         }


// // // // //         startLiveView();

// // // // //         return () => {
// // // // //             stopLiveView();
// // // // //         };
// // // // //     }, []);

// // // // //     const handleMouseEnter = (image) => {
// // // // //         setHoveredImage(image);
// // // // //     }

// // // // //     const handleMouseLeave = () => {
// // // // //         setHoveredImage(null);
// // // // //     }

// // // // //     return (
// // // // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // // //                 <div className="photo-countdown">{countdown}</div>
// // // // //             </div>
// // // // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // // //                 <div className="photo-count">{photoCount}/8</div>
// // // // //             </div>
// // // // //             <div className="middle-photo-div">
// // // // //                 {countdown > 1 ? (
// // // // //                     <LiveView />
// // // // //                 ) : (
// // // // //                     <Webcam
// // // // //                         audio={false}
// // // // //                         ref={webcamRef}
// // // // //                         forceScreenshotSourceSize={true}
// // // // //                         videoConstraints={{
// // // // //                             height: 720,
// // // // //                             width: 1280,
// // // // //                         }}
// // // // //                         screenshotFormat='image/jpeg'
// // // // //                         className='photo-webcam'
// // // // //                     />
// // // // //                 )}
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // }

// // // // // export default Photo;


// // // // import React, { useEffect, useState, useRef } from 'react';
// // // // import { useTranslation } from 'react-i18next';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import i18n from '../../translations/i18n';
// // // // import Webcam from 'react-webcam';
// // // // import "../../css/Photo.css";
// // // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // // import frame from '../../assets/Photo/Snap/frame.png';
// // // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // // import axios from 'axios';
// // // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';

// // // // const LiveView = () => {
// // // //     return (
// // // //         <div className="live-view">
// // // //             <img src="http://localhost:5000/video_feed" alt="Live View" />
// // // //         </div>
// // // //     );
// // // // }

// // // // function Photo() {
// // // //     const { t } = useTranslation();
// // // //     const webcamRef = useRef(null);
// // // //     const navigate = useNavigate();
// // // //     const [hoveredImage, setHoveredImage] = useState(null);
// // // //     const [countdown, setCountdown] = useState(8);
// // // //     const [photoCount, setPhotoCount] = useState(0);
// // // //     const [photos, setPhotos] = useState([]);
// // // //     const [flash, setFlash] = useState(false);
// // // //     const [backgroundImage, setBackgroundImage] = useState(background_en);

// // // //     const startLiveView = async () => {
// // // //         await axios.post('http://localhost:5000/start_live_view', {}, { withCredentials: true });
// // // //     };

// // // //     const stopLiveView = async () => {
// // // //         await axios.post('http://localhost:5000/stop_live_view', {}, { withCredentials: true });
// // // //     };

// // // //     const capturePhoto = async () => {
// // // //         setFlash(true);
// // // //         const imageSrc = webcamRef.current.getScreenshot();
// // // //         const newPhotoArray = [...photos, imageSrc];
// // // //         setPhotos(newPhotoArray);
// // // //         setPhotoCount((prevCount) => prevCount + 1);

// // // //         // 사진 업로드
// // // //         try {
// // // //             await axios.post('http://localhost:8000/photos', { photo: imageSrc });
// // // //         } catch (error) {
// // // //             console.error('Error uploading photo:', error);
// // // //         }

// // // //         setTimeout(() => {
// // // //             setFlash(false);
// // // //         }, 500);

// // // //         // 카운트가 8에 도달했는지 확인하고 페이지 이동
// // // //         if (photoCount + 1 === 8) {
// // // //             const photosWithIds = newPhotoArray.map((photo, index) => ({
// // // //                 id: index,
// // // //                 url: photo
// // // //             }));

// // // //             const photos = await getPhotos();
// // // //             const formattedImages = photos.images.map(img => {
// // // //                 return { ...img, url: img.url.replace(/\\/g, '/') };
// // // //             });
// // // //             sessionStorage.setItem('photos', JSON.stringify(formattedImages));

// // // //             navigate('/photo-choose');
// // // //         } else {
// // // //             setCountdown(8);  // 카운트다운 리셋
// // // //             startLiveView();  // 다시 라이브뷰 시작
// // // //         }
// // // //     };

// // // //     useEffect(() => {
// // // //         const timer = setInterval(() => {
// // // //             if (countdown > 0) {
// // // //                 setCountdown(countdown - 1);
// // // //             } else {
// // // //                 stopLiveView();  // 라이브뷰 중지
// // // //                 capturePhoto();  // 사진 촬영 및 업로드
// // // //             }
// // // //         }, 1000);

// // // //         return () => clearInterval(timer);  // 타이머 클리어
// // // //     }, [countdown]);

// // // //     useEffect(() => {
// // // //         const language = sessionStorage.getItem('language');
// // // //         if (language === 'en') {
// // // //             setBackgroundImage(background_en);
// // // //         } else if (language === 'ko') {
// // // //             setBackgroundImage(background_kr);
// // // //         } else if (language === 'vi') {
// // // //             setBackgroundImage(background_vn);
// // // //         }

// // // //         startLiveView();  // 컴포넌트가 마운트될 때 라이브뷰 시작

// // // //         return () => {
// // // //             stopLiveView();  // 컴포넌트가 언마운트될 때 라이브뷰 중지
// // // //         };
// // // //     }, []);

// // // //     const handleMouseEnter = (image) => {
// // // //         setHoveredImage(image);
// // // //     }

// // // //     const handleMouseLeave = () => {
// // // //         setHoveredImage(null);
// // // //     }

// // // //     return (
// // // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // // //                 <div className="photo-countdown">{countdown}</div>
// // // //             </div>
// // // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // // //                 <div className="photo-count">{photoCount}/8</div>
// // // //             </div>
// // // //             <div className="middle-photo-div">
// // // //                 {countdown > 1 ? (
// // // //                     <LiveView />
// // // //                 ) : (
// // // //                     <Webcam
// // // //                         audio={false}
// // // //                         ref={webcamRef}
// // // //                         forceScreenshotSourceSize={true}
// // // //                         videoConstraints={{
// // // //                             height: 720,
// // // //                             width: 1280
// // // //                         }}
// // // //                         screenshotFormat='image/jpeg'
// // // //                         className='photo-webcam'
// // // //                     />
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default Photo;


// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { useTranslation } from 'react-i18next';
// // // import { useNavigate } from 'react-router-dom';
// // // import i18n from '../../translations/i18n';
// // // import Webcam from 'react-webcam';
// // // import "../../css/Photo.css";
// // // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // // import frame from '../../assets/Photo/Snap/frame.png';
// // // import background_en from '../../assets/Photo/Snap/BG.png';
// // // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // // import axios from 'axios';
// // // import { axiosInstance, getPhotos, sendCaptureReq } from '../../api/config';

// // // const LiveView = () => {
// // //     return (
// // //         <div className="live-view">
// // //             <img src="http://localhost:5000/video_feed" alt="Live View" />
// // //         </div>
// // //     );
// // // }

// // // function Photo() {
// // //     const { t } = useTranslation();
// // //     const webcamRef = useRef(null); // useRef는 여기에서 선언합니다.
// // //     const navigate = useNavigate();
// // //     const [hoveredImage, setHoveredImage] = useState(null);
// // //     const [countdown, setCountdown] = useState(8);
// // //     const [photoCount, setPhotoCount] = useState(0);
// // //     const [photos, setPhotos] = useState([]);
// // //     const [flash, setFlash] = useState(false);
// // //     const [backgroundImage, setBackgroundImage] = useState(background_en);

// // //     const startLiveView = async () => {
// // //         try {
// // //             const response = await axios.post('http://localhost:5000/start_live_view', {}, { withCredentials: true });
// // //             console.log(response.data);
// // //         } catch (error) {
// // //             console.error('Error starting live view:', error);
// // //         }
// // //     };
    
// // //     const stopLiveView = async () => {
// // //         try {
// // //             const response = await axios.post('http://localhost:5000/stop_live_view', {}, { withCredentials: true });
// // //             console.log(response.data);
// // //         } catch (error) {
// // //             console.error('Error stopping live view:', error);
// // //         }
// // //     };

// // //     const capturePhoto = async () => {
// // //         setFlash(true);

// // //         try {
// // //             const response = await axios.get('http://127.0.0.1:5000/capture');
// // //             const { file_saved_as } = response.data;

// // //             const newPhotoArray = [...photos, file_saved_as];
// // //             setPhotos(newPhotoArray);
// // //             setPhotoCount((prevCount) => prevCount + 1);

// // //             // 사진 업로드
// // //             await axios.post('http://localhost:8000/photos', { photo: file_saved_as });
// // //         } catch (error) {
// // //             console.error('Error capturing or uploading photo:', error);
// // //         }

// // //         setTimeout(() => {
// // //             setFlash(false);
// // //         }, 500);

// // //         // 카운트가 8에 도달했는지 확인하고 페이지 이동
// // //         if (photoCount + 1 === 8) {
// // //             const photosWithIds = photos.map((photo, index) => ({
// // //                 id: index,
// // //                 url: photo
// // //             }));

// // //             const photosData = await getPhotos();
// // //             const formattedImages = photosData.images.map(img => {
// // //                 return { ...img, url: img.url.replace(/\\/g, '/') };
// // //             });
// // //             sessionStorage.setItem('photos', JSON.stringify(formattedImages));

// // //             navigate('/photo-choose');
// // //         } else {
// // //             setCountdown(8);  // 카운트다운 리셋
// // //             startLiveView();  // 다시 라이브뷰 시작
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const timer = setInterval(() => {
// // //             if (countdown > 0) {
// // //                 setCountdown(countdown - 1);
// // //             } else {
// // //                 stopLiveView();  // 라이브뷰 중지
// // //                 capturePhoto();  // 사진 촬영 및 업로드
// // //             }
// // //         }, 1000);

// // //         return () => clearInterval(timer);  // 타이머 클리어
// // //     }, [countdown]);

// // //     useEffect(() => {
// // //         const language = sessionStorage.getItem('language');
// // //         if (language === 'en') {
// // //             setBackgroundImage(background_en);
// // //         } else if (language === 'ko') {
// // //             setBackgroundImage(background_kr);
// // //         } else if (language === 'vi') {
// // //             setBackgroundImage(background_vn);
// // //         }

// // //         startLiveView();  // 컴포넌트가 마운트될 때 라이브뷰 시작

// // //         return () => {
// // //             stopLiveView();  // 컴포넌트가 언마운트될 때 라이브뷰 중지
// // //         };
// // //     }, []);

// // //     const handleMouseEnter = (image) => {
// // //         setHoveredImage(image);
// // //     }

// // //     const handleMouseLeave = () => {
// // //         setHoveredImage(null);
// // //     }

// // //     return (
// // //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// // //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// // //                 <div className="photo-countdown">{countdown}</div>
// // //             </div>
// // //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// // //                 <div className="photo-count">{photoCount}/8</div>
// // //             </div>
// // //             <div className="middle-photo-div">
// // //                 {countdown > 1 ? (
// // //                     <LiveView />
// // //                 ) : (
// // //                     <div>
// // //                         <Webcam
// // //                             audio={false}
// // //                             ref={webcamRef}
// // //                             forceScreenshotSourceSize={true}
// // //                             videoConstraints={{
// // //                                 height: 720,
// // //                                 width: 1280
// // //                             }}
// // //                             screenshotFormat='image/jpeg'
// // //                             className='photo-webcam'
// // //                         />
// // //                     </div>
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Photo;



import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import "../../css/Photo.css";
import countdownImg from '../../assets/Photo/Snap/countdown.png';
import photocountImg from '../../assets/Photo/Snap/photocount.png';
import background_en from '../../assets/Photo/Snap/BG.png';
import background_kr from '../../assets/Photo/Snap/kr/BG.png';
import background_vn from '../../assets/Photo/Snap/vn/BG.png';
import axios from 'axios';
import { getPhotos } from '../../api/config';

const LiveView = () => {
    return (
        <div className="live-view">
            <img src="http://127.0.0.1:5000/video_feed" alt="Live View" />
        </div>
    );
}

function Photo() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(8);
    const [photoCount, setPhotoCount] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [flash, setFlash] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(background_en);
  const soundTakePhoto='./take_photo.wav'
    const startLiveView = async () => {
        try {
                     //음성 재생
      
       console.log(response.data);
            const response = await axios.post('http://127.0.0.1:5000/start_live_view', {}, { withCredentials: true });
   
        } catch (error) {
            console.error('Error starting live view:', error);
        }
    };
    
    const stopLiveView = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/stop_live_view', {}, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error('Error stopping live view:', error);
        }
    };
useEffect(()=>{
    if (flash) {
           const audio = new Audio(soundTakePhoto); 
    audio.muted=true
    audio.play()
    audio.muted=false   
    }

},[flash])
    const capturePhoto = async () => {
        setFlash(true);

        try {
            const response = await axios.get('http://127.0.0.1:5000/capture');
            const { file_saved_as } = response.data;

            const newPhotoArray = [...photos, file_saved_as];
            setPhotos(newPhotoArray);
            setPhotoCount((prevCount) => prevCount + 1);

            // 사진 업로드
            await axios.get('http://127.0.0.1:8000/photos', { photo: file_saved_as });
        } catch (error) {
            console.error('Error capturing or uploading photo:', error);
        }

        setTimeout(() => {
            setFlash(false);
        }, 500);

        // 카운트가 8에 도달했는지 확인하고 페이지 이동
        if (photoCount + 1 === 8) {
            const photosWithIds = photos.map((photo, index) => ({
                id: index,
                url: photo
            }));

            const photosData = await getPhotos();
            const formattedImages = photosData.images.map(img => {
                return { ...img, url: img.url.replace(/\\/g, '/') };
            });
            sessionStorage.setItem('photos', JSON.stringify(formattedImages));

            navigate('/photo-choose');
        } else {
            startLiveView();  // 다시 라이브뷰 시작
            setCountdown(8);  // 카운트다운 리셋
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            } else {
                stopLiveView();  // 라이브뷰 중지
                capturePhoto();  // 사진 촬영 및 업로드
            }
        }, 1000);

        return () => clearInterval(timer);  // 타이머 클리어
    }, [countdown]);

    useEffect(() => {
        const language = sessionStorage.getItem('language');
        if (language === 'en') {
            setBackgroundImage(background_en);
        } else if (language === 'ko') {
            setBackgroundImage(background_kr);
        } else if (language === 'vi') {
            setBackgroundImage(background_vn);
        }

        startLiveView();  // 컴포넌트가 마운트될 때 라이브뷰 시작

        return () => {
            stopLiveView();  // 컴포넌트가 언마운트될 때 라이브뷰 중지
        };
    }, []);
    const sound='./look_up_smile.wav'
    // const audioRef = useRef(null);
  
    useEffect(() => {
      //음성 재생
      const audio = new Audio(sound); 
      audio.muted=true
      audio.play()
      audio.muted=false
  
    }, []);
    return (
        <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
                <div className="photo-countdown">{countdown}</div>
            </div>
            <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
                <div className="photo-count">{photoCount}/8</div>
            </div>
            <div className="middle-photo-div">
                <LiveView />
            </div>
        </div>
    );
}

export default Photo;


// // import React, { useEffect, useState } from 'react';
// // import { useTranslation } from 'react-i18next';
// // import { useNavigate } from 'react-router-dom';
// // import "../../css/Photo.css";
// // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // import background_en from '../../assets/Photo/Snap/BG.png';
// // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // import background_vn from '../../assets/Photo/Snap/vn/BG.png';
// // import axios from 'axios';
// // import { getPhotos } from '../../api/config';

// // const LiveView = () => {
// //     return (
// //         <div className="live-view">
// //             <img src="http://127.0.0.1:5000/video_feed" alt="Live View" />
// //         </div>
// //     );
// // }

// // function Photo() {
// //     const { t } = useTranslation();
// //     const navigate = useNavigate();
// //     const [countdown, setCountdown] = useState(8);
// //     const [photoCount, setPhotoCount] = useState(0);
// //     const [photos, setPhotos] = useState([]);
// //     const [flash, setFlash] = useState(false);
// //     const [backgroundImage, setBackgroundImage] = useState(background_en);

// //     const startLiveView = async () => {
// //         try {
// //             const response = await axios.post('http://127.0.0.1:5000/start_live_view', {}, { withCredentials: true });
// //             console.log(response.data);
// //         } catch (error) {
// //             console.error('Error starting live view:', error);
// //         }
// //     };

// //     const stopLiveView = async () => {
// //         try {
// //             const response = await axios.post('http://127.0.0.1:5000/stop_live_view', {}, { withCredentials: true });
// //             console.log(response.data);
// //         } catch (error) {
// //             console.error('Error stopping live view:', error);
// //         }
// //     };

// //     const capturePhoto = async () => {
// //         setFlash(true);

// //         try {
// //             const response = await axios.get('http://127.0.0.1:5000/capture');
// //             const { file_saved_as } = response.data;

// //             const newPhotoArray = [...photos, file_saved_as];
// //             setPhotos(newPhotoArray);
// //             setPhotoCount((prevCount) => prevCount + 1);

// //             // 사진 업로드
// //             await axios.post('http://127.0.0.1:8000/photos', { photo: file_saved_as });
// //         } catch (error) {
// //             console.error('Error capturing or uploading photo:', error);
// //         }

// //         setTimeout(() => {
// //             setFlash(false);
// //         }, 500);

// //         // 카운트가 8에 도달했는지 확인하고 페이지 이동
// //         if (photoCount + 1 === 8) {
// //             const photosWithIds = photos.map((photo, index) => ({
// //                 id: index,
// //                 url: photo
// //             }));

// //             const photosData = await getPhotos();
// //             const formattedImages = photosData.images.map(img => {
// //                 return { ...img, url: img.url.replace(/\\/g, '/') };
// //             });
// //             sessionStorage.setItem('photos', JSON.stringify(formattedImages));

// //             navigate('/photo-choose');
// //         } else {
// //             setCountdown(8);  // 카운트다운 리셋
// //             startLiveView();  // 다시 라이브뷰 시작
// //         }
// //     };

// //     useEffect(() => {
// //         const timer = setInterval(() => {
// //             if (countdown > 0) {
// //                 setCountdown(countdown - 1);
// //             } else {
// //                 stopLiveView();  // 라이브뷰 중지
// //                 capturePhoto();  // 사진 촬영 및 업로드
// //             }
// //         }, 1000);

// //         return () => clearInterval(timer);  // 타이머 클리어
// //     }, [countdown]);

// //     useEffect(() => {
// //         const language = sessionStorage.getItem('language');
// //         if (language === 'en') {
// //             setBackgroundImage(background_en);
// //         } else if (language === 'ko') {
// //             setBackgroundImage(background_kr);
// //         } else if (language === 'vi') {
// //             setBackgroundImage(background_vn);
// //         }

// //         startLiveView();  // 컴포넌트가 마운트될 때 라이브뷰 시작

// //         return () => {
// //             stopLiveView();  // 컴포넌트가 언마운트될 때 라이브뷰 중지
// //         };
// //     }, []);

// //     return (
// //         <div className={`photo-container ${flash ? 'animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// //             <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// //                 <div className="photo-countdown">{countdown}</div>
// //             </div>
// //             <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// //                 <div className="photo-count">{photoCount}/8</div>
// //             </div>
// //             <div className="middle-photo-div">
// //                 <LiveView />
// //             </div>
// //         </div>
// //     );
// // }

// // export default Photo;


// // import React, { useEffect, useState, useRef } from 'react';
// // import { useTranslation } from 'react-i18next';
// // import { useNavigate } from 'react-router-dom';
// // import i18n from '../../translations/i18n';
// // import Webcam from 'react-webcam';
// // import "../../css/Photo.css";
// // import countdownImg from '../../assets/Photo/Snap/countdown.png';
// // import photocountImg from '../../assets/Photo/Snap/photocount.png';
// // import frame from '../../assets/Photo/Snap/frame.png';

// // import background_en from '../../assets/Photo/Snap/BG.png';
// // import background_kr from '../../assets/Photo/Snap/kr/BG.png';
// // import background_vn from '../../assets/Photo/Snap/vn/BG.png';


// // function Photo() {
// //      const { t } = useTranslation();
// //      const webcamRef = useRef(null);
// //      const navigate = useNavigate();
// //      const [hoveredImage, setHoveredImage] = useState(null);
// //      const [countdown, setCountdown] = useState(8);
// //      const [photoCount, setPhotoCount] = useState(0);
// //      const [intervalId, setIntervalId] = useState(null);
// //      const [photos, setPhotos] = useState([]);
// //      const [flash, setFlash] = useState(false);
// //      const [clickedButton, setClickedButton] = useState(false);

// //      const [backgroundImage, setBackgroundImage] = useState(background_en);

// //      const rightCornerDivValue = (photoCount + 1) * (1 / 8);

// //      const takeSnapshot = () => {
// //           setFlash(true);
// //           const imageSrc = webcamRef.current.getScreenshot();
// //           const newPhotoArray = [...photos, imageSrc];
// //           setPhotos(newPhotoArray);
// //           setPhotoCount((prevCount) => prevCount + 1);

// //           setTimeout(() => {
// //                setFlash(false);
// //           }, 100);

// //           if (photoCount == 7) {
// //                const photosWithIds = newPhotoArray.map((photo, index) => ({
// //                     id: index,
// //                     url: photo
// //                }));
// //                sessionStorage.setItem('photos', JSON.stringify(photosWithIds));
// //                navigate('/photo-choose')
// //           } else {
// //                setCountdown(8);
// //           }
// //      };

// //      useEffect(() => {
// //           const timer = setInterval(() => {
// //                if (countdown > 0) {
// //                     setCountdown(countdown - 1);
// //                } else {
// //                     takeSnapshot();
// //                }
// //           }, 1000);

// //           return () => clearInterval(timer); // Cleanup timer on unmount
// //      }, [countdown]);

// //      useEffect(() => {
// //           const language = sessionStorage.getItem('language');
// //           if (language === 'en') {
// //                setBackgroundImage(background_en);
// //           } else if (language === 'ko') {
// //                setBackgroundImage(background_kr);
// //           } else if (language === 'vi') {
// //                setBackgroundImage(background_vn);
// //           }
// //      }, [])

// //      const handleMouseEnter = (image) => {
// //           setHoveredImage(image);
// //      }

// //      const handleMouseLeave = () => {
// //           setHoveredImage(null);
// //      }

// //      return (
// //           <div className={`photo-container ${flash ? ' animate' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
// //                <div className="left-photo-div" style={{ backgroundImage: `url(${countdownImg})` }}>
// //                     <div className="photo-countdown">{countdown}</div>
// //                </div>
// //                <div className="right-photo-div" style={{ backgroundImage: `url(${photocountImg})` }}>
// //                     <div className="photo-count">{photoCount}/8</div>
// //                </div>
// //                <div className="middle-photo-div">
// //                     <Webcam
// //                          audio={false}
// //                          ref={webcamRef}
// //                          forceScreenshotSourceSize={true}
// //                          videoConstraints={{
// //                               height: 720,
// //                               width: 1280
// //                          }}
// //                          screenshotFormat='image/jpeg'
// //                          className='photo-webcam'
// //                     />
// //                </div>
// //           </div>
// //      );
// // }

// // export default Photo;