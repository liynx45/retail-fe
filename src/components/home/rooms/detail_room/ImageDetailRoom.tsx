import { Image } from 'antd'
import React from 'react'
import { IRoomImage } from '../../../../types/schema'

interface ImageDatailRoomProps {
    img: IRoomImage[]
}
const ImageDatailRoom: React.FC<ImageDatailRoomProps> = ({ img }) => {
    return (
        <div className='flex rounded-lg h-[200px] overflow-hidden justify-center gap-1 my-6'>
            <Image
                src={img && img[0].url}
                className='object-cover bg-sky-400'
                height={200}
                width={800}
                style={img && img.length === 1 ? {
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8
                } : {}}
            />
            <div className='grid h-full grid-cols-2 w-[35%] gap-1'>
                {
                    img && img.length <= 1 ?
                        <span key={"0"} className='flex justify-center items-center'>Image kosong</span>
                        :
                        img && img.map((data: IRoomImage, i: number) => {
                            if (i === 0) {
                                return null
                            } else {
                                return <Image
                                    key={i}
                                    height={100}
                                    className=' w-full object-cover bg-sky-400'
                                    src={data.url}
                                />
                            }
                        })
                }
            </div>
        </div>
    )
}

export default ImageDatailRoom
