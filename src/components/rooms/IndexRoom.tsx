import { Carousel } from 'antd'
import React, { useEffect } from 'react'
import PaginationRoom from './PaginationRoom'


function IndexRoom() {

  return (
    <div>
      <div>
        <Carousel autoplay>
            <div>
                <img src="" className='w-full h-[300px] bg-slate-400' alt="" />
            </div>
            <div>
                <img src="" className='w-full h-[300px] bg-slate-400' alt="" />
            </div>
            <div>
                <img src="" className='w-full h-[300px] bg-slate-400' alt="" />
            </div>
            <div>
                <img src="" className='w-full h-[300px] bg-slate-400' alt="" />
            </div>
        </Carousel>
        <PaginationRoom />
      </div>
    </div>
  )
}

export default IndexRoom
