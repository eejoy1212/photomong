// import React, { useEffect, useState, createRef, useCallback, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
// import i18n from '../translations/i18n';
// import "../css/Sticker.css";
// import frame from '../assets/Sticker/frame.png';
// import sticker_frame from '../assets/Sticker/sticker_frame.png';
// import sticker_taskbar from '../assets/Sticker/sticker_taskbar.png';
// import { Image as KonvaImage, Layer, Stage, Rect, Transformer } from 'react-konva';
// import Konva from 'konva';
// import useImage from 'use-image';
// import { StickerItem } from '../screens/StickerItem';
// import axios from 'axios';
// import { Resizable } from 're-resizable';
// // Sticker
// import { stickers } from './stickers.data';

// // Go Back
// import goback_en from '../assets/Common/goback.png';
// import goback_en_hover from '../assets/Common/gobackhover.png';
// import goback_kr from '../assets/Common/kr/goback.png';
// import goback_kr_hover from '../assets/Common/kr/gobackhover.png';
// import goback_vn from '../assets/Common/vn/goback.png';
// import goback_vn_hover from '../assets/Common/vn/gobackhover.png';

// // Background
// import background_en from '../assets/Sticker/BG.png';
// import background_kr from '../assets/Sticker/kr/BG.png';
// import background_vn from '../assets/Sticker/vn/BG.png';

// // Sticker
// import mood_en from '../assets/Sticker/mood.png';
// import mood_en_click from '../assets/Sticker/mood-click.png';
// import mood_kr from '../assets/Sticker/kr/mood-default.png';
// import mood_kr_click from '../assets/Sticker/kr/mood-pressed.png';
// import mood_vn from '../assets/Sticker/vn/mood-default.png';
// import mood_vn_click from '../assets/Sticker/vn/mood-pressed.png';

// import lovely_en from '../assets/Sticker/lovely.png';
// import lovely_en_click from '../assets/Sticker/lovely-click.png';
// import lovely_kr from '../assets/Sticker/kr/lovely-default.png';
// import lovely_kr_click from '../assets/Sticker/kr/lovely-pressed.png';
// import lovely_vn from '../assets/Sticker/vn/lovely-default.png';
// import lovely_vn_click from '../assets/Sticker/vn/lovely-pressed.png';

// import cartoon_en from '../assets/Sticker/cartoon.png';
// import cartoon_en_click from '../assets/Sticker/cartoon-click.png';
// import cartoon_kr from '../assets/Sticker/kr/cartoon-default.png';
// import cartoon_kr_click from '../assets/Sticker/kr/cartoon-pressed.png';
// import cartoon_vn from '../assets/Sticker/vn/cartoon-default.png';
// import cartoon_vn_click from '../assets/Sticker/vn/cartoon-pressed.png';

// import y2k_en from '../assets/Sticker/y2k.png';
// import y2k_en_click from '../assets/Sticker/y2k-click.png';
// import y2k_kr from '../assets/Sticker/kr/y2k-default.png';
// import y2k_kr_click from '../assets/Sticker/kr/y2k-pressed.png';
// import y2k_vn from '../assets/Sticker/vn/y2k-default.png';
// import y2k_vn_click from '../assets/Sticker/vn/y2k-pressed.png';

// import print from '../assets/Sticker/print.png';
// import print_click from '../assets/Sticker/print_click.png';
// import print_kr from '../assets/Sticker/kr/print-default.png';
// import print_kr_click from '../assets/Sticker/kr/print-pressed.png';
// import print_vn from '../assets/Sticker/vn/print-default.png';
// import print_vn_click from '../assets/Sticker/vn/print-pressed.png';
// //frame나오는 공간
// import frame_box from '../assets/Sticker/frame_box.png';
// import CustomCarousel from '../components/CustomCarousel';
// import VerticalCustomCarousel from '../components/VerticalCustomCarousel';
// import { originAxiosInstance } from '../api/config';

// function Filter() {
//      const { t } = useTranslation();
//      const navigate = useNavigate();
//      const [src, setSrc] = useState(null)
//      const [hoveredImage, setHoveredImage] = useState(null);
//      const [selectedLayout, setSelectedLayout] = useState(null);
//      const [selectedPhotos, setSelectedPhotos] = useState([]);
//      const [filterEffect, setFilterEffect] = useState(null);
//      const [myBackgrounds, setMyBackgrounds] = useState([]);
//      const bgLength=myBackgrounds.length
//      const [selectedFrame, setSelectedFrame] = useState(null);
//      const [images, setImages] = useState([]);
//      const [selectedId, selectShape] = useState(null);
//      const [clickPrint, setClickPrint] = useState(false);
//      const [orderCode, setOrderCode] = useState(null);
//      const [language, setLanguage] = useState('en');

//      const [backgroundImage, setBackgroundImage] = useState(background_en);
//      //스크롤 인덱스
//      const [scrollIdx, setScrollIdx] = useState(0)
//      const [dragStartY, setDragStartY] = useState(0);
//      const [bgIdx,setBgIdx]=useState(0)
//      const [stickerImgs,setStickerImgs]=useState([])
//      // Sticker
//      const [isSel,setIsSel]=useState(false)
//      const [mood, setMood] = useState(null);
//      const [lovely, setLovely] = useState(null);
//      const [cartoon, setCartoon] = useState(null);
//      const [y2k, setY2k] = useState(null);
//      const [printButton, setPrintButton] = useState(null);

//      const [goBackButton, setGoBackButton] = useState(goback_en);
//      const [clickedButton, setClickedButton] = useState(false);
//      const [stickerDrag,setStickerDrag]=useState(false)
// const [photos,setPhotos]=useState([])
// const [selectedItems,setSelectedItems]=useState([])
//      const background = new Image();
//      background.crossOrigin = 'Anonymous';
//      background.src = '/photo_saved/photo.png'//sessionStorage.getItem('downloaded-image');
//      console.log("다운로드 백그라운드", sessionStorage.getItem('photos'))
//      const [selectedCategory, setSelectedCategory] = useState('MOOD');

//      const stageRef = useRef(null);
//      const [stageRefs,setStageRefs]=useState([])
//      const chunkArray = (arr, size) => {
//           return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
//      };

// useEffect(()=>{
//      const photos = JSON.parse(sessionStorage.getItem('photos'));
// console.log("photos>>>",photos)
// if (photos===null)return;
//      setPhotos(photos)
// },[])
// useEffect(()=>{
//      if (!photos)return;
//      const selItems = photos.filter((item, index) => selectedPhotos.includes(index));

//      setSelectedItems(selItems)
// },[photos])
//      useEffect(() => {
//           if (!background.src) {
//                // background.src = sessionStorage.getItem('downloaded-image');
//                window.location.reload();
//           }
//      }, []);

//      useEffect(() => {
//           const storedLanguage = sessionStorage.getItem('language');
//           if (storedLanguage) {
//                setLanguage(storedLanguage);
//                if (storedLanguage === 'en') {
//                     setBackgroundImage(background_en);
//                     setMood(mood_en);
//                     setLovely(lovely_en);
//                     setCartoon(cartoon_en);
//                     setY2k(y2k_en);
//                     setPrintButton(print);
//                     setGoBackButton(goback_en);
//                } else if (storedLanguage === 'ko') {
//                     setBackgroundImage(background_kr);
//                     setMood(mood_kr);
//                     setLovely(lovely_kr);
//                     setCartoon(cartoon_kr);
//                     setY2k(y2k_kr);
//                     setPrintButton(print_kr);
//                     setGoBackButton(goback_kr);
//                } else if (storedLanguage === 'vi') {
//                     setBackgroundImage(background_vn);
//                     setMood(mood_vn);
//                     setLovely(lovely_vn);
//                     setCartoon(cartoon_vn);
//                     setY2k(y2k_vn);
//                     setPrintButton(print_vn);
//                     setGoBackButton(goback_vn);
//                }
//           }

//           // get session storage selectedLayout
//           const sessionSelectedLayout = sessionStorage.getItem('selectedLayout');
//           if (sessionSelectedLayout) {
//                const parsedSelectedLayout = JSON.parse(sessionSelectedLayout);

//                console.log("레이아웃을 찾아서>>>", parsedSelectedLayout.photo_full)
//                setSelectedLayout(parsedSelectedLayout.photo_cover);
//                // setMyBackground(parsedSelectedLayout.photo);
//                setMyBackgrounds(parsedSelectedLayout.map(it=>it.photo_full));

//                const imgs=[]
//           for (let i = 0; i < parsedSelectedLayout.length; i++) {
//              imgs.push([])
               
//           }
//           setImages(imgs)
//           setStickerImgs(imgs)
//                setStageRefs()
//                setImages(parsedSelectedLayout.map(b=>[]))
//                background.src=parsedSelectedLayout.photo_full
//                setSrc(parsedSelectedLayout.photo_full)
//           }

