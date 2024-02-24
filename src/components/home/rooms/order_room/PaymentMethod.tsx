import { Select } from 'antd'
import React from 'react'

const PaymentMethod = () => {
    return (
        <div className='p-6 mb-24 flex flex-col gap-3 border rounded-lg'>
            <div className='flex justify-between '>
                <h4 className='text-xl font-semibold'>Metode pembayaran</h4>
                <div>
                    <Select
                        className='w-24'
                        defaultValue={"cash"}
                        options={[
                            { label: "Tunai", value: "cash" },
                            { label: "E-Wallet", value: "e-wallet" }
                        ]} />
                </div>
            </div>
            <div className='flex justify-end w-full'>
                <div className='flex justify-between w-1/2'>
                    <div className='flex flex-col gap-1'>
                        <span>Biaya Fasilitas</span>
                        <span>Perawatan Tambahan</span>
                        <span>Harga Sewa</span>
                    </div>
                    <div className='flex flex-col gap-1 text-right'>
                        <span>000</span>
                        <span>0000</span>
                        <span>0000</span>
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-end'>
                <button className='py-1 px-3 bg-slate-400'>Bayar</button>
            </div>
        </div>
    )
}

export default PaymentMethod
