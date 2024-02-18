import { HomeOutlined } from '@ant-design/icons'
import Card from 'antd/es/card/Card'
import Statistic from 'antd/es/statistic/Statistic'
import React from 'react'

function Dashbord() {
  return (
    <div>
      <div
        className='grid grid-cols-4 gap-8'
      >
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
          title="Jumlah Unit"
          value={12}
          prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
          title="Jumlah Unit"
          value={12}
          prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
          title="Jumlah Unit"
          value={12}
          prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
          title="Jumlah Unit"
          value={12}
          prefix={<HomeOutlined />}
          />
        </Card>
      </div>
    </div>
  )
}

export default Dashbord