//           // Retrieve selected photos from session storage
//           const storedSelectedPhotos = JSON.parse(sessionStorage.getItem('choosePhotos'));
//           if (storedSelectedPhotos) {

//                setSelectedPhotos(storedSelectedPhotos);
//           }

//           // Filter
//           const filterSession = sessionStorage.getItem('filter');
//           if (filterSession) {
//                setFilterEffect(filterSession);
//           }

//           // Retrieve selected frame from session storage
//           const storedSelectedFrame = JSON.parse(sessionStorage.getItem('selectedFrame'));
//           if (storedSelectedFrame) {

//                setSelectedFrame(storedSelectedFrame.frame);
//           }
//      }, []);

//      const handleMouseEnter = (image) => {
//           setHoveredImage(image);
//      }

//      const handleMouseLeave = () => {
//           setHoveredImage(null);
//      }

//      const displayClassNameForBackground = () => {
//           if (selectedFrame == '2cut-x2') {
//                return 'left-choose-photos-2cut';
//           } else if (selectedFrame == '4-cutx2') {
//                return 'left-choose-photos-4cut';
//           } else if (selectedFrame == '5-cutx2') {
//                return 'left-choose-photos-5cut';
//           } else {
//                return 'left-choose-photos';
//           }
//      }

//      const getImageStyle = () => {
//           return filterEffect;
//      }

//      const displayClassNameForLayout = () => {
//           if (selectedFrame == '2cut-x2') {
//                return 'left-choose-container-2cut';
//           } else if (selectedFrame == '4-cutx2') {
//                return 'left-choose-container-4cut';
//           } else if (selectedFrame == '5-cutx2') {
//                return 'left-choose-container-5cut';
//           } else {
//                return 'left-choose-container';
//           }
//      }

//      const displayClassNameForPhoto = (rowIndex, photoIndex) => {
//           if (selectedFrame === 'Stripx2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item-0-1';
//                } else if (rowIndex === 1 && photoIndex === 0) {
//                     return 'choose-photo-item-1-0';
//                } else if (rowIndex === 1 && photoIndex === 1) {
//                     return 'choose-photo-item-1-1';
//                } else if (rowIndex === 2 && photoIndex === 0) {
//                     return 'choose-photo-item-2-0';
//                } else if (rowIndex === 2 && photoIndex === 1) {
//                     return 'choose-photo-item-2-1';
//                } else if (rowIndex === 3 && photoIndex === 0) {
//                     return 'choose-photo-item-3-0';
//                } else if (rowIndex === 3 && photoIndex === 1) {
//                     return 'choose-photo-item-3-1';
//                }
//           } else if (selectedFrame === '6-cutx2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item6-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item6-0-1';
//                } else if (rowIndex === 1 && photoIndex === 0) {
//                     return 'choose-photo-item6-1-0';
//                } else if (rowIndex === 1 && photoIndex === 1) {
//                     return 'choose-photo-item6-1-1';
//                } else if (rowIndex === 2 && photoIndex === 0) {
//                     return 'choose-photo-item6-2-0';
//                } else if (rowIndex === 2 && photoIndex === 1) {
//                     return 'choose-photo-item6-2-1';
//                }
//           } else if (selectedFrame === '2cut-x2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item-2cut-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item-2cut-0-1';
//                }
//           } else if (selectedFrame === '3-cutx2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item-3cut-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item-3cut-0-1';
//                } else if (rowIndex === 1 && photoIndex === 0) {
//                     return 'choose-photo-item-3cut-0-1';
//                }
//           } else if (selectedFrame === '4-cutx2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item-4cut-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item-4cut-0-1';
//                } else if (rowIndex === 1 && photoIndex === 0) {
//                     return 'choose-photo-item-4cut-1-0';
//                } else if (rowIndex === 1 && photoIndex === 1) {
//                     return 'choose-photo-item-4cut-1-1';
//                }
//           } else if (selectedFrame === '5-cutx2') {
//                if (rowIndex === 0 && photoIndex === 0) {
//                     return 'choose-photo-item-5cut-0-0';
//                } else if (rowIndex === 0 && photoIndex === 1) {
//                     return 'choose-photo-item-5cut-0-1';
//                } else if (rowIndex === 1 && photoIndex === 0) {
//                     return 'choose-photo-item-5cut-1-0';
//                } else if (rowIndex === 1 && photoIndex === 1) {
//                     return 'choose-photo-item-5cut-1-1';
//                }
//           }
//           return 'choose-photo-item';
//      }

//      const showSelectedPhotos = () => {
//           if (selectedFrame == '3-cutx2' && selectedPhotos.length > 1) {
//                const firstPhotoTpl = (
//                     <div className="choose-photo-row">
//                          <div
//                               className="choose-photo-item-3cut-top-line"
//                               style={{ backgroundImage: `url(${photos[selectedPhotos[0]].url})` }}
//                          />
//                     </div>
//                )
//                const selectedPhotoRows = chunkArray(selectedPhotos.slice(1), 2);
//                return (
//                     [firstPhotoTpl, ...selectedPhotoRows.map((row, rowIndex) => (
//                          <div key={rowIndex} className="choose-photo-row">
//                               {row.map((selectedIndex, photoIndex) => (
//                                    <div
//                                         key={photoIndex}
//                                         className={displayClassNameForPhoto(rowIndex, photoIndex)}
//                                         style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
//                                    />
//                               ))}
//                          </div>
//                     ))]
//                );
//           } else if (selectedFrame == '5-cutx2' && selectedPhotos.length > 1) {
//                const lastPhotoTpl = (
//                     <div className="choose-photo-row">
//                          <div
//                               className="choose-photo-item-5cut-last-line"
//                               style={{ backgroundImage: `url(${photos[selectedPhotos[selectedPhotos.length - 1]].url})` }}
//                          />
//                     </div>
//                )
//                const selectedPhotoRows = chunkArray(selectedPhotos.slice(0, selectedPhotos.length - 1), 2);
//                return (
//                     [selectedPhotoRows.map((row, rowIndex) => (
//                          <div key={rowIndex} className="choose-photo-row">
//                               {row.map((selectedIndex, photoIndex) => (
//                                    <div
//                                         key={photoIndex}
//                                         className={displayClassNameForPhoto(rowIndex, photoIndex)}
//                                         style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
//                                    />
//                               ))}
//                          </div>
//                     )), lastPhotoTpl]
//                );
//           } else {
//                const selectedPhotoRows = chunkArray(selectedPhotos, 2);
//                return (
//                     selectedPhotoRows.map((row, rowIndex) => (
//                          <div key={rowIndex} className="choose-photo-row">
//                               {row.map((selectedIndex, photoIndex) => (
//                                    <div
//                                         key={photoIndex}
//                                         className={displayClassNameForPhoto(rowIndex, photoIndex)}
//                                         style={{ backgroundImage: `url(${photos[selectedIndex].url})`, filter: getImageStyle() }}
//                                    />
//                               ))}
//                          </div>
//                     ))
//                );
//           }
//      }

//      // const addStickerToPanel = ({bgIdx, src, width, x, y }) => {
//      //      console.log("스티커 올라갈 프레임 인덱스",bgIdx,images)
//      //      const item={
//      //           width,
//      //           x,
//      //           y,
//      //           src,
//      //           resetButtonRef: createRef()
//      //      }
//      //      setImages((currentImages) => [
//      //           ...currentImages,
//      //           {    bgIdx,
//      //                width,
//      //                x,
//      //                y,
//      //                src,
//      //                resetButtonRef: createRef()
//      //           }
//      //           // {bgIdx:item}
//      //      ]);
//      // };
//      const addStickerToPanel = ({ bgIdx, src, width, x, y }) => {
//           console.log("스티커 올라갈 프레임 인덱스", bgIdx, images);
      
//           const item = {
//               width,
//               x,
//               y,
//               src,
//               resetButtonRef: createRef()
//           };
      
//           setImages((currentImages) => {
//               // Create a new array to avoid mutating the state directly
//               const newImages = currentImages.map((subList, index) => {
//                   if (index === bgIdx) {
//                       return [...subList, item];
//                   }
//                   return subList;
//               });
      
//               return newImages;
//           });
//       };
//      // const resetAllButtons = useCallback(() => {
//      //      images.forEach((image) => {
//      //           if (image.resetButtonRef.current) {
//      //                image.resetButtonRef.current();
//      //           }
//      //      });
//      // }, [images]);

//      // const handleCanvasClick = useCallback(
//      //      (event) => {
//      //           if (event.target.attrs.id === "backgroundImage") {
//      //                resetAllButtons();
//      //           }
//      //      },
//      //      [resetAllButtons]
//      // );
//      const resetAllButtons = useCallback(() => {
//           images.forEach((subList) => {
//               subList.forEach((image) => {
//                   if (image.resetButtonRef.current) {
//                       image.resetButtonRef.current();
//                   }
//               });
//           });
//       }, [images]);
      
