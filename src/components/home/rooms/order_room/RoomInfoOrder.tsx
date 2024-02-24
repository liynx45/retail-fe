import React, { useState } from 'react'
import { useSession } from '../../../../context/AuthProvider'

interface RoomOrderProps {
    data: any
}
const RoomInfoOrder: React.FC<RoomOrderProps> = ({ data }) => {
    const [toggle, setToggle] = useState(false)
    const { user } = useSession()

    return (
        <div className='my-5'>
            <h4 className='my-4 text-xl font-semibold'>Ruang yang dipesan</h4>
            <div className='border p-6 rounded-xl'>
                <div className='flex items-center justify-between p-2'>
                    <div className='flex gap-2'>
                        <img src="" className='size-16 bg-slate-500' alt="" />
                        <div>
                            <h5>Ruang 1</h5>
                            <p>Pria</p>
                        </div>
                    </div>
                    <div className='flex gap-2 font-semibold'>
                        <span>Harga :</span>
                        <span>Rp. 2.000.000</span>
                    </div>
                </div>
                <div className='px-2 my-4 flex justify-between w-full'>
                    <div className='flex w-1/2 gap-2 items-center'>
                        <label className='font-semibold text-md'>Pesan :</label>
                        <input className='w-[75%] border px-2 py-1 outline-none focus:bg-slate-300' type="text" />
                    </div>
                    <div className='flex  gap-2 items-center'>
                        <label className='font-semibold text-md'>Voucer :</label>
                        <input className=' border px-2 py-1 outline-none focus:bg-slate-300' type="text" />
                        <button className='py-1 px-3 bg-slate-400'>Masukan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomInfoOrder
