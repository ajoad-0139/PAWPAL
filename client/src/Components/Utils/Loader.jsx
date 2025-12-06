import { getLoadingState } from '@/Store/AdoptionPostSlice';
import { authIsLoading } from '@/Store/Auth';
import { blogIsLoading } from '@/Store/Blog';
import { transportIsLoading } from '@/Store/Transport';
import React from 'react'
import { useSelector } from 'react-redux';
import { DotLoader } from 'react-spinners';

const Loader = () => {
    const currentAuthIsLoading = useSelector(authIsLoading)
    const currentBlogIsLoading = useSelector(blogIsLoading)
    const currentTransportIsLoading = useSelector(transportIsLoading)
    const currentAdoptionIsLoading = useSelector(getLoadingState)
    const isLoader = currentAuthIsLoading || currentBlogIsLoading || currentTransportIsLoading || currentAdoptionIsLoading;
  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 z-[100] bg-black/50 ${isLoader?'flex':'hidden'} items-center justify-center`}>
      <DotLoader size={40} thickness={4} speed={20} color="white" />
    </div>
  )
}

export default Loader 
