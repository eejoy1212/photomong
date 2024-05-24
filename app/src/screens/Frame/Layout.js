import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../../translations/i18n';
import '../../css/Frame.css';
import Background from './Background';
import axios from 'axios';

// Import images
import confirm from '../../assets/Frame/Layout/confirm.png';
import confirm_click from '../../assets/Frame/Layout/confirm_click.png';

// Go Back
import goback_en from '../../assets/Common/goback.png';
import goback_en_hover from '../../assets/Common/gobackhover.png';
import goback_kr from '../../assets/Common/kr/goback.png';
import goback_kr_hover from '../../assets/Common/kr/gobackhover.png';
import goback_vn from '../../assets/Common/vn/goback.png';
import goback_vn_hover from '../../assets/Common/vn/gobackhover.png';

// Confirm
import confirm_en from '../../assets/Frame/Layout/confirm.png';
import confirm_en_hover from '../../assets/Frame/Layout/confirm_click.png';
import confirm_kr from '../../assets/Frame/Layout/Confirm/kr/confirm.png';
import confirm_kr_hover from '../../assets/Frame/Layout/Confirm/kr/confirm_click.png';
import confirm_vn from '../../assets/Frame/Layout/Confirm/vn/confirm.png';
import confirm_vn_hover from '../../assets/Frame/Layout/Confirm/vn/confirm_click.png';
import { originAxiosInstance } from '../../api/config';

