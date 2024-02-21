import { DatePicker, DatePickerProps } from 'antd'
import React, { useState } from 'react'
import { IFacility, IRoom } from '../../../../types/schema'
import { decryptData, encryptData } from '../../../../libs/crypto'
import { Link } from 'react-router-dom'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'

interface PaymentCardProps {
    data?: IRoom
}
const PaymentCard: React.FC<PaymentCardProps> = ({ data }) => {

    const reqOrder = {
        roomId: data?.id
    }
    const uniqueId = encryptData(JSON.stringify(reqOrder)).replace("/", "%6")
    const [total, setTotal] = useState<number>(1)
    const facility_total = data?.facility.reduce((acc: number, fac: IFacility) => acc + (total * fac.cost), 0)
    const [expires, setExpires] = useState<Date>()


    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        if (!value)
            return
        const getDay = Object.values(value)[1].$d - Object.values(value)[0].$d
        setTotal((getDay / (1000 * 60 * 60 * 24) + 1))
        setExpires(Object.values(value)[1].$d)
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs().endOf('day');
      };

    return (
        <div className='w-[400px] flex items-center gap-5 flex-col border rounded-xl p-6'>
            <span className='font-semibold text-xl'>
                Rp. {(facility_total || 0 )+ (total * data?.price!) + (data?.cost || 0 * total)}
            </span>
            <DatePicker.RangePicker disabledDate={disabledDate} onChange={onChange} />
            <Link to={`/ruang/${data?.id}/${uniqueId}`} className='bg-sky-400 text-center w-full px-4 py-1 rounded-md text-white font-semibold'>Booking</Link>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-1'>
                    <span>Fasilitas</span>
                    <span>Perawatan Tambahan</span>
                    <span>Harga Sewa</span>
                </div>
                <div className='flex flex-col gap-1 text-right'>
                    <span>{facility_total}</span>
                    <span>{data?.cost || 0 * total}</span>
                    <span>{total * data?.price!}</span>
                </div>
            </div>
        </div>
    )
}

export default PaymentCard
