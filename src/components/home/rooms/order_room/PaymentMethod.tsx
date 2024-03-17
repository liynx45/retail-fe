import { Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { DetailPayProps, DetailRoom } from '../../../../pages/home/room/Order'
import { useSession } from '../../../../context/AuthProvider'
import { axiosPrivate } from '../../../../libs/axios'
import { LoadingProps } from '../../../../hooks/useLoading'
import PaymentSuccess from './PaymentSuccess'
import { ITransaction } from '../../../../types/schema'

type PaymentMethod = {
    detailRoom: DetailRoom;
    detailOrder: DetailPayProps;
    setLoading: (type: LoadingProps) => void;
    isLoading: LoadingProps
}
const PaymentMethod: React.FC<PaymentMethod> = ({ detailRoom, detailOrder, setLoading, isLoading }) => {

    const { user } = useSession()
    const [typePay, setTypePay] = useState<string>("cash")
    const [trans, setTrans] = useState<ITransaction | undefined>(undefined)

    const handlePayment = async () => {
        if (typePay !== "cash") return;
        const payload = {
            roomId: detailOrder.roomId,
            message: detailRoom.message === "" ? undefined : detailRoom.message,
            start: detailOrder.start_date,
            end: detailOrder.end_date,
            userId: user.username,
        };
        setLoading("loading");
        try {
            const post = await axiosPrivate.post("/api/orders", payload);
            if (post.status === 200) {
                setTrans(post.data.result);
                setLoading("success");
            } 
        } catch (e: any) {
            setLoading("error");
            message.warning(e.response.data.errors)
        }
    }

    return (
        isLoading === "success" ?
            <PaymentSuccess result={'flwifewor'} /> : (
                <div className='p-6 flex flex-col gap-3 shadow'>
                    <div className='flex justify-between '>
                        <h4 className='text-xl font-semibold'>Metode pembayaran</h4>
                        <div>
                            <Select
                                className='w-24'
                                defaultValue={"cash"}
                                options={[
                                    { label: "Tunai", value: "cash" },
                                    { label: "E-Wallet", value: "e-wallet" }
                                ]}
                                onChange={(e) => setTypePay(e)}
                            />
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <div className='flex justify-between w-1/2'>
                            <div className='flex flex-col gap-1'>
                                <span>Biaya Fasilitas</span>
                                <span>Perawatan Tambahan</span>
                                <span>Harga Sewa</span>
                                <span>Total</span>
                            </div>
                            <div className='flex flex-col gap-1 text-right'>
                                <span>{detailOrder.total_facility}</span>
                                <span>0</span>
                                <span>{detailOrder.total_price}</span>
                                <span>{detailOrder.total_price + detailOrder.total_facility}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-end'>
                        <button onClick={() => handlePayment()} className='py-1 px-3 bg-primary'>Bayar</button>
                    </div>
                </div>
            )
    )
}

export default PaymentMethod
