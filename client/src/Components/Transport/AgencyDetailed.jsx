import React, { useRef , useEffect} from 'react'
import gif from '../../assets/gif02.gif'
import { useNavigate, useParams } from 'react-router-dom';
import agencies from '../../data/CompanyBanner'


const AgencyDetailed = () => {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const {agencyId}=useParams();
    const item = agencies[Number(agencyId)-1]
useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                navigate('/transport#agencies'); 
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
                <img src={item.img} className='w-full h-full rounded-3xl object-cover' alt="" />
            </div>
            <div className="w-[50%] h-full flex flex-col justify-start gap-[10px] text-white">
                <p className='text-xl font-bold'>{item.title}</p>
                <ul className='flex flex-col gap-2'>
                  <li>{`Rating : ⭐ ${item.rating}`}</li>
                  <li>{`Type : ${item.type}`}</li>
                  <li>{`Pet Type : ${item.pet_type}`}</li>
                  <li>{`Pricing : 💰 $${item.pricing}/mile`}</li>
                  <li>{`Availability : ${item.availability}`}</li>
                  <li>{`Features : `}</li>
                  <li>
                    <ul className='ml-6'>
                      {item.features.map((feature)=><li>{feature}</li>)}
                    </ul>
                  </li>
                  <li>{`Coverage : ${item.coverage}`}</li>
                  <li>{`Response Time : ${item.response_time}`}</li>
                  <li>{item.verified?'✅ Verified':''}</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AgencyDetailed
