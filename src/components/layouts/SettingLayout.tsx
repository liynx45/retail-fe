import { Layout, Tabs } from 'antd'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

interface SettinglayoutProps {
    children: React.ReactNode
}
const SettingLayout: React.FC = () => {

    const navigate = useNavigate()

    const handlerTabs = (key: string) => {
        if (key !== "umum") {
            navigate(`/dashbord/setelan/${key}`)
        } else {
            navigate(`/dashbord/setelan`)
        }
    }

    const menu = [
        {
            label: "Umum",
            key: "umum",
        },
        {
            label: "User",
            key: "user",
        },
        {
            label: "password",
            key: "password",
        }
    ]

    return (
        <div>
            <div
                className='flex gap-4'
            >
                <div className='flex flex-col gap-2 min-h-[55vh] p-4 w-[170px]'>
                    {
                        menu.map((path: any, i: number) => (
                            <div
                                key={path.key}
                                onClick={() => handlerTabs(path.key)}
                                className='cursor-pointer px-6 rounded-md py-2 bg-slate-100 hover:bg-slate-300 active:scale-90 transition'>
                                {path.label}
                            </div>
                        ))
                    }
                </div>
                <div className='w-full bg-slate-100 min-h-[58vh] rounded-md'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SettingLayout
