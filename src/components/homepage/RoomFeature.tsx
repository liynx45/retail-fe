import { Flex, Image, Typography } from 'antd'
import React from 'react'

function RoomFeature() {
    return (
        <div
            className='pt-[12rem] pb-24'
        >
            <Flex justify='space-evenly' 
            className='w-full'
            >
                <Flex
                className='flex-col'
                justify='space-between'
                >
                    <Flex
                        align='flex-start'
                        gap={25}
                        className='w-full'>
                        <div className='bg-slate-300 w-[200px] h-[300px]'>

                        </div>
                        <Typography.Text
                            className='max-w-[15rem] pt-8'
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla recusandae similique quo consectetur iure ipsum qui repudiandae illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto totam adipisci?
                        </Typography.Text>
                    </Flex>
                    <Flex
                        align='flex-start'
                        gap={25}
                        className='w-full'>
                        <div className='bg-slate-300 w-[200px] h-[300px]'>

                        </div>
                        <Typography.Text
                            className='max-w-[15rem] pt-8'
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla recusandae similique quo consectetur iure ipsum qui repudiandae illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam architecto totam adipisci?
                        </Typography.Text>
                    </Flex>
                </Flex>
                <div
                className='w-1/2 flex justify-end'
                >
                    <img src='' width={49} height={40} className='bg-slate-300 h-[800px] w-[80%]'/>
                </div>
            </Flex>
        </div>
    )
}

export default RoomFeature
