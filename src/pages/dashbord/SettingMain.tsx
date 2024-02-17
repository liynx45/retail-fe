import React from 'react'
import { useSession } from '../../components/layouts/AuthProvider'


function SettingMain() {

    const { user } = useSession()

    return (
        <div className=' p-6 rounded-md mr-6 '>
            <div className='h-32 relative bg-sky-400 rounded-md'>
                <div className='absolute top-1/3 left-12 flex items-start'>
                    <img src={user.profile} className='w-[120px] object-cover aspect-square rounded-full bg-sky-400' alt="" />
                    <div className='flex flex-col pt-6 ml-6 gap-0'>
                        <span className='text-3xl'>
                            {user.first_name + " " + (user.last_name || "")}
                        </span>
                        <span>@{user.username}</span>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default SettingMain
