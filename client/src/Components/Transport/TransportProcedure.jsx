import gif from '../../assets/gif02.gif'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png'
import Owner from './Procedures/Owner';
import Pet from './Procedures/Pet';
import Transport from './Procedures/Transport';
import Documents from './Procedures/Documents';
import Agencies from './Procedures/Agencies';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { transportForm } from '@/Store/Transport';
import Preview from './Procedures/Preview';
import Submit from './Procedures/Submit';

const TransportProcedure = () => {
    const [translate, setTranslate] = useState(0);
    const [title, setTitle] =useState('OWNER DETAILS');
    const [track, setTrack] = useState(0);
    const titles =['OWNER DETAILS', 'PET DETAILS', 'TRAVEL DETAILS', 'DOCUMENTS', 'Pick An Agency', 'Preview', 'Make Transport']
    const navigate = useNavigate();
    const fixTitle =(temp)=>{
        // console.log(temp, 'temp')
        if(temp===-104)setTitle(titles[1])
        else if(temp===-208)setTitle(titles[2])
        else if(temp===-312)setTitle(titles[3])
        else if(temp===-416)setTitle(titles[4])
        else if(temp===-520)setTitle(titles[5])
        else if(temp===-624)setTitle(titles[6])
        else if (temp===0)(setTitle(titles[0]))
    }
    const handleGoLeft = ()=>{
        if(translate<0) {setTranslate(translate+104);
                        fixTitle(translate+104);}
    }
    const handleGoRight =()=>{
        if(translate>-600) {
            setTranslate(translate-104);
            fixTitle(translate-104);}
    }
    const currentTransportForm = useSelector(transportForm)
    useEffect(()=>console.log(currentTransportForm))
  return (
    <div  className='fixed  z-50 top-0 left-0 right-0 bottom-0 bg-gray-950 flex flex-col justify-center gap-[20px] items-center'>
      <button onClick={()=>navigate('/transport')} className=" font-extralight absolute right-10 top-4 text-red-600 text-3xl cursor-pointer">
        <FontAwesomeIcon icon="fas fa-times" />
      </button>
      <div onClick={()=>navigate('/')} className="absolute left-10 top-4  cursor-pointer">
        <div className="w-[50px] h-[50px]">
            <img src={logo} className='w-full h-full object-contain' alt="" />
        </div>
      </div>
      <div className="text-white text-2xl gloria-hallelujah-regular font font-semibold">
        <p>{title}</p>
      </div>
      <div  style={{ backgroundImage: `url(${gif})` }} className=" w-[60%] h-[70%] rounded-4xl">
        <div className="w-full h-full border-[1px] border-neutral-300 rounded-4xl backdrop-blur-md p-[20px] flex gap-[40px] overflow-hidden ">
            <Owner track={track} setTrack={setTrack} translate={translate}/>
            <Pet setTrack={setTrack}  translate={translate}/>
            <Transport setTrack={setTrack}  translate={translate}/>
            <Documents setTrack={setTrack} translate={translate}/>
            <Agencies setTrack={setTrack} translate={translate}/>
            <Preview translate={translate}/>
            <Submit translate={translate}/>
        </div>
      </div>
      <div className="w-[55%] h-[80px] flex justify-between text-white items-center">
        <button onClick={handleGoLeft} className='cursor-pointer text-blue-500 font-semibold text-2xl'>
            <FontAwesomeIcon icon="fas fa-chevron-left" />
        </button>
        <div className="">
            <FontAwesomeIcon onClick={()=>{setTranslate(0); fixTitle(0)}} icon="far fa-dot-circle" className={`mx-[2px] ${!translate?'text-blue-500':''}`}/>
            <FontAwesomeIcon onClick={()=>{setTranslate(-104);fixTitle(-104)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<0 && translate>-200?' text-blue-500':''}`}/>
            <FontAwesomeIcon onClick={()=>{setTranslate(-208);fixTitle(-208)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<-200 && translate>-300?' text-blue-500':''}`}/>
            <FontAwesomeIcon onClick={()=>{setTranslate(-312);fixTitle(-312)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<-300 && translate>-400?' text-blue-500':''}`} />
            <FontAwesomeIcon onClick={()=>{setTranslate(-416);fixTitle(-416)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<-400 && translate>-500?' text-blue-500':''}`} />
            <FontAwesomeIcon onClick={()=>{setTranslate(-520);fixTitle(-520)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<-500 && translate>-600?' text-blue-500':''}`} />
            <FontAwesomeIcon onClick={()=>{setTranslate(-624);fixTitle(-624)}} icon="far fa-dot-circle" className={`mx-[2px] ${translate<-600 && translate>-700?' text-blue-500':''}`} />
        </div>
        <button onClick={handleGoRight}  className=' cursor-pointer text-blue-500 font-semibold text-2xl'>
            <FontAwesomeIcon icon="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  )
}

export default TransportProcedure
