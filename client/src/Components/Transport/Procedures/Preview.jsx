import { transportForm } from '@/Store/Transport'
import React from 'react'
import { useSelector } from 'react-redux'

const Preview = ({translate}) => {
    const currentTransportForm = useSelector(transportForm)
    const {owner, pet,travel, document, agency}=currentTransportForm;
  return (
    <section style={{transform:`translateX(${translate}%)`}} className='ml-[-3%] text-white transition-transform duration-500 shrink-0 w-full h-full rounded-4xl flex justify-center items-center'>
      <div className="w-full h-full flex">
        <div className="w-[60%] h-full flex flex-col">
            <div className="w-full h-[58%] flex">
                <div className="w-[50%] h-full  flex flex-col items-start gap-[2px]">
                    <p className='text-xl font-bold tracking-wider mb-[5px]'>Owner Details</p>
                    <p className=' pl-[14px] text-md  font-semibold'>First name : <span className='font-light'>{owner?.firstName?owner.firstName:null}</span></p>
                    <p className=' pl-[14px] text-md  font-semibold'>Last name : <span className='font-light'>{owner?.lastName?owner.lastName:null}</span></p>
                    <p className=' pl-[14px] text-md  font-semibold'>Mobile no. : <span className='font-light'>{owner?.mobileNo?owner.mobileNo:null}</span></p>
                    <p className=' pl-[14px] text-md  font-semibold'>Alt. Mobile no. : <span className='font-light'>{owner?.altMobileNo?owner.altMobileNo:null}</span></p>
                    <p className=' pl-[14px] text-md  font-semibold'>Email : <span className='font-light'>{owner?.email?owner.email:null}</span></p>
                    <p className=' pl-[14px] text-md  font-semibold'>Gender : <span className='font-light'>{owner?.gender?owner.gender:null}</span></p>
                </div>
                <div className="w-[50%] h-full  flex flex-col items-start gap-[2px]">
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
            </div>
            <div className="w-full h-[42%]  flex flex-col items-start">
                <p className='text-xl font-bold tracking-wider mt-[10px] mb-[15px]'>Travel Details</p>
                <p className='text-md font-semibold ml-[15px]'>Relocation purpose : <span className='font-light'>{travel?.purpose?travel.purpose:null}</span></p>
                <div className="w-full flex-1 flex ">
                    <div className="w-[50%] h-full flex flex-col pl-[20px]  pt-[10px]">
                        <p className='text-md font-semibold'>Pickup Address : <span className='font-light'>{travel?.sourceAddress?travel.sourceAddress:null}</span></p>
                        <p className='text-md font-semibold'>Origin city : <span className='font-light'>{travel?.sourceCity?travel.sourceCity:null}</span></p>
                        <p className='text-md font-semibold'>Origin state : <span className='font-light'>{travel?.sourceState?travel.sourceState:null}</span></p>
                    </div>
                    <div className="w-[50%] h-full flex flex-col  pl-[10px] pt-[10px]">
                        <p className='text-md font-semibold'>Destination Address : <span className='font-light'>{travel?.destinationAddress?travel.destinationAddress:null}</span></p>
                        <p className='text-md font-semibold'>Destination city : <span className='font-light'>{travel?.destinationCity?travel.destinationCity:null}</span></p>
                        <p className='text-md font-semibold'>Destination state : <span className='font-light'>{travel?.destinationState?travel.destinationState:null}</span></p>
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[40%] h-full flex flex-col">
            <p className='text-xl font-bold tracking-wider mb-[5px]'>Documents</p>
            <div className="w-full h-[60%]  flex flex-wrap gap-1 justify-center">
                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                    <img className="w-full h-full object-cover" src={document?.vacFront?URL.createObjectURL(document.vacFront):null} alt="" />
                    <div className="absolute inset-0 ">
                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center p-[20px] text-white">
                            {'Vaccination Book (front)'}
                        </div>
                    </div>
                </div>
                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                    <img className="w-full h-full object-cover" src={document?.vacBack?URL.createObjectURL(document.vacBack):null} alt="" />
                    <div className="absolute inset-0 ">
                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center p-[20px] text-white">
                            {'Vaccination Book (back)'}
                        </div>
                    </div>
                </div>
                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group">
                    <img className="w-full h-full object-cover" src={document?.standing?URL.createObjectURL(document.standing):null} alt="" />
                    <div className="absolute inset-0 ">
                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center text-white">
                        {'Pet photo (standing)'}
                        </div>
                    </div>
                </div>
                <div className="w-[48%] relative h-[48%] bg-gray-900 shrink-0 group ">
                    <img className=" w-full h-full object-cover" src={document?.sitting?URL.createObjectURL(document.sitting):null} alt="" />
                    <div className="absolute inset-0 ">
                        <div className="hidden group-hover:flex w-full h-full bg-black/70 items-center justify-center text-white">
                        {'Pet photo (sitting)'}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex-1 p-[10px]">
            <p className='text-xl font-bold tracking-wider mb-[10px]'>Agency</p>
            <p className='text-md font-semibold pl-[14px]'>Agency name : <span className='font-light'>{agency?.name?agency.name:null}</span></p>
            <p className='text-md font-semibold pl-[14px]'>Agency type : <span className='font-light'>{agency?.type?agency.type:null}</span></p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Preview
