import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png'
import Chat from './Chat';
import { user } from '@/Store/Auth';
import { getUserTransportDeatils, setSingleTransportDetails, singleTransportDetails } from '@/Store/Transport';

const ShowTransportDetails = () => {
    const currentTransportDetails = useSelector(singleTransportDetails);
    const {owner, pet, travel, agency, document}=currentTransportDetails || {}
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(user)
    const handleExit = ()=>{
        dispatch(setSingleTransportDetails(null));
    }
    const handleGoHome = ()=>{
        navigate('/')
        dispatch(setSingleTransportDetails(null));
    }
    const handleAcceptRequest =()=>{}
    const handleCompleteRequest = ()=>{}
  return (
    <div className={` ${currentTransportDetails?'flex':'hidden'} fixed  top-0 bottom-0 left-0 right-0 backdrop-blur-xl z-50 `}>
            <div className={`${currentTransportDetails?'flex':'hidden'} justify-center px-[12%] h-full w-full items-start overflow-y-scroll `}>
                <button onClick={handleExit} className=" font-extralight fixed z-[60] right-10 top-4 text-red-600 text-3xl cursor-pointer">
                    <FontAwesomeIcon icon="fas fa-times" />
                </button>
                <div onClick={handleGoHome} className="fixed z-[60] left-10 top-4  cursor-pointer">
                    <div className="w-[50px] h-[50px]">
                        <img src={logo} className='w-full h-full object-contain' alt="" />
                    </div>
                </div>
                <div className="w-full min-h-full p-[20px] bg-white/50 flex flex-col">
                    <section className='w-full h-[140px]  flex justify-center items-start'>
                        <p className='text-4xl font-semibold tracking-widest' >Transport Request NO : {'transport id'} <span>{`(${'status here'})`}</span> </p>
                    </section>
                    
                    <section className="w-full flex flex-wrap gap-4">
                        <div className="h-auto w-[350px] flex flex-col  shrink-0">
                            <p className='text-xl font-bold tracking-wider mb-[5px]'>Owner Details</p>
                            <p className=' pl-[14px] text-md  font-semibold'>First name : <span className='font-light'>{owner?.firstName?owner.firstName:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Last name : <span className='font-light'>{owner?.lastName?owner.lastName:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Mobile no. : <span className='font-light'>{owner?.mobileNo?owner.mobileNo:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Alt. Mobile no. : <span className='font-light'>{owner?.altMobileNo?owner.altMobileNo:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Email : <span className='font-light'>{owner?.email?owner.email:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Gender : <span className='font-light'>{owner?.gender?owner.gender:null}</span></p>
                        </div>
                        <div className="h-auto w-[350px] flex flex-col  shrink-0">
                            <p className='text-xl font-bold tracking-wider mb-[5px]'>Pet Details</p>
                            <p className=' pl-[14px] text-md  font-semibold'>Number of pets : <span className='font-light'>{pet?.amount?pet.amount:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet type : <span className='font-light'>{pet?.type?pet.type:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet's gender : <span className='font-light'>{pet?.gender?pet.gender:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet breed : <span className='font-light'>{pet?.breed?pet.breed:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet's length : <span className='font-light'>{pet?.length?`${pet.length} cm`:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet's width : <span className='font-light'>{pet?.width?`${pet.width} cm`:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet's height : <span className='font-light'>{pet?.height?`${pet.height} cm`:null}</span></p>
                            <p className=' pl-[14px] text-md  font-semibold'>Pet's age : <span className='font-light'>{pet?.length?`${pet.length} years`:null}</span></p>
                        </div>
                        <div className="h-auto w-[350px] flex flex-col  shrink-0">
                            <p className='text-xl font-bold tracking-wider  mb-[5px]'>Travel Details</p>
                            <p className='text-md font-semibold ml-[15px]'>Relocation purpose : <span className='font-light'>{travel?.purpose?travel.purpose:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Pickup Address : <span className='font-light'>{travel?.sourceAddress?travel.sourceAddress:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Origin city : <span className='font-light'>{travel?.sourceCity?travel.sourceCity:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Origin state : <span className='font-light'>{travel?.sourceState?travel.sourceState:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Destination Address : <span className='font-light'>{travel?.destinationAddress?travel.destinationAddress:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Destination city : <span className='font-light'>{travel?.destinationCity?travel.destinationCity:null}</span></p>
                            <p className='text-md font-semibold ml-[15px]'>Destination state : <span className='font-light'>{travel?.destinationState?travel.destinationState:null}</span></p>
                        </div>
                        <div className="w-[350px] ">
                        <p className='text-xl font-bold tracking-wider mb-[10px]'>Agency</p>
                        <p className='text-md font-semibold pl-[14px]'>Agency name : <span className='font-light'>{agency?.name?agency.name:null}</span></p>
                        <p className='text-md font-semibold pl-[14px]'>Agency type : <span className='font-light'>{agency?.type?agency.type:null}</span></p>
                        </div>
                        <div className="w-[400px] h-[400px] flex flex-col">
                            <p className='text-xl font-bold tracking-wider mb-[5px]'>Documents</p>
                            <div className="w-full h-[60%]  flex flex-wrap gap-1 justify-center">
                                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                                    <img className="w-full h-full object-cover" src={document?.vacFront?document.vacFront:""} alt="" />
                                    <div className="absolute inset-0 ">
                                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center p-[20px] text-white">
                                            {'Vaccination Book (front)'}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                                    <img className="w-full h-full object-cover" src={document?.vacBack?document.vacBack:""} alt="" />
                                    <div className="absolute inset-0 ">
                                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center p-[20px] text-white">
                                            {'Vaccination Book (back)'}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                                    <img className="w-full h-full object-cover" src={document?.standing?document.standing:""} alt="" />
                                    <div className="absolute inset-0 ">
                                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center text-white">
                                        {'Pet photo (standing)'}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group ">
                                    <img className=" w-full h-full object-cover" src={document?.sitting?document.sitting:""} alt="" />
                                    <div className="absolute inset-0 ">
                                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center text-white">
                                        {'Pet photo (sitting)'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <Chat agency={agency}/> */}
                    {
                        // currentUser?.user?.isTransporter?
                            <section className='w-full h-[100px] flex justify-center items-center gap-4'>
                                <button onClick={handleAcceptRequest} className='gradient-shiny-button'>
                                    <span>
                                        accept request
                                    </span>
                                </button>
                                <button onClick={handleCompleteRequest} className='gradient-shiny-button'>
                                    <span>
                                        mark as complete
                                    </span>
                                </button>
                            </section>
                        // :null
                    }
                </div>
        </div>
    </div>
  )
}

export default ShowTransportDetails
