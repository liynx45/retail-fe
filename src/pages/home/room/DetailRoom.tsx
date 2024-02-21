import { HomeOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Card, DatePicker, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FacebookShareButton } from "react-share"
import { CommentDetailRoom, DetailRoomDesc, ImageDetailRoom, PaymentCard } from '../../../components/home'
import { ResultFetch, getRoomById } from '../../../services/api'
import { IRoom } from '../../../types/schema'
import { useFetch, useLoading } from '../../../hooks'
import SekelatonDetailRoom from './SkeletonDetailRoom'


const DetailRoom: React.FC = () => {

    const { roomId } = useParams()
    const { pathname } = useLocation()
    const { status, data } = useFetch<IRoom>(getRoomById(roomId!))


    return (
        status === "loading" ?
            <SekelatonDetailRoom /> : (
                <div>
                    <div className='px-24 py-4 bg-slate-200'>
                        <Breadcrumb
                            separator=">"
                            items={[
                                { title: <HomeOutlined />, href: "/" },
                                { title: "Ruang", href: "/ruang" },
                                { title: roomId, href: `/ruang/${roomId}` }
                            ]}
                        />
                    </div>
                    <div className='px-36'>
                        <div>
                            <div className='my-6 flex justify-between items-center'>
                                <div>
                                    <h3 className='font-semibold text-xl'>{data?.room_info?.name}</h3>
                                    <p className='text-sm text-slate-400'>Baal Hotel, rang 1 A, Lantai 2</p>
                                </div>
                                <div>
                                    <FacebookShareButton url='https://shopee.co.id' className='mr-4 font-semibold'><ShareAltOutlined /> Bagikan</FacebookShareButton>
                                </div>
                            </div>
                            <div>
                                <ImageDetailRoom img={data?.room_image!} />
                            </div>
                            <div className='flex justify-between flex-start'>
                                <div className='flex flex-col justify-between w-full'>
                                    <DetailRoomDesc info={{ facility: data?.facility!, desc: data?.room_info! }} />
                                </div>
                                <div>
                                    <PaymentCard data={data!} />
                                </div>
                            </div>
                            <div>
                                <CommentDetailRoom />
                            </div>
                            <div className='py-6'>
                                <h4>Related Room</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )
    )
}

export default DetailRoom
