import React, { useRef , useEffect} from 'react'
import gif from '../../assets/gif02.gif'
import { useNavigate, useParams } from 'react-router-dom';
import petTransportServices from '@/data/TransportServices';

const SingleService = () => {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const {serviceId}=useParams();
    const item = petTransportServices[Number(serviceId)-1]
  useEffect(() => {
          const handleClickOutside = (event) => {
              if (modalRef.current && !modalRef.current.contains(event.target)) {
                  navigate('/transport#services'); 
              }
          };

          document.addEventListener("mousedown", handleClickOutside);

          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [navigate]);
  return (
    <div className='fixed  z-50 top-0 left-0 right-0 bottom-0 bg-gray-950/90 flex justify-center items-center'>
      <div ref={modalRef} style={{ backgroundImage: `url(${gif})` }} className=" w-[60%] h-[70%] rounded-4xl">
        <div className="w-full h-full border-[1px] border-neutral-300 rounded-4xl backdrop-blur-md p-[20px] flex justify-between">
            <div className="w-[40%] h-full rounded-3xl">
                <img src={item.url} className='w-full h-full rounded-3xl object-cover' alt="" />
            </div>
            <div className="w-[50%] h-full flex flex-col justify-start gap-[10px] text-white">
                <p className='text-xl font-bold'>{item.title}</p>
                <p>{item.content}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SingleService
