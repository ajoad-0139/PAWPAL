import { user } from '@/Store/Auth'
import { getUserTransport, getUserTransportDeatils } from '@/Store/Transport'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfileTransportList = () => {
  const userData = useSelector(user)
  const dispatch = useDispatch()
  const singleUserTransportList = useSelector(getUserTransportDeatils)

  useEffect(() => {
    const getList = async () => {
      const data = await dispatch(getUserTransport('67df097b5823618573617623'))
      console.log(data, 'inside get List')
    }
    getList()
  },[dispatch])

  console.log(singleUserTransportList, 'profileTransportList');
  return (
    <div>ProfileTransportList</div>
  )
}

export default ProfileTransportList