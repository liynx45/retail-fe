import { Breadcrumb, DatePickerProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RangePickerProps } from 'antd/es/date-picker'
import { axiosPrivate } from '../../../libs/axios'
import { decryptData } from '../../../libs/crypto'
import { useFetch, useScrollToTop } from '../../../hooks'
import { InfoMember, PaymentMethod, RoomInfoOrder } from '../../../components/home/rooms'
import { HomeOutlined } from '@ant-design/icons'
import { useSession } from '../../../context/AuthProvider'


interface DetailPayProps {
    roomId: string;
    total?: number;
    start_date?: string;
    end_date?: string;
}
function Order() {

    const { orderId } = useParams()
    const navigate = useNavigate()
    const session = useSession()
    const [detailPay, setDetailPay] = useState<DetailPayProps>({
        roomId: "",
    })
    const [total, setTotal] = useState<number>(0)
    const [expires, setExpires] = useState<Date>()
    const { status, data } = useFetch<any>({
        type: "public",
        url: "",
        method: "GET"
    })
    const scrollTo = useScrollToTop()


    useEffect(() => {
        if (!orderId)
            return navigate("/")
        const decrypt = decryptData(orderId.split("%6").join("/"))
        if (decrypt) {
            setDetailPay(JSON.parse(decrypt))
        } else {
            navigate("/ruang")
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
        <div className='w-full'>
            <div className='flex w-full justify-between px-12 bg-slate-200 py-4'>
                <div>
                    <Breadcrumb
                        separator=">"
                        items={[
                            { title: <HomeOutlined />, href: "/" },
                            { title: "Ruang", href: "/ruang" },
                            { title: "Ruang 3", },
                            { title: "Order", }
                        ]}
                    />
                </div>
                <div>

                </div>
            </div>
            <div className='px-32'>
                <InfoMember />
            </div>
            <div className='px-32'>
                <RoomInfoOrder data={""} />
            </div>
            <div className='px-32'>
                <PaymentMethod />
            </div>
        </div>
    )
}

export default Order
