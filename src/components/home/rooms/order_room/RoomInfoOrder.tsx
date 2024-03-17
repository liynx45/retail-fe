import React, { SetStateAction, useState } from 'react'
import { DetailRoom } from '../../../../pages/home/room/Order'
import { IRoom } from '../../../../types/schema';

type RoomOrder = {
    set: React.Dispatch<SetStateAction<DetailRoom>>;
    detailRoom: DetailRoom;
    infoRoom: IRoom | undefined;
}
const RoomInfoOrder: React.FC<RoomOrder> = ({ set, detailRoom, infoRoom }) => {
    
    return (
        <div>
            <h4 className='my-4 text-xl font-semibold'>Ruang yang dipesan</h4>
            <div className='p-6 bg-slate-200 shadow bg-slate-100'>
                <div className='flex items-center justify-between p-2'>
                    <div className='flex gap-2'>
                        <img src={infoRoom?.room_image[0].url} className='size-16 bg-slate-500' alt="" />
                        <div>
                            <h5 className='text-xl'>{infoRoom?.room_info?.name}</h5>
                            <p className='text-sm'>{infoRoom?.no_room}</p>
                            <p>{infoRoom?.room_info?.type}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-2 font-semibold'>
                        <span>Harga : Rp. {infoRoom?.price}</span>
                        <span>Fasilitas: Rp. {infoRoom?.facility.reduce((acc, curr) => acc += curr.cost, 0)}</span>
                    </div>
                </div>
                <div className='px-2 my-4 flex justify-between w-full'>
                    <div className='flex w-1/2 gap-2 items-center'>
                        <label className='font-semibold text-md'>Pesan :</label>
                        <input onChange={(e) => set(pv => ({...pv, message: e.target.value}))} value={detailRoom.message} className='w-[75%] border px-2 py-1 outline-none focus:bg-slate-300' type="text" />
                    </div>
                    <div className='flex  gap-2 items-center'>
                        <button className='py-1 px-3 bg-primary text-text'>Masukan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomInfoOrder
