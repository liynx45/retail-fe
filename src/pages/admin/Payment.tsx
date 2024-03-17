import { PlusCircleOutlined } from '@ant-design/icons';
import { Input, InputNumber, Skeleton, Typography, message } from 'antd';
import React, { useState } from 'react';
import { axiosPrivate } from '../../libs/axios';
import { ITransaction } from '../../types/schema';
import { CaserInfo, CustomerInfo, RoomInfo } from '../../components/admin/payment';
import OrderSearch from '../../components/admin/payment/OrderSeacrh';
import { LoadingProps } from '../../hooks/useLoading';
import { PAYMENT_STATUS } from '../../constants';
import OrderInfo from '../../components/admin/payment/OrderInfo';

export interface TransactionData {
  data: ITransaction | undefined;
  status: LoadingProps;
}

const Payment: React.FC = () => {

  const [trans, setTrans] = useState<TransactionData>({
    data: undefined,
    status: "idle"
  })
  const [bill, setBill] = useState(0)

  const handlePayment = async () => {
    if (!trans.data || bill === 0) return message.warning("Error")
    const payload = {
      status: PAYMENT_STATUS.SUCCESS,
      code: trans.data.code,
      cash: bill
    }
    try {
      const post = await axiosPrivate.patch(`/api/orders/${trans.data.id}`, payload)
      if (post.status === 200) {
        message.success("Pembayaran berhasil")
      }
    } catch(e: any) {
      message.warning(e.response.data.errors)
    }
  }

  return (
    <div className='p-2 w-full'>
      <div className='flex justify-between mb-2'>
        <Typography.Title level={2}>
          Kasir
        </Typography.Title>
        <button className='text-xl'>Tambah Saldo <PlusCircleOutlined /></button>
      </div>
      <div className='flex gap-2 w-full'>
        <div className='flex flex-col w-[30%] gap-2'>
        <OrderSearch setOrder={setTrans} />
          {trans.status === "loading" ? <Skeleton active /> : <CustomerInfo data={trans.data?.users} />}
          {trans.status === "loading" ? <Skeleton active /> : <OrderInfo data={trans.data!} />}
        </div>
        <div className='w-[70%]'>
          <div className='w-full gap-3 p-4 flex justify-between bg-primary-bg'>
            <span className='text-xl'>Saldo</span>
            <span className='text-2xl'>Rp. 300.000</span>
          </div>
          <div className='w-full my-2'>
            <CaserInfo />
            {trans.status === "loading" ? <Skeleton active /> : <RoomInfo data={trans.data?.rooms} />}
            <div className='w-full flex  gap-3 flex-col p-4 bg-primary-bg mt-2'>
              <div className='text-xl flex gap-6 items-center'>
                <span>Bill</span>
                <InputNumber className='text-xl w-full' value={bill} onChange={(e) => setBill(e!)} />
              </div>
              <button
                onClick={handlePayment}
                className='bg-primary py-2 rounded-md'
              >Bayar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Payment;