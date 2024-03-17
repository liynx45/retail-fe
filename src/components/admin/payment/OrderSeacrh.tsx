import { Input, message } from 'antd'
import React, { useState } from 'react'
import { ITransaction } from '../../../types/schema';
import { axiosPrivate } from '../../../libs/axios';
import { TransactionData } from '../../../pages/admin/Payment';

type OrderSearch = {
    setOrder: React.Dispatch<React.SetStateAction<TransactionData>>;
}
const OrderSearch: React.FC<OrderSearch> = ({setOrder}) => {

    const [orderId, setOrderId] = useState("")
    const getTransaksi = async() => {
        if (orderId === "") return
        setOrder(pv => ({
          ...pv,
          status: "loading"
        }))
        try{
          const get = await axiosPrivate.get(`/api/orders/${orderId}`)
          if (get.status === 200) {
            setOrder({
              status: "success",
              data: get.data.result
            })
          }
        }catch(e: any){
          setOrder({
            data: undefined,
            status: "error"
          })
          message.warning(e.response.data.errors)
        }
      }

    return (
        <div className='flex gap-2 p-3 bg-primary-bg'>
            <Input className='w-[300px]' onChange={(e) => setOrderId(e.target.value)} />
            <button onClick={() => getTransaksi()}>Submit</button>
          </div>
    )
}

export default OrderSearch
