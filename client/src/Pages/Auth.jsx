import { authStatus, setAuthStatus } from '@/Store/Auth';
import { useState, useEffect, useRef, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const Auth = () => {
    const [flag, setFlag] = useState(false);
    const [isShowContent, setIShowContent]=useState(true);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentAuthStatus = useSelector(authStatus)
    useEffect(()=>{
      const timeoutID = setTimeout(()=>{
        setIShowContent(true);
      },100)
      return ()=>clearTimeout(timeoutID)
    })
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                navigate('/'); 
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navigate]);
    useEffect(()=>{
      console.log(currentAuthStatus, 'currentStatus')
      if(currentAuthStatus) {
        dispatch(setAuthStatus(false));
        navigate('/');
      }
    })
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-[100] flex justify-center items-center bg-neutral-950/90 text-white'>
        <div ref={modalRef} className='w-[50%] h-[70%] flex justify-between relative '>
          <div style={flag?{transform:`translateX(100%)`}:undefined} className="w-[50%] h-full left-0  absolute duration-500 z-0">
            {isShowContent?<Outlet/>:null}
          </div>
          <div style={flag?{transform:`translateX(-100%)`}:undefined} className="w-[50%] h-full right-0 bg-[#3674B5] absolute duration-500 z-10">
            {
              flag?
                <div className="w-full h-full flex flex-col justify-center items-center ">
                  <p className='text-4xl font-bold font-sans'>Welcome Back!</p>
                  <p className='font-sans mt-3 tracking-wider'>To keep connected with us please login</p>
                  <p className='font-sans tracking-wider'>with your personal info</p>
                  <button onClick={()=>{setFlag(false);setIShowContent(false); navigate('/auth/login')}} className='px-9 cursor-pointer mt-5 py-1 rounded-full border-2 border-white duration-200 hover:bg-[#578FCA] hover:text-black hover:font-bold'>Sign IN</button>
                </div>
            :
              <div className="w-full h-full flex flex-col justify-center items-center ">
                <p className='text-4xl font-bold font-sans'>Hello, Friend!</p>
                <p className='font-sans mt-3 tracking-wider'>Enter your personal details and start</p>
                <p className='font-sans tracking-wider'>journey with us</p>
                <button onClick={()=>{setFlag(true);setIShowContent(false); navigate('/auth/register')}} className='px-9 cursor-pointer mt-5 py-1 rounded-full border-2 border-white duration-200 hover:bg-[#578FCA] hover:text-black hover:font-bold'>Sign UP</button>
              </div>
            }
          </div>
        </div>
    </div>
  )
}


export default Auth
