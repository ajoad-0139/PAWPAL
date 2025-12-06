import React from 'react'
import pic from '../../../assets/Submit.png'
import { useDispatch, useSelector } from 'react-redux'
import { makeTransport, transportForm, uploadDocs } from '@/Store/Transport'
import { user } from '@/Store/Auth'

const Submit = ({translate}) => {
    const currentTransportForm = useSelector(transportForm)
    const currentUser = useSelector(user)
    const {owner, pet,travel, document, agency}=currentTransportForm;

    const dispatch = useDispatch()

    const handleSubmit = async()=>{
      if(document){
        const {vacFront, vacBack, standing, sitting}=document
        const uploadDoc = await dispatch(uploadDocs({vacFront, vacBack, standing, sitting}))
        const data ={
          owner, pet, travel, agency , document:uploadDoc?.payload , userId:currentUser?.userId
        }
        dispatch(makeTransport(data))
      }
    }
  return (
    <section style={{transform:`translateX(${translate}%)`}} className=' text-white transition-transform duration-500 shrink-0 w-full h-full gap-[20px] rounded-4xl flex flex-col justify-center items-center'>
            <div className="w-60 h-60 object-cover flex justify-center items-center rounded-full shadow-lg border-4 border-purple-500">
                <img className='w-[110%] h-[155%] mb-[-10px] object-cover' src={pic} alt="" />
            </div>
            <button onClick={handleSubmit} 
             className="mt-6  tracking-widest px-[100px] py-1 text-lg cursor-pointer hover:text-white font-semibold text-black bg-purple-400 hover:bg-purple-600 rounded-full shadow-lg transition"
            ><span >CARRY ME</span></button>
    </section>
  )
}

export default Submit
