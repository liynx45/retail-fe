import React, { useEffect } from 'react'
import IndexRoom from '../../components/rooms/IndexRoom'
import CardRoom from '../../components/cards/CardRoom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../libs/redux/store'
import { fetchRoom } from '../../services/redux'
import { IRoom } from '../../types/schema'

function Room() {

  const { rooms } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchRoom(""))
  }, [])

  return (
    <div>
      <IndexRoom />
      <div className='grid grid-cols-4 p-8 gap-6'>
        {
          rooms.data.map((room: IRoom, i: number) => (
            <CardRoom key={room.id} data={room}/>
          ))
        }
      </div>
    </div>
  )
}

export default Room
