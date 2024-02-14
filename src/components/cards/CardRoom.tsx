import { Image } from 'antd'
import React from 'react'
import { encryptData } from '../../libs/crypto'
import { Link } from 'react-router-dom'
import { IRoom } from '../../types/schema'


interface CardRoomProps {
    data: IRoom
}
const CardRoom: React.FC<CardRoomProps> = ({data}) => {
    const encrypt = encryptData(data.id).split("/").join("%6")

    return (
        <div className='p-3 relative rounded-sm overflow-hidden cursor-pointer shadow-sm flex bg-slate-400 flex-col gap-3'>
            <span className='absolute py-2 px-16 z-30 pointer-events-none bg-green-400 rotate-45 -right-12 top-6'>Tersedia</span>
            <Image src={data.room_image[0].url} alt="" />
            <div className='grid grid-cols-2'>
                <div className='flex flex-col gap-2'>
                    <span>{data.room_info?.name}</span>
                    <span>Type :{data.room_info?.type}</span>
                    <span>Rp. {data.price}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span>{`Luas :${data.room_info?.wide}x${data.room_info?.long}`}</span>
                    <span>No Ruang : {data.no_room}</span>
                    <Link to={`/ruang/${encrypt}`} className='px-6 w-fit py-1 bg-sky-400 rounded-md'>Pesan</Link>
                </div>
            </div>
        </div>
    )
}

export default CardRoom
