import { HomeOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Breadcrumb, Skeleton } from 'antd'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FacebookShareButton } from "react-share"
import { CommentDetailRoom, DetailRoomDesc, ImageDetailRoom, PaymentCard } from '../../../components/home'
import { getRoomById } from '../../../services/api'
import { IRoom } from '../../../types/schema'
import { useFetch } from '../../../hooks'
import SkeletonImage from 'antd/es/skeleton/Image'
import SkeletonInput from 'antd/es/skeleton/Input'
import SkeletonAvatar from 'antd/es/skeleton/Avatar'
import SkeletonButton from 'antd/es/skeleton/Button'


const DetailRoom: React.FC = () => {

    const { roomId } = useParams()
    const { pathname } = useLocation()
    const { status, data } = useFetch<IRoom>({
        fetch: getRoomById(roomId!)
    })


    return (
        <div>
            <div className='px-24 py-4 bg-slate-200'>
                {
                    status === "loading" ? (
                        <div className='flex gap-4'>
                            <SkeletonAvatar />
                            <SkeletonInput active />
                        </div>
                    ) : (
                        <Breadcrumb
                            separator=">"
                            items={[
                                { title: <HomeOutlined />, href: "/" },
                                { title: "Ruang", href: "/ruang" },
                                { title: data?.room_info?.name, href: `/ruang/${roomId}` }
                            ]}
                        />
                    )
                }
            </div>
            <div className='px-36'>
                <div>
                    <div className='my-6 flex justify-between items-center'>
                        {status === "loading" ? <SkeletonInput active /> : (
                            <>
                                <div>
                                    <h3 className='font-semibold text-xl'>{data?.room_info?.name}</h3>
                                    <p className='text-sm text-slate-400'>Baal Hotel, rang 1 A, Lantai 2</p>
                                </div>
                                <div>
                                    <FacebookShareButton url='https://shopee.co.id' className='mr-4 font-semibold'><ShareAltOutlined /> Bagikan</FacebookShareButton>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {status === "loading" ? <SkeletonImage className='my-6' active /> : <ImageDetailRoom img={data?.room_image!} />}
                    </div>
                    <div className='flex justify-between flex-start'>
                        <div className='flex flex-col justify-between w-full'>
                            {status === "loading" ? <SkeletonInput className='my-2' /> : <DetailRoomDesc info={{ facility: data?.facility!, desc: data?.room_info! }} />}

                        </div>
                        <div>
                            {status === "loading" ? <SkeletonButton active /> : <PaymentCard data={data!} />}
                        </div>
                    </div>
                    <div>
                        {status === "loading" ? <Skeleton active /> : <CommentDetailRoom />}
                    </div>
                    <div className='py-6'>
                        <h4>Related Room</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailRoom
