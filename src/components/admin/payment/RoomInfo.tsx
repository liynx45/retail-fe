import { Typography } from 'antd'
import React from 'react'
import { IRoom } from '../../../types/schema';

type RoomInfo = {
    data: IRoom[] | undefined;
}
const RoomInfo: React.FC<RoomInfo> = ({ data }) => {

    const room = data && data[0]

    return (
        <div className='bg-primary-bg w-full mt-2 p-4'>
            <Typography.Title level={3}>
                Informasi Ruang
            </Typography.Title>
            <div className='w-full flex justify-between text-xl'>
                {
                    data ? (
                        <>
                            <div className='flex flex-col items-start'>
                                <span>Nama Ruang :</span>
                                <span>No Ruang :</span>
                                <span>Status :</span>
                                <span>Tipe :</span>
                            </div>
                            <div className='flex flex-col items-end'>
                                <span>{room?.room_info?.name}</span>
                                <span>{room?.no_room}</span>
                                <span>{room?.status}</span>
                                <span>{room?.room_info?.type}</span>
                            </div>
                        </>
                    ) : (
                        <span>Tidak ada ruang</span>
                    )
                }
            </div>
        </div>
    )
}

export default RoomInfo