//       const handleCanvasClick = useCallback(
//           (event) => {
//               if (event.target.attrs.id === "backgroundImage") {
//                   resetAllButtons();
//               }
//           },
//           [resetAllButtons]
//       );
//      const checkDeselect = (e) => {
//           const clickedOnEmpty = e.target === e.target.getStage();
//           if (clickedOnEmpty) {
//                selectShape(null);
//           }
//      }

//      const filterStickerByCategory = (category) => {
//           setSelectedCategory(category);
//      }

//      const printFrameWithSticker = (event) => {
//           if (clickPrint == true) {
//                return;
//           }
//           setClickPrint(true);

//           callPrinter();
//           uploadCloud();

//           setTimeout(() => {
//                navigate("/print");
//           }, 3000);
//      }

//      const uploadCloud = () => {
//           try {
//                const formData = new FormData();
//                formData.append("photo", stageRef.current.toDataURL());
//                formData.append("order_code", sessionStorage.getItem('orderCodeNum'));

//                originAxiosInstance.post(
//                     `${process.env.REACT_APP_BACKEND}/frames/api/upload_cloud`,
//                     formData,
//                     {
//                          headers: {
//                               'Content-Type': 'multipart/form-data'
//                          }
//                     })
//                     .then(response => {
//                          const data = response.data;
//                          if (data.photo_url) {
//                               sessionStorage.setItem('uploadedCloudPhotoUrl', data.photo_url);
//                               console.log(data.photo_url);
//                          }
//                     })
//                     .catch(error => {
//                          console.log(error);
//                     });
//           } catch (error) {
//                console.log(error);
//           }
//      }

//      // TODO
//      const callPrinter = () => {
//           alert("callPrinter")

//           const formData = new FormData();
//           alert(stageRef.current.toDataURL())
//           alert(selectedFrame)
//           formData.append('photo', stageRef.current.toDataURL());
//           formData.append('frame', selectedFrame);


//           alert(formData)
//           originAxiosInstance.post(
//                `${process.env.REACT_APP_BACKEND}/frames/api/print`,
//                formData,
//                {
//                     headers: {
//                          'Content-Type': 'multipart/form-data'
//                     }
//                })
//                .then(response => {
//                     console.log(response);
//                })
//                .catch(error => {
//                     console.log(error);
//                });

//           // try {
//           //      const formData = new FormData();
//           //      alert(stageRef.current.toDataURL())
//           //      alert(selectedFrame)
//           //      formData.append('photo', stageRef.current.toDataURL());
//           //      formData.append('frame', selectedFrame);


//           //      alert(formData)
//           //      originAxiosInstance.post(
//           //           `${process.env.REACT_APP_BACKEND}/frames/api/print`,
//           //           formData,
//           //           {
//           //                headers: {
//           //                     'Content-Type': 'multipart/form-data'
//           //                }
//           //           })
//           //           .then(response => {
//           //                console.log(response);
//           //           })
//           //           .catch(error => {
//           //                console.log(error);
//           //           });
//           // } catch (error) {
//           //      console.log(error);
//           // }
//      }

//      const hoverGoBackButton = () => {
//           if (language == 'en') {
//                setGoBackButton(goBackButton == goback_en_hover ? goback_en : goback_en_hover);
//           } else if (language == 'vi') {
//                setGoBackButton(goBackButton == goback_vn_hover ? goback_vn : goback_vn_hover);
//           } else if (language == 'ko') {
//                setGoBackButton(goBackButton == goback_kr_hover ? goback_kr : goback_kr_hover);
//           }
//      }

//      const hoverStickerButton = (stickerEffect) => {
//           if (stickerEffect == 'mood') {
//                if (language == 'en') {
//                     setMood(mood == mood_en_click ? mood_en : mood_en_click);
//                } else if (language == 'vi') {
//                     setMood(mood == mood_vn_click ? mood_vn : mood_vn_click);
//                } else if (language == 'ko') {
//                     setMood(mood == mood_kr_click ? mood_kr : mood_kr_click);
//                }
//           } else if (stickerEffect == 'lovely') {
//                if (language == 'en') {
//                     setLovely(lovely == lovely_en_click ? lovely_en : lovely_en_click);
//                } else if (language == 'vi') {
//                     setLovely(lovely == lovely_vn_click ? lovely_vn : lovely_vn_click);
//                } else if (language == 'ko') {
//                     setLovely(lovely == lovely_kr_click ? lovely_kr : lovely_kr_click);
//                }
//           } else if (stickerEffect == 'cartoon') {
//                if (language == 'en') {
//                     setCartoon(cartoon == cartoon_en_click ? cartoon_en : cartoon_en_click);
//                } else if (language == 'vi') {
//                     setCartoon(cartoon == cartoon_vn_click ? cartoon_vn : cartoon_vn_click);
//                } else if (language == 'ko') {
//                     setCartoon(cartoon == cartoon_kr_click ? cartoon_kr : cartoon_kr_click);
//                }
//           } else if (stickerEffect == 'y2k') {
//                if (language == 'en') {
//                     setY2k(y2k == y2k_en_click ? y2k_en : y2k_en_click);
//                } else if (language == 'vi') {
//                     setY2k(y2k == y2k_vn_click ? y2k_vn : y2k_vn_click);
//                } else if (language == 'ko') {
//                     setY2k(y2k == y2k_kr_click ? y2k_kr : y2k_kr_click);
//                }
//           }
//      }

//      const hoverPrintButton = () => {
//           if (language == 'en') {
//                setPrintButton(printButton == print_click ? print : print_click);
//           } else if (language == 'vi') {
//                setPrintButton(printButton == print_vn_click ? print_vn : print_vn_click);
//           } else if (language == 'ko') {
//                setPrintButton(printButton == print_kr_click ? print_kr : print_kr_click);
//           }
//      }

//      // Chunk the selected photos array into arrays of 2 photos each
//      const stickersData = stickers.filter(sticker => sticker.category === selectedCategory);
//      const selectedPhotoRows = chunkArray(selectedPhotos, 2);
//      //스크롤 하면 인덱스에 따라 스티커 타입 정하기
//      const myStickers = chunkArray(stickersData, 4);
//      // console.log("프레임 백그라운드",myBackground)
//      //크기 리사이징 예제코드
//      const [isDragging, setIsDragging] = useState(false);
//      const [position, setPosition] = useState({ x: 100, y: 100 }); // 초기 위치
//      const [radius, setRadius] = useState(50); // 초기 반지름

//      const handleMouseDown = (e) => {
//           setIsDragging(true);
//      };

//      const handleMouseUp = () => {
//           setIsDragging(false);
//      };

//      const handleMouseMove = (e) => {
//           if (!isDragging) return;

//           const newPosition = {
//                x: e.clientX,
//                y: e.clientY
//           };
//           setPosition(newPosition);
//      };

//      const handleMouseLeave2 = () => {
//           setIsDragging(false);
//      };

//      const handleMouseWheel = (e) => {
//           if (e.deltaY > 0) {
//                setRadius(radius - 5);
//           } else {
//                setRadius(radius + 5);
//           }
//      };
//      console.log("my stickers", myStickers, stickers)
//      const onDragStart = (event) => {
//           setDragStartY(event.clientY); // 드래그 시작 위치의 Y 좌표를 저장
//       };

//      const onDragEnd = (event) => {
//           const dragEndY = event.clientY; // 드래그 끝 위치의 Y 좌표
  
//           if (dragEndY > dragStartY) { // 드래그가 위에서 아래로 일어났는지 확인
//               setScrollIdx(prevIdx => (prevIdx + 1) % 4);
//               const nextScrollIdx = (scrollIdx + 1) % 4;
//               console.log("스크롤 인덱스>>>", nextScrollIdx)
//               if (nextScrollIdx === 0) {
//                   setSelectedCategory("MOOD");
//               }
//               else if (nextScrollIdx === 1) {
//                   setSelectedCategory("LOVELY");
//               }
//               else if (nextScrollIdx === 2) {
//                   setSelectedCategory("CARTOON");
//               }
//               else if (nextScrollIdx === 3) {
//                   setSelectedCategory("Y2K");
//               }
//           }
//       };
//       const carouselRef = useRef(null);
//       const [isDown, setIsDown] = useState(false);
//       const [startY, setStartY] = useState(0);
//       const [scrollTop, setScrollTop] = useState(0);
  
//       useEffect(() => {
//           console.log("스티커 드래그 in useeffect",stickerDrag)
//           const carousel = carouselRef.current;
//   const dragging=stickerDrag
//           const handleMouseDown = (e) => {
//                // if (dragging)return
//                console.log(">>>마우스 다운",dragging)
//               setIsDown(true);
//               if (carousel) {
//                if (stickerDrag)return
//                   setStartY(e.pageY - carousel.offsetTop);
//                   setScrollTop(carousel.scrollTop);
//               }
//           };
  
