import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Print.css";

// Background
import background_en from '../assets/Prints/BG.png';
import background_kr from '../assets/Prints/kr/BG.png';
import background_vn from '../assets/Prints/vn/BG.png';

// QR
import QRCode from 'qrcode.react';

function Print() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [hoveredImage, setHoveredImage] = useState(null);

     const [background, setBackground] = useState(background_en);
     const sound='./thank_being.wav'
     // const audioRef = useRef(null);
   
     useEffect(() => {
       //음성 재생
       const audio = new Audio(sound); 
       audio.muted=true
       audio.play()
       audio.muted=false
   
     }, []);
     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage === 'en') {
               setBackground(background_en);
          } else if (storedLanguage === 'ko') {
               setBackground(background_kr);
          } else if (storedLanguage === 'vi') {
               setBackground(background_vn);
          }
     }, []);
     const src='./print.wav'
     // const audioRef = useRef(null);
   
     useEffect(() => {
       //음성 재생
       const audio = new Audio(src); 
       audio.muted=true
       audio.play()
       audio.muted=false
   
     }, []);
     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const clearSessionStorageAndLeaveOut = () => {
          sessionStorage.clear();
          navigate('/');
     }

     const QRCodeComponent = () => {
          const myImage = sessionStorage.getItem('uploadedCloudPhotoUrl');
          return (
               <QRCode
                    value={myImage}
                    size={200}
               />
          )
     }

     return (
          <div className='print-container' style={{ backgroundImage: `url(${background})` }} onClick={clearSessionStorageAndLeaveOut}>
               <div className="qr-code-container">
                    <QRCodeComponent />
               </div>
          </div>
     );
}

export default Print;