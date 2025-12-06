import React, { useEffect, useState } from 'react'
import SingleTransportCard from './SingleTransportCard'
import data  from '../../data/TransportCard'

const TransportDetailsCard = () => {
    const [translate, setTranslate] = useState(0);
  return (
    <div className="w-[340px] h-[490px] mt-[30px] items-start  flex overflow-hidden transition-transform duration-700 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-neutral-400 shadow-neutral-300 ">
        {
            data.map((item)=><SingleTransportCard key={item.id} translate={translate} setTranslate={setTranslate} item={item}/>)
        }
    </div>
  )
}

export default TransportDetailsCard
