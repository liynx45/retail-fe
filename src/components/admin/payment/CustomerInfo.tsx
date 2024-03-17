import { Typography } from 'antd'
import React from 'react'
import { IUser } from '../../../types/schema'

type CustomerInfo = {
  data: IUser | undefined;
}

const CustomerInfo: React.FC<CustomerInfo> = ({ data }) => {
  return (
    <div className='bg-primary-bg p-4'>
      <Typography.Title level={3}>
        Informasi Pembeli
      </Typography.Title>
      <div className='w-full flex gap-6 text-lg'>
        {
          data ? (
            <>
              <div className='text-left flex flex-col'>
                <span>Nama</span>
                <span>Email</span>
                <span>Tanggal lahir</span>
                <span>Umur</span>
                <span>Jenis Kelamin</span>
                <span>No telepon</span>
              </div>
              <div className='text-left flex flex-col'>
                <span>{data?.user_info?.first_name}</span>
                <span>{data?.email}</span>
                <span>{data?.user_info?.last_name}</span>
                <span>17</span>
                <span>{data?.user_info?.last_name}</span>
                <span>{data?.user_info?.last_name}</span>
              </div>
            </>
          ) : (
            <span>Tidak ada user</span>
          )
              }
      </div>
    </div>
  )
}

export default CustomerInfo
