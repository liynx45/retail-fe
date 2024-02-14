import { Typography } from 'antd'
import React from 'react'
import { useUser } from '../../hooks/useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/redux/store'

function SettingMain() {
    const {auth: {data}} = useSelector((state: RootState) => state)

    return (
        <div className=' p-6 rounded-md mr-6 '>
            <div className='h-32 relative bg-sky-400 rounded-md'>
                <div className='absolute top-1/3 left-12 flex items-start'>
                    <img src={data.profile} className='w-[120px] object-cover aspect-square rounded-full bg-sky-400' alt="" />
                    <div className='flex flex-col pt-6 ml-6 gap-0'>
                        <span className='text-3xl'>
                            {data.first_name + " " + data.last_name || ""}
                        </span>
                        <span>@{data.username}</span>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SettingMain
