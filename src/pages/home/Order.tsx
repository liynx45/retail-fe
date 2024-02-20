import { DatePicker, DatePickerProps, Form, Input, InputNumber, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RangePickerProps } from 'antd/es/date-picker'
import { IRoom } from '../../types/schema'
import { decryptData } from '../../libs/crypto'   
import { axiosPrivate } from '../../libs/axios'

function Order() {

    const { orderId } = useParams()
    const [rooms, setRooms] = useState<IRoom | null>(null)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [total, setTotal] = useState<number>(0)
    const [expires, setExpires] = useState<Date>()


    const getRooms = async (req: string) => {
        try {
            const get = await axiosPrivate.get(`/api/rooms/${req}`)
            if (get.status === 200) {
                setRooms(get.data.result)
            }
        } catch {
            setError("error")
        }
    }

    useEffect(() => {
        if (!orderId)
            return navigate("/")
        const decrypt = decryptData(orderId.split("%6").join("/"))
        if (decrypt) {
           getRooms(decrypt)
        }
    }, [])

    const onChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
      ) => {
        if (!value)
            return
        const getDay = Object.values(value)[1].$d - Object.values(value)[0].$d
        setTotal((getDay / (1000 * 60 * 60 * 24) + 1) * rooms?.price!)
        setExpires(Object.values(value)[1].$d)
      };
      

    const handlerBooking = async () => {
        try {
            const reqData = {
                expires: expires,
                roomId: rooms?.id,
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
                    <span>{rooms?.room_info?.name}</span>
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