function Layout() {
     const [layoutBackground, setLayoutBackground] = useState(null);
     const [layouts, setLayouts] = useState([]);
     // const [clickedIndex, setClickedIndex] = useState(null);
     const [clickedTitles, setClickedTitles] = useState([]);
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [goBackBg, setGoBackBg] = useState([]);
     const [language, setLanguage] = useState(null);
     const [confirmButton, setConfirmButton] = useState(confirm_en);
     const [confirmHoverButton, setConfirmHoverButton] = useState(confirm_en_hover);
     const [confirmClick, setConfirmClick] = useState(false);
     const [slicedLayouts,setSlicedLayouts]=useState([])
     //드래그 끝나면 기존 레이아웃중에 5개 다음거 담기
     const [sliceIdx,setSliceIdx]=useState(0)
     //드래그 중일때 카드 선택 안되도록 하기
     const [draging,setDraging]=useState(false)
     const { t } = useTranslation();
     const navigate = useNavigate();
     const onDragEnd = (e) => {
          // e.preventDefault()
          setSliceIdx(prevIdx => (prevIdx + 1) % 4);
          const nextSliceIdx = (sliceIdx + 1) % 4; // 다음에 가져올 slicedLayouts의 시작 인덱스
          // 0,5
          // 5,10
          console.log("가져오는 인덱스들>>>",5*nextSliceIdx,5*(1+nextSliceIdx))
    const nextSlicedLayouts = layouts[nextSliceIdx];
    getBackground(nextSliceIdx)
    setSlicedLayouts(...nextSlicedLayouts);
    setDraging(false)
      };
      const onDrag=(e)=>{
          // e.preventDefault()
          console.log("드래그 중!!")
          setDraging(true)
      }
     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               i18n.changeLanguage(storedLanguage);
               setLanguage(storedLanguage);
          }

          const frame = sessionStorage.getItem('selectedFrame');
          if (frame) {
               setSelectedFrame(JSON.parse(frame).frame);
          }

          const sessionStyleBg = sessionStorage.getItem('styleBg');
          if (sessionStyleBg) {
               let layoutBg = '';
               if (sessionStyleBg == 'Seasons') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
                    }
               } else if (sessionStyleBg == 'Party') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Party/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Party/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Party/BG.png`);
                    }
               } else if (sessionStyleBg == 'Cartoon') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Cartoon/BG.png`);
                    }
               } else if (sessionStyleBg == 'Minimalism') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Minimalism/BG.png`);
                    }
               } else if (sessionStyleBg == 'Collab') {
                    if (storedLanguage == 'ko') {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/kr/BG.png`);
                    } else if (storedLanguage == 'vi') {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/vn/BG.png`);
                    } else {
                         layoutBg = require(`../../assets/Frame/Layout/Collab/BG.png`);
                    }
               }
               setLayoutBackground(layoutBg);
          }

          if (storedLanguage === 'en') {
               setGoBackBg(goback_en);
               setConfirmButton(confirm_en);
               setConfirmHoverButton(confirm_en_hover);
          } else if (storedLanguage === 'ko') {
               setGoBackBg(goback_kr);
               setConfirmButton(confirm_kr);
               setConfirmHoverButton(confirm_kr_hover);
          } else if (storedLanguage === 'vi') {
               setGoBackBg(goback_vn);
               setConfirmButton(confirm_vn);
               setConfirmHoverButton(confirm_vn_hover);
          }
     }, []);

     useEffect(() => {
          const fetchLayoutsByBackground = async () => {
               try {
                    const frame = sessionStorage.getItem('selectedFrame');
                    console.log("선택 배경>>>",sessionStorage.getItem('styleBg'))
                         const seasonsBg="Seasons"
                         const partyBg="Party"
                         const cartoonBg="Cartoon"
                         const minBg= "Minimalism"
                    const seasonsResponse = await originAxiosInstance.get(`${process.env.REACT_APP_BACKEND}/layouts/api/by-background/` + seasonsBg + '/frame/' + JSON.parse(frame).frame);
                    const seasonsLayoutDatas = seasonsResponse.data
                    const seasonsNewBackgrounds = seasonsLayoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BACKEND + item.photo,
                         photo_cover: process.env.REACT_APP_BACKEND + item.photo_cover,
                         photo_full: process.env.REACT_APP_BACKEND + item.photo_full
                    }));
                    const partyResponse = await originAxiosInstance.get(`${process.env.REACT_APP_BACKEND}/layouts/api/by-background/` + partyBg + '/frame/' + JSON.parse(frame).frame);
                    const partyLayoutDatas =partyResponse.data
                    const partyNewBackgrounds = partyLayoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BACKEND + item.photo,
                         photo_cover: process.env.REACT_APP_BACKEND + item.photo_cover,
                         photo_full: process.env.REACT_APP_BACKEND + item.photo_full
                    }));
                    const cartoonResponse = await originAxiosInstance.get(`${process.env.REACT_APP_BACKEND}/layouts/api/by-background/` + cartoonBg + '/frame/' + JSON.parse(frame).frame);
                    const cartoonLayoutDatas =cartoonResponse.data
                    const cartoonNewBackgrounds = cartoonLayoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BACKEND + item.photo,
                         photo_cover: process.env.REACT_APP_BACKEND + item.photo_cover,
                         photo_full: process.env.REACT_APP_BACKEND + item.photo_full
                    }));
                    const minResponse = await originAxiosInstance.get(`${process.env.REACT_APP_BACKEND}/layouts/api/by-background/` + minBg + '/frame/' + JSON.parse(frame).frame);
                    const minLayoutDatas =minResponse.data
                    const minNewBackgrounds = minLayoutDatas.map(item => ({
                         title: item.title,
                         photo: process.env.REACT_APP_BACKEND + item.photo,
                         photo_cover: process.env.REACT_APP_BACKEND + item.photo_cover,
                         photo_full: process.env.REACT_APP_BACKEND + item.photo_full
                    }));
                    const resAll=[[seasonsNewBackgrounds],[partyNewBackgrounds],[cartoonNewBackgrounds],[minNewBackgrounds]]
                    setLayouts(resAll);
                    let idx=0;
                    if(sessionStorage.getItem('styleBg')===seasonsBg){
                         idx=0
                    }
                    else if(sessionStorage.getItem('styleBg')===partyBg){
                         idx=1
                    }
                    else if(sessionStorage.getItem('styleBg')===cartoonBg){
                         idx=2
                    }
                    else if(sessionStorage.getItem('styleBg')===minBg){
                         idx=3
                    }
                    console.log('스타일 ex season',sessionStorage.getItem('styleBg'))
                    setSliceIdx(idx)
                    setSlicedLayouts(...resAll[idx])
               } catch (error) {
                    console.error(error)
               }
          }

          fetchLayoutsByBackground()
     }, []);

     const handleClick = (index,clickedTitle) => {
          if (draging)return
         //라우팅 할 때 리스트 한번에 보내기
          // sessionStorage.setItem('selectedLayout', JSON.stringify(layouts[index]));
          // setClickedIndex(index === clickedIndex ? null : index);
          if (clickedTitles.includes(clickedTitle)) {
               setClickedTitles(prevTitles => prevTitles.filter(clickedTitle => clickedTitle != clickedTitle));

          
          } else {
               setClickedTitles(prevTitles => [...prevTitles, clickedTitle]);
               
           }
          
          
          setConfirmClick(confirmButton)
     }

     const goToPayment = () => {  
         
          if (confirmClick === confirmButton) {
               const selectedLayouts=[]
            console.log("버튼 클릭",layouts,clickedTitles)
            for (let i = 0; i < layouts.length; i++) {
                    const fiveLayout = layouts[i];
                    for (let j = 0; j < fiveLayout.length; j++) {
                         const layout = fiveLayout[j];
                        
             
                    for (let k = 0; k < layout.length; k++) {
                         const element = layout[k];
                                //   const filtered=layout.filter(l=>l.title)
                        
                         for (let l = 0; l < clickedTitles.length; l++) {
                           if (element.title===clickedTitles[l]) {
                               console.log("선택된 거",element.title) 
                               selectedLayouts.push(element)
                           }
                              
                         }
                    }
                    }
                    
               }
               sessionStorage.setItem('selectedLayout', JSON.stringify(selectedLayouts));
               // sessionStorage.setItem('selectedLayout', JSON.stringify(layouts[index]));
          
               // navigate('/payment');
               navigate('/payment-number');
          }
     }

     const hoverGoBackBtn = (goBackBG) => {
          if (goBackBG === 'ko') {
               setGoBackBg(goBackBg === goback_kr ? goback_kr_hover : goback_kr);
          } else if (goBackBG === 'vi') {
               setGoBackBg(goBackBg === goback_vn ? goback_vn_hover : goback_vn);
          } else {
               setGoBackBg(goBackBg === goback_en ? goback_en_hover : goback_en);
          }
     }
console.log("slide >>>",slicedLayouts)
const getBackground=(sliceIdx)=>{
     const storedLanguage = sessionStorage.getItem('language');
     if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
          setLanguage(storedLanguage);
     }

     const frame = sessionStorage.getItem('selectedFrame');
     if (frame) {
          setSelectedFrame(JSON.parse(frame).frame);
     }

     const sessionStyleBg = sessionStorage.getItem('styleBg');
     if (sessionStyleBg) {
          let layoutBg = '';
          if (sliceIdx===0) {
               if (storedLanguage == 'ko') {
                    layoutBg = require(`../../assets/Frame/Layout/Seasons/kr/BG.png`);
               } else if (storedLanguage == 'vi') {
                    layoutBg = require(`../../assets/Frame/Layout/Seasons/vn/BG.png`);
               } else {
                    layoutBg = require(`../../assets/Frame/Layout/Seasons/BG.png`);
               }
          } else if (sliceIdx===1) {
               if (storedLanguage == 'ko') {
                    layoutBg = require(`../../assets/Frame/Layout/Party/kr/BG.png`);
               } else if (storedLanguage == 'vi') {
                    layoutBg = require(`../../assets/Frame/Layout/Party/vn/BG.png`);
               } else {
                    layoutBg = require(`../../assets/Frame/Layout/Party/BG.png`);
               }
          } else if (sliceIdx===2) {
               if (storedLanguage == 'ko') {
                    layoutBg = require(`../../assets/Frame/Layout/Cartoon/kr/BG.png`);
               } else if (storedLanguage == 'vi') {
                    layoutBg = require(`../../assets/Frame/Layout/Cartoon/vn/BG.png`);
               } else {
                    layoutBg = require(`../../assets/Frame/Layout/Cartoon/BG.png`);
               }
          } else if (sliceIdx===3) {
               if (storedLanguage == 'ko') {
                    layoutBg = require(`../../assets/Frame/Layout/Minimalism/kr/BG.png`);
               } else if (storedLanguage == 'vi') {
                    layoutBg = require(`../../assets/Frame/Layout/Minimalism/vn/BG.png`);
               } else {
                    layoutBg = require(`../../assets/Frame/Layout/Minimalism/BG.png`);
               }
          } else if (sliceIdx===4) {
               if (storedLanguage == 'ko') {
                    layoutBg = require(`../../assets/Frame/Layout/Collab/kr/BG.png`);
               } else if (storedLanguage == 'vi') {
                    layoutBg = require(`../../assets/Frame/Layout/Collab/vn/BG.png`);
               } else {
                    layoutBg = require(`../../assets/Frame/Layout/Collab/BG.png`);
               }
          }
          setLayoutBackground(layoutBg);
     }

     if (storedLanguage === 'en') {
          setGoBackBg(goback_en);
          setConfirmButton(confirm_en);
          setConfirmHoverButton(confirm_en_hover);
     } else if (storedLanguage === 'ko') {
          setGoBackBg(goback_kr);
          setConfirmButton(confirm_kr);
          setConfirmHoverButton(confirm_kr_hover);
     } else if (storedLanguage === 'vi') {
          setGoBackBg(goback_vn);
          setConfirmButton(confirm_vn);
          setConfirmHoverButton(confirm_vn_hover);
     }
}
// useEffect(() => {
//      if (!draging) {
//           // Fetch next set of layouts if not dragging
//           // const nextSliceIdx = (sliceIdx + 1) % 4;
//           // const nextSlicedLayouts = layouts[nextSliceIdx];
//           // setSlicedLayouts(nextSlicedLayouts);
//           // getBackground(nextSliceIdx);
//      }
// }, [draging,layouts]);
     return (
          <div className='layout-container' 
          // onDragStart={onDrag}
          // onDrag={onDrag}
          // onDragEnd={onDragEnd}
          // onClick={onDrag}
          style={{backgroundImage: `url(${layoutBackground})`
               // backgroundColor:"red"
          }}
          >
               <div className="go-back" style={{ backgroundImage: `url(${goBackBg})` }} onClick={() => navigate("/background")} onMouseEnter={() => hoverGoBackBtn(language)} onMouseLeave={() => hoverGoBackBtn(language)}></div>
               <div className="style-section"
               draggable={true}
               onDragStart={onDrag}
               onDrag={onDrag}
               onDragEnd={onDragEnd}
               
               // onClick={onDrag}
               style={{
               }}
               >
                    {slicedLayouts.map((item, index) => (
                         <div key={item.id} 
                         draggable={false}
                         className="style-column">
                              <div className="image-style-div"
                              draggable={false}
                              >
                                   <img
                                   draggable={!draging}
                                   className={`${selectedFrame === '2cut-x2' || selectedFrame === '4-cutx2' ? 'layout-overlay-cut' : 'layout-overlay'} ${clickedTitles.includes(item.title) ? 'clicked' : ''}`}
                                   src={item.photo_full}
                                   onClick={() => handleClick(index,item.title)}
                                   />
                                   {/* <div 
                                     draggable={false}
                                   className={`${selectedFrame === '2cut-x2' || selectedFrame === '4-cutx2' ? 'layout-overlay-cut' : 'layout-overlay'} ${clickedTitles.includes(item.title) ? 'clicked' : ''}`} style={{ backgroundImage: `url(${item.photo_full})` }} onClick={() => handleClick(index,item.title)}></div> */}
                              </div>
                         </div>
                    ))}
               </div>
               <div
                    className="confirm-layout-button"
                    style={{ backgroundImage: `url(${confirmClick === confirmButton ? confirmHoverButton : confirmButton})` }}
                    onClick={goToPayment}
               ></div>
          </div>
     );
};

export default Layout;