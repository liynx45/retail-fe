import React from 'react'
import { IFacility, IRoomInfo } from '../../../../types/schema'

interface DetailRoomDescProps {
    info: {
        facility: IFacility[],
        desc: IRoomInfo
    }
}
const DetailRoomDesc: React.FC<DetailRoomDescProps> = ({info}) => {
    return (
        <div className='flex flex-col gap-6'>
            <h3 className='text-xl font-semibold'>Details</h3>
            <div>
                <h3 className='text-md font-semibold'>Fasilitas</h3>
                <ul className='pl-3'>
                    {
                        info.facility && info.facility.map((data: IFacility) => (
                            <li key={data.id}>- {data.name}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <h3 className='text-md font-semibold'>Deskripsi</h3>
                <p className='max-w-md'>{info?.desc?.desc!}</p>
            </div>
        </div>
    )
}

export default DetailRoomDesc
