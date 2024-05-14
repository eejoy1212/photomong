import React, { useEffect, useState } from 'react';
import background_en from '../../assets/Payment/num-BG.png';
import background_vn from '../../assets/Payment/Common/vn/BG.png';
import backgrond_kr from '../../assets/Payment/Common/kr/BG.png';
//btns
import numField from '../../assets/Common/number-field.png';
import priceField from '../../assets/Common/price-field.png';
import checkBox from '../../assets/Common/check-box.png';
import minusDefault from '../../assets/Common/minus-default.png';
import minusPressed from '../../assets/Common/minus-pressed.png';
import plusDefault from '../../assets/Common/plus-default.png';
import plusPressed from '../../assets/Common/plus-pressed.png';

import goback_en from '../../assets/Common/goback.png';
import goback_en_hover from '../../assets/Common/gobackhover.png';
import goback_kr from '../../assets/Common/kr/goback.png';
import goback_kr_hover from '../../assets/Common/kr/gobackhover.png';
import goback_vn from '../../assets/Common/vn/goback.png';
import goback_vn_hover from '../../assets/Common/vn/gobackhover.png';
import { useNavigate } from 'react-router-dom';

function PaymentNumber(props) {
    const [background, setBackground] = useState(background_en);
    const [minusBtn,setMinusBtn]=useState(minusDefault)
    const [plusBtn,setPlusBtn]=useState(plusDefault)
    const [photoNum,setPhotoNum]=useState(2)
    const [goBackBg, setGoBackBg] = useState([]);
    const [language, setLanguage] = useState(null);
    const [check,setCheck]=useState(false)
    const navigate=useNavigate()
    const hoverGoBackBtn = (goBackBG) => {
        if (goBackBG === 'ko') {
          setGoBackBg(goBackBg === goback_kr ? goback_kr_hover : goback_kr);
        } else if (goBackBG === 'vi') {
          setGoBackBg(goBackBg === goback_vn ? goback_vn_hover : goback_vn);
        } else {
          setGoBackBg(goBackBg === goback_en ? goback_en_hover : goback_en);
        }
      }
      useEffect(()=>{
        setGoBackBg(goback_en);
        setMinusBtn(minusDefault)
      },[])
      const onCheck=()=>{
        setCheck(p=>!p)
      }
      const onAdd=()=>{
        setPhotoNum(p=>p+1)
      }
      const onMinus=()=>{
        setPhotoNum(p=>p-1)
      }
    return (
        <div
        className='payment-number-container'
        style={{ backgroundImage: `url(${background})` }}
        >
           <div className="go-back" style={{ backgroundImage: `url(${goBackBg})` }} onClick={() => navigate("/layout")} onMouseEnter={() => hoverGoBackBtn(language)} onMouseLeave={() => hoverGoBackBtn(language)}></div>  
        
        <div
        className='payment-number-center'
        >
 <div className="minus-default"  style={{ backgroundImage: `url(${minusBtn})` }} 
 onClick={onMinus}
 />
 <div className="plus-default"  style={{ backgroundImage: `url(${plusBtn})` }}
 onClick={onAdd}
 />
 <div className="num-field"  style={{ backgroundImage: `url(${numField})` }} >
    <div
    className='num'
    >{photoNum}</div>
    
 </div>
 <div className="price-field"  style={{ backgroundImage: `url(${priceField})` }} >

 <div
    className='price'
    >{100000*5*photoNum}đ</div>
 </div>
 <div className="check-box"  style={{ backgroundImage: `url(${checkBox})` }} 
 
 onClick={onCheck}
 >
   {check&& <div
    className='check'
    />}
 </div>
        </div>
        </div>
    );
}

export default PaymentNumber;