import React from 'react'
import { ITransaction } from '../../../types/schema'
import { Typography } from 'antd';

type OrderInfo = {
    data: ITransaction;
}
const OrderInfo: React.FC<OrderInfo> = ({ data }) => {

    const toDate = (date: Date) => {
        const now = new Date(date)
        return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
    }

    return (
        <div className='w-full p-4 bg-primary-bg shadow'>
            <Typography.Title level={3}>
                Informasi Pemesanan
            </Typography.Title>
            <div className='w-full flex justify-between text-xl'>
                {
                    data ? (
                        <>
                            <div className='flex flex-col text-start'>
                                <span>Tanggal Pemesanan</span>
                                <span>Tanggal Mulai</span>
                                <span>Tanggal Akhir</span>
                                <span>Biaya Total</span>
                            </div>
                            <div className='flex flex-col text-right'>
                                <span>{toDate(data.expire)}</span>
                                <span>{toDate(data.start_date)}</span>
                                <span>{toDate(data.expire)}</span>
                                <span>{data.total_amount}</span>
                            </div>
                        </>
                    ) : (
                        <span>Tidak ada informasi ruang</span>
                    )
                }
            </div>
        </div>
    )
}

export default OrderInfo