//           const handleMouseLeave = () => {
//                // if (stickerDrag)return
//                console.log(">>>마우스 리브")
//               setIsDown(false);
//           };
  
//           const handleMouseUp = () => {
//                // if (stickerDrag)return
//                console.log(">>>마우스 업")
//               setIsDown(false);
//               snapToClosestItem();
//           };
  
//           const handleMouseMove = (e) => {
//                // return;
//                // if (stickerMoving)return;
//                if (dragging)return
              
//               if (!isDown) return;
//               e.preventDefault();
//               if (carousel) { 
       
//                   const y = e.pageY - carousel.offsetTop;
//                   const walk = (y - startY) * 3; // Scroll speed
//                   carousel.scrollTop = scrollTop - walk;
//               }
//           };
  
//           const snapToClosestItem = () => {
//               if (!carousel) return;
//               const itemHeight = carousel.querySelector('.image').offsetHeight;
//               const scrollY = carousel.scrollTop;
//               const index = Math.round(scrollY / itemHeight);  
//                     console.log(">>>백그라운드 인덱스",index)
//                     setBgIdx(index)
//               carousel.scrollTo({ top: index * itemHeight, behavior: 'smooth' });
//           };
  
//           if (carousel) {
//               carousel.addEventListener('mousedown', handleMouseDown);
//               carousel.addEventListener('mouseleave', handleMouseLeave);
//               carousel.addEventListener('mouseup', handleMouseUp);
//               carousel.addEventListener('mousemove', handleMouseMove);
//           }
  
//           return () => {
//               if (carousel) {
//                   carousel.removeEventListener('mousedown', handleMouseDown);
//                   carousel.removeEventListener('mouseleave', handleMouseLeave);
//                   carousel.removeEventListener('mouseup', handleMouseUp);
//                   carousel.removeEventListener('mousemove', handleMouseMove);
//               }
//           };
//       }, [isDown, startY, scrollTop,stickerDrag]);
   
      
//       useEffect(() => {
//           // add or remove refs
//           setStageRefs((refs) =>
//               Array(bgLength)
//                   .fill()
//                   .map((_, i) => refs[i] || createRef())
//           );
      
//           // stageRef.current 설정 확인
//           if (stageRef.current) {
//               console.log('Stage reference is set:', stageRef.current);
//           } else {
//               console.log('Stage reference is not set');
//           }
//       }, [bgLength]);
// //      useEffect(() => {
// //   // add or remove refs

// //   setStageRefs((refs) =>
// //     Array(bgLength)
// //       .fill()
// //       .map((_, i) => refs[i] || createRef()),
// //   );


// // }, [bgLength]);  

// // 선택된 아이템을 가지고 있는 리스트
// const tempPhotos=[{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},]
// console.log("choose img",selectedItems,selectedPhotos)

//      const getImgListLayout=(selectedFrame,selectedItems)=>{
//         if (selectedItems.length===0) {
          
//           return <></>
//         }
//           if (selectedFrame==="Stripx2") { 
//                 console.log("sel frame in func",selectedFrame,selectedItems)
//                return <div
//                className='selected-photos-s2-list'
               
//                >
//                     {/* 1 row */}
//                      <div
//                  className='selected-photos-s2-row'
//                    ><img
// className='stripx2img'
//                    src={selectedItems[0].url}
//                    />
//                    <img
// className='stripx2img'
//                    src={selectedItems[1].url}
//                    /></div>
//                    {/* 2 row */}
//                    <div
//                   className='selected-photos-s2-row'
//                  ><img
// className='stripx2img'
//                  src={selectedItems[2].url}
//                  />
//                  <img
// className='stripx2img'
//                  src={selectedItems[3].url}
//                  /></div>
//                   {/* 3 row */}
//                   <div
//                   className='selected-photos-s2-row'
//                  ><img
// className='stripx2img'
//                  src={selectedItems[4].url}
//                  />
//                  <img
// className='stripx2img'
//                  src={selectedItems[5].url}
//                  /></div>
//                   {/* 4 row */}
//                   <div
//                   className='selected-photos-s2-row'
//                  ><img
// className='stripx2img'
//                  src={selectedItems[6].url}
//                  />
//                  <img
// className='stripx2img'
//                  src={selectedItems[7].url}
//                  /></div>
//                </div>
//           }
//           else if(selectedFrame==="2cut-x2"){
// return <div
// className='selected-photos-2-list'

// >
//     {selectedItems.map((it,idx)=>
//     idx===0?<div
//     className='selected-photo-2-container-first'
//     ><div
//      className='selected-photo-2'
//        style={{
          
//           backgroundImage: `url(${it.url})`
//       }}
//      /></div>:
//     <div
//     className='selected-photo-2-container'
//     ><div
//      className='selected-photo-2'
//        style={{
          
//           backgroundImage: `url(${it.url})`
//       }}
//      /></div>
//     )} 
// </div>

//           }
//           else if(selectedFrame==="4-cutx2"){
//                console.log("이건가")
//                return <div
//                className='cut4x2-container'
//                >
// <img
// className='cut4x2-0'
// src={selectedItems[0].url}
// />
// <img
// className='cut4x2-1'
// src={selectedItems[1].url}
// />
// <img
// className='cut4x2-2'
// src={selectedItems[2].url}
// />
// <img
// className='cut4x2-3'
// src={selectedItems[3].url}
// />

//                </div>
               
               
//           }
//           else if(selectedFrame==="6-cutx2"){
//                return <div
//                className='cut6x2-container'>
//                     {/* 1 row */}
//                     <div
//                     className='cut6x2-row'
//                     ><img
//                     className='cut6x2-img'
//                     src={selectedItems[0].url}
//                     />
//                          <img
//                          className='cut6x2-img'
//                     src={selectedItems[1].url}
//                     />
//                     </div>
//                      {/* 2 row */}
//                      <div
//                     className='cut6x2-row'
//                     ><img
//                     className='cut6x2-img'
//                     src={selectedItems[2].url}
//                     />
//                          <img
//                          className='cut6x2-img'
//                     src={selectedItems[3].url}
//                     />
//                     </div>
//                     {/* 3 row */}
//                     <div
//                     className='cut6x2-row'
//                     ><img
//                     className='cut6x2-img'
//                     src={selectedItems[4].url}
//                     />
//                          <img
//                          className='cut6x2-img'
//                     src={selectedItems[5].url}
//                     />
//                     </div>
//                </div>
//           }
//           else{

//           }
//      }
//      return (
// <div className='sticker-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
// <div className="go-back" style={{ backgroundImage: `url(${goBackButton})` }} onClick={() => navigate("/filter")} onMouseEnter={hoverGoBackButton} onMouseLeave={hoverGoBackButton}></div>
// <div className="left-sticker">
// <div
//        className='frame-box'
                          
//                     style={{
//                          // backgroundColor:"red",
//                          // overflowY:"hidden",
//                          backgroundImage: `url(${frame_box})`
//                     }}
//                             />
//   <div className='v-carousel-container' ref={carouselRef}>
//             <div className='v-carousel-images'>
//             {myBackgrounds.map((src, index) => (
//                     <div
//                         className='image'
//                         key={index}
//                         style={{
//                             backgroundImage: `url(${src})`
//                         }}
//                     >
//                          {getImgListLayout(selectedFrame,selectedItems)}
//                       <Stage
//      width={1200}
//      height={1000}
//      onClick={handleCanvasClick}
//      onTap={handleCanvasClick}
//      className="konva-image"
//      onMouseDown={checkDeselect}
//      onTouchStart={checkDeselect}
//      ref={stageRefs[index]}
// >
//      <Layer>
//           <KonvaImage
//                image={background}
//                height={1200}
//                width={1000}
//                id="backgroundImage"
//           />
//           {/* {images.map((image, i) => {
               
//                return (
//                     <StickerItem
//                     setStickerDrag={setStickerDrag}
//                     onSelect={()=>{console.log("스티커 클릭")}}

//                          onDelete={() => {
//                               const newImages = [...images];
//                               newImages.splice(i, 1);
//                               setImages(newImages);
//                          }}
//                          onDragEnd={(event) => {
//                               image.x = event.target.x();
//                               image.y = event.target.y();
//                          }}
//                          key={i}
//                          image={image}
//                          shapeProps={image}
//                     />
//                );
//           })} */}
//            {images[bgIdx]===undefined?<></>:images[bgIdx].map((image, i) => {
               
//                return (
//                     <StickerItem
//                     isStickerDrag={stickerDrag}
//                     isSelected={isSel}
//                     setStickerDrag={setStickerDrag}
//                     onTransform={()=>{
//                          console.log("이미지 리사이징 중")
//                     }}
//                     onSelect={()=>{
//                          // setStickerDrag(true)
//                          setIsSel(p=>!p)
//                          console.log("스티커 클릭")}}

