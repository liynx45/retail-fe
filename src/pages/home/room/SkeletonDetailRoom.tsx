import { Divider, Skeleton } from 'antd'
import SkeletonAvatar from 'antd/es/skeleton/Avatar'
import SkeletonImage from 'antd/es/skeleton/Image'
import React from 'react'

function SkeletonDetailRoom() {
    return (
        <div className='px-24 py-6 flex flex-col gap-6'>
            <Skeleton />
            <SkeletonImage />
            <Divider/>
            <Skeleton />
        </div>
    )
}

export default SkeletonDetailRoom
