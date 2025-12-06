import HeroSegment from '@/Components/Transport/HeroSegment'
import React from 'react'
import WorkProcedure from '@/Components/Transport/WorkProcedure'
import Services from '@/Components/Transport/Services'
import Agencies from '@/Components/Transport/Agencies'
import { useEffect , useRef} from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '@/Components/Home/Footer'

const Transport = () => {
  const location = useLocation();
  const servicesRef = useRef(null);
  const agencyRef = useRef(null);
  const workRef = useRef(null);
  const bookingRef = useRef(null);
  
  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    let timeout = 0;
    if (hash === 'services') {
     timeout = setTimeout(() => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); }
    else if(hash==='agencies'){
     timeout = setTimeout(() => {
        agencyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); 
    }
    else if(hash==='work'){
     timeout = setTimeout(() => {
        workRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); 
    }
    else if(hash==='book'){
     timeout = setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); 
    }

    return () => clearTimeout(timeout);
  }, [location]);
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll scrollbar-hidden'>
      <HeroSegment/>
      <section ref={workRef}  className='w-full min-h-screen'>
        <WorkProcedure/>
      </section>
      <section ref={servicesRef}  className='w-full min-h-screen'>
        <Services/>
      </section>
      <section ref={agencyRef}  className='w-full min-h-screen'>
        <Agencies/>
      </section>
      <section ref={bookingRef}  className='w-full min-h-[420px]'>
        <Footer/>
      </section>
    </div>
  )
}

export default Transport