//                          onDelete={() => {
//                               const newImages = [...images];
//                               newImages.splice(i, 1);
//                               setImages(newImages);
//                          }}
//                          onDragEnd={(event) => {
//                               image.x = event.target.x();
//                               image.y = event.target.y();
//                          }}
//                          onChange={(x,y,width,height)=>{
//                               console.log("리사이즈 한 너비 / 높이",width,height)
//                          }}
//                          key={i}
//                          image={image}
//                          shapeProps={image}
//                     />
//                );
//           })}
//      </Layer>
// </Stage>
                    
//                     </div>    ))}
//        </div></div>
//   {/* <Stage
//      width={1200}
//      height={1000}
//      onClick={handleCanvasClick}
//      onTap={handleCanvasClick}
//      className="konva-image"
//      onMouseDown={checkDeselect}
//      onTouchStart={checkDeselect}
//      ref={stageRefs[0]}
// >
//      <Layer>
//           <KonvaImage
//                image={background}
//                height={1200}
//                width={1000}
//                id="backgroundImage"
//           />
//           {images.map((image, i) => {
//                return (
//                     <StickerItem
//                          onDelete={() => {
//                               const newImages = [...images];
//                               newImages.splice(i, 1);
//                               setImages(newImages);
//                          }}
//                          onDragEnd={(event) => {
//                               image.x = event.target.x();
//                               image.y = event.target.y();
//                          }}
//                          key={i}
//                          image={image}
//                          shapeProps={image}
//                     />
//                );
//           })}
//      </Layer>
// </Stage> */}
  
// </div>

// <div className="middle-sticker"
//                     draggable={true}
//                     onDragStart={onDragStart}
//                     onDrag={() => {
//                          console.log("드래그 스티커 배경")
//                     }}
//                     onDragEnd={onDragEnd}

//                     style={{
//                          // backgroundColor:"red",
//                          // overflowY:"hidden",
//                          backgroundImage: `url(${sticker_frame})`
//                     }}>


//                     {myStickers.map((group, index) => (
//                          <div key={index} className={index === 0 ? 'sticker-line-1' : 'sticker-line'}>
//                               {group.map((mySticker, photoIndex) => (

//                                    <div
//                                         key={photoIndex}
//                                         className="sticker"
//                                         onClick={() => {
//                                              addStickerToPanel({
//                                                   bgIdx:bgIdx,
//                                                   src: mySticker.photo,
//                                                   width: 100,
//                                                   x: 30,//500,
//                                                   y: 30//500
//                                              });
//                                         }}
//                                    >
//                                         <img className="sticker-image"
//                                              // draggable={false}
//                                              alt={mySticker.title} src={mySticker.photo} width='90px' height='90px' />
//                                    </div>
//                               ))}
//                          </div>
//                     ))}
//                </div>
// <div className="right-sticker" style={{ backgroundImage: `url(${sticker_taskbar})` }}>
//                     <div className="sticker-category">
//                          <div className="sticker-category-item" style={{ backgroundImage: `url(${mood})` }} onClick={() => filterStickerByCategory('MOOD')} onMouseEnter={() => hoverStickerButton('mood')} onMouseLeave={() => hoverStickerButton('mood')}></div>
//                          <div className="sticker-category-item" style={{ backgroundImage: `url(${lovely})` }} onClick={() => filterStickerByCategory('LOVELY')} onMouseEnter={() => hoverStickerButton('lovely')} onMouseLeave={() => hoverStickerButton('lovely')}></div>
//                          <div className="sticker-category-item" style={{ backgroundImage: `url(${cartoon})` }} onClick={() => filterStickerByCategory('CARTOON')} onMouseEnter={() => hoverStickerButton('cartoon')} onMouseLeave={() => hoverStickerButton('cartoon')}></div>
//                          <div className="sticker-category-item" style={{ backgroundImage: `url(${y2k})` }} onClick={() => filterStickerByCategory('Y2K')} onMouseEnter={() => hoverStickerButton('y2k')} onMouseLeave={() => hoverStickerButton('y2k')}></div>
//                     </div>
//                     <div className="sticker-print-btn" style={{ backgroundImage: `url(${printButton})` }} onClick={printFrameWithSticker} onMouseEnter={hoverPrintButton} onMouseLeave={hoverPrintButton}></div>
//                </div>
// </div>
//      );
// }

// export default Filter;



