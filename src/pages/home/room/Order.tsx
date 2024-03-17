import { Breadcrumb, Skeleton, QRCode } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptData } from '../../../libs/crypto'
import { InfoMember, PaymentMethod, RoomInfoOrder } from '../../../components/home/rooms'
import { HomeOutlined } from '@ant-design/icons'
import { useSession } from '../../../context/AuthProvider'
import { useFetch, useLoading } from '../../../hooks'
import { ResultFetch } from '../../../types/FetchResult'
import { IFacility, IRoom } from '../../../types/schema'

export interface DetailPayProps {
    roomId: string;
    total?: number;
    start_date: string;
    end_date: string;
    total_day: number;
    total_price: number;
    total_add: number;
    total_facility: number;
}
export interface InfoCustomer {
    first_name: string;
    last_name: string;
    phone: number;
    gender: "man" | "woman";
    address: string;
    birth: Date;
    verify: boolean;
}
export interface DetailRoom {
    message: string;
    voucher: string;
}

function Order() {

    const { orderId } = useParams();
    const navigate = useNavigate();
    const { isLoading, setLoading } = useLoading()
    const [detailPay, setDetailPay] = useState<DetailPayProps>({
        roomId: "",
        start_date: "",
        end_date: "",
        total_day: 0,
        total_price: 0,
        total_add: 0,
        total_facility: 0
    });
    const [detailRoom, setDetailRoom] = useState<DetailRoom>({
        message: "",
        voucher: "",
    });
    const { data, status } = useFetch<ResultFetch<IRoom>>({
        type: "public",
        url: detailPay.roomId && `/api/rooms/${detailPay.roomId}`,
        method: "GET"
    })

    useEffect(() => {

        if (!orderId)
            return navigate("/")

        const decrypt = window.atob(orderId)
        if (decrypt) {
            setDetailPay({
                ...JSON.parse(decrypt)
            })
        } else {
            navigate("/ruang")
        }

    }, [])


    return (
        <div className='w-full bg-primary-white'>
            <div className='flex w-full justify-between px-12 bg-slate-200 py-4'>
                <div>
                    <Breadcrumb
                        separator=">"
                        items={[
                            { title: <HomeOutlined />, href: "/" },
                            { title: "Ruang", href: "/ruang" },
                            { title: data?.result?.room_info?.name, href: `/ruang/${data?.result?.id}` },
                            { title: "Order", }
                        ]}
                    />
                </div>
                <div>

                </div>
            </div>
            {
                <div className='flex flex-col gap-12'>
                    {
                        isLoading !== "success" && (
                            <>
                                <div className='px-32'>
                                    {
                                        isLoading === "loading" || status === "loading" ?
                                            <Skeleton active />
                                            :
                                            <InfoMember />
                                    }
                                </div>
                                <div className='px-32'>
                                    {
                                        isLoading === "loading" || status === "loading" ?
                                            <Skeleton active /> :
                                            <RoomInfoOrder
                                                set={setDetailRoom}
                                                infoRoom={data?.result}
                                                detailRoom={detailRoom}
                                            />
                                    }
                                </div>
                            </>
                        )
                    }
                    <div className='px-32'>
                        {
                            isLoading === "loading" || status === "loading" ?
                                <Skeleton active /> :
                                <PaymentMethod
                                    isLoading={isLoading}
                                    detailRoom={detailRoom}
                                    detailOrder={detailPay}
                                    setLoading={setLoading}
                                />}

                    </div>
                </div>
            }
        </div>
    )
}

export default Order