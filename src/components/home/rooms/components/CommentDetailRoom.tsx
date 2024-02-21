import React from 'react'
import CommentCard from './CommentCard'

function CommentDetailRoom() {
    return (
        <div className='py-6'>
            <h4 className='font-semibold text-xl my-6'>Comment</h4>
            <div className='p-6 border rounded-xl flex flex-col gap-6'>
                {
                    [...Array(5)].map((i: any) => (
                        <CommentCard />
                    ))
                }
            </div>
        </div>
    )
}

export default CommentDetailRoom
