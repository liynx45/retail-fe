import { Button, Flex, Typography } from 'antd'
import React from 'react'
import Feature from '../../components/homepage/Feature'
import IndexHome from '../../components/homepage/IndexPage'
import RoomFeature from '../../components/homepage/RoomFeature'

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
