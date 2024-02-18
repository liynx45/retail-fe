import Feature from '../../components/home/homepage/Feature'
import IndexHome from '../../components/home/homepage/IndexPage'
import RoomFeature from '../../components/home/homepage/RoomFeature'
import { Button, Flex, Typography } from 'antd'
import React from 'react'

function HomePage() {
  return (
    <div
    className='px-24'
    >
      <IndexHome />
      <Feature />
      <RoomFeature />
    </div>
  )
}

export default HomePage
