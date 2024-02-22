import React, { useEffect,  useState } from 'react'
import { useLocation } from 'react-router-dom'
import IndexRoom from '../../components/home/rooms/CarouselRoom'
import { IRoom } from '../../types/schema'
import CardRoom from '../../components/cards/CardRoom'
import ListRoom from '../../components/home/rooms/ListRoom'
import { useFetch } from '../../hooks'
import { getRoom } from '../../services/api'
import { Button, Card, Skeleton } from 'antd'

function Room() {

  const [params, setParams] = useState("?take=6")
  const [data, setData] = useState<IRoom[]>([])
  // const { data, status, reload } = useFetch<IRoom[]>({
  //   fetch: getRoom(params)
  // })


  const fetchRoom = async() => {
    const get = await getRoom<IRoom[]>(params)
    if (get.status) {
      setData(get.result!)
    }
  }

   useEffect(() => {
    fetchRoom()
  }, [params])

  return (
    <div>
      {status === "loading" ? (
        <div className='h-[200px] w-full flex justify-center items-center'>
          <Skeleton.Image active />
        </div>
      ) : (
        <IndexRoom />
      )}
      <ListRoom reload={fetchRoom} setParams={setParams}>
        {
          status === "loading" ? (
            [...Array(6)].map((_: number, i: number) => (
              <div key={i} className='h-[320px] flex flex-col justify-evenly p-4 border rounded-xl'>
                <Skeleton.Image active />
                <Skeleton.Input active />
                <Skeleton.Button active />
                <Skeleton.Button active />
              </div>
            ))
          ) :
            data && data.map((room: IRoom, i: number) => (
              <CardRoom key={room.id} data={room} />
            ))
        }
      </ListRoom>
    </div>
  )
}

export default Room
