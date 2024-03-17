import { QRCode } from 'antd'
import React from 'react'

const PaymentSuccess = ({result}: {result: any}) => {

    console.log(result)
    return (
        <div className='w-full p-6 my-12 px-36 shadow'>
            <h2 className='text-center my-6 text-xl font-semibold'>Pembayaran diproses</h2>
            <div className='text-center p-6'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, odit itaque a ipsa eaque atque assumenda officia in nam quasi, minima nemo?</p>
                <p>Silakan ke kasir dan berikan kode berikut :</p>
                <p>{result.code}</p>
                <p>Atau</p>
                <div className='w-full flex justify-center items-center'>
                <QRCode
                    value="weorewjr-wefwein-wefpwfpo-"
                    type='svg'
                />
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
