import { DatePicker, DatePickerProps, message } from 'antd'
import React, { useState } from 'react'
import { IFacility, IRoom } from '../../../../types/schema'
import { decryptData, encryptData } from '../../../../libs/crypto'
import { Link, useNavigate } from 'react-router-dom'
import { RangePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import CryptoJS from 'crypto-js'
import { useSession } from '../../../../context/AuthProvider'


type ReqOrderProps = {
    roomId: string;
    total_day: number;
    start: string;
    end: string;
    facility_total: number;
}
interface PaymentCardProps {
    data?: IRoom
}
const PaymentCard: React.FC<PaymentCardProps> = ({ data }) => {

    const [reqOrder, setReqOrder] = useState<ReqOrderProps>({
        roomId: "",
        total_day: 1,
        start: "",
        end: "",
        facility_total: data?.facility.reduce((acc: number, fac: IFacility) => acc + fac.cost, 0)!
    })
    const { status } = useSession()
    const navigate = useNavigate()
    const uniqueId = encryptData(JSON.stringify(reqOrder)).replace(/\//g, "%2F")


    const handlePay = () => {
        if (!reqOrder.end || !reqOrder.start || !reqOrder.roomId) {
            message.warning("Isi tanggal terlebih dahulu")
            return
        }
        if (status === "unauthorized")
            return message.warning("Silakan login terlebih dahulu!")
        navigate(`/ruang/${data?.id}/${uniqueId}`)
    }

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        if (!value)
            return
        const getDay = Object.values(value)[1].$d - Object.values(value)[0].$d
        setReqOrder({
            roomId: data?.id!,
            start: dateString[0],
            end: dateString[1],
            total_day: getDay / (1000 * 60 * 60 * 24) + 1,
            facility_total: data?.facility.reduce((acc: number, data: IFacility) => acc + ((getDay / (1000 * 60 * 60 * 24) + 1) * data.cost), 0)!
        })
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        return current && current < dayjs().endOf('day');
    };

    return (
        <div className='w-[400px] flex items-center gap-5 flex-col border rounded-xl p-6'>
            <span className='font-semibold text-xl'>
                Rp. {(reqOrder?.facility_total || 0) + (reqOrder?.total_day! * data?.price!) + (data?.cost || 0 * reqOrder?.total_day!)}
            </span>
            <DatePicker.RangePicker disabledDate={disabledDate} onChange={onChange} />
            <button onClick={handlePay} className='bg-sky-400 text-center w-full px-4 py-1 rounded-md text-white font-semibold'>Booking</button>
            <div className='flex justify-between w-full'>
                <div className='flex flex-col gap-1'>
                    <span>Biaya Fasilitas</span>
                    <span>Perawatan Tambahan</span>
                    <span>Harga Sewa</span>
                </div>
                <div className='flex flex-col gap-1 text-right'>
                    <span>{reqOrder?.facility_total}</span>
                    <span>{data?.cost || 0 * reqOrder?.total_day!}</span>
                    <span>{data?.price! * reqOrder?.total_day!}</span>
                </div>
            </div>
        </div>
    )
}

export default PaymentCard