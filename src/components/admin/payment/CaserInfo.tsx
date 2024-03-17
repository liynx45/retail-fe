import React from 'react'

const CaserInfo = () => {
    return (
        <div className='w-full flex justify-between bg-primary-bg p-4'>
            <div className='flex flex-col items-start'>
                <span>Nama : iqbal Bahtiar</span>
                <span>Status : Ada</span>
            </div>
            <div className='flex flex-col items-end'>
                <span>12-04-2023</span>
                <span>06:00 - 18:00</span>
            </div>
        </div>
    )
}

export default CaserInfo
