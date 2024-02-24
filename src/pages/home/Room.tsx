import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import IndexRoom from '../../components/home/rooms/CarouselRoom'
import { IRoom } from '../../types/schema'
import CardRoom from '../../components/cards/CardRoom'
import ListRoom from '../../components/home/rooms/ListRoom'
import { useFetch, useScrollToTop } from '../../hooks'
import { getRoom } from '../../services/api'
import { Button, Card, Skeleton } from 'antd'
import { axiosPublic } from '../../libs/axios'
import { SearchResult } from '../../types/FetchResult'

function Room() {

  const [params, setParams] = useState<string>("")
  const { data, reload, status } = useFetch<SearchResult<IRoom[]>>({
    type: "public",
    url: "/api/rooms",
    method: "GET",
    params: params ||"?take=6"
  })
  const scrollTo = useScrollToTop()
  
  useEffect(() => {
    reload()
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
      <ListRoom reload={reload} setParams={setParams}>
        {
          status !== "idle" && status === "loading" ? (
            [...Array(6)].map((_: number, i: number) => (
              <div key={i} className='h-[320px] flex flex-col justify-evenly p-4 border rounded-xl'>
                <Skeleton.Image active />
                <Skeleton.Input active />
                <Skeleton.Button active />
                <Skeleton.Button active />
              </div>
            ))
          ) :
            data?.result.result.map((room: IRoom, i: number) => (
              <CardRoom key={room.id} data={room} />
            ))
        }
      </ListRoom>
      <Button onClick={reload}>Reload</Button>
    </div>
  )
}

export default Room
