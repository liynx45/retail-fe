import { HomeFilled, MenuFoldOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React, { useState } from 'react'

interface CardsProps {
    children?: React.ReactNode;
    title: string;
    prefix: React.ReactNode;
    value: number;
}
const Cards: React.FC<CardsProps> = ({ children, title, prefix, value }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <div className='p-5 flex flex-col gap-3 rounded-md border'>
            <div className='flex relative justify-between items-center'>
                <span className='text-xl'>{title}</span>
                {
                    children ? (
                        <>
                            <button className='relative' onClick={() => setToggle(prev => !prev)}>
                                <MenuFoldOutlined />
                            </button>
                            <div className='absolute top-7 right-20' style={toggle ? { display: "block" } : { display: "none" }}>
                                <div onClick={() => setToggle(prev => !prev)} className='min-h-screen top-0 left-0 w-full fixed z-10 '></div>
                                <div className='bg-slate-300 absolute py-2 w-20 px-4 z-50 rounded-md shadow-md'>
                                    {children}
                                </div>
                            </div>
                        </>
                    ) : null
                }
            </div>
            <div className='flex items-end gap-3'>
                <span className='text-4xl'>{value}</span>
                <span className='text-2xl'>{prefix}</span>
            </div>
        </div>
    )
}

export default Cards
