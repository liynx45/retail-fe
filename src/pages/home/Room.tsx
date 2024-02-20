import React, { FormEventHandler, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../libs/redux/store'
import { useSearchParams } from 'react-router-dom'
import { MenuFoldOutlined } from '@ant-design/icons'
import { fetchRoom } from '../../services/redux'
import IndexRoom from '../../components/home/rooms/CarouselRoom'
import { IRoom } from '../../types/schema'
import CardRoom from '../../components/cards/CardRoom'
import ListRoom from '../../components/home/rooms/ListRoom'

function Room() {

  const { rooms } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchRoom("?page=1&take=12"))
  }, [])

  return (
    <div>
      <IndexRoom />
      <ListRoom>
        {
          rooms.data.map((room: IRoom, i: number) => (
            <CardRoom key={room.id} data={room} />
          ))
        }
      </ListRoom>
    </div>
  )
}

export default Room