import React, { useEffect, useState, createRef, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from '../translations/i18n';
import "../css/Sticker.css";
import frame from '../assets/Sticker/frame.png';
import sticker_frame from '../assets/Sticker/sticker_frame.png';
import sticker_taskbar from '../assets/Sticker/sticker_taskbar.png';
import { Image as KonvaImage, Layer, Stage, Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';
import { StickerItem } from '../screens/StickerItem';
import axios from 'axios';
import { Resizable } from 're-resizable';
// Sticker
import { stickers } from './stickers.data';

// Go Back
import goback_en from '../assets/Common/goback.png';
import goback_en_hover from '../assets/Common/gobackhover.png';
import goback_kr from '../assets/Common/kr/goback.png';
import goback_kr_hover from '../assets/Common/kr/gobackhover.png';
import goback_vn from '../assets/Common/vn/goback.png';
import goback_vn_hover from '../assets/Common/vn/gobackhover.png';

// Background
import background_en from '../assets/Sticker/BG.png';
import background_kr from '../assets/Sticker/kr/BG.png';
import background_vn from '../assets/Sticker/vn/BG.png';

// Sticker
import mood_en from '../assets/Sticker/mood.png';
import mood_en_click from '../assets/Sticker/mood-click.png';
import mood_kr from '../assets/Sticker/kr/mood-default.png';
import mood_kr_click from '../assets/Sticker/kr/mood-pressed.png';
import mood_vn from '../assets/Sticker/vn/mood-default.png';
import mood_vn_click from '../assets/Sticker/vn/mood-pressed.png';

import lovely_en from '../assets/Sticker/lovely.png';
import lovely_en_click from '../assets/Sticker/lovely-click.png';
import lovely_kr from '../assets/Sticker/kr/lovely-default.png';
import lovely_kr_click from '../assets/Sticker/kr/lovely-pressed.png';
import lovely_vn from '../assets/Sticker/vn/lovely-default.png';
import lovely_vn_click from '../assets/Sticker/vn/lovely-pressed.png';

import cartoon_en from '../assets/Sticker/cartoon.png';
import cartoon_en_click from '../assets/Sticker/cartoon-click.png';
import cartoon_kr from '../assets/Sticker/kr/cartoon-default.png';
import cartoon_kr_click from '../assets/Sticker/kr/cartoon-pressed.png';
import cartoon_vn from '../assets/Sticker/vn/cartoon-default.png';
import cartoon_vn_click from '../assets/Sticker/vn/cartoon-pressed.png';

import y2k_en from '../assets/Sticker/y2k.png';
import y2k_en_click from '../assets/Sticker/y2k-click.png';
import y2k_kr from '../assets/Sticker/kr/y2k-default.png';
import y2k_kr_click from '../assets/Sticker/kr/y2k-pressed.png';
import y2k_vn from '../assets/Sticker/vn/y2k-default.png';
import y2k_vn_click from '../assets/Sticker/vn/y2k-pressed.png';

import print from '../assets/Sticker/print.png';
import print_click from '../assets/Sticker/print_click.png';
import print_kr from '../assets/Sticker/kr/print-default.png';
import print_kr_click from '../assets/Sticker/kr/print-pressed.png';
import print_vn from '../assets/Sticker/vn/print-default.png';
import print_vn_click from '../assets/Sticker/vn/print-pressed.png';
//frame나오는 공간
import frame_box from '../assets/Sticker/frame_box.png';
import CustomCarousel from '../components/CustomCarousel';
import VerticalCustomCarousel from '../components/VerticalCustomCarousel';
import { originAxiosInstance } from '../api/config';

function Filter() {
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [src, setSrc] = useState(null)
     const [hoveredImage, setHoveredImage] = useState(null);
     const [selectedLayout, setSelectedLayout] = useState(null);
     const [selectedPhotos, setSelectedPhotos] = useState([]);
     const [filterEffect, setFilterEffect] = useState(null);
     const [myBackgrounds, setMyBackgrounds] = useState([]);
     const bgLength=myBackgrounds.length
     const [selectedFrame, setSelectedFrame] = useState(null);
     const [images, setImages] = useState([]);
     const [selectedId, selectShape] = useState(null);
     const [clickPrint, setClickPrint] = useState(false);
     const [orderCode, setOrderCode] = useState(null);
     const [language, setLanguage] = useState('en');

     const [backgroundImage, setBackgroundImage] = useState(background_en);
     //스크롤 인덱스
     const [scrollIdx, setScrollIdx] = useState(0)
     const [dragStartY, setDragStartY] = useState(0);
     const [bgIdx,setBgIdx]=useState(0)
     const [stickerImgs,setStickerImgs]=useState([])
     // Sticker
     const [isSel,setIsSel]=useState(false)
     const [mood, setMood] = useState(null);
     const [lovely, setLovely] = useState(null);
     const [cartoon, setCartoon] = useState(null);
     const [y2k, setY2k] = useState(null);
     const [printButton, setPrintButton] = useState(null);

     const [goBackButton, setGoBackButton] = useState(goback_en);
     const [clickedButton, setClickedButton] = useState(false);
     const [stickerDrag,setStickerDrag]=useState(false)
const [photos,setPhotos]=useState([])
const [selectedItems,setSelectedItems]=useState([])
     const background = new Image();
     background.crossOrigin = 'Anonymous';
     background.src = '/photo_saved/photo.png'//sessionStorage.getItem('downloaded-image');
     console.log("다운로드 백그라운드", sessionStorage.getItem('photos'))
     const [selectedCategory, setSelectedCategory] = useState('MOOD');

     const stageRef = useRef(null);
     const [stageRefs,setStageRefs]=useState([])
     const chunkArray = (arr, size) => {
          return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
     };

useEffect(()=>{
     const photos = JSON.parse(sessionStorage.getItem('photos'));
console.log("photos>>>",photos)
if (photos===null)return;
     setPhotos(photos)
},[])
useEffect(()=>{
     if (!photos)return;
     const selItems = photos.filter((item, index) => selectedPhotos.includes(index));

     setSelectedItems(selItems)
},[photos])
     useEffect(() => {
          if (!background.src) {
               // background.src = sessionStorage.getItem('downloaded-image');
               window.location.reload();
          }
     }, []);

     useEffect(() => {
          const storedLanguage = sessionStorage.getItem('language');
          if (storedLanguage) {
               setLanguage(storedLanguage);
               if (storedLanguage === 'en') {
                    setBackgroundImage(background_en);
                    setMood(mood_en);
                    setLovely(lovely_en);
                    setCartoon(cartoon_en);
                    setY2k(y2k_en);
                    setPrintButton(print);
                    setGoBackButton(goback_en);
               } else if (storedLanguage === 'ko') {
                    setBackgroundImage(background_kr);
                    setMood(mood_kr);
                    setLovely(lovely_kr);
                    setCartoon(cartoon_kr);
                    setY2k(y2k_kr);
                    setPrintButton(print_kr);
                    setGoBackButton(goback_kr);
               } else if (storedLanguage === 'vi') {
                    setBackgroundImage(background_vn);
                    setMood(mood_vn);
                    setLovely(lovely_vn);
                    setCartoon(cartoon_vn);
                    setY2k(y2k_vn);
                    setPrintButton(print_vn);
                    setGoBackButton(goback_vn);
               }
          }

          // get session storage selectedLayout
          const sessionSelectedLayout = sessionStorage.getItem('selectedLayout');
          if (sessionSelectedLayout) {
               const parsedSelectedLayout = JSON.parse(sessionSelectedLayout);

               console.log("레이아웃을 찾아서>>>", parsedSelectedLayout.photo_full)
               setSelectedLayout(parsedSelectedLayout.photo_cover);
               // setMyBackground(parsedSelectedLayout.photo);
               setMyBackgrounds(parsedSelectedLayout.map(it=>it.photo_full));

               const imgs=[]
          for (let i = 0; i < parsedSelectedLayout.length; i++) {
             imgs.push([])
               
          }
          setImages(imgs)
          setStickerImgs(imgs)
               setStageRefs()
               setImages(parsedSelectedLayout.map(b=>[]))
               background.src=parsedSelectedLayout.photo_full
               setSrc(parsedSelectedLayout.photo_full)
          }

          // Retrieve selected photos from session storage
          const storedSelectedPhotos = JSON.parse(sessionStorage.getItem('choosePhotos'));
          if (storedSelectedPhotos) {

               setSelectedPhotos(storedSelectedPhotos);
          }

          // Filter
          const filterSession = sessionStorage.getItem('filter');
          if (filterSession) {
               setFilterEffect(filterSession);
          }

          // Retrieve selected frame from session storage
          const storedSelectedFrame = JSON.parse(sessionStorage.getItem('selectedFrame'));
          if (storedSelectedFrame) {

               setSelectedFrame(storedSelectedFrame.frame);
          }
     }, []);

     const handleMouseEnter = (image) => {
          setHoveredImage(image);
     }

     const handleMouseLeave = () => {
          setHoveredImage(null);
     }

     const displayClassNameForBackground = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-photos-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-photos-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-photos-5cut';
          } else {
               return 'left-choose-photos';
          }
     }

     const getImageStyle = () => {
          return filterEffect;
     }

     const displayClassNameForLayout = () => {
          if (selectedFrame == '2cut-x2') {
               return 'left-choose-container-2cut';
          } else if (selectedFrame == '4-cutx2') {
               return 'left-choose-container-4cut';
          } else if (selectedFrame == '5-cutx2') {
               return 'left-choose-container';
          } else {
               return 'left-choose-container';
          }
     }

     const displayClassNameForPhoto = (rowIndex, photoIndex) => {
          if (selectedFrame === 'Stripx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-1-1';
               } else if (rowIndex === 2 && photoIndex === 0) {
                    return 'choose-photo-item-2-0';
               } else if (rowIndex === 2 && photoIndex === 1) {
                    return 'choose-photo-item-2-1';
               } else if (rowIndex === 3 && photoIndex === 0) {
                    return 'choose-photo-item-3-0';
               } else if (rowIndex === 3 && photoIndex === 1) {
                    return 'choose-photo-item-3-1';
               }
          } else if (selectedFrame === '6-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item6-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item6-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item6-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item6-1-1';
               } else if (rowIndex === 2 && photoIndex === 0) {
                    return 'choose-photo-item6-2-0';
               } else if (rowIndex === 2 && photoIndex === 1) {
                    return 'choose-photo-item6-2-1';
               }
          } else if (selectedFrame === '2cut-x2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-2cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-2cut-0-1';
               }
          } else if (selectedFrame === '3-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-3cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-3cut-0-1';
               }
          } else if (selectedFrame === '4-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-4cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-4cut-1-1';
               }
          } else if (selectedFrame === '5-cutx2') {
               if (rowIndex === 0 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-0-0';
               } else if (rowIndex === 0 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-0-1';
               } else if (rowIndex === 1 && photoIndex === 0) {
                    return 'choose-photo-item-5cut-1-0';
               } else if (rowIndex === 1 && photoIndex === 1) {
                    return 'choose-photo-item-5cut-1-1';
               }
          }
          return 'choose-photo-item';
     }

     const showSelectedPhotos = () => {
          if (selectedFrame == '3-cutx2' && selectedPhotos.length > 1) {
               const firstPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-3cut-top-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[0]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(1), 2);
               return (
                    [firstPhotoTpl, ...selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    ))]
               );
          } else if (selectedFrame == '5-cutx2' && selectedPhotos.length > 1) {
               const lastPhotoTpl = (
                    <div className="choose-photo-row">
                         <div
                              className="choose-photo-item-5cut-last-line"
                              style={{ backgroundImage: `url(${photos[selectedPhotos[selectedPhotos.length - 1]].url})` }}
                         />
                    </div>
               )
               const selectedPhotoRows = chunkArray(selectedPhotos.slice(0, selectedPhotos.length - 1), 2);
               return (
                    [selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})` }}
                                   />
                              ))}
                         </div>
                    )), lastPhotoTpl]
               );
          } else {
               const selectedPhotoRows = chunkArray(selectedPhotos, 2);
               return (
                    selectedPhotoRows.map((row, rowIndex) => (
                         <div key={rowIndex} className="choose-photo-row">
                              {row.map((selectedIndex, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className={displayClassNameForPhoto(rowIndex, photoIndex)}
                                        style={{ backgroundImage: `url(${photos[selectedIndex].url})`, filter: getImageStyle() }}
                                   />
                              ))}
                         </div>
                    ))
               );
          }
     }

     const addStickerToPanel = ({ bgIdx, src, width, x, y }) => {
          console.log("스티커 올라갈 프레임 인덱스", bgIdx, images);
      
          const item = {
              width,
              x,
              y,
              src,
              resetButtonRef: createRef()
          };
      
          setImages((currentImages) => {
              const newImages = currentImages.map((subList, index) => {
                  if (index === bgIdx) {
                      return [...subList, item];
                  }
                  return subList;
              });
      
              return newImages;
          });
      };

     const resetAllButtons = useCallback(() => {
          images.forEach((subList) => {
              subList.forEach((image) => {
                  if (image.resetButtonRef.current) {
                      image.resetButtonRef.current();
                  }
              });
          });
      }, [images]);
      
      const handleCanvasClick = useCallback(
          (event) => {
              if (event.target.attrs.id === "backgroundImage") {
                  resetAllButtons();
              }
          },
          [resetAllButtons]
      );

     const checkDeselect = (e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
               selectShape(null);
          }
     }

     const filterStickerByCategory = (category) => {
          setSelectedCategory(category);
     }

     const printFrameWithSticker = (event) => {
          if (clickPrint == true) {
               return;
          }
          setClickPrint(true);

          callPrinter();
          uploadCloud();

          setTimeout(() => {
               navigate("/print");
          }, 3000);
     }

     const uploadCloud = () => {
          try {
               const formData = new FormData();
               formData.append("photo", stageRef.current.toDataURL());
               formData.append("order_code", sessionStorage.getItem('orderCodeNum'));

               originAxiosInstance.post(
                    `${process.env.REACT_APP_BACKEND}/frames/api/upload_cloud`,
                    formData,
                    {
                         headers: {
                              'Content-Type': 'multipart/form-data'
                         }
                    })
                    .then(response => {
                         const data = response.data;
                         if (data.photo_url) {
                              sessionStorage.setItem('uploadedCloudPhotoUrl', data.photo_url);
                              console.log(data.photo_url);
                         }
                    })
                    .catch(error => {
                         console.log(error);
                    });
          } catch (error) {
               console.log(error);
          }
     }

     const callPrinter = () => {
          alert("callPrinter");

          if (!stageRef.current) {
               alert("stageRef.current is null");
               return;
          }

          const formData = new FormData();
          const dataURL = stageRef.current.toDataURL();
          alert(dataURL);
          alert(selectedFrame);
          formData.append('photo', dataURL);
          formData.append('frame', selectedFrame);

          alert(formData);
          originAxiosInstance.post(
               `${process.env.REACT_APP_BACKEND}/frames/api/print`,
               formData,
               {
                    headers: {
                         'Content-Type': 'multipart/form-data'
                    }
               })
               .then(response => {
                    console.log(response);
               })
               .catch(error => {
                    console.log(error);
               });
     }

     const hoverGoBackButton = () => {
          if (language == 'en') {
               setGoBackButton(goBackButton == goback_en_hover ? goback_en : goback_en_hover);
          } else if (language == 'vi') {
               setGoBackButton(goBackButton == goback_vn_hover ? goback_vn : goback_vn_hover);
          } else if (language == 'ko') {
               setGoBackButton(goBackButton == goback_kr_hover ? goback_kr : goback_kr_hover);
          }
     }

     const hoverStickerButton = (stickerEffect) => {
          if (stickerEffect == 'mood') {
               if (language == 'en') {
                    setMood(mood == mood_en_click ? mood_en : mood_en_click);
               } else if (language == 'vi') {
                    setMood(mood == mood_vn_click ? mood_vn : mood_vn_click);
               } else if (language == 'ko') {
                    setMood(mood == mood_kr_click ? mood_kr : mood_kr_click);
               }
          } else if (stickerEffect == 'lovely') {
               if (language == 'en') {
                    setLovely(lovely == lovely_en_click ? lovely_en : lovely_en_click);
               } else if (language == 'vi') {
                    setLovely(lovely == lovely_vn_click ? lovely_vn : lovely_vn_click);
               } else if (language == 'ko') {
                    setLovely(lovely == lovely_kr_click ? lovely_kr : lovely_kr_click);
               }
          } else if (stickerEffect == 'cartoon') {
               if (language == 'en') {
                    setCartoon(cartoon == cartoon_en_click ? cartoon_en : cartoon_en_click);
               } else if (language == 'vi') {
                    setCartoon(cartoon == cartoon_vn_click ? cartoon_vn : cartoon_vn_click);
               } else if (language == 'ko') {
                    setCartoon(cartoon == cartoon_kr_click ? cartoon_kr : cartoon_kr_click);
               }
          } else if (stickerEffect == 'y2k') {
               if (language == 'en') {
                    setY2k(y2k == y2k_en_click ? y2k_en : y2k_en_click);
               } else if (language == 'vi') {
                    setY2k(y2k == y2k_vn_click ? y2k_vn : y2k_vn_click);
               } else if (language == 'ko') {
                    setY2k(y2k == y2k_kr_click ? y2k_kr : y2k_kr_click);
               }
          }
     }

     const hoverPrintButton = () => {
          if (language == 'en') {
               setPrintButton(printButton == print_click ? print : print_click);
          } else if (language == 'vi') {
               setPrintButton(printButton == print_vn_click ? print_vn : print_vn_click);
          } else if (language == 'ko') {
               setPrintButton(printButton == print_kr_click ? print_kr : print_kr_click);
          }
     }

     // Chunk the selected photos array into arrays of 2 photos each
     const stickersData = stickers.filter(sticker => sticker.category === selectedCategory);
     const selectedPhotoRows = chunkArray(selectedPhotos, 2);
     //스크롤 하면 인덱스에 따라 스티커 타입 정하기
     const myStickers = chunkArray(stickersData, 4);
     // console.log("프레임 백그라운드",myBackground)
     //크기 리사이징 예제코드
     const [isDragging, setIsDragging] = useState(false);
     const [position, setPosition] = useState({ x: 100, y: 100 }); // 초기 위치
     const [radius, setRadius] = useState(50); // 초기 반지름

     const handleMouseDown = (e) => {
          setIsDragging(true);
     };

     const handleMouseUp = () => {
          setIsDragging(false);
     };

     const handleMouseMove = (e) => {
          if (!isDragging) return;

          const newPosition = {
               x: e.clientX,
               y: e.clientY
          };
          setPosition(newPosition);
     };

     const handleMouseLeave2 = () => {
          setIsDragging(false);
     };

     const handleMouseWheel = (e) => {
          if (e.deltaY > 0) {
               setRadius(radius - 5);
          } else {
               setRadius(radius + 5);
          }
     };
     console.log("my stickers", myStickers, stickers)
     const onDragStart = (event) => {
          setDragStartY(event.clientY); // 드래그 시작 위치의 Y 좌표를 저장
      };

     const onDragEnd = (event) => {
          const dragEndY = event.clientY; // 드래그 끝 위치의 Y 좌표
  
          if (dragEndY > dragStartY) { // 드래그가 위에서 아래로 일어났는지 확인
              setScrollIdx(prevIdx => (prevIdx + 1) % 4);
              const nextScrollIdx = (scrollIdx + 1) % 4;
              console.log("스크롤 인덱스>>>", nextScrollIdx)
              if (nextScrollIdx === 0) {
                  setSelectedCategory("MOOD");
              }
              else if (nextScrollIdx === 1) {
                  setSelectedCategory("LOVELY");
              }
              else if (nextScrollIdx === 2) {
                  setSelectedCategory("CARTOON");
              }
              else if (nextScrollIdx === 3) {
                  setSelectedCategory("Y2K");
              }
          }
      };
      const carouselRef = useRef(null);
      const [isDown, setIsDown] = useState(false);
      const [startY, setStartY] = useState(0);
      const [scrollTop, setScrollTop] = useState(0);
  
      useEffect(() => {
          console.log("스티커 드래그 in useeffect",stickerDrag)
          const carousel = carouselRef.current;
  const dragging=stickerDrag
          const handleMouseDown = (e) => {
               // if (dragging)return
               console.log(">>>마우스 다운",dragging)
              setIsDown(true);
              if (carousel) {
               if (stickerDrag)return
                  setStartY(e.pageY - carousel.offsetTop);
                  setScrollTop(carousel.scrollTop);
              }
          };
  
          const handleMouseLeave = () => {
               // if (stickerDrag)return
               console.log(">>>마우스 리브")
              setIsDown(false);
          };
  
          const handleMouseUp = () => {
               // if (stickerDrag)return
               console.log(">>>마우스 업")
              setIsDown(false);
              snapToClosestItem();
          };
  
          const handleMouseMove = (e) => {
               // return;
               // if (stickerMoving)return;
               if (dragging)return
              
              if (!isDown) return;
              e.preventDefault();
              if (carousel) { 
       
                  const y = e.pageY - carousel.offsetTop;
                  const walk = (y - startY) * 3; // Scroll speed
                  carousel.scrollTop = scrollTop - walk;
              }
          };
  
          const snapToClosestItem = () => {
              if (!carousel) return;
              const itemHeight = carousel.querySelector('.image').offsetHeight;
              const scrollY = carousel.scrollTop;
              const index = Math.round(scrollY / itemHeight);  
                    console.log(">>>백그라운드 인덱스",index)
                    setBgIdx(index)
              carousel.scrollTo({ top: index * itemHeight, behavior: 'smooth' });
          };
  
          if (carousel) {
              carousel.addEventListener('mousedown', handleMouseDown);
              carousel.addEventListener('mouseleave', handleMouseLeave);
              carousel.addEventListener('mouseup', handleMouseUp);
              carousel.addEventListener('mousemove', handleMouseMove);
          }
  
          return () => {
              if (carousel) {
                  carousel.removeEventListener('mousedown', handleMouseDown);
                  carousel.removeEventListener('mouseleave', handleMouseLeave);
                  carousel.removeEventListener('mouseup', handleMouseUp);
                  carousel.removeEventListener('mousemove', handleMouseMove);
              }
          };
      }, [isDown, startY, scrollTop,stickerDrag]);
    
     useEffect(() => {
  // add or remove refs

  setStageRefs((refs) =>
    Array(bgLength)
      .fill()
      .map((_, i) => refs[i] || createRef()),
  );


}, [bgLength]);  

// 선택된 아이템을 가지고 있는 리스트
const tempPhotos=[{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},{url:"./temp.jpg"},]
console.log("choose img",selectedItems,selectedPhotos)

     const getImgListLayout=(selectedFrame,selectedItems)=>{
        if (selectedItems.length===0) {
          
          return <></>
        }
          if (selectedFrame==="Stripx2") { 
                console.log("sel frame in func",selectedFrame,selectedItems)
               return <div
               className='selected-photos-s2-list'
               
               >
                    {/* 1 row */}
                     <div
                 className='selected-photos-s2-row'
                   ><img
className='stripx2img'
                   src={selectedItems[0].url}
                   />
                   <img
className='stripx2img'
                   src={selectedItems[1].url}
                   /></div>
                   {/* 2 row */}
                   <div
                  className='selected-photos-s2-row'
                 ><img
className='stripx2img'
                 src={selectedItems[2].url}
                 />
                 <img
className='stripx2img'
                 src={selectedItems[3].url}
                 /></div>
                  {/* 3 row */}
                  <div
                  className='selected-photos-s2-row'
                 ><img
className='stripx2img'
                 src={selectedItems[4].url}
                 />
                 <img
className='stripx2img'
                 src={selectedItems[5].url}
                 /></div>
                  {/* 4 row */}
                  <div
                  className='selected-photos-s2-row'
                 ><img
className='stripx2img'
                 src={selectedItems[6].url}
                 />
                 <img
className='stripx2img'
                 src={selectedItems[7].url}
                 /></div>
               </div>
          }
          else if(selectedFrame==="2cut-x2"){
return <div
className='selected-photos-2-list'

>
    {selectedItems.map((it,idx)=>
    idx===0?<div
    className='selected-photo-2-container-first'
    ><div
     className='selected-photo-2'
       style={{
          
          backgroundImage: `url(${it.url})`
      }}
     /></div>:
    <div
    className='selected-photo-2-container'
    ><div
     className='selected-photo-2'
       style={{
          
          backgroundImage: `url(${it.url})`
      }}
     /></div>
    )} 
</div>

          }
          else if(selectedFrame==="4-cutx2"){
               console.log("이건가")
               return <div
               className='cut4x2-container'
               >
<img
className='cut4x2-0'
src={selectedItems[0].url}
/>
<img
className='cut4x2-1'
src={selectedItems[1].url}
/>
<img
className='cut4x2-2'
src={selectedItems[2].url}
/>
<img
className='cut4x2-3'
src={selectedItems[3].url}
/>

               </div>
               
               
          }
          else if(selectedFrame==="6-cutx2"){
               return <div
               className='cut6x2-container'>
                    {/* 1 row */}
                    <div
                    className='cut6x2-row'
                    ><img
                    className='cut6x2-img'
                    src={selectedItems[0].url}
                    />
                         <img
                         className='cut6x2-img'
                    src={selectedItems[1].url}
                    />
                    </div>
                     {/* 2 row */}
                     <div
                    className='cut6x2-row'
                    ><img
                    className='cut6x2-img'
                    src={selectedItems[2].url}
                    />
                         <img
                         className='cut6x2-img'
                    src={selectedItems[3].url}
                    />
                    </div>
                    {/* 3 row */}
                    <div
                    className='cut6x2-row'
                    ><img
                    className='cut6x2-img'
                    src={selectedItems[4].url}
                    />
                         <img
                         className='cut6x2-img'
                    src={selectedItems[5].url}
                    />
                    </div>
               </div>
          }
          else{

          }
     }
     return (
<div className='sticker-container' style={{ backgroundImage: `url(${backgroundImage})` }}>
<div className="go-back" style={{ backgroundImage: `url(${goBackButton})` }} onClick={() => navigate("/filter")} onMouseEnter={hoverGoBackButton} onMouseLeave={hoverGoBackButton}></div>
<div className="left-sticker">
<div
       className='frame-box'
                          
                    style={{
                         backgroundImage: `url(${frame_box})`
                    }}
                            />
  <div className='v-carousel-container' ref={carouselRef}>
            <div className='v-carousel-images'>
            {myBackgrounds.map((src, index) => (
                    <div
                        className='image'
                        key={index}
                        style={{
                            backgroundImage: `url(${src})`
                        }}
                    >
                         {getImgListLayout(selectedFrame,selectedItems)}
                      <Stage
     width={1200}
     height={1000}
     onClick={handleCanvasClick}
     onTap={handleCanvasClick}
     className="konva-image"
     onMouseDown={checkDeselect}
     onTouchStart={checkDeselect}
     ref={index === bgIdx ? stageRef : null}
>
     <Layer>
          <KonvaImage
               image={background}
               height={1200}
               width={1000}
               id="backgroundImage"
          />
           {images[bgIdx]===undefined?<></>:images[bgIdx].map((image, i) => {
               return (
                    <StickerItem
                    isStickerDrag={stickerDrag}
                    isSelected={isSel}
                    setStickerDrag={setStickerDrag}
                    onTransform={()=>{
                         console.log("이미지 리사이징 중")
                    }}
                    onSelect={()=>{
                         setIsSel(p=>!p)
                         console.log("스티커 클릭")}}

                         onDelete={() => {
                              const newImages = [...images];
                              newImages.splice(i, 1);
                              setImages(newImages);
                         }}
                         onDragEnd={(event) => {
                              image.x = event.target.x();
                              image.y = event.target.y();
                         }}
                         onChange={(x,y,width,height)=>{
                              console.log("리사이즈 한 너비 / 높이",width,height)
                         }}
                         key={i}
                         image={image}
                         shapeProps={image}
                    />
               );
          })}
     </Layer>
</Stage>
                    
                    </div>    ))}
       </div></div>
  
</div>

<div className="middle-sticker"
                    draggable={true}
                    onDragStart={onDragStart}
                    onDrag={() => {
                         console.log("드래그 스티커 배경")
                    }}
                    onDragEnd={onDragEnd}

                    style={{
                         backgroundImage: `url(${sticker_frame})`
                    }}>


                    {myStickers.map((group, index) => (
                         <div key={index} className={index === 0 ? 'sticker-line-1' : 'sticker-line'}>
                              {group.map((mySticker, photoIndex) => (
                                   <div
                                        key={photoIndex}
                                        className="sticker"
                                        onClick={() => {
                                             addStickerToPanel({
                                                  bgIdx:bgIdx,
                                                  src: mySticker.photo,
                                                  width: 100,
                                                  x: 30,//500,
                                                  y: 30//500
                                             });
                                        }}
                                   >
                                        <img className="sticker-image"
                                             alt={mySticker.title} src={mySticker.photo} width='90px' height='90px' />
                                   </div>
                              ))}
                         </div>
                    ))}
               </div>
<div className="right-sticker" style={{ backgroundImage: `url(${sticker_taskbar})` }}>
                    <div className="sticker-category">
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${mood})` }} onClick={() => filterStickerByCategory('MOOD')} onMouseEnter={() => hoverStickerButton('mood')} onMouseLeave={() => hoverStickerButton('mood')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${lovely})` }} onClick={() => filterStickerByCategory('LOVELY')} onMouseEnter={() => hoverStickerButton('lovely')} onMouseLeave={() => hoverStickerButton('lovely')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${cartoon})` }} onClick={() => filterStickerByCategory('CARTOON')} onMouseEnter={() => hoverStickerButton('cartoon')} onMouseLeave={() => hoverStickerButton('cartoon')}></div>
                         <div className="sticker-category-item" style={{ backgroundImage: `url(${y2k})` }} onClick={() => filterStickerByCategory('Y2K')} onMouseEnter={() => hoverStickerButton('y2k')} onMouseLeave={() => hoverStickerButton('y2k')}></div>
                    </div>
                    <div className="sticker-print-btn" style={{ backgroundImage: `url(${printButton})` }} onClick={printFrameWithSticker} onMouseEnter={hoverPrintButton} onMouseLeave={hoverPrintButton}></div>
               </div>
</div>
     );
}

export default Filter;
