import { Image } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { IRoom } from '../../types/schema'
import { encryptData } from '../../libs/crypto'


interface CardRoomProps {
    data: IRoom
}
const CardRoom: React.FC<CardRoomProps> = ({ data }) => {
    const encrypt = encryptData(data.id).split("/").join("%6")

    return (
        <div className='p-3 relative  overflow-hidden cursor-pointer shadow-sm flex bg-slate-200 rounded-lg flex-col gap-3'>
            <Image className='object-cover w-full rounded-lg' height={170} src={data.room_image[0].url} alt="" />
            <div className='py-1 gap-2 flex flex-col justify-between'>
                <div className='flex justify-between flex-start'>
                    <div className='flex flex-col gap-2 h-20'>
                        <h3 className='font-semibold'>{data?.room_info?.name}</h3>
                        <p className='text-[14px]'>{data?.room_info?.desc}</p>
                    </div>
                    <div>
                    <span className='py-0.5 px-2 rounded-lg bg-red-300 border border-red-400 text-[12px]'>Tersedia</span>
                    </div>
                </div>
                <div className='flex gap-4 pt-2 items-center'>
                    <Link to={data.id.toString()} className='text-white text-sm py-1 px-4 rounded-md bg-sky-400'>Detail</Link>
                    <span className='font-semibold'>Rp. {data.price}</span>
                </div>
            </div>
        </div>
    )
}

export default CardRoom
