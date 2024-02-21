import { Avatar } from 'antd'
import React from 'react'

function CommentCard() {
    return (
        <div className='flex flex-col'>
            <div className='flex gap-3'>
                <span><Avatar />  User02</span>
                <span>3.5</span>
            </div>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eligendi unde voluptate!</p>
        </div>
    )
}

export default CommentCard
