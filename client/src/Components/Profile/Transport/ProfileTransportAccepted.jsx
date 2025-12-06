import { user } from '@/Store/Auth'
import { deleteTransport, getAllList, getAllTransportRequest, getUserTransport, getUserTransportDeatils } from '@/Store/Transport'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileTransportCard from './ProfileTransportCard'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

const ProfileTransportAccepted = () => {
   const userData = useSelector(user)
   const {userId} = useParams()
  const dispatch = useDispatch()
  const singleUserTransportList = useSelector(getUserTransportDeatils)
  const reqId = userId? userId : userData?.userId
  console.log(reqId);
  const getAllTransport = useSelector(getAllList)

  useEffect(() => {
    const getList = async () => {
      const data = await dispatch(getUserTransport(reqId))
      console.log(data, 'inside get List')
      await dispatch(getAllTransportRequest())
    }
    getList()
  },[dispatch, reqId])

  const approvedList = !userData?.user?.isAdmin ? singleUserTransportList?.filter(transport => transport?.isApproved && !transport?.isCompleted) : getAllTransport?.filter(transport => transport?.isApproved && !transport?.isCompleted)
  console.log(approvedList, 'approved list')
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
          {approvedList?.length} pets ready to be traveled
        </h6>
      </div>
      {approvedList.length?approvedList.map((post) => (
        <ProfileTransportCard
          key={post._id}
          {...post}
          showDelete={true}
          dispatch={dispatch}
          completeObject={post}
          handleDelete={handleDelete}
        />
      )): null}
    </div>
  )
}

export default ProfileTransportAccepted