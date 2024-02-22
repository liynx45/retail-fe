import { DatePicker, DatePickerProps, Form, Input, InputNumber, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RangePickerProps } from 'antd/es/date-picker'
import { IRoom } from '../../../types/schema'
import { axiosPrivate } from '../../../libs/axios'
import { decryptData } from '../../../libs/crypto'
import { useFetch } from '../../../hooks'
import { getRoomById } from '../../../services/api'


interface DetailPayProps {
    roomId: string;
    total?: number;
    start_date?: string;
    end_date?: string;
}
function Order() {

    const { orderId } = useParams()
    const navigate = useNavigate()
    const [detailPay, setDetailPay] = useState<DetailPayProps>({
        roomId: "",
    })
    const [total, setTotal] = useState<number>(0)
    const [expires, setExpires] = useState<Date>()
    const { status, data } = useFetch<IRoom>({
        fetch: getRoomById(detailPay.roomId)
    })


    useEffect(() => {
        if (!orderId)
            return navigate("/")
        const decrypt = decryptData(orderId.split("%6").join("/"))
        if (decrypt) {
            setDetailPay(JSON.parse(decrypt))
        }
    }, [])

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        if (!value)
            return
        const getDay = Object.values(value)[1].$d - Object.values(value)[0].$d
        setTotal((getDay / (1000 * 60 * 60 * 24) + 1) * data?.price!)
        setExpires(Object.values(value)[1].$d)
    };


    const handlerBooking = async () => {
        try {
            const reqData = {
                expires: expires,
                roomId: data?.id,
                total: total
            }
            const post = await axiosPrivate.post("/api/order", reqData)
            if (post.status === 200) {
                console.log(post.data);
            }
        } catch {

        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen w-full'>
            <div className='border bg-slate-300 p-6'>
                <Typography.Title>
                    Order Ruang
                </Typography.Title>

                <div>
                    <span>{data?.room_info?.name}</span>
                    <span>Total: {total}</span>
                    <Form
                        layout='vertical'
                    >
                        <Form.Item
                            label="Vocer"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Waktu pesan"
                        >
                            <DatePicker.RangePicker onChange={onChange} />
                        </Form.Item>
                        <button onClick={handlerBooking}>Booking</button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Order
