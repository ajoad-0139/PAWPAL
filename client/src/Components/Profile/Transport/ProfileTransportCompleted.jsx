import { user } from '@/Store/Auth'
import { deleteTransport, getAllList, getAllTransportRequest, getUserTransport, getUserTransportDeatils } from '@/Store/Transport'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileTransportCard from './ProfileTransportCard'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const ProfileTransportCompleted = () => {
   const userData = useSelector(user)
  const dispatch = useDispatch()
  const {userId} = useParams();
  const singleUserTransportList = useSelector(getUserTransportDeatils)
    const reqId = userId? userId : userData?.userId
  const getAllTrasport = useSelector(getAllList)


  useEffect(() => {
    const getList = async () => {
      const data = await dispatch(getUserTransport(reqId))
      console.log(data, 'inside get List')
      await dispatch(getAllTransportRequest())
    }
    getList()
  },[dispatch, reqId])

  const completeList = !userData?.user?.isAdmin? singleUserTransportList?.filter(transport => transport.isApproved && transport.isCompleted) : getAllTrasport?.filter(transport => transport?.isApproved && transport?.isCompleted)
  console.log(completeList, 'completeList')
  const showDelete = true
  const handleDelete = async(id) => {
    try {
      const response = await dispatch(deleteTransport(id))
      console.log(response)
      toast.success('deletedSuccessfully')
      const refetch = await dispatch(getUserTransport(userData?.userId))
      console.log(refetch)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return (
    <div className="flex flex-col justify-start gap-6 mt-4">
      <div className="flex w-full justify-start items-center">
        <h6 className="text-[#565656] font-montserrat text-sm">
          {completeList?.length} pets have completed their journey
        </h6>
      </div>
      {completeList.length?completeList.map((post) => (
        <ProfileTransportCard
          key={post._id}
          {...post}
          showDelete={true}
          completeObject={post}
          dispatch={dispatch}
          handleDelete={handleDelete}
        />
      )): null}
    </div>
  )
}

export default ProfileTransportCompleted