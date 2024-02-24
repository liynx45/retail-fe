import { HomeOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Breadcrumb, Skeleton, message } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { FacebookShareButton } from "react-share"
import { CommentDetailRoom, DetailRoomDesc, ImageDetailRoom, PaymentCard } from '../../../components/home'
import { ResultFetch } from '../../../services/api'
import { IRoom } from '../../../types/schema'
import { useFetch, useScrollToTop } from '../../../hooks'
import SkeletonImage from 'antd/es/skeleton/Image'
import SkeletonInput from 'antd/es/skeleton/Input'
import SkeletonAvatar from 'antd/es/skeleton/Avatar'
import { statusRoom } from '../../../utils'
import RelatedRoom from '../../../components/home/rooms/detail_room/RelatedRoom'


const DetailRoom: React.FC = () => {

    const { roomId } = useParams()
    const { status, data } = useFetch<ResultFetch<IRoom>>({
        type: "public",
        url: `/api/rooms/${roomId}`,
        method: "GET"
    })
    const scrollTop = useScrollToTop()

    const status_room = statusRoom(data?.result?.status!)

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
                                { title: data?.result?.room_info?.name, href: `/ruang/${roomId}` }
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
                                    <h3 className='font-semibold text-xl'>{data?.result?.room_info?.name}</h3>
                                    <p className='text-sm text-slate-400'>Baal Hotel, rang 1 A, Lantai 2</p>
                                </div>
                                <div>
                                    <FacebookShareButton url='https://shopee.co.id' className='mr-4 font-semibold'><ShareAltOutlined /> Bagikan</FacebookShareButton>
                                </div>
                            </>
                        )}
                    </div>
                    <div>
                        {status === "loading" ? <SkeletonImage className='my-6' active /> : <ImageDetailRoom img={data?.result?.room_image!} />}
                    </div>
                    <div className='flex justify-between flex-start'>
                        {
                            status === "loading" ?
                                <Skeleton className='my-6' /> : (
                                    <>
                                        <div className='flex flex-col justify-between w-full'>
                                            <DetailRoomDesc info={data?.result!} />
                                        </div>
                                        <div>
                                            <span className={`${status_room?.class} mr-8`}>{status_room?.label}</span>
                                        </div>
                                        <div>
                                            <PaymentCard data={data?.result!} />
                                        </div>
                                    </>
                                )
                        }
                    </div>
                    <div>
                        {status === "loading" ? <Skeleton active /> : <CommentDetailRoom />}
                    </div>
                    <div className='py-6'>
                        {status === "loading" ? <Skeleton active /> : <RelatedRoom type={data?.result?.room_info?.type!} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailRoom
