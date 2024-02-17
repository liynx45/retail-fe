import React, { FormEventHandler, useEffect, useRef } from 'react'
import IndexRoom from '../../components/rooms/IndexRoom'
import CardRoom from '../../components/cards/CardRoom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../libs/redux/store'
import { fetchRoom } from '../../services/redux'
import { IRoom } from '../../types/schema'
import { useSearchParams } from 'react-router-dom'
import { MenuFoldOutlined } from '@ant-design/icons'

const ModalSearchRooms = () => {

  const form = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const handlerSearch = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(form.current!).forEach((val: any, i: string) => {
      if (val) {
        searchParams.set(i, val)
      }
      setSearchParams(searchParams)
    })  

    data
  }

  return (
    <div>
      <form ref={form} className='flex flex-col gap-2' onSubmit={(e) => handlerSearch(e)}>
        <div className='flex gap-2'>
          <label>name</label>
          <input type="text" name='name' />
        </div>
        <div className='flex gap-2'>
          <label>No Ruang</label>
          <input type="number" name='no_room' />
        </div>
        <div className='flex gap-2'>
          <label>Lebar</label>
          <input type="number" name='wide' />
        </div>
        <div className='flex gap-2'>
          <label>Panjang</label>
          <input type="number" name='long' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

interface PaginationProps {
  children: React.ReactNode
}
const Pagination: React.FC<PaginationProps> = ({ children }) => {

  const { rooms } = useSelector((state: RootState) => state)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get("page") || 1
  const take = searchParams.get("take") || 5

  const handlerChange = (name: string, value: string) => {
    searchParams.set(name, value)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    setSearchParams(searchParams)
  }, [searchParams])

  return (
    <div>
      <div className="flex justify-between py-4 px-16 items-center shadow-md">
        <div className="flex justify-between gap-6">
          <div>
            <span className="mr-6">Kategori</span>
            <button><MenuFoldOutlined /></button>
          </div>
          <div>
            showing of {`${(+page === 1 ? 0 : +page * +take) === 0 ? 1 : +page === 1 ? 0 : +page * +take} - ${rooms.pagging.total_item - (+page === 1 ? 0 : +page * +take)}`} of {rooms.pagging.total_item} result
          </div>
        </div>
        <div className="flex justify-between items-center gap-6">
          <div className="flex gap-4">
            <span>result</span>
            <input
              type="number"
              onChange={(e) => handlerChange("take", e.target.value.toString())}
            />
          </div>
          <div className="flex gap-2">
            <span>Sort by</span>
            <div>
              <span>Select</span>
            </div>
          </div>
        </div>
        <ModalSearchRooms />
      </div>
      {children}
      <div>
        {
          [Array(rooms.pagging.total_page)].map((_, i: number) => (
            <div key={i}>
              <button onClick={() => handlerChange("page", (i+1).toString())}>{i + 1}</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

function Room() {

  const { rooms } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchRoom(""))
  }, [])

  return (
    <div>
      <IndexRoom />
      <Pagination>
        <div className='grid grid-cols-4 p-8 gap-6'>
          {
            rooms.data.map((room: IRoom, i: number) => (
              <CardRoom key={room.id} data={room} />
            ))
          }
        </div>
      </Pagination>
    </div>
  )
}

export default Room
