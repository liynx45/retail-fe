import { Badge, Layout, Tabs } from 'antd'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/AuthProvider'
import { USER_ROLE } from '../../constants/status_code'

const SettingLayout: React.FC = () => {

    const navigate = useNavigate()
    const { user } = useSession()
    const { pathname } = useLocation()

    const handlerTabs = (key: string) => {
        if (key !== "setelan") {
            navigate(`/dashboard/setelan/${key}`)
        } else {
            navigate(`/dashboard/setelan`)
        }
    }

    const menu = [
        {
            label: "Umum",
            key: "setelan",
        },
        {
            label: "Company",
            key: "company"
        },
        {
            label: "User",
            key: "user",
        },
        {
            label: "Password",
            key: "password",
        },
        {
            label: "Verifikasi",
            key: "verifikasi"
        }
    ]

    return (
        <div>
            <div
                className='flex gap-4'
            >
                <div className='flex flex-col gap-2 min-h-[55vh] p-4 w-[170px]'>
                    {
                        menu.map((path: { label: string, key: string }, i: number) => {
                            if (user?.role !== USER_ROLE.ADMIN && path.key === "company") {
                                return null
                            } else {
                                return (
                                    <Badge key={i} dot={path.key === "verifikasi" && !user?.verify}>
                                        <div
                                            key={path.key}
                                            onClick={() => handlerTabs(path.key)}
                                            className={'cursor-pointer min-w-[120px] px-6 rounded-md py-2 bg-slate-100 hover:bg-slate-300 active:scale-95 transition'}
                                            style={
                                                pathname.split("/").slice(-1).toString() === path.key ? {
                                                    background: "#38bdf8"
                                                }: pathname.split("/").slice(-1).toString() === path.key ? {
                                                    background: "#38bdf8"
                                                } : {}}
                                            >
                                            {path.label}
                                        </div>
                                    </Badge>
                                )
                            }
                        })
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
